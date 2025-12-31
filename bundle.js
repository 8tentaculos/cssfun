(()=>{"use strict";var e={663(e,t){t.wE=function(e,t={}){const{encode:a=encodeURIComponent,delimiter:r=s}=t,n=p(("object"==typeof e?e:d(e,t)).tokens,r,a);return function(e={}){const[t,...s]=n(e);if(s.length)throw new TypeError(`Missing parameters: ${s.join(", ")}`);return t}},t.YW=function(e,t={}){const{decode:r=decodeURIComponent,delimiter:n=s}=t,{regexp:o,keys:l}=function(e,t={}){const{delimiter:a=s,end:r=!0,sensitive:n=!1,trailing:o=!0}=t,l=[],c=n?"":"i",p=[];for(const s of h(e,[])){const e="object"==typeof s?s:d(s,t);for(const t of u(e.tokens,0,[]))p.push(g(t,a,l,e.originalPath))}let m=`^(?:${p.join("|")})`;return o&&(m+=`(?:${i(a)}$)?`),m+=r?"$":`(?=${i(a)}|$)`,{regexp:new RegExp(m,c),keys:l}}(e,t),c=l.map(e=>!1===r?a:"param"===e.type?r:e=>e.split(n).map(r));return function(e){const t=o.exec(e);if(!t)return!1;const s=t[0],a=Object.create(null);for(let e=1;e<t.length;e++){if(void 0===t[e])continue;const s=l[e-1],r=c[e-1];a[s.name]=r(t[e])}return{path:s,params:a}}};const s="/",a=e=>e,r=/^[$_\p{ID_Start}]$/u,n=/^[$\u200c\u200d\p{ID_Continue}]$/u,o={"{":"{","}":"}","(":"(",")":")","[":"[","]":"]","+":"+","?":"?","!":"!"};function i(e){return e.replace(/[.+*?^${}()[\]|/\\]/g,"\\$&")}class l{constructor(e,t){this.tokens=e,this.originalPath=t}}class c extends TypeError{constructor(e,t){let s=e;t&&(s+=`: ${t}`),s+="; visit https://git.new/pathToRegexpError for info",super(s),this.originalPath=t}}function d(e,t={}){const{encodePath:s=a}=t,i=[...e],d=[];let p=0,h=0;function u(){let t="";if(r.test(i[p]))do{t+=i[p++]}while(n.test(i[p]));else if('"'===i[p]){let s=p;for(;p++<i.length;){if('"'===i[p]){p++,s=0;break}"\\"===i[p]&&p++,t+=i[p]}if(s)throw new c(`Unterminated quote at index ${s}`,e)}if(!t)throw new c(`Missing parameter name at index ${p}`,e);return t}for(;p<i.length;){const e=i[p],t=o[e];t?d.push({type:t,index:p++,value:e}):"\\"===e?d.push({type:"escape",index:p++,value:i[p++]}):":"===e?d.push({type:"param",index:p++,value:u()}):"*"===e?d.push({type:"wildcard",index:p++,value:u()}):d.push({type:"char",index:p++,value:e})}return d.push({type:"end",index:p,value:""}),new l(function t(a){const r=[];for(;;){const n=d[h++];if(n.type===a)break;if("char"===n.type||"escape"===n.type){let e=n.value,t=d[h];for(;"char"===t.type||"escape"===t.type;)e+=t.value,t=d[++h];r.push({type:"text",value:s(e)});continue}if("param"!==n.type&&"wildcard"!==n.type){if("{"!==n.type)throw new c(`Unexpected ${n.type} at index ${n.index}, expected ${a}`,e);r.push({type:"group",tokens:t("}")})}else r.push({type:n.type,name:n.value})}return r}("end"),e)}function p(e,t,s){const r=e.map(e=>function(e,t,s){if("text"===e.type)return()=>[e.value];if("group"===e.type){const a=p(e.tokens,t,s);return e=>{const[t,...s]=a(e);return s.length?[""]:[t]}}const r=s||a;return"wildcard"===e.type&&!1!==s?s=>{const a=s[e.name];if(null==a)return["",e.name];if(!Array.isArray(a)||0===a.length)throw new TypeError(`Expected "${e.name}" to be a non-empty array`);return[a.map((t,s)=>{if("string"!=typeof t)throw new TypeError(`Expected "${e.name}/${s}" to be a string`);return r(t)}).join(t)]}:t=>{const s=t[e.name];if(null==s)return["",e.name];if("string"!=typeof s)throw new TypeError(`Expected "${e.name}" to be a string`);return[r(s)]}}(e,t,s));return e=>{const t=[""];for(const s of r){const[a,...r]=s(e);t[0]+=a,t.push(...r)}return t}}function h(e,t){if(Array.isArray(e))for(const s of e)h(s,t);else t.push(e);return t}function*u(e,t,s){if(t===e.length)return yield s;const a=e[t];if("group"===a.type)for(const r of u(a.tokens,0,s.slice()))yield*u(e,t+1,r);else s.push(a);yield*u(e,t+1,s)}function g(e,t,s,a){let r="",n="",o=!0;for(const l of e)if("text"!==l.type)if("param"!==l.type&&"wildcard"!==l.type);else{if(!o&&!n)throw new c(`Missing text before "${l.name}" ${l.type}`,a);"param"===l.type?r+=`(${m(t,o?"":n)}+)`:r+="([\\s\\S]+)",s.push(l),n="",o=!1}else r+=i(l.value),n+=l.value,o||(o=l.value.includes(t));return r}function m(e,t){return t.length<2?e.length<2?`[^${i(e+t)}]`:`(?:(?!${i(e)})[^${i(t)}])`:e.length<2?`(?:(?!${i(t)})[^${i(e)}])`:`(?:(?!${i(t)}|${i(e)})[\\s\\S])`}}},t={};function s(e){if("function"!=typeof e){throw new TypeError("Event listener must be a function")}}class a{on(e,t){return s(t),this.listeners||(this.listeners={}),this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t),()=>this.off(e,t)}once(e,t){s(t);const a=(...s)=>{t(...s),this.off(e,a)};return this.on(e,a)}off(e,t){this.listeners&&(e?this.listeners[e]&&(t?(this.listeners[e]=this.listeners[e].filter(e=>e!==t),this.listeners[e].length||delete this.listeners[e]):delete this.listeners[e],Object.keys(this.listeners).length||delete this.listeners):delete this.listeners)}emit(e,...t){this.listeners&&this.listeners[e]&&this.listeners[e].slice().forEach(e=>e(...t))}listenTo(e,t,s){return e.on(t,s),this.listeningTo||(this.listeningTo=[]),this.listeningTo.push({emitter:e,type:t,listener:s}),()=>this.stopListening(e,t,s)}listenToOnce(e,t,a){s(a);const r=(...s)=>{a(...s),this.stopListening(e,t,r)};return this.listenTo(e,t,r)}stopListening(e,t,s){this.listeningTo&&(this.listeningTo=this.listeningTo.filter(a=>!(!e||e===a.emitter&&!t||e===a.emitter&&t===a.type&&!s||e===a.emitter&&t===a.type&&s===a.listener)||(a.emitter.off(a.type,a.listener),!1)),this.listeningTo.length||delete this.listeningTo)}}const r=(e,t,...s)=>"function"!=typeof e?e:e.apply(t,s);class n extends a{constructor(){super(),this.preinitialize.apply(this,arguments),this.attributes=Object.assign({},r(this.defaults,this),this.parse.apply(this,arguments)),this.previous={},Object.keys(this.attributes).forEach(this.defineAttribute.bind(this))}preinitialize(){}defineAttribute(e){Object.defineProperty(this,`${this.constructor.attributePrefix}${e}`,{get:()=>this.get(e),set:t=>{this.set(e,t)}})}get(e){return this.attributes[e]}set(e,t,...s){let a,r;"object"==typeof e?(a=e,r=[t,...s]):(a={[e]:t},r=s);const n=this._changing;this._changing=!0;const o={};n||(this.previous=Object.assign({},this.attributes)),Object.keys(a).forEach(e=>{a[e]!==this.attributes[e]&&(o[e]=a[e],this.attributes[e]=a[e])});const i=Object.keys(o);if(i.length&&(this._pending=["change",this,o,...r]),i.forEach(e=>{this.emit(`change:${e}`,this,a[e],...r)}),n)return this;for(;this._pending;){const e=this._pending;this._pending=null,this.emit.apply(this,e)}return this._pending=null,this._changing=!1,this}parse(e){return e}toJSON(){return Object.assign({},this.attributes)}}n.attributePrefix="";const o=["el","tag","attributes","events","model","template","onDestroy"];class i extends a{constructor(e={}){super(),this.preinitialize.apply(this,arguments),this.delegatedEventListeners=[],this.children=[],this.destroyQueue=[],this.viewOptions=[],o.forEach(t=>{t in e&&(this[t]=e[t],this.viewOptions.push(t))}),this.ensureUid(),this.ensureElement()}preinitialize(){}$(e){return this.el.querySelector(e)}$$(e){return this.el.querySelectorAll(e)}destroy(){return this.destroyChildren(),this.undelegateEvents(),this.stopListening(),this.off(),this.destroyQueue.forEach(e=>e()),this.destroyQueue=[],this.onDestroy.apply(this,arguments),this.destroyed=!0,this}onDestroy(){}addChild(e){return this.children.push(e),e}destroyChildren(){this.children.forEach(e=>e.destroy()),this.children=[]}ensureUid(){this.uid||(this.uid="r"+ ++i.uid)}ensureElement(){if(this.el)this.el=r(this.el,this);else{const e=r(this.tag,this),t=r(this.attributes,this);this.el=this.createElement(e,t)}this.delegateEvents()}createElement(e="div",t={}){let s=document.createElement(e);return Object.keys(t).forEach(e=>s.setAttribute(e,t[e])),s}removeElement(){return this.el.parentNode.removeChild(this.el),this}delegateEvents(e){if(e||(e=r(this.events,this)),!e)return this;this.delegatedEventListeners.length&&this.undelegateEvents();let t={};return Object.keys(e).forEach(a=>{const r=a.split(" "),n=r.shift(),o=r.join(" ");let i=e[a];"string"==typeof i&&(i=this[i]),s(i),t[n]||(t[n]=[]),t[n].push({selector:o,listener:i})}),Object.keys(t).forEach(e=>{const s=s=>{t[e].forEach(({selector:e,listener:t})=>{if(!e)return void t.call(this,s,this,this.el);let a=s.target;for(;a&&a!==this.el;)a.matches&&a.matches(e)&&t.call(this,s,this,a),a=a.parentElement})};this.delegatedEventListeners.push({type:e,listener:s}),this.el.addEventListener(e,s)}),this}undelegateEvents(){return this.delegatedEventListeners.forEach(({type:e,listener:t})=>{this.el.removeEventListener(e,t)}),this.delegatedEventListeners=[],this}render(){return this}static sanitize(e){return`${e}`.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[e]))}static resetUid(){i.uid=0}}i.uid=0;class l{constructor(e){this.value=e}toString(){return this.value}}class c{constructor(e){this.items=e}}class d{constructor(){this.listeners=[],this.types=new Set,this.previousSize=0}addListener(e,t){return this.types.add(t),this.listeners.push(e),this.listeners.length-1}reset(){this.listeners=[],this.previousSize=this.types.size}hasPendingTypes(){return this.types.size>this.previousSize}}const p=["value","checked","selected"];class h{constructor(e){this.getSelector=e.getSelector,this.getAttributes=e.getAttributes,this.previousAttributes={}}hydrate(e){this.ref=e.querySelector(this.getSelector())}update(){const e=this.getAttributes(),{remove:t,add:s}=function(e,t={}){const s={},a=[];return Object.keys(e).forEach(a=>{let r=e[a];r!==t[a]&&(!0===r?s[a]="":!1!==r&&(null==r&&(r=""),s[a]=r))}),Object.keys(t).forEach(s=>{(!(s in e)||t[s]!==e[s]&&!1===e[s])&&a.push(s)}),{add:s,remove:a}}(e,this.previousAttributes);this.previousAttributes=e,t.forEach(e=>{this.ref.removeAttribute(e),-1!==p.indexOf(e)&&e in this.ref&&(this.ref[e]="value"===e&&"")}),Object.keys(s).forEach(e=>{const t=s[e];this.ref.setAttribute(e,t),-1!==p.indexOf(e)&&e in this.ref&&(this.ref[e]="value"===e?t:!1!==t&&"false"!==t)})}}class u{constructor(){}reset(){this.paused=0,this.previous=this.tracked||new Map,this.tracked=new Map,this.positionStack=[0]}push(){this.positionStack.push(0)}pop(){this.positionStack.pop()}increment(){this.positionStack[this.positionStack.length-1]++}pause(){this.paused++}resume(){this.paused--}getPath(){return this.positionStack.join("-")}track(e){return 0===this.paused&&this.tracked.set(this.getPath(),e),e}hasSingleComponent(){if(1!==this.tracked.size||1!==this.previous.size)return!1;const[e,t]=this.tracked.entries().next().value,[s,a]=this.previous.entries().next().value;return"0"===e&&"0"===s&&t===a}findRecyclable(e){const t=this.previous.get(this.getPath());return t&&!t.key&&t.constructor===e.constructor?t:null}}const g=["value","checked","selected"];function m(e,t,s=()=>!1,a){let r=a||e.firstChild;for(;r;){if(r.nodeType===Node.COMMENT_NODE&&r.data.trim()===t)return r;if(r.nodeType!==Node.ELEMENT_NODE||s(r)||!r.firstChild){for(;r&&!r.nextSibling;)if(r=r.parentNode,!r||r===e)return null;r&&(r=r.nextSibling)}else r=r.firstChild}return null}class f{constructor(e){this.getStart=e.getStart,this.getEnd=e.getEnd,this.expression=e.expression,this.shouldSkipFind=e.shouldSkipFind,this.shouldSkipSync=e.shouldSkipSync,this.tracker=new u}hydrate(e){const t=m(e,this.getStart(),this.shouldSkipFind),s=m(e,this.getEnd(),this.shouldSkipFind,t);this.ref=[t,s]}update(e,t){let s;const[a,r]=this.ref,n=a.nextSibling,o=n===r,i=!o&&n.nextSibling===r;if(o?r.parentNode.insertBefore(e,r):!i||1!==e.children.length||this.shouldSkipSync(n)||this.shouldSkipSync(e.firstChild)?(s=document.createComment(""),r.parentNode.insertBefore(s,r),r.parentNode.insertBefore(e,r)):(l=n,c=e.firstChild,l.nodeType===c.nodeType?l.nodeType!==Node.TEXT_NODE?l.tagName===c.tagName?(((e,t)=>{const s=t.attributes,a=e.attributes,r=new Set;for(let t=0,a=s.length;t<a;t++){const{name:a,value:n}=s[t];r.add(a),e.getAttribute(a)!==n&&e.setAttribute(a,n)}for(let t=a.length-1;t>=0;t--){const{name:s}=a[t];r.has(s)||e.removeAttribute(s)}for(let s=0,a=g.length;s<a;s++){const a=g[s];a in e&&e[a]!==t[a]&&(e[a]=t[a])}})(l,c),((e,t)=>{const s=e.childNodes,a=t.childNodes,r=s.length;if(r!==a.length)return!1;for(let e=0;e<r;e++)if(!s[e].isEqualNode(a[e]))return!1;return!0})(l,c)||((e,t)=>{const s=Array.from(t.childNodes);e.replaceChildren(...s)})(l,c)):l.replaceWith(c):l.nodeValue!==c.nodeValue&&(l.nodeValue=c.nodeValue):l.replaceWith(c)),t(),s)if(this.ref[0].nextSibling===s)s.parentNode.removeChild(s);else{const e=document.createRange();e.setStartAfter(this.ref[0]),e.setEndAfter(s),e.deleteContents()}var l,c}updateElement(e,t,s){const a=document.createComment("");e.parentNode.insertBefore(a,e.nextSibling),a.parentNode.insertBefore(t.firstChild,a.nextSibling),s(),e.nextSibling===a&&e.parentNode.removeChild(e),a.parentNode.removeChild(a)}}const y=e=>e.reduce((e,t)=>(Array.isArray(t)?e.push(...y(t)):e.push(t),e),[]);function v(e){const t=document.createElement("template");return t.innerHTML=`${e}`.trim(),t.content}function b(e){const t=[];return Object.keys(e).forEach(s=>{let a=e[s];!0===a?t.push(s):!1!==a&&(null==a&&(a=""),t.push(`${s}="${a}"`))}),t.join(" ")}let x,S,$,j;"undefined"!=typeof document&&(x=!!navigator.userAgent.match(/Chrome/),S=!!Element.prototype.moveBefore,$=!S||x,j=S&&x);const w=(e,t,s)=>{try{return"function"!=typeof e?e:e.call(t,t)}catch(e){if(s&&!e._rasti){let s;s=`Error in ${t.constructor.name}#${t.uid} expression`;const a=new Error(s,{cause:e});throw a._rasti=!0,a}throw e}},k=e=>!!(e&&e.dataset&&e.dataset[z.DATASET_ELEMENT]&&e.dataset[z.DATASET_ELEMENT].endsWith("-1")),C=e=>!(!e||!(e.dataset&&e.dataset[z.DATASET_ELEMENT]||e.querySelector&&e.querySelector(`[${z.ATTRIBUTE_ELEMENT}]`))),E=(e,t)=>e.reduce((e,s,a)=>(e.push(s),void 0!==t[a]&&e.push(z.PLACEHOLDER(a)),e),[]).join(""),L=(e,t)=>{const s=z.PLACEHOLDER("(\\d+)"),a=e.match(new RegExp(`^${s}$`));if(a)return[t[parseInt(a[1],10)]];const r=new RegExp(`${s}`,"g"),n=[];let o,i=0;for(;null!==(o=r.exec(e));){const s=e.slice(i,o.index);n.push(z.markAsSafeHTML(s),t[parseInt(o[1],10)]),i=o.index+o[0].length}return n.push(z.markAsSafeHTML(e.slice(i))),n},T=(e,t)=>e.reduce((e,s)=>{const a=t(s[0]);if(1===s.length)"object"==typeof a?e=Object.assign(e,a):"string"==typeof a&&(e[a]=!0);else{const r=s[2]?t(s[1]):s[1];e[a]=r}return e},{}),_=(e,t,s)=>{const a={};return Object.keys(e).forEach(r=>{const n=r.match(/on(([A-Z]{1}[a-z]+)+)/);if(n&&n[1]){const o=n[1].toLowerCase(),i=e[r];if(i){const e=t.addListener(i,o);a[s(o)]=e}}else a[r]=e[r]}),a},R=(e,t,s=!1)=>{const a=z.PLACEHOLDER("(\\d+)"),r=new Map;return s||(e=e.replace(new RegExp(a,"g"),(e,s)=>{const a=t[s];if(a&&a.prototype instanceof z){if(r.has(a))return r.get(a);r.set(a,e)}return e})),e.replace(new RegExp(`<(${a})([^>]*)/>|<(${a})([^>]*)>([\\s\\S]*?)</\\4>`,"g"),(e,s,a,r,n,o,i,l)=>{let d,p,h;if(n?(d=t[o],p=i):(d=void 0!==a?t[a]:s,p=r),!(d.prototype instanceof z))return e;if(n){const e=R(l,t,!0),s=M(e,t);h=L(s,t)}const u=B(p,t);return t.push(function(){const e=T(u,e=>w(e,this,"children options"));return h&&(e.renderChildren=()=>new c(h.map(e=>w(e,this,"children")))),d.mount(e)}),z.PLACEHOLDER(t.length-1)})},A=(e,t)=>{const s=z.PLACEHOLDER("(?:\\d+)");return e.replace(new RegExp(`<(${s}|[a-z]+[1-6]?)(?:\\s*)((?:"[^"]*"|'[^']*'|[^>])*)(/?>)`,"gi"),t)},H=(e,t,s)=>{const a=z.PLACEHOLDER("(?:\\d+)");if(e.match(new RegExp(`^\\s*${a}\\s*$`)))return e;const n=e.match(new RegExp(`^\\s*<([a-z]+[1-6]?|${a})([^>]*)>([\\s\\S]*?)</(\\1|${a})>\\s*$|^\\s*<([a-z]+[1-6]?|${a})([^>]*)/>\\s*$`));if(!n)throw new Error("Invalid component template");let o=0;return A(n[0],(e,n,i,l)=>{const c=0===o,d=++o;if(!c&&!i.match(new RegExp(a)))return e;const p=B(i,t),h=e=>`${e}-${d}`,u=s.length;return s.push({getSelector:function(){return`[${z.ATTRIBUTE_ELEMENT}="${h(this.uid)}"]`},getAttributes:function(){const e=_(T(p,e=>w(e,this,"element attribute")),this.eventsManager,e=>z.ATTRIBUTE_EVENT(e,this.uid));return c&&this.attributes&&Object.assign(e,r(this.attributes,this)),e[z.ATTRIBUTE_ELEMENT]=h(this.uid),e}}),t.push(function(){const e=this.template.elements[u],t=e.getAttributes.call(this);return e.previousAttributes=t,z.markAsSafeHTML(b(t))}),`<${n} ${z.PLACEHOLDER(t.length-1)}${l}`})},M=(e,t)=>{const s=z.PLACEHOLDER("(?:\\d+)");return A(e,(e,a,r,n)=>{if(!r.match(new RegExp(s)))return e;const o=B(r,t),i=function(){return _(T(o,e=>w(e,this,"partial element attribute")),this.eventsManager,e=>z.ATTRIBUTE_EVENT(e,this.uid))};return t.push(function(){const e=i.call(this);return z.markAsSafeHTML(b(e))}),`<${a} ${z.PLACEHOLDER(t.length-1)}${n}`})},N=(e,t,s)=>{const a=z.PLACEHOLDER("(\\d+)");let r=0;return e.replace(new RegExp(a,"g"),function(a,n,o){const i=e.substring(0,o);if(i.lastIndexOf("<")>i.lastIndexOf(">"))return a;const l=++r,c=s.length;return s.push({getStart:function(){return z.MARKER_START(`${this.uid}-${l}`)},getEnd:function(){return z.MARKER_END(`${this.uid}-${l}`)},expression:t[n]}),t.push(function(){return this.template.interpolations[c]}),z.PLACEHOLDER(t.length-1)})},B=(e,t)=>{const s=z.PLACEHOLDER("(\\d+)"),a=[],r=new RegExp(`(?:${s}|([\\w-]+))(?:=(["']?)(?:${s}|((?:.?(?!["']?\\s+(?:\\S+)=|\\s*/>|\\s*[>"']))+.))?\\3)?`,"g");let n;for(;null!==(n=r.exec(e));){const[,e,s,r,o,i]=n,l=!!r;let c=void 0!==e?t[parseInt(e,10)]:s,d=void 0!==o?t[parseInt(o,10)]:i;l&&void 0===d&&(d=""),void 0!==d?a.push([c,d,l]):a.push([c])}return a},O=["key","state","onCreate","onChange","onHydrate","onBeforeRecycle","onRecycle","onBeforeUpdate","onUpdate"];class z extends i{constructor(e={}){super(...arguments),this.componentOptions=[],O.forEach(t=>{t in e&&(this[t]=e[t],this.componentOptions.push(t))});const t={};Object.keys(e).forEach(s=>{-1===this.viewOptions.indexOf(s)&&-1===this.componentOptions.indexOf(s)&&(t[s]=e[s])}),this.props=new n(t),this.options=e,this.partial=this.partial.bind(this),this.onChange=this.onChange.bind(this),this.onCreate.apply(this,arguments)}events(){const e={};return this.eventsManager.types.forEach(t=>{const a=z.ATTRIBUTE_EVENT(t,this.uid),r=function(e,t,r){const n=r.getAttribute(a);if(n){let a=this.eventsManager.listeners[parseInt(n,10)];"string"==typeof a&&(a=this[a]),s(a),a.call(this,e,t,r)}};e[`${t} [${a}]`]=r,e[t]=r}),e}ensureElement(){if(this.eventsManager=new d,this.template=r(this.template,this),this.el){if(this.el=r(this.el,this),!this.el.parentNode){const e=`Hydration failed in ${this.constructor.name}#${this.uid}`;throw new Error(e)}this.toString(),this.hydrate(this.el.parentNode)}}isContainer(){return 0===this.template.elements.length&&1===this.template.interpolations.length}subscribe(e,t="change",s=this.onChange){return e.on&&this.listenTo(e,t,s),this}hydrate(e){return["model","state","props"].forEach(e=>{this[e]&&this.subscribe(this[e])}),this.isContainer()?(this.children[0].hydrate(e),this.el=this.children[0].el):(this.template.elements.forEach((t,s)=>{0===s?(t.hydrate(e),this.el=t.ref):t.hydrate(this.el)}),this.delegateEvents(),this.template.interpolations.forEach(e=>e.hydrate(this.el)),this.children.forEach(e=>e.hydrate(this.el))),this.onHydrate.call(this),this}recycle(e){return this.onBeforeRecycle.call(this),e&&function(e,t){const s=$&&document.activeElement&&t.contains(document.activeElement)?document.activeElement:null;s&&j&&s.blur(),e.parentNode[S?"moveBefore":"insertBefore"](t,e),e.parentNode.removeChild(e),s&&s!==document.activeElement&&t.contains(s)&&s.focus()}(m(e,z.MARKER_RECYCLED(this.uid),k),this.el),this}updateProps(e){return this.props.set(e),this.onRecycle.call(this),this}getRecycledMarker(){return`\x3c!--${z.MARKER_RECYCLED(this.uid)}--\x3e`}partial(e,...t){const s=L(M(R(E(e,t).trim(),t),t),t).map(e=>w(e,this,"partial"));return new c(s)}renderTemplatePart(e,t,s){const a=w(e,this,"template part");if(null==a||!1===a||!0===a)return"";if(a instanceof l)return`${a}`;if(a instanceof z)return`${t(a,s)}`;if(a instanceof c){if(1===a.items.length)return this.renderTemplatePart(a.items[0],t,s);s.push();const e=a.items.map(e=>(s.increment(),this.renderTemplatePart(e,t,s))).join("");return s.pop(),e}if(Array.isArray(a)){s.pause();const e=y(a).map(e=>this.renderTemplatePart(e,t,s)).join("");return s.resume(),e}if(a instanceof f){const e=a.tracker;e.reset();const s=this.isContainer()?"":`\x3c!--${a.getStart()}--\x3e`,r=this.isContainer()?"":`\x3c!--${a.getEnd()}--\x3e`;return`${s}${this.renderTemplatePart(a.expression,t,e)}${r}`}return`${z.sanitize(a)}`}toString(){this.destroyChildren(),this.eventsManager.reset();const e=(e,t)=>(t.track(e),this.addChild(e));return this.template.parts.map(t=>this.renderTemplatePart(t,e)).join("")}render(){if(this.destroyed)return this;if(!this.el){const e=v(this);return this.hydrate(e),this}this.onBeforeUpdate.call(this),this.eventsManager.reset();const e=this.children;this.children=[];const t=[];return this.template.interpolations.forEach(s=>{const a=s.tracker;a.reset();const r=[],n=[],o=this.renderTemplatePart(s.expression,t=>{let s=t,o=null;return o=t.key?e.find(e=>e.key===t.key):a.findRecyclable(t),o?(s=o.getRecycledMarker(),n.push([o,t]),a.track(o)):(r.push(t),a.track(t)),s},a),i=([e,s],a)=>{t.push([e,s.props.toJSON()]),this.addChild(e).recycle(a),s.destroy()};if(a.hasSingleComponent())return void i(n[0],null);const l=v(o),c=e=>()=>{n.forEach(t=>i(t,e)),r.forEach(t=>this.addChild(t).hydrate(e))};this.isContainer()?s.updateElement(this.el,l,c(this.el.parentNode)):s.update(l,c(this.el))}),e.forEach(e=>{this.children.indexOf(e)<0&&e.destroy()}),t.forEach(([e,t])=>{e.updateProps(t)}),this.isContainer()?this.el=this.children[0].el:(this.template.elements.forEach(e=>e.update()),this.eventsManager.hasPendingTypes()&&this.delegateEvents()),this.onUpdate.call(this),this}onCreate(){}onChange(){this.render()}onHydrate(){}onBeforeRecycle(){}onRecycle(){}onBeforeUpdate(){}onUpdate(){}onDestroy(){}static markAsSafeHTML(e){return new l(e)}static extend(e){const t=this;class s extends t{}return Object.assign(s.prototype,"function"==typeof e?e(t.prototype):e),s}static mount(e,t,s){const a=new this(e);return t&&(s?a.toString():t.append(v(a)),a.hydrate(t)),a}static create(e,...t){"function"==typeof e&&(t=[e],e=["",""]);const s=[],a=[],r=L(N(H(R(E(e,t).trim(),t),t,s),t,a),t);return this.extend({source:null,template(){return{elements:s.map(e=>new h({getSelector:e.getSelector.bind(this),getAttributes:e.getAttributes.bind(this)})),interpolations:a.map(e=>new f({getStart:e.getStart.bind(this),getEnd:e.getEnd.bind(this),expression:e.expression,shouldSkipFind:k,shouldSkipSync:C})),parts:r}}})}}z.ATTRIBUTE_ELEMENT="data-rst-el",z.ATTRIBUTE_EVENT=(e,t)=>`data-rst-on-${e}-${t}`,z.DATASET_ELEMENT="rstEl",z.PLACEHOLDER=e=>`__RASTI_PLACEHOLDER_${e}__`,z.MARKER_RECYCLED=e=>`rst-r-${e}`,z.MARKER_START=e=>`rst-s-${e}`,z.MARKER_END=e=>`rst-e-${e}`;var D=z.create`<div></div>`;const I=e=>null!==e&&"object"==typeof e&&!Array.isArray(e),W=["prefix","generateUid","generateClassName","shouldAttachToDOM","attributes","renderers"];class F{constructor(e,t={}){this.styles=e,this.classes={},W.forEach(e=>{e in t&&(this[e]=t[e])}),this.renderers||(this.renderers=[this.renderStyles,this.parseStyles]),this.prefix||(this.prefix=F.prefix),this.uid=this.generateUid();let s=0;Object.keys(e).forEach(e=>{e.match(F.classRegex)&&(this.classes[e]=this.generateClassName(e,++s))})}generateUid(){const e=JSON.stringify(this.styles);let t=2166136261;for(let s=0;s<e.length;s++)t^=e.charCodeAt(s),t=16777619*t>>>0;return t.toString(36)}generateClassName(e,t){return`${this.prefix[0]}-${this.uid}-${t}`}render(){return this.renderers.map(e=>("string"==typeof e?this[e]:e).bind(this)).reduce((e,t)=>(...s)=>e(t(...s)))(this.styles)}renderStyles(e,t=1){return Object.keys(e).reduce((s,a)=>{const r=e[a];if(I(r)){if(Object.keys(r).length>0){const e=this.renderStyles(r,t+1);s.push(`${a}{${e}}`)}}else null!=r&&s.push(`${a}:${r};`);return s},[]).join("")}parseStyles(e,t,s,a){const r=e=>e in this.classes?`.${this.classes[e]}`:e,n=e=>a&&s?`${s} ${e}`:e.match(F.globalPrefixRegex)?`${s?`${s} `:""}${e.replace(F.globalPrefixRegex,"")}`:r(e).replace(F.referenceRegex,(e,t)=>r(t)).replace(F.nestedRegex,s);return Object.keys(e).reduce((a,r)=>{const o=e[r];if(I(o))if(r.match(F.globalRegex))Object.assign(t||a,this.parseStyles(o,a,s,!0));else if((r.match(F.nestedRegex)||r.match(F.globalPrefixRegex))&&t){const e=n(r);t[e]={},Object.assign(t[e],this.parseStyles(o,t,e))}else{const e=n(r);a[e]={};const t=e.match(/@/)?[]:[a,e];Object.assign(a[e],this.parseStyles(o,...t))}else null!=o&&(a[r.match(/-/)?r:(i=r,i.replace(/([A-Z])/g,e=>`-${e[0].toLowerCase()}`))]=o);var i;return a},{})}getAttributes(){const e=Object.assign({},this.attributes);return e[`data-${this.prefix}-uid`]=this.uid,e}toString(){const e=this.getAttributes();return`<style${Object.keys(e).map(t=>` ${t}="${e[t]}"`).join("")}>${this.render()}</style>`}shouldAttachToDOM(){return"undefined"!=typeof document&&!document.querySelector(`style[data-${this.prefix}-uid="${this.uid}"]`)}attach(){if(F.registry.some(({uid:e})=>e===this.uid)||F.registry.push(this),this.shouldAttachToDOM()){this.el=document.createElement("style");const e=this.getAttributes();Object.keys(e).forEach(t=>{this.el.setAttribute(t,e[t])}),this.el.textContent=this.render(),document.head.appendChild(this.el)}return this}destroy(){const e=F.registry.indexOf(this);return e>-1&&F.registry.splice(e,1),this.el&&(this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=null),this}static toString(){return F.registry.join("")}static toCSS(){return F.registry.map(e=>e.render()).join("")}static destroy(){F.registry.slice().forEach(e=>e.destroy())}}F.classRegex=/^\w+$/,F.globalRegex=/^@global$/,F.globalPrefixRegex=/^@global\s+/,F.referenceRegex=/\$(\w+)/g,F.nestedRegex=/&/g,F.prefix="fun",F.indent="    ",F.registry=[],F.debug=!1;const U=(e,t)=>e.reduce((e,s,a)=>(Object.assign(e,t(s,a)),e),{}),P=e=>`@media (min-width: ${{sm:640,md:768,lg:1024,xl:1280,xxl:1536}[e]}px)`,q=e=>U(["primary","secondary","neutral","error","warning","success"],e),Z=(e,t)=>new F(e,t).attach(),K=e=>e.charAt(0).toUpperCase()+e.slice(1),Y=Z({root:{borderRadius:"var(--rui-components-Surface-borderRadius, var(--rui-borderRadius-md))",padding:"var(--rui-components-Surface-padding, var(--rui-spacing-md))",backgroundColor:"var(--rui-components-Surface-backgroundColor, var(--rui-palette-neutral-backgroundLevel2))",fontFamily:"var(--rui-fontFamily-body)",fontSize:"var(--rui-fontSize-bodyMd)"},...q(e=>({[e]:{color:`var(--rui-palette-${e}-foregroundMain)`}})),outlined:{...q(e=>({[`&:where($${e})`]:{border:`1px solid var(--rui-components-Surface-borderColor, rgb(var(--rui-palette-${e}-rgb-level1) / 0.4))`}}))},solid:{...q(e=>({[`&:where($${e})`]:{backgroundColor:`var(--rui-components-Surface-backgroundColor, var(--rui-palette-${e}-main))`,color:`var(--rui-palette-${e}-contrastMain)`}}))},...((e,t="xs",s="xl")=>{const a=["xxs","xs","sm","md","lg","xl","xxl","xxxl","xxxxl"],r=a.slice(a.indexOf(t),a.indexOf(s)+1);return U(r,e)})(e=>({[`shadow${K(e)}`]:{boxShadow:`var(--rui-shadow-${e})`}}))}),V=D.create`
    <${({options:e})=>e.tag||"div"} class="${({props:e})=>{const t=e.classes?{...Y.classes,...e.classes}:Y.classes;return[t.root,t[e.variant||"outlined"],t[e.color||"neutral"],e.shadow?t[`shadow${K(e.shadow)}`]:null,e.className||null].filter(Boolean).join(" ")}}">
        ${({props:e})=>e.renderChildren&&e.renderChildren()}
    </${({options:e})=>e.tag||"div"}>
`,G=Z({root:{display:"inline-flex",alignItems:"center",justifyContent:"space-evenly",borderRadius:"var(--rui-components-Button-borderRadius, var(--rui-borderRadius-xs))",padding:"var(--rui-components-Button-padding, var(--rui-spacing-sm))",maxHeight:"100%",fontFamily:"var(--rui-typography-button-fontFamily)",fontWeight:"var(--rui-typography-button-fontWeight)",fontSize:"var(--rui-typography-button-fontSize)",lineHeight:"var(--rui-typography-button-lineHeight)",textTransform:"var(--rui-typography-button-textTransform)",textDecoration:"var(--rui-typography-button-textDecoration)",transition:"background-color 0.1s, color 0.1s, border-color 0.1s","&>svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"&>svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"&>svg:only-child":{padding:"0"}},...q(e=>({[e]:{}})),disabled:{},solid:{...q(e=>({[`&:where($${e})`]:{border:`1px solid var(--rui-components-Button-borderColor, var(--rui-palette-${e}-main))`,color:`var(--rui-components-Button-color, rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95))`,backgroundColor:`var(--rui-components-Button-backgroundColor, var(--rui-palette-${e}-main))`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,border:`1px solid var(--rui-palette-${e}-dark)`},"&:where($disabled)":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,border:`1px solid var(--rui-palette-${e}-light)`}}}}))},outlined:{...q(e=>({[`&:where($${e})`]:{border:`1px solid var(--rui-components-Button-borderColor, var(--rui-palette-${e}-main))`,color:`var(--rui-components-Button-color, var(--rui-palette-${e}-foregroundMain))`,backgroundColor:"transparent","&:hover":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.2)`},"&:where($disabled)":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,border:`1px solid rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,backgroundColor:"transparent"}}}}))},plain:{...q(e=>({[`&:where($${e})`]:{border:"none",background:"transparent",color:`var(--rui-palette-${e}-foregroundMain)`,"&:hover":{color:`var(--rui-palette-${e}-foregroundDark)`},"&:where($disabled)":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`}}}}))},group:{"&:not(:first-child)":{marginLeft:"-1px",...q(e=>({[`&$solid$${e}`]:{borderLeftColor:`var(--rui-palette-${e}-dark)`}}))},"&:not(:first-child):not(:last-child)":{borderRadius:"0"},"&:first-child":{borderTopRightRadius:"0",borderBottomRightRadius:"0"},"&:last-child":{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}},lg:{fontSize:"var(--rui-fontSize-xl)"},sm:{fontSize:"var(--rui-fontSize-xs)"}}),X=D.create`
    <${({props:e})=>e.href?"a":e.type?"input":"button"}
        class="${({props:e})=>(e=>{const t=e.classes?{...G.classes,...e.classes}:G.classes;return[t.root,t[e.size||"md"],t[e.variant||"solid"],t[e.color||"neutral"],e.disabled?t.disabled:null,e.group?t.group:null,e.className||null].filter(Boolean).join(" ")})(e)}"
        onClick="${({props:e})=>e.onClick||!1}"
        href="${({props:e})=>e.href||!1}"
        type="${({props:e})=>e.type||!1}"
        value="${({props:e})=>e.type&&e.label||!1}"
        disabled="${({props:e})=>e.disabled||!1}"
        target="${({props:e})=>e.target||!1}"
        title="${({props:e})=>e.title||!1}"
    >
        ${e=>e.renderChildren()}
    </${({props:e})=>e.href?"a":e.type?"input":"button"}>
`.extend({renderChildren:function(){return this.props.type?null:this.props.renderChildren?this.props.renderChildren():this.partial`
            ${this.props.renderLeftIcon&&this.props.renderLeftIcon()}
            <span>${this.props.label}</span>
            ${this.props.renderRightIcon&&this.props.renderRightIcon()}
        `}});var J=D.create`
    <svg class="${({props:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"/>
    </svg>
`;const Q=Z({root:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"var(--rui-components-Dialog-backgroundColor, rgb(var(--rui-palette-neutral-rgb-level3) / 0.2))",backdropFilter:"blur(5px)",zIndex:"var(--rui-zIndex-dialogBackdrop, 1500)",padding:"var(--rui-components-Dialog-padding, var(--rui-spacing-md))"},dialog:{position:"relative",display:"flex",flexDirection:"column",maxHeight:"calc(var(--rui-viewport-height) * 0.9)",maxWidth:"calc(var(--rui-viewport-width) * 0.9)",width:"auto",minWidth:"250px",padding:"var(--rui-spacing-sm)"},left:{justifyContent:"flex-start"},right:{justifyContent:"flex-end"},top:{alignItems:"flex-start"},bottom:{alignItems:"flex-end"},header:{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"var(--rui-spacing-xxxl)","& :where(button)":{position:"absolute",top:0,right:0,margin:0,padding:0,borderRadius:"50%"}},title:{fontSize:"var(--rui-fontSize-md)",fontWeight:"var(--rui-fontWeight-md)",color:"var(--rui-palette-neutral-foregroundMain)",textAlign:"center",padding:0,margin:"var(--rui-spacing-xs)"},content:{flex:1,overflowY:"auto",overflowX:"hidden",padding:"var(--rui-spacing-md)",minHeight:0},footer:{display:"flex",justifyContent:"space-evenly",paddingTop:"var(--rui-spacing-md)",flexShrink:0}}),ee=D.create`
    <div class="${({props:e})=>[ae(e).header,e.className||null].filter(Boolean).join(" ")}">
        ${e=>e.renderHeaderContent()}
    </div>
`.extend({renderHeaderContent(){if(this.props.renderChildren)return this.props.renderChildren();const e=ae(this.props);return this.partial`
            ${this.props.title?this.partial`<h2 class="${e.title}">${this.props.title}</h2>`:null}
            ${this.props.handleClose&&this.props.closeButton?this.partial`<${X}
                    onClick=${this.props.handleClose}
                    color="neutral"
                    variant="outlined"
                    size="sm"
                >
                    <${J} />
                </${X}>`:null}
        `}}),te=D.create`
    <div class="${({props:e})=>[ae(e).content,e.className||null].filter(Boolean).join(" ")}">
        ${({props:e})=>e.renderChildren()}
    </div>
`,se=D.create`
    <div class="${({props:e})=>[ae(e).footer,e.className||null].filter(Boolean).join(" ")}">
        ${({props:e})=>e.renderChildren()}
    </div>
`,ae=e=>e.classes?{...Q.classes,...e.classes}:Q.classes,re=({variant:e,color:t,shadow:s})=>({variant:e,color:t,shadow:s}),ne=D.create`
    <div
        class="${({props:e})=>(e=>{const t=ae(e);return[t.root,e.top?t.top:null,e.bottom?t.bottom:null,e.left?t.left:null,e.right?t.right:null,e.className||null].filter(Boolean).join(" ")})(e)}"
        onClick=${function(e){this.props.handleClose&&e.target===this.el&&this.props.handleClose()}}}
    >
        <${V} 
            ${({props:e})=>({...re(e),className:ae(e).dialog})}
            onClick=${function(e){e.stopPropagation()}}
        >
            ${({props:e})=>e.renderChildren()}
        </${V}>
    </div>
`.extend({onCreate(){this.handleEscape=e=>{"Escape"===e.key&&this.props.handleClose&&this.props.handleClose()},this.handleClickOutside=e=>{this.props.handleClose&&!this.el.contains(e.target)&&this.props.handleClose()}},onHydrate(){const e=document.body.style.overflow;document.body.style.overflow="hidden",this._originalOverflow=e,document.addEventListener("keydown",this.handleEscape),setTimeout(()=>{document.addEventListener("click",this.handleClickOutside)},0)},onDestroy(){void 0!==this._originalOverflow&&(document.body.style.overflow=this._originalOverflow),document.removeEventListener("keydown",this.handleEscape),document.removeEventListener("click",this.handleClickOutside)}});ne.Header=ee,ne.Content=te,ne.Footer=se;var oe=function s(a){var r=t[a];if(void 0!==r)return r.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,s),n.exports}(663);const ie=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),le=Z({root:{color:"var(--rui-components-Text-color, var(--rui-palette-neutral-foregroundLevel1))",margin:"var(--rui-components-Text-margin, var(--rui-spacing-md) 0)"},h1:ie("h1"),h2:ie("h2"),h3:ie("h3"),h4:ie("h4"),titleLg:ie("titleLg"),titleMd:ie("titleMd"),titleSm:ie("titleSm"),bodyLg:ie("bodyLg"),bodyMd:ie("bodyMd"),bodySm:ie("bodySm"),caption:ie("caption")}),ce=e=>{switch(e.level){case"h1":return"h1";case"h2":case"titleLg":case"titleMd":case"titleSm":return"h2";case"h3":return"h3";case"h4":return"h4";case"caption":return"caption";default:return"p"}},de=D.create`
    <${({props:e})=>ce(e)} class="${({props:e})=>(e=>{const t=e.classes?{...le.classes,...e.classes}:le.classes;return[t.root,t[e.level||"bodyMd"],e.className||null].filter(Boolean).join(" ")})(e)}">
        ${({props:e})=>e.renderChildren&&e.renderChildren()}
    </${({props:e})=>ce(e)}>
`;var pe=D.create`
    <svg class="${({props:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-3.536-3.475a.75.75 0 0 0 1.061 0 3.5 3.5 0 0 1 4.95 0 .75.75 0 1 0 1.06-1.06 5 5 0 0 0-7.07 0 .75.75 0 0 0 0 1.06ZM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5Zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5Z" clip-rule="evenodd"/>
    </svg>
`;const{classes:he}=Z({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",minHeight:"var(--rui-viewport-height)"},iconContainer:{display:"flex",justifyContent:"center",alignItems:"center",width:"140px",height:"140px",borderRadius:"50%",backgroundColor:"var(--rui-palette-neutral-main)",marginBottom:"var(--rui-spacing-md)"},icon:{width:"120px",height:"120px",fill:"var(--rui-palette-warning-main)"}}),ue=D.create`
    <div class="${he.root}">
        <div class="${he.iconContainer}">
            <${pe} className=${he.icon} />
        </div>
        <${de} level="h1">
            404
        </${de}>
        <${de} level="h3">
            Page Not Found
        </${de}>
        <${de} level="bodyMd">
            The page you are looking for does not exist.
        </${de}>
    </div>
`,{classes:ge}=Z({"@global":{body:{margin:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)",fontFamily:"var(--rui-fontFamily-body)"},"a.anchor, h2":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-sm))"}},root:{},appBarMenuDialog:{},[P("sm")]:{$appBarMenuDialog:{display:"none"}}}),{classes:me}=Z({section:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-sm)"},left:{flex:"0 0 auto",justifyContent:"flex-start"},center:{flex:"1 1 auto",justifyContent:"center"},right:{flex:"0 0 auto",justifyContent:"flex-end"}}),fe=D.create`
    <div class="${({props:e})=>[me.section,me.left,e.className||null].filter(Boolean).join(" ")}">
        ${({props:e})=>e.renderChildren()}
    </div>
`,ye=D.create`
    <div class="${({props:e})=>[me.section,me.center,e.className||null].filter(Boolean).join(" ")}">
        ${({props:e})=>e.renderChildren()}
    </div>
`,ve=D.create`
    <div class="${({props:e})=>[me.section,me.right,e.className||null].filter(Boolean).join(" ")}">
        ${({props:e})=>e.renderChildren()}
    </div>
`,be=Z({root:{position:"sticky",top:0,zIndex:"var(--rui-zIndex-appBar, 1000)",display:"flex",alignItems:"center",minHeight:"56px",padding:"var(--rui-components-AppBar-padding, var(--rui-spacing-sm) var(--rui-spacing-md))",gap:"var(--rui-spacing-md)",borderBottom:"1px solid var(--rui-components-AppBar-borderColor, rgba(var(--rui-palette-neutral-rgb-foregroundSoftLevel3) / 0.5))",transition:"background-color 0.2s ease, border-color 0.2s ease",backgroundColor:"var(--rui-components-AppBar-backgroundColor, var(--rui-palette-neutral-backgroundLevel1))"},outlined:{...q(e=>({[`&:where($${e})`]:{borderBottomColor:`var(--rui-palette-${e}-foregroundSoftLevel3)`}}))},solid:{...q(e=>({[`&:where($${e})`]:{backgroundColor:`var(--rui-components-AppBar-backgroundColor, var(--rui-palette-${e}-main))`,borderBottomColor:`var(--rui-components-AppBar-borderColor, var(--rui-palette-${e}-main))`,color:`var(--rui-palette-${e}-contrastMain)`},[`&:where($${e}) *`]:{color:`var(--rui-palette-${e}-contrastMain)`}}))},...q(e=>({[e]:{}}))}),xe=D.create`
    <header
        class="${({props:e})=>(e=>{const t=e.classes?{...be.classes,...e.classes}:be.classes;return[t.root,t[e.variant||"outlined"],t[e.color||"neutral"],e.className||null].filter(Boolean).join(" ")})(e)}"
    >
        ${({props:e})=>e.renderChildren()}
    </header>
`;xe.Left=fe,xe.Center=ye,xe.Right=ve;var Se=D.create`
    <svg class="${({props:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
    </svg>
`,$e=D.create`
    <svg class="${({props:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06l-1.06-1.06a.75.75 0 1 0-1.061 1.06l1.06 1.06Z"/>
    </svg>
`,je=D.create`
    <svg class="${({props:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"/>
    </svg>
`;const{classes:we}=Z({root:{display:"flex",justifyContent:"right",alignItems:"center",height:"60px","& ul":{padding:0}},icon:{width:"24px",height:"24px",cursor:"pointer",fill:"var(--rui-palette-neutral-main)","&:hover":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),ke=D.create`
    <div class="${we.root}">
        <ul>
            <li class="${we.hiddenIfDark}">
                ${()=>X.mount({variant:"plain",renderChildren:()=>$e.mount({className:we.icon}),onClick:()=>document.documentElement.setAttribute("data-color-scheme","dark")})}
            </li>
            <li class="${we.hiddenIfLight}">
                ${()=>X.mount({variant:"plain",renderChildren:()=>je.mount({className:we.icon}),onClick:()=>document.documentElement.setAttribute("data-color-scheme","light")})}
            </li>
        </ul>
    </div>
`,Ce=D.create`
    <svg class="${({props:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
`,Ee=D.create`
    <svg class="${({props:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
        <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"></path>
    </svg>
`,{classes:Le}=Z({root:{height:"var(--rui-app-appBarHeight)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",position:"fixed",top:0,left:0,right:0,zIndex:1e3,padding:0},leftContent:{display:"flex",alignItems:"center"},rightContent:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-xs)"},navLinks:{display:"none","& ul":{display:"flex",justifyContent:"center",alignItems:"center",listStyle:"none",padding:0,margin:0,gap:"var(--rui-spacing-xs)","& li":{margin:0}}},menuButton:{display:"block"},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-neutral-main)","a:hover &":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"},logoInactive:{opacity:.5},menuContent:{"& nav":{maxWidth:"100%",display:"flex",justifyContent:"center",alignItems:"center","& ul":{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"var(--rui-spacing-md)"}}}},[P("sm")]:{$navLinks:{display:"block"},$menuButton:{display:"none"}}}),{classes:Te}=Z({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-xl) 0 var(--rui-spacing-xxxxl) 0",borderTop:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)","@global":{a:{color:"var(--rui-palette-neutral-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-neutral-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-neutral-dark)"}}}},text:{color:"var(--rui-palette-neutral-foregroundLevel3)"}}),{classes:_e}=Z({root:{display:"flex",justifyContent:"center",alignItems:"center",height:"var(--rui-viewport-height)",flexDirection:"column",backgroundColor:"var(--rui-palette-neutral-backgroundLevel3)",boxShadow:"var(--rui-shadow-xs)",padding:"0 var(--rui-spacing-xl)",overflow:"hidden","@global":{h1:{textAlign:"center",margin:"var(--rui-app-appBarHeight) 0 0 0"},h2:{color:"var(--rui-palette-neutral-foregroundLevel2)",marginTop:0,marginBottom:"var(--rui-spacing-sm)"},h4:{color:"var(--rui-palette-neutral-foregroundLevel3)",marginBottom:"var(--rui-spacing-md)"},"h1 img":{width:"90%"},pre:{maxWidth:"100%"},code:{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"}}},buttons:{"& a":{margin:"var(--rui-spacing-md) var(--rui-spacing-xs)"},display:"flex",justifyContent:"center"},[P("sm")]:{"$root h1":{margin:"var(--rui-app-appBarHeight) 0 0 0"},"$root h2":{marginBottom:"var(--rui-spacing-xl)"},"$root h4":{marginBottom:"var(--rui-spacing-xxl)"},"$root h1 img":{width:"75%"},"$buttons a":{margin:"var(--rui-spacing-xxxl) var(--rui-spacing-lg)"}},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-secondary-main)"},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),Re=(e=>{const{logoAlt:t,tagline:s,renderSubtitle:a,CoverCodeExample:r,githubUrl:n}=e;return D.create`
        <section class="${_e.root}">
            <h1>
                <img class="${_e.hiddenIfLight}" alt="${t}" src="/logo-dark.svg">
                <img class="${_e.hiddenIfDark}" alt="${t}" src="/logo.svg">
            </h1>

            <${de} level="h2">${s}</${de}>

            ${({partial:e})=>a?e`<${de} level="h4">${a}</${de}>`:null}

            <${r} />

            <div class="${_e.buttons}">
                <${X} 
                    label="Getting Started"
                    color="primary"
                    variant="outlined"
                    href="#gettingstarted"
                />
                <${X} 
                    label="GitHub"
                    color="secondary"
                    variant="outlined"
                    href="${n}"
                    target="_blank"
                    renderLeftIcon=${()=>Ce.mount({className:_e.icon})}
                />
            </div>
        </section>
    `})({logoAlt:"CSSFUN",tagline:"Near-zero runtime CSS-in-JS library",renderSubtitle:e=>e.partial`Write modular <strong>CSS</strong> within your <strong>JavaScript</strong> code with built-in <strong>themes</strong> and <strong>SSR</strong> support.`,CoverCodeExample:D.create`
    <pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;blue&#x27;</span>,
        color : <span class="hljs-string">&#x27;white&#x27;</span>,
        padding : <span class="hljs-string">&#x27;10px&#x27;</span>,
        borderRadius : <span class="hljs-string">&#x27;5px&#x27;</span>
    \}
\});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
`,githubUrl:"https://github.com/8tentaculos/cssfun"}),Ae=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:He}=Z({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ae("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ae("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center","& section":{"& h5":{margin:"var(--rui-spacing-xs) 0",padding:"0"},margin:"var(--rui-spacing-md)",width:"400px"}},[P("md")]:{$root:{justifyContent:"space-between"}}}),Me=D.create`
            <section class="${({props:e})=>(e=>[e.className||null,He.root].join(" "))(e)}"><${V} tag="section" shadow="sm"><h5 id="nearzeroruntime">Near-Zero Runtime ⚡</h5>
<p>Styles are generated when the module is initialized, rather than during component rendering. This eliminates runtime 
  style generation, improving performance and reducing complexity.</p></${V}><${V} tag="section" shadow="sm"><h5 id="componentscopedstyles">Component-Scoped Styles ✨</h5>
<p><strong>CSSFUN</strong> scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic 
  and styling in the same file for easier management.</p></${V}><${V} tag="section" shadow="sm"><h5 id="frameworkagnosticandlightweight">Framework-Agnostic and Lightweight 🌐</h5>
<p><strong>CSSFUN</strong> is compatible with any environment. At just <strong>1.7KB</strong>, it adds minimal overhead to your projects.</p></${V}><${V} tag="section" shadow="sm"><h5 id="nobuildtoolsrequired">No Build Tools Required 🛠️</h5>
<p><strong>CSSFUN</strong> can be used directly in the browser, eliminating the need for complex build tools or configurations.</p></${V}><${V} tag="section" shadow="sm"><h5 id="serversiderenderingssrsupport">Server-Side Rendering (SSR) Support 🚀</h5>
<p><strong>CSSFUN</strong> supports <a href="#serversiderenderingssr">server-side rendering</a> out of the box, optimizing initial load 
  times without duplicating styles.</p></${V}><${V} tag="section" shadow="sm"><h5 id="builtinthememanagement">Built-in Theme Management 🎨</h5>
<p>With built-in <a href="#themes">theme support</a>, <strong>CSSFUN</strong> uses <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS variables</a> 
  to manage light and dark color schemes. Themes update automatically based on user preferences, no re-renders needed.</p></${V}></section>
        `,Ne=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Be}=Z({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ne("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ne("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}}}}),Oe=D.create`
            <section class="${({props:e})=>(e=>[e.className||null,Be.root].join(" "))(e)}"><h2 id="gettingstarted">Getting Started</h2>
<h3 id="installingvianpm">Installing via npm</h3>
<pre><code class="bash language-bash">\$ npm install cssfun</code></pre>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">import</span> \{ css \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cssfun&#x27;</span>;</code></pre>
<h3 id="usingesmodules">Using ES modules</h3>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">import</span> \{ css \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;https://esm.run/cssfun&#x27;</span>;</code></pre>
<h3 id="usingscripttag">Using <code>&lt;script&gt;</code> tag</h3>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.jsdelivr.net/npm/cssfun&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ css \} = <span class="hljs-variable constant_">CSSFUN</span>;</code></pre>
<h3 id="createyourstyles">Create your styles</h3>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;blue&#x27;</span>,
        color : <span class="hljs-string">&#x27;white&#x27;</span>,
        padding : <span class="hljs-string">&#x27;10px&#x27;</span>,
        borderRadius : <span class="hljs-string">&#x27;5px&#x27;</span>
    \}
