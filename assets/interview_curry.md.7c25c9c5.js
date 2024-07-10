import{o as n,c as s,d as a}from"./app.437d6b62.js";const p='{"title":"实现curry(1)(2)(3)","description":"","frontmatter":{},"headers":[{"level":2,"title":"实现curry(1)(2)(3)","slug":"实现curry-1-2-3"},{"level":3,"title":"函数柯里化","slug":"函数柯里化"}],"relativePath":"interview/curry.md","lastUpdated":1648450937134}',t={},o=a('<h2 id="实现curry-1-2-3"><a class="header-anchor" href="#实现curry-1-2-3" aria-hidden="true">#</a> 实现curry(1)(2)(3)</h2><h3 id="函数柯里化"><a class="header-anchor" href="#函数柯里化" aria-hidden="true">#</a> 函数柯里化</h3><p>函数柯里化（curry）是函数式编程里面的概念：即只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数</p><p>简单点来说就是：每次调用函数时，它只接受部分参数，并返回一个函数，直到传递所有参数为止</p><h4 id="普通实现"><a class="header-anchor" href="#普通实现" aria-hidden="true">#</a> 普通实现</h4><div class="language-javascript"><pre><code>  <span class="token keyword">const</span> <span class="token function-variable function">curry</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 函数的参数个数可以通过.length获取</span>\n    <span class="token comment">// 传入的参数大于等于函数的参数，则直接执行该函数</span>\n    <span class="token comment">// 传入的参数个数小于函数的参数时，返回一个接受所有参数（当前参数和剩余参数）的函数</span>\n    <span class="token keyword">return</span> args<span class="token punctuation">.</span>length <span class="token operator">&gt;=</span> fn<span class="token punctuation">.</span>length <span class="token operator">?</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>_args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">curry</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span><span class="token operator">...</span>args<span class="token punctuation">,</span><span class="token operator">...</span>_args<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">const</span> <span class="token function-variable function">add1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span>y<span class="token punctuation">,</span>z</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> x <span class="token operator">+</span> y <span class="token operator">+</span> z\n  <span class="token punctuation">}</span>\n  <span class="token keyword">const</span> add <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>add1<span class="token punctuation">)</span>、\n  \n  <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// 6</span>\n</code></pre></div><h4 id="支持无限层级的实现"><a class="header-anchor" href="#支持无限层级的实现" aria-hidden="true">#</a> 支持无限层级的实现</h4><div class="language-javascript"><pre><code>  <span class="token comment">// 参数累加函数 </span>\n  <span class="token keyword">const</span> <span class="token function-variable function">argsSum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> args<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">pre<span class="token punctuation">,</span>cur</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> pre<span class="token operator">+</span>cur\n    <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">const</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 当前参数的值并返回fn函数</span>\n    <span class="token keyword">let</span> sum1 <span class="token operator">=</span> <span class="token function">argsSum</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>\n    <span class="token keyword">let</span> <span class="token function-variable function">fn</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args1</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">let</span> sum2 <span class="token operator">=</span> <span class="token function">argsSum</span><span class="token punctuation">(</span><span class="token operator">...</span>args1<span class="token punctuation">)</span>\n      <span class="token comment">// 递归调用add函数，传入上次计算的值与fn参数的累加值的和</span>\n      <span class="token keyword">return</span> <span class="token function">add</span><span class="token punctuation">(</span>sum1<span class="token operator">+</span>sum2<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token comment">// 重写函数的toSting方法，返回累加的值</span>\n    fn<span class="token punctuation">.</span><span class="token function-variable function">toString</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> sum1\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> fn\n  <span class="token punctuation">}</span>\n  <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span> <span class="token comment">// 12</span>\n</code></pre></div>',8);t.render=function(a,p,t,e,c,r){return n(),s("div",null,[o])};export default t;export{p as __pageData};