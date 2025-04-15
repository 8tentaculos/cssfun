(()=>{var e={416:e=>{function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((r=>{const n=e[r],a=typeof n;"object"!==a&&"function"!==a||Object.isFrozen(n)||t(n)})),e}class r{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function a(e,...t){const r=Object.create(null);for(const t in e)r[t]=e[t];return t.forEach((function(e){for(const t in e)r[t]=e[t]})),r}const o=e=>!!e.scope;class i{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=n(e)}openNode(e){if(!o(e))return;const t=((e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const r=e.split(".");return[`${t}${r.shift()}`,...r.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")}return`${t}${e}`})(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){o(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const s=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class l{constructor(){this.rootNode=s(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t=s({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{l._collapse(e)})))}}class c extends l{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){const r=e.root;t&&(r.scope=`language:${t}`),this.add(r)}toHTML(){return new i(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function d(e){return e?"string"==typeof e?e:e.source:null}function h(e){return p("(?=",e,")")}function u(e){return p("(?:",e,")*")}function g(e){return p("(?:",e,")?")}function p(...e){return e.map((e=>d(e))).join("")}function f(...e){const t=function(e){const t=e[e.length-1];return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>d(e))).join("|")+")"}function m(e){return new RegExp(e.toString()+"|").exec("").length-1}const b=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function y(e,{joinWith:t}){let r=0;return e.map((e=>{r+=1;const t=r;let n=d(e),a="";for(;n.length>0;){const e=b.exec(n);if(!e){a+=n;break}a+=n.substring(0,e.index),n=n.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?a+="\\"+String(Number(e[1])+t):(a+=e[0],"("===e[0]&&r++)}return a})).map((e=>`(${e})`)).join(t)}const v="[a-zA-Z]\\w*",S="[a-zA-Z_]\\w*",x="\\b\\d+(\\.\\d+)?",w="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",k="\\b(0b[01]+)",$={begin:"\\\\[\\s\\S]",relevance:0},E={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[$]},C={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[$]},_=function(e,t,r={}){const n=a({scope:"comment",begin:e,end:t,contains:[]},r);n.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const o=f("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return n.contains.push({begin:p(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),n},L=_("//","$"),j=_("/\\*","\\*/"),N=_("#","$"),A={scope:"number",begin:x,relevance:0},R={scope:"number",begin:w,relevance:0},T={scope:"number",begin:k,relevance:0},O={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[$,{begin:/\[/,end:/\]/,relevance:0,contains:[$]}]},M={scope:"title",begin:v,relevance:0},I={scope:"title",begin:S,relevance:0},D={begin:"\\.\\s*"+S,relevance:0};var z=Object.freeze({__proto__:null,APOS_STRING_MODE:E,BACKSLASH_ESCAPE:$,BINARY_NUMBER_MODE:T,BINARY_NUMBER_RE:k,COMMENT:_,C_BLOCK_COMMENT_MODE:j,C_LINE_COMMENT_MODE:L,C_NUMBER_MODE:R,C_NUMBER_RE:w,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},HASH_COMMENT_MODE:N,IDENT_RE:v,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:D,NUMBER_MODE:A,NUMBER_RE:x,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:C,REGEXP_MODE:O,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=p(t,/.*\b/,e.binary,/\b.*/)),a({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},TITLE_MODE:M,UNDERSCORE_IDENT_RE:S,UNDERSCORE_TITLE_MODE:I});function H(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function B(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function W(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=H,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function F(e,t){Array.isArray(e.illegal)&&(e.illegal=f(...e.illegal))}function P(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function U(e,t){void 0===e.relevance&&(e.relevance=1)}const Z=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const r=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]})),e.keywords=r.keywords,e.begin=p(r.beforeMatch,h(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},G=["of","and","for","in","not","or","if","then","parent","list","value"];function K(e,t,r="keyword"){const n=Object.create(null);return"string"==typeof e?a(r,e.split(" ")):Array.isArray(e)?a(r,e):Object.keys(e).forEach((function(r){Object.assign(n,K(e[r],t,r))})),n;function a(e,r){t&&(r=r.map((e=>e.toLowerCase()))),r.forEach((function(t){const r=t.split("|");n[r[0]]=[e,q(r[0],r[1])]}))}}function q(e,t){return t?Number(t):function(e){return G.includes(e.toLowerCase())}(e)?0:1}const X={},Y=e=>{console.error(e)},J=(e,...t)=>{console.log(`WARN: ${e}`,...t)},V=(e,t)=>{X[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),X[`${e}/${t}`]=!0)},Q=new Error;function ee(e,t,{key:r}){let n=0;const a=e[r],o={},i={};for(let e=1;e<=t.length;e++)i[e+n]=a[e],o[e+n]=!0,n+=m(t[e-1]);e[r]=i,e[r]._emit=o,e[r]._multi=!0}function te(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Y("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Q;if("object"!=typeof e.beginScope||null===e.beginScope)throw Y("beginScope must be object"),Q;ee(e,e.begin,{key:"beginScope"}),e.begin=y(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Y("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Q;if("object"!=typeof e.endScope||null===e.endScope)throw Y("endScope must be object"),Q;ee(e,e.end,{key:"endScope"}),e.end=y(e.end,{joinWith:""})}}(e)}function re(e){function t(t,r){return new RegExp(d(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=m(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=t(y(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const r=t.findIndex(((e,t)=>t>0&&void 0!==e)),n=this.matchIndexes[r];return t.splice(0,r),Object.assign(t,n)}}class n{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new r;return this.rules.slice(e).forEach((([e,r])=>t.addRule(e,r))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let r=t.exec(e);if(this.resumingScanAtSamePosition())if(r&&r.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,r=t.exec(e)}return r&&(this.regexIndex+=r.position+1,this.regexIndex===this.count&&this.considerAll()),r}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),function r(o,i){const s=o;if(o.isCompiled)return s;[B,P,te,Z].forEach((e=>e(o,i))),e.compilerExtensions.forEach((e=>e(o,i))),o.__beforeBegin=null,[W,F,U].forEach((e=>e(o,i))),o.isCompiled=!0;let l=null;return"object"==typeof o.keywords&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),l=o.keywords.$pattern,delete o.keywords.$pattern),l=l||/\w+/,o.keywords&&(o.keywords=K(o.keywords,e.case_insensitive)),s.keywordPatternRe=t(l,!0),i&&(o.begin||(o.begin=/\B|\b/),s.beginRe=t(s.begin),o.end||o.endsWithParent||(o.end=/\B|\b/),o.end&&(s.endRe=t(s.end)),s.terminatorEnd=d(s.end)||"",o.endsWithParent&&i.terminatorEnd&&(s.terminatorEnd+=(o.end?"|":"")+i.terminatorEnd)),o.illegal&&(s.illegalRe=t(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return a(e,{variants:null},t)}))),e.cachedVariants?e.cachedVariants:ne(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}("self"===e?o:e)}))),o.contains.forEach((function(e){r(e,s)})),o.starts&&r(o.starts,i),s.matcher=function(e){const t=new n;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(s),s}(e)}function ne(e){return!!e&&(e.endsWithParent||ne(e.starts))}class ae extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}const oe=n,ie=a,se=Symbol("nomatch"),le=function(e){const n=Object.create(null),a=Object.create(null),o=[];let i=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",l={disableAutodetect:!0,name:"Plain text",contains:[]};let d={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:c};function m(e){return d.noHighlightRe.test(e)}function b(e,t,r){let n="",a="";"object"==typeof t?(n=e,r=t.ignoreIllegals,a=t.language):(V("10.7.0","highlight(lang, code, ...args) has been deprecated."),V("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),a=e,n=t),void 0===r&&(r=!0);const o={code:n,language:a};C("before:highlight",o);const i=o.result?o.result:y(o.language,o.code,r);return i.code=o.code,C("after:highlight",i),i}function y(e,t,a,o){const l=Object.create(null);function c(){if(!C.keywords)return void L.addText(j);let e=0;C.keywordPatternRe.lastIndex=0;let t=C.keywordPatternRe.exec(j),r="";for(;t;){r+=j.substring(e,t.index);const a=w.case_insensitive?t[0].toLowerCase():t[0],o=(n=a,C.keywords[n]);if(o){const[e,n]=o;if(L.addText(r),r="",l[a]=(l[a]||0)+1,l[a]<=7&&(N+=n),e.startsWith("_"))r+=t[0];else{const r=w.classNameAliases[e]||e;u(t[0],r)}}else r+=t[0];e=C.keywordPatternRe.lastIndex,t=C.keywordPatternRe.exec(j)}var n;r+=j.substring(e),L.addText(r)}function h(){null!=C.subLanguage?function(){if(""===j)return;let e=null;if("string"==typeof C.subLanguage){if(!n[C.subLanguage])return void L.addText(j);e=y(C.subLanguage,j,!0,_[C.subLanguage]),_[C.subLanguage]=e._top}else e=v(j,C.subLanguage.length?C.subLanguage:null);C.relevance>0&&(N+=e.relevance),L.__addSublanguage(e._emitter,e.language)}():c(),j=""}function u(e,t){""!==e&&(L.startScope(t),L.addText(e),L.endScope())}function g(e,t){let r=1;const n=t.length-1;for(;r<=n;){if(!e._emit[r]){r++;continue}const n=w.classNameAliases[e[r]]||e[r],a=t[r];n?u(a,n):(j=a,c(),j=""),r++}}function p(e,t){return e.scope&&"string"==typeof e.scope&&L.openNode(w.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(u(j,w.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),j=""):e.beginScope._multi&&(g(e.beginScope,t),j="")),C=Object.create(e,{parent:{value:C}}),C}function f(e,t,n){let a=function(e,t){const r=e&&e.exec(t);return r&&0===r.index}(e.endRe,n);if(a){if(e["on:end"]){const n=new r(e);e["on:end"](t,n),n.isMatchIgnored&&(a=!1)}if(a){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return f(e.parent,t,n)}function m(e){return 0===C.matcher.regexIndex?(j+=e[0],1):(T=!0,0)}function b(e){const r=e[0],n=t.substring(e.index),a=f(C,e,n);if(!a)return se;const o=C;C.endScope&&C.endScope._wrap?(h(),u(r,C.endScope._wrap)):C.endScope&&C.endScope._multi?(h(),g(C.endScope,e)):o.skip?j+=r:(o.returnEnd||o.excludeEnd||(j+=r),h(),o.excludeEnd&&(j=r));do{C.scope&&L.closeNode(),C.skip||C.subLanguage||(N+=C.relevance),C=C.parent}while(C!==a.parent);return a.starts&&p(a.starts,e),o.returnEnd?0:r.length}let S={};function x(n,o){const s=o&&o[0];if(j+=n,null==s)return h(),0;if("begin"===S.type&&"end"===o.type&&S.index===o.index&&""===s){if(j+=t.slice(o.index,o.index+1),!i){const t=new Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=S.rule,t}return 1}if(S=o,"begin"===o.type)return function(e){const t=e[0],n=e.rule,a=new r(n),o=[n.__beforeBegin,n["on:begin"]];for(const r of o)if(r&&(r(e,a),a.isMatchIgnored))return m(t);return n.skip?j+=t:(n.excludeBegin&&(j+=t),h(),n.returnBegin||n.excludeBegin||(j=t)),p(n,e),n.returnBegin?0:t.length}(o);if("illegal"===o.type&&!a){const e=new Error('Illegal lexeme "'+s+'" for mode "'+(C.scope||"<unnamed>")+'"');throw e.mode=C,e}if("end"===o.type){const e=b(o);if(e!==se)return e}if("illegal"===o.type&&""===s)return j+="\n",1;if(R>1e5&&R>3*o.index)throw new Error("potential infinite loop, way more iterations than matches");return j+=s,s.length}const w=k(e);if(!w)throw Y(s.replace("{}",e)),new Error('Unknown language: "'+e+'"');const $=re(w);let E="",C=o||$;const _={},L=new d.__emitter(d);!function(){const e=[];for(let t=C;t!==w;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach((e=>L.openNode(e)))}();let j="",N=0,A=0,R=0,T=!1;try{if(w.__emitTokens)w.__emitTokens(t,L);else{for(C.matcher.considerAll();;){R++,T?T=!1:C.matcher.considerAll(),C.matcher.lastIndex=A;const e=C.matcher.exec(t);if(!e)break;const r=x(t.substring(A,e.index),e);A=e.index+r}x(t.substring(A))}return L.finalize(),E=L.toHTML(),{language:e,value:E,relevance:N,illegal:!1,_emitter:L,_top:C}}catch(r){if(r.message&&r.message.includes("Illegal"))return{language:e,value:oe(t),illegal:!0,relevance:0,_illegalBy:{message:r.message,index:A,context:t.slice(A-100,A+100),mode:r.mode,resultSoFar:E},_emitter:L};if(i)return{language:e,value:oe(t),illegal:!1,relevance:0,errorRaised:r,_emitter:L,_top:C};throw r}}function v(e,t){t=t||d.languages||Object.keys(n);const r=function(e){const t={value:oe(e),illegal:!1,relevance:0,_top:l,_emitter:new d.__emitter(d)};return t._emitter.addText(e),t}(e),a=t.filter(k).filter(E).map((t=>y(t,e,!1)));a.unshift(r);const o=a.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(k(e.language).supersetOf===t.language)return 1;if(k(t.language).supersetOf===e.language)return-1}return 0})),[i,s]=o,c=i;return c.secondBest=s,c}function S(e){let t=null;const r=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const r=d.languageDetectRe.exec(t);if(r){const t=k(r[1]);return t||(J(s.replace("{}",r[1])),J("Falling back to no-highlight mode for this block.",e)),t?r[1]:"no-highlight"}return t.split(/\s+/).find((e=>m(e)||k(e)))}(e);if(m(r))return;if(C("before:highlightElement",{el:e,language:r}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(d.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),d.throwUnescapedHTML))throw new ae("One of your code blocks includes unescaped HTML.",e.innerHTML);t=e;const n=t.textContent,o=r?b(n,{language:r,ignoreIllegals:!0}):v(n);e.innerHTML=o.value,e.dataset.highlighted="yes",function(e,t,r){const n=t&&a[t]||r;e.classList.add("hljs"),e.classList.add(`language-${n}`)}(e,r,o.language),e.result={language:o.language,re:o.relevance,relevance:o.relevance},o.secondBest&&(e.secondBest={language:o.secondBest.language,relevance:o.secondBest.relevance}),C("after:highlightElement",{el:e,result:o,text:n})}let x=!1;function w(){if("loading"===document.readyState)return x||window.addEventListener("DOMContentLoaded",(function(){w()}),!1),void(x=!0);document.querySelectorAll(d.cssSelector).forEach(S)}function k(e){return e=(e||"").toLowerCase(),n[e]||n[a[e]]}function $(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{a[e.toLowerCase()]=t}))}function E(e){const t=k(e);return t&&!t.disableAutodetect}function C(e,t){const r=e;o.forEach((function(e){e[r]&&e[r](t)}))}Object.assign(e,{highlight:b,highlightAuto:v,highlightAll:w,highlightElement:S,highlightBlock:function(e){return V("10.7.0","highlightBlock will be removed entirely in v12.0"),V("10.7.0","Please use highlightElement now."),S(e)},configure:function(e){d=ie(d,e)},initHighlighting:()=>{w(),V("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){w(),V("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,r){let a=null;try{a=r(e)}catch(e){if(Y("Language definition for '{}' could not be registered.".replace("{}",t)),!i)throw e;Y(e),a=l}a.name||(a.name=t),n[t]=a,a.rawDefinition=r.bind(null,e),a.aliases&&$(a.aliases,{languageName:t})},unregisterLanguage:function(e){delete n[e];for(const t of Object.keys(a))a[t]===e&&delete a[t]},listLanguages:function(){return Object.keys(n)},getLanguage:k,registerAliases:$,autoDetection:E,inherit:ie,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),o.push(e)},removePlugin:function(e){const t=o.indexOf(e);-1!==t&&o.splice(t,1)}}),e.debugMode=function(){i=!1},e.safeMode=function(){i=!0},e.versionString="11.11.1",e.regex={concat:p,lookahead:h,either:f,optional:g,anyNumberOfTimes:u};for(const e in z)"object"==typeof z[e]&&t(z[e]);return Object.assign(e,z),e},ce=le({});ce.newInstance=()=>le({}),e.exports=ce,ce.HighlightJS=ce,ce.default=ce}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}(()=>{"use strict";const e=r(416),t="[A-Za-z$_][0-9A-Za-z$_]*",n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],a=["true","false","null","undefined","NaN","Infinity"],o=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],i=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],s=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],l=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],c=[].concat(s,o,i);e.registerLanguage("javascript",(function(e){const r=e.regex,d=t,h={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{const r=e[0].length+e.index,n=e.input[r];if("<"===n||","===n)return void t.ignoreMatch();let a;">"===n&&(((e,{after:t})=>{const r="</"+e[0].slice(1);return-1!==e.input.indexOf(r,t)})(e,{after:r})||t.ignoreMatch());const o=e.input.substring(r);((a=o.match(/^\s*=/))||(a=o.match(/^\s+extends\s+/))&&0===a.index)&&t.ignoreMatch()}},u={$pattern:t,keyword:n,literal:a,built_in:c,"variable.language":l},g="[0-9](_?[0-9])*",p=`\\.(${g})`,f="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${f})((${p})|\\.)?|(${p}))[eE][+-]?(${g})\\b`},{begin:`\\b(${f})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},b={className:"subst",begin:"\\$\\{",end:"\\}",keywords:u,contains:[]},y={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"css"}},S={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"graphql"}},x={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,b]},w={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:d+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,v,S,x,{match:/\$\d+/},m];b.contains=k.concat({begin:/\{/,end:/\}/,keywords:u,contains:["self"].concat(k)});const $=[].concat(w,b.contains),E=$.concat([{begin:/(\s*)\(/,end:/\)/,keywords:u,contains:["self"].concat($)}]),C={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:u,contains:E},_={variants:[{match:[/class/,/\s+/,d,/\s+/,/extends/,/\s+/,r.concat(d,"(",r.concat(/\./,d),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,d],scope:{1:"keyword",3:"title.class"}}]},L={relevance:0,match:r.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...o,...i]}},j={variants:[{match:[/function/,/\s+/,d,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[C],illegal:/%/},N={match:r.concat(/\b/,(A=[...s,"super","import"].map((e=>`${e}\\s*\\(`)),r.concat("(?!",A.join("|"),")")),d,r.lookahead(/\s*\(/)),className:"title.function",relevance:0};var A;const R={begin:r.concat(/\./,r.lookahead(r.concat(d,/(?![0-9A-Za-z$_(])/))),end:d,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},T={match:[/get|set/,/\s+/,d,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},C]},O="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,d,/\s*/,/=\s*/,/(async\s*)?/,r.lookahead(O)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[C]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:u,exports:{PARAMS_CONTAINS:E,CLASS_REFERENCE:L},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,v,S,x,w,{match:/\$\d+/},m,L,{scope:"attr",match:d+r.lookahead(":"),relevance:0},M,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,e.REGEXP_MODE,{className:"function",begin:O,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:u,contains:E}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:h.begin,"on:begin":h.isTrulyOpeningTag,end:h.end}],subLanguage:"xml",contains:[{begin:h.begin,end:h.end,skip:!0,contains:["self"]}]}]},j,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[C,e.inherit(e.TITLE_MODE,{begin:d,className:"title.function"})]},{match:/\.\.\./,relevance:0},R,{match:"\\$"+d,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[C]},N,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},_,T,{match:/\$[(.]/}]}})),e.registerLanguage("xml",(function(e){const t=e.regex,r=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},o=e.inherit(a,{begin:/\(/,end:/\)/}),i=e.inherit(e.APOS_STRING_MODE,{className:"string"}),s=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[n]},{begin:/'/,end:/'/,contains:[n]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,s,i,o,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[a,o,s,i]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},n,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[s]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(r,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:r,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(r,/>/))),contains:[{className:"name",begin:r,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}})),e.registerLanguage("bash",(function(e){const t=e.regex,r={},n={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[r]}]};Object.assign(r,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});const a={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},o=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),i={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},s={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,r,a]};a.contains.push(s);const l={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,r]},c=e.SHEBANG({binary:`(${["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"].join("|")})`,relevance:10}),d={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],literal:["true","false"],built_in:["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset","alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias","set","shopt","autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp","chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"]},contains:[c,e.SHEBANG(),d,l,o,i,{match:/(\/[a-z._-]+)+/},s,{match:/\\"/},{className:"string",begin:/'/,end:/'/},{match:/\\'/},r]}}));class d{on(e,t){if("function"!=typeof t)throw new TypeError("Listener must be a function");return this.listeners||(this.listeners={}),this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>this.off(e,t)}once(e,t){if("function"==typeof t){const r=this,n=t;t=function(...a){n(...a),r.off(e,t)}}return this.on(e,t)}off(e,t){this.listeners&&(e?this.listeners[e]&&(t?(this.listeners[e]=this.listeners[e].filter((e=>e!==t)),this.listeners[e].length||delete this.listeners[e]):delete this.listeners[e],Object.keys(this.listeners).length||delete this.listeners):delete this.listeners)}emit(e,...t){this.listeners&&this.listeners[e]&&this.listeners[e].slice().forEach((function(e){e(...t)}))}}var h=(e,t,...r)=>"function"!=typeof e?e:e.apply(t,r);class u extends d{constructor(e={}){super(),this.preinitialize.apply(this,arguments);const t=h(this.defaults,this)||{};this.attributes=Object.assign({},t,e),this.previous={},Object.keys(this.attributes).forEach(this.defineAttribute.bind(this))}preinitialize(){}defineAttribute(e){Object.defineProperty(this,e,{get:()=>this.get(e),set:t=>{this.set(e,t)}})}get(e){return this.attributes[e]}set(e,t,...r){let n,a;"object"==typeof e?(n=e,a=[t,...r]):(n={[e]:t},a=r);const o=this._changing;this._changing=!0;const i={};o||(this.previous=Object.assign({},this.attributes)),Object.keys(n).forEach((e=>{n[e]!==this.attributes[e]&&(i[e]=n[e],this.attributes[e]=n[e])}));const s=Object.keys(i);if(s.length&&(this._pending=["change",this,i,...a]),s.forEach((e=>{this.emit(`change:${e}`,this,n[e],...a)})),o)return this;for(;this._pending;){const e=this._pending;this._pending=null,this.emit.apply(this,e)}return this._pending=null,this._changing=!1,this}toJSON(){return Object.assign({},this.attributes)}}const g=["el","tag","attributes","events","model","template","onDestroy"];class p extends d{constructor(e={}){super(),this.preinitialize.apply(this,arguments),this.uid="rasti-"+ ++p.uid,this.delegatedEventListeners=[],this.children=[],this.destroyQueue=[],g.forEach((t=>{t in e&&(this[t]=e[t])})),this.ensureElement()}preinitialize(){}$(e){return this.el.querySelector(e)}$$(e){return this.el.querySelectorAll(e)}destroy(){return this.destroyChildren(),this.undelegateEvents(),this.off(),this.destroyQueue.forEach((e=>e())),this.destroyQueue=[],this.onDestroy.apply(this,arguments),this}onDestroy(){}addChild(e){return this.children.push(e),e}destroyChildren(){this.children.forEach((e=>e.destroy())),this.children=[]}ensureElement(){if(this.el)this.el=h(this.el,this);else{const e=h(this.tag,this),t=h(this.attributes,this);this.el=this.createElement(e,t)}this.delegateEvents()}createElement(e="div",t={}){let r=document.createElement(e);return Object.keys(t).forEach((e=>r.setAttribute(e,t[e]))),r}removeElement(){return this.el.parentNode.removeChild(this.el),this}delegateEvents(e){if(e||(e=h(this.events,this)),!e)return this;this.delegatedEventListeners.length&&this.undelegateEvents();let t={};return Object.keys(e).forEach((r=>{const n=r.split(" "),a=n.shift(),o=n.join(" ");let i=e[r];i=("string"==typeof i?this[i]:i).bind(this),t[a]||(t[a]=[]),t[a].push({selector:o,listener:i})})),Object.keys(t).forEach((e=>{const r=r=>{t[e].forEach((({selector:e,listener:t})=>{e&&!r.target.closest(e)||t(r,this)}))};this.delegatedEventListeners.push({type:e,listener:r}),this.el.addEventListener(e,r)})),this}undelegateEvents(){return this.delegatedEventListeners.forEach((({type:e,listener:t})=>{this.el.removeEventListener(e,t)})),this.delegatedEventListeners=[],this}render(){return this.template&&(this.el.innerHTML=this.template(this.model)),this}static sanitize(e){return`${e}`.replace(/[&<>"']/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[e])))}}p.uid=0;const f=e=>e.reduce(((e,t)=>(Array.isArray(t)?e.push(...f(t)):e.push(t),e)),[]);class m{constructor(e){this.value=e}toString(){return this.value}}const b=(e,t)=>h(e,t,t),y=(e,t)=>e.reduce(((e,r,n)=>(e.push(r),void 0!==t[n]&&e.push(E.PLACEHOLDER_EXPRESSION(n)),e)),[]).join(""),v=(e,t)=>{const r=E.PLACEHOLDER_EXPRESSION("(\\d+)"),n=new RegExp(`${r}`,"g"),a=[];let o,i=0;for(;null!==(o=n.exec(e));){const r=e.slice(i,o.index);a.push(E.markAsSafeHTML(r),t[o[1]]),i=o.index+o[0].length}return a.push(E.markAsSafeHTML(e.slice(i))),a},S=(e,t)=>{const r=e.reduce(((e,r)=>{const n=t(r[0]);if(1===r.length)"object"==typeof n?e.all=Object.assign(e.all,n):"string"==typeof n&&(e.all[n]=!0);else{const a=t(r[1]);e.all[n]=a}return e}),{all:{},events:{},attributes:{}});return Object.keys(r.all).forEach((e=>{const t=e.match(/on(([A-Z]{1}[a-z]+)+)/);t&&t[1]?r.events[t[1].toLowerCase()]=r.all[e]:r.attributes[e]=r.all[e]})),r},x=(e,t)=>{const r=E.PLACEHOLDER_EXPRESSION("(\\d+)");return e.replace(new RegExp(`<(${r})([^>]*)>([\\s\\S]*?)</(${r})>|<(${r})([^>]*)/>`,"g"),(function(){const{tag:e,attributes:r,inner:n,close:a,raw:o}=w(arguments,t);if(!(e.prototype instanceof E))return o;let i;if(a){if(e!==a)return o;const r=v(x(n,t),t);i=function(){return f(r.map((e=>b(e,this))))}}return t.push((function(){const t=S(r,(e=>b(e,this))).all;return i&&(t.renderChildren=i.bind(this)),e.mount(t)})),E.PLACEHOLDER_EXPRESSION(t.length-1)}))},w=(e,t)=>{const r=E.PLACEHOLDER_EXPRESSION("(\\d+)"),[n,a,o,i,s,l,c,d,h,u]=e,g={raw:n,attributes:[]};let p;a?(g.tag=void 0!==o?t[o]:a,g.inner=s,g.close=void 0!==c?t[c]:l,p=i):(g.tag=void 0!==h?t[h]:d,p=u);const f=new RegExp(`(${r}|[\\w-]+)(?:=(["']?)(?:${r}|((?:.?(?!["']?\\s+(?:\\S+)=|\\s*/?[>"']))+.))\\3)?`,"g");let m;for(;null!==(m=f.exec(p));){const[,e,r,,n,a]=m,o=void 0!==r?t[r]:e,i=void 0!==n?t[n]:a;void 0!==i?g.attributes.push([o,i]):g.attributes.push([o])}return g},k={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,source:!0,track:!0,wbr:!0},$=["key","state","onCreate","onChange","onRender"];class E extends p{constructor(e={}){super(...arguments),$.forEach((t=>{t in e&&(this[t]=e[t])})),this.options=e,this.partial=this.partial.bind(this),this.onCreate.apply(this,arguments)}subscribe(e){if(!e.on)return;const t=this.onChange.bind(this),r=e.on("change",t);return this.destroyQueue.push("function"==typeof r?r:()=>e.off("change",t)),this}isContainer(){return!(this.tag||!this.template)}ensureElement(){this.el&&(this.el=h(this.el,this),this.delegateEvents())}findElement(e){return(e||document).querySelector(`[${E.DATA_ATTRIBUTE_UID}="${this.uid}"]`)}getAttributes(){const e={},t={},r=[],n={[E.DATA_ATTRIBUTE_UID]:this.uid};this.attributes&&Object.assign(n,h(this.attributes,this));const a=this.previousAttributes||{};return this.previousAttributes=n,Object.keys(n).forEach((a=>{let o=n[a];!1===o?t[a]=!0:!0===o?(e[a]="",r.push(a)):(null==o&&(o=""),e[a]=o,r.push(`${E.sanitize(a)}="${E.sanitize(o)}"`))})),Object.keys(a).forEach((e=>{e in n||(t[e]=!0)})),{add:e,remove:t,html:r.join(" ")}}hydrate(e){return this.model&&this.subscribe(this.model),this.state&&this.subscribe(this.state),this.isContainer()?(this.children[0].hydrate(e),this.el=this.children[0].el):(this.el=this.findElement(e),this.delegateEvents(),this.children.forEach((e=>e.hydrate(this.el)))),this.onRender.call(this,E.RENDER_TYPE_HYDRATE),this}recycle(e){return this.isContainer()?this.children[0].recycle(e):this.findElement(e).replaceWith(this.el),this.onRender.call(this,E.RENDER_TYPE_RECYCLE),this}destroy(){return super.destroy.apply(this,arguments),this.destroyed=!0,this}onCreate(){}onChange(){this.render()}onRender(){}onDestroy(){}partial(e,...t){return f(v(x(y(e,t),t),t).map((e=>b(e,this))))}getRecyclePlaceholder(){if(this.isContainer())return this.children[0].getRecyclePlaceholder();const e=h(this.tag,this)||"div",t=`${E.DATA_ATTRIBUTE_UID}="${this.uid}"`;return this.template||!k[e]?`<${e} ${t}></${e}>`:`<${e} ${t} />`}toString(){if(this.destroyChildren(),this.isContainer())return this.template.call(this,this.addChild.bind(this));const e=h(this.tag,this)||"div",t=this.getAttributes().html,r=this.template?this.template.call(this,this.addChild.bind(this)):"";return this.template||!k[e]?`<${e} ${t}>${r}</${e}>`:`<${e} ${t} />`}render(){if(this.destroyed)return this;if(!this.el){const e=this.createElement("template");return e.innerHTML=this,this.hydrate(e.content),this}if(!this.isContainer()){const e=this.getAttributes();Object.keys(e.remove).forEach((e=>{this.el.removeAttribute(e)})),Object.keys(e.add).forEach((t=>{this.el.setAttribute(t,e.add[t])}))}if(this.template){const e=document.activeElement,t=[],r=[],n=this.children;this.children=[];const a=this.template.call(this,(e=>{let a=e;const o=e.key&&n.find((t=>t.key===e.key));return o?(a=o.getRecyclePlaceholder(),r.push(o),e.destroy()):t.push(e),a}));if(this.isContainer())if(t[0]){const e=this.createElement("template");e.innerHTML=a,this.addChild(t[0]).hydrate(e.content);const r=e.content.children[0];this.el.replaceWith(r),this.el=r}else{if(!r[0])throw new Error("Container component must have a child component");this.addChild(r[0])}else this.el.innerHTML=a,t.forEach((e=>{this.addChild(e).hydrate(this.el)})),r.forEach((e=>{this.addChild(e).recycle(this.el)}));n.forEach((e=>{r.indexOf(e)>-1||e.destroy()})),this.el.contains(e)&&e.focus()}return this.onRender.call(this,E.RENDER_TYPE_RENDER),this}static markAsSafeHTML(e){return new m(e)}static extend(e){const t=this;class r extends t{}return Object.assign(r.prototype,"function"==typeof e?e(t.prototype):e),r}static mount(e,t,r){const n=new this(e);return t&&(r?(n.toString(),n.hydrate(t)):t.appendChild(n.render().el)),n}static create(e,...t){const r=E.PLACEHOLDER_EXPRESSION("(\\d+)");let n,a,o,i;"function"==typeof e&&(t=[e],e=["",""]);const s=x(y(e,t),t);let l=s.match(new RegExp(`^\\s*<([a-z]+[1-6]?|${r})([^>]*)>([\\s\\S]*?)</(\\1|${r})>\\s*$|^\\s*<([a-z]+[1-6]?|${r})([^>]*)/>\\s*$`));if(l){const{tag:e,attributes:r,inner:s,close:c}=w(l,t);if(n=function(){return E.sanitize(b(e,this))},a=function(){return S(r,(e=>b(e,this))).attributes},o=function(){const e=S(r,(e=>b(e,this))).events;return Object.keys(e).reduce(((t,r)=>{const n=b(e[r],this);return Object.keys(n).forEach((e=>{t[`${r}${"&"===e?"":` ${e}`}`]=n[e]})),t}),{})},c){const e=s?v(s,t):[];i=function(t){return f(e.map((e=>b(e,this)))).map((e=>null!=e&&!1!==e&&!0!==e?e instanceof m?e:e instanceof E?t(e):E.sanitize(e):"")).join("")}}}else{if(l=s.match(new RegExp(`^\\s*${r}\\s*$`)),!l)throw new SyntaxError("Invalid component");i=function(e){return e(b(t[l[1]],this)).toString()}}return this.extend({tag:n,attributes:a,events:o,template:i})}}E.PLACEHOLDER_EXPRESSION=e=>`__RASTI_{${e}}__`,E.DATA_ATTRIBUTE_UID="data-rasti-uid",E.RENDER_TYPE_HYDRATE="hydrate",E.RENDER_TYPE_RECYCLE="recycle",E.RENDER_TYPE_RENDER="render";const C=["prefix","generateUid","generateClassName","shouldAttachToDOM","attributes","renderers"];class _{constructor(e,t={}){this.styles=e,this.classes={},C.forEach((e=>{e in t&&(this[e]=t[e])})),this.renderers||(this.renderers=[this.renderStyles,this.parseStyles]),this.prefix||(this.prefix=_.prefix),this.uid=this.generateUid(),Object.keys(e).forEach((e=>{e.match(_.classRegex)&&(this.classes[e]=this.generateClassName(e))}))}generateUid(){const e=JSON.stringify(this.styles);let t=2166136261;for(let r=0;r<e.length;r++)t^=e.charCodeAt(r),t=16777619*t>>>0;return`${this.prefix}-${t.toString(36)}`}generateClassName(e){return`${this.uid}-${e}`}render(){return((...e)=>e.reduce(((e,t)=>(...r)=>e(t(...r)))))(...this.renderers.map((e=>("string"==typeof e?this[e]:e).bind(this))))(this.styles)}renderStyles(e,t=1){return Object.keys(e).reduce(((r,n)=>{const a=e[n];let o="",i="",s="";if(_.debug&&(o=_.indent.repeat(t),i="\n",s=" "),a.constructor===Object){if(Object.keys(a).length>0){const e=this.renderStyles(a,t+1);r.push(`${o}${n}${s}{${i}${e}${o}}${i}`)}}else r.push(`${o}${n}:${s}${a};${i}`);return r}),[]).join("")}parseStyles(e,t,r,n){const a=e=>e in this.classes?`.${this.classes[e]}`:e,o=e=>n&&r?`${r} ${e}`:e.match(_.globalPrefixRegex)?`${r?`${r} `:""}${e.replace(_.globalPrefixRegex,"")}`:a(e).replace(_.referenceRegex,((e,t)=>a(t))).replace(_.nestedRegex,r);return Object.keys(e).reduce(((n,a)=>{const i=e[a];if(i.constructor===Object)if(a.match(_.globalRegex))Object.assign(t||n,this.parseStyles(i,n,r,!0));else if((a.match(_.nestedRegex)||a.match(_.globalPrefixRegex))&&t){const e=o(a);t[e]={},Object.assign(t[e],this.parseStyles(i,t,e))}else{const e=o(a);n[e]={},Object.assign(n[e],this.parseStyles(i,n,e))}else n[a.includes("-")?a:(s=a,s.replace(/([A-Z])/g,(e=>`-${e[0].toLowerCase()}`)))]=i;var s;return n}),{})}getAttributes(){const e=Object.assign({},this.attributes);return e[`data-${this.prefix}-uid`]=this.uid,e}toString(){const e=this.getAttributes(),t=Object.keys(e).map((t=>` ${t}="${e[t]}"`)).join(""),r=_.debug?"\n":"";return`<style${t}>${r}${this.render()}</style>${r}`}shouldAttachToDOM(){return"undefined"!=typeof document&&!document.querySelector(`style[data-${this.prefix}-uid="${this.uid}"]`)}attach(){if(_.registry.some((({uid:e})=>e===this.uid))||_.registry.push(this),this.shouldAttachToDOM()){this.el=document.createElement("style");const e=this.getAttributes();Object.keys(e).forEach((t=>{this.el.setAttribute(t,e[t])})),this.el.textContent=this.render(),document.head.appendChild(this.el)}return this}destroy(){const e=_.registry.indexOf(this);return e>-1&&_.registry.splice(e,1),this.el&&(this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=null),this}static toString(){return _.registry.join("")}static destroy(){_.registry.slice().forEach((e=>e.destroy()))}}_.classRegex=/^\w+$/,_.globalRegex=/^@global$/,_.globalPrefixRegex=/^@global\s+/,_.referenceRegex=/\$(\w+)/g,_.nestedRegex=/&/g,_.prefix="fun",_.indent="    ",_.registry=[],_.debug=!1;var L=["#f8f9fa","#f1f3f5","#e9ecef","#dee2e6","#ced4da","#adb5bd","#868e96","#495057","#343a40","#212529"],j=["#e7f5ff","#d0ebff","#a5d8ff","#74c0fc","#4dabf7","#339af0","#228be6","#1c7ed6","#1971c2","#1864ab"],N=["#f3f0ff","#e5dbff","#d0bfff","#b197fc","#9775fa","#845ef7","#7950f2","#7048e8","#6741d9","#5f3dc4"],A=["#fff5f5","#ffe3e3","#ffc9c9","#ffa8a8","#ff8787","#ff6b6b","#fa5252","#f03e3e","#e03131","#c92a2a"],R=["#fff9db","#fff3bf","#ffec99","#ffe066","#ffd43b","#fcc419","#fab005","#f59f00","#f08c00","#e67700"],T=["#ebfbee","#d3f9d8","#b2f2bb","#8ce99a","#69db7c","#51cf66","#40c057","#37b24d","#2f9e44","#2b8a3e"],O="#000000",M="#ffffff";const I=(e,t="xs",r="xl")=>{const n=["xs","sm","md","lg","xl","xxl","xxxl","xxxxl"];return n.slice(n.indexOf(t),n.indexOf(r)+1).reduce(((t,r,n)=>(Object.assign(t,e(r,n)),t)),{})},D=(e,t,r)=>I(((t,r)=>({[t]:e(t,r)})),t,r),z=e=>`@media (min-width: ${{sm:640,md:768,lg:1024,xl:1280,xxl:1536}[e]}px)`,H=e=>{const t=e.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null},B=e=>{const t=H(e),[r,n,a]=t;return(.299*r+.587*n+.114*a)/255<=.5},W=e=>["primary","secondary","neutral","error","warning","success"].reduce(((t,r)=>(Object.assign(t,e(r)),t)),{}),F=(e,t,r,n)=>{const a=(t,a)=>({main:t(r[n]),light:t(r[n+-1]),dark:t(r[n+1]),contrastMain:t(B(r[n])?M:O),contrastLight:t(B(r[n+-1])?M:O),contrastDark:t(B(r[n+1])?M:O),foregroundMain:t("light"===e?r[8]:r[2]),foregroundLight:t("light"===e?r[7]:r[1]),foregroundDark:t("light"===e?r[9]:r[3]),backgroundMain:t("light"===e?r[1]:r[8]),backgroundLight:t("light"===e?r[0]:r[7]),backgroundDark:t("light"===e?r[2]:r[9]),level1:"light"===e?`var(--rui-palette-${a}-light)`:`var(--rui-palette-${a}-dark)`,level2:`var(--rui-palette-${a}-main)`,level3:"light"===e?`var(--rui-palette-${a}-dark)`:`var(--rui-palette-${a}-light)`,contrastLevel1:"light"===e?`var(--rui-palette-${a}-contrastLight)`:`var(--rui-palette-${a}-contrastDark)`,contrastLevel2:`var(--rui-palette-${a}-contrastMain)`,contrastLevel3:"light"===e?`var(--rui-palette-${a}-contrastDark)`:`var(--rui-palette-${a}-contrastLight)`,foregroundLevel1:"light"===e?`var(--rui-palette-${a}-foregroundDark)`:`var(--rui-palette-${a}-foregroundLight)`,foregroundLevel2:`var(--rui-palette-${a}-foregroundMain)`,foregroundLevel3:"light"===e?`var(--rui-palette-${a}-foregroundLight)`:`var(--rui-palette-${a}-foregroundDark)`,backgroundLevel1:"light"===e?`var(--rui-palette-${a}-backgroundLight)`:`var(--rui-palette-${a}-backgroundDark)`,backgroundLevel2:`var(--rui-palette-${a}-backgroundMain)`,backgroundLevel3:"light"===e?`var(--rui-palette-${a}-backgroundDark)`:`var(--rui-palette-${a}-backgroundLight)`});return{...a((e=>e),t),rgb:a((e=>H(e).join(" ")),`${t}-rgb`)}},P=e=>"light"===e?{black:O,white:M,primary:F("light","primary",j,7),secondary:F("light","secondary",N,7),neutral:F("light","neutral",L,7),error:F("light","error",A,7),warning:F("light","warning",R,6),success:F("light","success",T,8)}:{black:O,white:M,primary:F("dark","primary",j,4),secondary:F("dark","secondary",N,3),neutral:F("dark","neutral",L,4),error:F("dark","error",A,4),warning:F("dark","warning",R,4),success:F("dark","success",T,4)},U=e=>{const t="0 0 #000",r="light"===e?"21 21 21":"0 0 0",n="light"===e?"0.2":"0.4";return{xs:`${t}, 0px 1px 2px 0px rgb(${r} / ${n})`,sm:`${t}, 0px 1px 2px 0px rgb(${r} / ${n}), 0px 2px 4px 0px rgb(${r} / ${n})`,md:`${t}, 0px 2px 8px -2px rgb(${r} / ${n}), 0px 6px 12px -2px rgb(${r} / ${n})`,lg:`${t}, 0px 2px 8px -2px rgb(${r} / ${n}), 0px 12px 16px -4px rgb(${r} / ${n})`,xl:`${t}, 0px 2px 8px -2px rgb(${r} / ${n}), 0px 20px 24px -4px rgb(${r} / ${n})`}},Z=(D(((e,t)=>`${["0.75","0.875","1","1.125","1.25","1.5","1.875","2.25"][t]}rem`),"xs","xxxxl"),D(((e,t)=>200+100*(t+1))),D(((e,t)=>["1.33334","1.42858","1.5","1.55556","1.66667"][t])),D(((e,t)=>2*(t+1)+1+"px")),D(((e,t)=>4*(t+1)+"px"),"xs","xxxxl"),P("light"),U("light"),P("dark"),U("dark"),(e,t)=>new _(e,t).attach());Z({"@keyframes rui-animations-pulse":{"0%, 100%":{opacity:1},"50%":{opacity:.5}}});const G=Z({root:{display:"inline-flex",alignItems:"center",justifyContent:"space-evenly",borderRadius:"var(--rui-borderRadius-xs)",padding:"var(--rui-spacing-sm)",maxHeight:"100%",fontFamily:"var(--rui-typography-button-fontFamily)",fontWeight:"var(--rui-typography-button-fontWeight)",fontSize:"var(--rui-typography-button-fontSize)",lineHeight:"var(--rui-typography-button-lineHeight)",textTransform:"var(--rui-typography-button-textTransform)",textDecoration:"var(--rui-typography-button-textDecoration)",transition:"background-color 0.1s, color 0.1s, border-color 0.1s","&>svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"&>svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"&>svg:only-child":{padding:"0"}},...W((e=>({[e]:{}}))),disabled:{},solid:{...W((e=>({[`&$${e}`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-main)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,border:`1px solid var(--rui-palette-${e}-dark)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`}}}})))},outlined:{...W((e=>({[`&$${e}`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-foregroundMain)`,backgroundColor:"transparent","&:hover":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.2)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,border:`1px solid rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,backgroundColor:"transparent"}}}})))},plain:{...W((e=>({[`&$${e}`]:{border:"none",background:"transparent",color:`var(--rui-palette-${e}-foregroundMain)`,"&:hover":{color:`var(--rui-palette-${e}-foregroundDark)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`}}}})))},group:{"&:not(:first-child)":{marginLeft:"-1px",...W((e=>({[`&$solid$${e}`]:{borderLeftColor:`var(--rui-palette-${e}-dark)`}})))},"&:not(:first-child):not(:last-child)":{borderRadius:"0"},"&:first-child":{borderTopRightRadius:"0",borderBottomRightRadius:"0"},"&:last-child":{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}},lg:{fontSize:"var(--rui-fontSize-xl)"},sm:{fontSize:"var(--rui-fontSize-xs)"}}),K=E.create`
    <${({options:e})=>e.href?"a":e.type?"input":"button"}
        class="${({options:e})=>(e=>{const t=e.classes?{...G.classes,...e.classes}:G.classes;return[e.className||null,t.root,t[e.size||"md"],t[e.variant||"solid"],t[e.color||"neutral"],e.disabled?t.disabled:null,e.group?t.group:null].join(" ")})(e)}"
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
        `}}),q=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),X=Z({root:{color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-md) 0"},h1:q("h1"),h2:q("h2"),h3:q("h3"),h4:q("h4"),titleLg:q("titleLg"),titleMd:q("titleMd"),titleSm:q("titleSm"),bodyLg:q("bodyLg"),bodyMd:q("bodyMd"),bodySm:q("bodySm"),caption:q("caption")}),Y=e=>{switch(e.level){case"h1":return"h1";case"h2":case"titleLg":case"titleMd":case"titleSm":return"h2";case"h3":return"h3";case"h4":return"h4";default:return"p"}},J=E.create`
    <${({options:e})=>Y(e)} class="${({options:e})=>(e=>{const t=e.classes?{...X.classes,...e.classes}:X.classes;return[e.className||null,t.root,t[e.level||"bodyMd"]].join(" ")})(e)}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()||e.text}
    </${({options:e})=>Y(e)}>
`,V=E.create`
    <svg class="${({options:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
`,Q=E.create`
    <svg class="${({options:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
        <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"></path>
    </svg>
`,{classes:ee}=Z({root:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",backgroundColor:"var(--rui-palette-neutral-backgroundLevel3)",boxShadow:"var(--rui-shadow-xs)",padding:"0 var(--rui-spacing-xl)",overflow:"hidden","@global":{h1:{textAlign:"center",margin:"var(--rui-app-appBarHeight) 0 0 0"},h2:{color:"var(--rui-palette-neutral-foregroundLevel2)",marginTop:0,marginBottom:"var(--rui-spacing-sm)"},h4:{color:"var(--rui-palette-neutral-foregroundLevel3)",marginBottom:"var(--rui-spacing-md)"},"h1 img":{width:"90%"},pre:{maxWidth:"100%"},code:{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"}}},buttons:{"& a":{margin:"var(--rui-spacing-md) var(--rui-spacing-xs)"},display:"flex",justifyContent:"center"},[z("sm")]:{"$root h1":{margin:"var(--rui-app-appBarHeight) 0 0 0"},"$root h2":{marginBottom:"var(--rui-spacing-xl)"},"$root h4":{marginBottom:"var(--rui-spacing-xxl)"},"$root h1 img":{width:"60%"},"$buttons a":{margin:"var(--rui-spacing-xxxl) var(--rui-spacing-lg)"}},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-secondary-main)"},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),te=E.create`
    <section class="${ee.root}">
        <h1>
            <img class="${ee.hiddenIfLight}" alt="CSSFUN" src="/logo-dark.svg">
            <img class="${ee.hiddenIfDark}" alt="CSSFUN" src="/logo.svg">
        </h1>
        ${()=>J.mount({level:"h2",text:"Near-zero runtime CSS-in-JS library"})}
        ${e=>J.mount({level:"h4",renderChildren:()=>e.partial`Write modular <strong>CSS</strong> within your <strong>JavaScript</strong> code with built-in <strong>themes</strong> and <strong>SSR</strong> support.`})}
        ${()=>E.markAsSafeHTML("<pre><code class=\"javascript language-javascript\">\nconst { classes } = css({\n    button : {\n        backgroundColor : 'blue',\n        color : 'white',\n        padding : '10px',\n        borderRadius : '5px'\n    }\n});\n\nconst Button = () =&gt; &lt;button className={classes.button}&gt;Click me&lt;/button&gt;;\n</code></pre>")}
        <div class="${ee.buttons}">
            ${()=>K.mount({label:"Getting Started",color:"primary",variant:"outlined",href:"#gettingstarted"})}
            ${()=>K.mount({label:"GitHub",color:"secondary",variant:"outlined",href:"https://github.com/8tentaculos/cssfun",target:"_blank",renderLeftIcon:()=>V.mount({className:ee.icon})})}
        </div>
    </section>
`,re=e=>e.charAt(0).toUpperCase()+e.slice(1),ne=Z({root:{borderRadius:"var(--rui-borderRadius-xs)",padding:"var(--rui-spacing-md)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",fontFamily:"var(--rui-fontFamily-body)",fontSize:"var(--rui-fontSize-bodyMd)"},...W((e=>({[e]:{color:`var(--rui-palette-${e}-foregroundMain)`}}))),outlined:{...W((e=>({[`&$${e}`]:{border:`1px solid rgb(var(--rui-palette-${e}-rgb-level1) / 0.4)`}})))},solid:{...W((e=>({[`&$${e}`]:{backgroundColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`}})))},...I((e=>({[`shadow${re(e)}`]:{boxShadow:`var(--rui-shadow-${e})`}})))}),ae=E.create`
    <div class="${({options:e})=>(e=>{const t=e.classes?{...ne.classes,...e.classes}:ne.classes;return[e.className||null,t.root,t[e.variant||"outlined"],t[e.color||"neutral"],e.shadow?t[`shadow${re(e.shadow)}`]:null].join(" ")})(e)}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`;var oe=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
    </svg>
