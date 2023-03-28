import{_ as a,W as l,X as r,Y as e,Z as n,$ as s,a0 as t,C as d}from"./framework-c8ebc670.js";const c={},v=t(`<blockquote><p>hr小姐姐说一共有1轮笔试 + 3轮技术面 + 1轮hr面，面试地点在中关村天使大厦，岗位是1-3年前端，时间是2019年8月</p></blockquote><h2 id="笔试" tabindex="-1"><a class="header-anchor" href="#笔试" aria-hidden="true">#</a> 笔试</h2><p>笔试分为多选 简答 判断 手写代码四部分，下面只写了印象比较深的几道。</p><h4 id="多选" tabindex="-1"><a class="header-anchor" href="#多选" aria-hidden="true">#</a> 多选</h4><p>1、position为relative的元素可以使用top和left进行定位吗 答：可以。 我自己没见过这种写法，就没敢选，然后错。</p><p>2、以下哪个是加密算法 答：RES、DES。 md5不算加密算法。</p><h4 id="简答" tabindex="-1"><a class="header-anchor" href="#简答" aria-hidden="true">#</a> 简答</h4><p>这部分题目是给出代码，让你写输出 1、</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>setTimeout(() =&gt; {console.log(1)})
const promise = new Promise(resolve =&gt; {
setTimeout(() =&gt; {console.log(2)})
  resolve()
})
promise.then(() =&gt; {console.log(3)})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答：312。 考察macro/micro task</p><p><em>2020.5.29更新</em><em>这两天去面试又栽在这个题的plus版上了，看题</em></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>async function f1() {
  print(2)
  await print(3);
  await print(3.5);
  print(4)
}
new Promise((res, rej) =&gt; {
  setTimeout(() =&gt; {
    print(8)
  })
  print(7)
  res()
}).then(() =&gt; {
  print(9)
})
f1()
// 答案在文末
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await",target:"_blank",rel:"noopener noreferrer"},u=e("code",null,"f1",-1),m=e("code",null,"promise",-1),b=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>async function f1() {
  print(2)
  Promise.resolve(print(3)).then(() =&gt; {
    Promise.resolve(print(3.5)).then(() =&gt; {
      print(4)
    })
  })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),p=e("em",null,"对了 ie不支持async/await语法，不愧是你 ie",-1),g=e("code",null,"eventLooooooop",-1),h={href:"https://juejin.cn/post/6844903487700992007",target:"_blank",rel:"noopener noreferrer"},x=e("br",null,null,-1),f=e("br",null,null,-1),_=e("br",null,null,-1),y=t(`<p>2、</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(var i = 1; i &lt; 3; i++) {
  setTimeout(() =&gt; {console.log(i)})
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答：3 3 考察异步，这个题简直是必考题 变种：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(let i = 1; i&lt; 3; i++) {
  setTimeout(() =&gt; {console.log(i)})
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答：1 2 用let的话就会每轮循环都是一个崭新的i</p><p>3、</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function A() {
  this.a = &#39;hi&#39;
  console.log(this.a)
}
A.prototype.a = &#39;hello&#39;
const a = new A()
console.log(a.a)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>答：hi hi 考察原型链，<code>A.prototype.a = &#39;hello&#39;</code>,修改的是a原型上的a属性，与a本身的a属性无瓜。 浏览器运行截图<img src="https://segmentfault.com/img/bVbvat5" alt="简答第三题"></p><p>4、</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[] == false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>答：true 考察类型转换，双等运算两边先转换为Number</p><p>5、</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[1,2,3].push(4)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>答：4 考察常用函数返回值, 数组的push和unshift都返回最新数组的长度</p><h4 id="判断" tabindex="-1"><a class="header-anchor" href="#判断" aria-hidden="true">#</a> 判断</h4><p>判断就5道题，挺简单的，没啥印象</p><h4 id="手写代码" tabindex="-1"><a class="header-anchor" href="#手写代码" aria-hidden="true">#</a> 手写代码</h4><p>手写一个节流函数，这个网上一搜一大把就不说了</p><h2 id="一面" tabindex="-1"><a class="header-anchor" href="#一面" aria-hidden="true">#</a> 一面</h2><p>笔试写了大概30-40分钟，一面的面试官就来了，看答题情况的时候顺便要求介绍一下自己，然后针对题目做了一些讲解，然后开始问问题。 1、再手写一个防抖,我写了一个第一次触发事件不会调用回调的，面试官又问如果希望首次也会调用怎么写，代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var debounce = function(fn, delayTime, immediate) {
  var timeId;
  return function() {
    var context = this, args = arguments;
    if(immediate) {
      var callNow = !timeId;
      if(callNow) {
        fn.apply(context, args);
      }
    }
    timeId &amp;&amp; clearTimeout(timeId);
    timeId = setTimeout(function() {
      fn.apply(context, args);
    }, delayTime)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后还聊了一下时间戳和定时器的方式实现节流的不同，需要注意箭头函数是不可以使用arguments对象的，所以返回的函数必须要写成<code>return function() {}</code></p><p>2、有什么实现深拷贝的方法吗       我一开始以为他说api，就回答JSON.parse(JSON.stringfy())和MessageChannel,他问有什么问题吗。我说不能解决复制函数和环的问题。他又问那你能自己实现一个吗，继续手写代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function isObject(obj) {
  return obj !== null &amp;&amp; typeof obj === &#39;object&#39;
}
function cloneDeep(obj) {
  let result = {}
  const keys = Object.keys(obj);
  for(let i = 0, len = keys.length; i &lt; len; i++) {
    if(isObject(obj[keys[i]])){
      result[keys[i]] = cloneDeep(obj[keys[i]])
    } else {
      result[keys[i]] = obj[keys[i]]
    }
  }
  return resultset
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),C=e("em",null,"2020.2.5更新",-1),P={href:"https://segmentfault.com/a/1190000021682472",target:"_blank",rel:"noopener noreferrer"},k=t(`<p>3、如何用css画一个三角形 答：heigh: 0; width: 0; border: 100px, solid, transparent; border-bottom: 100px, solid, yellow;</p><p>4、怎么实现垂直居中 答：position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); 还有flex;</p><p>5、简单说一下前端优化策略 答：减少请求，他：具体应该怎么减少，我：比如图片懒加载，配置svg-sprite-loader打包一张svg图面，然后就是减少dom操作，减少浏览器回流重绘次数，减少作用域链的查找，减少对象的深度查找。他：还有吗。我：暂时想不起其它了 优化涉及的东西太多了，以后再单独总结吧。</p><p>6、new一个对象的时候发生了什么 这个问题是讲解笔试简答第三题时候问的 正确答案：1.创建一个空对象; 2.设置创建对象的__proto__属性的值为构造函数的prototype属性的值; 3.将第一步创建的空对象作为this的上下文,执行构造函数代码; 如果构造函数没有返回对象,那么返回this</p><p>7、看你简历上写最近在看vue源码，那你知道nextTick咋实现的吗 答：2.6的版本是promise，mutationObserver，setTimeout，setImmediate</p><p>      至此面试官说一面差不多就到这里，算法啥的留给二面吧，他给我的一面评价是知识广度不够（因为笔试错了比较多），但是感觉人比较有灵性，可以进入二面，然后就去叫下一个boss了。</p><h2 id="二面" tabindex="-1"><a class="header-anchor" href="#二面" aria-hidden="true">#</a> 二面</h2><p>      二面面试官看起来比前一个要严厉好多,以为要问一些算法题,结果&quot;一面反馈基础不够扎实,那我就再问一点&quot; &quot;GG&quot; 1、import和require的区别 答:import输出引用,require输出拷贝。他：还有吗。 我：不知道了。他：还有require是运行时加载，import是编译时输出接口。</p><p>2、说一下浏览器的事件传播机制 答:不知道 正确答案: 事件传播分为三个阶段：捕获，目标对象，冒泡。其中捕获是事件对象从window派发到目标对象父级的过程；目标阶段是事件对象派发到目标元素时的阶段，如果事件类型指示不冒泡，那事件传播在此阶段终止；冒泡和捕获相反，是以目标对象父级到window的过程。</p><p>3、手写一个bind 答：不知道。 平时用的都是call和apply来改this，bind只用过一两次，手写call也看过，但是我连bind的参数是啥都没印象，写个锤子。 正确答案：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>///使用call
Function.prototype.cvBind = function() {
  var self = this
  var context = [].shift.call(arguments)
  var args = Array.from(arguments)
  return function() {
    return self.call(context, ...args)
  }
}
// 不用call
Function.prototype.cvBind = function() {
  var context = [].shift.call(arguments)
  context.fn = this
  var args = []
  var argument = [].slice.call(arguments, 0)
  for(var i = 0, len = argument.length; i &lt; len; i++) {
    args.push(&#39;argument[&#39; + i + &#39;]&#39;)
  }
  return function() {
    var result = eval(&#39;context.fn(&#39; + args + &#39;)&#39;)
    delete context.fn
    return result
  }
}
// 测试
var obj = {
  a: &#39;local&#39;,
  log: function(x, y) {
    console.log(this.a, x, y)
  }
}
var a = &#39;window&#39;
obj.log(&#39;arg1&#39;, &#39;arg2&#39;)
var func = obj.log.cvBind(window, &#39;arg1&#39;, &#39;arg2&#39;)
func()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意不用call的版本需要拷贝一次arguments，不然return的函数中args数组里都是undefined，上面的代码不考虑参数是引用类型变量。</p><p><em>2019.10.29更新</em><em>因为return的是一个<code>function(){}</code>而不是箭头函数，所以存在自己的arguments而不能使用闭包中的arguments，这里拷贝一遍是可以的可以，但是也可以返回一个箭头函数来直接使用父作用域中的arguments</em></p><p><em>2020.5.29更新</em><em>原文中 bind的写法依然有一个问题，就是使用这样的 bind进行柯里化的时候，不能正确拼接多个参数。</em></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var add = (a, b) =&gt; a + b
add.bind(null, 1).bind(null, 2)()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>mdn官方实现方法如下</em></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var slice = Array.prototype.slice;
Function.prototype.bind = function() {
  var thatFunc = this, thatArg = arguments[0];
  var args = slice.call(arguments, 1);
  if (typeof thatFunc !== &#39;function&#39;) {
    throw new TypeError(&#39;Function.prototype.bind - &#39; +          &#39;what is trying to be bound is not callable&#39;);
  }
  return function(){
    var funcArgs = args.concat(slice.call(arguments))
    return thatFunc.apply(thatArg, funcArgs);
  };
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、写一个继承 答：不知道 正确答案： 4.1类式继承，通过构造函数实现继承</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//父类
function Parent(name) {
  this.name = name || &#39;parent&#39;
}
Parent.prototype.say = function() {
  return this.name
}
//子类
function Child() {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.1.1 父类对象继承</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Child.prototype = new Parent(&#39;child&#39;)

var child = new Child()
child.say()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种继承方式，子类继承父类自身属性和父类原型上的属性，但是缺点在于初始化父类对象指给子类原型时，并不能确定父类构造函数的初始化参数。 4.1.2 改造子类构造函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function Child() {
  Parent.apply(this, arguments)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>弟中弟方法，只能继承父类自身方法 4.1.3 共享原型</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Child.prototype = Parent.prototype
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>弟中弟中弟，共享一个原型，子类修改会影响父类（然而面试的时候脑子里浮现的就是这种） 4.1.4 临时构造函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function inherit(Child, Parent) {
  var F = function() {}
  F.prototype = Parent.protoType
  Child.protoype = new F()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用一个空函数F()充当子类父类之间的代理，既可以实现父类原型属性的继承，也可以在子类原型上随意拓展 使用<code>Object.create()</code>可以达到相同效果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Child.prototype = Object.create(Parent.prototype)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,29),w=e("code",null,"Child.prototype.constructor = Child",-1),j={href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor",target:"_blank",rel:"noopener noreferrer"},T=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function Parent() {};
function CreatedConstructor() {}

CreatedConstructor.prototype = Object.create(Parent.prototype);

CreatedConstructor.prototype.create = function create() {
  return new this.constructor();
}

new CreatedConstructor().create().create(); // error undefined is not a function since constructor === Parent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，将显示异常，因为构造函数链接到Parent。为了避免它，只需分配将要使用的必要构造函数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function Parent() {}; 
function CreatedConstructor() {} 

CreatedConstructor.prototype = Object.create(Parent.prototype); 
CreatedConstructor.prototype.constructor = CreatedConstructor; // set right constructor for further using

CreatedConstructor.prototype.create = function create() { 
  return new this.constructor();
} 

new CreatedConstructor().create().create(); // it&#39;s pretty fine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例2：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function ParentWithStatic() {}

ParentWithStatic.startPosition = { x: 0, y:0 };
ParentWithStatic.getStartPosition = function getStartPosition() {
  return this.startPosition;
} 

function Child(x, y) {
  this.position = {
    x: x,
    y: y
  };
}

Child.prototype = Object.create(ParentWithStatic.prototype); 
Child.prototype.constructor = Child;

Child.prototype.getOffsetByInitialPosition = function getOffsetByInitialPosition() {
  var position = this.position;
  var startPosition = this.constructor.getStartPosition(); // error undefined is not a function, since the constructor is Child

  return {
    offsetX: startPosition.x - position.x,
    offsetY: startPosition.y - position.y
  }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于此示例，就需要保持父构造函数继续正常工作。</p><p>结论：手动设置或更新构造函数可能会导致不同且有时令人困惑的后果。为了防止它，只需在每个特定情况下定义构造函数的角色。<strong>在大多数情况下，不使用构造函数，并且不需要重新分配构造函数。</strong></p><p>4.2 通过复制属性实现继承 浅拷贝和4.1.3的共享原型没区别，深拷贝继承之后修改父类，子类不会改变。都有问题不过也是一种思路，顺带一提。</p>`,8),O={href:"https://segmentfault.com/a/1190000015597029",target:"_blank",rel:"noopener noreferrer"},S=e("p",null,"balabala一些客套话，问我有什么问题，我说没有，然后结束。",-1),A=e("p",null,"##路漫漫其修远兮## 认识到差距也更有前进的动力，继续加油",-1),N=e("p",null,[n("============================================="),e("br"),n(" 答案：7 2 3 9 3.5 4 8")],-1);function F(I,q){const i=d("ExternalLinkIcon");return l(),r("div",null,[v,e("p",null,[e("em",null,[n("我看 macro/micro的时候也没见说 async是哪种，查看 "),e("a",o,[n("mdn"),s(i)]),n('，他说 "如果 await 后面的值不是一个 Promise，await 会把该值转换为已正常处理的 Promise，然后等待其处理结果。"也就是说题目中的 '),u,n(" 里面的代码转换成 "),m,n(" 版本就是这样⬇")])]),b,e("p",null,[p,n(" ------------2021.3.23更新-------- 最近看到一篇讲 "),g,n(" 的"),e("a",h,[n("好文"),s(i)]),n("，里面第三节 microTask执行时机讲的真的很好，强烈推荐，下面是我总结的他的总结 1、每个eventloop 有三部分：task，microTask， 可能存在UI render"),x,n(" 2、microTask中注册的microTask会直接添加到当前microTask队列"),f,n(" 3、microTask的执行时机为‘尽可能早’，只要JavaScript执行栈为空就会执行，一轮eventloop可能不止一轮microTask执行"),_,n(" 4、从不同task源来的task可能会被放进不同的task队列， 通过区分队列的优先级来保证更好的交互体验（比如鼠标和键盘事件的task队列优先级就会比较高） ------------2021.3.23更新完--------")]),y,e("p",null,[n("      写完之后他又问我应该如何判断一个变量是数组，答Array.isArray()和Object.prototype.toString.call(arr) === '[object Array]'，回来反思发现可能是写深拷贝的时候忘记了数组的情况，然后他才问的判断数组。 "),C,e("em",null,[n("深拷贝写的是个p，正确写法参照"),e("a",P,[n("解决循环引用和相同引用的js深拷贝实现"),s(i)])])]),k,e("p",null,[n("4.1.5 关于protptype.constructor 整理资料的时候，发现有些在继承后又写了一句"),w,n(",有些就没有。首先这个constructor时创建实例对象的构造函数的引用，然后就是这句话到底有用没用，下面是ctrl cv自"),e("a",j,[n("MDN"),s(i)]),n("的两个例子以及结论 示例1：")]),T,e("p",null,[n("5、跨域有哪些解决方案 答：iframe, jsonp, cors。他：用过jsonp吗。答：没有，用的都是cors。他：那说一下cors是怎么解决跨域问题的。我：不知道。他：那请求头里有哪些相关的字段。我：（我知道你真的很给机会了但是对不起我是个菜鸡我真的）不知道。他：用过nginx吗。我：没有。 正确答案："),e("a",O,[n("点这里"),s(i)])]),S,A,N])}const W=a(c,[["render",F],["__file","一篇字节跳动前端面经.html.vue"]]);export{W as default};
