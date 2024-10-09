(()=>{var e={269:(e,t,n)=>{"use strict";t.__esModule=!0,t.default=void 0;var r,a=(r=n(125))&&r.__esModule?r:{default:r};function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,o(e,t)}function o(e,t){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},o(e,t)}var s={key:!0,state:!0,onCreate:!0,onChange:!0,onRender:!0},l=function(e,t){var n=e&&e.match&&e.match(new RegExp(d.EXPRESSION_PLACEHOLDER_TEMPLATE("(\\d+)")));return n&&n[1]?t[n[1]]:e},c=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];return"function"==typeof e?e.apply(t,r):e},d=t.default=function(e){function t(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t=e.apply(this,arguments)||this,Object.keys(n).forEach((function(e){s[e]&&(t[e]=n[e])})),t.options=n,t.onChange=t.onChange.bind(t),t.model&&t.model.on&&t.model.on("change",t.onChange),t.state&&t.state.on&&t.state.on("change",t.onChange),t.onCreate.apply(t,arguments),t}i(t,e);var n=t.prototype;return n.isContainer=function(){return!(this.tag||!this.template||!this.template.inner||!this.template.expressions||1!==this.template.expressions.length)},n.ensureElement=function(){this.el&&(this.delegateEvents(),this.id=this.el.id),this.isContainer()||this.id||(this.id=this.attributes&&this.attributes.id?c(this.attributes.id,this,this):t.ID_TEMPLATE(this.uid))},n.findElement=function(e){return(e||document).querySelector("#"+this.id)},n.getAttributes=function(){var e=this,t={id:this.id},n={},r=['id="'+this.id+'"'];return this.attributes&&Object.keys(this.attributes).forEach((function(a){if("id"!==a){var i=c(e.attributes[a],e,e);!1===i?n[a]=!0:!0===i?(t[a]="",r.push(a)):(null==i&&(i=""),t[a]=i,r.push(a+'="'+i+'"'))}})),{add:t,remove:n,html:r.join(" ")}},n.hydrate=function(e){var t=this;return this.isContainer()?(this.children[0].hydrate(e),this.el=this.children[0].el):(this.el=this.findElement(e),this.delegateEvents(),this.children.forEach((function(e){return e.hydrate(t.el)}))),this.onRender.call(this,"hydrate"),this},n.recycle=function(e){return(this.isContainer()?this.children[0]:this).findElement(e).replaceWith(this.el),this.onRender.call(this,"recycle"),this},n.destroy=function(){return e.prototype.destroy.apply(this,arguments),this.model&&this.model.off&&this.model.off("change",this.onChange),this.state&&this.state.off&&this.state.off("change",this.onChange),this.destroyed=!0,this},n.onCreate=function(){},n.onChange=function(){this.render()},n.onRender=function(){},n.onDestroy=function(){},n.replaceExpressions=function(e,n){var r=this;return e.replace(new RegExp(t.EXPRESSION_PLACEHOLDER_TEMPLATE("(\\d+)"),"g"),(function(e){var a=l(e,r.template.expressions),i=c(a,r,r);return(i instanceof Array?i:[i]).reduce((function(e,r){return e+(!0===r?t.TRUE_PLACEHOLDER:!1===r?t.FALSE_PLACEHOLDER:null==r?"":r&&"function"==typeof r.render?n(r):r)}),"")})).replace(new RegExp("([\\w|data-]+)=([\"'])?("+t.TRUE_PLACEHOLDER+"|"+t.FALSE_PLACEHOLDER+")\\2","g"),(function(e,n,r,a){return a===t.TRUE_PLACEHOLDER?n:""})).replace(new RegExp(t.TRUE_PLACEHOLDER+"|"+t.FALSE_PLACEHOLDER,"g"),"")},n.toString=function(){var e=this;this.destroyChildren();var t=this.template&&this.template.inner,n=t&&this.replaceExpressions(this.template.inner,(function(t){return e.addChild(t)}));if(this.isContainer())return n;var r=this.tag||"div",a=this.getAttributes().html;return t?"<"+r+" "+a+">"+n+"</"+r+">":"<"+r+" "+a+" />"},n.render=function(){var e=this;if(this.destroyed)return this;if(!this.isContainer()){this.el||(this.el=this.createElement(this.tag),this.delegateEvents());var t=this.getAttributes();Object.keys(t.remove).forEach((function(t){e.el.removeAttribute(t)})),Object.keys(t.add).forEach((function(n){e.el.setAttribute(n,t.add[n])}))}if(this.template&&this.template.inner){var n=document.activeElement,r=[],a=[],i=this.children;this.children=[];var o=this.replaceExpressions(this.template.inner,(function(e){var t=e,n=e.key&&i.find((function(t){return t.key===e.key}));if(n){var o=n.el.tagName.toLowerCase();t="<"+o+' id="'+n.el.id+'"></'+o+">",a.push(n),e.destroy()}else r.push(e);return t}));if(this.isContainer())if(r[0]){var s=this.createElement("template");s.innerHTML=o,this.addChild(r[0]).hydrate(s.content);var l=s.content.children[0];this.el&&this.el.replaceWith(l),this.el=l}else a[0]&&this.addChild(a[0]);else this.el.innerHTML=o,r.forEach((function(t){e.addChild(t).hydrate(e.el)})),a.forEach((function(t){e.addChild(t).recycle(e.el)}));i.forEach((function(e){a.indexOf(e)>-1||e.destroy()})),this.el.contains(n)&&n.focus()}return this.onRender.call(this,"render"),this},t.extend=function(e){var t=function(e){function t(){return e.apply(this,arguments)||this}return i(t,e),t}(this);return Object.assign(t.prototype,"function"==typeof e?e(this.prototype):e),t},t.mount=function(e,t,n){var r=new this(e);if(t){if(n)r.toString();else{var a=this.prototype.createElement("template");a.innerHTML=r,t.appendChild(a.content.children[0])}r.hydrate(t)}return r},t.create=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),a=1;a<n;a++)r[a-1]=arguments[a];var i,o,s,c;"function"==typeof e&&(r=[e],e=["",""]);var d=[];e.forEach((function(e,n){d.push(e),r[n]&&d.push("function"==typeof r[n]||"object"==typeof r[n]?t.EXPRESSION_PLACEHOLDER_TEMPLATE(n):r[n])}));var h=d.join("").trim().replace(/\n/g,t.NEW_LINE_PLACEHOLDER),u=h.match(/^<([a-z]+[1-6]?)(.*?)>(.*)<\/\1>$/)||h.match(/^<([a-z]+)(.*?)\/>$/);return u?(i=u[1],s=u[3]&&u[3].replace(new RegExp(t.NEW_LINE_PLACEHOLDER,"g"),"\n"),o=function(e){for(var t,n={},r=/([\w|data-]+)(?:=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?)?/g;null!==(t=r.exec(e));)n[t[1]]=void 0===t[2]||t[2];return n}(u[2].replace(new RegExp(t.NEW_LINE_PLACEHOLDER,"g"),"")),c={},o=Object.keys(o).reduce((function(e,t){var n=t.match(/on(([A-Z]{1}[a-z]+)+)/),a=l(o[t],r);if(n&&n[1]){var i=n[1].toLowerCase();return Object.keys(a).forEach((function(e){return c[i+("&"===e?"":" "+e)]=a[e]})),e}return e[t]=a,e}),{})):s=h,this.extend({tag:i,attributes:o,events:c,template:{inner:s,expressions:r}})},t}(a.default);d.ID_TEMPLATE=function(e){return"rasti-component-"+e},d.EXPRESSION_PLACEHOLDER_TEMPLATE=function(e){return"__RASTI_EXPRESSION_{"+e+"}__"},d.TRUE_PLACEHOLDER="__RASTI_TRUE__",d.FALSE_PLACEHOLDER="__RASTI_FALSE__",d.NEW_LINE_PLACEHOLDER="__RASTI_NEW_LINE__"},828:(e,t)=>{"use strict";t.__esModule=!0,t.default=void 0,t.default=function(){function e(){}var t=e.prototype;return t.on=function(e,t){if("function"!=typeof t)throw TypeError("Listener must be a function");this.listeners||(this.listeners={}),this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)},t.once=function(e,t){if("function"==typeof t){var n=this,r=t;t=function(){r.apply(void 0,arguments),n.off(e,t)}}this.on(e,t)},t.off=function(e,t){if(e)if(t){var n=this.listeners[e];n&&(n.slice().forEach((function(e,r){e===t&&n.splice(r,1)})),n.length||delete this.listeners[e])}else delete this.listeners[e];else this.listeners={}},t.emit=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=this.listeners&&this.listeners[e];a&&a.length&&a.slice().forEach((function(e){e.apply(void 0,n)}))},e}()},691:(e,t,n)=>{"use strict";t.__esModule=!0,t.default=void 0;var r,a=(r=n(828))&&r.__esModule?r:{default:r};function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}t.default=function(e){function t(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(t=e.call(this)||this).preinitialize.apply(t,arguments),t.attributes=Object.assign({},t.defaults||{},n),t.previous={},Object.keys(t.attributes).forEach(t.defineAttribute.bind(t)),t}var n,r;r=e,(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,i(n,r);var a=t.prototype;return a.preinitialize=function(){},a.defineAttribute=function(e){var t=this;Object.defineProperty(this,e,{get:function(){return t.get(e)},set:function(n){t.set(e,n)}})},a.get=function(e){return this.attributes[e]},a.set=function(e,t){for(var n,r,a,i=this,o=arguments.length,s=new Array(o>2?o-2:0),l=2;l<o;l++)s[l-2]=arguments[l];"object"==typeof e?(n=e,r=[t].concat(s)):((a={})[e]=t,n=a,r=s);var c=this._changing;this._changing=!0;var d={};c||(this.previous=Object.assign({},this.attributes)),Object.keys(n).forEach((function(e){n[e]!==i.attributes[e]&&(d[e]=n[e],i.attributes[e]=n[e])}));var h=Object.keys(d);if(h.length&&(this._pending=["change",this,d].concat(r)),h.forEach((function(e){i.emit.apply(i,["change:"+e,i,n[e]].concat(r))})),c)return this;for(;this._pending;){var u=this._pending;this._pending=null,this.emit.apply(this,u)}return this._pending=null,this._changing=!1,this},a.toJSON=function(){return this.attributes},t}(a.default)},125:(e,t,n)=>{"use strict";t.__esModule=!0,t.default=void 0;var r,a=(r=n(828))&&r.__esModule?r:{default:r};function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}var o={el:!0,tag:!0,attributes:!0,events:!0,model:!0,template:!0,onDestroy:!0};(t.default=function(e){function t(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(n=e.call(this)||this).preinitialize.apply(n,arguments),n.uid="uid"+ ++t.uid,n.delegatedEventListeners=[],n.children=[],Object.keys(r).forEach((function(e){o[e]&&(n[e]=r[e])})),n.ensureElement(),n}var n,r;r=e,(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,i(n,r);var a=t.prototype;return a.preinitialize=function(){},a.$=function(e){return this.el.querySelector(e)},a.$$=function(e){return this.el.querySelectorAll(e)},a.destroy=function(){return this.destroyChildren(),this.undelegateEvents(),this.off(),this.onDestroy.apply(this,arguments),this},a.onDestroy=function(){},a.addChild=function(e){return this.children.push(e),e},a.destroyChildren=function(){for(;this.children.length;)this.children.shift().destroy()},a.ensureElement=function(){this.el||(this.el=this.createElement(this.tag,this.attributes)),this.delegateEvents()},a.createElement=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.createElement(e);return Object.keys(t).forEach((function(e){return n.setAttribute(e,t[e])})),n},a.removeElement=function(){return this.el.parentNode.removeChild(this.el),this},a.delegateEvents=function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.events;if(!t)return this;this.delegatedEventListeners.length&&this.undelegateEvents();var n={};return Object.keys(t).forEach((function(r){var a=r.split(" "),i=a.shift(),o=a.join(" "),s=t[r];s=("string"==typeof s?e[s]:s).bind(e),n[i]||(n[i]=[]),n[i].push({selector:o,listener:s})})),Object.keys(n).forEach((function(t){var r=function(r){n[t].forEach((function(t){var n=t.selector,a=t.listener;n&&!r.target.closest(n)||a(r,e)}))};e.delegatedEventListeners.push({type:t,listener:r}),e.el.addEventListener(t,r)})),this},a.undelegateEvents=function(){var e=this;return this.delegatedEventListeners.forEach((function(t){var n=t.type,r=t.listener;e.el.removeEventListener(n,r)})),this.delegatedEventListeners=[],this},a.render=function(){return this.template&&(this.el.innerHTML=this.template(this.model)),this},t}(a.default)).uid=0},390:(e,t,n)=>{"use strict";i(n(828)).default;var r=i(n(691));t.Kx=r.default,i(n(125)).default;var a=i(n(269));function i(e){return e&&e.__esModule?e:{default:e}}t.uA=a.default},416:e=>{function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((n=>{const r=e[n],a=typeof r;"object"!==a&&"function"!==a||Object.isFrozen(r)||t(r)})),e}class n{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function a(e,...t){const n=Object.create(null);for(const t in e)n[t]=e[t];return t.forEach((function(e){for(const t in e)n[t]=e[t]})),n}const i=e=>!!e.scope;class o{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=r(e)}openNode(e){if(!i(e))return;const t=((e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")}return`${t}${e}`})(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){i(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const s=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class l{constructor(){this.rootNode=s(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t=s({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{l._collapse(e)})))}}class c extends l{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){const n=e.root;t&&(n.scope=`language:${t}`),this.add(n)}toHTML(){return new o(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function d(e){return e?"string"==typeof e?e:e.source:null}function h(e){return p("(?=",e,")")}function u(e){return p("(?:",e,")*")}function g(e){return p("(?:",e,")?")}function p(...e){return e.map((e=>d(e))).join("")}function f(...e){const t=function(e){const t=e[e.length-1];return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(e);return"("+(t.capture?"":"?:")+e.map((e=>d(e))).join("|")+")"}function m(e){return new RegExp(e.toString()+"|").exec("").length-1}const b=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function y(e,{joinWith:t}){let n=0;return e.map((e=>{n+=1;const t=n;let r=d(e),a="";for(;r.length>0;){const e=b.exec(r);if(!e){a+=r;break}a+=r.substring(0,e.index),r=r.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?a+="\\"+String(Number(e[1])+t):(a+=e[0],"("===e[0]&&n++)}return a})).map((e=>`(${e})`)).join(t)}const v="[a-zA-Z]\\w*",S="[a-zA-Z_]\\w*",x="\\b\\d+(\\.\\d+)?",w="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",k="\\b(0b[01]+)",E={begin:"\\\\[\\s\\S]",relevance:0},_={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[E]},C={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[E]},L=function(e,t,n={}){const r=a({scope:"comment",begin:e,end:t,contains:[]},n);r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const i=f("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return r.contains.push({begin:p(/[ ]+/,"(",i,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},$=L("//","$"),A=L("/\\*","\\*/"),j=L("#","$"),N={scope:"number",begin:x,relevance:0},R={scope:"number",begin:w,relevance:0},T={scope:"number",begin:k,relevance:0},O={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[E,{begin:/\[/,end:/\]/,relevance:0,contains:[E]}]},M={scope:"title",begin:v,relevance:0},I={scope:"title",begin:S,relevance:0},z={begin:"\\.\\s*"+S,relevance:0};var D=Object.freeze({__proto__:null,APOS_STRING_MODE:_,BACKSLASH_ESCAPE:E,BINARY_NUMBER_MODE:T,BINARY_NUMBER_RE:k,COMMENT:L,C_BLOCK_COMMENT_MODE:A,C_LINE_COMMENT_MODE:$,C_NUMBER_MODE:R,C_NUMBER_RE:w,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},HASH_COMMENT_MODE:j,IDENT_RE:v,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:z,NUMBER_MODE:N,NUMBER_RE:x,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:C,REGEXP_MODE:O,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=p(t,/.*\b/,e.binary,/\b.*/)),a({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},TITLE_MODE:M,UNDERSCORE_IDENT_RE:S,UNDERSCORE_TITLE_MODE:I});function H(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function B(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function W(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=H,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function P(e,t){Array.isArray(e.illegal)&&(e.illegal=f(...e.illegal))}function F(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function U(e,t){void 0===e.relevance&&(e.relevance=1)}const Z=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]})),e.keywords=n.keywords,e.begin=p(n.beforeMatch,h(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},G=["of","and","for","in","not","or","if","then","parent","list","value"];function K(e,t,n="keyword"){const r=Object.create(null);return"string"==typeof e?a(n,e.split(" ")):Array.isArray(e)?a(n,e):Object.keys(e).forEach((function(n){Object.assign(r,K(e[n],t,n))})),r;function a(e,n){t&&(n=n.map((e=>e.toLowerCase()))),n.forEach((function(t){const n=t.split("|");r[n[0]]=[e,X(n[0],n[1])]}))}}function X(e,t){return t?Number(t):function(e){return G.includes(e.toLowerCase())}(e)?0:1}const q={},Y=e=>{console.error(e)},J=(e,...t)=>{console.log(`WARN: ${e}`,...t)},V=(e,t)=>{q[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),q[`${e}/${t}`]=!0)},Q=new Error;function ee(e,t,{key:n}){let r=0;const a=e[n],i={},o={};for(let e=1;e<=t.length;e++)o[e+r]=a[e],i[e+r]=!0,r+=m(t[e-1]);e[n]=o,e[n]._emit=i,e[n]._multi=!0}function te(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw Y("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Q;if("object"!=typeof e.beginScope||null===e.beginScope)throw Y("beginScope must be object"),Q;ee(e,e.begin,{key:"beginScope"}),e.begin=y(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw Y("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Q;if("object"!=typeof e.endScope||null===e.endScope)throw Y("endScope must be object"),Q;ee(e,e.end,{key:"endScope"}),e.end=y(e.end,{joinWith:""})}}(e)}function ne(e){function t(t,n){return new RegExp(d(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(n?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=m(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=t(y(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const n=t.findIndex(((e,t)=>t>0&&void 0!==e)),r=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,r)}}class r{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new n;return this.rules.slice(e).forEach((([e,n])=>t.addRule(e,n))),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),function n(i,o){const s=i;if(i.isCompiled)return s;[B,F,te,Z].forEach((e=>e(i,o))),e.compilerExtensions.forEach((e=>e(i,o))),i.__beforeBegin=null,[W,P,U].forEach((e=>e(i,o))),i.isCompiled=!0;let l=null;return"object"==typeof i.keywords&&i.keywords.$pattern&&(i.keywords=Object.assign({},i.keywords),l=i.keywords.$pattern,delete i.keywords.$pattern),l=l||/\w+/,i.keywords&&(i.keywords=K(i.keywords,e.case_insensitive)),s.keywordPatternRe=t(l,!0),o&&(i.begin||(i.begin=/\B|\b/),s.beginRe=t(s.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(s.endRe=t(s.end)),s.terminatorEnd=d(s.end)||"",i.endsWithParent&&o.terminatorEnd&&(s.terminatorEnd+=(i.end?"|":"")+o.terminatorEnd)),i.illegal&&(s.illegalRe=t(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return a(e,{variants:null},t)}))),e.cachedVariants?e.cachedVariants:re(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}("self"===e?i:e)}))),i.contains.forEach((function(e){n(e,s)})),i.starts&&n(i.starts,o),s.matcher=function(e){const t=new r;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(s),s}(e)}function re(e){return!!e&&(e.endsWithParent||re(e.starts))}class ae extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}const ie=r,oe=a,se=Symbol("nomatch"),le=function(e){const r=Object.create(null),a=Object.create(null),i=[];let o=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",l={disableAutodetect:!0,name:"Plain text",contains:[]};let d={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:c};function m(e){return d.noHighlightRe.test(e)}function b(e,t,n){let r="",a="";"object"==typeof t?(r=e,n=t.ignoreIllegals,a=t.language):(V("10.7.0","highlight(lang, code, ...args) has been deprecated."),V("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),a=e,r=t),void 0===n&&(n=!0);const i={code:r,language:a};C("before:highlight",i);const o=i.result?i.result:y(i.language,i.code,n);return o.code=i.code,C("after:highlight",o),o}function y(e,t,a,i){const l=Object.create(null);function c(){if(!C.keywords)return void $.addText(A);let e=0;C.keywordPatternRe.lastIndex=0;let t=C.keywordPatternRe.exec(A),n="";for(;t;){n+=A.substring(e,t.index);const a=w.case_insensitive?t[0].toLowerCase():t[0],i=(r=a,C.keywords[r]);if(i){const[e,r]=i;if($.addText(n),n="",l[a]=(l[a]||0)+1,l[a]<=7&&(j+=r),e.startsWith("_"))n+=t[0];else{const n=w.classNameAliases[e]||e;u(t[0],n)}}else n+=t[0];e=C.keywordPatternRe.lastIndex,t=C.keywordPatternRe.exec(A)}var r;n+=A.substring(e),$.addText(n)}function h(){null!=C.subLanguage?function(){if(""===A)return;let e=null;if("string"==typeof C.subLanguage){if(!r[C.subLanguage])return void $.addText(A);e=y(C.subLanguage,A,!0,L[C.subLanguage]),L[C.subLanguage]=e._top}else e=v(A,C.subLanguage.length?C.subLanguage:null);C.relevance>0&&(j+=e.relevance),$.__addSublanguage(e._emitter,e.language)}():c(),A=""}function u(e,t){""!==e&&($.startScope(t),$.addText(e),$.endScope())}function g(e,t){let n=1;const r=t.length-1;for(;n<=r;){if(!e._emit[n]){n++;continue}const r=w.classNameAliases[e[n]]||e[n],a=t[n];r?u(a,r):(A=a,c(),A=""),n++}}function p(e,t){return e.scope&&"string"==typeof e.scope&&$.openNode(w.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(u(A,w.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),A=""):e.beginScope._multi&&(g(e.beginScope,t),A="")),C=Object.create(e,{parent:{value:C}}),C}function f(e,t,r){let a=function(e,t){const n=e&&e.exec(t);return n&&0===n.index}(e.endRe,r);if(a){if(e["on:end"]){const r=new n(e);e["on:end"](t,r),r.isMatchIgnored&&(a=!1)}if(a){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return f(e.parent,t,r)}function m(e){return 0===C.matcher.regexIndex?(A+=e[0],1):(T=!0,0)}function b(e){const n=e[0],r=t.substring(e.index),a=f(C,e,r);if(!a)return se;const i=C;C.endScope&&C.endScope._wrap?(h(),u(n,C.endScope._wrap)):C.endScope&&C.endScope._multi?(h(),g(C.endScope,e)):i.skip?A+=n:(i.returnEnd||i.excludeEnd||(A+=n),h(),i.excludeEnd&&(A=n));do{C.scope&&$.closeNode(),C.skip||C.subLanguage||(j+=C.relevance),C=C.parent}while(C!==a.parent);return a.starts&&p(a.starts,e),i.returnEnd?0:n.length}let S={};function x(r,i){const s=i&&i[0];if(A+=r,null==s)return h(),0;if("begin"===S.type&&"end"===i.type&&S.index===i.index&&""===s){if(A+=t.slice(i.index,i.index+1),!o){const t=new Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=S.rule,t}return 1}if(S=i,"begin"===i.type)return function(e){const t=e[0],r=e.rule,a=new n(r),i=[r.__beforeBegin,r["on:begin"]];for(const n of i)if(n&&(n(e,a),a.isMatchIgnored))return m(t);return r.skip?A+=t:(r.excludeBegin&&(A+=t),h(),r.returnBegin||r.excludeBegin||(A=t)),p(r,e),r.returnBegin?0:t.length}(i);if("illegal"===i.type&&!a){const e=new Error('Illegal lexeme "'+s+'" for mode "'+(C.scope||"<unnamed>")+'"');throw e.mode=C,e}if("end"===i.type){const e=b(i);if(e!==se)return e}if("illegal"===i.type&&""===s)return 1;if(R>1e5&&R>3*i.index)throw new Error("potential infinite loop, way more iterations than matches");return A+=s,s.length}const w=k(e);if(!w)throw Y(s.replace("{}",e)),new Error('Unknown language: "'+e+'"');const E=ne(w);let _="",C=i||E;const L={},$=new d.__emitter(d);!function(){const e=[];for(let t=C;t!==w;t=t.parent)t.scope&&e.unshift(t.scope);e.forEach((e=>$.openNode(e)))}();let A="",j=0,N=0,R=0,T=!1;try{if(w.__emitTokens)w.__emitTokens(t,$);else{for(C.matcher.considerAll();;){R++,T?T=!1:C.matcher.considerAll(),C.matcher.lastIndex=N;const e=C.matcher.exec(t);if(!e)break;const n=x(t.substring(N,e.index),e);N=e.index+n}x(t.substring(N))}return $.finalize(),_=$.toHTML(),{language:e,value:_,relevance:j,illegal:!1,_emitter:$,_top:C}}catch(n){if(n.message&&n.message.includes("Illegal"))return{language:e,value:ie(t),illegal:!0,relevance:0,_illegalBy:{message:n.message,index:N,context:t.slice(N-100,N+100),mode:n.mode,resultSoFar:_},_emitter:$};if(o)return{language:e,value:ie(t),illegal:!1,relevance:0,errorRaised:n,_emitter:$,_top:C};throw n}}function v(e,t){t=t||d.languages||Object.keys(r);const n=function(e){const t={value:ie(e),illegal:!1,relevance:0,_top:l,_emitter:new d.__emitter(d)};return t._emitter.addText(e),t}(e),a=t.filter(k).filter(_).map((t=>y(t,e,!1)));a.unshift(n);const i=a.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(k(e.language).supersetOf===t.language)return 1;if(k(t.language).supersetOf===e.language)return-1}return 0})),[o,s]=i,c=o;return c.secondBest=s,c}function S(e){let t=null;const n=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const n=d.languageDetectRe.exec(t);if(n){const t=k(n[1]);return t||(J(s.replace("{}",n[1])),J("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}return t.split(/\s+/).find((e=>m(e)||k(e)))}(e);if(m(n))return;if(C("before:highlightElement",{el:e,language:n}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(d.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),d.throwUnescapedHTML))throw new ae("One of your code blocks includes unescaped HTML.",e.innerHTML);t=e;const r=t.textContent,i=n?b(r,{language:n,ignoreIllegals:!0}):v(r);e.innerHTML=i.value,e.dataset.highlighted="yes",function(e,t,n){const r=t&&a[t]||n;e.classList.add("hljs"),e.classList.add(`language-${r}`)}(e,n,i.language),e.result={language:i.language,re:i.relevance,relevance:i.relevance},i.secondBest&&(e.secondBest={language:i.secondBest.language,relevance:i.secondBest.relevance}),C("after:highlightElement",{el:e,result:i,text:r})}let x=!1;function w(){"loading"!==document.readyState?document.querySelectorAll(d.cssSelector).forEach(S):x=!0}function k(e){return e=(e||"").toLowerCase(),r[e]||r[a[e]]}function E(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{a[e.toLowerCase()]=t}))}function _(e){const t=k(e);return t&&!t.disableAutodetect}function C(e,t){const n=e;i.forEach((function(e){e[n]&&e[n](t)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){x&&w()}),!1),Object.assign(e,{highlight:b,highlightAuto:v,highlightAll:w,highlightElement:S,highlightBlock:function(e){return V("10.7.0","highlightBlock will be removed entirely in v12.0"),V("10.7.0","Please use highlightElement now."),S(e)},configure:function(e){d=oe(d,e)},initHighlighting:()=>{w(),V("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){w(),V("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,n){let a=null;try{a=n(e)}catch(e){if(Y("Language definition for '{}' could not be registered.".replace("{}",t)),!o)throw e;Y(e),a=l}a.name||(a.name=t),r[t]=a,a.rawDefinition=n.bind(null,e),a.aliases&&E(a.aliases,{languageName:t})},unregisterLanguage:function(e){delete r[e];for(const t of Object.keys(a))a[t]===e&&delete a[t]},listLanguages:function(){return Object.keys(r)},getLanguage:k,registerAliases:E,autoDetection:_,inherit:oe,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),i.push(e)},removePlugin:function(e){const t=i.indexOf(e);-1!==t&&i.splice(t,1)}}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString="11.10.0",e.regex={concat:p,lookahead:h,either:f,optional:g,anyNumberOfTimes:u};for(const e in D)"object"==typeof D[e]&&t(D[e]);return Object.assign(e,D),e},ce=le({});ce.newInstance=()=>le({}),e.exports=ce,ce.HighlightJS=ce,ce.default=ce}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}(()=>{"use strict";const e=n(416),t="[A-Za-z$_][0-9A-Za-z$_]*",r=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],a=["true","false","null","undefined","NaN","Infinity"],i=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],o=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],s=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],l=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],c=[].concat(s,i,o);e.registerLanguage("javascript",(function(e){const n=e.regex,d=t,h={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{const n=e[0].length+e.index,r=e.input[n];if("<"===r||","===r)return void t.ignoreMatch();let a;">"===r&&(((e,{after:t})=>{const n="</"+e[0].slice(1);return-1!==e.input.indexOf(n,t)})(e,{after:n})||t.ignoreMatch());const i=e.input.substring(n);((a=i.match(/^\s*=/))||(a=i.match(/^\s+extends\s+/))&&0===a.index)&&t.ignoreMatch()}},u={$pattern:t,keyword:r,literal:a,built_in:c,"variable.language":l},g="[0-9](_?[0-9])*",p=`\\.(${g})`,f="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${f})((${p})|\\.)?|(${p}))[eE][+-]?(${g})\\b`},{begin:`\\b(${f})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},b={className:"subst",begin:"\\$\\{",end:"\\}",keywords:u,contains:[]},y={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"xml"}},v={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"css"}},S={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,b],subLanguage:"graphql"}},x={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,b]},w={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:d+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},k=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,v,S,x,{match:/\$\d+/},m];b.contains=k.concat({begin:/\{/,end:/\}/,keywords:u,contains:["self"].concat(k)});const E=[].concat(w,b.contains),_=E.concat([{begin:/(\s*)\(/,end:/\)/,keywords:u,contains:["self"].concat(E)}]),C={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:u,contains:_},L={variants:[{match:[/class/,/\s+/,d,/\s+/,/extends/,/\s+/,n.concat(d,"(",n.concat(/\./,d),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,d],scope:{1:"keyword",3:"title.class"}}]},$={relevance:0,match:n.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...i,...o]}},A={variants:[{match:[/function/,/\s+/,d,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[C],illegal:/%/},j={match:n.concat(/\b/,(N=[...s,"super","import"].map((e=>`${e}\\s*\\(`)),n.concat("(?!",N.join("|"),")")),d,n.lookahead(/\s*\(/)),className:"title.function",relevance:0};var N;const R={begin:n.concat(/\./,n.lookahead(n.concat(d,/(?![0-9A-Za-z$_(])/))),end:d,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},T={match:[/get|set/,/\s+/,d,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},C]},O="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",M={match:[/const|var|let/,/\s+/,d,/\s*/,/=\s*/,/(async\s*)?/,n.lookahead(O)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[C]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:u,exports:{PARAMS_CONTAINS:_,CLASS_REFERENCE:$},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,v,S,x,w,{match:/\$\d+/},m,$,{className:"attr",begin:d+n.lookahead(":"),relevance:0},M,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,e.REGEXP_MODE,{className:"function",begin:O,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:u,contains:_}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:h.begin,"on:begin":h.isTrulyOpeningTag,end:h.end}],subLanguage:"xml",contains:[{begin:h.begin,end:h.end,skip:!0,contains:["self"]}]}]},A,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[C,e.inherit(e.TITLE_MODE,{begin:d,className:"title.function"})]},{match:/\.\.\./,relevance:0},R,{match:"\\$"+d,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[C]},j,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},L,T,{match:/\$[(.]/}]}})),e.registerLanguage("xml",(function(e){const t=e.regex,n=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),r={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},a={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},i=e.inherit(a,{begin:/\(/,end:/\)/}),o=e.inherit(e.APOS_STRING_MODE,{className:"string"}),s=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[r]},{begin:/'/,end:/'/,contains:[r]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[a,s,o,i,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[a,i,s,o]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},r,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[s]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(n,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}})),e.registerLanguage("bash",(function(e){const t=e.regex,n={},r={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[n]}]};Object.assign(n,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},r]});const a={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},i=e.inherit(e.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),o={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},s={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,n,a]};a.contains.push(s);const l={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,n]},c=e.SHEBANG({binary:`(${["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"].join("|")})`,relevance:10}),d={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:["if","then","else","elif","fi","for","while","until","in","do","done","case","esac","function","select"],literal:["true","false"],built_in:["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset","alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias","set","shopt","autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp","chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"]},contains:[c,e.SHEBANG(),d,l,i,o,{match:/(\/[a-z._-]+)+/},s,{match:/\\"/},{className:"string",begin:/'/,end:/'/},{match:/\\'/},n]}}));var d=n(390);class h{constructor(e,t={}){this.styles=e,this.classes={},this.uid=0,["idPrefix","generateId","generateClassName","attributes","renderers"].forEach((e=>{e in t&&(this[e]=t[e])})),this.id||(this.id=this.attributes&&this.attributes.id||this.generateId()),Object.keys(e).forEach((e=>{e.match(h.classRegex)&&(this.classes[e]=this.generateClassName(e))}))}generateId(){return`${this.idPrefix||h.prefix}-${++h.uid}`}generateClassName(e){return`${this.id}-${e}-${++this.uid}`}isBrowser(){return"undefined"!=typeof document}render(){return((...e)=>e.reduce(((e,t)=>(...n)=>e(t(...n)))))(...(this.renderers||["renderStyles","parseStyles"]).map((e=>("string"==typeof e?this[e]:e).bind(this))))(this.styles)}renderStyles(e,t=1){return Object.keys(e).reduce(((n,r)=>{const a=e[r];let i="",o="",s="";if(h.debug&&(i=h.indent.repeat(t),o="\n",s=" "),a.constructor===Object){if(Object.keys(a).length>0){const e=this.renderStyles(a,t+1);n.push(`${i}${r}${s}{${o}${e}${i}}${o}`)}}else n.push(`${i}${r}:${s}${a};${o}`);return n}),[]).join("")}parseStyles(e,t,n,r){const a=e=>e in this.classes?`.${this.classes[e]}`:e,i=e=>r&&n?`${n} ${e}`:e.match(h.globalPrefixRegex)?`${n?`${n} `:""}${e.replace(h.globalPrefixRegex,"")}`:a(e).replace(h.referenceRegex,((e,t)=>a(t))).replace(h.nestedRegex,n);return Object.keys(e).reduce(((r,a)=>{const o=e[a];if(o.constructor===Object)if(a.match(h.globalRegex))Object.assign(t||r,this.parseStyles(o,r,n,!0));else if((a.match(h.nestedRegex)||a.match(h.globalPrefixRegex))&&t){const e=i(a);t[e]={},Object.assign(t[e],this.parseStyles(o,t,e))}else{const e=i(a);r[e]={},Object.assign(r[e],this.parseStyles(o,r,e))}else r[a.includes("-")?a:(s=a,s.replace(/([A-Z])/g,(e=>`-${e[0].toLowerCase()}`)))]=o;var s;return r}),{})}toString(){const e=Object.assign({},this.attributes,{id:this.id}),t=Object.keys(e).map((t=>` ${t}="${e[t]}"`)),n=h.debug?"\n":"";return`<style${t.join("")}>${n}${this.render()}</style>${n}`}attach(){if(-1==h.registry.indexOf(this)&&h.registry.push(this),this.isBrowser()&&!document.getElementById(this.id)){const e=document.createElement("template");e.innerHTML=this.toString(),this.el=e.content.firstElementChild,document.head.appendChild(this.el)}return this}destroy(){const e=h.registry.indexOf(this);return e>-1&&h.registry.splice(e,1),this.isBrowser()&&this.el&&(this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=null),this}static toString(){return h.registry.join("")}static attach(){h.registry.forEach((e=>e.attach()))}static destroy(){h.registry.forEach((e=>e.destroy()))}}h.classRegex=/^\w+$/,h.globalRegex=/^@global$/,h.globalPrefixRegex=/^@global\s+/,h.referenceRegex=/\$(\w+)/g,h.nestedRegex=/&/g,h.prefix="fun",h.indent="    ",h.registry=[],h.uid=0,h.debug=!1;var u=["#f8f9fa","#f1f3f5","#e9ecef","#dee2e6","#ced4da","#adb5bd","#868e96","#495057","#343a40","#212529"],g=["#e7f5ff","#d0ebff","#a5d8ff","#74c0fc","#4dabf7","#339af0","#228be6","#1c7ed6","#1971c2","#1864ab"],p=["#f3f0ff","#e5dbff","#d0bfff","#b197fc","#9775fa","#845ef7","#7950f2","#7048e8","#6741d9","#5f3dc4"],f=["#fff5f5","#ffe3e3","#ffc9c9","#ffa8a8","#ff8787","#ff6b6b","#fa5252","#f03e3e","#e03131","#c92a2a"],m=["#fff9db","#fff3bf","#ffec99","#ffe066","#ffd43b","#fcc419","#fab005","#f59f00","#f08c00","#e67700"],b=["#ebfbee","#d3f9d8","#b2f2bb","#8ce99a","#69db7c","#51cf66","#40c057","#37b24d","#2f9e44","#2b8a3e"],y="#000000",v="#ffffff";const S=(e,t="xs",n="xl")=>{const r=["xs","sm","md","lg","xl","xxl","xxxl","xxxxl"];return r.slice(r.indexOf(t),r.indexOf(n)+1).reduce(((t,n,r)=>(Object.assign(t,e(n,r)),t)),{})},x=(e,t,n)=>S(((t,n)=>({[t]:e(t,n)})),t,n),w=e=>`@media (min-width: ${{sm:640,md:768,lg:1024,xl:1280,xxl:1536}[e]}px)`,k=e=>["primary","secondary","neutral","error","warning","success"].reduce(((t,n)=>(Object.assign(t,e(n)),t)),{}),E=(e,t,n,r)=>{const a=(t,a)=>({main:t(n[r]),light:t(n[r+-2]),dark:t(n[r+2]),contrastMain:t(r<6?y:v),contrastLight:t(r+-2<6?y:v),contrastDark:t(r+2<6?y:v),foregroundMain:t("light"===e?n[9]:n[2]),foregroundLight:t("light"===e?n[8]:v),foregroundDark:t("light"===e?y:n[3]),backgroundMain:t("light"===e?n[1]:n[8]),backgroundLight:t("light"===e?n[0]:n[7]),backgroundDark:t("light"===e?n[2]:n[9]),level1:"light"===e?`var(--rui-palette-${a}-light)`:`var(--rui-palette-${a}-dark)`,level2:`var(--rui-palette-${a}-main)`,level3:"light"===e?`var(--rui-palette-${a}-dark)`:`var(--rui-palette-${a}-light)`,contrastLevel1:"light"===e?`var(--rui-palette-${a}-contrastLight)`:`var(--rui-palette-${a}-contrastDark)`,contrastLevel2:`var(--rui-palette-${a}-contrastMain)`,contrastLevel3:"light"===e?`var(--rui-palette-${a}-contrastDark)`:`var(--rui-palette-${a}-contrastLight)`,foregroundLevel1:"light"===e?`var(--rui-palette-${a}-foregroundDark)`:`var(--rui-palette-${a}-foregroundLight)`,foregroundLevel2:`var(--rui-palette-${a}-foregroundMain)`,foregroundLevel3:"light"===e?`var(--rui-palette-${a}-foregroundLight)`:`var(--rui-palette-${a}-foregroundDark)`,backgroundLevel1:"light"===e?`var(--rui-palette-${a}-backgroundLight)`:`var(--rui-palette-${a}-backgroundDark)`,backgroundLevel2:`var(--rui-palette-${a}-backgroundMain)`,backgroundLevel3:"light"===e?`var(--rui-palette-${a}-backgroundDark)`:`var(--rui-palette-${a}-backgroundLight)`});return{...a((e=>e),t),rgb:a((e=>(e=>{const t=e.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null})(e).join(" ")),`${t}-rgb`)}},_=e=>"light"===e?{black:y,white:v,primary:E("light","primary",g,7),secondary:E("light","secondary",p,7),neutral:E("light","neutral",u,7),error:E("light","error",f,7),warning:E("light","warning",m,7),success:E("light","success",b,7)}:{black:y,white:v,primary:E("dark","primary",g,3),secondary:E("dark","secondary",p,3),neutral:E("dark","neutral",u,3),error:E("dark","error",f,3),warning:E("dark","warning",m,3),success:E("dark","success",b,3)},C=e=>{const t="0 0 #000",n="light"===e?"21 21 21":"0 0 0",r="light"===e?"0.2":"0.4";return{xs:`${t}, 0px 1px 2px 0px rgb(${n} / ${r})`,sm:`${t}, 0px 1px 2px 0px rgb(${n} / ${r}), 0px 2px 4px 0px rgb(${n} / ${r})`,md:`${t}, 0px 2px 8px -2px rgb(${n} / ${r}), 0px 6px 12px -2px rgb(${n} / ${r})`,lg:`${t}, 0px 2px 8px -2px rgb(${n} / ${r}), 0px 12px 16px -4px rgb(${n} / ${r})`,xl:`${t}, 0px 2px 8px -2px rgb(${n} / ${r}), 0px 20px 24px -4px rgb(${n} / ${r})`}},L=(x(((e,t)=>`${["0.75","0.875","1","1.125","1.25","1.5","1.875","2.25"][t]}rem`),"xs","xxxxl"),x(((e,t)=>200+100*(t+1))),x(((e,t)=>["1.33334","1.42858","1.5","1.55556","1.66667"][t])),x(((e,t)=>2+2*(t+1)+"px")),x(((e,t)=>4*(t+1)+"px"),"xs","xxxxl"),_("light"),C("light"),_("dark"),C("dark"),(e,t)=>((...e)=>new h(...e).attach())(e,{idPrefix:"rui",...t})),$=L({root:{display:"inline-flex",alignItems:"center",justifyContent:"space-evenly",borderRadius:"var(--rui-borderRadius-xs)",padding:"var(--rui-spacing-sm)",maxHeight:"100%",fontFamily:"var(--rui-typography-button-fontFamily)",fontWeight:"var(--rui-typography-button-fontWeight)",fontSize:"var(--rui-typography-button-fontSize)",lineHeight:"var(--rui-typography-button-lineHeight)",textTransform:"var(--rui-typography-button-textTransform)",textDecoration:"var(--rui-typography-button-textDecoration)",transition:"background-color 0.1s, color 0.1s, border-color 0.1s","&>svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"&>svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"&>svg:only-child":{padding:"0"}},...k((e=>({[e]:{}}))),disabled:{},solid:{...k((e=>({[`&$${e}`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-main)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,border:`1px solid var(--rui-palette-${e}-dark)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`}}}})))},outlined:{...k((e=>({[`&$${e}`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-main)`,backgroundColor:"transparent","&:hover":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.2)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,border:`1px solid rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,backgroundColor:"transparent"}}}})))},plain:{...k((e=>({[`&$${e}`]:{border:"none",background:"transparent",color:`var(--rui-palette-${e}-main)`,"&:hover":{color:`var(--rui-palette-${e}-dark)`},"&$disabled":{color:`rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`}}}})))},group:{"&:not(:first-child)":{marginLeft:-1,...k((e=>({[`&$solid$${e}`]:{borderLeftColor:`var(--rui-palette-${e}-dark)`}})))},"&:not(:first-child):not(:last-child)":{borderRadius:"0"},"&:first-child":{borderTopRightRadius:"0",borderBottomRightRadius:"0"},"&:last-child":{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}},lg:{fontSize:"var(--rui-fontSize-xl)"},sm:{fontSize:"var(--rui-fontSize-xs)"}}),A=d.uA.create`
    <button
        class="${({options:e})=>(e=>{const t=e.classes?{...$.classes,...e.classes}:$.classes;return[e.className||null,t.root,t[e.size||"md"],t[e.variant||"solid"],t[e.color||"neutral"],e.disabled?t.disabled:null,e.group?t.group:null].join(" ")})(e)}"
        onClick="${{"&":(e,t)=>t.options.onClick&&t.options.onClick(e,t)}}"
        href="${({options:e})=>e.href||!1}"
        type="${({options:e})=>e.type||!1}"
        value="${({options:e})=>e.type&&e.label||!1}"
        disabled="${({options:e})=>e.disabled||!1}"
        target="${({options:e})=>e.target||!1}"
        title="${({options:e})=>e.title||!1}"
    >
        ${e=>e.renderChildren()}
    </button>
`.extend({onCreate:function(){this.options.href?this.tag="a":this.options.type&&(this.tag="input")},renderChildren:function(){return this.options.type?null:this.options.renderChildren&&this.options.renderChildren()||[this.options.renderLeftIcon&&this.options.renderLeftIcon(),`<span>${this.options.label}</span>`,this.options.renderRightIcon&&this.options.renderRightIcon()]}}),j=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),N=L({root:{color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-md) 0"},h1:j("h1"),h2:j("h2"),h3:j("h3"),h4:j("h4"),titleLg:j("titleLg"),titleMd:j("titleMd"),titleSm:j("titleSm"),bodyLg:j("bodyLg"),bodyMd:j("bodyMd"),bodySm:j("bodySm"),caption:j("caption")}),R=d.uA.create`
    <p class="${({options:e})=>(e=>{const t=e.classes?{...N.classes,...e.classes}:N.classes;return[e.className||null,t.root,t[e.level||"bodyMd"]].join(" ")})(e)}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()||e.text}
    </p>
`.extend({preinitialize:function(e){switch(e.level){case"h1":this.tag="h1";break;case"h2":case"titleLg":case"titleMd":case"titleSm":this.tag="h2";break;case"h3":this.tag="h3";break;case"h4":this.tag="h4";break;default:this.tag="p"}}}),T=e=>`\n    <svg class="${e}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">\n        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>\n    </svg>\n`,O=e=>`\n    <svg class="${e}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">\n        <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"></path>\n    </svg>\n`,{classes:M}=L({root:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column",backgroundColor:"var(--rui-palette-neutral-backgroundLevel3)",boxShadow:"var(--rui-shadow-sm)",padding:"0 var(--rui-spacing-xl)",overflow:"hidden","@global":{h1:{textAlign:"center",margin:"var(--rui-app-appBarHeight) 0 0 0"},h2:{color:"var(--rui-palette-neutral-foregroundLevel2)",marginTop:0,marginBottom:"var(--rui-spacing-sm)"},h4:{color:"var(--rui-palette-neutral-foregroundLevel3)",marginBottom:"var(--rui-spacing-md)"},"h1 img":{width:"90%"},pre:{maxWidth:"100%"},code:{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"}}},buttons:{"& a":{margin:"var(--rui-spacing-md) var(--rui-spacing-xs)"},display:"flex",justifyContent:"center"},[w("sm")]:{"$root h1":{margin:"var(--rui-app-appBarHeight) 0 0 0"},"$root h2":{marginBottom:"var(--rui-spacing-xl)"},"$root h4":{marginBottom:"var(--rui-spacing-xxl)"},"$root h1 img":{width:"60%"},"$buttons a":{margin:"var(--rui-spacing-xxxl) var(--rui-spacing-lg)"}},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-secondary-main)"},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),I=d.uA.create`
    <section class="${M.root}">
        <h1>
            <img class="${M.hiddenIfLight}" alt="CSSFUN" src="/logo-dark.svg">
            <img class="${M.hiddenIfDark}" alt="CSSFUN" src="/logo.svg">
        </h1>
        ${()=>R.mount({level:"h2",text:"Next-Generation CSS-in-JS library"})}
        ${()=>R.mount({level:"h4",text:"Write modular <strong>CSS</strong> within your <strong>JavaScript</strong> code with built-in <strong>themes</strong> and <strong>SSR</strong> support."})}
        ${"<pre><code class=\"javascript language-javascript\">\nconst { classes } = css({\n    button : {\n        backgroundColor : 'blue',\n        color : 'white',\n        padding : '10px',\n        borderRadius : '5px'\n    }\n});\n\nconst Button = () =&gt; &lt;button className={classes.button}&gt;Click me&lt;/button&gt;;\n</code></pre>"}
        <div class="${M.buttons}">
            ${()=>A.mount({label:"Getting Started",color:"primary",variant:"outlined",href:"#gettingstarted"})}
            ${()=>A.mount({label:"GitHub",color:"secondary",variant:"outlined",href:"https://github.com/8tentaculos/cssfun",target:"_blank",renderLeftIcon:()=>T(M.icon)})}
        </div>
    </section>
`,z=e=>e.charAt(0).toUpperCase()+e.slice(1),D=L({root:{borderRadius:"var(--rui-borderRadius-xs)",padding:"var(--rui-spacing-md)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",fontFamily:"var(--rui-fontFamily-body)",fontSize:"var(--rui-fontSize-bodyMd)"},...k((e=>({[e]:{color:`var(--rui-palette-${e}-foregroundMain)`}}))),outlined:{...k((e=>({[`&$${e}`]:{border:`1px solid rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`}})))},solid:{...k((e=>({[`&$${e}`]:{backgroundColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`}})))},...S((e=>({[`shadow${z(e)}`]:{boxShadow:`var(--rui-shadow-${e})`}})))}),H=d.uA.create`
    <section class="${({options:e})=>(e=>{const t=e.classes?{...D.classes,...e.classes}:D.classes;return[e.className||null,t.root,t[e.variant||"outlined"],t[e.color||"neutral"],e.shadow?t[`shadow${z(e.shadow)}`]:null].join(" ")})(e)}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </section>
`,B=L({root:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgb(var(--rui-palette-neutral-rgb-level3) / 0.1)",zIndex:1e3,padding:"var(--rui-spacing-md)"},modal:{position:"relative",padding:"var(--rui-spacing-xs)"},left:{justifyContent:"flex-start"},right:{justifyContent:"flex-end"},top:{alignItems:"flex-start"},bottom:{alignItems:"flex-end"},header:{display:"flex",justifyContent:"flex-end",marginBottom:"var(--rui-spacing-sm)","& button":{margin:0,padding:0,borderRadius:"50%"}},content:{padding:"var(--rui-spacing-sm)",marginBottom:"var(--rui-spacing-md)"},footer:{display:"flex",justifyContent:"space-evenly",marginBottom:"var(--rui-spacing-sm)"}}),W=d.uA.create`
    <div class="${({options:e})=>U(e).header}">
        ${({options:e})=>A.mount({renderChildren:()=>'\n    <svg class="undefined" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">\n        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>\n    </svg>\n',onClick:e.handleClose&&e.handleClose,color:"neutral",variant:"outlined",size:"sm"})}
    </div>
`,P=d.uA.create`
    <div class="${({options:e})=>U(e).content}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`,F=d.uA.create`
    <div class="${({options:e})=>U(e).footer}">
        ${({options:e})=>e.renderChildren&&e.renderChildren()}
    </div>
`,U=e=>e.classes?{...B.classes,...e.classes}:B.classes,Z=({variant:e,color:t,shadow:n})=>({variant:e,color:t,shadow:n}),G=d.uA.create`
    <div
        class="${({options:e})=>(e=>{const t=U(e);return[e.className||null,t.root,e.top?t.top:null,e.bottom?t.bottom:null,e.left?t.left:null,e.right?t.right:null].join(" ")})(e)}"
        onClick=${{"&":function(e){this.options.handleClose&&e.target===this.el&&this.options.handleClose()}}}
    >
        ${({options:e})=>H.mount({...Z(e),className:U(e).modal,renderChildren:e.renderChildren?e.renderChildren:()=>[e.handleClose?W.mount(e):null,P.mount({...e,renderChildren:e.renderContent}),e.renderButtons?F.mount({...e,renderChildren:e.renderButtons}):null]})}
    </div>
`,{classes:K}=L({root:{display:"flex",justifyContent:"right",alignItems:"center",height:"60px","& ul":{padding:0}},icon:{width:"24px",height:"24px",cursor:"pointer",fill:"var(--rui-palette-neutral-main)","&:hover":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),X=d.uA.create`
    <div class="${K.root}">
        <ul>
            <li class="${K.hiddenIfDark}">
                ${()=>A.mount({variant:"plain",renderChildren:()=>`\n    <svg class="${K.icon}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">\n        <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z"/>\n    </svg>\n`,onClick:()=>document.documentElement.setAttribute("data-color-scheme","dark")})}
            </li>
            <li class="${K.hiddenIfLight}">
                ${()=>A.mount({variant:"plain",renderChildren:()=>`\n    <svg class="${K.icon}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">\n        <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"/>\n    </svg>\n`,onClick:()=>document.documentElement.setAttribute("data-color-scheme","light")})}
            </li>
        </ul>
    </div>
`,{classes:q}=L({root:{display:"flex",alignItems:"center",justifyContent:"space-between",height:"var(--rui-app-appBarHeight)",position:"fixed",top:0,left:0,right:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",boxShadow:"var(--rui-shadow-sm)","& nav":{maxWidth:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center","& ul":{display:"flex",justifyContent:"center",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"0 var(--rui-spacing-xs)"}}},"& nav$left":{flexGrow:1,justifyContent:"flex-start","& ul":{justifyContent:"flex-start"}},"& nav$lg":{display:"none"}},[w("sm")]:{"$root nav$lg":{display:"flex"},"$root li$sm":{display:"none"}},left:{},sm:{},lg:{},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-neutral-main)","a:hover &":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"},menuContent:{"& nav":{maxWidth:"100%",display:"flex",justifyContent:"flex-end",alignItems:"center","& ul":{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"var(--rui-spacing-xs)"}}}}}),Y=d.uA.create`
    <div class="${q.menuContent}">
        ${({options:e})=>["<nav><ul><li>",A.mount({href:"/api/",onClick:t=>{t.preventDefault(),e.handleNavigate("/api/"),e.handleOpen(!1)},label:"API",variant:"plain"}),"</li><li>",A.mount({href:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",onClick:t=>{e.handleOpen(!1)},target:"_blank",label:"Playground",variant:"plain"}),"</li><li>",A.mount({href:"https://github.com/8tentaculos/cssfun",onClick:t=>{e.handleOpen(!1)},target:"_blank",label:"GitHub",variant:"plain",renderLeftIcon:()=>T(q.icon)}),"</li><li>",A.mount({href:"https://www.npmjs.com/package/cssfun",onClick:t=>{e.handleOpen(!1)},target:"_blank",label:"npm",variant:"plain",renderLeftIcon:()=>O(q.icon)}),"</li></ul></nav>"]}
    </div>
`,J=d.uA.create`
    <div class="">
        ${({options:e})=>A.mount({renderChildren:()=>'\n    <svg class="undefined" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">\n        <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>\n    </svg>\n',color:"primary",variant:"plain",size:"lg",onClick:()=>e.handleOpen(!0)})}
        ${({options:e})=>e.open?G.mount({handleClose:()=>e.handleOpen(!1),renderContent:e.renderContent,shadow:"lg"}):null}
    </div>
`,V=d.uA.create`
    <div class="${q.root}">
        <nav class="${q.left}">
            <ul>
                <li>
                    ${({options:e})=>A.mount({href:"/",onClick:t=>{t.preventDefault(),e.handleNavigate("/")},variant:"plain",renderChildren:()=>`\n                            <span>\n                                <img height="24" class="${q.hiddenIfLight}" alt="CSSFUN" src="/logo-dark.svg">\n                                <img height="24" class="${q.hiddenIfDark}" alt="CSSFUN" src="/logo.svg">\n                            </span>\n                        `})}
                </li>
            </ul>
        </nav>
        <nav class="${q.lg}">
            <ul>
                <li>
                    ${({options:e})=>A.mount({href:"/api/",onClick:t=>{t.preventDefault(),e.handleNavigate("/api/")},label:"API",variant:"plain"})}
                </li>
                <li>
                    ${()=>A.mount({href:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",target:"_blank",label:"Playground",variant:"plain"})}
                </li>
                <li>
                    ${()=>A.mount({href:"https://github.com/8tentaculos/cssfun",target:"_blank",variant:"plain",renderChildren:()=>T(q.icon)})}
                </li>
                <li>
                    ${()=>A.mount({href:"https://www.npmjs.com/package/cssfun",target:"_blank",variant:"plain",renderChildren:()=>O(q.icon)})}
                </li>
            </ul>
        </nav>
        <nav>
            <ul>
                <li>
                    ${()=>X.mount()}
                </li>
                <li class="${q.sm}">
                    ${e=>J.mount({open:e.state.open,handleOpen:t=>{e.state.open=t},renderContent:()=>Y.mount({handleNavigate:e.options.handleNavigate,handleOpen:t=>{e.state.open=t}})})}
                </li>
            </ul>
        </nav>
    </div>
`.extend({preinitialize(){this.state=new d.Kx({open:!1})}}),Q=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:ee}=L({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-dark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Q("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Q("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center","& section":{"& h5":{margin:"var(--rui-spacing-xs) 0",padding:"0"},margin:"var(--rui-spacing-md)"}},[w("md")]:{$root:{justifyContent:"space-between"},"$root section":{maxWidth:"400px"}}}),te=d.uA.create`
            <section class="${({options:e})=>(e=>[e.className||null,ee.root].join(" "))(e)}">${()=>[H.mount({shadow:"md",renderChildren:()=>'<h5 id="componentscopedstyles">Component-Scoped Styles ✨</h5>\n<p><strong>CSSFUN</strong> scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic \n  and styling in the same file for easier management.</p>'}),H.mount({shadow:"md",renderChildren:()=>'<h5 id="frameworkagnostic">Framework-Agnostic 🌐</h5>\n<p><strong>CSSFUN</strong> works with any framework, whether it’s React, Vue, or vanilla JavaScript. At just <strong>1.5KB</strong>, it adds \n  minimal overhead to your projects.</p>'}),H.mount({shadow:"md",renderChildren:()=>'<h5 id="nobuildtoolsrequired">No Build Tools Required 🛠️</h5>\n<p><strong>CSSFUN</strong> can be used directly in the browser, eliminating the need for complex build tools or configurations.</p>'}),H.mount({shadow:"md",renderChildren:()=>'<h5 id="serversiderenderingssrsupport">Server-Side Rendering (SSR) Support 🚀</h5>\n<p><strong>CSSFUN</strong> supports <a href="#serversiderenderingssr">server-side rendering</a> out of the box, optimizing initial load \n  times without duplicating styles.</p>'}),H.mount({shadow:"md",renderChildren:()=>'<h5 id="builtinthememanagement">Built-in Theme Management 🎨</h5>\n<p>With built-in <a href="#themes">theme support</a>, <strong>CSSFUN</strong> uses <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS variables</a> \n  to manage light, dark, and system color schemes. Themes update automatically based on user preferences, no re-renders needed.</p>'})]}</section>
        `,ne=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:re}=L({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-dark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...ne("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...ne("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}}}}),ae=d.uA.create`
            <section class="${({options:e})=>(e=>[e.className||null,re.root].join(" "))(e)}"><h2 id="gettingstarted">Getting Started</h2>
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    .fun-1-root-1 \{
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    .fun-1-button-1 \{
        background-color: white;
    \}
    .fun-1-button-1:hover \{
        background-color: black;
    \}
    .fun-1-button-1 span \{
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    .fun-1-button-1 \{
        background-color: white;
    \}
    .fun-1-button-1:active \{
        background-color: black;
    \}
    .fun-1-button-1:active:hover \{
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    .fun-1-button-1 \{
        background-color: white;
    \}
    .fun-1-button-1:hover \{
        background-color: black;
    \}
    .fun-1-button-1 span \{
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    body \{
        background-color : black;
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    .fun-1-root-1 a \{
        color : black;
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    body \{
        background-color : black;
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
<pre><code class="html language-html">&lt;style id="fun-1"&gt;
    .fun-1-root-1 a \{
        color : black;
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
        `,ie=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:oe}=L({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-dark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...ie("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...ie("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},marginTop:"var(--rui-app-appBarHeight)"}}),se=d.uA.create`
            <section class="${({options:e})=>(e=>[e.className||null,oe.root].join(" "))(e)}"><h2 id="classes">Classes</h2>
<dl>
<dt><a href="#stylesheet">StyleSheet</a></dt>
<dd></dd>
</dl>
<h2 id="functions">Functions</h2>
<dl>
<dt><a href="#createtheme">createTheme(themes, options)</a> ⇒ <code><a href="#stylesheet">StyleSheet</a></code></dt>
<dd><p>The <code>createTheme</code> function creates a theme StyleSheet instance.
It supports light, dark, and system color schemes.</p>
</dd>
<dt><a href="#css">css(styles)</a> ⇒ <code><a href="#stylesheet">StyleSheet</a></code></dt>
<dd><p>Creates a new StyleSheet instance and attaches it to the DOM.</p>
</dd>
</dl>
<p><a name="stylesheet" id="stylesheet"></a></p>
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
<td><code>Number</code></td>
<td>The unique identifier used to generate class names.  It will be incremented on each generated class name.</td>
</tr>
<tr>
<td>id</td>
<td><code>String</code></td>
<td>The unique identifier for the stylesheet. It will be used as the  style element id. It will be generated by <code>this.generateId</code> or can be set on <code>options.attributes.id</code>.</td>
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
<li><a href="#stylesheet__generateid">.generateId()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__generateclassname">.generateClassName(className)</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__tostring">.toString()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__attach">.attach()</a> ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></li>
<li><a href="#stylesheet__destroy">.destroy()</a> ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></li></ul></li>
<li><em>static</em><ul>
<li><a href="#stylesheet_prefix">.prefix</a></li>
<li><a href="#stylesheet_indent">.indent</a></li>
<li><a href="#stylesheet_registry">.registry</a></li>
<li><a href="#stylesheet_uid">.uid</a></li>
<li><a href="#stylesheet_debug">.debug</a></li>
<li><a href="#stylesheet_tostring">.toString()</a> ⇒ <code>string</code></li>
<li><a href="#stylesheet_attach">.attach()</a></li>
<li><a href="#stylesheet_destroy">.destroy()</a></li></ul></li></ul></li>
</ul>
<p><a name="new_stylesheet_new" id="new_stylesheet_new"></a></p>
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
<td>The options object.   <code>options.idPrefix</code>, <code>options.generateClassName</code>, <code>options.generateId</code>,  <code>options.attributes</code> and <code>options.renderers</code> will be added to the instance.</td>
</tr>
<tr>
<td>options.idPrefix</td>
<td><code>String</code></td>
<td>The generated id prefix. By default, it's <code>StyleSheet.prefix</code>.</td>
</tr>
<tr>
<td>options.generateId</td>
<td><code>function</code></td>
<td>The function to generate ids. This id will be used  as the <code>&lt;style&gt;</code> element id.</td>
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
<p><a name="stylesheet__generateid" id="stylesheet__generateid"></a></p>
<h3 id="stylesheetgenerateidc20c">styleSheet.generateId() ⇒ <code>String</code></h3>
<p>Generate a unique identifier. Used for the style element id.
May be overridden by <code>options.generateId</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The unique identifier.<br />
<a name="stylesheet__generateclassname" id="stylesheet__generateclassname"></a></p>
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
<p><a name="stylesheet__tostring" id="stylesheet__tostring"></a></p>
<h3 id="stylesheettostringc27c">styleSheet.toString() ⇒ <code>String</code></h3>
<p>Render the StyleSheet as a style element string.
Used for server-side rendering.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The instance as a string.<br />
<a name="stylesheet__attach" id="stylesheet__attach"></a></p>
<h3 id="stylesheetattachc30cstylesheet">styleSheet.attach() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
<p>Add the instance to the registry and if we are in the browser, 
attach it to the DOM.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The instance.<br />
<a name="stylesheet__destroy" id="stylesheet__destroy"></a></p>
<h3 id="stylesheetdestroyc33cstylesheet">styleSheet.destroy() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
<p>Destroy the instance and remove it from the registry and 
from the DOM, if it's present.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The instance.<br />
<a name="stylesheet_prefix" id="stylesheet_prefix"></a></p>
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
<p><a name="stylesheet_indent" id="stylesheet_indent"></a></p>
<h3 id="stylesheetindent">StyleSheet.indent</h3>
<p><strong>Kind</strong>: static property of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Default</strong>: <code>4 spaces</code><br />
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
<p><a name="stylesheet_registry" id="stylesheet_registry"></a></p>
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
<p><a name="stylesheet_uid" id="stylesheet_uid"></a></p>
<h3 id="stylesheetuid">StyleSheet.uid</h3>
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
<td>uid</td>
<td><code>Number</code></td>
<td>The unique identifier counter.  It will be incremented for each generated id.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet_debug" id="stylesheet_debug"></a></p>
<h3 id="stylesheetdebug">StyleSheet.debug</h3>
<p><strong>Kind</strong>: static property of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Default</strong>: <code>false
If true, the CSS will be formatted with new lines and indents.</code><br />
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
<td>The debug flag.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet_tostring" id="stylesheet_tostring"></a></p>
<h3 id="stylesheettostringc49c">StyleSheet.toString() ⇒ <code>string</code></h3>
<p>Render all instances in the registry as a string.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - All instances in the registry as a string.<br />
<a name="stylesheet_attach" id="stylesheet_attach"></a></p>
<h3 id="stylesheetattach">StyleSheet.attach()</h3>
<p>Attach all instances in the registry to the DOM.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<a name="stylesheet_destroy" id="stylesheet_destroy"></a></p>
<h3 id="stylesheetdestroy">StyleSheet.destroy()</h3>
<p>Destroy all instances in the registry and remove them from 
it and from the DOM.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<a name="createtheme" id="createtheme"></a></p>
<h2 id="createthemethemesoptionsc54cstylesheet">createTheme(themes, options) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
<p>The <code>createTheme</code> function creates a theme StyleSheet instance.
It supports light, dark, and system color schemes.</p>
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
<td>An object containing light and dark themes: <code>\{ light, dark \}</code>.  Each theme object will be converted to CSS variables available under the <code>root</code> class  of the theme StyleSheet instance.   For example: <code>\{ backgroundLevel1: 'black' \}</code> will be converted to <code>--fun-backgroundLevel1</code>.   You can add the <code>root</code> class to the root element of your component to theme a single component,  or to the <code>body</code> element to theme the entire page.</td>
</tr>
<tr>
<td>options</td>
<td><code>Object</code></td>
<td>An options object.</td>
</tr>
<tr>
<td>options.colorScheme</td>
<td><code>String</code></td>
<td>The color scheme. Possible values are <code>light</code>, <code>dark</code>, and <code>system</code>.  If <code>light</code> or <code>dark</code> is set, the theme will be fixed to that color scheme, and only the necessary CSS variables  will be generated. The CSS color-scheme property will be set to that value. If <code>system</code> is set, the theme will be generated for both light and dark color schemes,  and by default, it will follow the system color scheme. The CSS color-scheme property will be set to <code>light</code> or <code>dark</code> accordingly. To override the system color scheme, set the <code>data-color-scheme</code> attribute to <code>light</code>  or <code>dark</code> on a parent element.</td>
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
<p><a name="css" id="css"></a></p>
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
        `,{classes:le}=L({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-xl) 0 var(--rui-spacing-xxxxl) 0",borderTop:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)","@global":{a:{color:"var(--rui-palette-neutral-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-neutral-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-neutral-dark)"}}}},text:{color:"var(--rui-palette-neutral-foregroundLevel3)"}}),ce=d.uA.create`
    <footer class="${le.root}">
        ${()=>R.mount({level:"titleMd",className:le.text,renderChildren:()=>'Released under the <a href="https://github.com/8tentaculos/cssfun/blob/master/LICENSE" target="_blank">MIT License</a>'})}
        ${()=>R.mount({level:"titleSm",className:le.text,renderChildren:()=>`Copyright © ${(()=>{const e=(new Date).getFullYear();return 2024===e?e:`2024-${e}`})()} <a href="https://github.com/8tentaculos" target="_blank">8tentaculos</a>`})}
    </footer>
`,{classes:de}=L({"@global":{body:{margin:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)"}},root:{}}),he=(e="")=>{const t=e.match(/\/([^/]+)\//),n=t?t[1]:e;return["api"].includes(n)?n:""};d.uA.create`
    <div class="${de.root}">
        ${e=>V.mount({handleNavigate:e.navigate.bind(e)})}

        ${({state:e})=>"api"===e.route?se.mount():[I.mount(),te.mount(),ae.mount()]}

        ${()=>ce.mount()}
    </div>
`.extend({preinitialize(e={}){this.state=new d.Kx({route:he(e.route)}),"undefined"!=typeof window&&(window.history.replaceState({route:this.state.route},""),window.addEventListener("popstate",(e=>{e.state&&(this.state.route=he(e.state.route))})))},navigate(e){this.state.route=he(e),window.history.pushState({route:this.state.route},"",this.state.route?`/${this.state.route}/`:"/"),document.title=this.getTitle(),window.scrollTo(0,0)},getTitle(){return"CSSFUN"+("api"===this.state.route?" - API Documentation":"")}}).mount({route:window.location.pathname,onRender:t=>{e.highlightAll()}},document.getElementById("root"),!0)})()})();