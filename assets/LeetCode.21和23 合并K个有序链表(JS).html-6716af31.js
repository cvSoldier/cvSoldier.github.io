import{_ as s,W as d,X as t,Y as e,Z as n,$ as l,a0 as r,C as a}from"./framework-c8ebc670.js";const v={},c=e("h4",{id:"一、题目",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#一、题目","aria-hidden":"true"},"#"),n(" 一、题目")],-1),u={href:"https://leetcode-cn.com/problems/merge-two-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},m=e("blockquote",null,[e("p",null,[n("将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 "),e("strong",null,"示例："),n(" **输入：**1->2->4, 1->3->4 **输出：**1->1->2->3->4->4")])],-1),o={href:"https://leetcode-cn.com/problems/merge-k-sorted-lists/",target:"_blank",rel:"noopener noreferrer"},b=r(`<blockquote><p>合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。 <strong>示例:</strong><strong>输入:</strong> [   1-&gt;4-&gt;5,   1-&gt;3-&gt;4,   2-&gt;6 ] <strong>输出:</strong> 1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6</p></blockquote><p>从题目就能看出来 明显是一道题，一道一道来。</p><h4 id="二、解" tabindex="-1"><a class="header-anchor" href="#二、解" aria-hidden="true">#</a> 二、解：</h4><p>首先题目给了链表节点构造函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一题还是很简单的，new一个新节点，然后不断比较两个参数链表的当前指向节点的值，然后新节点指向较小的那个，然后更新指针指向。常见的指针题，代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let head = result = new ListNode(null)
  while(l1 &amp;&amp; l2) {
    if(l1.val &lt; l2.val) {
      result.next = l1
      l1 = l1.next
    } else {
      result.next = l2
      l2 = l2.next
    }
    result = result.next
  }
  result.next = l1 || l2
  return head.next
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先定义两个指针指向同一个新节点来当作虚拟的头，其中一个指针把链表串起来，另一个用来当作返回值。 时间复杂度的话因为遍历了两个链表，所以是O(n + m)</p><p>再看第二题，其实就是复杂版的上一题，第一反应是对链表数组循环调用上一题的函数，代码也很简单</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var merge2Lists = function(l1, l2){
 //...
}
for(var i = 1; i &lt; lists.length; i++) {
    temp = merge2Lists(temp, lists[i])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>时间复杂度是O(n^2)。</p><p>上面这种解法，简单易懂，但是很明显数组中的链表越靠前，遍历的次数就越多，用分治的思想来考虑会更快，合并k个链表变成k/2个合并2个有序链表，再变k/4个...时间复杂度是O(nlogk) 代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let n = lists.length
  if(!n) return null
  let merge = function(begin, end) {
    if(begin === end) return lists[begin]
    let mid = (begin + end) &gt;&gt; 1
    let l1 = merge(begin, mid)
    let l2 = merge(mid + 1, end)
    return mergeTwoLists(l1, l2)
  }
  return merge(0, n - 1)
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13);function g(p,_){const i=a("ExternalLinkIcon");return d(),t("div",null,[c,e("p",null,[e("a",u,[n("合并两个有序链表"),l(i)])]),m,e("p",null,[e("a",o,[n("合并K个排序链表"),l(i)])]),b])}const x=s(v,[["render",g],["__file","LeetCode.21和23 合并K个有序链表(JS).html.vue"]]);export{x as default};
