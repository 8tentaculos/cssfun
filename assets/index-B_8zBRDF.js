(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const Ve=!1;function re(e){if(typeof e!="function"){const t="Event listener must be a function";throw new TypeError(t)}}class De{on(t,s){return re(s),this.listeners||(this.listeners={}),this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(s),()=>this.off(t,s)}once(t,s){re(s);const r=(...a)=>{s(...a),this.off(t,r)};return this.on(t,r)}off(t,s){if(this.listeners){if(!t){delete this.listeners;return}this.listeners[t]&&(s?(this.listeners[t]=this.listeners[t].filter(r=>r!==s),this.listeners[t].length||delete this.listeners[t]):delete this.listeners[t],Object.keys(this.listeners).length||delete this.listeners)}}emit(t,...s){!this.listeners||!this.listeners[t]||this.listeners[t].slice().forEach(r=>r(...s))}listenTo(t,s,r){return t.on(s,r),this.listeningTo||(this.listeningTo=[]),this.listeningTo.push({emitter:t,type:s,listener:r}),()=>this.stopListening(t,s,r)}listenToOnce(t,s,r){re(r);const a=(...n)=>{r(...n),this.stopListening(t,s,a)};return this.listenTo(t,s,a)}stopListening(t,s,r){this.listeningTo&&(this.listeningTo=this.listeningTo.filter(a=>!t||t===a.emitter&&!s||t===a.emitter&&s===a.type&&!r||t===a.emitter&&s===a.type&&r===a.listener?(a.emitter.off(a.type,a.listener),!1):!0),this.listeningTo.length||delete this.listeningTo)}}const G=(e,t,...s)=>typeof e!="function"?e:e.apply(t,s);class le extends De{constructor(){super(),this.preinitialize.apply(this,arguments),this.attributes=Object.assign({},G(this.defaults,this),this.parse.apply(this,arguments)),this.previous={},Object.keys(this.attributes).forEach(this.defineAttribute.bind(this))}preinitialize(){}defineAttribute(t){Object.defineProperty(this,`${this.constructor.attributePrefix}${t}`,{get:()=>this.get(t),set:s=>{this.set(t,s)}})}get(t){return this.attributes[t]}set(t,s,...r){let a,n;typeof t=="object"?(a=t,n=[s,...r]):(a={[t]:s},n=r);const o=this._changing;this._changing=!0;const i={};o||(this.previous=Object.assign({},this.attributes)),Object.keys(a).forEach(h=>{a[h]!==this.attributes[h]&&(i[h]=a[h],this.attributes[h]=a[h])});const c=Object.keys(i);if(c.length&&(this._pending=["change",this,i,...n]),c.forEach(h=>{this.emit(`change:${h}`,this,a[h],...n)}),o)return this;for(;this._pending;){const h=this._pending;this._pending=null,this.emit.apply(this,h)}return this._pending=null,this._changing=!1,this}parse(t){return t}toJSON(){return Object.assign({},this.attributes)}}le.attributePrefix="";const Ye=["el","tag","attributes","events","model","template","onDestroy"];class ne extends De{constructor(t={}){super(),this.preinitialize.apply(this,arguments),this.delegatedEventListeners=[],this.children=[],this.destroyQueue=[],this.viewOptions=[],Ye.forEach(s=>{s in t&&(this[s]=t[s],this.viewOptions.push(s))}),this.ensureUid(),this.ensureElement()}preinitialize(){}$(t){return this.el.querySelector(t)}$$(t){return this.el.querySelectorAll(t)}destroy(){return this.destroyChildren(),this.undelegateEvents(),this.stopListening(),this.off(),this.destroyQueue.forEach(t=>t()),this.destroyQueue=[],this.onDestroy.apply(this,arguments),this.destroyed=!0,this}onDestroy(){}addChild(t){return this.children.push(t),t}destroyChildren(){this.children.forEach(t=>t.destroy()),this.children=[]}ensureUid(){this.uid||(this.uid=`r${++ne.uid}`)}ensureElement(){if(this.el)this.el=G(this.el,this);else{const t=G(this.tag,this),s=G(this.attributes,this);this.el=this.createElement(t,s)}this.delegateEvents()}createElement(t="div",s={}){let r=document.createElement(t);return Object.keys(s).forEach(a=>r.setAttribute(a,s[a])),r}removeElement(){return this.el.parentNode.removeChild(this.el),this}delegateEvents(t){if(t||(t=G(this.events,this)),!t)return this;this.delegatedEventListeners.length&&this.undelegateEvents();const s={};return Object.keys(t).forEach(r=>{const a=r.match(/^(\w+)(?:\s+(.+))*$/);if(!a){const c=`Invalid event format: ${r}`;throw new Error(c)}const[,n,o]=a;let i=t[r];typeof i=="string"&&(i=this[i]),re(i),s[n]||(s[n]=[]),s[n].push([o,i])}),Object.keys(s).forEach(r=>{const a=n=>{let o=n.target;for(;o;)o.matches&&s[r].forEach(([i,c])=>{(o===this.el&&!i||o!==this.el&&o.matches(i))&&c.call(this,n,this,o)}),o=o===this.el||n.cancelBubble?null:o.parentElement};this.delegatedEventListeners.push([r,a]),this.el.addEventListener(r,a)}),this}undelegateEvents(){return this.delegatedEventListeners.forEach(([t,s])=>{this.el.removeEventListener(t,s)}),this.delegatedEventListeners=[],this}render(){return this}static sanitize(t){return`${t}`.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[s])}static resetUid(){ne.uid=0}}ne.uid=0;class $e{constructor(t){this.value=t}toString(){return this.value}}class fe{constructor(t){this.items=t}}class Ge{constructor(){this.listeners=[],this.types=new Set,this.previousSize=0}addListener(t,s){return this.types.add(s),this.listeners.push(t),this.listeners.length-1}reset(){this.listeners=[],this.previousSize=this.types.size}hasPendingTypes(){return this.types.size>this.previousSize}}function Ze(e,t={}){const s={},r=[];return Object.keys(e).forEach(a=>{let n=e[a];n!==t[a]&&(n===!0?s[a]="":n!==!1&&((n===null||typeof n>"u")&&(n=""),s[a]=n))}),Object.keys(t).forEach(a=>{(!(a in e)||t[a]!==e[a]&&e[a]===!1)&&r.push(a)}),{add:s,remove:r}}const we=["value","checked","selected"];let Xe=class{constructor(t){this.getSelector=t.getSelector,this.getAttributes=t.getAttributes,this.previousAttributes={}}hydrate(t){this.ref=t.querySelector(this.getSelector())}update(){const t=this.getAttributes(),{remove:s,add:r}=Ze(t,this.previousAttributes);this.previousAttributes=t,s.forEach(a=>{this.ref.removeAttribute(a),we.indexOf(a)!==-1&&a in this.ref&&(this.ref[a]=a==="value"?"":!1)}),Object.keys(r).forEach(a=>{const n=r[a];this.ref.setAttribute(a,n),we.indexOf(a)!==-1&&a in this.ref&&(this.ref[a]=a==="value"?n:n!==!1&&n!=="false")})}};class Je{constructor(){}reset(){this.paused=0,this.previous=this.tracked||new Map,this.tracked=new Map,this.positionStack=[0]}push(){this.positionStack.push(0)}pop(){this.positionStack.pop()}increment(){this.positionStack[this.positionStack.length-1]++}pause(){this.paused++}resume(){this.paused--}getPath(){return this.positionStack.join("-")}track(t){return this.paused===0&&this.tracked.set(this.getPath(),t),t}hasSingleComponent(){if(this.tracked.size!==1||this.previous.size!==1)return!1;const[t,s]=this.tracked.entries().next().value,[r,a]=this.previous.entries().next().value;return t!=="0"||r!=="0"?!1:s===a}findRecyclable(t){const s=this.previous.get(this.getPath());return s&&!s.key&&s.constructor===t.constructor?s:null}}const je=["value","checked","selected"],Qe=(e,t)=>{const s=e.childNodes,r=t.childNodes,a=s.length;if(a!==r.length)return!1;for(let n=0;n<a;n++)if(!s[n].isEqualNode(r[n]))return!1;return!0},et=(e,t)=>{const s=t.attributes,r=e.attributes,a=new Set;for(let n=0,o=s.length;n<o;n++){const{name:i,value:c}=s[n];a.add(i),e.getAttribute(i)!==c&&e.setAttribute(i,c)}for(let n=r.length-1;n>=0;n--){const{name:o}=r[n];a.has(o)||e.removeAttribute(o)}for(let n=0,o=je.length;n<o;n++){const i=je[n];i in e&&e[i]!==t[i]&&(e[i]=t[i])}},tt=(e,t)=>{const s=Array.from(t.childNodes);e.replaceChildren(...s)};function st(e,t){if(e.nodeType!==t.nodeType){e.replaceWith(t);return}if(e.nodeType===Node.TEXT_NODE){e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue);return}if(e.tagName!==t.tagName){e.replaceWith(t);return}et(e,t),Qe(e,t)||tt(e,t)}function me(e,t,s=()=>!1,r){let a=r||e.firstChild;for(;a;){if(a.nodeType===Node.COMMENT_NODE&&a.data.trim()===t)return a;if(a.nodeType===Node.ELEMENT_NODE&&!s(a)&&a.firstChild){a=a.firstChild;continue}for(;a&&!a.nextSibling;)if(a=a.parentNode,!a||a===e)return null;a&&(a=a.nextSibling)}return null}class ke{constructor(t){this.getStart=t.getStart,this.getEnd=t.getEnd,this.expression=t.expression,this.shouldSkipFind=t.shouldSkipFind,this.shouldSkipSync=t.shouldSkipSync,this.tracker=new Je}hydrate(t){const s=me(t,this.getStart(),this.shouldSkipFind),r=me(t,this.getEnd(),this.shouldSkipFind,s);this.ref=[s,r]}update(t,s){let r;const[a,n]=this.ref,o=a.nextSibling,i=o===n,c=!i&&o.nextSibling===n;if(i?n.parentNode.insertBefore(t,n):c&&t.children.length===1&&!this.shouldSkipSync(o)&&!this.shouldSkipSync(t.firstChild)?st(o,t.firstChild):(r=document.createComment(""),n.parentNode.insertBefore(r,n),n.parentNode.insertBefore(t,n)),s(),r)if(this.ref[0].nextSibling===r)r.parentNode.removeChild(r);else{const w=document.createRange();w.setStartAfter(this.ref[0]),w.setEndAfter(r),w.deleteContents()}}updateElement(t,s,r){const a=document.createComment("");t.parentNode.insertBefore(a,t.nextSibling),a.parentNode.insertBefore(s.firstChild,a.nextSibling),r(),t.nextSibling===a&&t.parentNode.removeChild(t),a.parentNode.removeChild(a)}}const Ie=e=>e.reduce((t,s)=>(Array.isArray(s)?t.push(...Ie(s)):t.push(s),t),[]);function ce(e){const t=document.createElement("template");return t.innerHTML=`${e}`.trim(),t.content}function Pe(e){const t=[];return Object.keys(e).forEach(s=>{let r=e[s];r===!0?t.push(s):r!==!1&&((r===null||typeof r>"u")&&(r=""),t.push(`${s}="${r}"`))}),t.join(" ")}let de,ie,Fe,Be;typeof document<"u"&&(de=!!navigator.userAgent.match(/Chrome/),ie=!!Element.prototype.moveBefore,Fe=!ie||de,Be=ie&&de);function at(e,t){const s=Fe&&document.activeElement&&t.contains(document.activeElement)?document.activeElement:null;s&&Be&&s.blur(),e.parentNode[ie?"moveBefore":"insertBefore"](t,e),e.parentNode.removeChild(e),s&&s!==document.activeElement&&t.contains(s)&&s.focus()}const X=(e,t,s)=>{try{return typeof e!="function"?e:(Ve&&e.prototype instanceof m,e.call(t,t))}catch(r){if(s&&!r._rasti){let a;a=`Error in ${t.constructor.name}#${t.uid} expression`;const n=new Error(a,{cause:r});throw n._rasti=!0,n}throw r}},Ce=e=>!!(e&&e.dataset&&e.dataset[m.DATASET_ELEMENT]&&e.dataset[m.DATASET_ELEMENT].endsWith("-1")),rt=e=>!!(e&&(e.dataset&&e.dataset[m.DATASET_ELEMENT]||e.querySelector&&e.querySelector(`[${m.ATTRIBUTE_ELEMENT}]`))),Ee=(e,t)=>e.reduce((s,r,a)=>(s.push(r),typeof t[a]<"u"&&s.push(m.PLACEHOLDER(a)),s),[]).join(""),ye=(e,t)=>{const s=m.PLACEHOLDER("(\\d+)"),r=e.match(new RegExp(`^${s}$`));if(r)return[t[parseInt(r[1],10)]];const a=new RegExp(`${s}`,"g"),n=[];let o=0,i;for(;(i=a.exec(e))!==null;){const c=e.slice(o,i.index);n.push(m.markAsSafeHTML(c),t[parseInt(i[1],10)]),o=i.index+i[0].length}return n.push(m.markAsSafeHTML(e.slice(o))),n},xe=(e,t)=>e.reduce((s,r)=>{const a=t(r[0]);if(r.length===1)typeof a=="object"?s=Object.assign(s,a):typeof a=="string"&&(s[a]=!0);else{const n=r[2]?t(r[1]):r[1];s[a]=n}return s},{}),We=(e,t,s)=>{const r={};return Object.keys(e).forEach(a=>{const n=a.match(/on(([A-Z]{1}[a-z]+)+)/);if(n&&n[1]){const o=n[1].toLowerCase(),i=e[a];if(i){const c=t.addListener(i,o);r[s(o)]=c}}else r[a]=e[a]}),r},ve=(e,t,s=!1)=>{const r=m.PLACEHOLDER("(\\d+)"),a=new Map;return s||(e=e.replace(new RegExp(r,"g"),(n,o)=>{const i=t[o];if(i&&i.prototype instanceof m){if(a.has(i))return a.get(i);a.set(i,n)}return n})),e.replace(new RegExp(`<(${r})([^>]*)/>|<(${r})([^>]*)>([\\s\\S]*?)</\\4>`,"g"),(n,o,i,c,h,w,u,d)=>{let p,v,T;if(h?(p=t[w],v=u):(p=typeof i<"u"?t[i]:o,v=c),!(p.prototype instanceof m))return n;if(h){const K=ve(d,t,!0),D=qe(K,t);T=ye(D,t)}const F=Se(v,t),R=function(){const K=xe(F,D=>X(D,this,"children options"));return T&&(K.renderChildren=()=>new fe(T.map(D=>X(D,this,"children")))),p.mount(K)};return t.push(R),m.PLACEHOLDER(t.length-1)})},Ue=(e,t)=>{const s=m.PLACEHOLDER("(?:\\d+)");return e.replace(new RegExp(`<(${s}|[a-z]+[1-6]?)(?:\\s*)((?:"[^"]*"|'[^']*'|[^>])*)(/?>)`,"gi"),t)},nt=(e,t,s)=>{const r=m.PLACEHOLDER("(?:\\d+)");if(e.match(new RegExp(`^\\s*${r}\\s*$`)))return e;const n=e.match(new RegExp(`^\\s*<([a-z]+[1-6]?|${r})([^>]*)>([\\s\\S]*?)</(\\1|${r})>\\s*$|^\\s*<([a-z]+[1-6]?|${r})([^>]*)/>\\s*$`));if(!n){const i="Invalid component template";throw new Error(i)}let o=0;return Ue(n[0],(i,c,h,w)=>{const u=o===0,d=++o;if(!u&&!h.match(new RegExp(r)))return i;const p=Se(h,t),v=D=>`${D}-${d}`,T=function(){const D=We(xe(p,V=>X(V,this,"element attribute")),this.eventsManager,V=>m.ATTRIBUTE_EVENT(V,this.uid));return u&&this.attributes&&Object.assign(D,G(this.attributes,this)),D[m.ATTRIBUTE_ELEMENT]=v(this.uid),D},F=function(){return`[${m.ATTRIBUTE_ELEMENT}="${v(this.uid)}"]`},R=s.length;s.push({getSelector:F,getAttributes:T}),t.push(function(){const D=this.template.elements[R],V=D.getAttributes.call(this);return D.previousAttributes=V,m.markAsSafeHTML(Pe(V))});const K=m.PLACEHOLDER(t.length-1);return`<${c} ${K}${w}`})},qe=(e,t)=>{const s=m.PLACEHOLDER("(?:\\d+)");return Ue(e,(r,a,n,o)=>{if(!n.match(new RegExp(s)))return r;const i=Se(n,t),c=function(){return We(xe(i,u=>X(u,this,"partial element attribute")),this.eventsManager,u=>m.ATTRIBUTE_EVENT(u,this.uid))};t.push(function(){const w=c.call(this);return m.markAsSafeHTML(Pe(w))});const h=m.PLACEHOLDER(t.length-1);return`<${a} ${h}${o}`})},ot=(e,t,s)=>{const r=m.PLACEHOLDER("(\\d+)");let a=0;return e.replace(new RegExp(r,"g"),function(n,o,i){const c=e.substring(0,i),h=c.lastIndexOf("<"),w=c.lastIndexOf(">");if(h>w)return n;const u=++a;function d(){return m.MARKER_START(`${this.uid}-${u}`)}function p(){return m.MARKER_END(`${this.uid}-${u}`)}const v=s.length;return s.push({getStart:d,getEnd:p,expression:t[o]}),t.push(function(){return this.template.interpolations[v]}),m.PLACEHOLDER(t.length-1)})},Se=(e,t)=>{const s=m.PLACEHOLDER("(\\d+)"),r=[],a=new RegExp(`(?:${s}|([\\w-]+))(?:=(["']?)(?:${s}|((?:.?(?!["']?\\s+(?:\\S+)=|\\s*/>|\\s*[>"']))+.))?\\3)?`,"g");let n;for(;(n=a.exec(e))!==null;){const[,o,i,c,h,w]=n,u=!!c;let d=typeof o<"u"?t[parseInt(o,10)]:i,p=typeof h<"u"?t[parseInt(h,10)]:w;u&&typeof p>"u"&&(p=""),typeof p<"u"?r.push([d,p,u]):r.push([d])}return r},it=["key","state","onCreate","onChange","onHydrate","onBeforeRecycle","onRecycle","onBeforeUpdate","onUpdate"];class m extends ne{constructor(t={}){super(...arguments),this.componentOptions=[],it.forEach(r=>{r in t&&(this[r]=t[r],this.componentOptions.push(r))});const s={};Object.keys(t).forEach(r=>{this.viewOptions.indexOf(r)===-1&&this.componentOptions.indexOf(r)===-1&&(s[r]=t[r])}),this.props=new le(s),this.options=t,this.partial=this.partial.bind(this),this.onChange=this.onChange.bind(this),this.onCreate.apply(this,arguments)}events(){const t={};return this.eventsManager.types.forEach(s=>{const r=m.ATTRIBUTE_EVENT(s,this.uid),a=function(n,o,i){const c=i.getAttribute(r);if(c){let h=this.eventsManager.listeners[parseInt(c,10)];typeof h=="string"&&(h=this[h]),re(h),h.call(this,n,o,i)}};t[`${s} [${r}]`]=a,t[s]=a}),t}ensureElement(){if(this.eventsManager=new Ge,this.template=G(this.template,this),this.el){if(this.el=G(this.el,this),!this.el.parentNode){const t=`Hydration failed in ${this.constructor.name}#${this.uid}`;throw new Error(t)}this.toString(),this.hydrate(this.el.parentNode)}}isContainer(){return this.template.elements.length===0&&this.template.interpolations.length===1}subscribe(t,s="change",r=this.onChange){return t.on&&this.listenTo(t,s,r),this}hydrate(t){return["model","state","props"].forEach(s=>{this[s]&&this.subscribe(this[s])}),this.isContainer()?(this.children[0].hydrate(t),this.el=this.children[0].el):(this.template.elements.forEach((s,r)=>{r===0?(s.hydrate(t),this.el=s.ref):s.hydrate(this.el)}),this.template.interpolations.forEach(s=>s.hydrate(this.el)),this.children.forEach(s=>s.hydrate(this.el))),this.delegateEvents(),this.onHydrate.call(this),this}recycle(t){if(this.onBeforeRecycle.call(this),t){const s=me(t,m.MARKER_RECYCLED(this.uid),Ce);at(s,this.el)}return this}updateProps(t){return this.props.set(t),this.onRecycle.call(this),this}getRecycledMarker(){return`<!--${m.MARKER_RECYCLED(this.uid)}-->`}partial(t,...s){const r=ye(qe(ve(Ee(t,s).trim(),s),s),s).map(a=>X(a,this,"partial"));return new fe(r)}renderTemplatePart(t,s,r){const a=X(t,this,"template part");if(typeof a>"u"||a===null||a===!1||a===!0)return"";if(a instanceof $e)return`${a}`;if(a instanceof m)return`${s(a,r)}`;if(a instanceof fe){if(a.items.length===1)return this.renderTemplatePart(a.items[0],s,r);r.push();const n=a.items.map(o=>(r.increment(),this.renderTemplatePart(o,s,r))).join("");return r.pop(),n}if(Array.isArray(a)){r.pause();const n=Ie(a).map(o=>this.renderTemplatePart(o,s,r)).join("");return r.resume(),n}if(a instanceof ke){const n=a.tracker;n.reset();const o=this.isContainer()?"":`<!--${a.getStart()}-->`,i=this.isContainer()?"":`<!--${a.getEnd()}-->`;return`${o}${this.renderTemplatePart(a.expression,s,n)}${i}`}return`${m.sanitize(a)}`}toString(){this.destroyChildren(),this.eventsManager.reset();const t=(s,r)=>(r.track(s),this.addChild(s));return this.template.parts.map(s=>this.renderTemplatePart(s,t)).join("")}render(){if(this.destroyed)return this;if(!this.el){const r=ce(this);return this.hydrate(r),this}this.onBeforeUpdate.call(this),this.eventsManager.reset();const t=this.children;this.children=[];const s=[];return this.template.interpolations.forEach(r=>{const a=r.tracker;a.reset();const n=[],o=[],i=d=>{let p=d,v;return d.key?v=t.find(T=>T.key===d.key):v=a.findRecyclable(d),v?(p=v.getRecycledMarker(),o.push([v,d]),a.track(v)):(n.push(d),a.track(d)),p},c=this.renderTemplatePart(r.expression,i,a),h=([d,p],v)=>{s.push([d,p.props.toJSON()]),this.addChild(d).recycle(v),p.destroy()};if(a.hasSingleComponent()){h(o[0],null);return}const w=ce(c),u=d=>()=>{o.forEach(p=>h(p,d)),n.forEach(p=>this.addChild(p).hydrate(d))};this.isContainer()?r.updateElement(this.el,w,u(this.el.parentNode)):r.update(w,u(this.el))}),t.forEach(r=>{this.children.indexOf(r)<0&&r.destroy()}),s.forEach(([r,a])=>{r.updateProps(a)}),this.isContainer()?this.el=this.children[0].el:this.template.elements.forEach(r=>r.update()),this.eventsManager.hasPendingTypes()&&this.delegateEvents(),this.onUpdate.call(this),this}onCreate(){}onChange(){this.render()}onHydrate(){}onBeforeRecycle(){}onRecycle(){}onBeforeUpdate(){}onUpdate(){}onDestroy(){}static markAsSafeHTML(t){return new $e(t)}static extend(t){const s=this;class r extends s{}return Object.assign(r.prototype,typeof t=="function"?t(s.prototype):t),r}static mount(t,s,r){const a=new this(t);return s&&(r?a.toString():s.append(ce(a)),a.hydrate(s)),a}static create(t,...s){typeof t=="function"&&(s=[t],t=["",""]);const r=null,a=[],n=[],o=ye(ot(nt(ve(Ee(t,s).trim(),s),s,a),s,n),s);return this.extend({source:r,template(){return{elements:a.map(i=>new Xe({getSelector:i.getSelector.bind(this),getAttributes:i.getAttributes.bind(this)})),interpolations:n.map(i=>new ke({getStart:i.getStart.bind(this),getEnd:i.getEnd.bind(this),expression:i.expression,shouldSkipFind:Ce,shouldSkipSync:rt})),parts:o}}})}}m.ATTRIBUTE_ELEMENT="data-rst-el";m.ATTRIBUTE_EVENT=(e,t)=>`data-rst-on-${e}-${t}`;m.DATASET_ELEMENT="rstEl";m.PLACEHOLDER=e=>`__RASTI_PLACEHOLDER_${e}__`;m.MARKER_RECYCLED=e=>`rst-r-${e}`;m.MARKER_START=e=>`rst-s-${e}`;m.MARKER_END=e=>`rst-e-${e}`;var x=m.create`<div></div>`;const Te=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),lt=!1,ct=e=>e.replace(/([A-Z])/g,t=>`-${t[0].toLowerCase()}`),he=(e,t)=>typeof e!="function"?e:e.call(t),dt=["prefix","generateUid","generateClassName","shouldAttachToDOM","attributes","renderers"];class E{constructor(t,s={}){this.preinitialize.apply(this,arguments),this.styles=t,this.classes={},dt.forEach(a=>{a in s&&(this[a]=s[a])}),this.renderers=this.renderers?he(this.renderers,this).map(a=>typeof a=="string"?this[a]:a):[this.parseStyles,this.renderStyles],this.prefix=this.prefix?he(this.prefix,this):E.prefix,this.uid=this.generateUid();let r=0;Object.keys(t).forEach(a=>{a.match(E.classRegex)&&(this.classes[a]=this.generateClassName(a,++r))})}preinitialize(){}generateUid(){const t=JSON.stringify(this.styles);let s=2166136261;for(let r=0;r<t.length;r++)s^=t.charCodeAt(r),s=s*16777619>>>0;return s.toString(36)}generateClassName(t,s){return`${this.prefix[0]}-${this.uid}-${s}`}render(){return this.renderers.reduce((t,s)=>s.call(this,t),this.styles)}renderStyles(t,s=1){return Object.keys(t).reduce((r,a)=>{const n=t[a];let o="",i="",c="";if(Te(n)){if(Object.keys(n).length>0){const h=this.renderStyles(n,s+1);r.push(`${o}${a}${c}{${i}${h}${o}}${i}`)}}else typeof n<"u"&&n!==null&&r.push(`${o}${a}:${c}${n};${i}`);return r},[]).join("")}parseStyles(t,s,r,a){const n=c=>c in this.classes?`.${this.classes[c]}`:c,o=c=>a&&r?`${r} ${c}`:c.match(E.globalPrefixRegex)?`${r?`${r} `:""}${c.replace(E.globalPrefixRegex,"")}`:n(c).replace(E.referenceRegex,(h,w)=>n(w)).replace(E.nestedRegex,r);return Object.keys(t).reduce((c,h)=>{const w=t[h];if(Te(w))if(h.match(E.globalRegex))Object.assign(s||c,this.parseStyles(w,c,r,!0));else if((h.match(E.nestedRegex)||h.match(E.globalPrefixRegex))&&s){const u=o(h);s[u]={},Object.assign(s[u],this.parseStyles(w,s,u))}else{const u=o(h);c[u]={};const d=u.match(/@/)?[]:[c,u];Object.assign(c[u],this.parseStyles(w,...d))}else typeof w<"u"&&w!==null&&(c[h.match(/-/)?h:ct(h)]=w);return c},{})}getAttributes(){const t=Object.assign({},he(this.attributes,this));return t[`data-${this.prefix}-uid`]=this.uid,t}toString(){const t=this.getAttributes(),s=Object.keys(t).map(a=>` ${a}="${t[a]}"`).join(""),r="";return`<style${s}>${r}${this.render()}</style>${r}`}shouldAttachToDOM(){return typeof document<"u"&&!document.querySelector(`style[data-${this.prefix}-uid="${this.uid}"]`)}attach(){if(E.registry.some(({uid:t})=>t===this.uid)||E.registry.push(this),this.shouldAttachToDOM()){this.el=document.createElement("style");const t=this.getAttributes();Object.keys(t).forEach(s=>{this.el.setAttribute(s,t[s])}),this.el.textContent=this.render(),document.head.appendChild(this.el)}return this}destroy(){const t=E.registry.indexOf(this);return t>-1&&E.registry.splice(t,1),this.el&&(this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=null),this}static toString(){return E.registry.join("")}static toCSS(){return E.registry.map(t=>t.render()).join("")}static destroy(){E.registry.slice().forEach(t=>t.destroy())}}E.classRegex=/^\w+$/;E.globalRegex=/^@global$/;E.globalPrefixRegex=/^@global\s+/;E.referenceRegex=/\$(\w+)/g;E.nestedRegex=/&/g;E.prefix="fun";E.indent="    ";E.registry=[];E.debug=lt;const ht=(e,t)=>new E(e,t).attach();function N(e){return arguments.length>1?N(Array.from(arguments)):e?Array.isArray(e)?e.map(t=>N(t)).filter(Boolean).flat().join(" "):typeof e=="object"?N(Object.keys(e).filter(t=>!!e[t])):typeof e=="string"?e:"":""}const pt=(e,t)=>e.reduce((s,r,a)=>(Object.assign(s,t(r,a)),s),{}),oe=e=>`@media (min-width: ${{sm:640,md:768,lg:1024,xl:1280,xxl:1536}[e]}px)`,z=e=>pt(["primary","secondary","neutral","error","warning","success"],e),H=ht,{classes:ut}=H({root:{display:"inline-flex",alignItems:"center",justifyContent:"space-evenly",boxSizing:"border-box",cursor:"pointer",borderRadius:"var(--rui-borderRadius-sm)",padding:"var(--rui-spacing-sm)",maxHeight:"100%",fontFamily:"var(--rui-typography-button-fontFamily)",fontWeight:"var(--rui-typography-button-fontWeight)",fontSize:"var(--rui-typography-button-fontSize)",lineHeight:"var(--rui-typography-button-lineHeight)",textTransform:"var(--rui-typography-button-textTransform)",textDecoration:"var(--rui-typography-button-textDecoration)",transition:["background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)","color 0.15s cubic-bezier(0.4, 0, 0.2, 1)","border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)","box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)","transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)"].join(", "),"&:where([data-disabled])":{cursor:"not-allowed"},"&>svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"&>svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"&>svg:only-child":{padding:"0"},'&:where([data-size="sm"])':{fontSize:"var(--rui-fontSize-xs)"},'&:where([data-size="lg"])':{fontSize:"var(--rui-fontSize-xl)"},'&:where([data-shape="pill"])':{borderRadius:"var(--rui-borderRadius-full)"},'&:where([data-shape="circle"])':{borderRadius:"50%",aspectRatio:"1 / 1",maxHeight:"none",padding:"var(--rui-spacing-xs)",minWidth:"var(--rui-spacing-xxxxl)",minHeight:"var(--rui-spacing-xxxxl)",justifyContent:"center"},'&:where([data-shape="circle"]):where([data-size="sm"])':{padding:"var(--rui-spacing-xxs)",minWidth:"var(--rui-spacing-xxl)",minHeight:"var(--rui-spacing-xxl)"},'&:where([data-shape="circle"]):where([data-size="lg"])':{padding:"var(--rui-spacing-sm)",minWidth:"calc(var(--rui-spacing-xxxxl) + var(--rui-spacing-sm))",minHeight:"calc(var(--rui-spacing-xxxxl) + var(--rui-spacing-sm))"},...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-main)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,borderColor:`var(--rui-palette-${e}-dark)`},"&:where(:not([data-disabled])):active":{backgroundColor:`var(--rui-palette-${e}-dark)`,borderColor:`var(--rui-palette-${e}-dark)`,color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,boxShadow:"inset 0 1px 2px rgb(0 0 0 / 0.1)",transform:"translateY(0.5px)"},"&:where([data-disabled])":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,borderColor:`var(--rui-palette-${e}-light)`,boxShadow:"none",transform:"none","&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,borderColor:`var(--rui-palette-${e}-light)`},"&:active":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,borderColor:`var(--rui-palette-${e}-light)`,boxShadow:"none",transform:"none"}}}})),...z(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-foregroundMain)`,backgroundColor:"transparent","&:hover":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.14)`},"&:where(:not([data-disabled])):active":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.12)`,transform:"translateY(0.5px)"},"&:where([data-disabled])":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,borderColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`,transform:"none","&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,backgroundColor:"transparent"},"&:active":{transform:"none",backgroundColor:"transparent"}}}})),...z(e=>({[`&:where([data-variant="plain"][data-color="${e}"])`]:{border:"none",background:"transparent",color:`var(--rui-palette-${e}-foregroundMain)`,"&:hover":{color:`var(--rui-palette-${e}-foregroundDark)`,backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.05)`},"&:where(:not([data-disabled])):active":{color:`var(--rui-palette-${e}-foregroundDark)`,backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.07)`,transform:"translateY(0.5px)"},"&:where([data-disabled])":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`,transform:"none","&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`,backgroundColor:"transparent"},"&:active":{backgroundColor:"transparent",transform:"none"}}}})),...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"]):where(:not([data-disabled])):focus-visible`]:{outline:`2px solid rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,outlineOffset:"2px"},[`&:where([data-variant="outlined"][data-color="${e}"]):where(:not([data-disabled])):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"},[`&:where([data-variant="plain"][data-color="${e}"]):where(:not([data-disabled])):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"}})),'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):not(:first-child)':{marginLeft:"-1px",...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{borderLeftColor:`var(--rui-palette-${e}-dark)`}}))},'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):not(:first-child):not(:last-child)':{borderRadius:"0"},'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):first-child':{borderTopRightRadius:"0",borderBottomRightRadius:"0"},'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):last-child':{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"},"&:where([data-current])":{fontWeight:"var(--rui-fontWeight-xl)"},...z(e=>({[`&:where([data-variant="outlined"][data-color="${e}"][data-current])`]:{border:`1px solid var(--rui-palette-${e}-main)`,backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.05)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="outlined"][data-color="${e}"][data-current]):hover`]:{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.08)`,border:`1px solid var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="plain"][data-color="${e}"][data-current])`]:{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.03)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="plain"][data-color="${e}"][data-current]):hover`]:{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.05)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="solid"][data-color="${e}"][data-current])`]:{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.98)`,backgroundColor:`var(--rui-palette-${e}-dark)`,border:`1px solid var(--rui-palette-${e}-dark)`,boxShadow:"none"},[`&:where([data-variant="solid"][data-color="${e}"][data-current]):hover`]:{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,borderColor:`var(--rui-palette-${e}-dark)`}}))}}),A=x.create`
    <${({props:e})=>e.href?"a":e.type?"input":"button"}
        class="${({props:e})=>N([ut.root,e.className])}"
        data-variant="${({props:e})=>e.variant||"solid"}"
        data-color="${({props:e})=>e.color||"neutral"}"
        data-size="${({props:e})=>e.size||"md"}"
        data-disabled="${({props:e})=>e.disabled||!1}"
        data-group="${({props:e})=>e.group||!1}"
        data-shape="${({props:e})=>e.shape==="circle"||e.shape==="pill"?e.shape:!1}"
        data-current="${({props:e})=>e.current||!1}"
        onClick="${({props:e})=>e.onClick||!1}"
        href="${({props:e})=>e.href||!1}"
        type="${({props:e})=>e.type||!1}"
        value="${({props:e})=>e.type&&e.label||!1}"
        disabled="${({props:e})=>e.disabled||!1}"
        aria-disabled="${({props:e})=>e.disabled||!1}"
        aria-current="${({props:e})=>e.href&&e.current?"page":!1}"
        target="${({props:e})=>e.target||!1}"
        title="${({props:e})=>e.title||!1}"
    >
        ${e=>e.renderChildren()}
    </${({props:e})=>e.href?"a":e.type?"input":"button"}>
`.extend({renderChildren:function(){return this.props.type?null:this.props.renderChildren?this.props.renderChildren():this.partial`
            ${this.props.renderLeftIcon&&this.props.renderLeftIcon()}
            <span data-slot="label">${this.props.label}</span>
            ${this.props.renderRightIcon&&this.props.renderRightIcon()}
        `}});var gt=x.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
