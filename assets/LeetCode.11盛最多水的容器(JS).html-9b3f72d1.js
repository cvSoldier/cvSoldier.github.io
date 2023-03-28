import{_ as a,W as t,X as s,Y as e,Z as n,$ as l,a0 as d,C as r}from"./framework-c8ebc670.js";const c={},v=e("h2",{id:"一、题目",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、题目","aria-hidden":"true"},"#"),n(" 一、题目")],-1),m={href:"https://leetcode-cn.com/problems/container-with-most-water/",target:"_blank",rel:"noopener noreferrer"},h=e("blockquote",null,[e("p",null,"给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。")],-1),o=e("blockquote",null,[e("p",null,"说明：你不能倾斜容器，且 n 的值至少为 2。")],-1),u=e("p",null,[e("img",{src:"https://segmentfault.com/img/bVbfnQP?w=801&h=383",alt:"图片描述"})],-1),b=e("blockquote",null,[e("p",null,"图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。")],-1),_=e("h2",{id:"二、我的答案",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#二、我的答案","aria-hidden":"true"},"#"),n(" 二、我的答案")],-1),p={href:"https://leetcode-cn.com/problems/trapping-rain-water/",target:"_blank",rel:"noopener noreferrer"},g=e("code",null,"Math.min(height[head], height[tail]) * (tail - head)",-1),x=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let tail = height.length - 1, head = 0;
  let container = 0, temp;
  while(head &lt; tail) {
    temp = (tail - head) * Math.min(height[head], height[tail])
    container &lt; temp ? container = temp : null
    if(height[head] &lt; height[tail]) {
      head++
    } else {
      tail--
    }
  }
  return container
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>       </p><p>##三、优秀答案##</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let i = 0;
  let j = height.length - 1;
  let max = 0
  while(i&lt;j) {
    let min = Math.min(height[i], height[j])
    max = Math.max(((j-i) * min), max)
    if (height[i] &gt; height[j]) {
      j--
    } else {
      i++
    }
  }
  return max
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>       取最大值使用<code>max = Math.max((j - i) * min), max)</code>还是非常秀的</p>`,5);function f(k,j){const i=r("ExternalLinkIcon");return t(),s("div",null,[v,e("p",null,[e("a",m,[n("盛最多水的容器："),l(i)])]),h,o,u,b,_,e("p",null,[n("       首先分析一下题目，与"),e("a",p,[n("接雨水"),l(i)]),n("那道题不同的是，本题所求为“找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水”, 也就是说[6,7,6]这样的数组，最多接水的两条线的下标为0和2。同时也可以看出这道题与最大值无关，计算公式应该是"),g,n(",head和tail都出来，双指针不要太明显        因为每次接水面积的高是两个指针中指向的值较小的那个，所以为了求最大值，我们每次向中间移动的指针也应该是辣一个，思路理清，代码如下")]),x])}const M=a(c,[["render",f],["__file","LeetCode.11盛最多水的容器(JS).html.vue"]]);export{M as default};
