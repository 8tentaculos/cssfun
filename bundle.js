(()=>{var e={416:e=>{function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((r=>{const n=e[r],a=typeof n;"object"!==a&&"function"!==a||Object.isFrozen(n)||t(n)})),e}class r{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function a(e,...t){const r=Object.create(null);for(const t in e)r[t]=e[t];return t.forEach((function(e){for(const t in e)r[t]=e[t]})),r}const i=e=>!!e.scope;class s{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=n(e)}openNode(e){if(!i(e))return;const t=((e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const r=e.split(".");return[`${t}${r.shift()}`,...r.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")}return`${t}${e}`})(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){i(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const o=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class l{constructor(){this.rootNode=o(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t=o({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{l._collapse(e)})))}}class c extends l{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){const r=e.root;t&&(r.scope=`language:${t}`),this.add(r)}toHTML(){return new s(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function d(e){return e?"string"==typeof e?e:e.source:null}function h(e){return p("(?=",e,")")}function u(e){return p("(?:",e,")*")}function g(e){return p("(?:",e,")?")}function p(...e){return e.map((e=>d(e))).join("")}function f(...e){const t=function(e){const t=e[e.length-1];return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>d(e))).join("|")+")"}function m(e){return new RegExp(e.toString()+"|").exec("").length-1}const b=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function y(e,{joinWith:t}){let r=0;return e.map((e=>{r+=1;const t=r;let n=d(e),a="";for(;n.length>0;){const e=b.exec(n);if(!e){a+=n;break}a+=n.substring(0,e.index),n=n.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?a+="\\"+String(Number(e[1])+t):(a+=e[0],"("===e[0]&&r++)}return a})).map((e=>`(${e})`)).join(t)}const v="[a-zA-Z]\\w*",S="[a-zA-Z_]\\w*",x="\\b\\d+(\\.\\d+)?",w="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",k="\\b(0b[01]+)",$={begin:"\\\\[\\s\\S]",relevance:0},E={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[$]},C={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[$]},_=function(e,t,r={}){const n=a({scope:"comment",begin:e,end:t,contains:[]},r);n.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const i=f("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return n.contains.push({begin:p(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),n},L=_("//","$"),j=_("/\\*","\\*/"),N=_("#","$"),R={scope:"number",begin:x,relevance:0},A={scope:"number",begin:w,relevance:0},T={scope:"number",begin:k,relevance:0},O={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[$,{begin:/\[/,end:/\]/,relevance:0,contains:[$]}]},M={scope:"title",begin:v,relevance:0},I={scope:"title",begin:S,relevance:0},z={begin:"\\.\\s*"+S,relevance:0};var D=Object.freeze({__proto__:null,APOS_STRING_MODE:E,BACKSLASH_ESCAPE:$,BINARY_NUMBER_MODE:T,BINARY_NUMBER_RE:k,COMMENT:_,C_BLOCK_COMMENT_MODE:j,C_LINE_COMMENT_MODE:L,C_NUMBER_MODE:A,C_NUMBER_RE:w,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},HASH_COMMENT_MODE:N,IDENT_RE:v,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:z,NUMBER_MODE:R,NUMBER_RE:x,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:C,REGEXP_MODE:O,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=p(t,/.*\b/,e.binary,/\b.*/)),a({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},TITLE_MODE:M,UNDERSCORE_IDENT_RE:S,UNDERSCORE_TITLE_MODE:I});function H(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function B(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function W(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=H,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function F(e,t){Array.isArray(e.illegal)&&(e.illegal=f(...e.illegal))}function P(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function U(e,t){void 0===e.relevance&&(e.relevance=1)}const Z=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const r=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]})),e.keywords=r.keywords,e.begin=p(r.beforeMatch,h(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},G=["of","and","for","in","not","or","if","then","parent","list","value"];function K(e,t,r="keyword"){const n=Object.create(null);return"string"==typeof e?a(r,e.split(" ")):Array.isArray(e)?a(r,e):Object.keys(e).forEach((function(r){Object.assign(n,K(e[r],t,r))})),n;function a(e,r){t&&(r=r.map((e=>e.toLowerCase()))),r.forEach((function(t){const r=t.split("|");n[r[0]]=[e,X(r[0],r[1])]}))}}function X(e,t){return t?Number(t):function(e){return G.includes(e.toLowerCase())}(e)?0:1}const q={},Y=e=>{console.error(e)},J=(e,...t)=>{console.log(`WARN: ${e}`,...t)},Q=(e,t)=>{q[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),q[`${e}/${t}`]=!0)},V=new Error;function ee(e,t,{key:r}){let n=0;const a=e[r],i={},s={};for(let e=1;e<=t.length;e++)s[e+n]=a[e],i[e+n]=!0,n+=m(t[e-1]);e[r]=s,e[r]._emit=i,e[r]._multi=!0}function te(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Y("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),V;if("object"!=typeof e.beginScope||null===e.beginScope)throw Y("beginScope must be object"),V;ee(e,e.begin,{key:"beginScope"}),e.begin=y(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Y("skip, excludeEnd, returnEnd not compatible with endScope: {}"),V;if("object"!=typeof e.endScope||null===e.endScope)throw Y("endScope must be object"),V;ee(e,e.end,{key:"endScope"}),e.end=y(e.end,{joinWith:""})}}(e)}function re(e){function t(t,r){return new RegExp(d(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=m(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=t(y(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const r=t.findIndex(((e,t)=>t>0&&void 0!==e)),n=this.matchIndexes[r];return t.splice(0,r),Object.assign(t,n)}}class n{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new r;return this.rules.slice(e).forEach((([e,r])=>t.addRule(e,r))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let r=t.exec(e);if(this.resumingScanAtSamePosition())if(r&&r.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,r=t.exec(e)}return r&&(this.regexIndex+=r.position+1,this.regexIndex===this.count&&this.considerAll()),r}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),function r(i,s){const o=i;if(i.isCompiled)return o;[B,P,te,Z].forEach((e=>e(i,s))),e.compilerExtensions.forEach((e=>e(i,s))),i.__beforeBegin=null,[W,F,U].forEach((e=>e(i,s))),i.isCompiled=!0;let l=null;return"object"==typeof i.keywords&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=K(i.keywords,e.case_insensitive)),o.keywordPatternRe=t(l,!0),s&&(i.begin||(i.begin=/\B|\b/),o.beginRe=t(o.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(o.endRe=t(o.end)),o.terminatorEnd=d(o.end)||"",i.endsWithParent&&s.terminatorEnd&&(o.terminatorEnd+=(i.end?"|":"")+s.terminatorEnd)),i.illegal&&(o.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return a(e,{variants:null},t)}))),e.cachedVariants?e.cachedVariants:ne(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}("self"===e?i:e)}))),i.contains.forEach((function(e){r(e,o)})),i.starts&&r(i.starts,s),o.matcher=function(e){const t=new n;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(o),o}(e)}function ne(e){return!!e&&(e.endsWithParent||ne(e.starts))}class ae extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}const ie=n,se=a,oe=Symbol("nomatch"),le=function(e){const n=Object.create(null),a=Object.create(null),i=[];let s=!0;const o="Could not find the language '{}', did you forget to load/include a language module?",l={disableAutodetect:!0,name:"Plain text",contains:[]};let d={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:c};function m(e){return d.noHighlightRe.test(e)}function b(e,t,r){let n="",a="";"object"==typeof t?(n=e,r=t.ignoreIllegals,a=t.language):(Q("10.7.0","highlight(lang, code, ...args) has been deprecated."),Q("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),a=e,n=t),void 0===r&&(r=!0);const i={code:n,language:a};C("before:highlight",i);const s=i.result?i.result:y(i.language,i.code,r);return s.code=i.code,C("after:highlight",s),s}function y(e,t,a,i){const l=Object.create(null);function c(){if(!C.keywords)return void L.addText(j);let e=0;C.keywordPatternRe.lastIndex=0;let t=C.keywordPatternRe.exec(j),r="";for(;t;){r+=j.substring(e,t.index);const a=w.case_insensitive?t[0].toLowerCase():t[0],i=(n=a,C.keywords[n]);if(i){const[e,n]=i;if(L.addText(r),r="",l[a]=(l[a]||0)+1,l[a]<=7&&(N+=n),e.startsWith("_"))r+=t[0];else{const r=w.classNameAliases[e]||e;u(t[0],r)}}else r+=t[0];e=C.keywordPatternRe.lastIndex,t=C.keywordPatternRe.exec(j)}var n;r+=j.substring(e),L.addText(r)}function h(){null!=C.subLanguage?function(){if(""===j)return;let e=null;if("string"==typeof C.subLanguage){if(!n[C.subLanguage])return void L.addText(j);e=y(C.subLanguage,j,!0,_[C.subLanguage]),_[C.subLanguage]=e._top}else e=v(j,C.subLanguage.length?C.subLanguage:null);C.relevance>0&&(N+=e.relevance),L.__addSublanguage(e._emitter,e.language)}():c(),j=""}function u(e,t){""!==e&&(L.startScope(t),L.addText(e),L.endScope())}function g(e,t){let r=1;const n=t.length-1;for(;r<=n;){if(!e._emit[r]){r++;continue}const n=w.classNameAliases[e[r]]||e[r],a=t[r];n?u(a,n):(j=a,c(),j=""),r++}}function p(e,t){return e.scope&&"string"==typeof e.scope&&L.openNode(w.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(u(j,w.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),j=""):e.beginScope._multi&&(g(e.beginScope,t),j="")),C=Object.create(e,{parent:{value:C}}),C}function f(e,t,n){let a=function(e,t){const r=e&&e.exec(t);return r&&0===r.index}(e.endRe,n);if(a){if(e["on:end"]){const n=new r(e);e["on:end"](t,n),n.isMatchIgnored&&(a=!1)}if(a){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return f(e.parent,t,n)}function m(e){return 0===C.matcher.regexIndex?(j+=e[0],1):(T=!0,0)}function b(e){const r=e[0],n=t.substring(e.index),a=f(C,e,n);if(!a)return oe;const i=C;C.endScope&&C.endScope._wrap?(h(),u(r,C.endScope._wrap)):C.endScope&&C.endScope._multi?(h(),g(C.endScope,e)):i.skip?j+=r:(i.returnEnd||i.excludeEnd||(j+=r),h(),i.excludeEnd&&(j=r));do{C.scope&&L.closeNode(),C.skip||C.subLanguage||(N+=C.relevance),C=C.parent}while(C!==a.parent);return a.starts&&p(a.starts,e),i.returnEnd?0:r.length}let S={};function x(n,i){const o=i&&i[0];if(j+=n,null==o)return h(),0;if("begin"===S.type&&"end"===i.type&&S.index===i.index&&""===o){if(j+=t.slice(i.index,i.index+1),!s){const t=new Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=S.rule,t}return 1}if(S=i,"begin"===i.type)return function(e){const t=e[0],n=e.rule,a=new r(n),i=[n.__beforeBegin,n["on:begin"]];for(const r of i)if(r&&(r(e,a),a.isMatchIgnored))return m(t);return n.skip?j+=t:(n.excludeBegin&&(j+=t),h(),n.returnBegin||n.excludeBegin||(j=t)),p(n,e),n.returnBegin?0:t.length}(i);if("illegal"===i.type&&!a){const e=new Error('Illegal lexeme "'+o+'" for mode "'+(C.scope||"<unnamed>")+'"');throw e.mode=C,e}if("end"===i.type){const e=b(i);if(e!==oe)return e}if("illegal"===i.type&&""===o)return j+="\n",1;if(A>1e5&&A>3*i.index)throw new Error("potential infinite loop, way more iterations than matches");return j+=o,o.length}const w=k(e);if(!w)throw Y(o.replace("{}",e)),new Error('Unknown language: "'+e+'"');const $=re(w);let E="",C=i||$;const _={},L=new d.__emitter(d);!function(){const e=[];for(let t=C;t!==w;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach((e=>L.openNode(e)))}();let j="",N=0,R=0,A=0,T=!1;try{if(w.__emitTokens)w.__emitTokens(t,L);else{for(C.matcher.considerAll();;){A++,T?T=!1:C.matcher.considerAll(),C.matcher.lastIndex=R;const e=C.matcher.exec(t);if(!e)break;const r=x(t.substring(R,e.index),e);R=e.index+r}x(t.substring(R))}return L.finalize(),E=L.toHTML(),{language:e,value:E,relevance:N,illegal:!1,_emitter:L,_top:C}}catch(r){if(r.message&&r.message.includes("Illegal"))return{language:e,value:ie(t),illegal:!0,relevance:0,_illegalBy:{message:r.message,index:R,context:t.slice(R-100,R+100),mode:r.mode,resultSoFar:E},_emitter:L};if(s)return{language:e,value:ie(t),illegal:!1,relevance:0,errorRaised:r,_emitter:L,_top:C};throw r}}function v(e,t){t=t||d.languages||Object.keys(n);const r=function(e){const t={value:ie(e),illegal:!1,relevance:0,_top:l,_emitter:new d.__emitter(d)};return t._emitter.addText(e),t}(e),a=t.filter(k).filter(E).map((t=>y(t,e,!1)));a.unshift(r);const i=a.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(k(e.language).supersetOf===t.language)return 1;if(k(t.language).supersetOf===e.language)return-1}return 0})),[s,o]=i,c=s;return c.secondBest=o,c}function S(e){let t=null;const r=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const r=d.languageDetectRe.exec(t);if(r){const t=k(r[1]);return t||(J(o.replace("{}",r[1])),J("Falling back to no-highlight mode for this block.",e)),t?r[1]:"no-highlight"}return t.split(/\s+/).find((e=>m(e)||k(e)))}(e);if(m(r))return;if(C("before:highlightElement",{el:e,language:r}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(d.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),d.throwUnescapedHTML))throw new ae("One of your code blocks includes unescaped HTML.",e.innerHTML);t=e;const n=t.textContent,i=r?b(n,{language:r,ignoreIllegals:!0}):v(n);e.innerHTML=i.value,e.dataset.highlighted="yes",function(e,t,r){const n=t&&a[t]||r;e.classList.add("hljs"),e.classList.add(`language-${n}`)}(e,r,i.language),e.result={language:i.language,re:i.relevance,relevance:i.relevance},i.secondBest&&(e.secondBest={language:i.secondBest.language,relevance:i.secondBest.relevance}),C("after:highlightElement",{el:e,result:i,text:n})}let x=!1;function w(){if("loading"===document.readyState)return x||window.addEventListener("DOMContentLoaded",(function(){w()}),!1),void(x=!0);document.querySelectorAll(d.cssSelector).forEach(S)}function k(e){return e=(e||"").toLowerCase(),n[e]||n[a[e]]}function $(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{a[e.toLowerCase()]=t}))}function E(e){const t=k(e);return t&&!t.disableAutodetect}function C(e,t){const r=e;i.forEach((function(e){e[r]&&e[r](t)}))}Object.assign(e,{highlight:b,highlightAuto:v,highlightAll:w,highlightElement:S,highlightBlock:function(e){return Q("10.7.0","highlightBlock will be removed entirely in v12.0"),Q("10.7.0","Please use highlightElement now."),S(e)},configure:function(e){d=se(d,e)},initHighlighting:()=>{w(),Q("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){w(),Q("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,r){let a=null;try{a=r(e)}catch(e){if(Y("Language definition for '{}' could not be registered.".replace("{}",t)),!s)throw e;Y(e),a=l}a.name||(a.name=t),n[t]=a,a.rawDefinition=r.bind(null,e),a.aliases&&$(a.aliases,{languageName:t})},unregisterLanguage:function(e){delete n[e];for(const t of Object.keys(a))a[t]===e&&delete a[t]},listLanguages:function(){return Object.keys(n)},getLanguage:k,registerAliases:$,autoDetection:E,inherit:se,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),i.push(e)},removePlugin:function(e){const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="11.11.1",e.regex={concat:p,lookahead:h,either:f,optional:g,anyNumberOfTimes:u};for(const e in D)"object"==typeof D[e]&&t(D[e]);return Object.assign(e,D),e},ce=le({});ce.newInstance=()=>le({}),e.exports=ce,ce.HighlightJS=ce,ce.default=ce}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}(()=>{"use strict";const e=r(416),t="[A-Za-z$_][0-9A-Za-z$_]*",n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],a=["true","false","null","undefined","NaN","Infinity"],i=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],s=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],o=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],l=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],c=[].concat(o,i,s);e.registerLanguage("javascript",(function(e){const r=e.regex,d=t,h={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{const r=e[0].length+e.index,n=e.input[r];if("<"===n||","===n)return void t.ignoreMatch();let a;">"===n&&(((e,{after:t})=>{const r="</"+e[0].slice(1);return-1!==e.input.indexOf(r,t)})(e,{after:r})||t.ignoreMatch());const i=e.input.substring(r);((a=i.match(/^\s*=/))||(a=i.match(/^\s+extends\s+/))&&0===a.index)&&t.ignoreMatch()}},u={$pattern:t,keyword:n,literal:a,built_in:c,"variable.language":l},g="[0-9](_?[0-9])*",p=`\\.(${g})`,f="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${f})((${p})|\\.)?|(${p}))[eE][+-]?(${g})\\b`},{begin:`\\b(${f})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},b={className:"subst",begin:"\\$\\{",end:"\\}",keywords:u,contains:[]},y={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"css"}},S={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"graphql"}},x={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,b]},w={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:d+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,v,S,x,{match:/\$\d+/},m];b.contains=k.concat({begin:/\{/,end:/\}/,keywords:u,contains:["self"].concat(k)});const $=[].concat(w,b.contains),E=$.concat([{begin:/(\s*)\(/,end:/\)/,keywords:u,contains:["self"].concat($)}]),C={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:u,contains:E},_={variants:[{match:[/class/,/\s+/,d,/\s+/,/extends/,/\s+/,r.concat(d,"(",r.concat(/\./,d),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,d],scope:{1:"keyword",3:"title.class"}}]},L={relevance:0,match:r.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...i,...s]}},j={variants:[{match:[/function/,/\s+/,d,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[C],illegal:/%/},N={match:r.concat(/\b/,(R=[...o,"super","import"].map((e=>`${e}\\s*\\(`)),r.concat("(?!",R.join("|"),")")),d,r.lookahead(/\s*\(/)),className:"title.function",relevance:0};var R;const A={begin:r.concat(/\./,r.lookahead(r.concat(d,/(?![0-9A-Za-z$_(])/))),end:d,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},T={match:[/get|set/,/\s+/,d,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},C]},O="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,d,/\s*/,/=\s*/,/(async\s*)?/,r.lookahead(O)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[C]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:u,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:L},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,v,S,x,w,{match:/\$\d+/},m,L,{scope:"attr",match:d+r.lookahead(":"),relevance:0},M,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,e.REGEXP_MODE,{className:"function",begin:O,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:u,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:h.begin,"on:begin":h.isTrulyOpeningTag,end:h.end}],subLanguage:"xml",contains:[{begin:h.begin,end:h.end,skip:!0,contains:["self"]}]}]},j,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[C,e.inherit(e.TITLE_MODE,{begin:d,className:"title.function"})]},{match:/\.\.\./,relevance:0},A,{match:"\\$"+d,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[C]},N,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},_,T,{match:/\$[(.]/}]}})),e.registerLanguage("xml",(function(e){const t=e.regex,r=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},i=e.inherit(a,{begin:/\(/,end:/\)/}),s=e.inherit(e.APOS_STRING_MODE,{className:"string"}),o=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[n]},{begin:/'/,end:/'/,contains:[n]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,o,s,i,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[a,i,o,s]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},n,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[o]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(r,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:r,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(r,/>/))),contains:[{className:"name",begin:r,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}})),e.registerLanguage("bash",(function(e){const t=e.regex,r={},n={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[r]}]};Object.assign(r,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});const a={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},i=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),s={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},o={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,r,a]};a.contains.push(o);const l={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,r]},c=e.SHEBANG({binary:`(${["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"].join("|")})`,relevance:10}),d={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],literal:["true","false"],built_in:["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset","alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias","set","shopt","autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp","chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"]},contains:[c,e.SHEBANG(),d,l,i,s,{match:/(\/[a-z._-]+)+/},o,{match:/\\"/},{className:"string",begin:/'/,end:/'/},{match:/\\'/},r]}}));class d{on(e,t){if("function"!=typeof t)throw new TypeError("Listener must be a function");return this.listeners||(this.listeners={}),this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>this.off(e,t)}once(e,t){if("function"==typeof t){const r=this,n=t;t=function(...a){n(...a),r.off(e,t)}}return this.on(e,t)}off(e,t){this.listeners&&(e?this.listeners[e]&&(t?(this.listeners[e]=this.listeners[e].filter((e=>e!==t)),this.listeners[e].length||delete this.listeners[e]):delete this.listeners[e],Object.keys(this.listeners).length||delete this.listeners):delete this.listeners)}emit(e,...t){this.listeners&&this.listeners[e]&&this.listeners[e].slice().forEach((function(e){e(...t)}))}}var h=(e,t,...r)=>"function"!=typeof e?e:e.apply(t,r);class u extends d{constructor(e={}){super(),this.preinitialize.apply(this,arguments);const t=h(this.defaults,this)||{};this.attributes=Object.assign({},t,e),this.previous={},Object.keys(this.attributes).forEach(this.defineAttribute.bind(this))}preinitialize(){}defineAttribute(e){Object.defineProperty(this,e,{get:()=>this.get(e),set:t=>{this.set(e,t)}})}get(e){return this.attributes[e]}set(e,t,...r){let n,a;"object"==typeof e?(n=e,a=[t,...r]):(n={[e]:t},a=r);const i=this._changing;this._changing=!0;const s={};i||(this.previous=Object.assign({},this.attributes)),Object.keys(n).forEach((e=>{n[e]!==this.attributes[e]&&(s[e]=n[e],this.attributes[e]=n[e])}));const o=Object.keys(s);if(o.length&&(this._pending=["change",this,s,...a]),o.forEach((e=>{this.emit(`change:${e}`,this,n[e],...a)})),i)return this;for(;this._pending;){const e=this._pending;this._pending=null,this.emit.apply(this,e)}return this._pending=null,this._changing=!1,this}toJSON(){return Object.assign({},this.attributes)}}const g=["el","tag","attributes","events","model","template","onDestroy"];class p extends d{constructor(e={}){super(),this.preinitialize.apply(this,arguments),this.uid="rasti-"+ ++p.uid,this.delegatedEventListeners=[],this.children=[],this.destroyQueue=[],g.forEach((t=>{t in e&&(this[t]=e[t])})),this.ensureElement()}preinitialize(){}$(e){return this.el.querySelector(e)}$$(e){return this.el.querySelectorAll(e)}destroy(){return this.destroyChildren(),this.undelegateEvents(),this.off(),this.destroyQueue.forEach((e=>e())),this.destroyQueue=[],this.onDestroy.apply(this,arguments),this}onDestroy(){}addChild(e){return this.children.push(e),e}destroyChildren(){this.children.forEach((e=>e.destroy())),this.children=[]}ensureElement(){if(this.el)this.el=h(this.el,this);else{const e=h(this.tag,this),t=h(this.attributes,this);this.el=this.createElement(e,t)}this.delegateEvents()}createElement(e="div",t={}){let r=document.createElement(e);return Object.keys(t).forEach((e=>r.setAttribute(e,t[e]))),r}removeElement(){return this.el.parentNode.removeChild(this.el),this}delegateEvents(e){if(e||(e=h(this.events,this)),!e)return this;this.delegatedEventListeners.length&&this.undelegateEvents();let t={};return Object.keys(e).forEach((r=>{const n=r.split(" "),a=n.shift(),i=n.join(" ");let s=e[r];s=("string"==typeof s?this[s]:s).bind(this),t[a]||(t[a]=[]),t[a].push({selector:i,listener:s})})),Object.keys(t).forEach((e=>{const r=r=>{t[e].forEach((({selector:e,listener:t})=>{e&&!r.target.closest(e)||t(r,this)}))};this.delegatedEventListeners.push({type:e,listener:r}),this.el.addEventListener(e,r)})),this}undelegateEvents(){return this.delegatedEventListeners.forEach((({type:e,listener:t})=>{this.el.removeEventListener(e,t)})),this.delegatedEventListeners=[],this}render(){return this.template&&(this.el.innerHTML=this.template(this.model)),this}static sanitize(e){return`${e}`.replace(/[&<>"']/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[e])))}}p.uid=0;const f=e=>e.reduce(((e,t)=>(Array.isArray(t)?e.push(...f(t)):e.push(t),e)),[]);class m{constructor(e){this.value=e}toString(){return this.value}}const b=(e,t)=>h(e,t,t),y=(e,t)=>e.reduce(((e,r,n)=>(e.push(r),void 0!==t[n]&&e.push(E.PLACEHOLDER_EXPRESSION(n)),e)),[]).join(""),v=(e,t)=>{const r=E.PLACEHOLDER_EXPRESSION("(\\d+)"),n=new RegExp(`${r}`,"g"),a=[];let i,s=0;for(;null!==(i=n.exec(e));){const r=e.slice(s,i.index);a.push(E.markAsSafeHTML(r),t[i[1]]),s=i.index+i[0].length}return a.push(E.markAsSafeHTML(e.slice(s))),a},S=(e,t)=>{const r=e.reduce(((e,r)=>{const n=t(r[0]);if(1===r.length)"object"==typeof n?e.all=Object.assign(e.all,n):"string"==typeof n&&(e.all[n]=!0);else{const a=t(r[1]);e.all[n]=a}return e}),{all:{},events:{},attributes:{}});return Object.keys(r.all).forEach((e=>{const t=e.match(/on(([A-Z]{1}[a-z]+)+)/);t&&t[1]?r.events[t[1].toLowerCase()]=r.all[e]:r.attributes[e]=r.all[e]})),r},x=(e,t)=>{const r=E.PLACEHOLDER_EXPRESSION("(\\d+)");return e.replace(new RegExp(`<(${r})([^>]*)>([\\s\\S]*?)</(${r})>|<(${r})([^>]*)/>`,"g"),(function(){const{tag:e,attributes:r,inner:n,close:a,raw:i}=w(arguments,t);if(!(e.prototype instanceof E))return i;let s;if(a){if(e!==a)return i;const r=v(x(n,t),t);s=function(){return f(r.map((e=>b(e,this))))}}return t.push((function(){const t=S(r,(e=>b(e,this))).all;return s&&(t.renderChildren=s.bind(this)),e.mount(t)})),E.PLACEHOLDER_EXPRESSION(t.length-1)}))},w=(e,t)=>{const r=E.PLACEHOLDER_EXPRESSION("(\\d+)"),[n,a,i,s,o,l,c,d,h,u]=e,g={raw:n,attributes:[]};let p;a?(g.tag=void 0!==i?t[i]:a,g.inner=o,g.close=void 0!==c?t[c]:l,p=s):(g.tag=void 0!==h?t[h]:d,p=u);const f=new RegExp(`(${r}|[\\w-]+)(?:=(["']?)(?:${r}|((?:.?(?!["']?\\s+(?:\\S+)=|\\s*/?[>"']))+.))\\3)?`,"g");let m;for(;null!==(m=f.exec(p));){const[,e,r,,n,a]=m,i=void 0!==r?t[r]:e,s=void 0!==n?t[n]:a;void 0!==s?g.attributes.push([i,s]):g.attributes.push([i])}return g},k={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,source:!0,track:!0,wbr:!0},$=["key","state","onCreate","onChange","onRender"];class E extends p{constructor(e={}){super(...arguments),$.forEach((t=>{t in e&&(this[t]=e[t])})),this.options=e,this.partial=this.partial.bind(this),this.onCreate.apply(this,arguments)}subscribe(e){if(!e.on)return;const t=this.onChange.bind(this),r=e.on("change",t);return this.destroyQueue.push("function"==typeof r?r:()=>e.off("change",t)),this}isContainer(){return!(this.tag||!this.template)}ensureElement(){this.el&&(this.el=h(this.el,this),this.delegateEvents())}findElement(e){return(e||document).querySelector(`[${E.DATA_ATTRIBUTE_UID}="${this.uid}"]`)}getAttributes(){const e={},t={},r=[],n={[E.DATA_ATTRIBUTE_UID]:this.uid};this.attributes&&Object.assign(n,h(this.attributes,this));const a=this.previousAttributes||{};return this.previousAttributes=n,Object.keys(n).forEach((a=>{let i=n[a];!1===i?t[a]=!0:!0===i?(e[a]="",r.push(a)):(null==i&&(i=""),e[a]=i,r.push(`${E.sanitize(a)}="${E.sanitize(i)}"`))})),Object.keys(a).forEach((e=>{e in n||(t[e]=!0)})),{add:e,remove:t,html:r.join(" ")}}hydrate(e){return this.model&&this.subscribe(this.model),this.state&&this.subscribe(this.state),this.isContainer()?(this.children[0].hydrate(e),this.el=this.children[0].el):(this.el=this.findElement(e),this.delegateEvents(),this.children.forEach((e=>e.hydrate(this.el)))),this.onRender.call(this,E.RENDER_TYPE_HYDRATE),this}recycle(e){return this.isContainer()?this.children[0].recycle(e):this.findElement(e).replaceWith(this.el),this.onRender.call(this,E.RENDER_TYPE_RECYCLE),this}destroy(){return super.destroy.apply(this,arguments),this.destroyed=!0,this}onCreate(){}onChange(){this.render()}onRender(){}onDestroy(){}partial(e,...t){return f(v(x(y(e,t),t),t).map((e=>b(e,this))))}getRecyclePlaceholder(){if(this.isContainer())return this.children[0].getRecyclePlaceholder();const e=h(this.tag,this)||"div",t=`${E.DATA_ATTRIBUTE_UID}="${this.uid}"`;return this.template||!k[e]?`<${e} ${t}></${e}>`:`<${e} ${t} />`}toString(){if(this.destroyChildren(),this.isContainer())return this.template.call(this,this.addChild.bind(this));const e=h(this.tag,this)||"div",t=this.getAttributes().html,r=this.template?this.template.call(this,this.addChild.bind(this)):"";return this.template||!k[e]?`<${e} ${t}>${r}</${e}>`:`<${e} ${t} />`}render(){if(this.destroyed)return this;if(!this.el){const e=this.createElement("template");return e.innerHTML=this,this.hydrate(e.content),this}if(!this.isContainer()){const e=this.getAttributes();Object.keys(e.remove).forEach((e=>{this.el.removeAttribute(e)})),Object.keys(e.add).forEach((t=>{this.el.setAttribute(t,e.add[t])}))}if(this.template){const e=document.activeElement,t=[],r=[],n=this.children;this.children=[];const a=this.template.call(this,(e=>{let a=e;const i=e.key&&n.find((t=>t.key===e.key));return i?(a=i.getRecyclePlaceholder(),r.push(i),e.destroy()):t.push(e),a}));if(this.isContainer())if(t[0]){const e=this.createElement("template");e.innerHTML=a,this.addChild(t[0]).hydrate(e.content);const r=e.content.children[0];this.el.replaceWith(r),this.el=r}else{if(!r[0])throw new Error("Container component must have a child component");this.addChild(r[0])}else this.el.innerHTML=a,t.forEach((e=>{this.addChild(e).hydrate(this.el)})),r.forEach((e=>{this.addChild(e).recycle(this.el)}));n.forEach((e=>{r.indexOf(e)>-1||e.destroy()})),this.el.contains(e)&&e.focus()}return this.onRender.call(this,E.RENDER_TYPE_RENDER),this}static markAsSafeHTML(e){return new m(e)}static extend(e){const t=this;class r extends t{}return Object.assign(r.prototype,"function"==typeof e?e(t.prototype):e),r}static mount(e,t,r){const n=new this(e);return t&&(r?(n.toString(),n.hydrate(t)):t.appendChild(n.render().el)),n}static create(e,...t){const r=E.PLACEHOLDER_EXPRESSION("(\\d+)");let n,a,i,s;"function"==typeof e&&(t=[e],e=["",""]);const o=x(y(e,t),t);let l=o.match(new RegExp(`^\\s*<([a-z]+[1-6]?|${r})([^>]*)>([\\s\\S]*?)</(\\1|${r})>\\s*$|^\\s*<([a-z]+[1-6]?|${r})([^>]*)/>\\s*$`));if(l){const{tag:e,attributes:r,inner:o,close:c}=w(l,t);if(n=function(){return E.sanitize(b(e,this))},a=function(){return S(r,(e=>b(e,this))).attributes},i=function(){const e=S(r,(e=>b(e,this))).events;return Object.keys(e).reduce(((t,r)=>{const n=b(e[r],this);return Object.keys(n).forEach((e=>{t[`${r}${"&"===e?"":` ${e}`}`]=n[e]})),t}),{})},c){const e=o?v(o,t):[];s=function(t){return f(e.map((e=>b(e,this)))).map((e=>null!=e&&!1!==e&&!0!==e?e instanceof m?e:e instanceof E?t(e):E.sanitize(e):"")).join("")}}}else{if(l=o.match(new RegExp(`^\\s*${r}\\s*$`)),!l)throw new SyntaxError("Invalid component");s=function(e){return e(b(t[l[1]],this)).toString()}}return this.extend({tag:n,attributes:a,events:i,template:s})}}E.PLACEHOLDER_EXPRESSION=e=>`__RASTI_{${e}}__`,E.DATA_ATTRIBUTE_UID="data-rasti-uid",E.RENDER_TYPE_HYDRATE="hydrate",E.RENDER_TYPE_RECYCLE="recycle",E.RENDER_TYPE_RENDER="render";class C{constructor(e,t={}){this.styles=e,this.classes={},["prefix","generateUid","generateClassName","attributes","renderers"].forEach((e=>{e in t&&(this[e]=t[e])})),this.renderers||(this.renderers=[this.renderStyles,this.parseStyles]),this.prefix||(this.prefix=C.prefix),this.uid=this.generateUid(),Object.keys(e).forEach((e=>{e.match(C.classRegex)&&(this.classes[e]=this.generateClassName(e))}))}generateUid(){const e=JSON.stringify(this.styles);let t=2166136261;for(let r=0;r<e.length;r++)t^=e.charCodeAt(r),t=16777619*t>>>0;return`${this.prefix}-${t.toString(36)}`}generateClassName(e){return`${this.uid}-${e}`}isDOM(){return"undefined"!=typeof document}render(){return((...e)=>e.reduce(((e,t)=>(...r)=>e(t(...r)))))(...this.renderers.map((e=>("string"==typeof e?this[e]:e).bind(this))))(this.styles)}renderStyles(e,t=1){return Object.keys(e).reduce(((r,n)=>{const a=e[n];let i="",s="",o="";if(C.debug&&(i=C.indent.repeat(t),s="\n",o=" "),a.constructor===Object){if(Object.keys(a).length>0){const e=this.renderStyles(a,t+1);r.push(`${i}${n}${o}{${s}${e}${i}}${s}`)}}else r.push(`${i}${n}:${o}${a};${s}`);return r}),[]).join("")}parseStyles(e,t,r,n){const a=e=>e in this.classes?`.${this.classes[e]}`:e,i=e=>n&&r?`${r} ${e}`:e.match(C.globalPrefixRegex)?`${r?`${r} `:""}${e.replace(C.globalPrefixRegex,"")}`:a(e).replace(C.referenceRegex,((e,t)=>a(t))).replace(C.nestedRegex,r);return Object.keys(e).reduce(((n,a)=>{const s=e[a];if(s.constructor===Object)if(a.match(C.globalRegex))Object.assign(t||n,this.parseStyles(s,n,r,!0));else if((a.match(C.nestedRegex)||a.match(C.globalPrefixRegex))&&t){const e=i(a);t[e]={},Object.assign(t[e],this.parseStyles(s,t,e))}else{const e=i(a);n[e]={},Object.assign(n[e],this.parseStyles(s,n,e))}else n[a.includes("-")?a:(o=a,o.replace(/([A-Z])/g,(e=>`-${e[0].toLowerCase()}`)))]=s;var o;return n}),{})}getAttributes(){const e=Object.assign({},this.attributes);return e[`data-${this.prefix}-uid`]=this.uid,e}toString(){const e=this.getAttributes(),t=Object.keys(e).map((t=>` ${t}="${e[t]}"`)).join(""),r=C.debug?"\n":"";return`<style${t}>${r}${this.render()}</style>${r}`}attach(){if(-1===C.registry.indexOf(this)&&C.registry.push(this),this.isDOM()&&!document.querySelector(`style[data-${this.prefix}-uid="${this.uid}"]`)){this.el=document.createElement("style");const e=this.getAttributes();Object.keys(e).forEach((t=>{this.el.setAttribute(t,e[t])})),this.el.textContent=this.render(),document.head.appendChild(this.el)}return this}destroy(){const e=C.registry.indexOf(this);return e>-1&&C.registry.splice(e,1),this.isDOM()&&this.el&&(this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=null),this}static toString(){return C.registry.join("")}static destroy(){C.registry.slice().forEach((e=>e.destroy()))}}C.classRegex=/^\w+$/,C.globalRegex=/^@global$/,C.globalPrefixRegex=/^@global\s+/,C.referenceRegex=/\$(\w+)/g,C.nestedRegex=/&/g,C.prefix="fun",C.indent="    ",C.registry=[],C.debug=!1;var _=["#f8f9fa","#f1f3f5","#e9ecef","#dee2e6","#ced4da","#adb5bd","#868e96","#495057","#343a40","#212529"],L=["#e7f5ff","#d0ebff","#a5d8ff","#74c0fc","#4dabf7","#339af0","#228be6","#1c7ed6","#1971c2","#1864ab"],j=["#f3f0ff","#e5dbff","#d0bfff","#b197fc","#9775fa","#845ef7","#7950f2","#7048e8","#6741d9","#5f3dc4"],N=["#fff5f5","#ffe3e3","#ffc9c9","#ffa8a8","#ff8787","#ff6b6b","#fa5252","#f03e3e","#e03131","#c92a2a"],R=["#fff9db","#fff3bf","#ffec99","#ffe066","#ffd43b","#fcc419","#fab005","#f59f00","#f08c00","#e67700"],A=["#ebfbee","#d3f9d8","#b2f2bb","#8ce99a","#69db7c","#51cf66","#40c057","#37b24d","#2f9e44","#2b8a3e"],T="#000000",O="#ffffff";const M=(e,t="xs",r="xl")=>{const n=["xs","sm","md","lg","xl","xxl","xxxl","xxxxl"];return n.slice(n.indexOf(t),n.indexOf(r)+1).reduce(((t,r,n)=>(Object.assign(t,e(r,n)),t)),{})},I=(e,t,r)=>M(((t,r)=>({[t]:e(t,r)})),t,r),z=e=>`@media (min-width: ${{sm:640,md:768,lg:1024,xl:1280,xxl:1536}[e]}px)`,D=e=>{const t=e.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null},H=e=>{const t=D(e),[r,n,a]=t;return(.299*r+.587*n+.114*a)/255<=.5},B=e=>["primary","secondary","neutral","error","warning","success"].reduce(((t,r)=>(Object.assign(t,e(r)),t)),{}),W=(e,t,r,n)=>{const a=(t,a)=>({main:t(r[n]),light:t(r[n+-1]),dark:t(r[n+1]),contrastMain:t(H(r[n])?O:T),contrastLight:t(H(r[n+-1])?O:T),contrastDark:t(H(r[n+1])?O:T),foregroundMain:t("light"===e?r[8]:r[2]),foregroundLight:t("light"===e?r[7]:r[1]),foregroundDark:t("light"===e?r[9]:r[3]),backgroundMain:t("light"===e?r[1]:r[8]),backgroundLight:t("light"===e?r[0]:r[7]),backgroundDark:t("light"===e?r[2]:r[9]),level1:"light"===e?`var(--rui-palette-${a}-light)`:`var(--rui-palette-${a}-dark)`,level2:`var(--rui-palette-${a}-main)`,level3:"light"===e?`var(--rui-palette-${a}-dark)`:`var(--rui-palette-${a}-light)`,contrastLevel1:"light"===e?`var(--rui-palette-${a}-contrastLight)`:`var(--rui-palette-${a}-contrastDark)`,contrastLevel2:`var(--rui-palette-${a}-contrastMain)`,contrastLevel3:"light"===e?`var(--rui-palette-${a}-contrastDark)`:`var(--rui-palette-${a}-contrastLight)`,foregroundLevel1:"light"===e?`var(--rui-palette-${a}-foregroundDark)`:`var(--rui-palette-${a}-foregroundLight)`,foregroundLevel2:`var(--rui-palette-${a}-foregroundMain)`,foregroundLevel3:"light"===e?`var(--rui-palette-${a}-foregroundLight)`:`var(--rui-palette-${a}-foregroundDark)`,backgroundLevel1:"light"===e?`var(--rui-palette-${a}-backgroundLight)`:`var(--rui-palette-${a}-backgroundDark)`,backgroundLevel2:`var(--rui-palette-${a}-backgroundMain)`,backgroundLevel3:"light"===e?`var(--rui-palette-${a}-backgroundDark)`:`var(--rui-palette-${a}-backgroundLight)`});return{...a((e=>e),t),rgb:a((e=>D(e).join(" ")),`${t}-rgb`)}},F=e=>"light"===e?{black:T,white:O,primary:W("light","primary",L,7),secondary:W("light","secondary",j,7),neutral:W("light","neutral",_,7),error:W("light","error",N,7),warning:W("light","warning",R,6),success:W("light","success",A,8)}:{black:T,white:O,primary:W("dark","primary",L,4),secondary:W("dark","secondary",j,3),neutral:W("dark","neutral",_,4),error:W("dark","error",N,4),warning:W("dark","warning",R,4),success:W("dark","success",A,4)},P=e=>{const t="0 0 #000",r="light"===e?"21 21 21":"0 0 0",n="light"===e?"0.2":"0.4";return{xs:`${t}, 0px 1px 2px 0px rgb(${r} / ${n})`,sm:`${t}, 0px 1px 2px 0px rgb(${r} / ${n}), 0px 2px 4px 0px rgb(${r} / ${n})`,md:`${t}, 0px 2px 8px -2px rgb(${r} / ${n}), 0px 6px 12px -2px rgb(${r} / ${n})`,lg:`${t}, 0px 2px 8px -2px rgb(${r} / ${n}), 0px 12px 16px -4px rgb(${r} / ${n})`,xl:`${t}, 0px 2px 8px -2px rgb(${r} / ${n}), 0px 20px 24px -4px rgb(${r} / ${n})`}},U=(I(((e,t)=>`${["0.75","0.875","1","1.125","1.25","1.5","1.875","2.25"][t]}rem`),"xs","xxxxl"),I(((e,t)=>200+100*(t+1))),I(((e,t)=>["1.33334","1.42858","1.5","1.55556","1.66667"][t])),I(((e,t)=>2*(t+1)+1+"px")),I(((e,t)=>4*(t+1)+"px"),"xs","xxxxl"),F("light"),P("light"),F("dark"),P("dark"),(e,t)=>((...e)=>new C(...e).attach())(e,{prefix:"rui",...t}));U({"@keyframes rui-animations-pulse":{"0%, 100%":{opacity:1},"50%":{opacity:.5}}});const Z=U({root:{display:"inline-flex",alignItems:"center",justifyContent:"space-evenly",borderRadius:"var(--rui-borderRadius-xs)",padding:"var(--rui-spacing-sm)",maxHeight:"100%",fontFamily:"var(--rui-typography-button-fontFamily)",fontWeight:"var(--rui-typography-button-fontWeight)",fontSize:"var(--rui-typography-button-fontSize)",lineHeight:"var(--rui-typography-button-lineHeight)",textTransform:"var(--rui-typography-button-textTransform)",textDecoration:"var(--rui-typography-button-textDecoration)",transition:"background-color 0.1s, color 0.1s, border-color 0.1s","&>svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"&>svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"&>svg:only-child":{padding:"0"}},...B((e=>({[e]:{}}))),disabled:{},solid:{...B((e=>({[`&$${e}`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-main)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,border:`1px solid var(--rui-palette-${e}-dark)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`}}}})))},outlined:{...B((e=>({[`&$${e}`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-foregroundMain)`,backgroundColor:"transparent","&:hover":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.2)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,border:`1px solid rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,backgroundColor:"transparent"}}}})))},plain:{...B((e=>({[`&$${e}`]:{border:"none",background:"transparent",color:`var(--rui-palette-${e}-foregroundMain)`,"&:hover":{color:`var(--rui-palette-${e}-foregroundDark)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`}}}})))},group:{"&:not(:first-child)":{marginLeft:"-1px",...B((e=>({[`&$solid$${e}`]:{borderLeftColor:`var(--rui-palette-${e}-dark)`}})))},"&:not(:first-child):not(:last-child)":{borderRadius:"0"},"&:first-child":{borderTopRightRadius:"0",borderBottomRightRadius:"0"},"&:last-child":{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}},lg:{fontSize:"var(--rui-fontSize-xl)"},sm:{fontSize:"var(--rui-fontSize-xs)"}}),G=E.create`
    <${({options:e})=>e.href?"a":e.type?"input":"button"}
        class="${({options:e})=>(e=>{const t=e.classes?{...Z.classes,...e.classes}:Z.classes;return[e.className||null,t.root,t[e.size||"md"],t[e.variant||"solid"],t[e.color||"neutral"],e.disabled?t.disabled:null,e.group?t.group:null].join(" ")})(e)}"
        onClick="${{"&":(e,t)=>t.options.onClick&&t.options.onClick(e,t)}}"
        href="${({options:e})=>e.href||!1}"
        type="${({options:e})=>e.type||!1}"
        value="${({options:e})=>e.type&&e.label||!1}"
        disabled="${({options:e})=>e.disabled||!1}"
        target="${({options:e})=>e.target||!1}"
        title="${({options:e})=>e.title||!1}"
    >
        ${e=>e.renderChildren()}
    </${({options:e})=>e.href?"a":e.type?"input":"button"}>
`.extend({renderChildren:function(){return this.options.type?null:this.options.renderChildren?this.options.renderChildren():this.partial`
            ${this.options.renderLeftIcon}
            <span>${this.options.label}</span>
            ${this.options.renderRightIcon}
        `}}),K=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),X=U({root:{color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-md) 0"},h1:K("h1"),h2:K("h2"),h3:K("h3"),h4:K("h4"),titleLg:K("titleLg"),titleMd:K("titleMd"),titleSm:K("titleSm"),bodyLg:K("bodyLg"),bodyMd:K("bodyMd"),bodySm:K("bodySm"),caption:K("caption")}),q=e=>{switch(e.level){case"h1":return"h1";case"h2":case"titleLg":case"titleMd":case"titleSm":return"h2";case"h3":return"h3";case"h4":return"h4";default:return"p"}},Y=E.create`
    <${({options:e})=>q(e)} class="${({options:e})=>(e=>{const t=e.classes?{...X.classes,...e.classes}:X.classes;return[e.className||null,t.root,t[e.level||"bodyMd"]].join(" ")})(e)}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()||e.text}
    </${({options:e})=>q(e)}>
`,J=E.create`
    <svg class="${({options:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
`,Q=E.create`
    <svg class="${({options:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
        <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"></path>
    </svg>
`,{classes:V}=U({root:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",backgroundColor:"var(--rui-palette-neutral-backgroundLevel3)",boxShadow:"var(--rui-shadow-xs)",padding:"0 var(--rui-spacing-xl)",overflow:"hidden","@global":{h1:{textAlign:"center",margin:"var(--rui-app-appBarHeight) 0 0 0"},h2:{color:"var(--rui-palette-neutral-foregroundLevel2)",marginTop:0,marginBottom:"var(--rui-spacing-sm)"},h4:{color:"var(--rui-palette-neutral-foregroundLevel3)",marginBottom:"var(--rui-spacing-md)"},"h1 img":{width:"90%"},pre:{maxWidth:"100%"},code:{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"}}},buttons:{"& a":{margin:"var(--rui-spacing-md) var(--rui-spacing-xs)"},display:"flex",justifyContent:"center"},[z("sm")]:{"$root h1":{margin:"var(--rui-app-appBarHeight) 0 0 0"},"$root h2":{marginBottom:"var(--rui-spacing-xl)"},"$root h4":{marginBottom:"var(--rui-spacing-xxl)"},"$root h1 img":{width:"60%"},"$buttons a":{margin:"var(--rui-spacing-xxxl) var(--rui-spacing-lg)"}},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-secondary-main)"},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),ee=E.create`
    <section class="${V.root}">
        <h1>
            <img class="${V.hiddenIfLight}" alt="CSSFUN" src="/logo-dark.svg">
            <img class="${V.hiddenIfDark}" alt="CSSFUN" src="/logo.svg">
        </h1>
        ${()=>Y.mount({level:"h2",text:"Near-zero runtime CSS-in-JS library"})}
        ${e=>Y.mount({level:"h4",renderChildren:()=>e.partial`Write modular <strong>CSS</strong> within your <strong>JavaScript</strong> code with built-in <strong>themes</strong> and <strong>SSR</strong> support.`})}
        ${()=>E.markAsSafeHTML("<pre><code class=\"javascript language-javascript\">\nconst { classes } = css({\n    button : {\n        backgroundColor : 'blue',\n        color : 'white',\n        padding : '10px',\n        borderRadius : '5px'\n    }\n});\n\nconst Button = () =&gt; &lt;button className={classes.button}&gt;Click me&lt;/button&gt;;\n</code></pre>")}
        <div class="${V.buttons}">
            ${()=>G.mount({label:"Getting Started",color:"primary",variant:"outlined",href:"#gettingstarted"})}
            ${()=>G.mount({label:"GitHub",color:"secondary",variant:"outlined",href:"https://github.com/8tentaculos/cssfun",target:"_blank",renderLeftIcon:()=>J.mount({className:V.icon})})}
        </div>
    </section>
`,te=e=>e.charAt(0).toUpperCase()+e.slice(1),re=U({root:{borderRadius:"var(--rui-borderRadius-xs)",padding:"var(--rui-spacing-md)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",fontFamily:"var(--rui-fontFamily-body)",fontSize:"var(--rui-fontSize-bodyMd)"},...B((e=>({[e]:{color:`var(--rui-palette-${e}-foregroundMain)`}}))),outlined:{...B((e=>({[`&$${e}`]:{border:`1px solid rgb(var(--rui-palette-${e}-rgb-level1) / 0.4)`}})))},solid:{...B((e=>({[`&$${e}`]:{backgroundColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`}})))},...M((e=>({[`shadow${te(e)}`]:{boxShadow:`var(--rui-shadow-${e})`}})))}),ne=E.create`
    <div class="${({options:e})=>(e=>{const t=e.classes?{...re.classes,...e.classes}:re.classes;return[e.className||null,t.root,t[e.variant||"outlined"],t[e.color||"neutral"],e.shadow?t[`shadow${te(e.shadow)}`]:null].join(" ")})(e)}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`;var ae=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
    </svg>