`;const ie=Z({root:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgb(var(--rui-palette-neutral-rgb-level3) / 0.2)",backdropFilter:"blur(5px)",zIndex:1e3,padding:"var(--rui-spacing-md)"},modal:{position:"relative",padding:"var(--rui-spacing-sm)"},left:{justifyContent:"flex-start"},right:{justifyContent:"flex-end"},top:{alignItems:"flex-start"},bottom:{alignItems:"flex-end"},header:{display:"flex",justifyContent:"flex-end",marginBottom:"var(--rui-spacing-lg)","& button":{margin:0,padding:0,borderRadius:"50%"}},content:{padding:"var(--rui-spacing-md)",marginBottom:"var(--rui-spacing-lg)"},footer:{display:"flex",justifyContent:"space-evenly"}}),se=E.create`
    <div class="${({options:e})=>de(e).header}">
        <${K}
            onClick=${({options:e})=>e.handleClose&&e.handleClose}
            color="neutral"
            variant="outlined"
            size="sm"
        >
            ${()=>oe.mount()}
        </${K}>
    </div>
`,le=E.create`
    <div class="${({options:e})=>de(e).content}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`,ce=E.create`
    <div class="${({options:e})=>de(e).footer}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`,de=e=>e.classes?{...ie.classes,...e.classes}:ie.classes,he=({variant:e,color:t,shadow:r})=>({variant:e,color:t,shadow:r}),ue=E.create`
    <div
        class="${({options:e})=>(e=>{const t=de(e);return[e.className||null,t.root,e.top?t.top:null,e.bottom?t.bottom:null,e.left?t.left:null,e.right?t.right:null].join(" ")})(e)}"
        onClick=${{"&":function(e){this.options.handleClose&&e.target===this.el&&this.options.handleClose()}}}
    >
        <${ae} ${({options:e})=>({...he(e),className:de(e).modal,tag:"div"})}>
            ${e=>e.renderContent()}
        </${ae}>
    </div>
