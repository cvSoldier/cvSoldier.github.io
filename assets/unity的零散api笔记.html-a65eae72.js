import{_ as e,W as s,X as n,a0 as l}from"./framework-c8ebc670.js";const i="/assets/unity/Tilemap.CompressBounds/before.png",t="/assets/unity/Tilemap.CompressBounds/after.png",a={},r=l('<h3 id="tilemap-compressbounds" tabindex="-1"><a class="header-anchor" href="#tilemap-compressbounds" aria-hidden="true">#</a> Tilemap.CompressBounds</h3><p>将 Tilemap 的 origin 和 size 压缩到瓦片所存在的边界。</p><p><img src="'+i+'" alt="before"><img src="'+t+`" alt="after"></p><div class="language-c# line-numbers-mode" data-ext="c#"><pre class="language-c#"><code>void Start()
    {
        _tilemap = GetComponent&lt;Tilemap&gt;();
        Vector3Int startCell = _tilemap.cellBounds.min;
        Vector3Int endCell = _tilemap.cellBounds.max;
        Debug.Log(&quot;before compress, startCell&quot; + startCell);
        Debug.Log(&quot;before compress, endCell&quot; + endCell);
        
        _tilemap.CompressBounds();
        startCell = _tilemap.cellBounds.min;
        endCell = _tilemap.cellBounds.max;
        Debug.Log(&quot;after compress, startCell&quot; + startCell);
        Debug.Log(&quot;after compress, endCell&quot; + endCell);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),d=[r];function o(c,m){return s(),n("div",null,d)}const p=e(a,[["render",o],["__file","unity的零散api笔记.html.vue"]]);export{p as default};