`;const ie=U({root:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgb(var(--rui-palette-neutral-rgb-level3) / 0.2)",backdropFilter:"blur(5px)",zIndex:1e3,padding:"var(--rui-spacing-md)"},modal:{position:"relative",padding:"var(--rui-spacing-sm)"},left:{justifyContent:"flex-start"},right:{justifyContent:"flex-end"},top:{alignItems:"flex-start"},bottom:{alignItems:"flex-end"},header:{display:"flex",justifyContent:"flex-end",marginBottom:"var(--rui-spacing-lg)","& button":{margin:0,padding:0,borderRadius:"50%"}},content:{padding:"var(--rui-spacing-md)",marginBottom:"var(--rui-spacing-lg)"},footer:{display:"flex",justifyContent:"space-evenly"}}),se=E.create`
    <div class="${({options:e})=>ce(e).header}">
        <${G}
            onClick=${({options:e})=>e.handleClose&&e.handleClose}
            color="neutral"
            variant="outlined"
            size="sm"
        >
            ${()=>ae.mount()}
        </${G}>
    </div>
`,oe=E.create`
    <div class="${({options:e})=>ce(e).content}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`,le=E.create`
    <div class="${({options:e})=>ce(e).footer}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`,ce=e=>e.classes?{...ie.classes,...e.classes}:ie.classes,de=({variant:e,color:t,shadow:r})=>({variant:e,color:t,shadow:r}),he=E.create`
    <div
        class="${({options:e})=>(e=>{const t=ce(e);return[e.className||null,t.root,e.top?t.top:null,e.bottom?t.bottom:null,e.left?t.left:null,e.right?t.right:null].join(" ")})(e)}"
        onClick=${{"&":function(e){this.options.handleClose&&e.target===this.el&&this.options.handleClose()}}}
    >
        <${ne} ${({options:e})=>({...de(e),className:ce(e).modal,tag:"div"})}>
            ${e=>e.renderContent()}
        </${ne}>
    </div>
