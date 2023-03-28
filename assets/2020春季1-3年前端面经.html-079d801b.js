import{_ as a,W as r,X as l,Y as n,Z as e,$ as d,a0 as s,C as t}from"./framework-c8ebc670.js";const c={},v=s('<h2 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> css</h2><h4 id="z-index在什么情况下失效" tabindex="-1"><a class="header-anchor" href="#z-index在什么情况下失效" aria-hidden="true">#</a> z-index在什么情况下失效</h4><p>z-index只作用于被定位了的元素上，还有就是子元素的z-index会被父的值覆盖(准确的说应该是使用z-index后，父元素和子元素处在不同的层叠上下文中，他们的z-index应该分别与他们的兄弟元素比较。)。</p><h4 id="box-sizing-有哪些值" tabindex="-1"><a class="header-anchor" href="#box-sizing-有哪些值" aria-hidden="true">#</a> box-sizing 有哪些值</h4><p>有 <code>content-box</code> 和 <code>border-box</code> 两个，前者是默认值，指设定的width只包含content的宽，不包含border和padding，后者都包括。 这个问的还挺多的有的是给html+css代码叫算大小的，有的是口头表达的。</p><h4 id="display-none和visibility-hidden和opacity-0有什么区别" tabindex="-1"><a class="header-anchor" href="#display-none和visibility-hidden和opacity-0有什么区别" aria-hidden="true">#</a> display:none和visibility:hidden和opacity:0有什么区别</h4><table><thead><tr><th>display:none</th><th>visibility:hidden 和 opacity:0</th></tr></thead><tbody><tr><td>不在文档流中；会引起回流(重排)；不被子继承</td><td>在文档流中；会引起重绘；<strong>相当于</strong>继承</td></tr></tbody></table><table><thead><tr><th>visibility:hidden</th><th>opacity:0</th></tr></thead><tbody><tr><td>不能监听事件；子元素可以通过设置 visibility: visible来取消隐藏</td><td>可以监听事件；子元素不能通过opacity: 1来取消隐藏</td></tr></tbody></table><p>点击劫持就是通过opacity可以监听事件的特性实现的；<br> opacity的继承其实和z-index相同，opacity的属性不为1时，会把元素放置在一个新的层叠上下文中。</p><h4 id="flex相关属性值以及他们的意义" tabindex="-1"><a class="header-anchor" href="#flex相关属性值以及他们的意义" aria-hidden="true">#</a> flex相关属性值以及他们的意义</h4>',10),u={href:"http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html",target:"_blank",rel:"noopener noreferrer"},o=n("h4",{id:"css优化手段",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#css优化手段","aria-hidden":"true"},"#"),e(" css优化手段")],-1),m={href:"https://tylercipriani.com/blog/2016/09/25/the-14kb-in-the-tcp-initial-window/",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"coverage",-1),h=n("code",null,"canvas",-1),p={href:"https://www.jianshu.com/p/d1e16a2e88c1",target:"_blank",rel:"noopener noreferrer"},g=s(`<h2 id="js" tabindex="-1"><a class="header-anchor" href="#js" aria-hidden="true">#</a> JS</h2><h4 id="map和filter的区别" tabindex="-1"><a class="header-anchor" href="#map和filter的区别" aria-hidden="true">#</a> map和filter的区别</h4><p>map的回调里return啥就是啥，filter的回调里返回的布尔值决定当前项是否会存到新的数组里。 我其实没懂这个是想问啥，因为笔试遇到这道题的时候其他题都还挺有意思的，有点把我整懵了。</p><p>// 2020.11.16更新</p><h4 id="event-target和evevt-currenttarget的区别" tabindex="-1"><a class="header-anchor" href="#event-target和evevt-currenttarget的区别" aria-hidden="true">#</a> event.target和evevt.currentTarget的区别</h4><p>面试的时候被问到这个东西，我当时不知道，面完之后查了一下，也是只知其然，最近才了解到可能面试官是想问事件委托。 事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。 优点：减少事件注册，节省内存；简化了dom节点更新时相应事件的更新，比如不用在新添加的子节点上绑定事件，也不用在需要删除时解绑事件。 需要注意的是事件委托基于冒泡，对于不冒泡的事件不支持。 // 2020.11.16更新 完</p><h4 id="sleep" tabindex="-1"><a class="header-anchor" href="#sleep" aria-hidden="true">#</a> sleep</h4><p>单独实现一个sleep很简单</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function sleep(time) {
  return new Promise((res) =&gt; {
    setTimeout(res, time)
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是面试过程中，碰到了一道笔试题非常有意思，大概是这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//实现
Person(&#39;Jack&#39;).eat(&#39;lunch&#39;).sleep(2).eat(&#39;dinner&#39;).firstSleep(5)
//输出

// 等待5s
firstSleep 5s
Hi, my name is Jack
Eat lunch
// 等待2s
sleep 2s
Eat dinner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我一开始的思路是使用<code>setTimeout</code>和<code>Promise</code>的<code>macro/micro</code>特征，即firstSleep使用Promise，其他全部使用setTimeout，在这样的思路下，sleep和eat大概是这样的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sleep(time) {
  this.sleepTime += time
  setTimeout(() =&gt; {
    log(&#39;balabala&#39;)
  }, this.sleepTime)
  return this
}
eat(food) {
  setTimeout(() =&gt; {
    log(&#39;balabala&#39;)
  }, this.sleepTime)
  return this
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那后面的firstSleep就根本没法写了，前面时常为this.sleepTime没有操作空间了。 产生这样的错误思路的原因是对上面说的<code>sleep</code>函数或者是浏览器的事件循环理解不透彻。 这里我们需要的是一个双向队列(好像是叫这个 吧)，即正常情况的链式调用中往队列中<code>push</code>，遇到firstSleep就<code>unshift</code>，在Person的构造函数中定义一个setTimeout来开始执行这个双向队列中的函数(就像串联多个异步任务时用于连接每个任务的<code>next()</code> )。 代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const log = console.log
const deque = []
function next() {
  const fn = deque.shift()
  fn &amp;&amp; fn()
}
function Person(name) {
  deque.push(() =&gt; {
    log(\`Hi, my name is \${name}\`)
    next()
  })
  setTimeout(() =&gt; {
    next()
  }, 0)
  return this
}
Person.prototype = {
  eat(food) {
    deque.push(() =&gt; {
      log(\`Eat \${food}\`)
      next()
    })
    return this
  },
  sleep(time) {
    deque.push(() =&gt; {
      setTimeout(() =&gt; {
        log(\`sleep \${time}s\`)
        next()
      }, time * 1000)
    })
    return this
  },
  sleepFirst(time) {
    deque.unshift(() =&gt; {
      setTimeout(() =&gt; {
        log(\`sleepFirst \${time}s\`)
        next()
      }, time * 1000)
    })
    return this
  }
}

new Person(&#39;Jack&#39;).eat(&#39;lunch&#39;).sleep(2).eat(&#39;dinner&#39;).sleepFirst(2)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再观察到题目中没有new关键字，写个函数包一下就好</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function _Person(name) {
  return new Person(name)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="currying" tabindex="-1"><a class="header-anchor" href="#currying" aria-hidden="true">#</a> currying</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 实现三数相加的add函数
add(1,2,3) // 6
add(1,2)(3) // 6
add(1)(2)(3) // 6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现一个函数柯里化不难，主要通过判断当前参数数量与目标函数参数数量，不够的话返回函数，够了的话返回结果，两种实现手段如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const sum3 = (x, y, z) =&gt; x + y + z
const add = currying(sum3)

// 方法1
function currying1(fn) {
  /*
  *@param{ Number } n 目标函数期望剩余参数数量
  *@param{ Array } args 已有参数数组
  */
  function next(n, args) {
    return (...xs) =&gt; {
      if(n &lt;= xs.length) {
        return fn(...args, ...xs)
      }
      return next(n - xs.length, [...args, ...xs])
    }
  }
  return next(fn.length, [])
}
// 方法2
function currying2(fn) {
  return (...a) =&gt; {
    if(a.length &gt;= fn.length) {
      return fn(...a)
    }
    return currying2(fn.bind(null, ...a))
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思路都一样的，方法1中合并参数的<code>[...args, ...xs]</code>操作其实就是bind函数最后return里的合并arguments。</p><p>柯里化的部分就完了，但是如果还是这个add，想实现的是不知道多少个参数相加呢。 与柯里化相同的是在函数内部保存已经收集的参数，不同的是柯里化可以通过判断参数数量来决定返回值，新需求需要重写返回函数的<code>toString</code>来输出最后执行的返回值。</p><blockquote><p>JavaScript calls the <code>toString</code> method automatically when a <code>Function</code> is to be represented as a text value, e.g. when a function is concatenated with a string.</p></blockquote><p>代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function add() {
  var args = Array.prototype.slice.call(arguments)
  
  var adder = function() {
    args.push(...arguments)
    return adder
  }
  
  adder.toString = function() {
    return args.reduce((a, b) =&gt; a + b)
  }
  return adder
}

add(1, 2, 3)(4)(5) // f 15
add(1, 2, 3)(4)(5) + 0 // 15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看起来是成了，但是如果不转换类型的话，输出的结果前有个 <code>f</code> ，这让我很疑惑，找了很多资料也没有结果，如果你知道的话，还请不吝赐教。</p><h2 id="vue" tabindex="-1"><a class="header-anchor" href="#vue" aria-hidden="true">#</a> Vue</h2><h4 id="父子组件钩子顺序" tabindex="-1"><a class="header-anchor" href="#父子组件钩子顺序" aria-hidden="true">#</a> 父子组件钩子顺序</h4><p>父beforeCreate 父created 父beforeMount 子beforeCreate 子created 子beforeMount 子mounted 父mounted 子组件是先于父组件mounted的。</p><h4 id="数据变动之后会立即更新dom吗" tabindex="-1"><a class="header-anchor" href="#数据变动之后会立即更新dom吗" aria-hidden="true">#</a> 数据变动之后会立即更新dom吗</h4><p>这个题也挺有意思的，是在vue双向绑定原理之后问的，有意思不是在于多难或者多偏，而是能感到面试管真的在考验你的能力，不是看你会背多少面试题。题目是这样的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// ...
data() {
  return {
    title: &#39;abc&#39;
  }
}
methods: {
  change: function() {
    this.title = &#39;1&#39;
    this.title = &#39;2&#39;
    this.title = &#39;3&#39;
    // 调用change之后dom更新几次
  }
}
// ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>猜也能猜到肯定是更新一次。但是我想到别的地方原因说错了淦。具体原因是Vue把更新都借用自己的 <code>nextTick</code> 去异步更新。 下面这段如果不熟的话建议配和Vue(2.6.10)源码一起食用。 调用 <code>change</code> 之后，顺序同步执行三次 <code>defineProperty</code> 里的 <code>set</code>, 也就是顺序同步三次 <code>Watcher</code> 的 <code>update</code> 方法，<code>update</code>的核心是 <code>queueWatcher</code>,</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      // ...
    }
    // queue the flush
    if (!waiting) {
      waiting = true
      // ...
      nextTick(flushSchedulerQueue)
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码里的 <code>has</code> 就是用来过滤相同 watcher ，虽然后面的被无情抛弃了，但是只要有这个watcher的id，异步更新的时候使用的也是同步修改的数据。</p><h4 id="vue-router两种模式-hash-和-history-的区别" tabindex="-1"><a class="header-anchor" href="#vue-router两种模式-hash-和-history-的区别" aria-hidden="true">#</a> vue-router两种模式 hash 和 history 的区别</h4><p>最直观的区别是hash模式带 &#39;#&#39; history模式使用h5新增的 <code>pushState</code> 和 <code>replaceState</code>，他们用来修改浏览器的历史记录栈，修改时不会立即发送请求。</p><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><h4 id="sourcemap" tabindex="-1"><a class="header-anchor" href="#sourcemap" aria-hidden="true">#</a> sourcemap</h4><p>简单来说 sourcemap 是一个存储源代码与编译代码对应位置映射的信息文件。 比如使用webpack在开发环境调试代码的时候，浏览器下载的并不是你写的源码，而且经过webpack压缩混淆合并等操作之后的代码，那为什么你的debugger还能在你写的地方生效呢，这就是sourcemap的作用。</p><h2 id="一些感想" tabindex="-1"><a class="header-anchor" href="#一些感想" aria-hidden="true">#</a> 一些感想</h2><p>能看到这篇文章大概率说明你在准备面试，如果你是萌新没怎么面过，那我可以告诉你不管是大厂还是小作坊，面试过程有很大比重是介绍你简历中写的能力和项目，与其盲目的在面试题海里不知所措，不如好好准备简历拿下那些送分题。如果你是久经沙场的<s>秃头</s>码农 ，那也希望这篇文章能帮助到你。</p>`,43);function x(f,y){const i=t("ExternalLinkIcon");return r(),l("div",null,[v,n("p",null,[e("flex是布局的大方向，问的频率也挺高的，要么是问垂直居中的时候引出来，要么是叫你实现一个简单布局然后引出来，不清楚的可以看一哈阮一峰老师的教程("),n("a",u,[e("传送门"),d(i)]),e(")")]),o,n("p",null,[e("这种优化的手段是说不完的，我也仅表达一下自己现阶段的一些理解。 1、提高加载速度：比如最最最基础的压缩文件大小，还有可以通过内联css来使浏览器开始页面渲染的时间提前，文件大小需要控制在14.6kb(因为"),n("a",m,[e("初始拥塞窗口"),d(i)]),e("存在限制)，还有就是chrome自带的 "),b,e(" 标签，可以分析js和css文件的使用率，然后我们去进一步做懒加载或者移除无用代码。 2、提高选择器的性能，比如不要嵌套太多复杂的层级，选择器从右到左匹配。 3、提高渲染速度，这个我也不太懂，只是最近看"),h,e("的时候，mdn里关于canvas优化提到CSS transforms使用GPU，因此速度更快，找到了一篇文章介绍使用transform与否的对比演示，也解释了为什么会更快，感觉不错，"),n("a",p,[e("文章传送门"),d(i)]),e("。")]),g])}const w=a(c,[["render",x],["__file","2020春季1-3年前端面经.html.vue"]]);export{w as default};
