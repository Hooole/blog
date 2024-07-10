import{o as s,c as a,d as n}from"./app.437d6b62.js";const e='{"title":"实现Exclude","description":"","frontmatter":{},"headers":[{"level":3,"title":"实现Exclude","slug":"实现exclude"}],"relativePath":"typeChallenges/exclude.md","lastUpdated":1695722679037}',p={},t=n('<h3 id="实现exclude"><a class="header-anchor" href="#实现exclude" aria-hidden="true">#</a> 实现Exclude</h3><div class="language-javascript"><pre><code>type Result <span class="token operator">=</span> MyExclude<span class="token operator">&lt;</span><span class="token string">&#39;a&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;b&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;c&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token operator">&gt;</span> <span class="token comment">// &#39;b&#39; | &#39;c&#39;</span>\n</code></pre></div><div class="language-javascript"><pre><code>type MyExclude<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span> <span class="token constant">U</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token class-name">U</span> <span class="token operator">?</span> never <span class="token operator">:</span> <span class="token constant">T</span>\n</code></pre></div><ul><li><code>T extends U</code> 这段代码会从<code>T</code>的子类型开始分发</li></ul><div class="language-javascript"><pre><code><span class="token string">&#39;a&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;b&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;c&#39;</span> <span class="token keyword">extends</span> <span class="token string">&#39;a&#39;</span> \n<span class="token operator">=&gt;</span> <span class="token punctuation">(</span>\n  <span class="token string">&#39;a&#39;</span> <span class="token keyword">extends</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">?</span> never <span class="token operator">:</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">|</span> \n  <span class="token string">&#39;b&#39;</span> <span class="token keyword">extends</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">?</span> never <span class="token operator">:</span> <span class="token string">&#39;b&#39;</span> <span class="token operator">|</span>\n  <span class="token string">&#39;c&#39;</span> <span class="token keyword">extends</span> <span class="token string">&#39;a&#39;</span> <span class="token operator">?</span> never <span class="token operator">:</span> <span class="token string">&#39;c&#39;</span>\n<span class="token punctuation">)</span>\n<span class="token operator">=&gt;</span> <span class="token string">&#39;b&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;c&#39;</span>\n</code></pre></div>',5);p.render=function(n,e,p,o,c,r){return s(),a("div",null,[t])};export default p;export{e as __pageData};