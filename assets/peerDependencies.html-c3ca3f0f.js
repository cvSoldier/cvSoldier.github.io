import{_ as e,W as a,X as n,a0 as s}from"./framework-c8ebc670.js";const c={},p=s(`<h3 id="dependencies与peerdependencies区别" tabindex="-1"><a class="header-anchor" href="#dependencies与peerdependencies区别" aria-hidden="true">#</a> dependencies与peerDependencies区别</h3><p>假设我们当前的项目是MyProject，假设其中有一个依赖包PackageA，该包的package.json文件指定了对PackageB的依赖：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;PackageB&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>npm install PackageA</code>, 项目的目录结构会是如下形式：<br> MyProject<br>   |- node_modules<br>     |- PackageA<br>       |- node_modules<br>         |- PackageB</p><p>那么在我们的项目中，我们能通过下面语句引入&quot;PackageA&quot;：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var packageA = require(&#39;PackageA&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但是，如果你想在项目中直接引用PackageB:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var packageA = require(&#39;PackageA&#39;)
var packageB = require(&#39;PackageB&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是不行的，即使PackageB被安装过；因为Node只会在 MyProject/node_modules 目录下查找PackageB，它不会在进入PackageA模块下的node_modules下查找。</p><p>为了解决这种问题，引入 peerDependencies</p><p>例如上面PackageA的package.json文件如果是下面这样：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;peerDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;PackageB&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它会告诉npm：如果某个package把我列为依赖的话，那么package也必需应该有对PackageB的依赖。</p><p>这时候 <code>npm install PackageA</code> ，目录结构就是：</p><p>MyProject<br>   |- node_modules<br>     |- PackageA<br>     |- PackageB</p>`,15),d=[p];function t(i,o){return a(),n("div",null,d)}const l=e(c,[["render",t],["__file","peerDependencies.html.vue"]]);export{l as default};