`;const ft=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(", "),Le=e=>e?Array.from(e.querySelectorAll(ft)).filter(t=>{if(!e.contains(t))return!1;const s=window.getComputedStyle(t);return!(s.display==="none"||s.visibility==="hidden")}):[],{classes:J}=H({root:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgb(var(--rui-palette-neutral-rgb-level3) / 0.2)",backdropFilter:"blur(5px)",zIndex:"var(--rui-zIndex-dialogBackdrop, 1500)",padding:"var(--rui-spacing-md)","&:where([data-top])":{alignItems:"flex-start"},"&:where([data-bottom])":{alignItems:"flex-end"},"&:where([data-left])":{justifyContent:"flex-start"},"&:where([data-right])":{justifyContent:"flex-end"}},dialog:{position:"relative",display:"flex",flexDirection:"column",maxHeight:"calc(var(--rui-viewport-height) * 0.9)",maxWidth:"calc(var(--rui-viewport-width) * 0.9)",width:"auto",minWidth:"250px",padding:"var(--rui-spacing-sm)",borderRadius:"var(--rui-borderRadius-md)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",fontFamily:"var(--rui-fontFamily-body)",...z(e=>({[`&:where([data-color="${e}"])`]:{color:`var(--rui-palette-${e}-foregroundMain)`}})),...z(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{border:`1px solid rgb(var(--rui-palette-${e}-rgb-level1) / 0.4)`}})),...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`}})),'&:where([data-shadow="xs"])':{boxShadow:"var(--rui-shadow-xs)"},'&:where([data-shadow="sm"])':{boxShadow:"var(--rui-shadow-sm)"},'&:where([data-shadow="md"])':{boxShadow:"var(--rui-shadow-md)"},'&:where([data-shadow="lg"])':{boxShadow:"var(--rui-shadow-lg)"},'&:where([data-shadow="xl"])':{boxShadow:"var(--rui-shadow-xl)"},"&:focus-visible":{outline:"2px solid rgb(var(--rui-palette-neutral-rgb-level2) / 0.75)",outlineOffset:"2px"}},header:{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"var(--rui-spacing-xxxl)","& :where(button)":{position:"absolute",top:0,right:0,margin:0,padding:0,borderRadius:"50%"}},title:{fontSize:"var(--rui-fontSize-md)",fontWeight:"var(--rui-fontWeight-md)",color:"var(--rui-palette-neutral-foregroundMain)",textAlign:"center",padding:0,margin:"var(--rui-spacing-xs)"},content:{flex:1,overflowY:"auto",overflowX:"hidden",padding:"var(--rui-spacing-md)",minHeight:0},footer:{display:"flex",justifyContent:"space-evenly",paddingTop:"var(--rui-spacing-md)",flexShrink:0}}),mt=x.create`
    <div class="${({props:e})=>N([J.header,e.className])}" data-slot="header">
        ${e=>e.renderHeaderContent()}
    </div>
`.extend({renderHeaderContent(){return this.props.renderChildren?this.props.renderChildren():this.partial`
            ${this.props.title?this.partial`<h2 class="${J.title}" data-slot="title" id="${this.props.titleId||null}">${this.props.title}</h2>`:null}
            ${this.props.handleClose&&this.props.closeButton?this.partial`<${A}
                    onClick=${this.props.handleClose}
                    color="neutral"
                    variant="outlined"
                    size="sm"
                >
                    <${gt} />
                </${A}>`:null}
        `}}),yt=x.create`
    <div class="${({props:e})=>N([J.content,e.className])}" data-slot="content">
        ${({props:e})=>e.renderChildren()}
    </div>
`,vt=x.create`
    <div class="${({props:e})=>N([J.footer,e.className])}" data-slot="footer">
        ${({props:e})=>e.renderChildren()}
    </div>
`,U=x.create`
    <div
        class="${({props:e})=>N([J.root,e.className])}"
        data-top="${({props:e})=>e.top||!1}"
        data-bottom="${({props:e})=>e.bottom||!1}"
        data-left="${({props:e})=>e.left||!1}"
        data-right="${({props:e})=>e.right||!1}"
        onClick=${function(e){this.props.handleClose&&e.target===this.el&&this.props.handleClose()}}
    >
        <div
            class="${()=>J.dialog}"
            data-variant="${({props:e})=>e.variant||"outlined"}"
            data-color="${({props:e})=>e.color||"neutral"}"
            data-shadow="${({props:e})=>e.shadow||!1}"
            role="dialog"
            aria-modal="true"
            aria-labelledby="${({props:e})=>e.labelledBy||null}"
            onClick=${function(e){e.stopPropagation()}}
        >
            ${({props:e})=>e.renderChildren()}
        </div>
    </div>
`.extend({onCreate(){this.handleDocumentKeydown=e=>{if(e.key==="Escape"&&this.props.handleClose){this.props.handleClose();return}if(e.key!=="Tab"||!this.dialogEl||!this.dialogEl.contains(document.activeElement))return;const t=Le(this.dialogEl);if(t.length===0){e.preventDefault();return}if(t.length===1){document.activeElement===t[0]&&e.preventDefault();return}const s=t[0],r=t[t.length-1];e.shiftKey?document.activeElement===s&&(e.preventDefault(),r.focus()):document.activeElement===r&&(e.preventDefault(),s.focus())},this.handleClickOutside=e=>{this.props.handleClose&&!this.el.contains(e.target)&&this.props.handleClose()}},onHydrate(){this.dialogEl=this.$('[role="dialog"]'),this._previousActiveElement=document.activeElement,this._panelTabindexSet=!1;const e=document.body.style.overflow;if(document.body.style.overflow="hidden",this._originalOverflow=e,document.addEventListener("keydown",this.handleDocumentKeydown),this.dialogEl){const t=Le(this.dialogEl);t.length>0?t[0].focus():(this.dialogEl.setAttribute("tabindex","-1"),this._panelTabindexSet=!0,this.dialogEl.focus())}setTimeout(()=>{document.addEventListener("click",this.handleClickOutside)},0)},onDestroy(){if(this._panelTabindexSet&&this.dialogEl&&this.dialogEl.removeAttribute("tabindex"),this._originalOverflow!==void 0&&(document.body.style.overflow=this._originalOverflow),document.removeEventListener("keydown",this.handleDocumentKeydown),document.removeEventListener("click",this.handleClickOutside),this._previousActiveElement&&typeof this._previousActiveElement.focus=="function")try{this._previousActiveElement.focus()}catch{}}});U.Header=mt;U.Content=yt;U.Footer=vt;var W={},_e;function bt(){if(_e)return W;_e=1,Object.defineProperty(W,"__esModule",{value:!0}),W.PathError=W.TokenData=void 0,W.parse=h,W.compile=w,W.match=p,W.pathToRegexp=v,W.stringify=D;const e="/",t=l=>l,s=/^[$_\p{ID_Start}]$/u,r=/^[$\u200c\u200d\p{ID_Continue}]$/u,a=/^[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*$/u;function n(l){return l.replace(/[{}()\[\]+?!:*\\]/g,"\\$&")}function o(l){return l.replace(/[.+*?^${}()[\]|/\\]/g,"\\$&")}class i{constructor(g,b){this.tokens=g,this.originalPath=b}}W.TokenData=i;class c extends TypeError{constructor(g,b){let y=g;b&&(y+=`: ${b}`),y+="; visit https://git.new/pathToRegexpError for info",super(y),this.originalPath=b}}W.PathError=c;function h(l,g={}){const{encodePath:b=t}=g,y=[...l];let f=0;function C(S){const k=[];let j="";function M(){j&&(k.push({type:"text",value:b(j)}),j="")}for(;f<y.length;){const L=y[f++];if(L===S)return M(),k;if(L==="\\"){if(f===y.length)throw new c(`Unexpected end after \\ at index ${f}`,l);j+=y[f++];continue}if(L===":"||L==="*"){const B=L===":"?"param":"wildcard";let $="";if(s.test(y[f]))do $+=y[f++];while(r.test(y[f]));else if(y[f]==='"'){let I=f;for(;f<y.length;){if(y[++f]==='"'){f++,I=0;break}y[f]==="\\"&&f++,$+=y[f]}if(I)throw new c(`Unterminated quote at index ${I}`,l)}if(!$)throw new c(`Missing parameter name at index ${f}`,l);M(),k.push({type:B,name:$});continue}if(L==="{"){M(),k.push({type:"group",tokens:C("}")});continue}if(L==="}"||L==="("||L===")"||L==="["||L==="]"||L==="+"||L==="?"||L==="!")throw new c(`Unexpected ${L} at index ${f-1}`,l);j+=L}if(S)throw new c(`Unexpected end at index ${f}, expected ${S}`,l);return M(),k}return new i(C(""),l)}function w(l,g={}){const{encode:b=encodeURIComponent,delimiter:y=e}=g,f=typeof l=="object"?l:h(l,g),C=u(f.tokens,y,b);return function(k={}){const j=[],M=C(k,j);if(j.length)throw new TypeError(`Missing parameters: ${j.join(", ")}`);return M}}function u(l,g,b){const y=l.map(f=>d(f,g,b));return(f,C)=>{let S="";for(const k of y)S+=k(f,C);return S}}function d(l,g,b){if(l.type==="text")return()=>l.value;if(l.type==="group"){const f=u(l.tokens,g,b);return(C,S)=>{const k=S.length,j=f(C,S);return S.length===k?j:(S.length=k,"")}}const y=b||t;return l.type==="wildcard"&&b!==!1?(f,C)=>{const S=f[l.name];if(S==null)return C.push(l.name),"";if(!Array.isArray(S)||S.length===0)throw new TypeError(`Expected "${l.name}" to be a non-empty array`);let k="";for(let j=0;j<S.length;j++){if(typeof S[j]!="string")throw new TypeError(`Expected "${l.name}/${j}" to be a string`);j>0&&(k+=g),k+=y(S[j])}return k}:(f,C)=>{const S=f[l.name];if(S==null)return C.push(l.name),"";if(typeof S!="string")throw new TypeError(`Expected "${l.name}" to be a string`);return y(S)}}function p(l,g={}){const{decode:b=decodeURIComponent,delimiter:y=e}=g,{regexp:f,keys:C}=v(l,g),S=C.map(k=>b===!1?t:k.type==="param"?b:j=>j.split(y).map(b));return function(j){const M=f.exec(j);if(!M)return!1;const L=M[0],B=Object.create(null);for(let $=1;$<M.length;$++){if(M[$]===void 0)continue;const I=C[$-1],Y=S[$-1];B[I.name]=Y(M[$])}return{path:L,params:B}}}function v(l,g={}){const{delimiter:b=e,end:y=!0,sensitive:f=!1,trailing:C=!0}=g,S=[];let k="",j=0;function M(B){if(Array.isArray(B)){for(const I of B)M(I);return}const $=typeof B=="object"?B:h(B,g);T($.tokens,0,[],I=>{if(j>=256)throw new c("Too many path combinations",$.originalPath);j>0&&(k+="|"),k+=F(I,b,S,$.originalPath),j++})}M(l);let L=`^(?:${k})`;return C&&(L+="(?:"+o(b)+"$)?"),L+=y?"$":"(?="+o(b)+"|$)",{regexp:new RegExp(L,f?"":"i"),keys:S}}function T(l,g,b,y){for(;g<l.length;){const f=l[g++];if(f.type==="group"){const C=b.length;T(f.tokens,0,b,S=>T(l,g,S,y)),b.length=C;continue}b.push(f)}y(b)}function F(l,g,b,y){let f="",C="",S="",k=0,j=0,M=0;function L($,I){for(;$<l.length;){const Y=l[$++];if(Y.type===I)return!0;if(Y.type==="text"&&Y.value.includes(g))break}return!1}function B($){let I="";for(;$<l.length;){const Y=l[$++];if(Y.type!=="text")break;I+=Y.value}return I}for(;M<l.length;){const $=l[M++];if($.type==="text"){f+=o($.value),C+=$.value,k===2&&(S+=$.value),$.value.includes(g)&&(j=0);continue}if($.type==="param"||$.type==="wildcard"){if(k&&!C)throw new c(`Missing text before "${$.name}" ${$.type}`,y);$.type==="param"?(f+=j&2?`(${R(g,C)}+)`:L(M,"wildcard")?`(${R(g,B(M))}+)`:j&1?`(${R(g,C)}+|${o(C)})`:`(${R(g,"")}+)`,j|=k=1):(f+=j&2?`(${R(C,"")}+)`:S?`(${R(S,"")}+|${R(g,"")}+)`:"([^]+)",S="",j|=k=2),b.push($),C="";continue}throw new TypeError(`Unknown token type: ${$.type}`)}return f}function R(l,g){return g.length>l.length?R(g,l):(l===g&&(g=""),g.length>1?`(?:(?!${o(l)}|${o(g)})[^])`:l.length>1?`(?:(?!${o(l)})[^${o(g)}])`:`[^${o(l+g)}]`)}function K(l,g){let b="";for(;g<l.length;){const y=l[g++];if(y.type==="text"){b+=n(y.value);continue}if(y.type==="group"){b+="{"+K(y.tokens,0)+"}";continue}if(y.type==="param"){b+=":"+V(y.name,l[g]);continue}if(y.type==="wildcard"){b+="*"+V(y.name,l[g]);continue}throw new TypeError(`Unknown token type: ${y.type}`)}return b}function D(l){return K(l.tokens,0)}function V(l,g){return!a.test(l)||g?.type==="text"&&r.test(g.value[0])?JSON.stringify(l):l}return W}var Ae=bt();function xt(e,t={}){const{baseUrl:s=""}=t,r=u=>{const[d,p]=u.replace(s,"").split("?");return{pathname:d,query:p}},a=(u,d)=>Ae.match(d,{decode:decodeURIComponent})(u),n=u=>{const{pathname:d,query:p}=r(u);for(const v of e){const T=a(d,v.path);if(T){const F={path:v.path,params:w(T.params),query:Object.fromEntries(new URLSearchParams(p).entries()),test:R=>!!a(r(R).pathname,v.path)};return()=>v.action(F)}}return null},o=(u,d={})=>{const{addToHistory:p=!0,replaceHistory:v=!1}=d,T=n(u);T?(p&&typeof window<"u"&&window.history[v?"replaceState":"pushState"]({},"",u),T()):console.error("No route matched:",u)},i=(u,d={},p={})=>{const T=Ae.compile(u,{encode:encodeURIComponent})(d),F=new URLSearchParams(p).toString();return`${s}${F?`${T}?${F}`:T}`},c=u=>{const d=p=>{if(p.defaultPrevented||p.button!==0||p.metaKey||p.ctrlKey||p.shiftKey||p.altKey)return;const v=p.target.closest("a[data-router]");if(v&&v.href){p.preventDefault();const T=new URL(v.href);window.scrollTo({top:0,behavior:"instant"}),o(T.pathname+T.search)}};return u.addEventListener("click",d),()=>{u.removeEventListener("click",d)}},h=()=>{const u=()=>{o(window.location.pathname+window.location.search,{addToHistory:!1})};return window.addEventListener("popstate",u),()=>{window.removeEventListener("popstate",u)}},w=u=>{const d={};for(const[p,v]of Object.entries(u))d[p]=String(v).replace(/[<>]/g,"");return d};return{navigate:o,createUrl:i,delegateNavigation:c,bindHistory:h}}const St=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),$t=["h1","h2","h3","h4","titleLg","titleMd","titleSm","bodyLg","bodyMd","bodySm","caption"],{classes:wt}=H({root:{color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-md) 0",...Object.fromEntries($t.map(e=>[`&:where([data-level="${e}"])`,St(e)]))}}),Re=({props:e})=>{switch(e.level){case"h1":return"h1";case"h2":return"h2";case"h3":return"h3";case"h4":return"h4";case"titleLg":return"h2";case"titleMd":return"h2";case"titleSm":return"h2";case"caption":return"caption";default:return"p"}},_=x.create`
    <${Re}
        class="${({props:e})=>N([wt.root,e.className])}"
        data-level="${({props:e})=>e.level||"bodyMd"}"
    >
        ${({props:e})=>e.renderChildren&&e.renderChildren()}
    </${Re}>
`;var jt=x.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
    </svg>
`;const{classes:pe}=H({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",minHeight:"var(--rui-viewport-height)"},iconContainer:{display:"flex",justifyContent:"center",alignItems:"center",width:"140px",height:"140px",borderRadius:"50%",backgroundColor:"var(--rui-palette-neutral-main)",marginBottom:"var(--rui-spacing-md)"},icon:{width:"120px",height:"120px",fill:"var(--rui-palette-warning-main)"}}),kt=x.create`
    <div class="${pe.root}">
        <div class="${pe.iconContainer}">
            <${jt} className=${pe.icon} />
        </div>
        <${_} level="h1">
            404
        </${_}>
        <${_} level="h3">
            Page Not Found
        </${_}>
        <${_} level="bodyMd">
            The page you are looking for does not exist.
        </${_}>
    </div>
`,{classes:Me}=H({"@global":{html:{scrollBehavior:"smooth"},body:{margin:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)",fontFamily:"var(--rui-fontFamily-body)"},"a.anchor, h2":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-xs))"}},root:{},appBarMenuDialog:{},[oe("sm")]:{$appBarMenuDialog:{display:"none"}}}),Ct=e=>{const{title:t,AppBar:s,AppBarMenuContent:r,Cover:a,Description:n,Features:o,Readme:i,AboutSite:c,Api:h,Footer:w}=e;return x.create`
        <div class="${Me.root}">
            <${s} 
                location="${({state:d})=>d.location}"
                onMenuClick="${({state:d})=>()=>{d.menuOpen=!0}}"
            />

            ${({state:d,partial:p})=>d.menuOpen&&r?p`<${U}
                    className="${Me.appBarMenuDialog}"
                    handleClose=${()=>{d.menuOpen=!1}}
                    shadow="lg"
                >
                    <${U.Header}
                        handleClose=${()=>{d.menuOpen=!1}}
                        closeButton=${!0}
                    />
                    <${U.Content}
                        renderChildren=${()=>r.mount({handleOpen:v=>{d.menuOpen=v},location:d.location})}
                    />
                </${U}>`:null}

            ${({state:d,partial:p})=>d.location.params.notFound?p`<${kt} />`:d.location.test("/api/")?p`<${h} />`:p`
                        <${a} />
                        ${n?p`<${n} />`:null}
                        <${o} />
                        <${i} />
                        ${c?p`<${c} />`:null}
                    `}

            <${w} />
        </div>
    `.extend({onCreate(d={}){this.state=new le({location:null,menuOpen:!1});const p=[{path:"/api/",action:R=>this.updateRoute(R)},{path:"/",action:R=>this.updateRoute(R)},{path:"*notFound",action:R=>this.updateRoute(R)}];this.router=xt(p);const v=typeof window<"u"?window.location.pathname+window.location.search:null,T=d.url??v??"/",F=v!==null&&T!==v;this.router.navigate(T,F?{replaceHistory:!0}:{addToHistory:!1})},onHydrate(){this.router&&this.destroyQueue.push(this.router.delegateNavigation(this.el),this.router.bindHistory())},updateRoute(d){this.state.location=d,typeof document<"u"&&(document.title=this.getTitle())},getTitle(){const d=this.state.location.params.notFound?" - Not Found":this.state.location.test("/api/")?" - API Documentation":this.state.location.test("/")?" - Home":"";return`${t}${d}`}})},{classes:Q}=H({section:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-sm)"},left:{flex:"0 0 auto",justifyContent:"flex-start"},center:{flex:"1 1 auto",justifyContent:"center"},right:{flex:"0 0 auto",justifyContent:"flex-end"}}),Et=x.create`
    <div class="${({props:e})=>N([Q.section,Q.left,e.className])}" data-slot="left">
        ${({props:e})=>e.renderChildren()}
    </div>
`,Tt=x.create`
    <div class="${({props:e})=>N([Q.section,Q.center,e.className])}" data-slot="center">
        ${({props:e})=>e.renderChildren()}
    </div>
`,Lt=x.create`
    <div class="${({props:e})=>N([Q.section,Q.right,e.className])}" data-slot="right">
        ${({props:e})=>e.renderChildren()}
    </div>
`,{classes:_t}=H({root:{position:"sticky",top:0,zIndex:"var(--rui-zIndex-appBar, 1000)",display:"flex",alignItems:"center",minHeight:"56px",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",gap:"var(--rui-spacing-md)",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundSoftLevel3) / 0.5)",transition:"background-color 0.2s ease, border-color 0.2s ease",backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)",...z(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{borderBottomColor:`var(--rui-palette-${e}-foregroundSoftLevel3)`}})),...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,borderBottomColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`},[`&:where([data-variant="solid"][data-color="${e}"]) *`]:{color:`var(--rui-palette-${e}-contrastMain)`}}))}}),q=x.create`
    <header
        class="${({props:e})=>N([_t.root,e.className])}"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
        aria-label="${({props:e})=>e.ariaLabel||null}"
    >
        ${({props:e})=>e.renderChildren()}
    </header>
`;q.Left=Et;q.Center=Tt;q.Right=Lt;var At=x.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
    </svg>
