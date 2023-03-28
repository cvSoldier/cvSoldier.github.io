import{_ as s,W as l,X as a,Y as e,Z as n,$ as d,a0 as t,C as r}from"./framework-c8ebc670.js";const c={},v=e("h3",{id:"题目",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#题目","aria-hidden":"true"},"#"),n(" 题目")],-1),u={href:"https://leetcode-cn.com/problems/implement-strstr/",target:"_blank",rel:"noopener noreferrer"},b=t(`<blockquote><p>给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。</p><p><strong>示例</strong> 输入: haystack = &quot;hello&quot;, needle = &quot;ll&quot; 输出: 2</p></blockquote><blockquote><p>输入: haystack = &quot;aaaaa&quot;, needle = &quot;bba&quot; 输出: -1</p></blockquote><blockquote><p>说明: 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。</p></blockquote><h3 id="解" tabindex="-1"><a class="header-anchor" href="#解" aria-hidden="true">#</a> 解</h3><p>先来一个暴力解法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var strStr = function(haystack, needle) {
  if (needle == &quot;&quot;) return 0;
  let j = 0;
  for (let i = 0; i &lt; haystack.length; i++) {
    if (haystack[i] == needle[j]) {
      if (j == needle.length - 1) return i-j;
      j++;
    }
    else {
      i -= j, j = 0;
    }
  }
  return -1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>时间复杂度O(mn), 就是两层循环。这种解法低效的原因在于有很多不必要的匹配尝试。很多高效的字符串匹配算法，它们的核心思想都是一样样的，想办法利用已有信息，减少不必要的尝试。像经典的KMP算法使用next数组来存储模式串信息来减少匹配，或者bm的好后缀坏字符规则，下面要介绍的sunday比前两者都要更简单易懂，在某些情况下也更高效。</p><p>sunday算法在匹配失败时关注的是主串中参加匹配的最末位字符的下一位字符。 如果该字符没有在模式串中出现则直接跳过，即移动位数 = 模式串长度 + 1； 否则，使模式串中最后出现的该字符与其对其，即移动位数 = 模式串长度 - 该字符最右出现的位置(以0开始) = 模式串中该字符最右出现的位置到尾部的距离 + 1。 下面以主串&#39;substring searching&#39;，模式串&#39;search&#39;为例</p><p><img src="https://segmentfault.com/img/bVbKeTH" alt="image.png"><br> 不匹配，主串参与匹配的最末尾字符的下一个字符，也就是 i 没有出现在模式串中，那么模式串直接移动到 i 的下一位<br><img src="https://segmentfault.com/img/bVbKeTs" alt="image.png"><br> 移动之后不匹配，主串参与匹配的最末尾字符的下一个字符，也就是 r 出现在模式串中，且<strong>最靠后</strong>的位置是 3，那么模式串移动 6 - 3 = 3<br><img src="https://segmentfault.com/img/bVbKeVt" alt="image.png"><br> 匹配成功。</p><p>复杂度方面，平均是O(n)。最坏的情况，每次都往后跳一，而且都是比对到模式串尾才不匹配，这样和暴力差不多，都是O(mn)，比如 &#39;bbbbbbbbbbbbbb&#39;和&#39;bbcb&#39;,最好的情况，每次都跳模式串长度 + 1，每次对比都是第一个就不匹配，比如 &#39;abcdefghijklmn&#39;和&#39;xyz&#39;,这样是O(m/n)</p><p>代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var strStr = function(haystack, needle) {
  if (needle == &#39;&#39;) return 0

  const map = {}
  const len = needle.length
  for(let i = 0; i &lt; len; i++) {
    map[needle[i]] = i
  }
  let j = 0
  for(let i = 0; i &lt; haystack.length;) {
    if (haystack[i + j] == needle[j]) {
      if (j == len - 1) return i;
      j++;
    } else {
      let index = map[haystack[i + len]]
      if(index === undefined) {
        i += len + 1
      } else {
        i += len - index
      }
      j = 0
    }
  }
  return -1
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12);function m(o,p){const i=r("ExternalLinkIcon");return l(),a("div",null,[v,e("p",null,[e("a",u,[n("实现 strStr()："),d(i)])]),b])}const g=s(c,[["render",m],["__file","28实现strStr(JS sunday算法).html.vue"]]);export{g as default};