`.extend({renderContent(){return this.options.renderChildren?this.options.renderChildren():this.partial`
            ${this.options.handleClose?this.partial`<${se} ${{...this.options}} />`:null}

            <${oe} ${{...this.options}} />
                ${this.options.renderContent}
            </${oe}>

            ${this.options.renderButtons?this.partial`
                        <${le} ${{...this.options}}>
                            ${this.options.renderButtons}
                        </${le}>
                    `:null}
        `}});he.Header=se,he.Content=oe,he.Footer=le;var ue=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
    </svg>
`,ge=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z"/>
    </svg>
`,pe=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"/>
    </svg>
`;const{classes:fe}=U({root:{display:"flex",justifyContent:"right",alignItems:"center",height:"60px","& ul":{padding:0}},icon:{width:"24px",height:"24px",cursor:"pointer",fill:"var(--rui-palette-neutral-main)","&:hover":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),me=E.create`
    <div class="${fe.root}">
        <ul>
            <li class="${fe.hiddenIfDark}">
                ${()=>G.mount({variant:"plain",renderChildren:()=>ge.mount({className:fe.icon}),onClick:()=>document.documentElement.setAttribute("data-color-scheme","dark")})}
            </li>
            <li class="${fe.hiddenIfLight}">
                ${()=>G.mount({variant:"plain",renderChildren:()=>pe.mount({className:fe.icon}),onClick:()=>document.documentElement.setAttribute("data-color-scheme","light")})}
            </li>
        </ul>
    </div>
`,{classes:be}=U({root:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"var(--rui-app-appBarHeight)",position:"fixed",top:0,left:0,right:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",boxShadow:"var(--rui-shadow-sm)","& nav":{maxWidth:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center","& ul":{display:"flex",justifyContent:"center",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"0 var(--rui-spacing-xs)"}}},"& nav$left":{flexGrow:1,justifyContent:"flex-start","& ul":{justifyContent:"flex-start"}},"& nav$lg":{display:"none"}},[z("sm")]:{"$root nav$lg":{display:"flex"},"$root li$sm":{display:"none"}},left:{},sm:{},lg:{},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-neutral-main)","a:hover &":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"},menuContent:{"& nav":{maxWidth:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center","& ul":{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"var(--rui-spacing-md)"}}}}}),ye=E.create`
    <div class="${be.menuContent}">
        ${({options:e,partial:t})=>t`
            <nav><ul>
                <li>
                    <${G} ${{href:"/api/",onClick:t=>{t.preventDefault(),e.handleNavigate("/api/"),e.handleOpen(!1)},label:"API",variant:"plain",size:"lg"}} />
                </li>
                <li>
                    <${G} ${{href:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",onClick:t=>{e.handleOpen(!1)},target:"_blank",label:"Playground",variant:"plain",size:"lg"}} />
                </li>
                <li>
                    <${G} ${{href:"https://github.com/8tentaculos/cssfun",onClick:t=>{e.handleOpen(!1)},target:"_blank",label:"GitHub",variant:"plain",size:"lg",renderLeftIcon:()=>J.mount({className:be.icon})}} />
                </li>
                <li>
                    <${G} ${{href:"https://www.npmjs.com/package/cssfun",onClick:t=>{e.handleOpen},target:"_blank",label:"npm",variant:"plain",size:"lg",renderLeftIcon:()=>Q.mount({className:be.icon})}} />
                </li>
            </ul></nav>
        `}
    </div>
`,ve=E.create`
    <div class="">
        ${({options:e})=>G.mount({renderChildren:()=>ue.mount({className:be.icon}),color:"primary",variant:"plain",size:"lg",onClick:()=>e.handleOpen(!0)})}
        ${({options:e})=>e.open?he.mount({handleClose:()=>e.handleOpen(!1),renderContent:e.renderContent,shadow:"lg"}):null}
    </div>
`,Se=E.create`
    <div class="${be.root}">
        <nav class="${be.left}">
            <ul>
                <li>
                    ${e=>G.mount({href:"/",onClick:t=>{t.preventDefault(),e.options.handleNavigate("/")},variant:"plain",renderChildren:()=>e.partial`
                            <span>
                                <img height="24" class="${be.hiddenIfLight}" alt="CSSFUN" src="/logo-dark.svg">
                                <img height="24" class="${be.hiddenIfDark}" alt="CSSFUN" src="/logo.svg">
                            </span>
                        `})}
                </li>
            </ul>
        </nav>
        <nav class="${be.lg}">
            <ul>
                <li>
                    ${({options:e})=>G.mount({href:"/api/",onClick:t=>{t.preventDefault(),e.handleNavigate("/api/")},label:"API",variant:"plain"})}
                </li>
                <li>
                    ${()=>G.mount({href:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",target:"_blank",label:"Playground",variant:"plain"})}
                </li>
                <li>
                    ${()=>G.mount({href:"https://github.com/8tentaculos/cssfun",target:"_blank",variant:"plain",renderChildren:()=>J.mount({className:be.icon})})}
                </li>
                <li>
                    ${()=>G.mount({href:"https://www.npmjs.com/package/cssfun",target:"_blank",variant:"plain",renderChildren:()=>Q.mount({className:be.icon})})}
                </li>
            </ul>
        </nav>
        <nav>
            <ul>
                <li>
                    ${()=>me.mount()}
                </li>
                <li class="${be.sm}">
                    ${e=>ve.mount({open:e.state.open,handleOpen:t=>{e.state.open=t},renderContent:()=>ye.mount({handleNavigate:e.options.handleNavigate,handleOpen:t=>{e.state.open=t}})})}
                </li>
            </ul>
        </nav>
    </div>
`.extend({preinitialize(){this.state=new u({open:!1})}}),xe=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:we}=U({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...xe("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...xe("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center","& section":{"& h5":{margin:"var(--rui-spacing-xs) 0",padding:"0"},margin:"var(--rui-spacing-md)"}},[z("md")]:{$root:{justifyContent:"space-between"},"$root section":{maxWidth:"400px"}}}),ke=E.create`
            <section class="${({options:e})=>(e=>[e.className||null,we.root].join(" "))(e)}">${e=>[ne.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="nearzeroruntime">Near-Zero Runtime ⚡</h5>
<p>Styles are generated when the module is initialized, rather than during component rendering. This eliminates runtime 
  style generation, improving performance and reducing complexity.</p>`}),ne.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="componentscopedstyles">Component-Scoped Styles ✨</h5>
<p><strong>CSSFUN</strong> scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic 
  and styling in the same file for easier management.</p>`}),ne.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="frameworkagnosticandlightweight">Framework-Agnostic and Lightweight 🌐</h5>
<p><strong>CSSFUN</strong> is compatible with any environment. At just <strong>1.7KB</strong>, it adds minimal overhead to your projects.</p>`}),ne.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="nobuildtoolsrequired">No Build Tools Required 🛠️</h5>
<p><strong>CSSFUN</strong> can be used directly in the browser, eliminating the need for complex build tools or configurations.</p>`}),ne.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="serversiderenderingssrsupport">Server-Side Rendering (SSR) Support 🚀</h5>
<p><strong>CSSFUN</strong> supports <a href="#serversiderenderingssr">server-side rendering</a> out of the box, optimizing initial load 
  times without duplicating styles.</p>`}),ne.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="builtinthememanagement">Built-in Theme Management 🎨</h5>
<p>With built-in <a href="#themes">theme support</a>, <strong>CSSFUN</strong> uses <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS variables</a> 
  to manage light, dark, and system color schemes. Themes update automatically based on user preferences, no re-renders needed.</p>`})]}</section>
        `,$e=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Ee}=U({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...$e("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...$e("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}}}}),Ce=E.create`
            <section class="${({options:e})=>(e=>[e.className||null,Ee.root].join(" "))(e)}"><h2 id="gettingstarted">Getting Started</h2>
