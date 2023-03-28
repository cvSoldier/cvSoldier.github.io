import{_ as a,W as d,X as r,Y as i,Z as e,$ as l,a0 as n,C as t}from"./framework-c8ebc670.js";const v={},c=n(`<p>JSON.parse(JSON.stringfy())、MessageChannel这些JavaScript自身的api，想要实现深拷贝存在像不能复制undefined、不能复制函数、不能复制循环引用等问题。</p><h4 id="v1" tabindex="-1"><a class="header-anchor" href="#v1" aria-hidden="true">#</a> v1</h4><p>要实现对象深拷贝，第一反应的关键词有：判断类型，递归。代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function isObject(obj) {
  return obj !== null &amp;&amp; typeof obj === &#39;object&#39;
}

function cloneDeep(target) {
  
  if(!isObject(target)) return target

  let result = Array.isArray(target) ? [] : {}
  
  const keys = Object.keys(target);
  for(let i = 0, len = keys.length; i &lt; len; i++) {
    result[keys[i]] = cloneDeep(target[keys[i]])
  }
  return result
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="v2" tabindex="-1"><a class="header-anchor" href="#v2" aria-hidden="true">#</a> v2</h4><p>上面的代码仅能实现基础功能，至于标题中所说的循环引用和相同引用问题并没有处理。 先来解释一下，循环引用是指</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var circle = {}
circle.circle = circle
//或者
var a = {}, b = {}
a.b = b
b.a = a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相同引用是指</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var arr = [1,2,3]
var obj = {}
obj.arr1 = arr
obj.arr2 = arr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于循环引用的对象使用v1版本的深拷贝很明显会直接栈溢出。 而对于包含相同对象引用的问题在于，因为复制之前<code>obj.arr1</code>和<code>obj.arr2</code>是指向相同对象的，修改其中一个另一个也会改动。使用v1版本的代码拷贝之后，新对象这两个属性的指向将不再相同。 就像这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>obj.arr1 === obj.arr2 // true
var cloneObj = cloneDeep(obj)
cloneObj.arr1 === cloneObj.arr2 // false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),u={href:"https://juejin.im/post/5b20c9f65188257d7d719c1c",target:"_blank",rel:"noopener noreferrer"},b=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function cloneDeep(obj){ 
  let visitedObjs = [];
  function baseClone(target){

    if(!isObject(target)) return target

    for(let i = 0; i &lt; visitedObjs.length; i++){
      if(visitedObjs[i].target === target){        
        return visitedObjs[i].result;
      }
    }

    let result = Array.isArray(target) ? [] : {} 
    
    visitedObjs.push({ target, result }) 

    const keys = Object.keys(target);
    for(let i = 0, len = keys.length; i &lt; len; i++) {
      result[keys[i]] = baseClone(target[keys[i]])
    }
    return result
  } 
  return baseClone(obj);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="v2-1" tabindex="-1"><a class="header-anchor" href="#v2-1" aria-hidden="true">#</a> v2.1</h4><p>这部分是我理解v2代码时的一些误区，也可以当作是深入理解的过程，可跳过。 学习v2代码的时候，有点没搞懂<code>visitedObjs.push({ target, result })</code>这里push result的含义，因为<code>result</code>是之前调用栈中复制的结果，<code>target</code>就是他要复制的对象，那在</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(let i = 0; i &lt; visitedObjs.length; i++){
  if(visitedObjs[i].target === target){        
    return visitedObjs[i].result;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>中干嘛还要返回<code>visitedObjs[i].result</code>，直接返回<code>target</code>就完事儿了。 以</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var arr = [1]
var obj = { 1:arr, 2:arr }
var cloneObj = cloneDeep(obj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为例，调用栈大概如下图所示<br><img src="https://segmentfault.com/img/bVbC7oF" alt="image.png"><br> 其中，<strong>第2次</strong>是复制<code>obj</code>中第一个<code>arr</code>,<strong>第4次</strong>是复制第二个，<strong>第四次</strong>会因为<code>visitedObjs</code>中存在对象的<code>target</code>属性与当前参数<code>target</code>相等，而返回<code>[1]</code>。 按照前面所说的想法修改代码，运行结果返回值是<code>{1: [1], 2: [2]}</code>。看起来是正确的，但是在原对象中存在<code>obj[1] === obj[2]</code>,在复制之后的对象中这个等式并不成立。 原因是<strong>第4次</strong>中返回的值<code>visitedObjs[1].result</code>是<strong>第2次</strong>复制的结果，这样使得两个对象地址相同，相等。如果返回<code>target</code>，实际上则是返回了指向原对象中<code>arr</code>数组的引用。也就是说存在<code>obj[1] === cloneObj[2]</code>，明显是不正确的。</p><h4 id="v2-2" tabindex="-1"><a class="header-anchor" href="#v2-2" aria-hidden="true">#</a> v2.2</h4><p>问题已经解决了，有之前做的LeetCode第一题的经验，可以用map来代替数组进行查找。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function cloneDeep(obj) {
  let vistedMap = new Map();
  function baseClone(target) {
    
    if(!isObject(target)) return target

    if(vistedMap.get(target)) return vistedMap.get(target)

    let result = Array.isArray(target) ? [] : {}

    vistedMap.set(target, result)
    
    const keys = Object.keys(target);
    for(let i = 0, len = keys.length; i &lt; len; i++) {
      result[keys[i]] = baseClone(target[keys[i]])
    }
    return result
  }
  return baseClone(obj)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="v3" tabindex="-1"><a class="header-anchor" href="#v3" aria-hidden="true">#</a> v3</h4><p>再写一个广度优先遍历(BFS)的版本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function cloneDeepBFS(data){
  if(!isObject(data)) return data
  var visitedMap = new Map() // 备注1
  var queue = [] // 备注2
  queue.push(data)
  while(queue.length){
    var curData = queue.shift()
    // curData是原始对象，obj是复制对象
    if(visitedMap.get(curData)) {
      var obj = visitedMap.get(curData) // 备注3
    } else {
      var obj = Array.isArray(curData) ? [] : {}
      visitedMap.set(curData, obj)
    }
    
    var keys = Object.keys(curData)
    for(var i = 0, len = keys.length; i &lt; len; i++) {
      var temp = curData[keys[i]]
      if(!isObject(temp)) {
        obj[keys[i]] = temp
      }
      if(visitedMap.get(temp)) {
        obj[keys[i]] = visitedMap.get(temp)
      } else {
        obj[keys[i]] = Array.isArray(curData) ? [] : {}
        visitedMap.set(temp, obj[keys[i]])
        queue.push(temp)
      }
    }
  }
  return visitedMap.get(data)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>备注： 1、依然使用的<code>map</code>来解决循环引用和相同引用。 2、实现BFS的核心队列。 3、实现值的传递，还是以<code>var arr = [1]; var obj = { 1:arr, 2:arr }; var cloneObj = cloneDeep(obj)</code>为例</p><p><img src="https://segmentfault.com/img/bVbDdHE" alt="image.png"></p><p>红箭头就是这行代码的作用，使本次while的obj指向之前while里obj的子。</p><p>测试代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var arr = [1]
var circle = { name: &#39;circle&#39; }
circle.circle = circle
var obj = {1: arr, 2: { 3: circle, 4: arr }}
var a = cloneBFS(obj)

a[1] === a[2][4] // true
a[2][3] === a[2][3][&#39;circle&#39;] // true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完。</p>`,19);function o(m,g){const s=t("ExternalLinkIcon");return d(),r("div",null,[c,i("p",null,[e("解决方法的思路来自"),i("a",u,[e("这儿(我是传送门)"),l(s)]),e("。 1、通过闭包维护一个变量，变量中储存已经遍历过的对象 2、每次递归时判断当前的参数是否已经存在于变量中，如果已经存在，就说明已经递归过该变量，就可以停止这次递归并返回上次递归该变量时的返回值 代码如下")]),b])}const j=a(v,[["render",o],["__file","解决循环引用和相同引用的js深拷贝实现.html.vue"]]);export{j as default};