`.extend({renderContent(){return this.options.renderChildren?this.options.renderChildren():this.partial`
            ${this.options.handleClose?this.partial`<${se} ${{...this.options}} />`:null}

            <${le} ${{...this.options}} />
                ${this.options.renderContent}
            </${le}>

            ${this.options.renderButtons?this.partial`
                        <${ce} ${{...this.options}}>
                            ${this.options.renderButtons}
                        </${ce}>
                    `:null}
        `}});ue.Header=se,ue.Content=le,ue.Footer=ce;var ge=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
    </svg>
`,pe=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z"/>
    </svg>
`,fe=E.create`
    <svg class="${({options:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"/>
    </svg>
`;const{classes:me}=Z({root:{display:"flex",justifyContent:"right",alignItems:"center",height:"60px","& ul":{padding:0}},icon:{width:"24px",height:"24px",cursor:"pointer",fill:"var(--rui-palette-neutral-main)","&:hover":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),be=E.create`
    <div class="${me.root}">
        <ul>
            <li class="${me.hiddenIfDark}">
                ${()=>K.mount({variant:"plain",renderChildren:()=>pe.mount({className:me.icon}),onClick:()=>document.documentElement.setAttribute("data-color-scheme","dark")})}
            </li>
            <li class="${me.hiddenIfLight}">
                ${()=>K.mount({variant:"plain",renderChildren:()=>fe.mount({className:me.icon}),onClick:()=>document.documentElement.setAttribute("data-color-scheme","light")})}
            </li>
        </ul>
    </div>