<h3 id="usingnpm">Using npm</h3>
<pre><code class="bash language-bash">\$ npm install cssfun
</code></pre>
<pre><code class="javascript language-javascript">import \{ css \} from 'cssfun';
</code></pre>
<h3 id="usingesmodules">Using ES modules</h3>
<pre><code class="javascript language-javascript">import \{ css \} from 'https://esm.run/cssfun';
</code></pre>
<h3 id="usingscripttag">Using <code>&lt;script&gt;</code> tag</h3>
<pre><code class="html language-html">&lt;script src="https://cdn.jsdelivr.net/npm/cssfun"&gt;&lt;/script&gt;
</code></pre>
<pre><code class="javascript language-javascript">const \{ css \} = CSSFUN;
</code></pre>
<h3 id="createyourstyles">Create your styles</h3>
<pre><code class="javascript language-javascript">const \{ classes \} = css(\{
    button : \{
        backgroundColor : 'blue',
        color : 'white',
        padding : '10px',
        borderRadius : '5px'
    \}
\});
</code></pre>
<h3 id="applythestylestoyourcomponents">Apply the styles to your components:</h3>
<pre><code class="javascript language-javascript">const Button = () =&gt; &lt;button className=\{classes.button\}&gt;Click me&lt;/button&gt;;
</code></pre>
<h2 id="renderers">Renderers</h2>
<p>Renderers are functions that transform style objects into CSS strings.<br />
These are the built-in renderers transformations:</p>
<h4 id="camelizedkeyswillbetransformedtodashedkeys">Camelized keys will be transformed to dashed keys</h4>
<pre><code class="javascript language-javascript">css(\{
    root : \{
        backgroundColor : 'black'
    \}
\}).toString();
</code></pre>
<h5 id="rendersto">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-uwitok"&gt;
    .fun-uwitok-root \{
        background-color: black;
    \}
