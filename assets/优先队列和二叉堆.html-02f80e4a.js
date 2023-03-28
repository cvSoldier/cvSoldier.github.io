import{_ as e,W as o,X as c,Y as n,Z as s,$ as p,a0 as t,C as i}from"./framework-c8ebc670.js";const l={},u={href:"https://leetcode-cn.com/problems/maximum-number-of-eaten-apples",target:"_blank",rel:"noopener noreferrer"},r=t(`<blockquote><p>有一棵特殊的苹果树，一连 n 天，每天都可以长出若干个苹果。在第 i 天，树上会长出 apples[i] 个苹果，这些苹果将会在 days[i] 天后（也就是说，第 i + days[i] 天时）腐烂，变得无法食用。也可能有那么几天，树上不会长出新的苹果，此时用 apples[i] == 0 且 days[i] == 0 表示。 你打算每天 最多 吃一个苹果来保证营养均衡。注意，你可以在这 n 天之后继续吃苹果。 给你两个长度为 n 的整数数组 days 和 apples ，返回你可以吃掉的苹果的最大数目。 示例： apples = [1,2,3,5,2], days = [3,2,1,4,2]</p><ul><li>第一天，你吃掉第一天长出来的苹果。</li><li>第二天，你吃掉一个第二天长出来的苹果。</li><li>第三天，你吃掉一个第二天长出来的苹果。过了这一天，第三天长出来的苹果就已经腐烂了。</li><li>第四天到第七天，你吃的都是第四天长出来的苹果。</li></ul></blockquote><p>描述中的第四天到第七天吃的都是第四天的苹果，我以为是记录当前剩余苹果的贪心，实际应该是</p><ul><li>第四天，吃掉一个第四天长出的苹果。</li><li>第五天，第四天的四个苹果保质三天，第五天的两个苹果保质两天，吃掉一个第五天的苹果</li><li>第六天，第四天的四个苹果保质两天，第五天的一个苹果保质一天，吃掉一个第五天的苹果</li><li>第七天，第四天的四个苹果保质一天，吃掉一个第四天苹果</li><li>第八天，第四天的三个苹果保质零天，没的吃。</li></ul><p>####做题</p><p>要优先吃快要坏掉的苹果，分为三步：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> <span class="token function-variable function">eatenApples</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">apples<span class="token punctuation">,</span> days</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> aLen <span class="token operator">=</span> apples<span class="token punctuation">.</span>length
  <span class="token keyword">let</span> eat <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 按照好坏程度排序的苹果队列</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 当前是第几天</span>
  
  <span class="token comment">// todo</span>
  <span class="token comment">// 1、把今天的苹果收起来</span>
  <span class="token comment">// 2、把坏掉的苹果扔掉</span>
  <span class="token comment">// 3、吃一个</span>
  
  <span class="token keyword">return</span> eat
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1、收苹果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 收苹果时需要把当天的苹果放入合适位置</span>
<span class="token comment">// 以保证 queue 是按照从坏到好的顺序</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> aLen <span class="token operator">&amp;&amp;</span> apples<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> j <span class="token operator">=</span> queue<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>j <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">+</span> days<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token punctuation">(</span>queue<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> days<span class="token punctuation">[</span>queue<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// queue不为空 且 当前天的苹果的保质期 &lt; queue倒序中的苹果的保质期</span>
    queue<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> queue<span class="token punctuation">[</span>j<span class="token punctuation">]</span>
    j<span class="token operator">--</span>
  <span class="token punctuation">}</span>
  queue<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> i
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、扔坏苹果</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">while</span><span class="token punctuation">(</span>
  queue<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
  <span class="token punctuation">(</span>apples<span class="token punctuation">[</span>queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">&gt;=</span> <span class="token punctuation">(</span>queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> days<span class="token punctuation">[</span>queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
  <span class="token comment">// 第一坏的位置没苹果了 或者 第一坏的位置已经过保质期了</span>
<span class="token punctuation">)</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、吃</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  apples<span class="token punctuation">[</span>queue<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token operator">--</span>
  eat<span class="token operator">++</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>已经可以过了，但是只击败了56%，原因在于我们优先队列的实现方式是简单数组，每次插入和 shift() 的时候都是 <code>O(n)</code> 的复杂度，接下来就是使用二叉堆来实现一个优先队列。 ####二叉堆 二叉堆本质是完全二叉树，分为最大堆和最小堆，最大堆就是任意一个父节点，都大于他的子节点的值，最小堆同理，任意一个父节点都小于他的子节点的值。 二叉堆的根节点叫做堆顶，最大堆的根节点是堆的最大元素，最小堆的根节点是堆的最小元素。 二叉堆的操作包括：插入节点，删除节点，构建二叉堆，这三种操作又都是基于节点的上浮和下沉</p><p><img src="https://image-static.segmentfault.com/917/659/91765929-601919a6844e4" alt="插入节点和删除节点示意"> (图为插入节点和删除节点示意)</p><p>下面使用数组来简单实现一个最小二叉堆</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">BinaryHeap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token class-name">BinaryHeap</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_moveUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_moveDown</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> data
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 节点上浮</span>
  <span class="token function">_moveUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> childIndex <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">let</span> parentIndex <span class="token operator">=</span> <span class="token punctuation">(</span>childIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">1</span>
    <span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>childIndex<span class="token punctuation">]</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>childIndex <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> temp <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>parentIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>childIndex<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>parentIndex<span class="token punctuation">]</span>
      childIndex <span class="token operator">=</span> parentIndex
      parentIndex <span class="token operator">=</span> <span class="token punctuation">(</span>parentIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>childIndex<span class="token punctuation">]</span> <span class="token operator">=</span> temp
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 节点下沉</span>
  <span class="token function">_moveDown</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> parent <span class="token operator">=</span> index
    <span class="token keyword">let</span> temp <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>parent<span class="token punctuation">]</span>
    <span class="token keyword">let</span> child <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> parent <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>child <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>child <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>child<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果有两个子节点, 将父节点下沉到更小的节点的位置</span>
        child<span class="token operator">++</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>child<span class="token punctuation">]</span> <span class="token operator">&lt;</span> temp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>parent<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>child<span class="token punctuation">]</span>
        parent <span class="token operator">=</span> child
        child <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> parent <span class="token operator">+</span> <span class="token number">1</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>parent<span class="token punctuation">]</span> <span class="token operator">=</span> temp
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>二叉堆的<code>push</code>和<code>pop</code>都是 logn 的复杂度，类比二分查找，大家都是 logn，能不能用二分代替嘞，不能。</strong> **因为二叉堆的 logn 是 查 + 替换， 二分查找的 logn 只有查，替换是 n，所以不能。 **</p><p>####应用 下面使用二叉堆来改写代码，只需要把我们实现的二叉堆中是否上浮和下沉的对比条件修改一下，重复代码就不占篇幅了，大概代码如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">BinaryHeap</span><span class="token punctuation">(</span><span class="token parameter">compareArr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>compareArr <span class="token operator">=</span> compareArr
<span class="token punctuation">}</span>
<span class="token class-name">BinaryHeap</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">lessThan</span><span class="token punctuation">(</span><span class="token parameter">index1<span class="token punctuation">,</span> index2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>index1 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>compareArr<span class="token punctuation">[</span>index1<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token punctuation">(</span>index2 <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>compareArr<span class="token punctuation">[</span>index2<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>length
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">push</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">_moveUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>childIndex <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lessThan</span><span class="token punctuation">(</span>temp<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>parentIndex<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// ...</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">_moveDown</span><span class="token punctuation">(</span><span class="token parameter">index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>child <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>child <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lessThan</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>child <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>child<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        child<span class="token operator">++</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">lessThan</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>child<span class="token punctuation">]</span><span class="token punctuation">,</span> temp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>list<span class="token punctuation">[</span>parent<span class="token punctuation">]</span> <span class="token operator">=</span> temp
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token function-variable function">eatenApples</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">apples<span class="token punctuation">,</span> days</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> aLen <span class="token operator">=</span> apples<span class="token punctuation">.</span>length
  <span class="token keyword">let</span> eat <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">let</span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BinaryHeap</span><span class="token punctuation">(</span>days<span class="token punctuation">)</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> aLen <span class="token operator">||</span> queue<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> aLen <span class="token operator">&amp;&amp;</span> apples<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>
      queue<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span>apples<span class="token punctuation">[</span>queue<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> days<span class="token punctuation">[</span>queue<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> i<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> queue<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">if</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      apples<span class="token punctuation">[</span>queue<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token operator">--</span>
      eat<span class="token operator">++</span>
    <span class="token punctuation">}</span>
    i<span class="token operator">++</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> eat
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),k=n("br",null,null,-1),d=n("img",{src:"https://image-static.segmentfault.com/157/365/1573653547-6017ec232ee30",alt:"运行时间对比"},null,-1),v=n("br",null,null,-1),m={href:"https://leetcode-cn.com/problems/maximum-average-pass-ratio/",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Heap {
  constructor(compare) {
    this.A = [];
    this.compare = compare;
  }
  size() {
    return this.A.length;
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  parent(i) {
    return i &gt; 0 ? (i - 1) &gt;&gt;&gt; 1 : -1;
  }
  isEmpty() {
    return this.size() === 0;
  }
  peek() {
    return this.A[0];
  }
  heapifyDown(i) {
    let p = i;
    const l = this.left(i),
      r = this.right(i),
      size = this.size();
    if (l &lt; size &amp;&amp; this.compare(l, p)) p = l;
    if (r &lt; size &amp;&amp; this.compare(r, p)) p = r;
    if (p !== i) {
      this.exchange(i, p);
      this.heapifyDown(p);
    }
  }
  heapifyUp(i) {
    const p = this.parent(i);
    if (p &gt;= 0 &amp;&amp; this.compare(i, p)) {
      this.exchange(i, p);
      this.heapifyUp(p);
    }
  }
  exchange(x, y) {
    const temp = this.A[x];
    this.A[x] = this.A[y];
    this.A[y] = temp;
  }
  compare() {
    throw new Error(&#39;Must be implement!&#39;);
  }
}

class PriorityQueue extends Heap {
  constructor(compare) {
    super(compare);
  }
  enqueue(node) {
    this.A.push(node);
    this.heapifyUp(this.size() - 1);
  }
  dequeue() {
    const first = this.A[0];
    const last = this.A.pop();
    if (first !== last) {
      this.A[0] = last;
      this.heapifyDown(0);
    }
    return first;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>优点是<code>compare</code>函数是参数，参数固定是子，父节点，在用的时候可以根据需求自定义不同数据类型的最大最小堆 -----2021/4/19 完-------</p>`,2);function h(y,w){const a=i("ExternalLinkIcon");return o(),c("div",null,[n("p",null,[s("起因是一场周赛的题目 "),n("a",u,[s("1705. 吃苹果的最大数目"),p(a)])]),r,n("p",null,[s("二叉堆版本的代码和最初的速度对比"),k,d,v,s(" 图中序号2和3是二叉堆版本和线性数组的时间对比，也从击败56%提升到92% 序号1则是速度排在最前面的答案的重新提交，但是有一个测试用例不通过，可能是补充用例之前的提交。 最后的代码看起来确实很长，但是把二叉堆单拎出来，阅读起来可能更清晰一点。 -----2021/3/15更新------- 周赛第三题又碰见了，"),n("a",m,[s("最大平均通过率"),p(a)]),s("，题目很简单，区别这个题的测试数据，用暴力的解法会超时，感觉二叉堆就是拿来写贪心的标配数据结构，因为只需要处理最怎么怎么样的元素也就是堆顶元素。 -----2021/3/15 完-------- -----2021/4/19更新------- 刷了这么多周周赛，优先队列简直是必考题，每次都要复制了代码之后修改对比条件，昨天看见一个更好的版本，copy下来")]),b])}const f=e(l,[["render",h],["__file","优先队列和二叉堆.html.vue"]]);export{f as default};
