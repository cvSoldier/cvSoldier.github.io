import{_ as s,W as d,X as l,Y as i,Z as e,$ as a,a0 as r,C as v}from"./framework-c8ebc670.js";const t={},c=r(`<blockquote><p><em>本文涉及源码版本为 2.6.9</em></p></blockquote><h3 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h3><p>down一份Vue源码，从package.json入手，找我们需要的代码 1、package.json中的scripts，<code>&quot;build&quot;: &quot;node scripts/build.js&quot;</code> 2、scripts/build.js line26 <code>build(builds)</code>，其中builds的定义为11行的<code>let builds = require(&#39;./config&#39;).getAllBuilds()</code>,这个大概就是打包的代码内容，另一个build是在下面定义的函数，他的代码是这样的：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function build (builds) {
  let built = 0
  const total = builds.length
  const next = () =&gt; {
    buildEntry(builds[built]).then(() =&gt; {
      built++
      if (built &lt; total) {
        next()
      }
    }).catch(logError)
  }

  next()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码有说法，其中的<code>buildEntry</code>是使用rollup进行打包的函数，定义一个next函数，把多个吃内存的打包操作串行，达到减小瞬间内存消耗的效果，这算是常用的一个优化方式了。 3、顺着scripts/config.js里的getAllBuilds()的逻辑摸到line28的<code>const aliases = require(&#39;./alias&#39;)</code>,然后打开scripts/alias.js,看到里面的<code>vue: resolve(&#39;src/platforms/web/entry-runtime-with-compiler&#39;)</code>终于有点豁然开朗，然后再根据一层层的import找到src/core/instance/index.js里的<code>function Vue(){}</code>，准备工作到此结束。</p><h3 id="new-vue-发生了什么" tabindex="-1"><a class="header-anchor" href="#new-vue-发生了什么" aria-hidden="true">#</a> new Vue()发生了什么</h3><p>就一行，<code>this._init(options)</code>,这是在函数initMixin()中定义在Vue.prototype上的方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function initMixin (Vue: Class&lt;Component&gt;) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, &#39;beforeCreate&#39;)
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, &#39;created&#39;)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要留意的分别是<code>initState(vm)</code>和<code>vm.$mount(vm.$option.el)</code></p><ol><li>initState(vm)</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function initState (vm: Component) {
 const opts = vm.$options
 if (opts.props) initProps(vm, opts.props)
 if (opts.methods) initMethods(vm, opts.methods)
 if (opts.data) {
   initData(vm)
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>字面意思，初始化props，methods，data，由于目的是看数据双向绑定，就直接进initData()</p><p>1.1 proxy</p><p>在initData()中，遍历data中的keys判断是否与props和methods重名，然后对他们设置了一层代理</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const sharedPropertyDefinition = {
 enumerable: true,
 configurable: true,
 get: noop,
 set: noop
}

export function proxy (target: Object, sourceKey: string, key: string) {
 sharedPropertyDefinition.get = function proxyGetter () {
   return this[sourceKey][key]
 }
 sharedPropertyDefinition.set = function proxySetter (val) {
   this[sourceKey][key] = val
 }
 Object.defineProperty(target, key, sharedPropertyDefinition)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是为什么我们可以直接通过this.name获取到this.data.name的值。 关于Object.defineProperty()可以设置的属性描述符，其中</p><ul><li>configurable控制是否可以配置，以及是否可以delete删除， 配置就是指是否可以通过Object.defineProperty修改这个属性的描述，没错如果你通过defineProperty把某个属性的configurable改为false，再想改回来是不可能的。<img src="https://segmentfault.com/img/bVbw7FF?w=401&amp;h=270" alt="clipboard.png"></li><li>enumerable控制是否可枚举，赋值为false之后，<code>Object.keys()</code>就看不见他了。</li><li>还有value、writable、get、set，都比较好理解就不再赘述。</li></ul><p>1.2、new Observe()</p><p>遍历完keys，就是以data作为参数调用<code>observe</code>了,而observe内部得主要内容就是<code>ob = new Observer(value)</code>,再看Observer这个类。（有一种抽丝剥茧得感觉）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export class Observer {
 value: any;
 dep: Dep;
 vmCount: number; // number of vms that have this object as root $data

 constructor (value: any) {
   this.value = value
   this.dep = new Dep()
   this.vmCount = 0
   def(value, &#39;__ob__&#39;, this)
   if (Array.isArray(value)) {
     if (hasProto) {
       protoAugment(value, arrayMethods)
     } else {
       copyAugment(value, arrayMethods, arrayKeys)
     }
     this.observeArray(value)
   } else {
     this.walk(value)
   }
 }

 walk (obj: Object) {
   const keys = Object.keys(obj)
   for (let i = 0; i &lt; keys.length; i++) {
     defineReactive(obj, keys[i])
   }
 }

 observeArray (items: Array&lt;any&gt;) {
   for (let i = 0, l = items.length; i &lt; l; i++) {
     observe(items[i])
   }
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数<code>def</code>的作用就是在对象上定义属性。然后判断传进的data是对象还是数组。</p><p>1.2.1、Array.isArray(value)</p><p>如果value是数组的话，先通过<code>hasProto</code>这个自定义函数来判断当前环境中是否存在<code>__proto__</code>，如果有的话就可以直接用，没有的话，手动 实现一下，功能是一样的，那就只看<code>protoAugment(value, arrayMethods)</code>干了啥就好</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function protoAugment (target, src: Object) {
 target.__proto__ = src
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中target自然就是我们observe的数组，而src也就是arrayMethods的定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
 &#39;push&#39;,
 &#39;pop&#39;,
 &#39;shift&#39;,
 &#39;unshift&#39;,
 &#39;splice&#39;,
 &#39;sort&#39;,
 &#39;reverse&#39;
]

methodsToPatch.forEach(function (method) {
 // cache original method
 const original = arrayProto[method]
 def(arrayMethods, method, function mutator (...args) {
   const result = original.apply(this, args)
   const ob = this.__ob__
   let inserted
   switch (method) {
     case &#39;push&#39;:
     case &#39;unshift&#39;:
       inserted = args
       break
     case &#39;splice&#39;:
       inserted = args.slice(2)
       break
   }
   if (inserted) ob.observeArray(inserted)
   // notify change
   ob.dep.notify()
   return result
 })
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看着代码里的<code>methodsToPatch</code>里的几项，眼熟吗<br><img src="https://segmentfault.com/img/bVbw70c?w=747&amp;h=423" alt="clipboard.png"><br> 再看到倒数第四行的<code>ob.dep.notify()</code>,配上官方注释<em>notify change</em>。<br> 也就是说<code>arrayMethods</code>是一个继承数组原型的对象，并对其中特定的几种方法做了处理，然后在<code>new Observe(value)</code>的时候，如果value是数组，就让value继承这个<code>arrayMethods</code>，然后这个数组调用特定的方法时，会调用当前Observe类上的dep属性的<code>notify</code>方法，进行后续操作。 定义完这些，再进行递归对数组中的每一项继续调用<code>observe</code></p><p>1.2.2、walk &amp; defineReactive</p><p>然后对于对象而言，直接调用<code>walk</code>，然后遍历对象中的非继承属性，对每一项调用<code>defineReactive</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export function defineReactive (
 obj: Object,
 key: string,
 val: any,
 customSetter?: ?Function,
 shallow?: boolean
) {
 const dep = new Dep()

 let childOb = !shallow &amp;&amp; observe(val)
 Object.defineProperty(obj, key, {
   enumerable: true,
   configurable: true,
   get: function reactiveGetter () {
     const value = getter ? getter.call(obj) : val
     if (Dep.target) {
       dep.depend()
       if (childOb) {
         childOb.dep.depend()
         if (Array.isArray(value)) {
           dependArray(value)
         }
       }
     }
     return value
   },
   set: function reactiveSetter (newVal) {
     const value = getter ? getter.call(obj) : val
     /* eslint-disable no-self-compare */
     if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
       return
     }
     /* eslint-enable no-self-compare */
     if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; customSetter) {
       customSetter()
     }
     // #7981: for accessor properties without setter
     if (getter &amp;&amp; !setter) return
     if (setter) {
       setter.call(obj, newVal)
     } else {
       val = newVal
     }
     childOb = !shallow &amp;&amp; observe(newVal)
     dep.notify()
   }
 })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>defineReactive</code>的主要代码就是各种判断递归和<code>Object.defineProperty()</code>了，这也是双向绑定的关键一部分，从数据到DOM。 其中对get的定义包含了<code>if(Dep.target){ dep.depend() }</code>,对set的定义包含了<code>dep.notify()</code>,接下来看Dep的方法。</p><p>1.3 Dep</p><p>Dep的定义是这样的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>export default class Dep {
 static target: ?Watcher;
 id: number;
 subs: Array&lt;Watcher&gt;;

 constructor () {
   this.id = uid++
   this.subs = []
 }

 addSub (sub: Watcher) {
   this.subs.push(sub)
 }

 removeSub (sub: Watcher) {
   remove(this.subs, sub)
 }

 depend () {
   if (Dep.target) {
     Dep.target.addDep(this)
   }
 }

 notify () {
   // stabilize the subscriber list first
   const subs = this.subs.slice()
   if (p<wbr>rocess.env.NODE_ENV !== &#39;production&#39; &amp;&amp; !config.async) {
     // subs aren&#39;t sorted in scheduler if not running async
     // we need to sort them now to make sure they fire in correct
     // order
     subs.sort((a, b) =&gt; a.id - b.id)
   }
   for (let i = 0, l = subs.length; i &lt; l; i++) {
     subs[i].update()
   }
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来看在get中调用的<code>dep.depend()</code>,<code>Dep.target</code>不为空的情况下，以this为参数，调用<code>Dep.target.addDep</code>,target是Dep类的静态属性，类型为Watcher，方法addDep定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>addDep (dep: Dep) {
const id = dep.id
 if (!this.newDepIds.has(id)) {
   this.newDepIds.add(id)
   this.newDeps.push(dep)
   if (!this.depIds.has(id)) {
     dep.addSub(this)
   }
 }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到addDep有去重dep的作用，然后通过调用<code>dep.addSub(this)</code>,把当前的Dep.target push到subs中。 也就是说，data里面有个observer,然后observer里面有个dep，dep里面有个watcher数组，收集依赖一条龙。</p><p>至于在set中调用的<code>dep.notify()</code>,是遍历watcher数组，调用每一项的update方法，而update方法，核心代码是调用watcher的run方法，run方法的核心是<code>this.cb.call(this.vm, value, oldValue)</code>。问题又来了，这个cb是new Watcher时的传参，但是从<code>initState</code>一步一步看下来，先new一个Observe，然后定义其中每个属性的<code>get</code>和<code>set</code>，<code>get</code>时收集依赖，<code>set</code>时通知变更。但是并没有看到哪里真的触发了我们所设置的<code>get</code>，而且之前说到的<code>Dep.target</code>是个啥呢。</p><ol start="2"><li>vm.$mount(vm.$option.el)</li></ol><p>前文有提到new Vue时也调用了这个方法，$mount是前面找Vue入口文件的过程中，在其中一个里定义在Vue原型上的方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Vue.prototype.$mount = function (
 el?: string | Element,
 hydrating?: boolean
): Component {
 el = el &amp;&amp; inBrowser ? query(el) : undefined
 return mountComponent(this, el, hydrating)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后再找<code>mountComponent</code>,果然在这个函数的调用中，找到了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mountComponent() {
 // 其他逻辑
 new Watcher(vm, updateComponent, noop, {
   before () {
     if (vm._isMounted &amp;&amp; !vm._isDestroyed) {
       callHook(vm, &#39;beforeUpdate&#39;)
     }
   }
 }, true /* isRenderWatcher */)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再去看Watcher的构造函数，有调用自己的<code>get</code>方法，定义如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>get () {
 pushTarget(this)
 let value
 const vm = this.vm
 try {
   value = this.getter.call(vm, vm)
 } catch (e) {
   if (this.user) {
     handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)
   } else {
     throw e
   }
 } finally {
   // &quot;touch&quot; every property so they are all tracked as
   // dependencies for deep watching
   if (this.deep) {
     traverse(value)
   }
   popTarget()
   this.cleanupDeps()
 }
 return value
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先<code>pushTarget(this)</code>来设置<code>Dep</code>的静态属性<code>target</code>,然后调用<code>this.getter.call(vm, vm)</code>来做虚拟DOM相关的操作，并且触发对data对象上的属性设置的<code>getter</code>,最后<code>popTarget()</code>把<code>Dep.target</code>置为null。 <code>Dep.target</code>的作用就是只有在初始化时才会收集依赖，要不然每次取个值收集依赖再判重，卡都卡死了。</p><h3 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h3><p>跟着源码梳理了一遍逻辑，对Vue的了解也更深入了一些，再去看Vue官网中对响应式原理的描述，也更清晰了。</p><p><img src="https://segmentfault.com/img/bVbw89m?w=757&amp;h=734" alt="clipboard.png"></p>`,49),u={href:"https://github.com/cvSoldier/VueSelf",target:"_blank",rel:"noopener noreferrer"};function o(m,b){const n=v("ExternalLinkIcon");return d(),l("div",null,[c,i("p",null,[e("本文也只是大概讲了一下右边红框中的实现逻辑，关于左边的虚拟DOM，暂时真的没看懂。基于上面逻辑自己尝试着写了一个简版的Vue"),i("a",u,[e("->传送门"),a(n)]),e("，尤大不是说一开始Vue也只是个自己写着玩的项目，多尝试总是没有错。 文中没有说清楚的地方欢迎指正，如果你也对Vue实现原理感兴趣，不妨也去down一份源码亲自探索吧")])])}const h=s(t,[["render",o],["__file","从源码切入Vue双向绑定原理，并实现一个demo.html.vue"]]);export{h as default};
