import{_ as l,W as d,X as t,Y as n,Z as e,$ as i,a0 as a,C as r}from"./framework-c8ebc670.js";const c={},o=a('<blockquote><p>webAssembly最近成为W3C标准辣，我来蹭热度发博客辣</p></blockquote><h4 id="是-什-么" tabindex="-1"><a class="header-anchor" href="#是-什-么" aria-hidden="true">#</a> 是 什 么</h4><p>WebAssembly是一种新的编码方式，可以在现代的网络浏览器中运行。它是一种低级的类汇编语言，为诸如C / C ++等语言提供一个编译目标，以便它们可以在Web上运行。也可以与JavaScript共存，它提供了一条途径，以使得以各种语言编写的代码都可以以接近原生的速度在Web中运行。 作为一个小前端，你怎么为其他语言提供编译目标我管不着，但是你说以接近原生的速度在web运行我就很感兴趣了。 下图是40，43，46，49的Fibonacci数列计算耗时，分别是webAssembly版本和js版本。 <img src="https://segmentfault.com/img/bVbBQdT" alt="15770817931.jpg"> wasm(WebAssembly)只有js耗时的五分之一。</p><h4 id="怎-么-用" tabindex="-1"><a class="header-anchor" href="#怎-么-用" aria-hidden="true">#</a> 怎 么 用</h4>',4),m=n("s",null,"把冰箱门打开",-1),b={href:"https://github.com/kripken/emscripten",target:"_blank",rel:"noopener noreferrer"},v={href:"http://webassembly.org.cn/getting-started/developers-guide/",target:"_blank",rel:"noopener noreferrer"},u=n("code",null,"emsdk install sdk-incoming-64bit binaryen-master-64bit",-1),p=n("code",null,"emsdk install latest",-1),g=n("code",null,"emsdk activate sdk-incoming-64bit binaryen-master-64bit",-1),h=n("code",null,"emsdk activate latest",-1),_=n("code",null,"emsdk activate --global latest",-1),x=n("code",null,"test.c",-1),w=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int add(int a, int b) { return a + b; }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在这个目录下面执行<code>emcc test.c -Os -s WASM=1 -s SIDE\\_MODULE=1 -o test.wasm</code>其中test.c是入口文件， -0s表示需要优化，<code>-s WASM=1</code>表示输出wasm的文件，默认的是输出asm.js，<code>-s SIDE_MODULE=1</code>表示就只要这一个模块，，<code>-o test.wasm</code>是输出文件。 3、得到了<code>test.wasm</code>就可以使用了，新建一个test.js代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const fs = require(&#39;fs&#39;);
let src = new Uint8Array(fs.readFileSync(&#39;./test.wasm&#39;));
const env = { 
  memoryBase: 0, 
  tableBase: 0, 
  memory: new WebAssembly.Memory({ initial: 256 }), 
  table: new WebAssembly.Table({ 
    initial: 2, 
    element: &#39;anyfunc&#39; 
  }), 
  abort: () =&gt; {throw  &#39;abort&#39;;} 
}
WebAssembly.instantiate(src, {env: env})
.then(result =&gt; {    
  console.log(result.instance.exports.add(1, 2)); 
 })
.catch(e =&gt;  console.log(e));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后运行这段代码，得到结果3。同样的，test.wasm也可以使用fetch和XML的方式引用。 可能有小伙伴会问那难道我每次项目里使用都要先单独把文件编译成wasm再放到项目下再用吗，能不能直接在项目中编译引用一条龙嘞。答案是YES。 构建工具以webpack为例，需要使用到第三方的<code>wasm-loader</code>和<code>c-cpp-modules-webpack-loader</code>，前者是处理wasm的loader(这不是废话)，后者是把c编译成wasm的loader。因为webpack支持链式Loader</p><blockquote><p>loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。(来自webpack文档)</p></blockquote><p>所以我们就可以这样写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>module: {
  rules: [
  {
    test: /\\.(c|cpp)$/,
    use: [{
      loader: &#39;wasm-loader&#39;
    }, {
      loader: &#39;c-cpp-modules-webpack-loader&#39;,
      options: {
        compiller: &#39;-Os -s WASM=1 -s SIDE_MODULE=1&#39;
      }
    }]
  }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再这样写</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import wasmC from &#39;./index.c&#39;

wasmC({
  &#39;global&#39;: {},
  &#39;env&#39;: {
    &#39;memoryBase&#39;: 0,
    &#39;tableBase&#39;: 0,
    &#39;memory&#39;: new WebAssembly.Memory({initial: 256}),
    &#39;table&#39;: new WebAssembly.Table({initial: 0, element: &#39;anyfunc&#39;})
  }}).then(result =&gt; {
    const exports = result.instance.exports;
    const add = exports.add;
    console.log(&#39;C return value was&#39;, add(2, 3));
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),y={href:"https://github.com/cvSoldier/WebAssembly-in-Vue",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.zcfy.cc/article/an-abridged-cartoon-introduction-to-webassembly-ndash-smashing-magazine",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/#comments-abridged-cartoon-introduction-webassembly",target:"_blank",rel:"noopener noreferrer"},A=a(`<hr><p>2020.6.10更新<br> 最近去面试被问到wasm，我说用c/c++配loader，面试官很惊讶的样子，回来之后我简单想了一下，既然c/c++可以，那么同为强类型语言的ts应该也可以，而且对于前端来说学习难度要低很多。 代码就不再说了，更新在github里了,使用的loader是自己写的，也是配合<code>wasm-loader</code>使用的。</p><p>说一下碰到的坑吧 一个是ts转wasm，主要使用的是<code>assemblyscript</code>这个东西安装的时候是</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install --save-dev AssemblyScript/assemblyscript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>而不是直接<code>npm install assemblyscript</code></p><p>还有就是碰到类似下面这种报错</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> LinkError: WebAssembly.Instance(): Import #1 module=&quot;env&quot; function=&quot;_log&quot; error: function import requires a callable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就在wasm的配置里面加一个<code>_log</code>的定义就可以了，以正文中的代码为例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import wasmC from &#39;./index.c&#39;

wasmC({
  &#39;global&#39;: {},
  &#39;env&#39;: {
    // balabala
    &#39;_log&#39;: () =&gt; {} // &lt;-写在env里面
  }}).then(result =&gt; {
    // balabala
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后就是关于c/c++和ts转wasm的效率。我分别写的是比较憨憨版本的fibonacci，以ts为例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function fibonacci(n: number): number {
  if (n &lt;= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就这种代码，c/c++转的wasm代码只有20+行，但是ts转的有1700+行。执行时间尝试了很多次也都是ts的久一点，应该是语言上的东西，我不太能理解，只是得出前者效率更高一点的结论。</p>`,12);function W(E,S){const s=r("ExternalLinkIcon");return d(),t("div",null,[o,n("p",null,[e("怎么用分三步：第一步"),m,e("安装"),n("a",b,[e("Emscripten"),i(s)]),e("，第二步，使用Emscipten将其他的高级语言编译成WebAssembly，第三步，把编译好的文件放到工程里。 1、安装emscripten，大体可以参照"),n("a",v,[e("这里"),i(s)]),e("。需要注意的是，"),u,e(" 这一步，我在使用的时候会报错，找不到之类的，替换成 "),p,e("，对应的 "),g,e(" 替换成 "),h,e("，还可以写成"),_,e("在全局激活，免得其他目录下的工程里使用不到。(吐槽一句，我在查资料的时候，帖子全是写的会报错的版本，自己安装被报错到怀疑人生) 2、装完之后就可以使用emscripten编译了，进入安装的目录，新建一个"),x]),w,n("p",null,[e("就可以辣。代码在github里也有可以参照("),n("a",y,[e("传送门"),i(s)]),e(")。 ####为 什 么 那WebAssembly为啥这么快呢。简单来说，一段js代码在浏览器引擎中要经历parse，compile，execution这几个阶段，在parse阶段，WebAssembly不需要被转换，因为它已经是字节码了，所以比js快。在execution阶段，WebAssembly本是为编译器设计的，提供的指令更适合机器，所以比js快。 老实说以我目前的水平很难概括，在查资料的时候发现"),n("a",f,[e("图说WebAssembly"),i(s)]),e("（"),n("a",k,[e("英文原文"),i(s)]),e("）这篇文章对js和WebAssembly的性能对比解释的非常详细，对WebAssembly感兴趣的话强烈推荐阅读。")]),A])}const C=l(c,[["render",W],["__file","WebAssembly到底是个啥.html.vue"]]);export{C as default};