`,{classes:ye}=Z({root:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"var(--rui-app-appBarHeight)",position:"fixed",top:0,left:0,right:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",boxShadow:"var(--rui-shadow-sm)","& nav":{maxWidth:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center","& ul":{display:"flex",justifyContent:"center",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"0 var(--rui-spacing-xs)"}}},"& nav$left":{flexGrow:1,justifyContent:"flex-start","& ul":{justifyContent:"flex-start"}},"& nav$lg":{display:"none"}},[z("sm")]:{"$root nav$lg":{display:"flex"},"$root li$sm":{display:"none"}},left:{},sm:{},lg:{},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-neutral-main)","a:hover &":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"},menuContent:{"& nav":{maxWidth:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center","& ul":{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"var(--rui-spacing-md)"}}}}}),ve=E.create`
    <div class="${ye.menuContent}">
        ${({options:e,partial:t})=>t`
            <nav><ul>
                <li>
                    <${K} ${{href:"/api/",onClick:t=>{t.preventDefault(),e.handleNavigate("/api/"),e.handleOpen(!1)},label:"API",variant:"plain",size:"lg"}} />
                </li>
                <li>
                    <${K} ${{href:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",onClick:t=>{e.handleOpen(!1)},target:"_blank",label:"Playground",variant:"plain",size:"lg"}} />
                </li>
                <li>
                    <${K} ${{href:"https://github.com/8tentaculos/cssfun",onClick:t=>{e.handleOpen(!1)},target:"_blank",label:"GitHub",variant:"plain",size:"lg",renderLeftIcon:()=>V.mount({className:ye.icon})}} />
                </li>
                <li>
                    <${K} ${{href:"https://www.npmjs.com/package/cssfun",onClick:t=>{e.handleOpen},target:"_blank",label:"npm",variant:"plain",size:"lg",renderLeftIcon:()=>Q.mount({className:ye.icon})}} />
                </li>
            </ul></nav>
        `}
    </div>