&lt;/style&gt;
</code></pre>
<h4 id="nestedselectorswillbeexpanded">Nested selectors will be expanded</h4>
<ul>
<li><p><strong>Use <code>&amp;</code> to reference the selector of the parent rule</strong></p>
<pre><code class="javascript language-javascript">css(\{
    button : \{
        backgroundColor : 'white',
        '&amp;:hover' : \{
            backgroundColor : 'black'
        \},
        '&amp; span' : \{
            color : 'blue'
        \}
    \}
\}).toString();
</code></pre>
<h5 id="rendersto-1">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-1pxyvx7"&gt;
    .fun-1pxyvx7-button \{
        background-color: white;
    \}
    .fun-1pxyvx7-button:hover \{
        background-color: black;
    \}
    .fun-1pxyvx7-button span \{
        color: blue;
    \}
&lt;/style&gt;
</code></pre></li>
<li><p><strong>Deep nesting</strong></p>
<pre><code class="javascript language-javascript">css(\{
    button : \{
        backgroundColor : 'white',
        '&amp;:active' : \{
            backgroundColor : 'black',
            '&amp;:hover' : \{
                backgroundColor : 'blue'
            \}
        \}
    \}
\}).toString();
</code></pre>
<h5 id="rendersto-2">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-169vukw"&gt;
    .fun-169vukw-button \{
        background-color: white;
    \}
    .fun-169vukw-button:active \{
        background-color: black;
    \}
    .fun-169vukw-button:active:hover \{
        background-color: blue;
    \}
