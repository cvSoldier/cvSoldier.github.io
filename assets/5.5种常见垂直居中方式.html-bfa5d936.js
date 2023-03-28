import{_ as i,W as e,X as n,a0 as d}from"./framework-c8ebc670.js";const a={},l=d(`<blockquote><p>css渣渣，如有错误欢迎指正。</p></blockquote><h4 id="_1" tabindex="-1"><a class="header-anchor" href="#_1" aria-hidden="true">#</a> 1</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 400px;
  background: cyan;
  line-height: 400px;
}
.child {
  width: 100px;
  height: 100px;
  background: black;
  display: inline-block;
  vertical-align: middle;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父元素设置<code>line-height</code>和<code>height</code>相同，使基线在中间，然后子元素设置<code>vertical-align: middle</code>使该元素基线与父元素基线重合，达到垂直居中。</p><h4 id="_2" tabindex="-1"><a class="header-anchor" href="#_2" aria-hidden="true">#</a> 2</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 400px;
  position: relative;
  background: cyan;
}
.child {
  position: absolute;
  width: 100px;
  height: 100px;
  background: black;
  top: 50%;
  margin-top: -50px; /* (height + padding) / 2*/
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用top、left偏移了父对象的50%宽度高度，然后需要利用margin反向偏移居中块的50%宽高。 注意margin值的设置不能使用百分比，因为margin是基于父元素的宽度来计算百分比的。</p><h4 id="_2-5" tabindex="-1"><a class="header-anchor" href="#_2-5" aria-hidden="true">#</a> 2.5</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 400px;
  position: relative;
  background: cyan;
}
.child {
  position: absolute;
  width: 100px;
  height: 100px;
  background: black;
  top: 50%;
  transform: translateY(-50%);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与上面的例子原理相同，这里是使用<code>transform</code>来做反向偏移。</p><h4 id="_3" tabindex="-1"><a class="header-anchor" href="#_3" aria-hidden="true">#</a> 3</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 400px;
  background: cyan;
  display: table-cell;
  vertical-align: middle;
}
.child {
  width: 100px;
  height: 100px;
  background: black;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>table-cell会被其他一些css属性破坏，例如float，position：absolute，可以考虑增加一个父div定义float等属性，对margin值无反应，响应padding属性。</p><h4 id="_4" tabindex="-1"><a class="header-anchor" href="#_4" aria-hidden="true">#</a> 4</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  height: 400px;
  background: cyan;
  display: flex;
  align-items: center;
}
.child {
  width: 100px;
  height: 100px;
  background: black;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法只能在现代浏览器上有效，IE10+、chrome、Safari、Firefox。</p><h4 id="_5" tabindex="-1"><a class="header-anchor" href="#_5" aria-hidden="true">#</a> 5</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.parent {
  position: relative;
  width: 100%;
  height: 400px;
  background: cyan;
}
.child {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: black;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当一个绝对定位元素，其对立定位方向属性同时有具体定位数值的时候，流体特性就发生了。 具有流体特性绝对定位元素的<code>margin:auto</code>的填充规则和普通流体元素一模一样：</p><ol><li>如果一侧定值，一侧<code>auto</code>，<code>auto</code>为剩余空间大小</li><li>如果两侧均是<code>auto</code>, 则平分剩余空间</li></ol>`,20),s=[l];function r(c,v){return e(),n("div",null,s)}const u=i(a,[["render",r],["__file","5.5种常见垂直居中方式.html.vue"]]);export{u as default};