`,Se=E.create`
    <div class="">
        ${({options:e})=>K.mount({renderChildren:()=>ge.mount({className:ye.icon}),color:"primary",variant:"plain",size:"lg",onClick:()=>e.handleOpen(!0)})}
        ${({options:e})=>e.open?ue.mount({handleClose:()=>e.handleOpen(!1),renderContent:e.renderContent,shadow:"lg"}):null}
    </div>
`,xe=E.create`
    <div class="${ye.root}">
        <nav class="${ye.left}">
            <ul>
                <li>
                    ${e=>K.mount({href:"/",onClick:t=>{t.preventDefault(),e.options.handleNavigate("/")},variant:"plain",renderChildren:()=>e.partial`
                            <span>
                                <img height="24" class="${ye.hiddenIfLight}" alt="CSSFUN" src="/logo-dark.svg">
                                <img height="24" class="${ye.hiddenIfDark}" alt="CSSFUN" src="/logo.svg">
                            </span>
                        `})}
                </li>
            </ul>
        </nav>
        <nav class="${ye.lg}">
            <ul>
                <li>
                    ${({options:e})=>K.mount({href:"/api/",onClick:t=>{t.preventDefault(),e.handleNavigate("/api/")},label:"API",variant:"plain"})}
                </li>
                <li>
                    ${()=>K.mount({href:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",target:"_blank",label:"Playground",variant:"plain"})}
                </li>
                <li>
                    ${()=>K.mount({href:"https://github.com/8tentaculos/cssfun",target:"_blank",variant:"plain",renderChildren:()=>V.mount({className:ye.icon})})}
                </li>
                <li>
                    ${()=>K.mount({href:"https://www.npmjs.com/package/cssfun",target:"_blank",variant:"plain",renderChildren:()=>Q.mount({className:ye.icon})})}
                </li>
            </ul>
        </nav>
        <nav>
            <ul>
                <li>
                    ${()=>be.mount()}
                </li>
                <li class="${ye.sm}">
                    ${e=>Se.mount({open:e.state.open,handleOpen:t=>{e.state.open=t},renderContent:()=>ve.mount({handleNavigate:e.options.handleNavigate,handleOpen:t=>{e.state.open=t}})})}
                </li>
            </ul>
        </nav>
    </div>
`.extend({preinitialize(){this.state=new u({open:!1})}}),we=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:ke}=Z({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...we("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...we("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center","& section":{"& h5":{margin:"var(--rui-spacing-xs) 0",padding:"0"},margin:"var(--rui-spacing-md)"}},[z("md")]:{$root:{justifyContent:"space-between"},"$root section":{maxWidth:"400px"}}}),$e=E.create`
            <section class="${({options:e})=>(e=>[e.className||null,ke.root].join(" "))(e)}">${e=>[ae.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="nearzeroruntime">Near-Zero Runtime ⚡</h5>
<p>Styles are generated when the module is initialized, rather than during component rendering. This eliminates runtime 
  style generation, improving performance and reducing complexity.</p>`}),ae.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="componentscopedstyles">Component-Scoped Styles ✨</h5>
<p><strong>CSSFUN</strong> scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic 
  and styling in the same file for easier management.</p>`}),ae.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="frameworkagnosticandlightweight">Framework-Agnostic and Lightweight 🌐</h5>
<p><strong>CSSFUN</strong> is compatible with any environment. At just <strong>1.7KB</strong>, it adds minimal overhead to your projects.</p>`}),ae.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="nobuildtoolsrequired">No Build Tools Required 🛠️</h5>
<p><strong>CSSFUN</strong> can be used directly in the browser, eliminating the need for complex build tools or configurations.</p>`}),ae.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="serversiderenderingssrsupport">Server-Side Rendering (SSR) Support 🚀</h5>
<p><strong>CSSFUN</strong> supports <a href="#serversiderenderingssr">server-side rendering</a> out of the box, optimizing initial load 
  times without duplicating styles.</p>`}),ae.mount({tag:"section",shadow:"sm",renderChildren:()=>e.partial`<h5 id="builtinthememanagement">Built-in Theme Management 🎨</h5>
<p>With built-in <a href="#themes">theme support</a>, <strong>CSSFUN</strong> uses <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS variables</a> 
  to manage light and dark color schemes. Themes update automatically based on user preferences, no re-renders needed.</p>`})]}</section>
        `,Ee=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Ce}=Z({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ee("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ee("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}}}}),_e=E.create`
            <section class="${({options:e})=>(e=>[e.className||null,Ce.root].join(" "))(e)}"><h2 id="gettingstarted">Getting Started</h2>
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
<p>By default, <a href="/api/#stylesheet"><code>StyleSheet</code></a> are rendered using the built-in renderers: <code>[this.renderStyles, this.parseStyles]</code>.</p>
<h2 id="themes">Themes</h2>
<p>A theme is a <a href="/api/#stylesheet"><code>StyleSheet</code></a> that provides access to CSS variables 
for consistent styling across your application. It supports multiple color schemes, 
including <code>light</code>, <code>dark</code>, <code>light dark</code> (default, adapts to system preferences), and <code>normal</code>. 
Themes allow your components to automatically adapt to changes in the user's system preferences 
or use a fixed color scheme.</p>
<p>The <a href="/api/#createtheme"><code>createTheme</code></a> function generates a theme StyleSheet instance. 
It accepts a <code>themes</code> object, which defines variables for the specified color schemes, and an 
<code>options</code> object to customize the theme generation.<br />
Each key in the <code>themes</code> object corresponds to a color scheme (<code>light</code>, <code>dark</code>, <code>normal</code>), 
and its value is an object of key-value pairs that will be converted into CSS variables.</p>
<h3 id="creatingatheme">Creating a Theme</h3>
<p>Define styles for <code>light</code> and <code>dark</code> color schemes using the <code>createTheme</code> function.</p>
<pre><code class="javascript language-javascript">const theme = createTheme(\{
    light : \{
        colorPrimary : 'black',
        backgroundLevel1 : 'white'
    \},
    dark : \{
        colorPrimary : 'white',
        backgroundLevel1 : 'black'
    \}
\});
</code></pre>
<h3 id="customizingthetheme">Customizing the Theme</h3>
<h4 id="colorscheme">Color Scheme</h4>
<p>The <code>options.colorScheme</code> parameter specifies which color scheme(s) to use. Possible values are:</p>
<ul>
<li><code>light</code>: Uses the <code>light</code> theme only.</li>
<li><code>dark</code>: Uses the <code>dark</code> theme only.</li>
<li><code>light dark</code> (default): Supports both <code>light</code> and <code>dark</code> themes, adapting to system preferences. You can override the system preference by setting the <code>data-color-scheme</code> attribute to <code>light</code> or <code>dark</code> on a parent element.</li>
<li><code>normal</code>: Uses the <code>normal</code> theme only.</li>
</ul>
<h4 id="cssvariablesprefix">CSS Variables Prefix</h4>
<p>The <code>options.cssVarsPrefix</code> parameter allows you to customize the prefix for the generated CSS variables. 
By default, the prefix is <code>fun</code>. For example, a key <code>colorPrimary</code> in the theme will generate a CSS variable 
like <code>--fun-colorPrimary</code>.</p>
<h3 id="applyingthethemeclass">Applying the Theme Class</h3>
<p>The generated theme includes a <code>root</code> class, which exposes all the theme's CSS variables to any element 
that uses this class and its descendants. You can apply this class to the <code>body</code> element to style the 
entire application, or to the root element of a specific component to apply the theme to just part of your UI.</p>
<pre><code class="javascript language-javascript">// Add theme class to the body
document.body.classList.add(theme.classes.root);
</code></pre>
<h3 id="usingthemevariablesinstyles">Using Theme Variables in Styles</h3>
<p>The <code>themes</code> object is automatically converted into CSS variables. For example:</p>
<pre><code class="javascript language-javascript">\{ backgroundLevel1 : 'black' \}
</code></pre>
<p>is converted into the CSS variable <code>--fun-backgroundLevel1</code>.  </p>
<p>Nested structures like:</p>
<pre><code class="javascript language-javascript">\{
    palette : \{
        common : \{ 
            black : '#000'
        \}
    \}
\}
</code></pre>
<p>are converted into <code>--fun-palette-common-black</code>.  </p>
<p>You can use these variables in your component styles, even before the theme is applied. 
Your components will automatically update when the theme or system color scheme changes.</p>
<pre><code class="javascript language-javascript">const \{ classes \} = css(\{
    button : \{
        color : 'var(--fun-colorPrimary)',
        backgroundColor : 'var(--fun-backgroundLevel1)'
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
        `,Le=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:je}=Z({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Le("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Le("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},marginTop:"var(--rui-app-appBarHeight)"}}),Ne=E.create`
            <section class="${({options:e})=>(e=>[e.className||null,je.root].join(" "))(e)}"><h2 id="classes">Classes</h2>
<dl>
<dt><a href="#stylesheet">StyleSheet</a></dt>
<dd></dd>
</dl>
<h2 id="functions">Functions</h2>
<dl>
<dt><a href="#createtheme">createTheme(themes, [options])</a> ⇒ <code><a href="#stylesheet">StyleSheet</a></code></dt>
<dd><p>The <code>createTheme</code> function generates a theme StyleSheet instance with CSS variables 
based on the provided themes and options. It supports multiple color schemes, 
including <code>light</code>, <code>dark</code>, <code>light dark</code>, and <code>normal</code>. </p>
<p>The <code>themes</code> object defines the styles for these color schemes. Each key in the object 
corresponds to a color scheme (<code>light</code>, <code>dark</code>, <code>normal</code>), and its value is an object 
containing key-value pairs that will be converted into CSS variables. Nested keys are 
concatenated with <code>-</code> to form the variable name. For example, <code>\{ light : \{ colors : \{ primary : 'blue' \} \} \}</code> 
generates <code>--fun-colors-primary : blue</code>.</p>
</dd>
<dt><a href="#css">css(styles, [options])</a> ⇒ <code><a href="#stylesheet">StyleSheet</a></code></dt>
<dd><p>Creates and attaches a new StyleSheet instance to the DOM.</p>
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
<td>An object mapping the original class names to the  generated unique class names. Use this to reference the generated class names  in your components.</td>
</tr>
<tr>
<td>styles</td>
<td><code>Object</code></td>
<td>The original styles object provided to the instance.</td>
</tr>
<tr>
<td>uid</td>
<td><code>String</code></td>
<td>A unique identifier for the StyleSheet instance, generated  using <code>this.generateUid</code>.</td>
</tr>
<tr>
<td>attributes</td>
<td><code>Object</code></td>
<td>The attributes object, derived from <code>options.attributes</code>,  to be added to the <code>&lt;style&gt;</code> element.</td>
</tr>
<tr>
<td>renderers</td>
<td><code>Array</code></td>
<td>The array of renderer functions or method names used  to process the styles object.</td>
</tr>
<tr>
<td>el</td>
<td><code>HTMLElement</code></td>
<td>A reference to the <code>&lt;style&gt;</code> element in the DOM. This  is created when the instance is attached to the DOM.</td>
</tr>
</tbody>
</table>
<ul>
<li><a href="#stylesheet">StyleSheet</a><ul>
<li><a href="#new_stylesheet_new">new StyleSheet(styles, [options])</a></li>
<li><em>instance</em><ul>
<li><a href="#stylesheet__generateuid">.generateUid()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__generateclassname">.generateClassName(className)</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__render">.render()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__tostring">.toString()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__shouldattachtodom">.shouldAttachToDOM()</a> ⇒ <code>Boolean</code></li>
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
<h3 id="newstylesheetstylesoptions">new StyleSheet(styles, [options])</h3>
<p>The StyleSheet class is responsible for creating and managing a CSS stylesheet.
It takes a styles object and an optional options object as input, processes the styles, 
and generates a CSS stylesheet that can be attached to the DOM, destroyed, or 
rendered as a string for server-side rendering.</p>
<table>
<thead>
<tr>
<th>Param</th>
<th>Type</th>
<th>Default</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>styles</td>
<td><code>Object</code></td>
<td></td>
<td>The styles object. This is an object where keys represent  CSS selectors and values are style objects. The styles object is processed through  the renderers to generate the final CSS string. It is stored in the instance as <code>this.styles</code>.</td>
</tr>
<tr>
<td>[options]</td>
<td><code>Object</code></td>
<td><code>\{\}</code></td>
<td>Optional configuration options for the StyleSheet instance.</td>
</tr>
<tr>
<td>[options.prefix]</td>
<td><code>String</code></td>
<td><code>'fun'</code></td>
<td>A prefix used for generating unique identifiers  and data attributes.</td>
</tr>
<tr>
<td>[options.generateUid]</td>
<td><code>function</code></td>
<td></td>
<td>A custom function to generate the unique  identifier for the StyleSheet instance.</td>
</tr>
<tr>
<td>[options.generateClassName]</td>
<td><code>function</code></td>
<td></td>
<td>A custom function to generate unique  class names for scoped styles.</td>
</tr>
<tr>
<td>[options.attributes]</td>
<td><code>Object</code></td>
<td></td>
<td>An object containing attributes to be added  to the <code>&lt;style&gt;</code> element in the DOM.</td>
</tr>
<tr>
<td>[options.renderers]</td>
<td><code>Array</code></td>
<td><code>['parseStyles', 'renderStyles']</code></td>
<td>An array of  renderer functions or method names. The renderers are composed in sequence, where  the first receives the styles object, and the last outputs the final CSS string.  Strings or functions will be automatically bound to <code>this</code>.</td>
</tr>
<tr>
<td>[options.shouldAttachToDOM]</td>
<td><code>function</code></td>
<td></td>
<td>A custom function to determine whether  the StyleSheet should be added to the DOM.</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong>  </p>
<pre><code class="js language-js">// Create a new StyleSheet instance with a styles object.
const instance = new StyleSheet(\{
    root: \{
        color: 'black'
    \}
\});

// Attach the StyleSheet instance to the DOM.
instance.attach();

// Retrieve the generated classes object from the instance.
const \{ classes \} = instance;

// Use the generated class name in your component.
function Header() \{
    return &lt;h1 className=\{classes.root\}&gt;Hello World&lt;/h1&gt;;
\}
</code></pre>
<p><a name="stylesheet__generateuid" id="stylesheet__generateuid" class="anchor"></a></p>
<h3 id="stylesheetgenerateuidc25c">styleSheet.generateUid() ⇒ <code>String</code></h3>
<p>Generate a stable unique identifier.
May be overridden by <code>options.generateUid</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The unique identifier.<br />
<a name="stylesheet__generateclassname" id="stylesheet__generateclassname" class="anchor"></a></p>
<h3 id="stylesheetgenerateclassnameclassnamec28c">styleSheet.generateClassName(className) ⇒ <code>String</code></h3>
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
<h3 id="stylesheetrenderc32c">styleSheet.render() ⇒ <code>String</code></h3>
<p>Apply the renderers to the styles object.
It will return a string ready to be added to the style element.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The styles object as a string.<br />
<a name="stylesheet__tostring" id="stylesheet__tostring" class="anchor"></a></p>
<h3 id="stylesheettostringc35c">styleSheet.toString() ⇒ <code>String</code></h3>
<p>Render the StyleSheet as a style element string.
Used for server-side rendering.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The instance as a string.<br />
<a name="stylesheet__shouldattachtodom" id="stylesheet__shouldattachtodom" class="anchor"></a></p>
<h3 id="stylesheetshouldattachtodomc38c">styleSheet.shouldAttachToDOM() ⇒ <code>Boolean</code></h3>
<p>Check if the StyleSheet should be added to the DOM.
By default, it returns true if running in a browser environment and no style element
with the same <code>data-fun-uid</code> attribute exists in the DOM.
This prevents duplicate style elements and ensures proper behavior for server-side rendering.
May be overridden by <code>options.shouldAttachToDOM</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>Boolean</code> - True if the StyleSheet should be added to the DOM, false otherwise.<br />
<a name="stylesheet__attach" id="stylesheet__attach" class="anchor"></a></p>
<h3 id="stylesheetattachc41cstylesheet">styleSheet.attach() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
<p>Add the instance to the registry and if we are in the browser, 
attach it to the DOM.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The instance.<br />
<a name="stylesheet__destroy" id="stylesheet__destroy" class="anchor"></a></p>
<h3 id="stylesheetdestroyc44cstylesheet">styleSheet.destroy() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
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
<h3 id="stylesheettostringc58c">StyleSheet.toString() ⇒ <code>string</code></h3>
<p>Render all instances in the registry as a string.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - All instances in the registry as a string.<br />
<a name="stylesheet_destroy" id="stylesheet_destroy" class="anchor"></a></p>
<h3 id="stylesheetdestroy">StyleSheet.destroy()</h3>
<p>Destroy all instances in the registry and remove them from 
it and from the DOM.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<a name="createtheme" id="createtheme" class="anchor"></a></p>
<h2 id="createthemethemesoptionsc62cstylesheet">createTheme(themes, [options]) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
<p>The <code>createTheme</code> function generates a theme StyleSheet instance with CSS variables 
based on the provided themes and options. It supports multiple color schemes, 
including <code>light</code>, <code>dark</code>, <code>light dark</code>, and <code>normal</code>. </p>
<p>The <code>themes</code> object defines the styles for these color schemes. Each key in the object 
corresponds to a color scheme (<code>light</code>, <code>dark</code>, <code>normal</code>), and its value is an object 
containing key-value pairs that will be converted into CSS variables. Nested keys are 
concatenated with <code>-</code> to form the variable name. For example, <code>\{ light : \{ colors : \{ primary : 'blue' \} \} \}</code> 
generates <code>--fun-colors-primary : blue</code>.</p>
<p><strong>Kind</strong>: global function<br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The theme StyleSheet instance. Use <code>classes.root</code> to get the theme class name. 
Apply this class to the element you want to theme. The CSS variables will be available for all 
its descendants.  </p>
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
<td>An object defining styles for color schemes (<code>light</code>, <code>dark</code>, <code>normal</code>).  Each key corresponds to a color scheme, and its value is an object of key-value pairs converted  to CSS variables. Nested keys are concatenated with <code>-</code> to form variable names.</td>
</tr>
<tr>
<td>[options]</td>
<td><code>Object</code></td>
<td>An optional object to customize the theme generation. It includes options  for selecting color schemes, customizing CSS variable prefixes, and controlling StyleSheet creation.</td>
</tr>
<tr>
<td>[options.colorScheme]</td>
<td><code>String</code></td>
<td>Specifies the color scheme(s) to use. Possible values are:  <code>light</code> (uses the <code>light</code> theme only), <code>dark</code> (uses the <code>dark</code> theme only), <code>light dark</code> (default,  supports both <code>light</code> and <code>dark</code> themes, adapting to system preferences; can override system  preference with <code>data-color-scheme</code> set to <code>light</code> or <code>dark</code>), and <code>normal</code> (uses the <code>normal</code> theme only).</td>
</tr>
<tr>
<td>[options.cssVarsPrefix]</td>
<td><code>String</code></td>
<td>The prefix for the generated CSS variables. Default is <code>fun</code>.  For example, a key <code>color</code> in the theme will generate a CSS variable like <code>--fun-color</code>.</td>
</tr>
<tr>
<td>[options.createStyleSheet]</td>
<td><code>function</code></td>
<td>A function used to create a new StyleSheet instance.  By default, it uses the <code>css</code> function.</td>
</tr>
<tr>
<td>[options.styleSheetOptions]</td>
<td><code>Object</code></td>
<td>Options to pass when creating the StyleSheet instance.  Default is <code>system</code>.</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong>  </p>
<pre><code class="js language-js">// Create a theme with light and dark color schemes and apply it to the entire page.
const theme = createTheme(\{
    light : \{
        colorPrimary : 'black',
        backgroundLevel1 : 'white'
    \},
    dark : \{
        colorPrimary : 'white',
        backgroundLevel1 : 'black'
    \}
\});

// Add the \`root\` class (the theme class) to the body element.
// This will apply the theme to the entire page.
document.body.classList.add(theme.classes.root);

// Add some styles using the theme CSS variables.
const \{ classes \} = css(\{
    button : \{
        color : 'var(--fun-colorPrimary)', // Use the CSS variable generated from the theme.
        backgroundColor : 'var(--fun-backgroundLevel1)'
    \}
\});

// Add the \`button\` class to a button component.
// The button will use the CSS variables defined in the theme for its styles.
// Once the theme is applied, the button will automatically update its styles.
// If the system color scheme changes (e.g., from light to dark), the button will 
// dynamically update to reflect the new theme without requiring additional code.
const Button = (\{ label \}) =&gt; &lt;button className=\{classes.button\}&gt;\{label\}&lt;/button&gt;;
</code></pre>
<p><a name="css" id="css" class="anchor"></a></p>
<h2 id="cssstylesoptionsc70cstylesheet">css(styles, [options]) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
<p>Creates and attaches a new StyleSheet instance to the DOM.</p>
<p><strong>Kind</strong>: global function<br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The created StyleSheet instance. Use the <code>classes</code> property to access the generated class names.  </p>
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
<td>An object containing CSS rules. Keys represent selectors, and values represent style objects.</td>
</tr>
<tr>
<td>[options]</td>
<td><code>Object</code></td>
<td>Optional configuration for the StyleSheet instance. Includes options like <code>prefix</code>, <code>renderers</code>, and more.</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong>  </p>
<pre><code class="js language-js">// Create styles for a link component.
const \{ classes \} = css(\{
    link : \{
        color : 'blue',
        '&amp;:hover' : \{
            textDecoration : 'underline'
        \}
    \}
\});

// Use the generated \`link\` class in a component.
const Link = (\{ label, href \}) =&gt; &lt;a className=\{classes.link\} href=\{href\}&gt;\{label\}&lt;/a&gt;;
</code></pre></section>
        `,{classes:Ae}=Z({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-xl) 0 var(--rui-spacing-xxxxl) 0",borderTop:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)","@global":{a:{color:"var(--rui-palette-neutral-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-neutral-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-neutral-dark)"}}}},text:{color:"var(--rui-palette-neutral-foregroundLevel3)"}}),Re=E.create`
    <footer class="${Ae.root}">
        ${e=>J.mount({level:"titleMd",className:Ae.text,renderChildren:()=>e.partial`Released under the <a href="https://github.com/8tentaculos/cssfun/blob/master/LICENSE" target="_blank">MIT License</a>`})}
        ${e=>J.mount({level:"titleSm",className:Ae.text,renderChildren:()=>e.partial`Copyright © ${(()=>{const e=(new Date).getFullYear();return 2024===e?e:`2024-${e}`})()} <a href="https://github.com/8tentaculos" target="_blank">8tentaculos</a>`})}
    </footer>
`,{classes:Te}=Z({"@global":{body:{margin:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)"},"a.anchor, h2":{scrollMarginTop:"var(--rui-app-appBarHeight)"}},root:{}}),Oe=(e="")=>{const t=e.match(/\/([^/]+)\//),r=t?t[1]:e;return["api"].includes(r)?r:""};E.create`
    <div class="${Te.root}">
        ${e=>xe.mount({handleNavigate:e.navigate.bind(e)})}

        ${({state:e})=>"api"===e.route?Ne.mount():[te.mount(),$e.mount(),_e.mount()]}

        ${()=>Re.mount()}
    </div>
`.extend({preinitialize(e={}){this.state=new u({route:Oe(e.route)}),"undefined"!=typeof window&&(window.history.replaceState({route:this.state.route},""),window.addEventListener("popstate",(e=>{e.state&&(this.state.route=Oe(e.state.route))})))},navigate(e){this.state.route=Oe(e),window.history.pushState({route:this.state.route},"",this.state.route?`/${this.state.route}/`:"/"),document.title=this.getTitle(),window.scrollTo(0,0)},getTitle(){return"CSSFUN"+("api"===this.state.route?" - API Documentation":"")}}).mount({route:window.location.pathname,onRender:t=>{e.highlightAll()}},document.getElementById("root"),!0)})()})();