`,Rt=x.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
    </svg>
`,Mt=x.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
    </svg>
`;const{classes:ee}=H({root:{display:"flex",justifyContent:"right",alignItems:"center",height:"60px","& ul":{padding:0}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),Ht=x.create`
    <div class="${ee.root}">
        <ul>
            <li class="${ee.hiddenIfDark}">
                <${A}
                    variant="plain"
                    shape="circle"
                    onClick=${()=>document.documentElement.setAttribute("data-color-scheme","dark")}
                >
                    <${Mt} className=${ee.icon} />
                </${A}>
            </li>
            <li class="${ee.hiddenIfLight}">
                <${A}
                    variant="plain"
                    shape="circle"
                    onClick=${()=>document.documentElement.setAttribute("data-color-scheme","light")}
                >
                    <${Rt} className=${ee.icon} />
                </${A}>
            </li>
        </ul>
    </div>
`,be=x.create`
    <svg class="${({props:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
`,He=x.create`
    <svg class="${({props:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
        <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"></path>
    </svg>
`,{classes:P}=H({root:{boxSizing:"border-box",height:"var(--rui-app-appBarHeight)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",position:"fixed",top:0,left:0,right:0,zIndex:1e3},leftContent:{display:"flex",alignItems:"center"},rightContent:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-sm)"},navLinks:{display:"none","& ul":{display:"flex",justifyContent:"center",alignItems:"center",listStyle:"none",padding:0,margin:0,gap:"var(--rui-spacing-sm)","& li":{margin:0}}},menuButton:{display:"block"},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-neutral-main)","a:hover &":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"},logoInactive:{opacity:.5},menuContent:{"& nav":{maxWidth:"100%",display:"flex",justifyContent:"center",alignItems:"center","& ul":{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"var(--rui-spacing-md)"}}}},[oe("sm")]:{$navLinks:{display:"block"},$menuButton:{display:"none"}}}),Ot=e=>{const{logoAlt:t,playgroundUrl:s,githubUrl:r,npmUrl:a}=e,n=x.create`
        <div class="${P.menuContent}">
            <nav><ul>
                ${({props:i,partial:c})=>c`
                    <li>
                        <${A}
                            href="/api/"
                            onClick=${()=>i.handleOpen(!1)}
                            attributes=${{"data-router":!0}}
                            label="API"
                            variant="plain"
                            size="lg"
                            current="${({props:h})=>!h.location.params.notFound&&h.location.test("/api/")}"
                        />
                    </li>
                    <li>
                        <${A}
                            href="${s}"
                            onClick=${()=>i.handleOpen(!1)}
                            target="_blank"
                            label="Playground"
                            variant="plain"
                            size="lg"
                        />
                    </li>
                    <li>
                        <${A}
                            href="${r}"
                            onClick=${()=>i.handleOpen(!1)}
                            target="_blank"
                            label="GitHub"
                            variant="plain"
                            size="lg"
                            renderLeftIcon=${()=>be.mount({className:P.icon})}
                        />
                    </li>
                    <li>
                        <${A}
                            href="${a}"
                            onClick=${()=>i.handleOpen(!1)}
                            target="_blank"
                            label="npm"
                            variant="plain"
                            size="lg"
                            renderLeftIcon=${()=>He.mount({className:P.icon})}
                        />
                    </li>
                `}
            </ul></nav>
        </div>
    `;return{AppBar:x.create`
        <${q} className="${P.root}">
            <${q.Left}>
                <div class="${P.leftContent}">
                    <a href="/" class="${({props:i})=>i.location.params.notFound||!i.location.test("/")?P.logoInactive:""}" aria-current="${({props:i})=>i.location.test("/")?"page":null}" data-router>
                        <img height="24" class="${P.hiddenIfLight}" alt="${t}" src="/logo-dark.svg">
                        <img height="24" class="${P.hiddenIfDark}" alt="${t}" src="/logo.svg">
                    </a>
                </div>
            </${q.Left}>
            <${q.Center}>
            </${q.Center}>
            <${q.Right}>
                <div class="${P.rightContent}">
                    <nav class="${P.navLinks}">
                        <ul>
                            <li>
                                <${A}
                                    href="/api/"
                                    attributes=${{"data-router":!0}}
                                    label="API"
                                    variant="plain"
                                    current="${({props:i})=>!i.location.params.notFound&&i.location.test("/api/")}"
                                />
                            </li>
                            <li>
                                <${A}
                                    href="${s}"
                                    target="_blank"
                                    label="Playground"
                                    variant="plain"
                                />
                            </li>
                            <li>
                                <${A}
                                    href="${r}"
                                    target="_blank"
                                    variant="plain"
                                    shape="circle"
                                    renderChildren=${()=>be.mount({className:P.icon})}
                                />
                            </li>
                            <li>
                                <${A}
                                    href="${a}"
                                    target="_blank"
                                    variant="plain"
                                    shape="circle"
                                    renderChildren=${()=>He.mount({className:P.icon})}
                                />
                            </li>
                        </ul>
                    </nav>
                    <${Ht} />
                    <div class="${P.menuButton}">
                        <${A}
                            variant="plain"
                            size="lg"
                            onClick="${({props:i})=>i.onMenuClick}"
                        >
                            <${At} className=${P.icon} />
                        </${A}>
                    </div>
                </div>
            </${q.Right}>
        </${q}>
    `,AppBarMenuContent:n}},{classes:zt}=H({root:{borderRadius:"var(--rui-borderRadius-md)",padding:"var(--rui-spacing-md)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",fontFamily:"var(--rui-fontFamily-body)",fontSize:"var(--rui-fontSize-bodyMd)",...z(e=>({[`&:where([data-color="${e}"])`]:{color:`var(--rui-palette-${e}-foregroundMain)`}})),...z(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{border:`1px solid rgb(var(--rui-palette-${e}-rgb-level1) / 0.4)`}})),...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`}})),'&:where([data-shadow="xs"])':{boxShadow:"var(--rui-shadow-xs)"},'&:where([data-shadow="sm"])':{boxShadow:"var(--rui-shadow-sm)"},'&:where([data-shadow="md"])':{boxShadow:"var(--rui-shadow-md)"},'&:where([data-shadow="lg"])':{boxShadow:"var(--rui-shadow-lg)"},'&:where([data-shadow="xl"])':{boxShadow:"var(--rui-shadow-xl)"},...z(e=>({[`&:where([data-interactive="true"][data-variant="solid"][data-color="${e}"]):focus-visible`]:{outline:`2px solid rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,outlineOffset:"2px"},[`&:where([data-interactive="true"][data-variant="outlined"][data-color="${e}"]):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"},[`&:where([data-interactive="true"][data-variant="plain"][data-color="${e}"]):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"}}))}}),O=x.create`
    <${({props:e})=>e.tag||"div"}
        class="${({props:e})=>N([zt.root,e.className])}"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
        data-shadow="${({props:e})=>e.shadow||!1}"
        data-interactive="${({props:e})=>e.interactive||!1}"
        tabindex="${({props:e})=>{if(!e.interactive)return null;const t=String(e.tag||"div").toLowerCase();return["button","a","input","select","textarea"].includes(t)?null:"0"}}"
        onClick="${({props:e})=>e.onClick}"
    >
        ${({props:e})=>e.renderChildren&&e.renderChildren()}
    </${({props:e})=>e.tag||"div"}>
`,{classes:te}=H({root:{maxWidth:"var(--rui-app-maxWidth)",margin:"0 auto var(--rui-spacing-xxxxl)",padding:"var(--rui-spacing-lg)",color:"var(--rui-palette-neutral-foregroundLevel2)"},panel:{display:"flex",flexDirection:"column",alignItems:"flex-start",padding:"var(--rui-spacing-xl)","@global a":{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{color:"var(--rui-palette-primary-foregroundDark)",textDecoration:"underline"}}},text:{margin:"0 0 var(--rui-spacing-lg)"},lastText:{margin:0}}),Nt=e=>{const{projectName:t,projectGithubUrl:s}=e;return x.create`
        <section id="how-this-site-is-built" class="${te.root}">
            <${O} className="${te.panel}" variant="outlined" shadow="xs">
                <${_} level="h2">How this website is built</${_}>
                <${_} level="bodyLg" className="${te.text}">
                    This website is built with
                    <a href="https://rasti.js.org" target="_blank">Rasti</a> and
                    <a href="https://cssfun.js.org" target="_blank">CSSFUN</a>, using the
                    Static scaffold provided by
                    <a href="https://github.com/8tentaculos/create-rasti" target="_blank">create-rasti</a>.
                </${_}>
                <${_} level="bodyMd" className="${te.text}">
                    The Static template writes each public route as HTML that can be hosted
                    on services such as GitHub Pages. This combines fast static delivery and
                    SEO-friendly pages with fluid SPA navigation once Rasti hydrates the
                    markup in the browser.
                </${_}>
                <${_} level="bodyMd" className="${te.lastText}">
                    The home page and API reference are generated directly from the
                    documentation Markdown in the
                    <a href="${s}" target="_blank">${t} repository</a>,
                    keeping the published website aligned with the project source.
                </${_}>
            </${O}>
        </section>
    `},{classes:ue}=H({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-xl) 0 var(--rui-spacing-xxxxl) 0",borderTop:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)","@global":{a:{color:"var(--rui-palette-neutral-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-neutral-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-neutral-dark)"}}}},text:{color:"var(--rui-palette-neutral-foregroundLevel3)"}}),Dt=e=>{const{licenseUrl:t,startYear:s}=e,r=()=>{const n=new Date().getFullYear();return n===s?n:`${s}-${n}`};return x.create`
        <footer class="${ue.root}">
            <${_} level="titleMd" className="${ue.text}">
                Released under the <a href="${t}" target="_blank">MIT License</a>
            </${_}>
            <${_} level="titleSm" className="${ue.text}">
                Copyright © ${r} by <a href="https://github.com/8tentaculos/" target="_blank">8tentaculos</a>
            </${_}>
        </footer>
    `},{classes:se}=H({root:{display:"flex",justifyContent:"center",alignItems:"center",height:"var(--rui-viewport-height)",flexDirection:"column",backgroundColor:"var(--rui-palette-neutral-backgroundLevel3)",boxShadow:"var(--rui-shadow-xs)",padding:"0 var(--rui-spacing-xl)",overflow:"hidden","@global":{h1:{textAlign:"center",margin:"var(--rui-app-appBarHeight) 0 0 0"},h2:{color:"var(--rui-palette-neutral-foregroundLevel2)",marginTop:0,marginBottom:"var(--rui-spacing-sm)"},h4:{color:"var(--rui-palette-neutral-foregroundLevel3)",marginBottom:"var(--rui-spacing-md)"},"h1 img":{width:"90%"},pre:{maxWidth:"100%"},code:{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"}}},buttons:{"& a":{margin:"var(--rui-spacing-md) var(--rui-spacing-xs)"},display:"flex",justifyContent:"center"},[oe("sm")]:{"$root h1":{margin:"var(--rui-app-appBarHeight) 0 0 0"},"$root h2":{marginBottom:"var(--rui-spacing-xl)"},"$root h4":{marginBottom:"var(--rui-spacing-xxl)"},"$root h1 img":{width:"75%"},"$buttons a":{margin:"var(--rui-spacing-xxxl) var(--rui-spacing-lg)"}},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-secondary-main)"},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),It=e=>{const{logoAlt:t,tagline:s,renderSubtitle:r,CoverCodeExample:a,githubUrl:n}=e;return x.create`
        <section class="${se.root}">
            <h1>
                <img class="${se.hiddenIfLight}" alt="${t}" src="/logo-dark.svg">
                <img class="${se.hiddenIfDark}" alt="${t}" src="/logo.svg">
            </h1>

            <${_} level="h2">${s}</${_}>

            ${({partial:i})=>r?i`<${_} level="h4">${r}</${_}>`:null}

            <${a} />

            <div class="${se.buttons}">
                <${A} 
                    label="Get Started"
                    color="primary"
                    variant="outlined"
                    href="#getting-started"
                />
                <${A} 
                    label="GitHub"
                    color="secondary"
                    variant="outlined"
                    href="${n}"
                    target="_blank"
                    renderLeftIcon=${()=>be.mount({className:se.icon})}
                />
            </div>
        </section>
    `},Pt=x.create`
    <pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;blue&#x27;</span>,
        color : <span class="hljs-string">&#x27;white&#x27;</span>,
        padding : <span class="hljs-string">&#x27;10px&#x27;</span>,
        borderRadius : <span class="hljs-string">&#x27;5px&#x27;</span>
    \}
\});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
`,Ft=It({logoAlt:"CSSFUN",tagline:"Near-zero runtime CSS-in-JS library",renderSubtitle:e=>e.partial`Write modular <strong>CSS</strong> within your <strong>JavaScript</strong> code with built-in <strong>themes</strong> and <strong>SSR</strong> support.`,CoverCodeExample:Pt,githubUrl:"https://github.com/8tentaculos/cssfun"}),Oe=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Bt}=H({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},code:{fontFamily:"var(--rui-fontFamily-code)",fontSize:"0.875em",lineHeight:"var(--rui-lineHeight-sm)",color:"var(--rui-palette-neutral-foregroundLevel1)",background:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.12)",border:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.16)",borderRadius:"var(--rui-borderRadius-xs)",padding:"0.1em 0.35em",wordBreak:"break-word"},"a > code":{color:"inherit"},"pre > code":{fontSize:"var(--rui-fontSize-sm)",lineHeight:"var(--rui-lineHeight-md)",borderRadius:"var(--rui-borderRadius-sm)",border:"none",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em",wordBreak:"normal"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Oe("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Oe("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},display:"grid",gridTemplateColumns:"auto",gap:"var(--rui-spacing-xl)","& section":{"& h5":{margin:"var(--rui-spacing-xs) 0",padding:"0"}}},[oe("sm")]:{$root:{gridTemplateColumns:"repeat(2, 1fr)"}}}),Wt=e=>[e.className||null,Bt.root].join(" "),Ut=x.create`
            <section class="${({props:e})=>Wt(e)}"><${O} tag="section" shadow="xs"><h5 id="near-zero-runtime-⚡">Near-Zero Runtime ⚡</h5>
<p>Styles are generated when the module is initialized, rather than during component rendering. This eliminates runtime
  style generation, improving performance and reducing complexity.</p></${O}><${O} tag="section" shadow="xs"><h5 id="component-scoped-styles-✨">Component-Scoped Styles ✨</h5>
<p><strong>CSSFUN</strong> scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic
  and styling in the same file for easier management.</p></${O}><${O} tag="section" shadow="xs"><h5 id="framework-agnostic-and-lightweight-🌐">Framework-Agnostic and Lightweight 🌐</h5>
<p><strong>CSSFUN</strong> is compatible with any environment. At just <strong>1.8KB</strong>, it adds minimal overhead to your projects.</p></${O}><${O} tag="section" shadow="xs"><h5 id="no-build-tools-required-🛠️">No Build Tools Required 🛠️</h5>
<p><strong>CSSFUN</strong> can be used directly in the browser, eliminating the need for complex build tools or configurations.</p></${O}><${O} tag="section" shadow="xs"><h5 id="server-side-rendering-ssr-support-🚀">Server-Side Rendering (SSR) Support 🚀</h5>
<p><strong>CSSFUN</strong> supports <a href="#server-side-rendering-ssr">server-side rendering</a> out of the box, optimizing initial load
  times without duplicating styles.</p></${O}><${O} tag="section" shadow="xs"><h5 id="built-in-theme-management-🎨">Built-in Theme Management 🎨</h5>
<p>With built-in <a href="#themes">theme support</a>, <strong>CSSFUN</strong> uses <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS variables</a>
  to manage light and dark color schemes. Themes update automatically based on user preferences, with no re-renders needed.</p></${O}><${O} tag="section" shadow="xs"><h5 id="typescript-support-🔷">TypeScript Support 🔷</h5>
<p>Ships with type definitions. The <code>classes</code> object is fully typed based on your styles, so you get autocomplete
  for class names and a type error on typos. CSS properties autocomplete via <a target="_blank" href="https://github.com/frenic/csstype">csstype</a>.</p></${O}></section>
        `,ze=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:qt}=H({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},code:{fontFamily:"var(--rui-fontFamily-code)",fontSize:"0.875em",lineHeight:"var(--rui-lineHeight-sm)",color:"var(--rui-palette-neutral-foregroundLevel1)",background:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.12)",border:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.16)",borderRadius:"var(--rui-borderRadius-xs)",padding:"0.1em 0.35em",wordBreak:"break-word"},"a > code":{color:"inherit"},"pre > code":{fontSize:"var(--rui-fontSize-sm)",lineHeight:"var(--rui-lineHeight-md)",borderRadius:"var(--rui-borderRadius-sm)",border:"none",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em",wordBreak:"normal"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...ze("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...ze("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}}}}),Kt=e=>[e.className||null,qt.root].join(" "),Vt=x.create`
            <section class="${({props:e})=>Kt(e)}"><h2 id="getting-started">Getting Started</h2>
<h3 id="installing-via-npm">Installing via npm</h3>
<pre><code class="bash language-bash">\$ npm install cssfun</code></pre>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">import</span> \{ css \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cssfun&#x27;</span>;</code></pre>
<h3 id="using-es-modules">Using ES modules</h3>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">import</span> \{ css \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;https://esm.run/cssfun&#x27;</span>;</code></pre>
<h3 id="using-script-tag">Using <code>&lt;script&gt;</code> tag</h3>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.jsdelivr.net/npm/cssfun&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ css \} = <span class="hljs-variable constant_">CSSFUN</span>;</code></pre>
<h3 id="create-your-styles">Create your styles</h3>
<p><code>css()</code> injects the styles and returns a <code>StyleSheet</code> instance. Its <code>classes</code> property holds the generated class names, one per top-level selector:</p>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;blue&#x27;</span>,
        color : <span class="hljs-string">&#x27;white&#x27;</span>,
        padding : <span class="hljs-string">&#x27;10px&#x27;</span>,
        borderRadius : <span class="hljs-string">&#x27;5px&#x27;</span>
    \}
\});</code></pre>
<h3 id="apply-the-styles-to-your-components">Apply the styles to your components:</h3>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
<p>See <a href="#class-name-generation">Class Name Generation</a> for how the names are built.</p>
<h2 id="class-name-generation">Class Name Generation</h2>
<p><code>css(styles)</code> returns a <a href="/api/#stylesheet"><code>StyleSheet</code></a> instance. Its <code>classes</code> property is an object that maps each top-level selector in your styles to a unique, scoped class name:</p>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> sheet = <span class="hljs-title function_">css</span>(\{
    button : \{ color : <span class="hljs-string">&#x27;red&#x27;</span> \},
    link : \{ color : <span class="hljs-string">&#x27;blue&#x27;</span> \}
\});

sheet.<span class="hljs-property">classes</span>;        <span class="hljs-comment">// \{ button: &quot;fun-9qkk9s-button&quot;, link: &quot;fun-9qkk9s-link&quot; \}</span>
sheet.<span class="hljs-property">classes</span>.<span class="hljs-property">button</span>; <span class="hljs-comment">// &quot;fun-9qkk9s-button&quot;</span></code></pre>
<p>Destructure <code>classes</code> to use the generated names as <code>className</code>:</p>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{ button : \{ color : <span class="hljs-string">&#x27;red&#x27;</span> \} \});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
<p>Generation happens once, when the instance is created — never during rendering — so there is no per-render overhead.</p>
<h3 id="which-selectors-get-a-class">Which selectors get a class</h3>
<p>Only top-level keys that are plain identifiers (matching <code>/^\w+\$/</code> — letters, digits and underscores) get a generated class. At-rules (<code>@global</code>, <code>@media …</code>, <code>@keyframes …</code>), <code>\$</code> references and keys with dashes, spaces or commas are left untouched and don't appear in <code>classes</code>.</p>
<h3 id="stable-across-environments">Stable across environments</h3>
<p>Each class name embeds a <code>uid</code> hashed from the styles' content, so identical styles always produce identical class names — across server and client, hot reloads, and repeated calls. This is what makes <a href="#server-side-rendering-ssr">SSR hydration</a> seamless.</p>
<h3 id="name-format">Name format</h3>
<p>The format depends on the build:</p>
<table>
<thead>
<tr>
<th>Build</th>
<th>Format</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>Development</td>
<td><code>\{prefix\}-\{uid\}-\{name\}</code></td>
<td><code>fun-9qkk9s-button</code></td>
</tr>
<tr>
<td>Production</td>
<td><code>\{prefix[0]\}-\{uid\}-\{index\}</code></td>
<td><code>f-9qkk9s-1</code></td>
</tr>
</tbody>
</table>
<p>In production, the original name is replaced by a 1-based index to keep the output small. The default <code>prefix</code> is <code>fun</code>.</p>
<blockquote>
  <p><strong>Note</strong>: Examples in this documentation use the development format for readability.
  You can override generation via <a href="/api/#new-stylesheetstyles-options"><code>options.generateClassName</code></a> or by <a href="/api/#stylesheet__generateclassname">extending <code>StyleSheet</code></a>.</p>
</blockquote>
<h2 id="renderers">Renderers</h2>
<p>Renderers are functions that transform style objects into CSS strings. They are applied in sequence, with each renderer receiving the output of the previous one.</p>
<p><strong>CSSFUN</strong> uses two built-in renderers by default:</p>
<ol>
<li><strong><code>parseStyles</code></strong>: Transforms the style object (expands nested selectors, replaces class references, converts camelCase to dashed-case, handles global styles)</li>
<li><strong><code>renderStyles</code></strong>: Converts the processed object into a CSS string</li>
</ol>
<p>The final renderer in the chain outputs the CSS string that gets injected into the DOM.</p>
<p>These are the built-in renderer transformations:</p>
<h4 id="camelized-keys-will-be-transformed-to-dashed-keys">Camelized keys will be transformed to dashed keys</h4>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    root : \{
        backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>,
        fontSize : <span class="hljs-string">&#x27;16px&#x27;</span>,
        paddingTop : <span class="hljs-string">&#x27;10px&#x27;</span>
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="renders-to">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;uwitok&quot;</span>&gt;</span>
    .fun-uwitok-root \{
        background-color: black;
        font-size: 16px;
        padding-top: 10px;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h4 id="nested-selectors-will-be-expanded">Nested selectors will be expanded</h4>
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
<h5 id="renders-to-1">Renders to:</h5>
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
<h5 id="renders-to-2">Renders to:</h5>
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
<h4 id="class-references-will-be-replaced-by-the-generated-class-name">Class references will be replaced by the generated class name</h4>
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
<h5 id="renders-to-3">Renders to:</h5>
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
<h4 id="global-selectors-will-be-rendered-as-global-styles">Global selectors will be rendered as global styles</h4>
<ul>
<li><p><strong>Global block</strong></p>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    <span class="hljs-string">&#x27;@global&#x27;</span> : \{
        body : \{
            backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>
        \}
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="renders-to-4">Renders to:</h5>
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
<h5 id="renders-to-5">Renders to:</h5>
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
<h5 id="renders-to-6">Renders to:</h5>
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
<h5 id="renders-to-7">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;xvd6jj&quot;</span>&gt;</span>
    .fun-xvd6jj-root a \{
        color: black;
    \}
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre></li>
</ul>
<p><strong>Example flow:</strong></p>
<pre><code>Input styles object
    ↓
[parseStyles] → Transforms object (expands nested, replaces references, converts camelCase)
    ↓
[renderStyles] → Converts object to CSS string
    ↓
Output CSS string
</code></pre>
<h3 id="custom-renderers">Custom Renderers</h3>
<p>You can customize the renderers via <a href="/api/#new-stylesheetstyles-options"><code>options.renderers</code></a> (or by setting <code>renderers</code> on a <a href="/api/#stylesheet"><code>StyleSheet</code></a> subclass).</p>
<p>Elements in the <code>renderers</code> array can be either functions or strings that reference methods of the <a href="/api/#stylesheet"><code>StyleSheet</code></a> instance. Method-name strings are resolved to methods when the instance is created, and every renderer is called with the instance as <code>this</code>.</p>
<p>Renderers are applied in array order, each receiving the previous one's output. By default, <a href="/api/#stylesheet"><code>StyleSheet</code></a> instances use <code>[this.parseStyles, this.renderStyles]</code>: <code>parseStyles</code> runs first (transforms the object), then <code>renderStyles</code> (converts it to the CSS string).</p>
<p><code>renderers</code> may also be given as a function that returns the array, resolved when the instance is created.</p>
<h2 id="subclassing--dynamic-values">Subclassing &amp; dynamic values</h2>
<p>The <code>prefix</code>, <code>attributes</code> and <code>renderers</code> options also accept a <strong>function</strong> that returns the value, so you can compute it at runtime instead of passing a static value. The timing differs: <code>prefix</code> and <code>renderers</code> are resolved once, when the instance is created, while <code>attributes</code> is resolved lazily every time the styles are rendered — handy for per-request values such as a <a href="#content-security-policy-csp">CSP nonce</a>.</p>
<p>For subclasses, the <code>preinitialize</code> method runs at the very start of the constructor — before the options are applied and before the class names are generated. Override it to run setup logic or define <code>prefix</code>, <code>attributes</code> or <code>renderers</code> (matching options still take precedence).</p>
<p>See <a href="#content-security-policy-csp">Content Security Policy (CSP)</a> for a real-world example that combines <code>preinitialize</code> with a function-valued <code>attributes</code>.</p>
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
<h3 id="creating-a-theme">Creating a Theme</h3>
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
<h3 id="customizing-the-theme">Customizing the Theme</h3>
<h4 id="color-scheme">Color Scheme</h4>
<p>The <code>options.colorScheme</code> parameter specifies which color scheme(s) to use. Possible values are:</p>
<ul>
<li><code>light</code>: Uses the <code>light</code> theme only.</li>
<li><code>dark</code>: Uses the <code>dark</code> theme only.</li>
<li><code>light dark</code> (default): Supports both <code>light</code> and <code>dark</code> themes, adapting to system preferences. You can override the system preference by setting the <code>data-color-scheme</code> attribute to <code>light</code> or <code>dark</code> on a parent element.</li>
<li><code>normal</code>: Uses the <code>normal</code> theme only.</li>
</ul>
<h4 id="css-variables-prefix">CSS Variables Prefix</h4>
<p>The <code>options.cssVarsPrefix</code> parameter allows you to customize the prefix for the generated CSS variables.
By default, the prefix is <code>fun</code>. For example, a key <code>colorPrimary</code> in the theme will generate a CSS variable
like <code>--fun-colorPrimary</code>.</p>
<h3 id="applying-the-theme-class">Applying the Theme Class</h3>
<p>The generated theme includes a <code>root</code> class, which exposes all the theme's CSS variables to any element
that uses this class and its descendants. You can apply this class to the <code>body</code> element to style the
entire application, or to the root element of a specific component to apply the theme to just part of your UI.</p>
<pre><code class="javascript language-javascript"><span class="hljs-comment">// Add theme class to the body</span>
<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>.<span class="hljs-property">classList</span>.<span class="hljs-title function_">add</span>(theme.<span class="hljs-property">classes</span>.<span class="hljs-property">root</span>);</code></pre>
<h3 id="using-theme-variables-in-styles">Using Theme Variables in Styles</h3>
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
<h2 id="server-side-rendering-ssr">Server-Side Rendering (SSR)</h2>
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
<p>When the app is hydrated on the client, the styles are preserved and will not be recreated.</p>
<h2 id="content-security-policy-csp">Content Security Policy (CSP)</h2>
<p>If your site uses a strict <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">Content Security Policy</a> with a per-request nonce (<code>style-src 'nonce-…'</code>), add that nonce to the generated <code>&lt;style&gt;</code> tags through the <a href="/api/#new-stylesheetstyles-options"><code>attributes</code></a> option/property. <code>StyleSheet.toString()</code> then emits <code>&lt;style nonce="…" data-fun-uid="…"&gt;</code>.</p>
<h3 id="set-it-on-the-prototype-per-request">Set it on the prototype per request</h3>
<p>Instances fall back to <code>StyleSheet.prototype.attributes</code>, which is read fresh on every render, so set the nonce there before rendering:</p>
<pre><code class="javascript language-javascript">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> \{
    <span class="hljs-title class_">StyleSheet</span>.<span class="hljs-property"><span class="hljs-keyword">prototype</span></span>.<span class="hljs-property">attributes</span> = \{ nonce : res.<span class="hljs-property">locals</span>.<span class="hljs-property">cspNonce</span> \};

    <span class="hljs-keyword">const</span> html = <span class="hljs-title function_">renderToString</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span>);
    <span class="hljs-keyword">const</span> styles = <span class="hljs-title class_">StyleSheet</span>.<span class="hljs-title function_">toString</span>(); <span class="hljs-comment">// &lt;style nonce=&quot;…&quot; data-fun-uid=&quot;…&quot;&gt;…&lt;/style&gt;</span>
    <span class="hljs-comment">// …embed \`styles\` in the &lt;head&gt; as in the SSR example above.</span>
\});</code></pre>
<p>Simple and effective for synchronous SSR: the styles are rendered on the server and reused on the client during hydration without being recreated, so the client needs no nonce handling. (For streaming/async SSR, resolve the nonce per request from context — e.g. <a target="_blank" href="https://nodejs.org/api/async_context.html"><code>AsyncLocalStorage</code></a> — via the function form, since the prototype is shared across concurrent requests.)</p>
<h3 id="scoped-alternative-a-subclass-with-preinitialize">Scoped alternative: a subclass with <code>preinitialize</code></h3>
<p>To avoid mutating the global prototype, scope it to your own subclass and <code>css</code> helper. <code>preinitialize</code> runs once per instance, so use the function form to read the nonce lazily at render time:</p>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">import</span> \{ <span class="hljs-title class_">StyleSheet</span> \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cssfun&#x27;</span>;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">CSPStyleSheet</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">StyleSheet</span> \{
    <span class="hljs-title function_">preinitialize</span>(<span class="hljs-params"></span>) \{
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">attributes</span> = <span class="hljs-function">() =&gt;</span> (\{ nonce : <span class="hljs-title function_">getRequestNonce</span>() \});
    \}
\}

<span class="hljs-keyword">const</span> <span class="hljs-title function_">css</span> = (<span class="hljs-params">styles, options</span>) =&gt; <span class="hljs-keyword">new</span> <span class="hljs-title class_">CSPStyleSheet</span>(styles, options).<span class="hljs-title function_">attach</span>();</code></pre>
<p>Pass <code>CSPStyleSheet</code> to <a href="#themes"><code>createTheme</code></a> via <a href="/api/#createtheme"><code>options.createStyleSheet</code></a> so theme styles carry the nonce too.</p>
<h2 id="typescript">TypeScript</h2>
<p><strong>CSSFUN</strong> ships with TypeScript declarations out of the box. The types are bundled in the package and resolved automatically.</p>
<blockquote>
  <p>Requires <strong>TypeScript 4.1+</strong> (the <code>classes</code> inference relies on key remapping and template literal types).</p>
</blockquote>
<h3 id="class-name-inference">Class name inference</h3>
<p>The <code>css()</code> function and <code>StyleSheet</code> constructor are generic over the styles object. The generated <code>classes</code> map is inferred from the keys you pass in, so typos and missing keys are caught at compile time:</p>
<pre><code class="ts language-ts"><span class="hljs-keyword">import</span> \{ css \} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cssfun&#x27;</span>;

<span class="hljs-keyword">const</span> sheet = <span class="hljs-title function_">css</span>(\{
    link : \{ color : <span class="hljs-string">&#x27;blue&#x27;</span> \},
    button : \{ padding : <span class="hljs-number">10</span> \}
\});

sheet.<span class="hljs-property">classes</span>.<span class="hljs-property">link</span>;   <span class="hljs-comment">// string</span>
sheet.<span class="hljs-property">classes</span>.<span class="hljs-property">button</span>; <span class="hljs-comment">// string</span>
sheet.<span class="hljs-property">classes</span>.<span class="hljs-property">typo</span>;   <span class="hljs-comment">// ❌ Property &#x27;typo&#x27; does not exist</span></code></pre>
<p>Only top-level keys that are valid class-name identifiers (letters, digits and underscores — i.e. matching <code>/^\w+\$/</code>) get a generated class at runtime, and the type mirrors that: at-rule keys (<code>@global</code>, <code>@keyframes …</code>, <code>@media …</code>, <code>@supports …</code>), class reference keys (<code>\$name</code>) and keys containing selector syntax (dashes, spaces, <code>&amp;</code>, <code>:</code>, etc.) are filtered out of <code>classes</code> automatically — they don't produce class names at runtime, so they don't appear in the type either.</p>
<h3 id="css-property-autocomplete">CSS property autocomplete</h3>
<p>Style rules use <a target="_blank" href="https://github.com/frenic/csstype"><code>csstype</code></a> under the hood, so you get autocomplete on standard CSS properties, with <code>null</code>/<code>undefined</code> accepted (and filtered at runtime). Note that values are intentionally permissive (any <code>string</code> is accepted) so that <code>var(...)</code>, custom values and arbitrary nested selectors keep working — so this is autocomplete, not strict validation:</p>
<pre><code class="ts language-ts"><span class="hljs-title function_">css</span>(\{
    card : \{
        color : <span class="hljs-string">&#x27;red&#x27;</span>,
        backgroundColor : <span class="hljs-literal">null</span>, <span class="hljs-comment">// ok — filtered at runtime</span>
        margin : <span class="hljs-literal">undefined</span>,     <span class="hljs-comment">// ok</span>
        padding : <span class="hljs-number">10</span>,           <span class="hljs-comment">// numbers accepted for length props</span>
    \},
    root : \{
        color : <span class="hljs-string">&#x27;black&#x27;</span>,
        <span class="hljs-string">&#x27;&amp;:hover&#x27;</span> : \{ color : <span class="hljs-string">&#x27;blue&#x27;</span> \},
        <span class="hljs-string">&#x27;&amp; span&#x27;</span> : \{ fontSize : <span class="hljs-number">14</span> \},
    \},
    <span class="hljs-string">&#x27;@global&#x27;</span> : \{ body : \{ margin : <span class="hljs-number">0</span> \} \},
    <span class="hljs-string">&#x27;@keyframes wave&#x27;</span> : \{
        <span class="hljs-string">&#x27;0%, 100%&#x27;</span> : \{ transform : <span class="hljs-string">&#x27;rotate(10deg)&#x27;</span> \},
        <span class="hljs-string">&#x27;50%&#x27;</span>      : \{ transform : <span class="hljs-string">&#x27;rotate(-10deg)&#x27;</span> \},
    \},
\});</code></pre>
<h3 id="exported-types">Exported types</h3>
<p>The following types are exported from the package root for use in your own code:</p>
<pre><code class="ts language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> \{
    <span class="hljs-title class_">CSSValue</span>,
    <span class="hljs-title class_">CSSProperties</span>,
    <span class="hljs-title class_">StyleRule</span>,
    <span class="hljs-title class_">Styles</span>,
    <span class="hljs-title class_">StyleSheetOptions</span>,
    <span class="hljs-title class_">RendererFn</span>,
    <span class="hljs-title class_">Resolvable</span>,
    <span class="hljs-title class_">ThemeDefinition</span>,
    <span class="hljs-title class_">ThemeVars</span>,
    <span class="hljs-title class_">CreateThemeOptions</span>
\} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;cssfun&#x27;</span>;</code></pre>
<h2 id="api-documentation">API Documentation</h2>
<p>Complete API documentation can be found <a data-router href="/api/">here</a>.</p>
<h2 id="working-with-llms">Working with LLMs</h2>
<p>For those working with LLMs, there is an <a target="_blank" href="https://github.com/8tentaculos/cssfun/blob/master/docs/AGENTS.md">AI Agents reference guide</a> that provides API patterns, style syntax, theme management, and best practices, optimized for LLM context. You can share this guide with AI assistants to help them understand <strong>CSSFUN</strong>'s architecture and styling APIs.</p>
<h2 id="examples">Examples</h2>
<p>The <code>example</code> folder contains various sample projects demonstrating how to use <strong>CSSFUN</strong> in
different environments and frameworks. Each example is a standalone project that you can run locally
to see <strong>CSSFUN</strong> in action.</p>
<h3 id="available-examples">Available Examples</h3>
<ul>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/react">React Example</a></strong>: A basic React application demonstrating the use of <strong>CSSFUN</strong> for styling React components. <a target="_blank" href="https://plnkr.co/plunk/hLIWLlAHGsE2ojO1">Try it</a>.</li>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/rasti">Rasti Example</a></strong>: A simple Rasti application illustrating how to apply <strong>CSSFUN</strong> to style Rasti components. <a target="_blank" href="https://plnkr.co/plunk/ivxPfUB5szwcuncf">Try it</a>.</li>
<li><strong><a target="_blank" href="https://github.com/8tentaculos/cssfun/tree/master/example/vanilla">Vanilla JS Example</a></strong>: A straightforward JavaScript example showing how to use <strong>CSSFUN</strong> for styling HTML components. <a target="_blank" href="https://plnkr.co/plunk/4ypn83Ru5Z6uwZew">Try it</a>.</li>
</ul></section>
        `;var Yt=x.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/>
    </svg>
`;const{classes:ge}=H({header:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-xs)",marginBottom:"var(--rui-spacing-sm)",flexShrink:0,...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{"& button":{opacity:1,color:`var(--rui-palette-${e}-contrastMain) !important`}}}))},collapseButton:{width:"32px",height:"32px",padding:0,opacity:.4,transition:"transform 0.2s ease, opacity 0.2s ease"},collapseButtonRotated:{transform:"rotate(180deg)"}}),Gt=x.create`
    <div
        class="${()=>ge.header}"
        data-slot="header"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
    >
        <${A}
            variant="outlined"
            color="${({props:e})=>e.color||"neutral"}"
            size="sm"
            title="${({props:e})=>e.collapseButtonTitle||"Toggle sidebar"}"
            className="${({props:e})=>N([ge.collapseButton,e.collapsed&&ge.collapseButtonRotated])}"
            onClick="${({props:e})=>e.handleToggle}"
        >
            <${Yt} />
        </${A}>
    </div>
`,{classes:Ke}=H({root:{position:"sticky",top:0,alignSelf:"flex-start",height:"100%",maxHeight:"var(--rui-viewport-height)",display:"flex",flexDirection:"column",maxWidth:"280px",borderRight:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundSoftLevel3) / 0.5)",transition:"max-width 0.2s ease, padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",padding:"var(--rui-spacing-lg)","&:where([data-collapsed])":{maxWidth:"32px",overflow:"hidden"},...z(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{borderRightColor:`var(--rui-palette-${e}-foregroundSoftLevel3)`}})),...z(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,borderRightColor:`var(--rui-palette-${e}-main)`},[`&:where([data-variant="solid"][data-color="${e}"]) > [data-slot="content"]`]:{color:`var(--rui-palette-${e}-contrastMain)`},[`&:where([data-variant="solid"][data-color="${e}"]) > [data-slot="content"] button`]:{color:`var(--rui-palette-${e}-contrastMain)`},[`&:where([data-variant="solid"][data-color="${e}"]) > [data-slot="content"] h3`]:{color:`var(--rui-palette-${e}-contrastMain)`}}))},content:{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden",opacity:1,transition:"opacity 0.2s ease, color 0.2s ease","&:where([data-collapsed])":{opacity:0,visibility:"hidden"}}}),Zt=x.create`
    <div
        class="${({props:e})=>N([Ke.content,e.className])}"
        data-slot="content"
        data-collapsed="${({props:e})=>e.collapsed||!1}"
    >
        ${({props:e})=>e.renderChildren()}
    </div>
`,Z=x.create`
    <aside
        class="${({props:e})=>N([Ke.root,e.className])}"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
        data-collapsed="${({props:e})=>e.collapsed||!1}"
        aria-expanded="${({props:e})=>!e.collapsed}"
        aria-label="${({props:e})=>e.ariaLabel||null}"
    >
        ${({props:e})=>e.renderChildren()}
    </aside>
`;Z.Header=Gt;Z.Content=Zt;var Xt=x.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
    </svg>
`;const{classes:ae}=H({root:{display:"flex",flexDirection:"column",marginTop:"var(--rui-app-appBarHeight)",minHeight:"calc(var(--rui-viewport-height) - var(--rui-app-appBarHeight))","@global a.anchor":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) * 2 + var(--rui-spacing-xs) * 6)"},"@global h2":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) * 2 + var(--rui-spacing-xs) * 6)"}},aside:{display:"none",top:"var(--rui-app-appBarHeight)",maxHeight:"calc(var(--rui-viewport-height) - var(--rui-app-appBarHeight))","@global > *:last-child":{paddingBottom:"var(--rui-spacing-md)"}},content:{flex:1,minWidth:0,width:"100%",paddingTop:"var(--rui-app-appBarHeight)"},secondaryHeader:{position:"fixed",top:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-lg))",left:"var(--rui-spacing-md)",right:"var(--rui-spacing-md)",display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)"},apiIndexDialog:{},[oe("sm")]:{$root:{flexDirection:"row","@global a.anchor":{scrollMarginTop:"var(--rui-app-appBarHeight)"},"@global h2":{scrollMarginTop:"var(--rui-app-appBarHeight)"}},$aside:{display:"flex"},$content:{flex:1,minWidth:0,paddingTop:0,paddingLeft:"var(--rui-spacing-xl)",paddingRight:"var(--rui-spacing-xl)"},$secondaryHeader:{display:"none"},$apiIndexDialog:{display:"none"}}}),Jt=e=>{const{ApiIndex:t,Api:s}=e;return x.create`
        <div class="${ae.root}">
            <${Z} 
                className="${ae.aside}"
                collapsed="${({state:a})=>a.collapsed}"
            >
                <${Z.Header}
                    collapsed="${({state:a})=>a.collapsed}"
                    handleToggle="${({state:a})=>()=>{a.collapsed=!a.collapsed}}"
                />
                <${Z.Content} collapsed="${({state:a})=>a.collapsed}">
                    <${t} />
                </${Z.Content}>
            </${Z}>
            <${O}
                className="${ae.secondaryHeader}"
                color="neutral"
            >
                <${A}
                    label="API Index"
                    variant="plain"
                    color="neutral"
                    renderLeftIcon=${()=>Xt.mount()}
                    onClick="${({state:a})=>()=>{a.dialogOpen=!0}}"
                />
            </${O}>
            ${({state:a,partial:n})=>a.dialogOpen?n`<${U}
                    className="${ae.apiIndexDialog}"
                    handleClose="${({state:o})=>()=>{o.dialogOpen=!1}}"
                    shadow="lg"
                >
                    <${U.Header}
                        title="API Index"
                        handleClose="${({state:o})=>()=>{o.dialogOpen=!1}}"
                        closeButton=${!0}
                    />
                    <${U.Content}>
                        <${t} events="${({state:o})=>({"click a":()=>{o.dialogOpen=!1}})}" />
                    </${U.Content}>
                </${U}>`:null}
            <div class="${ae.content}">
                <${s} />
            </div>
        </div>
    `.extend({onCreate(){this.state=new le({collapsed:!1,dialogOpen:!1})}})},{classes:Qt}=H({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-sm)",lineHeight:"var(--rui-lineHeight-sm)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-sm) 0",padding:"0",borderBottom:"none"},ul:{listStyle:"none",padding:"0",margin:"0"},li:{margin:"var(--rui-spacing-xs) 0",padding:"0"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},code:{fontSize:"var(--rui-fontSize-sm)"}},"& > ul > li":{fontSize:"var(--rui-fontSize-md)",fontWeight:"var(--rui-fontWeight-md)"},"& ul ul":{paddingLeft:"var(--rui-spacing-lg)",marginTop:"var(--rui-spacing-xs)",fontSize:"var(--rui-fontSize-sm)",fontWeight:"var(--rui-fontWeight-sm)"}}}),es=e=>[e.className||null,Qt.root].join(" "),ts=x.create`
            <nav class="${({props:e})=>es(e)}"><h2 id="classes">Classes</h2>
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
        `,Ne=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:ss}=H({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},code:{fontFamily:"var(--rui-fontFamily-code)",fontSize:"0.875em",lineHeight:"var(--rui-lineHeight-sm)",color:"var(--rui-palette-neutral-foregroundLevel1)",background:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.12)",border:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.16)",borderRadius:"var(--rui-borderRadius-xs)",padding:"0.1em 0.35em",wordBreak:"break-word"},"a > code":{color:"inherit"},"pre > code":{fontSize:"var(--rui-fontSize-sm)",lineHeight:"var(--rui-lineHeight-md)",borderRadius:"var(--rui-borderRadius-sm)",border:"none",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em",wordBreak:"normal"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ne("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Ne("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},margin:0,width:"100%",boxSizing:"border-box"}}),as=e=>[e.className||null,ss.root].join(" "),rs=x.create`
            <section class="${({props:e})=>as(e)}"><a name="stylesheet" id="stylesheet" class="anchor"></a></p>
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
<td>Object mapping each top-level selector key (those matching <code>/^\w+\$/</code>) to its generated unique class name string.</td>
</tr>
<tr>
<td>styles</td>
<td><code>Object</code></td>
<td>The original styles object provided to the instance.</td>
</tr>
<tr>
<td>uid</td>
<td><code>string</code></td>
<td>Unique identifier for the StyleSheet instance, generated using <code>this.generateUid</code>.</td>
</tr>
<tr>
<td>prefix</td>
<td><code>string</code></td>
<td>Prefix for generating unique identifiers. Resolved to a string when the instance is created (may be supplied as a function via options or a subclass).</td>
</tr>
<tr>
<td>[attributes]</td>
<td><code>Object</code> | <code>function</code></td>
<td>Optional attributes to be added to the <code>&lt;style&gt;</code> element. May be <code>undefined</code>, an object, or a function returning the attributes object (evaluated lazily by <code>getAttributes</code>).</td>
</tr>
<tr>
<td>renderers</td>
<td><code>Array</code></td>
<td>Array of renderer functions used to process the styles object. Method-name strings passed via options are resolved to methods when the instance is created.</td>
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
<li><a href="#stylesheet__preinitialize">.preinitialize(styles, [options])</a> ⇒ <code>void</code></li>
<li><a href="#stylesheet__generateuid">.generateUid()</a> ⇒ <code>string</code></li>
<li><a href="#stylesheet__generateclassname">.generateClassName(className, index)</a> ⇒ <code>string</code></li>
<li><a href="#stylesheet__render">.render()</a> ⇒ <code>string</code></li>
<li><a href="#stylesheet__tostring">.toString()</a> ⇒ <code>string</code></li>
<li><a href="#stylesheet__shouldattachtodom">.shouldAttachToDOM()</a> ⇒ <code>boolean</code></li>
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
<h3 id="new-stylesheetstyles-options">new StyleSheet(styles, [options])</h3>
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
<td><code>string</code> | <code>function</code></td>
<td><code>"'fun'"</code></td>
<td>Prefix for generating unique identifiers and data attributes. May be a function returning the prefix, evaluated when the instance is created.</td>
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
<td><code>Object</code> | <code>function</code></td>
<td></td>
<td>Attributes to be added to the <code>&lt;style&gt;</code> element. May be a function returning the attributes object, evaluated lazily by <code>getAttributes</code>.</td>
</tr>
<tr>
<td>[options.renderers]</td>
<td><code>Array</code> | <code>function</code></td>
<td><code>['parseStyles', 'renderStyles']</code></td>
<td>Array of renderer functions or method names (or a function returning such an array). Resolved when the instance is created and applied in order by <code>render</code>, each renderer receiving the previous one's output. Renderers are called with the instance as <code>this</code>.</td>
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
<p><a name="stylesheet__preinitialize" id="stylesheet__preinitialize" class="anchor"></a></p>
<h3 id="stylesheetpreinitializestyles-options-⇒-c32c">styleSheet.preinitialize(styles, [options]) ⇒ <code>void</code></h3>
<p>Hook run at the very start of the constructor, before <code>styles</code> and <code>options</code>
are applied and before <code>renderers</code>, <code>prefix</code>, <code>uid</code> and <code>classes</code> are computed.
Does nothing by default. Override it in a subclass to run setup logic or define
instance properties such as <code>prefix</code>, <code>attributes</code> or <code>renderers</code>. Values set
here are still overridden by the matching <code>options</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a>  </p>
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
<td>The styles object passed to the constructor.</td>
</tr>
<tr>
<td>[options]</td>
<td><code>Object</code></td>
<td>The options object passed to the constructor (may be <code>undefined</code>).</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet__generateuid" id="stylesheet__generateuid" class="anchor"></a></p>
<h3 id="stylesheetgenerateuid-⇒-c36c">styleSheet.generateUid() ⇒ <code>string</code></h3>
<p>Generate a stable unique identifier.
May be overridden by <code>options.generateUid</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - The unique identifier.<br />
<a name="stylesheet__generateclassname" id="stylesheet__generateclassname" class="anchor"></a></p>
<h3 id="stylesheetgenerateclassnameclassname-index-⇒-c39c">styleSheet.generateClassName(className, index) ⇒ <code>string</code></h3>
<p>Generate a unique class name.
Transform local selectors that are classes to unique class names
to be used as class names in the styles object.
May be overridden by <code>options.generateClassName</code> or by extending the class.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - The unique class name.  </p>
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
<td><code>string</code></td>
<td>The class name.</td>
</tr>
<tr>
<td>index</td>
<td><code>number</code></td>
<td>The index of the class name.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet__render" id="stylesheet__render" class="anchor"></a></p>
<h3 id="stylesheetrender-⇒-c44c">styleSheet.render() ⇒ <code>string</code></h3>
<p>Apply the renderers to the styles object.
Renderers are applied in order, starting from <code>this.styles</code>, with each renderer
receiving the previous one's output and called with the instance as <code>this</code>.
It will return a string ready to be added to the style element.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - The styles object as a string.<br />
<a name="stylesheet__tostring" id="stylesheet__tostring" class="anchor"></a></p>
<h3 id="stylesheettostring-⇒-c47c">styleSheet.toString() ⇒ <code>string</code></h3>
<p>Render the StyleSheet as a style element string.
Used for server-side rendering.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - The instance as a string.<br />
<a name="stylesheet__shouldattachtodom" id="stylesheet__shouldattachtodom" class="anchor"></a></p>
<h3 id="stylesheetshouldattachtodom-⇒-c50c">styleSheet.shouldAttachToDOM() ⇒ <code>boolean</code></h3>
<p>Check if the StyleSheet should be added to the DOM.
By default, it returns true if running in a browser environment and no style element
with the same <code>data-fun-uid</code> attribute exists in the DOM.
This prevents duplicate style elements and ensures proper behavior for server-side rendering.
May be overridden by <code>options.shouldAttachToDOM</code>.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>boolean</code> - True if the StyleSheet should be added to the DOM, false otherwise.<br />
<a name="stylesheet__attach" id="stylesheet__attach" class="anchor"></a></p>
<h3 id="stylesheetattach-⇒-c53cstylesheet">styleSheet.attach() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
<p>Add the instance to the registry and if we are in the browser, 
attach it to the DOM.</p>
<p><strong>Kind</strong>: instance method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The instance.<br />
<a name="stylesheet__destroy" id="stylesheet__destroy" class="anchor"></a></p>
<h3 id="stylesheetdestroy-⇒-c56cstylesheet">styleSheet.destroy() ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h3>
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
<td><code>string</code></td>
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
<td><code>string</code></td>
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
<td><code>boolean</code></td>
<td>The debug flag. If true, the styles will be formatted with indentation and new lines.</td>
</tr>
</tbody>
</table>
<p><a name="stylesheet_tostring" id="stylesheet_tostring" class="anchor"></a></p>
<h3 id="stylesheettostring-⇒-c70c">StyleSheet.toString() ⇒ <code>string</code></h3>
<p>Render all instances in the registry as a string, including the style tags.
Can be used to insert style tags in an HTML template for server-side rendering.</p>
<p><strong>Kind</strong>: static method of <a href="#stylesheet"><code>StyleSheet</code></a><br />
<strong>Returns</strong>: <code>string</code> - All instances in the registry as a string.<br />
<a name="stylesheet_tocss" id="stylesheet_tocss" class="anchor"></a></p>
<h3 id="stylesheettocss-⇒-c73c">StyleSheet.toCSS() ⇒ <code>string</code></h3>
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
<h2 id="createthemethemes-options-⇒-c77cstylesheet">createTheme(themes, [options]) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
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
<td><code>String</code> | <code>null</code></td>
<td>Prefix for the generated CSS variables. Defaults to <code>StyleSheet.prefix</code>. Pass <code>null</code> or <code>''</code> to generate variables without a prefix (e.g. <code>--color</code> instead of <code>--fun-color</code>).</td>
</tr>
<tr>
<td>[options.createStyleSheet]</td>
<td><code>function</code></td>
<td>A function used to create a new StyleSheet instance.  By default, it uses the <code>css</code> function.</td>
</tr>
<tr>
<td>[options.styleSheetOptions]</td>
<td><code>Object</code></td>
<td>Options to pass when creating the StyleSheet instance.</td>
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
<h2 id="cssstyles-options-⇒-c86cstylesheet">css(styles, [options]) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
<p>Creates and attaches a new StyleSheet instance to the DOM.</p>
<p><strong>Kind</strong>: global function<br />
<strong>Returns</strong>: <a href="#stylesheet"><code>StyleSheet</code></a> - The created and attached StyleSheet instance. Its <code>classes</code> property maps
each top-level selector to its generated class name.  </p>
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
        `,ns=Jt({ApiIndex:ts,Api:rs}),{AppBar:os,AppBarMenuContent:is}=Ot({logoAlt:"CSSFUN",playgroundUrl:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",githubUrl:"https://github.com/8tentaculos/cssfun",npmUrl:"https://www.npmjs.com/package/cssfun"}),ls=Ct({title:"CSSFUN",AppBar:os,AppBarMenuContent:is,Cover:Ft,Features:Ut,Readme:Vt,AboutSite:Nt({projectName:"CSSFUN",projectGithubUrl:"https://github.com/8tentaculos/cssfun"}),Api:ns,Footer:Dt({licenseUrl:"https://github.com/8tentaculos/cssfun/blob/master/LICENSE",startYear:2024})});ls.mount(window.__APP_OPTIONS__,document.getElementById("root"),!0);
