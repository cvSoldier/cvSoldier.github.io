import{_ as s,W as a,X as r,Y as i,Z as e,$ as d,a0 as l,C as c}from"./framework-c8ebc670.js";const t={},v={href:"https://github.com/cvSoldier/how_to_optimize",target:"_blank",rel:"noopener noreferrer"},o={href:"https://segmentfault.com/a/1190000003991459",target:"_blank",rel:"noopener noreferrer"},u=l(`<h3 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h3><h4 id="css选择符优化" tabindex="-1"><a class="header-anchor" href="#css选择符优化" aria-hidden="true">#</a> CSS选择符优化</h4><p>众所周知，css选择符解析顺序为从右向左，所以<code>#id div</code>的解析速度就不如<code>div #id</code></p><h4 id="减少回流重绘" tabindex="-1"><a class="header-anchor" href="#减少回流重绘" aria-hidden="true">#</a> 减少回流重绘</h4><p>浏览器渲染大致流程是这样的：</p><ol><li>处理HTML标记并构造DOM树。</li><li>处理CSS标记并构造CSS规则树。</li><li>将DOM树与CSS规则树合并成一个渲染树。</li><li>根据渲染树来布局，以计算每个节点的几何信息。</li><li>将各个节点绘制到屏幕上。</li></ol><p>当 Render Tree 中部分或全部, 因元素的尺寸、布局、隐藏等改变而需要重新构建，浏览器重新渲染的过程称为回流。 会导致回流的操作：</p><ul><li>页面首次渲染。</li><li>浏览器窗口大小发生改变。</li><li>元素尺寸或者位置发生改变。</li><li>元素内容变化(文字数量或者图片大小发生改变)。</li><li>元素字体大小的改变。</li><li>添加或者删除可见的 <code>DOM</code> 元素。</li><li>激活 <code>CSS</code> 伪类。</li><li>查询某些属性或调用某些方法。 一些常用且会导致回流的属性和方法。</li><li><code>clientWidth</code>、<code>clientHeight</code>、<code>clientTop</code>、<code>clientLeft</code></li><li><code>offsetWidth</code>、<code>offsetHeight</code>、<code>offsetTop</code>、<code>offsetLeft</code></li><li><code>scrollWidth</code>、<code>scrollHeight</code>、<code>scrollTop</code>、<code>scrollLeft</code></li><li><code>scrollIntoView()</code>、<code>scrollIntoViewIfNeeded()</code></li><li><code>getComputedStyle()</code></li><li><code>getBoundingClientRect()</code></li><li><code>scrollTo()</code></li></ul><p>当页面中元素样式的改变并不影响布局时（像<code>color</code>、<code>background-color</code>等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。回流必将引起重绘，重绘不一定会引起回流。</p><ul><li>缓存layout属性 浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。但是访问前面所说的属性和调用方法，浏览器会为了准确性而清空队列强制进行回流，所以我们可以缓存layout属性，来避免这种现象，比如写滚动加载的时候，就可以缓存offsetTop等属性，避免每次对比都产生回流。如果你没有这样做，可爱的浏览器甚至会提醒<code>Forced reflow is a likely performance bottleneck.</code></li><li>将多次回流的元素放在absolute中 使用absolute，把会引起回流的动画脱离文档流，它的变化就不会影响到其他元素。需要注意的是，虽然<code>float</code>也是脱离文档流，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用<code>absolute</code>脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。才是真正的不会影响。(实际测试<code>float</code>甚至还不如<code>relative</code>)</li><li>批量修改DOM 比如一个列表，现在需要向里面push100项新内容，一项一项添加的话，则至少会有100次回流，如果使用<code>DocumentFragment</code>分10次处理，就只会有10次回流。那是不是只处理一次，就会有一次回流，这样性能更好呢，并不是。举个栗子，我想要吃100份炸鸡，如果一份一份吃会很累，如果一次直接吃100份，会直接撑炸，比较好的方式就是分10次吃，每次吃10份。这其中涉及到的long task概念，也是下一个优化方式所涉及的。</li></ul><h4 id="任务切片" tabindex="-1"><a class="header-anchor" href="#任务切片" aria-hidden="true">#</a> 任务切片</h4><p>学名task-slice，算是一个必备的优化方式了，着重说一哈，先来看吃炸鸡的例子，为了突出优化前后差异把要吃的炸鸡变成1000份。 实验1：一份一份吃 吃1000次<br><img src="https://segmentfault.com/img/bVbySZa" alt="image.png"> 实验2：一次吃1000份<br><img src="https://segmentfault.com/img/bVbySZb" alt="image.png"> 实验3：分10次，每次吃100份<br><img src="https://segmentfault.com/img/bVbyS0a" alt="image.png"> 可以看到黄条代表的scripting从一段变成了好几段，对应的task也从一长条分了好几份。前文中<em>缓存layout属性</em>的部分讲过，浏览器会维护一个队列，所以实验1和实验2结果差距不大是因为他们都被放进队列中最后统一处理，而task-slice做的就是把一个long task，分成几个小task交给浏览器依次处理，缓解浏览器短时间内的压力。帧数也从2提升到了10+。(因为我测试时阉割了性能，所以优化后帧数依然感人)</p><p>上面这个例子，是同步的任务切片，那万一可爱的项目经理说要加10个echarts图咋办嘞。 其实同步和异步差不多的，上一个简单版本的代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function TaskSlice(num, fn) {
  this.init(num, fn)
}
TaskSlice.prototype = {
  init: (num, fn) =&gt; {
    let index = 0
    function next() {
      if(index &lt; num) {
        fn.call(this, index, next)
      }
      index++
    }
    next()
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用的时候就这样</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function drawCharts (num) {
  new TaskSlice(
    num,
    drawChart
  )
}

function drawChart(id, cb) {
  var chart = echarts.init(document.getElementById(id))
  chart.on(&#39;finished&#39;, cb)
  chart.on(&#39;finished&#39;, () =&gt; {
    chart.off()
  })
  chart.setOption(options)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为<code>echarts</code>的生命周期是自己内部定义的事件，所以看起来比较麻烦，如果想要切片的异步任务是<code>promise</code>就比较简单了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function asyncTask(cb) {
  promise().then(() =&gt; {
    // balabalaba
    cb()
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个类的逻辑大概是这样的： 初始化时传入要切片的次数<code>num</code>和异步的任务<code>fn</code>; 然后定义一个函数<code>next</code>,<code>next</code>通过闭包维护一个表示当前执行任务次数的变量<code>index</code>,然后调用<code>next</code>进入函数内逻辑; 判断执行次数是否小于要切的次数，小于的话，调用<code>fn</code>，同时给他两个参数分别为当前执行次数和<code>next</code>； 然后进入<code>fn</code>函数，这里只需要在异步完成后调用<code>next</code>,任务就被切成了好多片。</p><h4 id="减少作用域查找" tabindex="-1"><a class="header-anchor" href="#减少作用域查找" aria-hidden="true">#</a> 减少作用域查找</h4><p>作用域链和原型链类似，当我们使用对象的某一个属性时，会遍历原型链，从当前对象的属性开始，如果找不到该属性，则会在原型链上往下一个位置移动，寻找对应的属性，直到找到属性或者达到原型链末端。 在作用域链中，首先会在当前作用域中寻找我们需要的变量或者函数，如果没找到的话，则往上一个作用域寻找，直到找到变量/函数或者到达全局作用域。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//bad
var a=1;
function fn(){
  console.log(a);
}
fn()

//good
var a=1;
function fn(value){
  console.log(value);
}
fn(a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="节流防抖" tabindex="-1"><a class="header-anchor" href="#节流防抖" aria-hidden="true">#</a> 节流防抖</h4><p>throttle&amp;debounce，这个网上文章太多了，而且像<code>lodash</code>这种工具库也有现成的源码，我也写了一个简版的，可能更通俗一点，就在文章开头说的github里，需要注意的是他们不能减少事件的触发次数。学就完事儿了。</p><h4 id="懒加载" tabindex="-1"><a class="header-anchor" href="#懒加载" aria-hidden="true">#</a> 懒加载</h4><p>先将img标签中的src链接设为同一张图片，将其真正的图片地址存储在img标签的自定义属性。当js监听到该图片元素进入可视窗口时，再把src的值替换为自定义属性，减少首屏加载的请求数量，达到懒加载的效果。 其中的定义滚动事件，和计算是否进入可视窗口，就用到了前面说的防抖和缓存layout属性</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let pending = false

function LazyLoad({ els, lazyDistance }) {
  this.lazyDistance = lazyDistance
  this.imglist = Array.from(els)
  this.loadedLen = 0
  this.init()
}
LazyLoad.prototype = {
  init: function() {
    this.initHandler()
    this.lazyLoad()
  },

  load: function(el) {
    if(!el.loaded) {
      el.src = el.getAttribute(&#39;data-src&#39;)
      this.loadedLen++
      el.loaded = true
    }
  },

  lazyLoad: function() {
    for(let i = 0; i &lt; this.imglist.length; i++) {
      this.getBound(this.imglist[i]) &amp;&amp; this.load(this.imglist[i])
    }
    pending = false
  },

  getBound: function(el) {
    let bound = el.getBoundingClientRect()
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    return bound.top &lt;= clientHeight + this.lazyDistance
  },

  initHandler: function() {
    const fn = throttle(function() {
      if(!pending) {
        pending = true
        if(this.imglist.length &gt; this.loadedLen) {
          this.lazyLoad()
        } else {
          window.removeEventListener(&#39;scroll&#39;, this.scrollHander, false)
        }
      }
    }, 1000)
    this.scrollHander = fn.bind(this)

    window.addEventListener(&#39;scroll&#39;, this.scrollHander, false)
  },
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue" tabindex="-1"><a class="header-anchor" href="#vue" aria-hidden="true">#</a> Vue</h3><h4 id="函数式组件" tabindex="-1"><a class="header-anchor" href="#函数式组件" aria-hidden="true">#</a> 函数式组件</h4>`,29),m={href:"https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6",target:"_blank",rel:"noopener noreferrer"},b=l(`<h4 id="拆分子组件" tabindex="-1"><a class="header-anchor" href="#拆分子组件" aria-hidden="true">#</a> 拆分子组件</h4><p>因为vue的渲染顺序为先父到子，所以拆分子组件类似上面所说的<code>task slice</code>。就是把一个大的task分成了父和子两个task。</p><h4 id="使用v-show复用dom" tabindex="-1"><a class="header-anchor" href="#使用v-show复用dom" aria-hidden="true">#</a> 使用v-show复用dom</h4><p>下面这段话抄自官网 v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。 v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。</p><h4 id="使用keep-alive进行缓存" tabindex="-1"><a class="header-anchor" href="#使用keep-alive进行缓存" aria-hidden="true">#</a> 使用keep-alive进行缓存</h4><p>keep-alive是Vue内置组件，会缓存该组件内的组件的实例，节省再次渲染时初始化组件的花销。</p><h4 id="延迟加载dom" tabindex="-1"><a class="header-anchor" href="#延迟加载dom" aria-hidden="true">#</a> 延迟加载DOM</h4><p>这一项其实还是任务切片，但是这种实现方式真的和Vue特别契合，直接上代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default function (count = 10) {
  return {
    data () {
      return {
        displayPriority: 0,
      }
    },

    mounted () {
      this.runDisplayPriority()
    },

    methods: {
      runDisplayPriority () {
        const step = () =&gt; {
          requestAnimationFrame(() =&gt; {
            this.displayPriority++
            if (this.displayPriority &lt; count) {
              step()
            }
          })
        }
        step()
      },

      defer (priority) {
        return this.displayPriority &gt;= priority
      },
    },
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数返回一个<code>mixin</code>，通过<code>defer</code>函数和<code>v-if</code>来控制切片,像这样：<br><img src="https://segmentfault.com/img/bVbzNry" alt="image.png"></p><h4 id="不响应式数据" tabindex="-1"><a class="header-anchor" href="#不响应式数据" aria-hidden="true">#</a> 不响应式数据</h4><ul><li>众所周知，new一个Vue时，Vue会遍历data中的属性通过<code>Object.defineProperty</code>(2.x版本)来将他们设置为响应式数据，当其中的属性变化时，通过触发属性的<code>set</code>去更新View。那么如果只是为了定义一些常量，我们就不需要vue去设置他们为响应式，写在<code>created</code>里面就可以了。</li><li>一个table组件的props肯定会有一个数组，常见的写法像这样<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;template&gt;
  &lt;el-table :data=&quot;list&quot;&gt;
  &lt;!--一些内容--&gt;
  &lt;/el-table&gt;
&lt;/template&gt;
&lt;script&gt;
// 一些内容
data() {
  return {
    list: []
  }
}
created() {
  this.fetch() // 获取数据赋值list
}
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>我一开始也觉得这种写法无比正常，list需要是响应式的，因为需要table随着list的改变而改变，更何况<code>element-ui</code>官网的示例就是将list的声明放在data中。然鹅，真正起作用的是作为props传进table组件的list，而不是再父组件中的list。所以这个list的声明也是没有必要放在data里的。</li><li>还是以上面的table组件为例，因为vue会递归遍历data和props的所有属性，所以当list传进时，假设list的结构是这样的<code>[{id: 1, name: &#39;前端&#39;}]</code>,那么id和name两个属性也会被设置为响应式，如果需求这两个属性只需要展示，那么可以这样做<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function optimizeItem (item) {
  const data = {}
  Object.defineProperty(data, &#39;data&#39;, {
    configurable: false,
    value: item,
  })
  return data
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>通过设置属性的configurable为false来阻止vue再去修改他。</li></ul><h3 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack" aria-hidden="true">#</a> webpack</h3><h4 id="缩小文件搜索范围" tabindex="-1"><a class="header-anchor" href="#缩小文件搜索范围" aria-hidden="true">#</a> 缩小文件搜索范围</h4><ul><li>优化loader配置 使用loader时可以通过<code>test</code>、<code>include</code>、<code>exclude</code>来命中匹配的文件，让尽可能少的文件被处理。</li><li>resolve.alias<br> resolve.alias 通过别名来把原导入路径映射成一个新的导入路径，在项目种经常会依赖一些庞大的第三方模块，以react为例，默认情况下 Webpack 会根据库的package.json中定义的入口文件 ./node_modules/react/react.js 开始递归的解析和处理依赖的几十个文件，这会时一个耗时的操作。 通过配置 resolve.alias 可以让 Webpack 在处理 React 库时，直接使用单独完整的 react.min.js 文件，从而跳过耗时的递归解析操作。（vue系的库的入口文件就直接是一个单独的完整的文件，牛批） 一般对于整体性强的库可以使用这种方法，但是像loadsh这种，可能只使用了其中几个函数，如果也这样设置，就会导致输出文件中有很多废代码。<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>resolve: {
  alias: {
    &#39;react&#39;: path.resolve(__dirname, &#39;./node_modules/react/dist/react.min.js&#39;)
  }
},
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>resolve.extensions 在导入语句没带文件后缀时，Webpack 会根据<code>resolve.extensions</code>的配置带上后缀后去尝试询问文件是否存在。默认值是<code>[&#39;.wasm&#39;, &#39;.mjs&#39;, &#39;.js&#39;, &#39;.json&#39;]</code>(v4.41.2)。也就是说当遇到 require(&#39;./data&#39;) 这样的导入语句时，Webpack 会先去寻找 ./data.wasm 文件，如果该文件不存在就去寻找 ./data.mjs 文件，以此类推，最后如果找不到就报错。 如果这个列表越长，或者正确的后缀在越后面，就会造成尝试的次数越多，所以 resolve.extensions 的配置也会影响到构建的性能。 在配置 resolve.extensions 时你需要遵守以下几点，以做到尽可能的优化构建性能： 1、后缀尝试列表要尽可能的小，不要把项目中不可能存在的情况写到后缀尝试列表。 2、频率出现高的文件后缀要优先放在前面。 3、在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。例如在你确定的情况下把 require(&#39;./data&#39;) 写成 require(&#39;./data.json&#39;)。<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>resolve: {
  extensions: [&#39;.js&#39;, &#39;.vue&#39;],
},
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li>module.noParse 这个配置项可以让webpack对没有采用模块化的文件不进行处理，被忽略的文件不应该具有import、require等导入机制的调用。像上面<code>resolve.alias</code>中的单独的完整的<code>react.min.js</code>就没有采用模块化。忽略之后可以提高构建性能。<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module: {
  noParse: [/vue\\.runtime\\.common\\.js$/],
},
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="压缩代码" tabindex="-1"><a class="header-anchor" href="#压缩代码" aria-hidden="true">#</a> 压缩代码</h4><p>浏览器从服务器访问网页时获取的 JavaScript、CSS 资源都是文本形式的，文件越大网页加载时间越长。 为了提升网页加速速度和减少网络传输流量，可以对这些资源进行压缩。js可以使用webpack内置的<code>uglifyjs-webpack-plugin</code>插件，css可以使用<code>optimize-css-assets-webpack-plugin</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>optimization: {
  minimizer: [
    new UglifyJsPlugin(),
    new OptimizeCSSAssetsPlugin()
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="dllplugin" tabindex="-1"><a class="header-anchor" href="#dllplugin" aria-hidden="true">#</a> DllPlugin</h4><p>dll是动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据。包含基础的第三方模块(如vue全家桶)的动态链接库只需要编译一次，之后的构建中这些模块就不需要重新编译，而是直接使用动态链接库中的代码。所以会大大提升构建速度。 具体操作是使用<code>DllPlugin</code>和<code>DllReferencePlugin</code>这两个内置的插件，前者用于打包出动态链接库文件，后者用于主webpack配置中去引用。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 打包dll
entry: {
  vendor: [&#39;vue&#39;, &#39;vue-router&#39;, &#39;vuex&#39;],
},
output: {
  filename: &#39;[name].dll.js&#39;,
  path: path.resolve(__dirname, &#39;dist&#39;),
  library: &#39;_dll_[name]&#39;,
},
plugins: [
  new DllPlugin({
    name: &#39;_dll_[name]&#39;,
    path: path.join(__dirname, &#39;dist&#39;, &#39;[name].manifest.json&#39;),
  }),
],
// output和plugins中的[name]都是entry中的key，
// 也就是&#39;vender&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 引用
plugins: [
  new DllReferencePlugin({
    manifest: require(&#39;../dist/vendor.manifest.json&#39;),
  }),
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="happypack" tabindex="-1"><a class="header-anchor" href="#happypack" aria-hidden="true">#</a> happypack</h4><p>由于运行在Node.js之上的Webpack是单线程的，所以Webpack需要处理的任务会一件件挨着做，不能多个事情一起做。而HappyPack可以把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。不多bb上代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const HappyPack = require(&#39;happypack&#39;)

module: {
  rules: [
    {
      test: /\\.js$/,
      use: [&#39;happypack/loader?id=babel&#39;]
    }
  ],
},
plugins: [
  new HappyPack({
    // 用唯一的标识符 id 来代表当前
    // 的 HappyPack 是用来处理一类特定的文件
    id: &#39;bable&#39;,
    loaders: [&#39;babel-loader&#39;],
  })
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),h={href:"https://github.com/amireh/happypack/wiki/Loader-Compatibility-List",target:"_blank",rel:"noopener noreferrer"},p=i("s",null,[e("而在vue的项目中，使用模板语法的话大部分的业务js都是写在"),i("code",null,".vue"),e("文件中的，就可以通过配置vue-loader的options部分，将js部分交由happypack处理")],-1),g=l(`<blockquote><p><s>好像之前的vue-loader是支持的，改成需要在pulgins里面单独声明之后就不行了，而vue-loader升级是加快了打包速度的，强行为了使用happypack而降级有点舍本逐末的味道。</s></p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//rules: [
//  {
//    test: /\\.vue$/,
//    use: [
//      {
//        loader: &#39;vue-loader&#39;,
//        options: {
//          loaders: {
//            js: &#39;happypack/loader?id=babel&#39;
//          },
//        }
//      }
//    ]
//  }
//]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),f={href:"https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE",target:"_blank",rel:"noopener noreferrer"},x=i("code",null,".vue",-1),_=i("code",null,"/\\.js$/",-1),y=i("code",null,".vue",-1),k=i("code",null,"<script>",-1),w=i("h3",{id:"其他",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#其他","aria-hidden":"true"},"#"),e(" 其他")],-1),j=i("h4",{id:"webassembly",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#webassembly","aria-hidden":"true"},"#"),e(" WebAssembly")],-1),S=i("p",null,[e("了解这个东西是看webpack文档的时候，发现"),i("code",null,"resolve.extensions"),e("的默认配置是"),i("code",null,"['.wasm', '.mjs', '.js', '.json']"),e(",这个wasm甚至是排在第一位的，就去了解了一下，真是不看不知道一看吓一跳，这玩意儿也忒厉害咧，我的理解浏览器识别js代码的大概流程是下载->转换->编译，但是wasm可以跳过转换和编译两步，因为他本身就可以被浏览器识别，从而而且最近"),i("code",null,"WebAssembly"),e("也正式加入到W3C标准了，别问，问就是知识点。放一个[mdn对于WebAssembly的介绍]当作拓展阅读(https://developer.mozilla.org/zh-CN/docs/WebAssembly)")],-1);function P(C,L){const n=c("ExternalLinkIcon");return a(),r("div",null,[i("blockquote",null,[i("p",null,[e("这篇文章算是最近学习前端优化时的一点心得，为了对比强烈降低了CPU性能,文中代码在"),i("a",v,[e("github"),d(n)]),e("上也有一部分。 本文性能截图来自chrome自带的performance，不了解的可以看看跟他差不多的前世chrome timeline(介绍"),i("a",o,[e("传送门"),d(n)]),e(")。")])]),u,i("p",null,[e("可以把没有状态，没有this上下文，没有生命周期的组件，写为函数式组件，因为函数式组件只是函数，所以渲染开销也低很多。具体写法"),i("a",m,[e("官网传送门"),d(n)])]),b,i("p",null,[e("但是HappyPack(v5.0.1)并不支持vue-loader(v15.3.0)("),i("a",h,[e("支持列表"),d(n)]),e(")，"),p]),g,i("p",null,[e("不支持也没有关系，"),i("a",f,[e("vue Loader文档"),d(n)]),e("有说，在pulgins中引用可以将你定义过的其它规则复制并应用到"),x,e("文件里相应语言的块。例如，如果你有一条匹配"),_,e("的规则，那么它会应用到"),y,e("文件里的"),k,e("块。")]),w,j,S])}const B=s(t,[["render",P],["__file","几种常见的基础前端优化方式.html.vue"]]);export{B as default};
