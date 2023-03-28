import{_ as e,W as n,X as i,a0 as d}from"./framework-c8ebc670.js";const s={},c=d(`<blockquote><p><em>本文涉及源码版本为 2.6.9</em></p></blockquote><h3 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive" aria-hidden="true">#</a> keep-alive</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// src/core/components/keep-alive.js

export default {
  name: &#39;keep-alive&#39;,
  abstract: true,

  props: {
    include: patternTypes, // 缓存白名单
    exclude: patternTypes, // 黑名单
    max: [String, Number] // 缓存组件的最大数量
  },

  created () {
    this.cache = Object.create(null) // 缓存
    this.keys = [] // 缓存的VNode的键
  },

  destroyed () {
    for (const key in this.cache) {
      // 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 监听黑白名单变动
    this.$watch(&#39;include&#39;, val =&gt; {
      pruneCache(this, name =&gt; matches(val, name))
    })
    this.$watch(&#39;exclude&#39;, val =&gt; {
      pruneCache(this, name =&gt; !matches(val, name))
    })
  },

  render () {
    //...
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组件的定义很平常,不过其中<code>abstract</code>属性在官方文档中并未提及,后面的渲染过程中会用到。</p><p><code>created</code>中初始化存储缓存的<code>cache</code>对象，和缓存的VNode的键的数组。</p><p><code>mounted</code>中监听黑白名单变动对缓存进行更新，其中<code>pruneCache</code>定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode: ?VNode = cache[key]
    if (cachedNode) {
      const name: ?string = getComponentName(cachedNode.componentOptions)
      if (name &amp;&amp; !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array&lt;string&gt;,
  current?: VNode
) {
  const cached = cache[key]
  if (cached &amp;&amp; (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就比如<code>include</code>是<code>[&#39;a&#39;, &#39;b&#39;]</code>,而且这两个组件也都经过<code>keep-alive</code>缓存了，然后<code>include</code>变成<code>[&#39;a&#39;]</code>，就把缓存中的<code>b</code>组件剔除。</p><p><code>destroyed</code>中遍历在<code>created</code>声明的<code>cache</code>，使用和<code>mounted</code>类似的方式清空缓存。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>render () {
  const slot = this.$slots.default
  const vnode: VNode = getFirstComponentChild(slot) // 获取其中第一个(也应该是唯一一个)子组件对象
  const componentOptions: ?VNodeComponentOptions = vnode &amp;&amp; vnode.componentOptions
  if (componentOptions) {
    // check pattern
    const name: ?string = getComponentName(componentOptions)
    const { include, exclude } = this
    if ( // 判断是否是需要缓存组件
      // not included
      (include &amp;&amp; (!name || !matches(include, name))) ||
      // excluded
      (exclude &amp;&amp; name &amp;&amp; matches(exclude, name))
    ) {
      return vnode
    }

    const { cache, keys } = this
    const key: ?string = vnode.key == null
      // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? \`::\${componentOptions.tag}\` : &#39;&#39;)
      : vnode.key
    if (cache[key]) { // 命中缓存
      vnode.componentInstance = cache[key].componentInstance
      // make current key freshest
      remove(keys, key)
      keys.push(key)
    } else { // 没有命中缓存
      cache[key] = vnode
      keys.push(key)
      // prune oldest entry
      if (this.max &amp;&amp; keys.length &gt; parseInt(this.max)) {
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
      }
    }

    vnode.data.keepAlive = true
  }
  return vnode || (slot &amp;&amp; slot[0])
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1、获取<code>keep-alive</code>第一个子组件<br> 2、根据<code>include exclude</code>名单进行匹配，决定是否缓存。如果不匹配，直接返回组件实例，如果匹配，到第3步<br> 3、根据组件id和tag生成缓存组件的<code>key</code>，再去判断<code>cache</code>中是否存在这个key，即是否命中缓存，如果命中，用缓存中的实例替代vnode实例，然后更新<code>key</code>在<code>keys</code>中的位置，(LRU置换策略)。如果没有命中，就缓存下来，如果超出缓存最大数量<code>max</code>,删除<code>cache</code>中的第一项。<br> 4、最后组件实例的keepAlive属性设置为true，这个在渲染和执行被包裹组件的钩子函数会用到，这里不详细说明。</p><p>关于开始提到的<code>abstract</code>属性，注意到官方文档中有这样一段关于<code>keep-alive</code>的描述， &lt;keep-alive&gt; 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。</p><p>Vue在初始化生命周期的时候，为组件实例建立父子关系时会根据abstract属性决定是否忽略某个组件。在keep-alive中，设置了abstract:true，那Vue就会跳过该组件实例。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent &amp;&amp; !options.abstract) {
    while (parent.$options.abstract &amp;&amp; parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  // ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lru" tabindex="-1"><a class="header-anchor" href="#lru" aria-hidden="true">#</a> LRU</h3><p>LRU（Least recently used）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。</p><p>最常见的实现是使用一个链表保存缓存数据，详细算法实现如下：</p><ol><li><p>新数据插入到链表头部；</p></li><li><p>每当缓存命中（即缓存数据被访问），则将数据移到链表头部；</p></li><li><p>当链表满的时候，将链表尾部的数据丢弃。</p></li></ol><p>当存在热点数据时，LRU的效率很好，但偶发性的、周期性的批量操作会导致LRU命中率急剧下降，缓存污染情况比较严重。复杂度比较简单，代价则是命中时需要遍历链表，找到命中的数据块索引，然后需要将数据移到头部。</p><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3><p>https://ustbhuangyi.github.io/vue-analysis/extend/keep-alive.html#%E7%BB%84%E4%BB%B6%E6%B8%B2%E6%9F%93 https://www.iteye.com/blog/flychao88-1977653</p>`,21),a=[c];function l(v,r){return n(),i("div",null,a)}const o=e(s,[["render",l],["__file","浅析Vue中keep-alive实现原理以及LRU缓存算法.html.vue"]]);export{o as default};