\});</code></pre>
<h3 id="applythestylestoyourcomponents">Apply the styles to your components:</h3>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
<h2 id="renderers">Renderers</h2>
<p>Renderers are functions that transform style objects into CSS strings.<br />
These are the built-in renderers transformations:</p>
<blockquote>
  <p><strong>Note</strong>: All examples below show class names generated in <strong>development mode</strong>.<br />
  In <strong>production</strong>, class names are optimized for smaller bundle size:</p>
  <ul>
  <li><strong>Development</strong>: <code>.fun-9qkk9s-root \{ color: red; \}</code> (full prefix + class name)</li>
  <li><strong>Production</strong>: <code>.f-9qkk9s-1\{color:red;\}</code> (first letter of prefix + index)</li>
  </ul>
  <p>Customize via <a href="/docs/api.md#new-stylesheetstyles-options"><code>options.generateClassName</code></a> or by <a href="/docs/api.md#stylesheet__generateclassname">extending the class</a>.</p>
</blockquote>
<h4 id="camelizedkeyswillbetransformedtodashedkeys">Camelized keys will be transformed to dashed keys</h4>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    root : \{
        backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;uwitok&quot;</span>&gt;</span>
    .fun-uwitok-root \{
        background-color: black;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4 id="nestedselectorswillbeexpanded">Nested selectors will be expanded</h4>
<ul>
<li><p><strong>Use <code>&amp;</code> to reference the selector of the parent rule</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;white&#x27;</span>,
        <span class="hljs-string">&#x27;&amp;:hover&#x27;</span> : \{
            backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>
        \},
        <span class="hljs-string">&#x27;&amp; span&#x27;</span> : \{
            color : <span class="hljs-string">&#x27;blue&#x27;</span>
        \}
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto-1">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;1pxyvx7&quot;</span>&gt;</span>
    .fun-1pxyvx7-button \{
        background-color: white;
    \}
    .fun-1pxyvx7-button:hover \{
        background-color: black;
    \}
    .fun-1pxyvx7-button span \{
        color: blue;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
<li><p><strong>Deep nesting</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;white&#x27;</span>,
        <span class="hljs-string">&#x27;&amp;:active&#x27;</span> : \{
            backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>,
            <span class="hljs-string">&#x27;&amp;:hover&#x27;</span> : \{
                backgroundColor : <span class="hljs-string">&#x27;blue&#x27;</span>
            \}
        \}
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto-2">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;169vukw&quot;</span>&gt;</span>
    .fun-169vukw-button \{
        background-color: white;
    \}
    .fun-169vukw-button:active \{
        background-color: black;
    \}
    .fun-169vukw-button:active:hover \{
        background-color: blue;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
</ul>
<h4 id="classreferenceswillbereplacedbythegeneratedclassname">Class references will be replaced by the generated class name</h4>
<ul>
<li><p><strong>Use <code>\$</code> to reference a local class within the same <code>StyleSheet</code> instance</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;white&#x27;</span>
    \},
    <span class="hljs-string">&#x27;\$button:hover&#x27;</span> : \{
            backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>
        \},
    <span class="hljs-string">&#x27;\$button span&#x27;</span> : \{
        color : <span class="hljs-string">&#x27;blue&#x27;</span>
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto-3">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;2xfpy0&quot;</span>&gt;</span>
    .fun-2xfpy0-button \{
        background-color: white;
    \}
    .fun-2xfpy0-button:hover \{
        background-color: black;
    \}
    .fun-2xfpy0-button span \{
        color: blue;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
</ul>
<h4 id="globalselectorswillberenderedasglobalstyles">Global selectors will be rendered as global styles</h4>
<ul>
<li><p><strong>Global block</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    <span class="hljs-string">&#x27;@global&#x27;</span> : \{
        body : \{
            backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>
        \}
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto-4">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;ml03n3&quot;</span>&gt;</span>
    body \{
        background-color: black;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
<li><p><strong>Nested global block</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    root : \{
        <span class="hljs-string">&#x27;@global&#x27;</span> : \{
            a : \{
                color : <span class="hljs-string">&#x27;black&#x27;</span>
            \}
        \}
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto-5">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;1eia2eq&quot;</span>&gt;</span>
    .fun-1eia2eq-root a \{
        color: black;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
<li><p><strong>Global prefix</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    <span class="hljs-string">&#x27;@global body&#x27;</span> : \{
        backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto-6">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;1p1av20&quot;</span>&gt;</span>
    body \{
        background-color: black;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
<li><p><strong>Nested global prefix</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    root : \{
        <span class="hljs-string">&#x27;@global a&#x27;</span> : \{
            color : <span class="hljs-string">&#x27;black&#x27;</span>
        \}
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto-7">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;xvd6jj&quot;</span>&gt;</span>
    .fun-xvd6jj-root a \{
        color: black;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
</ul>
<p>When composed, the first renderer receives the styles object, and the final one outputs the 
resulting CSS string.  </p>
<h3 id="customrenderers">Custom Renderers</h3>
<p>You can customize the renderers by setting the <code>renderers</code> array on the <a href="/docs/api.md#stylesheet"><code>StyleSheet</code></a> instance. 
If passed via <a href="/docs/api.md#new-stylesheetstyles-options"><code>options.renderers</code></a>, they will be automatically added to the instance.  </p>
<p>Elements in the <code>renderers</code> array can be either functions or strings that reference methods of the <a href="/docs/api.md#stylesheet"><code>StyleSheet</code></a> instance. These 
methods will be bound to the instance before they are invoked.</p>
<p>By default, <a href="/docs/api.md#stylesheet"><code>StyleSheet</code></a> are rendered using the built-in renderers: <code>[this.renderStyles, this.parseStyles]</code>.</p>
<h2 id="themes">Themes</h2>
<p>A theme is a <a href="/docs/api.md#stylesheet"><code>StyleSheet</code></a> that provides access to CSS variables 
for consistent styling across your application. It supports multiple color schemes, 
including <code>light</code>, <code>dark</code>, <code>light dark</code> (default, adapts to system preferences), and <code>normal</code>. 
Themes allow your components to automatically adapt to changes in the user's system preferences 
or use a fixed color scheme.</p>
<p>The <a href="/docs/api.md#createtheme"><code>createTheme</code></a> function generates a theme StyleSheet instance. 
It accepts a <code>themes</code> object, which defines variables for the specified color schemes, and an 
<code>options</code> object to customize the theme generation.<br />
Each key in the <code>themes</code> object corresponds to a color scheme (<code>light</code>, <code>dark</code>, <code>normal</code>), 
and its value is an object of key-value pairs that will be converted into CSS variables.</p>
<h3 id="creatingatheme">Creating a Theme</h3>
<p>Define styles for <code>light</code> and <code>dark</code> color schemes using the <code>createTheme</code> function.</p>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">createTheme</span>(\{
    light : \{
        colorPrimary : <span class="hljs-string">&#x27;black&#x27;</span>,
        backgroundLevel1 : <span class="hljs-string">&#x27;white&#x27;</span>
    \},
    dark : \{
        colorPrimary : <span class="hljs-string">&#x27;white&#x27;</span>,
        backgroundLevel1 : <span class="hljs-string">&#x27;black&#x27;</span>
    \}
\});</code></pre>
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
<pre><code class="javascript language-javascript"><span class="hljs-comment">// Add theme class to the body</span>
<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(theme.<span class="hljs-property">classes</span>.<span class="hljs-property">root</span>);</code></pre>
<h3 id="usingthemevariablesinstyles">Using Theme Variables in Styles</h3>
<p>The <code>themes</code> object is automatically converted into CSS variables. For example:</p>
<pre><code class="javascript language-javascript">\{ backgroundLevel1 : <span class="hljs-string">&#x27;black&#x27;</span> \}</code></pre>
<p>is converted into the CSS variable <code>--fun-backgroundLevel1</code>.  </p>
<p>Nested structures like:</p>
<pre><code class="javascript language-javascript">\{
    palette : \{
        common : \{ 
            black : <span class="hljs-string">&#x27;#000&#x27;</span>
        \}
    \}
\}</code></pre>
<p>are converted into <code>--fun-palette-common-black</code>.  </p>
<p>You can use these variables in your component styles, even before the theme is applied. 
Your components will automatically update when the theme or system color scheme changes.</p>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    button : \{
        color : <span class="hljs-string">&#x27;var(--fun-colorPrimary)&#x27;</span>,
        backgroundColor : <span class="hljs-string">&#x27;var(--fun-backgroundLevel1)&#x27;</span>
    \},
\});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">\{ label \}</span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>\{label\}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
<h2 id="serversiderenderingssr">Server-Side Rendering (SSR)</h2>
<p>Easily add your styles to the server-rendered HTML by embedding the StyleSheets as a 
string within the <code>&lt;head&gt;</code> of your page.</p>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;express&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react&#x27;</span>;
<span class="hljs-keyword">import</span> \{ renderToString \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;react-dom/server&#x27;</span>;
<span class="hljs-keyword">import</span> \{ <span class="hljs-title class_">StyleSheet</span>, createTheme \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cssfun&#x27;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-title class_">App</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./App.js&#x27;</span>;

<span class="hljs-comment">// Create a theme with light and dark modes</span>
<span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">createTheme</span>(\{
    light : \{
        bg : <span class="hljs-string">&#x27;#fff&#x27;</span>,
        color : <span class="hljs-string">&#x27;#000&#x27;</span>
    \},
    dark : \{
        bg : <span class="hljs-string">&#x27;#000&#x27;</span>,
        color : <span class="hljs-string">&#x27;#fff&#x27;</span>
    \}
\});

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">express</span>();

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> \{
    <span class="hljs-comment">// Render the app</span>
    <span class="hljs-keyword">const</span> html = <span class="hljs-title function_">renderToString</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span>);

    <span class="hljs-comment">// Get generated styles as string</span>
    <span class="hljs-keyword">const</span> styles = <span class="hljs-title class_">StyleSheet</span>.<span class="hljs-title function_">toString</span>();

    <span class="hljs-comment">// Get theme root class</span>
    <span class="hljs-keyword">const</span> cls = theme.<span class="hljs-property">classes</span>.<span class="hljs-property">root</span>;

    <span class="hljs-keyword">const</span> template = <span class="hljs-string">\`
        &lt;!DOCTYPE html&gt;
        &lt;html lang=&quot;en&quot;&gt;
            &lt;head&gt;
                &lt;meta charset=&quot;UTF-8&quot;&gt;
                &lt;title&gt;SSR App&lt;/title&gt;
                <span class="hljs-subst">\$\{styles\}</span>
            &lt;/head&gt;
            &lt;body class=&quot;<span class="hljs-subst">\$\{cls\}</span>&quot;&gt;
                &lt;div id=&quot;root&quot;&gt;<span class="hljs-subst">\$\{html\}</span>&lt;/div&gt;
                &lt;script src=&quot;/bundle.js&quot;&gt;&lt;/script&gt;
            &lt;/body&gt;
        &lt;/html&gt;
    \`</span>;

    res.<span class="hljs-title function_">send</span>(template);
\});</code></pre>
<p>When the app is hydrated on the client side, the styles are preserved and won’t be recreated.</p>
<h2 id="apidocumentation">API Documentation</h2>
<p>Complete API documentation can be found <a data-router href="/api/">here</a>.</p>
<h2 id="examples">Examples</h2>
<p>The <code>examples</code> folder contains various sample projects demonstrating how to use <strong>CSSFUN</strong> in 
different environments and frameworks. Each example is a standalone project that you can run locally 
to see <strong>CSSFUN</strong> in action.</p>
<h3 id="availableexamples">Available Examples</h3>
<ul>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/react">React Example</a></strong>: A basic React application demonstrating the use of <strong>CSSFUN</strong> for styling React components. <a target="_blank" href="https://plnkr.co/plunk/hLIWLlAHGsE2ojO1">Try it</a>.</li>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/rasti">Rasti Example</a></strong>: A simple Rasti application illustrating how to apply <strong>CSSFUN</strong> to style Rasti components. <a target="_blank" href="https://plnkr.co/plunk/ivxPfUB5szwcuncf">Try it</a>.</li>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/vanilla">Vanilla JS Example</a></strong>: A straightforward JavaScript example showing how to use <strong>CSSFUN</strong> for styling HTML components. <a target="_blank" href="https://plnkr.co/plunk/4ypn83Ru5Z6uwZew">Try it</a>.</li>
</ul></section>
        `;var ze=D.create`
    <svg class="${({props:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M4.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L6.31 10l3.72-3.72a.75.75 0 1 0-1.06-1.06L4.72 9.47Zm9.25-4.25L9.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L11.31 10l3.72-3.72a.75.75 0 0 0-1.06-1.06Z" clip-rule="evenodd"/>
    </svg>
`;const{classes:De}=Z({header:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-xs)",marginBottom:"var(--rui-spacing-sm)",flexShrink:0},collapseButton:{width:"32px",height:"32px",padding:0,opacity:.4,transition:"transform 0.2s ease, opacity 0.2s ease"},collapseButtonRotated:{transform:"rotate(180deg)"},...q(e=>({[e]:{}})),outlined:{...q(e=>({[`&$${e}`]:{}}))},solid:{...q(e=>({[`&$${e} $collapseButton`]:{opacity:1},[`&$${e} $collapseButton`]:{color:`var(--rui-palette-${e}-contrastMain) !important`}}))}}),Ie=D.create`
    <div class="${({props:e})=>[De.header,De[e.variant||"outlined"],De[e.color||"neutral"]].filter(Boolean).join(" ")}">
        <${X} 
            variant="outlined"
            color="${({props:e})=>e.color||"neutral"}"
            size="sm"
            className="${({props:e})=>`${De.collapseButton} ${e.collapsed?De.collapseButtonRotated:""}`}"
            onClick="${({props:e})=>e.handleToggle}"
        >
            <${ze} />
        </${X}>
    </div>
`,{classes:We}=Z({root:{position:"sticky",top:0,alignSelf:"flex-start",height:"100%",maxHeight:"var(--rui-viewport-height)",display:"flex",flexDirection:"column",maxWidth:"280px",borderRight:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundSoftLevel3) / 0.5)",transition:"max-width 0.2s ease, padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",padding:"var(--rui-spacing-lg)"},expanded:{},collapsed:{maxWidth:"32px",overflow:"hidden"},content:{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden",opacity:1,transition:"opacity 0.2s ease, color 0.2s ease"},contentHidden:{opacity:0,visibility:"hidden"},outlined:{...q(e=>({[`&:where($${e})`]:{borderRightColor:`var(--rui-palette-${e}-foregroundSoftLevel3)`}}))},solid:{...q(e=>({[`&:where($${e})`]:{backgroundColor:`var(--rui-palette-${e}-main)`,borderRightColor:`var(--rui-palette-${e}-main)`},[`&:where($${e}) :where($content)`]:{color:`var(--rui-palette-${e}-contrastMain)`},[`&:where($${e}) :where($content) button`]:{color:`var(--rui-palette-${e}-contrastMain)`},[`&:where($${e}) :where($content) h3`]:{color:`var(--rui-palette-${e}-contrastMain)`}}))},...q(e=>({[e]:{}}))}),Fe=D.create`
    <div class="${({props:e})=>[We.content,e.collapsed?We.contentHidden:null,e.className||null].filter(Boolean).join(" ")}">
        ${({props:e})=>e.renderChildren()}
    </div>
`,Ue=D.create`
    <aside
        class="${({props:e})=>(e=>{const t=e.classes?{...We,...e.classes}:We;return[t.root,e.collapsed?t.collapsed:t.expanded,t[e.variant||"outlined"],t[e.color||"neutral"],e.className||null].filter(Boolean).join(" ")})(e)}"
    >
        ${({props:e})=>e.renderChildren()}
    </aside>
`;Ue.Header=Ie,Ue.Content=Fe;var Pe=D.create`
    <svg class="${({props:e})=>e.className}" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
        <path fill-rule="evenodd" d="M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z" clip-rule="evenodd"/>
    </svg>
`;const{classes:qe}=Z({root:{display:"flex",flexDirection:"column",marginTop:"var(--rui-app-appBarHeight)",minHeight:"calc(var(--rui-viewport-height) - var(--rui-app-appBarHeight))","@global a.anchor":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) * 2 + var(--rui-spacing-lg) * 2)"},"@global h2":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) * 2 + var(--rui-spacing-lg) * 2)"}},aside:{display:"none",top:"var(--rui-app-appBarHeight)",maxHeight:"calc(var(--rui-viewport-height) - var(--rui-app-appBarHeight))","@global > *:last-child":{paddingBottom:"var(--rui-spacing-md)"}},content:{flex:1,minWidth:0,width:"100%",paddingTop:"var(--rui-app-appBarHeight)"},secondaryHeader:{position:"fixed",top:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-lg))",left:"var(--rui-spacing-md)",right:"var(--rui-spacing-md)",display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)"},apiIndexDialog:{},[P("sm")]:{$root:{flexDirection:"row","@global a.anchor":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-sm))"},"@global h2":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-sm))"}},$aside:{display:"flex"},$content:{flex:1,minWidth:0,paddingTop:0,paddingLeft:"var(--rui-spacing-xl)",paddingRight:"var(--rui-spacing-xl)"},$secondaryHeader:{display:"none"},$apiIndexDialog:{display:"none"}}}),{classes:Ze}=Z({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-sm)",lineHeight:"var(--rui-lineHeight-sm)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-sm) 0",padding:"0",borderBottom:"none"},ul:{listStyle:"none",padding:"0",margin:"0"},li:{margin:"var(--rui-spacing-xs) 0",padding:"0"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},code:{fontSize:"var(--rui-fontSize-sm)"}},"& > ul > li":{fontSize:"var(--rui-fontSize-md)",fontWeight:"var(--rui-fontWeight-md)"},"& ul ul":{paddingLeft:"var(--rui-spacing-lg)",marginTop:"var(--rui-spacing-xs)",fontSize:"var(--rui-fontSize-sm)",fontWeight:"var(--rui-fontWeight-sm)"}}}),Ke=D.create`
            <nav class="${({props:e})=>(e=>[e.className||null,Ze.root].join(" "))(e)}"><h2 id="classes">Classes</h2>
<dl>
<dt><a href="#stylesheet">StyleSheet</a></dt>
<dd></dd>
</dl>
<h2 id="functions">Functions</h2>
<dl>
<dt><a href="#createtheme">createTheme(themes, [options])</a>
<dd><p>The <code>createTheme</code> function generates a theme StyleSheet instance with CSS variables 
based on the provided themes and options. It supports multiple color schemes, 
including <code>light</code>, <code>dark</code>, <code>light dark</code>, and <code>normal</code>. </p>
<p>The <code>themes</code> object defines the styles for these color schemes. Each key in the object 
corresponds to a color scheme (<code>light</code>, <code>dark</code>, <code>normal</code>), and its value is an object 
containing key-value pairs that will be converted into CSS variables. Nested keys are 
concatenated with <code>-</code> to form the variable name. For example, <code>\{ light : \{ colors : \{ primary : 'blue' \} \} \}</code> 
generates <code>--fun-colors-primary : blue</code>.</p>
</dd>
<dt><a href="#css">css(styles, [options])</a>
<dd><p>Creates and attaches a new StyleSheet instance to the DOM.</p>
</dd>
</dl>
<p></nav>
        `,Ye=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Ve}=Z({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-sm)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ye("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ye("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},margin:0,width:"100%",boxSizing:"border-box"}}),Ge=(e=>{const{ApiIndex:t,Api:s}=e;return D.create`
        <div class="${qe.root}">
            <${Ue} 
                className="${qe.aside}"
                collapsed="${({state:e})=>e.collapsed}"
            >
                <${Ue.Header}
                    collapsed="${({state:e})=>e.collapsed}"
                    handleToggle="${({state:e})=>()=>{e.collapsed=!e.collapsed}}"
                />
                <${Ue.Content} collapsed="${({state:e})=>e.collapsed}">
                    <${t} />
                </${Ue.Content}>
            </${Ue}>
            <${V}
                className="${qe.secondaryHeader}"
                color="neutral"
            >
                <${X}
                    label="api index"
                    variant="plain"
                    color="neutral"
                    renderLeftIcon=${()=>Pe.mount()}
                    onClick="${({state:e})=>()=>{e.dialogOpen=!0}}"
                />
            </${V}>
            ${({state:e,partial:s})=>e.dialogOpen?s`<${ne}
                    className="${qe.apiIndexDialog}"
                    handleClose="${({state:e})=>()=>{e.dialogOpen=!1}}"
                    shadow="lg"
                >
                    <${ne.Header}
                        title="API Index"
                        handleClose="${({state:e})=>()=>{e.dialogOpen=!1}}"
                        closeButton=${!0}
                    />
                    <${ne.Content}>
                        <${t} events="${({state:e})=>({"click a":()=>{e.dialogOpen=!1}})}" />
                    </${ne.Content}>
                </${ne}>`:null}
            <div class="${qe.content}">
                <${s} />
            </div>
        </div>
    `.extend({onCreate(){this.state=new n({collapsed:!1,dialogOpen:!1})}})})({ApiIndex:Ke,Api:D.create`
            <section class="${({props:e})=>(e=>[e.className||null,Ve.root].join(" "))(e)}"><a name="stylesheet" id="stylesheet" class="anchor"></a></p>
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
<td>Object mapping original class names to generated unique class names.</td>
</tr>
<tr>
<td>styles</td>
<td><code>Object</code></td>
<td>The original styles object provided to the instance.</td>
</tr>
<tr>
<td>uid</td>
<td><code>String</code></td>
<td>Unique identifier for the StyleSheet instance, generated using <code>this.generateUid</code>.</td>
</tr>
<tr>
<td>prefix</td>
<td><code>String</code></td>
<td>Prefix for generating unique identifiers. Set via options or subclass.</td>
</tr>
<tr>
<td>attributes</td>
<td><code>Object</code></td>
<td>Attributes to be added to the <code>&lt;style&gt;</code> element. Set via options or subclass.</td>
</tr>
<tr>
<td>renderers</td>
<td><code>Array</code></td>
<td>Array of renderer functions or method names used to process the styles object. Set via options or subclass.</td>
</tr>
<tr>
<td>el</td>
<td><code>HTMLElement</code></td>
<td>Reference to the <code>&lt;style&gt;</code> element in the DOM. Created when the instance is attached to the DOM.</td>
</tr>
</tbody>
</table>
<ul>
<li><a href="#stylesheet">StyleSheet</a><ul>
<li><a href="#new_stylesheet_new">new StyleSheet(styles, [options])</a></li>
<li><em>instance</em><ul>
<li><a href="#stylesheet__generateuid">.generateUid()</a> ⇒ <code>String</code></li>
<li><a href="#stylesheet__generateclassname">.generateClassName(className, index)</a> ⇒ <code>String</code></li>
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
<li><a href="#stylesheet_tocss">.toCSS()</a> ⇒ <code>string</code></li>
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
<td>Configuration options. The following options are assigned to the instance (<code>this</code>): <code>prefix</code>, <code>generateUid</code>, <code>generateClassName</code>, <code>shouldAttachToDOM</code>, <code>attributes</code>, <code>renderers</code>.</td>
</tr>
<tr>
<td>[options.prefix]</td>
<td><code>String</code></td>
<td><code>'fun'</code></td>
<td>Prefix for generating unique identifiers and data attributes.</td>
</tr>
<tr>
<td>[options.generateUid]</td>
<td><code>function</code></td>
<td></td>
<td>Custom function to generate the unique identifier.</td>
</tr>
<tr>
<td>[options.generateClassName]</td>
<td><code>function</code></td>
<td></td>
<td>Custom function to generate unique class names.</td>
</tr>
<tr>
<td>[options.attributes]</td>
<td><code>Object</code></td>
<td></td>
<td>Attributes to be added to the <code>&lt;style&gt;</code> element.</td>
</tr>
<tr>
<td>[options.renderers]</td>
<td><code>Array</code></td>
<td><code>['parseStyles', 'renderStyles']</code></td>
<td>Array of renderer functions or method names. Renderers are composed in sequence. Strings or functions are automatically bound to <code>this</code>.</td>
</tr>
<tr>
<td>[options.shouldAttachToDOM]</td>
<td><code>function</code></td>
<td></td>
<td>Custom function to determine whether the StyleSheet should be added to the DOM.</td>
</tr>
</tbody>
</table>
<p><strong>Example</strong>  </p>
<pre><code class="js language-js"><span class="hljs-comment">// Create a new StyleSheet instance with a styles object.</span>
<span class="hljs-keyword">const</span> instance = <span class="hljs-keyword">new</span> <span class="hljs-title class_">StyleSheet</span>(\{
    <span class="hljs-attr">root</span>: \{
        <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;black&#x27;</span>
    \}
\});

<span class="hljs-comment">// Attach the StyleSheet instance to the DOM.</span>
instance.<span class="hljs-title function_">attach</span>();

<span class="hljs-comment">// Retrieve the generated classes object from the instance.</span>
<span class="hljs-keyword">const</span> \{ classes \} = instance;

<span class="hljs-comment">// Use the generated class name in your component.</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">Header</span>(<span class="hljs-params"></span>) \{
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.root\}</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
\}</code></pre>
<p><a name="stylesheet__generateuid" id="stylesheet__generateuid" class="anchor"></a></p>
<h3 id="stylesheetgenerateuidc27c">styleSheet.generateUid() ⇒ <code>String</code></h3>
<p>Generate a stable unique identifier.
May be overridden by <code>options.generateUid</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The unique identifier.<br />
<a name="stylesheet__generateclassname" id="stylesheet__generateclassname" class="anchor"></a></p>
<h3 id="stylesheetgenerateclassnameclassnameindexc30c">styleSheet.generateClassName(className, index) ⇒ <code>String</code></h3>
<p>Generate a unique class name.
Transform local selectors that are classes to unique class names
to be used as class names in the styles object.
May be overridden by <code>options.generateClassName</code> or by extending the class.</p>
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
<tr>
<td>index</td>
<td><code>Number</code></td>
<td>The index of the class name.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet__render" id="stylesheet__render" class="anchor"></a></p>
<h3 id="stylesheetrenderc35c">styleSheet.render() ⇒ <code>String</code></h3>
<p>Apply the renderers to the styles object.
It will return a string ready to be added to the style element.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The styles object as a string.<br />
<a name="stylesheet__tostring" id="stylesheet__tostring" class="anchor"></a></p>
<h3 id="stylesheettostringc38c">styleSheet.toString() ⇒ <code>String</code></h3>
<p>Render the StyleSheet as a style element string.
Used for server-side rendering.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>String</code> - The instance as a string.<br />
<a name="stylesheet__shouldattachtodom" id="stylesheet__shouldattachtodom" class="anchor"></a></p>
<h3 id="stylesheetshouldattachtodomc41c">styleSheet.shouldAttachToDOM() ⇒ <code>Boolean</code></h3>
<p>Check if the StyleSheet should be added to the DOM.
By default, it returns true if running in a browser environment and no style element
with the same <code>data-fun-uid</code> attribute exists in the DOM.
This prevents duplicate style elements and ensures proper behavior for server-side rendering.
May be overridden by <code>options.shouldAttachToDOM</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>Boolean</code> - True if the StyleSheet should be added to the DOM, false otherwise.<br />
<a name="stylesheet__attach" id="stylesheet__attach" class="anchor"></a></p>
<h3 id="stylesheetattachc44cstylesheet">styleSheet.attach() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
<p>Add the instance to the registry and if we are in the browser, 
attach it to the DOM.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The instance.<br />
<a name="stylesheet__destroy" id="stylesheet__destroy" class="anchor"></a></p>
<h3 id="stylesheetdestroyc47cstylesheet">styleSheet.destroy() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
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
<strong>Default</strong>: <code>__DEV__</code><br />
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
<h3 id="stylesheettostringc61c">StyleSheet.toString() ⇒ <code>string</code></h3>
<p>Render all instances in the registry as a string, including the style tags.
Can be used to insert style tags in an HTML template for server-side rendering.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - All instances in the registry as a string.<br />
<a name="stylesheet_tocss" id="stylesheet_tocss" class="anchor"></a></p>
<h3 id="stylesheettocssc64c">StyleSheet.toCSS() ⇒ <code>string</code></h3>
<p>Render all instances in the registry as CSS string.
Can be used to generate an external CSS file.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - All instances in the registry rendered as CSS string.<br />
<a name="stylesheet_destroy" id="stylesheet_destroy" class="anchor"></a></p>
<h3 id="stylesheetdestroy">StyleSheet.destroy()</h3>
<p>Destroy all instances in the registry and remove them from 
it and from the DOM.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<a name="createtheme" id="createtheme" class="anchor"></a></p>
<h2 id="createthemethemesoptionsc68cstylesheet">createTheme(themes, [options]) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
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
<pre><code class="js language-js"><span class="hljs-comment">// Create a theme with light and dark color schemes and apply it to the entire page.</span>
<span class="hljs-keyword">const</span> theme = <span class="hljs-title function_">createTheme</span>(\{
    light : \{
        colorPrimary : <span class="hljs-string">&#x27;black&#x27;</span>,
        backgroundLevel1 : <span class="hljs-string">&#x27;white&#x27;</span>
    \},
    dark : \{
        colorPrimary : <span class="hljs-string">&#x27;white&#x27;</span>,
        backgroundLevel1 : <span class="hljs-string">&#x27;black&#x27;</span>
    \}
\});

<span class="hljs-comment">// Add the \`root\` class (the theme class) to the body element.</span>
<span class="hljs-comment">// This will apply the theme to the entire page.</span>
<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(theme.<span class="hljs-property">classes</span>.<span class="hljs-property">root</span>);

<span class="hljs-comment">// Add some styles using the theme CSS variables.</span>
<span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    button : \{
        color : <span class="hljs-string">&#x27;var(--fun-colorPrimary)&#x27;</span>, <span class="hljs-comment">// Use the CSS variable generated from the theme.</span>
        backgroundColor : <span class="hljs-string">&#x27;var(--fun-backgroundLevel1)&#x27;</span>
    \}
\});