&lt;/style&gt;
</code></pre></li>
</ul>
<h4 id="classreferenceswillbereplacedbythegeneratedclassname">Class references will be replaced by the generated class name</h4>
<ul>
<li><p><strong>Use <code>\$</code> to reference a local class within the same <code>StyleSheet</code> instance</strong></p>
<pre><code class="javascript language-javascript">css(\{
    button : \{
        backgroundColor : 'white'
    \},
    '\$button:hover' : \{
            backgroundColor : 'black'
        \},
    '\$button span' : \{
        color : 'blue'
    \}
\}).toString();
</code></pre>
<h5 id="rendersto-3">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-2xfpy0"&gt;
    .fun-2xfpy0-button \{
        background-color: white;
    \}
    .fun-2xfpy0-button:hover \{
        background-color: black;
    \}
    .fun-2xfpy0-button span \{
        color: blue;
    \}
&lt;/style&gt;
</code></pre></li>
</ul>
<h4 id="globalselectorswillberenderedasglobalstyles">Global selectors will be rendered as global styles</h4>
<ul>
<li><p><strong>Global block</strong></p>
<pre><code class="javascript language-javascript">css(\{
    '@global' : \{
        body : \{
            backgroundColor : 'black'
        \}
    \}
\}).toString();
</code></pre>
<h5 id="rendersto-4">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-ml03n3"&gt;
    body \{
        background-color: black;
    \}
&lt;/style&gt;
</code></pre></li>
<li><p><strong>Nested global block</strong></p>
<pre><code class="javascript language-javascript">css(\{
    root : \{
        '@global' : \{
            a : \{
                color : 'black'
            \}
        \}
    \}
\}).toString();
</code></pre>
<h5 id="rendersto-5">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-1eia2eq"&gt;
    .fun-1eia2eq-root a \{
        color: black;
    \}
&lt;/style&gt;
</code></pre></li>
<li><p><strong>Global prefix</strong></p>
<pre><code class="javascript language-javascript">css(\{
    '@global body' : \{
        backgroundColor : 'black'
    \}
\}).toString();
</code></pre>
<h5 id="rendersto-6">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-1p1av20"&gt;
    body \{
        background-color: black;
    \}
&lt;/style&gt;
</code></pre></li>
<li><p><strong>Nested global prefix</strong></p>
<pre><code class="javascript language-javascript">css(\{
    root : \{
        '@global a' : \{
            color : 'black'
        \}
    \}
\}).toString();
</code></pre>
<h5 id="rendersto-7">Renders to:</h5>
<pre><code class="html language-html">&lt;style data-fun-uid="fun-xvd6jj"&gt;
    .fun-xvd6jj-root a \{
        color: black;
    \}
