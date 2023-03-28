import{_ as s,W as a,X as c,Y as e,Z as n,$ as t,a0 as l,C as r}from"./framework-c8ebc670.js";const d={},o={href:"https://www.jianshu.com/p/d3ee32538b53",target:"_blank",rel:"noopener noreferrer"},p=l(`<h2 id="一、源码" tabindex="-1"><a class="header-anchor" href="#一、源码" aria-hidden="true">#</a> 一、源码</h2><p>       关于vue中nextTick方法的实现位于vue源码下的src/core/util/next-tick.js，（<strong>下文所提到的next-tick.js都是指这个文件</strong>）由于篇幅原因就不全粘过来了，下面随着分析会贴出主要代码片段。</p><h2 id="二、分析" tabindex="-1"><a class="header-anchor" href="#二、分析" aria-hidden="true">#</a> 二、分析</h2><ol><li><h4 id="函数定义" tabindex="-1"><a class="header-anchor" href="#函数定义" aria-hidden="true">#</a> 函数定义</h4><p>将nextTick定义到Vue原型链上代码位于src/core/instance/render.js,代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Vue.prototype.$nextTick = function (fn: Function) {
  return nextTick(fn, this)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码中return的nextTick就是我们本文主角，他的定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function nextTick (cb?: Function, ctx?: Object) { // next-tick.js line87
  let _resolve
  callbacks.push(() =&gt; {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, &#39;nextTick&#39;)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  if (!cb &amp;&amp; typeof Promise !== &#39;undefined&#39;) {
    return new Promise(resolve =&gt; {
      _resolve = resolve
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1）函数参数cb?: Function，意味参数cb(callback)的类型为函数或undefined，ctx(context)同理，这种类型判断是TypeScript的写法。<br>       同时可以看到我们常用的this.$nextTick()已经 在定义到原型链上时 给nextTick函数传了ctx参数也就是指向当前组件的this。(这句话好绕，暴露了自己的语文水平)<br> 2）函数体内<code>callbacks</code>是在next-tick.js line10定义的一个数组，判断如果参数cb不为undefined，就把cb push到callbacks中，如果cb为undefined，则把<code>_resolve(ctx)</code>push到callbacks中。<br>       因为平时使用都是传回调的，所以很好奇cb什么情况下会为undefined，去翻看Vue官方文档发现：</p><blockquote><p>2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。</p></blockquote><p>      这就对了，函数体内最后的if判断很明显就是这个意思<code>if (!cb &amp;&amp; typeof Promise !== &#39;undefined&#39;)</code>没有回调&amp;&amp;支持Promise。<br>       在测试工程里写如下代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>created() {
  Vue.nextTick(undefined, { a: &#39;in nextTick&#39; }).then(ctx =&gt; {
    console.log(ctx.a)
  })
  console.log(&#39;out nextTick&#39;)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>      运行结果如下<img src="https://segmentfault.com/img/bVbqIzC?w=517&amp;h=79" alt="nextTick().then()">      没有任何问题（注意测试要使用Vue.nextTick而不是$nextTick，因为上文讲到过$nextTick函数的ctx参数是当前组件）<br> 3) 函数体内只剩下中间<code>if (!pending)</code>,这段代码很好懂，pending明显是一个状态位，而<code>timerFunc()</code>就应该是nextTick实现异步的核心了</p><hr></li><li><h4 id="timerfunc" tabindex="-1"><a class="header-anchor" href="#timerfunc" aria-hidden="true">#</a> timerFunc</h4></li></ol><p>      在代码中搜索timerFunc发现除了声明和nextTick函数中，还有四处使用timerFunc的代码片段，这四处代码片段被嵌套在一个大的<code>if else</code>判断里</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  if (typeof Promise !== &#39;undefined&#39; &amp;&amp; isNative(Promise)) { // next-tick.js line42
    timerFunc = ...
  } else if (!isIE &amp;&amp; typeof MutationObserver !== &#39;undefined&#39; &amp;&amp; (
    isNative(MutationObserver) ||
    MutationObserver.toString() === &#39;[object MutationObserverConstructor]&#39;
  )) {
    timerFunc = ...
  } else if (typeof setImmediate !== &#39;undefined&#39; &amp;&amp; isNative(setImmediate)) {
    timerFunc = ...
  } else {
    timerFunc = ...
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;可以看到nextTick优先使用microTask（Promise和MutationObserver）然后使用macroTask（setImmediate和setTimeout）这也符合尤大在2.6.0的更新日志中说的  
&gt;**next-tick**: revert nextTick to alaways use microtask 

&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;~~首先这个alaways是不是拼错了~~  
&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;不太对啊，我是不是对always有什么误解，这不是明明还用macroTask的可能吗  
&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;至于具体在不同的异步方式中是如何定义\`timerFunc\`的大同小异，如果仔细讲解的话还要花费部分篇幅说明MutationObserver，毕竟我们的主角是nextTick，这里就不喧宾夺主,反正都是把\`timerFunc\`定义为在异步中调用\`flushCallbacks\`的函数，而函数\`flushCallbacks\`的定义在源码中如下  
\`\`\`
function flushCallbacks () { // next-tick.js line13
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i &lt; copies.length; i++) {
    copies[i]()
  }
}
\`\`\`
&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp; 因为callbacks里都是函数，所以一层深拷贝的方式就可以满足复制需求，定义一个copies数组等于callbacks,然后清空callbacks，然后遍历copies数组调用其中的函数。  
</code></pre><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2><p>      nextTick实现流程大致是这样的：</p><div class="language-flow line-numbers-mode" data-ext="flow"><pre class="language-flow"><code>st<span class="token operator">=&gt;</span>operation<span class="token operator">:</span> 将回调函数push到callbacks数组中
op<span class="token operator">=&gt;</span>operation<span class="token operator">:</span> <span class="token function">调用timerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>根据不同情况采用不同异步方式调用flushCallbacks
e<span class="token operator">=&gt;</span>operation<span class="token operator">:</span> 刷新callbacks数组，遍历并调用其中所有函数
st<span class="token operator">-</span><span class="token operator">&gt;</span>op<span class="token operator">-</span><span class="token operator">&gt;</span>e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>      能看懂一部分Vue源码对于我这种入行不到一年的萌新还是非常有成就感的一件事，但是还有两个地方有些疑虑,上文也都有提及：</p><ol><li>箭头函数不能改变this指向为什么使用nextTick的时候可以使用箭头函数，即nextTick函数定义中的<code>cb.call(ctx)</code></li><li>为什么更新日志中写的是always use microtask，而我找到的源码中是存在使用macroTask的情况的<br>       后续将对问题的解决进行补充，也欢迎大佬在线评论传道授业</li></ol><hr><p>2019/4/14<br>       对于之前的两个问题，我只能做出Vue本身使用了一部分babel的猜测，不过这两个问题不影响整体逻辑的理解就是了</p>`,14);function u(m,b){const i=r("ExternalLinkIcon");return a(),c("div",null,[e("blockquote",null,[e("p",null,[n("Firstly, this paper is based on Vue 2.6.8 刚开始接触Vue的时候，哇nextTick好强，咋就在这里面写就是dom更新之后，当时连什么macrotask、microtask都不知道(如果你也不是很清楚，推荐"),e("a",o,[n("点这里"),t(i)]),n("去看一下，也有助于你更好地理解本文)，再后来，写的多了看得多了愈发膨胀了，就想看看这个nextTick到底是咋实现的")])]),p])}const k=s(d,[["render",u],["__file","详细分析Vue.nextTick()实现.html.vue"]]);export{k as default};