<span class="hljs-comment">// Add the \`button\` class to a button component.</span>
<span class="hljs-comment">// The button will use the CSS variables defined in the theme for its styles.</span>
<span class="hljs-comment">// Once the theme is applied, the button will automatically update its styles.</span>
<span class="hljs-comment">// If the system color scheme changes (e.g., from light to dark), the button will </span>
<span class="hljs-comment">// dynamically update to reflect the new theme without requiring additional code.</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params">\{ label \}</span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>\{label\}<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
<p><a name="css" id="css" class="anchor"></a></p>
<h2 id="cssstylesoptionsc76cstylesheet">css(styles, [options]) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
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
<pre><code class="js language-js"><span class="hljs-comment">// Create styles for a link component.</span>
<span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    link : \{
        color : <span class="hljs-string">&#x27;blue&#x27;</span>,
        <span class="hljs-string">&#x27;&amp;:hover&#x27;</span> : \{
            textDecoration : <span class="hljs-string">&#x27;underline&#x27;</span>
        \}
    \}
\});

<span class="hljs-comment">// Use the generated \`link\` class in a component.</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Link</span> = (<span class="hljs-params">\{ label, href \}</span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.link\}</span> <span class="hljs-attr">href</span>=<span class="hljs-string">\{href\}</span>&gt;</span>\{label\}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>;</code></pre></section>
        `}),{AppBar:Xe,AppBarMenuContent:Je}=(()=>{const{logoAlt:e,playgroundUrl:t,githubUrl:s,npmUrl:a}={logoAlt:"CSSFUN",playgroundUrl:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",githubUrl:"https://github.com/8tentaculos/cssfun",npmUrl:"https://www.npmjs.com/package/cssfun"},r=D.create`
        <div class="${Le.menuContent}">
            <nav><ul>
                ${({props:e,partial:r})=>r`
                    <li>
                        <${X}
                            href="/api/"
                            onClick=${()=>e.handleOpen(!1)}
                            attributes=${{"data-router":!0}}
                            label="API"
                            variant="plain"
                            size="lg"
                            color="${({props:e})=>!e.location.params.notFound&&e.location.test("/api/")?"primary":"neutral"}"
                        />
                    </li>
                    <li>
                        <${X}
                            href="${t}"
                            onClick=${()=>e.handleOpen(!1)}
                            target="_blank"
                            label="Playground"
                            variant="plain"
                            size="lg"
                        />
                    </li>
                    <li>
                        <${X}
                            href="${s}"
                            onClick=${()=>e.handleOpen(!1)}
                            target="_blank"
                            label="GitHub"
                            variant="plain"
                            size="lg"
                            renderLeftIcon=${()=>Ce.mount({className:Le.icon})}
                        />
                    </li>
                    <li>
                        <${X}
                            href="${a}"
                            onClick=${()=>e.handleOpen(!1)}
                            target="_blank"
                            label="npm"
                            variant="plain"
                            size="lg"
                            renderLeftIcon=${()=>Ee.mount({className:Le.icon})}
                        />
                    </li>
                `}
            </ul></nav>
        </div>
    `;return{AppBar:D.create`
        <${xe} className="${Le.root}">
            <${xe.Left}>
                <div class="${Le.leftContent}">
                    <${X}
                        href="/"
                        attributes=${{"data-router":!0}}
                        variant="plain"
                    >
                        <span class="${({props:e})=>e.location.params.notFound||!e.location.test("/")?Le.logoInactive:""}">
                            <img height="24" class="${Le.hiddenIfLight}" alt="${e}" src="/logo-dark.svg">
                            <img height="24" class="${Le.hiddenIfDark}" alt="${e}" src="/logo.svg">
                        </span>
                    </${X}>
                </div>
            </${xe.Left}>
            <${xe.Center}>
            </${xe.Center}>
            <${xe.Right}>
                <div class="${Le.rightContent}">
                    <nav class="${Le.navLinks}">
                        <ul>
                            <li>
                                <${X}
                                    href="/api/"
                                    attributes=${{"data-router":!0}}
                                    label="API"
                                    variant="plain"
                                    color="${({props:e})=>!e.location.params.notFound&&e.location.test("/api/")?"primary":"neutral"}"
                                />
                            </li>
                            <li>
                                <${X}
                                    href="${t}"
                                    target="_blank"
                                    label="Playground"
                                    variant="plain"
                                />
                            </li>
                            <li>
                                <${X}
                                    href="${s}"
                                    target="_blank"
                                    variant="plain"
                                    renderChildren=${()=>Ce.mount({className:Le.icon})}
                                />
                            </li>
                            <li>
                                <${X}
                                    href="${a}"
                                    target="_blank"
                                    variant="plain"
                                    renderChildren=${()=>Ee.mount({className:Le.icon})}
                                />
                            </li>
                        </ul>
                    </nav>
                    <${ke} />
                    <div class="${Le.menuButton}">
                        <${X}
                            color="primary"
                            variant="plain"
                            size="lg"
                            onClick="${({props:e})=>e.onMenuClick}"
                        >
                            <${Se} className=${Le.icon} />
                        </${X}>
                    </div>
                </div>
            </${xe.Right}>
        </${xe}>
    `,AppBarMenuContent:r}})(),Qe=(e=>{const{title:t,AppBar:s,AppBarMenuContent:a,Cover:r,Description:o,Features:i,Readme:l,Api:c,Footer:d}=e;return D.create`
        <div class="${ge.root}">
            <${s} 
                location="${({state:e})=>e.location}"
                onMenuClick="${({state:e})=>()=>{e.menuOpen=!0}}"
            />

            ${({state:e,partial:t})=>e.menuOpen&&a?t`<${ne}
                    className="${ge.appBarMenuDialog}"
                    handleClose=${()=>{e.menuOpen=!1}}
                    shadow="lg"
                >
                    <${ne.Header}
                        handleClose=${()=>{e.menuOpen=!1}}
                        closeButton=${!0}
                    />
                    <${ne.Content}
                        renderChildren=${()=>a.mount({handleOpen:t=>{e.menuOpen=t},location:e.location})}
                    />
                </${ne}>`:null}

            ${({state:e,partial:t})=>e.location.params.notFound?t`<${ue} />`:e.location.test("/api/")?t`<${c} />`:t`
                        <${r} />
                        ${o?t`<${o} />`:null}
                        <${i} />
                        <${l} />
                    `}

            <${d} />
        </div>
    `.extend({onCreate(e={}){this.state=new n({location:null,menuOpen:!1});const t=[{path:"/api/",action:e=>this.updateRoute(e)},{path:"/",action:e=>this.updateRoute(e)},{path:"*notFound",action:e=>this.updateRoute(e)}];this.router=function(e,t={}){const{baseUrl:s=""}=t,a=e=>{const[t,a]=e.replace(s,"").split("?");return{pathname:t,query:a}},r=(e,t)=>(0,oe.YW)(t,{decode:decodeURIComponent})(e),n=(t,s={})=>{const{addToHistory:n=!0,replaceHistory:i=!1}=s,l=(t=>{const{pathname:s,query:n}=a(t);for(const t of e){const e=r(s,t.path);if(e){const s={path:t.path,params:o(e.params),query:Object.fromEntries(new URLSearchParams(n).entries()),test:e=>!!r(a(e).pathname,t.path)};return()=>t.action(s)}}return null})(t);l?(n&&"undefined"!=typeof window&&window.history[i?"replaceState":"pushState"]({},"",t),l()):console.error("No route matched:",t)},o=e=>{const t={};for(const[s,a]of Object.entries(e))t[s]=String(a).replace(/[<>]/g,"");return t};return{navigate:n,createUrl:(e,t={},a={})=>{const r=(0,oe.wE)(e,{encode:encodeURIComponent})(t),n=new URLSearchParams(a).toString();return`${s}${n?`${r}?${n}`:r}`},delegateNavigation:e=>{const t=e=>{if(e.defaultPrevented||0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const t=e.target.closest("a[data-router]");if(t&&t.href){e.preventDefault();const s=new URL(t.href);window.scrollTo({top:0}),n(s.pathname+s.search)}};return e.addEventListener("click",t),()=>{e.removeEventListener("click",t)}},bindHistory:()=>{const e=()=>{n(window.location.pathname+window.location.search,{addToHistory:!1})};return window.addEventListener("popstate",e),()=>{window.removeEventListener("popstate",e)}}}}(t),"undefined"!=typeof window?(this.router.delegateNavigation(document.body),this.router.bindHistory(),this.router.navigate(e.url||window.location.pathname+window.location.search,{addToHistory:!1,replaceHistory:!0})):this.router.navigate(e.url,{addToHistory:!1})},updateRoute(e){this.state.location=e,"undefined"!=typeof document&&(document.title=this.getTitle())},getTitle(){const e=this.state.location.params.notFound?" - Not Found":this.state.location.test("/api/")?" - API Documentation":this.state.location.test("/")?" - Home":"";return`${t}${e}`}})})({title:"CSSFUN",AppBar:Xe,AppBarMenuContent:Je,Cover:Re,Features:Me,Readme:Oe,Api:Ge,Footer:(()=>{const{licenseUrl:e,startYear:t}={licenseUrl:"https://github.com/8tentaculos/cssfun/blob/master/LICENSE",startYear:2024};return D.create`
        <footer class="${Te.root}">
            <${de} level="titleMd" className="${Te.text}">
                Released under the <a href="${e}" target="_blank">MIT License</a>
            </${de}>
            <${de} level="titleSm" className="${Te.text}">
                Copyright © ${()=>{const e=(new Date).getFullYear();return e===t?e:`${t}-${e}`}} by <a href="https://github.com/8tentaculos/" target="_blank">8tentaculos</a>
            </${de}>
        </footer>
    `})()});Qe.mount({url:window.location.pathname+window.location.search},document.getElementById("root"),!0)})();