&lt;/style&gt;
</code></pre></li>
</ul>
<p>When composed, the first renderer receives the styles object, and the final one outputs the 
resulting CSS string.  </p>
<h3 id="customrenderers">Custom Renderers</h3>
<p>You can customize the renderers by setting the <code>renderers</code> array on the <a href="/api/#stylesheet"><code>StyleSheet</code></a> instance. 
If passed via <a href="/api/#new-stylesheetstyles-options"><code>options.renderers</code></a>, they will be automatically added to the instance.  </p>
<p>Elements in the <code>renderers</code> array can be either functions or strings that reference methods of the <a href="/api/#stylesheet"><code>StyleSheet</code></a> instance. These 
methods will be bound to the instance before they are invoked.</p>
<p>By default, <a href="/api/#stylesheet"><code>StyleSheet</code></a> are rendered using the built-in renderers: <code>['parseStyles', 'renderStyles']</code>.</p>
<h2 id="themes">Themes</h2>
<p>A theme is a <a href="/api/#stylesheet"><code>StyleSheet</code></a> that provides access to CSS variables
for consistent styling across your application. It supports light, dark, and system color schemes, 
allowing your components to automatically adapt to changes in the user's system preferences.</p>
<p>The <a href="/api/#createtheme"><code>createTheme</code></a> function accepts a themes object <code>\{ light, dark \}</code>, and an options object, and 
returns a theme <a href="/api/#stylesheet"><code>StyleSheet</code></a>.</p>
<h3 id="creatingatheme">Creating a Theme</h3>
<p>Create theme StyleSheet.</p>
<pre><code class="javascript language-javascript">// Create theme
const theme = createTheme(\{
    light : \{
        color : 'black',
        backgroundColor : 'white',
    \},
    dark : \{
        color : 'white',
        backgroundColor : 'black',
    \},
\});
</code></pre>
<h4 id="applyingthethemeclass">Applying the Theme Class</h4>
<p>The generated theme includes a <code>root</code> class, which exposes all the theme's CSS variables to any element that uses 
this class and its descendants. You can apply this class to the <code>body</code> element to style the entire application, 
or to the root element of a specific component to apply the theme to just part of your UI.</p>
<pre><code class="javascript language-javascript">// Add theme class to the body
document.body.classList.add(theme.classes.root);
</code></pre>
<h4 id="usingthemevariablesinstyles">Using Theme Variables in Styles</h4>
<p>Your theme object is automatically converted into CSS variables. For instance:</p>
<pre><code class="javascript language-javascript">\{ backgroundLevel1 : 'black' \}
</code></pre>
<p>This will be converted into the CSS variable <code>--fun-backgroundLevel1</code>.  </p>
<p>Similarly, more complex theme structures like:  </p>
<pre><code class="javascript language-javascript">\{
    palette : \{
        common : \{ 
            black : '#000'
        \}
    \}
\}
</code></pre>
<p>will be converted into <code>--fun-palette-common-black</code>.  </p>
<p>Use these variables in your component styles, even before the theme is applied. 
Your components will automatically update when the theme or system color scheme changes.</p>
<pre><code class="javascript language-javascript">const \{ classes \} = css(\{
    button : \{
        color : 'var(--fun-color)',
        backgroundColor : 'var(--fun-backgroundColor)',
    \},
\});

const Button = (\{ label \}) =&gt; &lt;button className=\{classes.button\}&gt;\{label\}&lt;/button&gt;;
</code></pre>
<h2 id="serversiderenderingssr">Server-Side Rendering (SSR)</h2>
<p>Easily add your styles to the server-rendered HTML by embedding the StyleSheets as a 
string within the <code>&lt;head&gt;</code> of your page.</p>
<pre><code class="javascript language-javascript">// Creating a theme
const theme = createTheme(themes);

// Express route that renders the app and returns HTML to the browser
app.get('*', (req, res) =&gt; \{
    // Render the app as an HTML string
    const html = renderToString(&lt;App /&gt;);

    // Get all StyleSheets styles as a string of &lt;style&gt; elements
    const styles = StyleSheet.toString();

    // Get the root class name from the theme
    const cls = theme.classes.root;

    // Create the full HTML page template
    const template = \`
        &lt;!DOCTYPE html&gt;
        &lt;html lang="en"&gt;
            &lt;head&gt;
                &lt;meta charset="UTF-8"&gt;
                &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
                &lt;title&gt;Waving Cat&lt;/title&gt;
                \$\{styles\}
            &lt;/head&gt;
            &lt;body class="\$\{cls\}"&gt;
                &lt;div id="root"&gt;\$\{html\}&lt;/div&gt;
                &lt;script src="/bundle.js"&gt;&lt;/script&gt;
            &lt;/body&gt;
        &lt;/html&gt;
    \`;

    // Send the complete HTML response
    res.send(template);
\});
</code></pre>
<p>When the app is hydrated on the client side, the styles are preserved and won’t be recreated.</p>
<h2 id="apidocumentation">API Documentation</h2>
<p>Complete API documentation can be found <a href="/api/">here</a>.</p>
<h2 id="examples">Examples</h2>
<p>The <code>examples</code> folder contains various sample projects demonstrating how to use <strong>CSSFUN</strong> in 
different environments and frameworks. Each example is a standalone project that you can run locally 
to see <strong>CSSFUN</strong> in action.</p>
<h3 id="availableexamples">Available Examples</h3>
<ul>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/react">React Example</a></strong>: A basic React application demonstrating the use of <strong>CSSFUN</strong> for styling React components. <a target="_blank" href="https://plnkr.co/plunk/hLIWLlAHGsE2ojO1">Try it</a>.</li>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/rasti">Rasti Example</a></strong>: A simple Rasti application illustrating how to apply <strong>CSSFUN</strong> to style Rasti components. <a target="_blank" href="https://plnkr.co/plunk/ivxPfUB5szwcuncf">Try it</a>.</li>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/vanilla">Vanilla JS Example</a></strong>: A straightforward JavaScript example showing how to use <strong>CSSFUN</strong> for styling HTML components. <a target="_blank" href="https://plnkr.co/plunk/4ypn83Ru5Z6uwZew">Try it</a>.</li>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/ssr">Rasti with Server-Side Rendering (SSR) Example</a></strong>: A Rasti application with server-side rendering using Express, highlighting how to use <strong>CSSFUN</strong> for styling in an SSR environment.</li>
</ul></section>
        `,_e=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Le}=U({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",..._e("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",..._e("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},marginTop:"var(--rui-app-appBarHeight)"}}),je=E.create`
            <section class="${({options:e})=>(e=>[e.className||null,Le.root].join(" "))(e)}"><h2 id="classes">Classes</h2>
<dl>
<dt><a href="#stylesheet">StyleSheet</a></dt>
<dd></dd>
</dl>
<h2 id="functions">Functions</h2>
<dl>
<dt><a href="#createtheme">createTheme(themes, options)</a> ⇒ <code><a href="#stylesheet">StyleSheet</a></code></dt>
<dd><p>The <code>createTheme</code> function creates a theme StyleSheet instance.
It supports light, dark, system, and normal color schemes.</p>
</dd>
<dt><a href="#css">css(styles)</a> ⇒ <code><a href="#stylesheet">StyleSheet</a></code></dt>
<dd><p>Creates a new StyleSheet instance and attaches it to the DOM.</p>
</dd>
</dl>
<p><a name="stylesheet" id="stylesheet" class="anchor"></a></p>
<h2 id="stylesheet">StyleSheet</h2>
<p><strong>Kind</strong>: global class<br />
<strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>classes</td>
<td><code>Object</code></td>
<td>The classes object. An object with keys as your original class names and values as the generated unique class names. It will be generated by the  instance. Use it to get the class name to use in your components.</td>
</tr>
<tr>
<td>styles</td>
<td><code>Object</code></td>
<td>The styles object. The original styles object. See <code>styles</code>.</td>
</tr>
<tr>
<td>uid</td>
<td><code>String</code></td>
<td>The unique identifier for the stylesheet. It will be generated by <code>this.generateUid</code>.</td>
</tr>
<tr>
<td>attributes</td>
<td><code>Object</code></td>
<td>See <code>options.attributes</code>.</td>
</tr>
<tr>
<td>renderers</td>
<td><code>Array</code></td>
<td>See <code>options.renderers</code>.</td>
</tr>
<tr>
<td>el</td>
<td><code>HTMLElement</code></td>
<td>The style element. A reference to the style element in the DOM.  It will be created when the instance is attached.</td>
</tr>
</tbody>
</table>
<ul>
<li><a href="#stylesheet">StyleSheet</a><ul>
<li><a href="#new_stylesheet_new">new StyleSheet(styles, options)</a></li>
<li><em>instance</em><ul>
<li><a href="#stylesheet__generateuid">.generateUid()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__generateclassname">.generateClassName(className)</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__render">.render()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__tostring">.toString()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__attach">.attach()</a> ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></li>
<li><a href="#stylesheet__destroy">.destroy()</a> ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></li></ul></li>
<li><em>static</em><ul>
<li><a href="#stylesheet_prefix">.prefix</a></li>
<li><a href="#stylesheet_indent">.indent</a></li>
<li><a href="#stylesheet_registry">.registry</a></li>
<li><a href="#stylesheet_debug">.debug</a></li>
<li><a href="#stylesheet_tostring">.toString()</a> ⇒ <code>string</code></li>
<li><a href="#stylesheet_destroy">.destroy()</a></li></ul></li></ul></li>
</ul>
<p><a name="new_stylesheet_new" id="new_stylesheet_new" class="anchor"></a></p>
<h3 id="newstylesheetstylesoptions">new StyleSheet(styles, options)</h3>
<p>The StyleSheet class receives at the constructor a styles object and an options
object and generate a css StyleSheet.<br />
The StyleSheet can be attached to the DOM, destroyed or rendered as string for 
server-side rendering.</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>styles</td>
<td><code>Object</code></td>
<td>The styles object. An object with keys as selectors and values as  style objects. This object will pass trough the renderers and generate the css string. It will be added to the instance as <code>this.styles</code>.</td>
</tr>
<tr>
<td>options</td>
<td><code>Object</code></td>
<td>The options object.   <code>options.uidPrefix</code>, <code>options.generateClassName</code>, <code>options.generateId</code>,  <code>options.attributes</code> and <code>options.renderers</code> will be added to the instance.</td>
</tr>
<tr>
<td>options.prefix</td>
<td><code>String</code></td>
<td>The prefix for <code>uid</code> and data attribute.</td>
</tr>
<tr>
<td>options.generateUid</td>
<td><code>function</code></td>
<td>The function to generate the <code>StyleSheet</code> unique identifier.</td>
</tr>
<tr>
<td>options.generateClassName</td>
<td><code>function</code></td>
<td>The function to generate class names.  This class name will be used to generate the unique class names for scoped styles.</td>
</tr>
<tr>
<td>options.attributes</td>
<td><code>Object</code></td>
<td>The attributes object. This attributes will be added  to the <code>&lt;style&gt;</code> element.</td>
</tr>
<tr>
<td>options.renderers</td>
<td><code>Array</code></td>
<td>The array of renderers.  Renderers are functions that transform style objects into CSS strings.     When composed, the first renderer receives the styles object, and the final one outputs the  resulting CSS string.   Elements in the <code>renderers</code> array can be either functions or strings that reference methods of the  StyleSheet instance. These methods will be bound to the instance before they are invoked. By default, <code>StyleSheet</code> are rendered using the built-in renderers:  <code>['parseStyles', 'renderStyles']</code>.</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong>  </p>
<pre><code class="js language-js">// Create a new StyleSheet instance with a styles object.
const instance = new StyleSheet(\{
    root : \{
        color : 'black'
    \}
\});
// Attach the StyleSheet instance to the DOM.
instance.attach();
// Get classes object from the instance.
const \{ classes \} = instance;
// Use the classes object to get the class name and use it in your component.
function Header = () =&gt; &lt;h1 className=\{classes.root\}&gt;Hello World&lt;/h1&gt;;
</code></pre>
<p><a name="stylesheet__generateuid" id="stylesheet__generateuid" class="anchor"></a></p>
<h3 id="stylesheetgenerateuidc20c">styleSheet.generateUid() ⇒ <code>String</code></h3>
<p>Generate a stable unique identifier.
May be overridden by <code>options.generateUid</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The unique identifier.<br />
<a name="stylesheet__generateclassname" id="stylesheet__generateclassname" class="anchor"></a></p>
<h3 id="stylesheetgenerateclassnameclassnamec23c">styleSheet.generateClassName(className) ⇒ <code>String</code></h3>
<p>Generate a unique class name.
Transform local selectors that are classes to unique class names
to be used as class names in the styles object.
May be overridden by <code>options.generateClassName</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The unique class name.  </p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>className</td>
<td><code>String</code></td>
<td>The class name.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet__render" id="stylesheet__render" class="anchor"></a></p>
<h3 id="stylesheetrenderc27c">styleSheet.render() ⇒ <code>String</code></h3>
<p>Apply the renderers to the styles object.
It will return a string ready to be added to the style element.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The styles object as a string.<br />
<a name="stylesheet__tostring" id="stylesheet__tostring" class="anchor"></a></p>
<h3 id="stylesheettostringc30c">styleSheet.toString() ⇒ <code>String</code></h3>
<p>Render the StyleSheet as a style element string.
Used for server-side rendering.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The instance as a string.<br />
<a name="stylesheet__attach" id="stylesheet__attach" class="anchor"></a></p>
<h3 id="stylesheetattachc33cstylesheet">styleSheet.attach() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
<p>Add the instance to the registry and if we are in the browser, 
attach it to the DOM.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The instance.<br />
<a name="stylesheet__destroy" id="stylesheet__destroy" class="anchor"></a></p>
<h3 id="stylesheetdestroyc36cstylesheet">styleSheet.destroy() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
<p>Destroy the instance and remove it from the registry and 
from the DOM, if it's present.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The instance.<br />
<a name="stylesheet_prefix" id="stylesheet_prefix" class="anchor"></a></p>
<h3 id="stylesheetprefix">StyleSheet.prefix</h3>
<p><strong>Kind</strong>: static property of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Default</strong>: <code>fun</code><br />
<strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>prefix</td>
<td><code>String</code></td>
<td>The class prefix. Used to generate unique class names.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet_indent" id="stylesheet_indent" class="anchor"></a></p>
<h3 id="stylesheetindent">StyleSheet.indent</h3>
<p><strong>Kind</strong>: static property of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Default</strong>: <code>'    '</code><br />
<strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>indent</td>
<td><code>String</code></td>
<td>The indent string. Used to format text when debug is enabled.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet_registry" id="stylesheet_registry" class="anchor"></a></p>
<h3 id="stylesheetregistry">StyleSheet.registry</h3>
<p><strong>Kind</strong>: static property of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>registry</td>
<td><code>Array</code></td>
<td>The registry array. StyleSheet instances  will be added to this array.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet_debug" id="stylesheet_debug" class="anchor"></a></p>
<h3 id="stylesheetdebug">StyleSheet.debug</h3>
<p><strong>Kind</strong>: static property of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Default</strong>: <code>false</code><br />
<strong>Properties</strong></p>
<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>debug</td>
<td><code>Boolean</code></td>
<td>The debug flag. If true, the styles will be formatted with indentation and new lines.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet_tostring" id="stylesheet_tostring" class="anchor"></a></p>
<h3 id="stylesheettostringc50c">StyleSheet.toString() ⇒ <code>string</code></h3>
<p>Render all instances in the registry as a string.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - All instances in the registry as a string.<br />
<a name="stylesheet_destroy" id="stylesheet_destroy" class="anchor"></a></p>
<h3 id="stylesheetdestroy">StyleSheet.destroy()</h3>
<p>Destroy all instances in the registry and remove them from 
it and from the DOM.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<a name="createtheme" id="createtheme" class="anchor"></a></p>
<h2 id="createthemethemesoptionsc54cstylesheet">createTheme(themes, options) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
<p>The <code>createTheme</code> function creates a theme StyleSheet instance.
It supports light, dark, system, and normal color schemes.</p>
<p><strong>Kind</strong>: global function<br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The theme StyleSheet instance. Use <code>classes.root</code> to get the theme class name. 
Apply it to the element you want to theme. CSS variables will be available for all its descendants.  </p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>themes</td>
<td><code>Object</code></td>
<td>An object containing <code>light</code>, <code>dark</code>, and optionally <code>normal</code> themes: <code>\{ light, dark \}</code>.  Each theme object will be converted to CSS variables available under the <code>root</code> class  of the theme StyleSheet instance.   For example: <code>\{ backgroundLevel1 : 'black' \}</code> will be converted to <code>--fun-backgroundLevel1</code>.   You can add the <code>root</code> class to the root element of your component to theme a single component,  or to the <code>body</code> element to theme the entire page.</td>
</tr>
<tr>
<td>options</td>
<td><code>Object</code></td>
<td>An options object.</td>
</tr>
<tr>
<td>options.colorScheme</td>
<td><code>String</code></td>
<td>The color scheme. Possible values are <code>light</code>, <code>dark</code>, <code>system</code>, and <code>normal</code>.  If <code>light</code> or <code>dark</code> is set, the theme will be fixed to that color scheme, and only the necessary CSS variables  will be generated. The CSS color-scheme property will be set to that value. If <code>system</code> is set, the theme will be generated for both light and dark color schemes,  and by default, it will follow the system color scheme. The CSS color-scheme property will be set to <code>light</code> or <code>dark</code> accordingly. To override the system color scheme, set the <code>data-color-scheme</code> attribute to <code>light</code>  or <code>dark</code> on a parent element. If <code>normal</code> is set, the <code>normal</code> theme will be used, and the CSS color-scheme property  will be set to <code>normal</code>.</td>
</tr>
<tr>
<td>options.cssVarsPrefix</td>
<td><code>String</code></td>
<td>The CSS variables prefix. Default is <code>fun</code>.</td>
</tr>
<tr>
<td>options.createStyleSheet</td>
<td><code>function</code></td>
<td>A function used to create a new StyleSheet instance. By default, it uses the <code>css</code> function.</td>
</tr>
<tr>
<td>options.styleSheetOptions</td>
<td><code>Object</code></td>
<td>The options object to be used when creating the StyleSheet instance. Default is <code>system</code>.</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong>  </p>
<pre><code class="js language-js">// Create a default theme and apply it to the entire page.
const theme = createTheme(\{
    light : \{
        color : 'black',
        backgroundColor : 'white'
    \},
    dark : \{
        color : 'white',
        backgroundColor : 'black'
    \}
\});
// Add the \`root\` class (the theme class) to the body element.
// This will apply the theme to the entire page.
document.body.classList.add(theme.classes.root);
// Add some styles using the theme CSS variables.
const \{ classes \} = css(\{
    button : \{
        color : 'var(--fun-color)',
        backgroundColor : 'var(--fun-backgroundColor)'
    \}
\});
// Add the \`button\` class to a button component.
// You can use the variables in your styles even before the theme is applied or created.
// Your component will update when the theme is applied.
// If the system color scheme changes, the button will update automatically.
const Button = (\{ label \}) =&gt; &lt;button className=\{classes.button\}&gt;\{label\}&lt;/button&gt;;
</code></pre>
<p><a name="css" id="css" class="anchor"></a></p>
<h2 id="cssstylesc62cstylesheet">css(styles) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
<p>Creates a new StyleSheet instance and attaches it to the DOM.</p>
<p><strong>Kind</strong>: global function<br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The StyleSheet instance.  </p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>styles</td>
<td><code>Object</code></td>
<td>The CSS rules.</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong>  </p>
<pre><code class="js language-js">// Create some styles for a link component.
const \{ classes \} = css(\{
    link : \{
        color : 'blue',
        '&amp;:hover' : \{
           textDecoration : 'underline'
        \}
    \}
\});
// Create a link component. Add the \`link\` class to it.
const Link = (\{ label, href \}) =&gt; &lt;a className=\{classes.link\} href=\{href\}&gt;\{label\}&lt;/a&gt;;
</code></pre></section>
        `,{classes:Ne}=U({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-xl) 0 var(--rui-spacing-xxxxl) 0",borderTop:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)","@global":{a:{color:"var(--rui-palette-neutral-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-neutral-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-neutral-dark)"}}}},text:{color:"var(--rui-palette-neutral-foregroundLevel3)"}}),Re=E.create`
    <footer class="${Ne.root}">
        ${e=>Y.mount({level:"titleMd",className:Ne.text,renderChildren:()=>e.partial`Released under the <a href="https://github.com/8tentaculos/cssfun/blob/master/LICENSE" target="_blank">MIT License</a>`})}
        ${e=>Y.mount({level:"titleSm",className:Ne.text,renderChildren:()=>e.partial`Copyright © ${(()=>{const e=(new Date).getFullYear();return 2024===e?e:`2024-${e}`})()} <a href="https://github.com/8tentaculos" target="_blank">8tentaculos</a>`})}
    </footer>
`,{classes:Ae}=U({"@global":{body:{margin:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)"},"a.anchor, h2":{scrollMarginTop:"var(--rui-app-appBarHeight)"}},root:{}}),Te=(e="")=>{const t=e.match(/\/([^/]+)\//),r=t?t[1]:e;return["api"].includes(r)?r:""};E.create`
    <div class="${Ae.root}">
        ${e=>Se.mount({handleNavigate:e.navigate.bind(e)})}

        ${({state:e})=>"api"===e.route?je.mount():[ee.mount(),ke.mount(),Ce.mount()]}

        ${()=>Re.mount()}
    </div>
`.extend({preinitialize(e={}){this.state=new u({route:Te(e.route)}),"undefined"!=typeof window&&(window.history.replaceState({route:this.state.route},""),window.addEventListener("popstate",(e=>{e.state&&(this.state.route=Te(e.state.route))})))},navigate(e){this.state.route=Te(e),window.history.pushState({route:this.state.route},"",this.state.route?`/${this.state.route}/`:"/"),document.title=this.getTitle(),window.scrollTo(0,0)},getTitle(){return"CSSFUN"+("api"===this.state.route?" - API Documentation":"")}}).mount({route:window.location.pathname,onRender:t=>{e.highlightAll()}},document.getElementById("root"),!0)})()})();