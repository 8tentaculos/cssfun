(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=s(a);fetch(a.href,n)}})();const qe=!1;function ae(e){if(typeof e!="function"){const t="Event listener must be a function";throw new TypeError(t)}}class De{on(t,s){return ae(s),this.listeners||(this.listeners={}),this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(s),()=>this.off(t,s)}once(t,s){ae(s);const r=(...a)=>{s(...a),this.off(t,r)};return this.on(t,r)}off(t,s){if(this.listeners){if(!t){delete this.listeners;return}this.listeners[t]&&(s?(this.listeners[t]=this.listeners[t].filter(r=>r!==s),this.listeners[t].length||delete this.listeners[t]):delete this.listeners[t],Object.keys(this.listeners).length||delete this.listeners)}}emit(t,...s){!this.listeners||!this.listeners[t]||this.listeners[t].slice().forEach(r=>r(...s))}listenTo(t,s,r){return t.on(s,r),this.listeningTo||(this.listeningTo=[]),this.listeningTo.push({emitter:t,type:s,listener:r}),()=>this.stopListening(t,s,r)}listenToOnce(t,s,r){ae(r);const a=(...n)=>{r(...n),this.stopListening(t,s,a)};return this.listenTo(t,s,a)}stopListening(t,s,r){this.listeningTo&&(this.listeningTo=this.listeningTo.filter(a=>!t||t===a.emitter&&!s||t===a.emitter&&s===a.type&&!r||t===a.emitter&&s===a.type&&r===a.listener?(a.emitter.off(a.type,a.listener),!1):!0),this.listeningTo.length||delete this.listeningTo)}}const G=(e,t,...s)=>typeof e!="function"?e:e.apply(t,s);class ie extends De{constructor(){super(),this.preinitialize.apply(this,arguments),this.attributes=Object.assign({},G(this.defaults,this),this.parse.apply(this,arguments)),this.previous={},Object.keys(this.attributes).forEach(this.defineAttribute.bind(this))}preinitialize(){}defineAttribute(t){Object.defineProperty(this,`${this.constructor.attributePrefix}${t}`,{get:()=>this.get(t),set:s=>{this.set(t,s)}})}get(t){return this.attributes[t]}set(t,s,...r){let a,n;typeof t=="object"?(a=t,n=[s,...r]):(a={[t]:s},n=r);const o=this._changing;this._changing=!0;const i={};o||(this.previous=Object.assign({},this.attributes)),Object.keys(a).forEach(h=>{a[h]!==this.attributes[h]&&(i[h]=a[h],this.attributes[h]=a[h])});const d=Object.keys(i);if(d.length&&(this._pending=["change",this,i,...n]),d.forEach(h=>{this.emit(`change:${h}`,this,a[h],...n)}),o)return this;for(;this._pending;){const h=this._pending;this._pending=null,this.emit.apply(this,h)}return this._pending=null,this._changing=!1,this}parse(t){return t}toJSON(){return Object.assign({},this.attributes)}}ie.attributePrefix="";const Ke=["el","tag","attributes","events","model","template","onDestroy"];class re extends De{constructor(t={}){super(),this.preinitialize.apply(this,arguments),this.delegatedEventListeners=[],this.children=[],this.destroyQueue=[],this.viewOptions=[],Ke.forEach(s=>{s in t&&(this[s]=t[s],this.viewOptions.push(s))}),this.ensureUid(),this.ensureElement()}preinitialize(){}$(t){return this.el.querySelector(t)}$$(t){return this.el.querySelectorAll(t)}destroy(){return this.destroyChildren(),this.undelegateEvents(),this.stopListening(),this.off(),this.destroyQueue.forEach(t=>t()),this.destroyQueue=[],this.onDestroy.apply(this,arguments),this.destroyed=!0,this}onDestroy(){}addChild(t){return this.children.push(t),t}destroyChildren(){this.children.forEach(t=>t.destroy()),this.children=[]}ensureUid(){this.uid||(this.uid=`r${++re.uid}`)}ensureElement(){if(this.el)this.el=G(this.el,this);else{const t=G(this.tag,this),s=G(this.attributes,this);this.el=this.createElement(t,s)}this.delegateEvents()}createElement(t="div",s={}){let r=document.createElement(t);return Object.keys(s).forEach(a=>r.setAttribute(a,s[a])),r}removeElement(){return this.el.parentNode.removeChild(this.el),this}delegateEvents(t){if(t||(t=G(this.events,this)),!t)return this;this.delegatedEventListeners.length&&this.undelegateEvents();const s={};return Object.keys(t).forEach(r=>{const a=r.match(/^(\w+)(?:\s+(.+))*$/);if(!a){const d=`Invalid event format: ${r}`;throw new Error(d)}const[,n,o]=a;let i=t[r];typeof i=="string"&&(i=this[i]),ae(i),s[n]||(s[n]=[]),s[n].push([o,i])}),Object.keys(s).forEach(r=>{const a=n=>{let o=n.target;for(;o;)o.matches&&s[r].forEach(([i,d])=>{(o===this.el&&!i||o!==this.el&&o.matches(i))&&d.call(this,n,this,o)}),o=o===this.el||n.cancelBubble?null:o.parentElement};this.delegatedEventListeners.push([r,a]),this.el.addEventListener(r,a)}),this}undelegateEvents(){return this.delegatedEventListeners.forEach(([t,s])=>{this.el.removeEventListener(t,s)}),this.delegatedEventListeners=[],this}render(){return this}static sanitize(t){return`${t}`.replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[s])}static resetUid(){re.uid=0}}re.uid=0;class xe{constructor(t){this.value=t}toString(){return this.value}}class ue{constructor(t){this.items=t}}class Ye{constructor(){this.listeners=[],this.types=new Set,this.previousSize=0}addListener(t,s){return this.types.add(s),this.listeners.push(t),this.listeners.length-1}reset(){this.listeners=[],this.previousSize=this.types.size}hasPendingTypes(){return this.types.size>this.previousSize}}function Ve(e,t={}){const s={},r=[];return Object.keys(e).forEach(a=>{let n=e[a];n!==t[a]&&(n===!0?s[a]="":n!==!1&&((n===null||typeof n>"u")&&(n=""),s[a]=n))}),Object.keys(t).forEach(a=>{(!(a in e)||t[a]!==e[a]&&e[a]===!1)&&r.push(a)}),{add:s,remove:r}}const $e=["value","checked","selected"];let Ge=class{constructor(t){this.getSelector=t.getSelector,this.getAttributes=t.getAttributes,this.previousAttributes={}}hydrate(t){this.ref=t.querySelector(this.getSelector())}update(){const t=this.getAttributes(),{remove:s,add:r}=Ve(t,this.previousAttributes);this.previousAttributes=t,s.forEach(a=>{this.ref.removeAttribute(a),$e.indexOf(a)!==-1&&a in this.ref&&(this.ref[a]=a==="value"?"":!1)}),Object.keys(r).forEach(a=>{const n=r[a];this.ref.setAttribute(a,n),$e.indexOf(a)!==-1&&a in this.ref&&(this.ref[a]=a==="value"?n:n!==!1&&n!=="false")})}};class Ze{constructor(){}reset(){this.paused=0,this.previous=this.tracked||new Map,this.tracked=new Map,this.positionStack=[0]}push(){this.positionStack.push(0)}pop(){this.positionStack.pop()}increment(){this.positionStack[this.positionStack.length-1]++}pause(){this.paused++}resume(){this.paused--}getPath(){return this.positionStack.join("-")}track(t){return this.paused===0&&this.tracked.set(this.getPath(),t),t}hasSingleComponent(){if(this.tracked.size!==1||this.previous.size!==1)return!1;const[t,s]=this.tracked.entries().next().value,[r,a]=this.previous.entries().next().value;return t!=="0"||r!=="0"?!1:s===a}findRecyclable(t){const s=this.previous.get(this.getPath());return s&&!s.key&&s.constructor===t.constructor?s:null}}const Se=["value","checked","selected"],Xe=(e,t)=>{const s=e.childNodes,r=t.childNodes,a=s.length;if(a!==r.length)return!1;for(let n=0;n<a;n++)if(!s[n].isEqualNode(r[n]))return!1;return!0},Je=(e,t)=>{const s=t.attributes,r=e.attributes,a=new Set;for(let n=0,o=s.length;n<o;n++){const{name:i,value:d}=s[n];a.add(i),e.getAttribute(i)!==d&&e.setAttribute(i,d)}for(let n=r.length-1;n>=0;n--){const{name:o}=r[n];a.has(o)||e.removeAttribute(o)}for(let n=0,o=Se.length;n<o;n++){const i=Se[n];i in e&&e[i]!==t[i]&&(e[i]=t[i])}},Qe=(e,t)=>{const s=Array.from(t.childNodes);e.replaceChildren(...s)};function et(e,t){if(e.nodeType!==t.nodeType){e.replaceWith(t);return}if(e.nodeType===Node.TEXT_NODE){e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue);return}if(e.tagName!==t.tagName){e.replaceWith(t);return}Je(e,t),Xe(e,t)||Qe(e,t)}function ge(e,t,s=()=>!1,r){let a=r||e.firstChild;for(;a;){if(a.nodeType===Node.COMMENT_NODE&&a.data.trim()===t)return a;if(a.nodeType===Node.ELEMENT_NODE&&!s(a)&&a.firstChild){a=a.firstChild;continue}for(;a&&!a.nextSibling;)if(a=a.parentNode,!a||a===e)return null;a&&(a=a.nextSibling)}return null}class we{constructor(t){this.getStart=t.getStart,this.getEnd=t.getEnd,this.expression=t.expression,this.shouldSkipFind=t.shouldSkipFind,this.shouldSkipSync=t.shouldSkipSync,this.tracker=new Ze}hydrate(t){const s=ge(t,this.getStart(),this.shouldSkipFind),r=ge(t,this.getEnd(),this.shouldSkipFind,s);this.ref=[s,r]}update(t,s){let r;const[a,n]=this.ref,o=a.nextSibling,i=o===n,d=!i&&o.nextSibling===n;if(i?n.parentNode.insertBefore(t,n):d&&t.children.length===1&&!this.shouldSkipSync(o)&&!this.shouldSkipSync(t.firstChild)?et(o,t.firstChild):(r=document.createComment(""),n.parentNode.insertBefore(r,n),n.parentNode.insertBefore(t,n)),s(),r)if(this.ref[0].nextSibling===r)r.parentNode.removeChild(r);else{const j=document.createRange();j.setStartAfter(this.ref[0]),j.setEndAfter(r),j.deleteContents()}}updateElement(t,s,r){const a=document.createComment("");t.parentNode.insertBefore(a,t.nextSibling),a.parentNode.insertBefore(s.firstChild,a.nextSibling),r(),t.nextSibling===a&&t.parentNode.removeChild(t),a.parentNode.removeChild(a)}}const Ne=e=>e.reduce((t,s)=>(Array.isArray(s)?t.push(...Ne(s)):t.push(s),t),[]);function le(e){const t=document.createElement("template");return t.innerHTML=`${e}`.trim(),t.content}function ze(e){const t=[];return Object.keys(e).forEach(s=>{let r=e[s];r===!0?t.push(s):r!==!1&&((r===null||typeof r>"u")&&(r=""),t.push(`${s}="${r}"`))}),t.join(" ")}let ce,oe,Ie,Be;typeof document<"u"&&(ce=!!navigator.userAgent.match(/Chrome/),oe=!!Element.prototype.moveBefore,Ie=!oe||ce,Be=oe&&ce);function tt(e,t){const s=Ie&&document.activeElement&&t.contains(document.activeElement)?document.activeElement:null;s&&Be&&s.blur(),e.parentNode[oe?"moveBefore":"insertBefore"](t,e),e.parentNode.removeChild(e),s&&s!==document.activeElement&&t.contains(s)&&s.focus()}const X=(e,t,s)=>{try{return typeof e!="function"?e:(qe&&e.prototype instanceof m,e.call(t,t))}catch(r){if(s&&!r._rasti){let a;a=`Error in ${t.constructor.name}#${t.uid} expression`;const n=new Error(a,{cause:r});throw n._rasti=!0,n}throw r}},je=e=>!!(e&&e.dataset&&e.dataset[m.DATASET_ELEMENT]&&e.dataset[m.DATASET_ELEMENT].endsWith("-1")),st=e=>!!(e&&(e.dataset&&e.dataset[m.DATASET_ELEMENT]||e.querySelector&&e.querySelector(`[${m.ATTRIBUTE_ELEMENT}]`))),Ce=(e,t)=>e.reduce((s,r,a)=>(s.push(r),typeof t[a]<"u"&&s.push(m.PLACEHOLDER(a)),s),[]).join(""),fe=(e,t)=>{const s=m.PLACEHOLDER("(\\d+)"),r=e.match(new RegExp(`^${s}$`));if(r)return[t[parseInt(r[1],10)]];const a=new RegExp(`${s}`,"g"),n=[];let o=0,i;for(;(i=a.exec(e))!==null;){const d=e.slice(o,i.index);n.push(m.markAsSafeHTML(d),t[parseInt(i[1],10)]),o=i.index+i[0].length}return n.push(m.markAsSafeHTML(e.slice(o))),n},ye=(e,t)=>e.reduce((s,r)=>{const a=t(r[0]);if(r.length===1)typeof a=="object"?s=Object.assign(s,a):typeof a=="string"&&(s[a]=!0);else{const n=r[2]?t(r[1]):r[1];s[a]=n}return s},{}),Fe=(e,t,s)=>{const r={};return Object.keys(e).forEach(a=>{const n=a.match(/on(([A-Z]{1}[a-z]+)+)/);if(n&&n[1]){const o=n[1].toLowerCase(),i=e[a];if(i){const d=t.addListener(i,o);r[s(o)]=d}}else r[a]=e[a]}),r},me=(e,t,s=!1)=>{const r=m.PLACEHOLDER("(\\d+)"),a=new Map;return s||(e=e.replace(new RegExp(r,"g"),(n,o)=>{const i=t[o];if(i&&i.prototype instanceof m){if(a.has(i))return a.get(i);a.set(i,n)}return n})),e.replace(new RegExp(`<(${r})([^>]*)/>|<(${r})([^>]*)>([\\s\\S]*?)</\\4>`,"g"),(n,o,i,d,h,j,l,u)=>{let p,$,L;if(h?(p=t[j],$=l):(p=typeof i<"u"?t[i]:o,$=d),!(p.prototype instanceof m))return n;if(h){const K=me(u,t,!0),H=We(K,t);L=fe(H,t)}const q=be($,t),D=function(){const K=ye(q,H=>X(H,this,"children options"));return L&&(K.renderChildren=()=>new ue(L.map(H=>X(H,this,"children")))),p.mount(K)};return t.push(D),m.PLACEHOLDER(t.length-1)})},Pe=(e,t)=>{const s=m.PLACEHOLDER("(?:\\d+)");return e.replace(new RegExp(`<(${s}|[a-z]+[1-6]?)(?:\\s*)((?:"[^"]*"|'[^']*'|[^>])*)(/?>)`,"gi"),t)},at=(e,t,s)=>{const r=m.PLACEHOLDER("(?:\\d+)");if(e.match(new RegExp(`^\\s*${r}\\s*$`)))return e;const n=e.match(new RegExp(`^\\s*<([a-z]+[1-6]?|${r})([^>]*)>([\\s\\S]*?)</(\\1|${r})>\\s*$|^\\s*<([a-z]+[1-6]?|${r})([^>]*)/>\\s*$`));if(!n){const i="Invalid component template";throw new Error(i)}let o=0;return Pe(n[0],(i,d,h,j)=>{const l=o===0,u=++o;if(!l&&!h.match(new RegExp(r)))return i;const p=be(h,t),$=H=>`${H}-${u}`,L=function(){const H=Fe(ye(p,Y=>X(Y,this,"element attribute")),this.eventsManager,Y=>m.ATTRIBUTE_EVENT(Y,this.uid));return l&&this.attributes&&Object.assign(H,G(this.attributes,this)),H[m.ATTRIBUTE_ELEMENT]=$(this.uid),H},q=function(){return`[${m.ATTRIBUTE_ELEMENT}="${$(this.uid)}"]`},D=s.length;s.push({getSelector:q,getAttributes:L}),t.push(function(){const H=this.template.elements[D],Y=H.getAttributes.call(this);return H.previousAttributes=Y,m.markAsSafeHTML(ze(Y))});const K=m.PLACEHOLDER(t.length-1);return`<${d} ${K}${j}`})},We=(e,t)=>{const s=m.PLACEHOLDER("(?:\\d+)");return Pe(e,(r,a,n,o)=>{if(!n.match(new RegExp(s)))return r;const i=be(n,t),d=function(){return Fe(ye(i,l=>X(l,this,"partial element attribute")),this.eventsManager,l=>m.ATTRIBUTE_EVENT(l,this.uid))};t.push(function(){const j=d.call(this);return m.markAsSafeHTML(ze(j))});const h=m.PLACEHOLDER(t.length-1);return`<${a} ${h}${o}`})},rt=(e,t,s)=>{const r=m.PLACEHOLDER("(\\d+)");let a=0;return e.replace(new RegExp(r,"g"),function(n,o,i){const d=e.substring(0,i),h=d.lastIndexOf("<"),j=d.lastIndexOf(">");if(h>j)return n;const l=++a;function u(){return m.MARKER_START(`${this.uid}-${l}`)}function p(){return m.MARKER_END(`${this.uid}-${l}`)}const $=s.length;return s.push({getStart:u,getEnd:p,expression:t[o]}),t.push(function(){return this.template.interpolations[$]}),m.PLACEHOLDER(t.length-1)})},be=(e,t)=>{const s=m.PLACEHOLDER("(\\d+)"),r=[],a=new RegExp(`(?:${s}|([\\w-]+))(?:=(["']?)(?:${s}|((?:.?(?!["']?\\s+(?:\\S+)=|\\s*/>|\\s*[>"']))+.))?\\3)?`,"g");let n;for(;(n=a.exec(e))!==null;){const[,o,i,d,h,j]=n,l=!!d;let u=typeof o<"u"?t[parseInt(o,10)]:i,p=typeof h<"u"?t[parseInt(h,10)]:j;l&&typeof p>"u"&&(p=""),typeof p<"u"?r.push([u,p,l]):r.push([u])}return r},nt=["key","state","onCreate","onChange","onHydrate","onBeforeRecycle","onRecycle","onBeforeUpdate","onUpdate"];class m extends re{constructor(t={}){super(...arguments),this.componentOptions=[],nt.forEach(r=>{r in t&&(this[r]=t[r],this.componentOptions.push(r))});const s={};Object.keys(t).forEach(r=>{this.viewOptions.indexOf(r)===-1&&this.componentOptions.indexOf(r)===-1&&(s[r]=t[r])}),this.props=new ie(s),this.options=t,this.partial=this.partial.bind(this),this.onChange=this.onChange.bind(this),this.onCreate.apply(this,arguments)}events(){const t={};return this.eventsManager.types.forEach(s=>{const r=m.ATTRIBUTE_EVENT(s,this.uid),a=function(n,o,i){const d=i.getAttribute(r);if(d){let h=this.eventsManager.listeners[parseInt(d,10)];typeof h=="string"&&(h=this[h]),ae(h),h.call(this,n,o,i)}};t[`${s} [${r}]`]=a,t[s]=a}),t}ensureElement(){if(this.eventsManager=new Ye,this.template=G(this.template,this),this.el){if(this.el=G(this.el,this),!this.el.parentNode){const t=`Hydration failed in ${this.constructor.name}#${this.uid}`;throw new Error(t)}this.toString(),this.hydrate(this.el.parentNode)}}isContainer(){return this.template.elements.length===0&&this.template.interpolations.length===1}subscribe(t,s="change",r=this.onChange){return t.on&&this.listenTo(t,s,r),this}hydrate(t){return["model","state","props"].forEach(s=>{this[s]&&this.subscribe(this[s])}),this.isContainer()?(this.children[0].hydrate(t),this.el=this.children[0].el):(this.template.elements.forEach((s,r)=>{r===0?(s.hydrate(t),this.el=s.ref):s.hydrate(this.el)}),this.template.interpolations.forEach(s=>s.hydrate(this.el)),this.children.forEach(s=>s.hydrate(this.el))),this.delegateEvents(),this.onHydrate.call(this),this}recycle(t){if(this.onBeforeRecycle.call(this),t){const s=ge(t,m.MARKER_RECYCLED(this.uid),je);tt(s,this.el)}return this}updateProps(t){return this.props.set(t),this.onRecycle.call(this),this}getRecycledMarker(){return`<!--${m.MARKER_RECYCLED(this.uid)}-->`}partial(t,...s){const r=fe(We(me(Ce(t,s).trim(),s),s),s).map(a=>X(a,this,"partial"));return new ue(r)}renderTemplatePart(t,s,r){const a=X(t,this,"template part");if(typeof a>"u"||a===null||a===!1||a===!0)return"";if(a instanceof xe)return`${a}`;if(a instanceof m)return`${s(a,r)}`;if(a instanceof ue){if(a.items.length===1)return this.renderTemplatePart(a.items[0],s,r);r.push();const n=a.items.map(o=>(r.increment(),this.renderTemplatePart(o,s,r))).join("");return r.pop(),n}if(Array.isArray(a)){r.pause();const n=Ne(a).map(o=>this.renderTemplatePart(o,s,r)).join("");return r.resume(),n}if(a instanceof we){const n=a.tracker;n.reset();const o=this.isContainer()?"":`<!--${a.getStart()}-->`,i=this.isContainer()?"":`<!--${a.getEnd()}-->`;return`${o}${this.renderTemplatePart(a.expression,s,n)}${i}`}return`${m.sanitize(a)}`}toString(){this.destroyChildren(),this.eventsManager.reset();const t=(s,r)=>(r.track(s),this.addChild(s));return this.template.parts.map(s=>this.renderTemplatePart(s,t)).join("")}render(){if(this.destroyed)return this;if(!this.el){const r=le(this);return this.hydrate(r),this}this.onBeforeUpdate.call(this),this.eventsManager.reset();const t=this.children;this.children=[];const s=[];return this.template.interpolations.forEach(r=>{const a=r.tracker;a.reset();const n=[],o=[],i=u=>{let p=u,$=null;return u.key?$=t.find(L=>L.key===u.key):$=a.findRecyclable(u),$?(p=$.getRecycledMarker(),o.push([$,u]),a.track($)):(n.push(u),a.track(u)),p},d=this.renderTemplatePart(r.expression,i,a),h=([u,p],$)=>{s.push([u,p.props.toJSON()]),this.addChild(u).recycle($),p.destroy()};if(a.hasSingleComponent()){h(o[0],null);return}const j=le(d),l=u=>()=>{o.forEach(p=>h(p,u)),n.forEach(p=>this.addChild(p).hydrate(u))};this.isContainer()?r.updateElement(this.el,j,l(this.el.parentNode)):r.update(j,l(this.el))}),t.forEach(r=>{this.children.indexOf(r)<0&&r.destroy()}),s.forEach(([r,a])=>{r.updateProps(a)}),this.isContainer()?this.el=this.children[0].el:this.template.elements.forEach(r=>r.update()),this.eventsManager.hasPendingTypes()&&this.delegateEvents(),this.onUpdate.call(this),this}onCreate(){}onChange(){this.render()}onHydrate(){}onBeforeRecycle(){}onRecycle(){}onBeforeUpdate(){}onUpdate(){}onDestroy(){}static markAsSafeHTML(t){return new xe(t)}static extend(t){const s=this;class r extends s{}return Object.assign(r.prototype,typeof t=="function"?t(s.prototype):t),r}static mount(t,s,r){const a=new this(t);return s&&(r?a.toString():s.append(le(a)),a.hydrate(s)),a}static create(t,...s){typeof t=="function"&&(s=[t],t=["",""]);const r=null,a=[],n=[],o=fe(rt(at(me(Ce(t,s).trim(),s),s,a),s,n),s);return this.extend({source:r,template(){return{elements:a.map(i=>new Ge({getSelector:i.getSelector.bind(this),getAttributes:i.getAttributes.bind(this)})),interpolations:n.map(i=>new we({getStart:i.getStart.bind(this),getEnd:i.getEnd.bind(this),expression:i.expression,shouldSkipFind:je,shouldSkipSync:st})),parts:o}}})}}m.ATTRIBUTE_ELEMENT="data-rst-el";m.ATTRIBUTE_EVENT=(e,t)=>`data-rst-on-${e}-${t}`;m.DATASET_ELEMENT="rstEl";m.PLACEHOLDER=e=>`__RASTI_PLACEHOLDER_${e}__`;m.MARKER_RECYCLED=e=>`rst-r-${e}`;m.MARKER_START=e=>`rst-s-${e}`;m.MARKER_END=e=>`rst-e-${e}`;var b=m.create`<div></div>`;const ke=e=>e!==null&&typeof e=="object"&&!Array.isArray(e),ot=!1,it=e=>e.replace(/([A-Z])/g,t=>`-${t[0].toLowerCase()}`),lt=e=>e.reduce((t,s)=>(...r)=>t(s(...r))),ct=["prefix","generateUid","generateClassName","shouldAttachToDOM","attributes","renderers"];class E{constructor(t,s={}){this.styles=t,this.classes={},ct.forEach(a=>{a in s&&(this[a]=s[a])}),this.renderers||(this.renderers=[this.renderStyles,this.parseStyles]),this.prefix||(this.prefix=E.prefix),this.uid=this.generateUid();let r=0;Object.keys(t).forEach(a=>{a.match(E.classRegex)&&(this.classes[a]=this.generateClassName(a,++r))})}generateUid(){const t=JSON.stringify(this.styles);let s=2166136261;for(let r=0;r<t.length;r++)s^=t.charCodeAt(r),s=s*16777619>>>0;return s.toString(36)}generateClassName(t,s){return`${this.prefix[0]}-${this.uid}-${s}`}render(){const t=this.renderers.map(s=>(typeof s=="string"?this[s]:s).bind(this));return lt(t)(this.styles)}renderStyles(t,s=1){return Object.keys(t).reduce((r,a)=>{const n=t[a];let o="",i="",d="";if(ke(n)){if(Object.keys(n).length>0){const h=this.renderStyles(n,s+1);r.push(`${o}${a}${d}{${i}${h}${o}}${i}`)}}else typeof n<"u"&&n!==null&&r.push(`${o}${a}:${d}${n};${i}`);return r},[]).join("")}parseStyles(t,s,r,a){const n=d=>d in this.classes?`.${this.classes[d]}`:d,o=d=>a&&r?`${r} ${d}`:d.match(E.globalPrefixRegex)?`${r?`${r} `:""}${d.replace(E.globalPrefixRegex,"")}`:n(d).replace(E.referenceRegex,(h,j)=>n(j)).replace(E.nestedRegex,r);return Object.keys(t).reduce((d,h)=>{const j=t[h];if(ke(j))if(h.match(E.globalRegex))Object.assign(s||d,this.parseStyles(j,d,r,!0));else if((h.match(E.nestedRegex)||h.match(E.globalPrefixRegex))&&s){const l=o(h);s[l]={},Object.assign(s[l],this.parseStyles(j,s,l))}else{const l=o(h);d[l]={};const u=l.match(/@/)?[]:[d,l];Object.assign(d[l],this.parseStyles(j,...u))}else typeof j<"u"&&j!==null&&(d[h.match(/-/)?h:it(h)]=j);return d},{})}getAttributes(){const t=Object.assign({},this.attributes);return t[`data-${this.prefix}-uid`]=this.uid,t}toString(){const t=this.getAttributes(),s=Object.keys(t).map(a=>` ${a}="${t[a]}"`).join(""),r="";return`<style${s}>${r}${this.render()}</style>${r}`}shouldAttachToDOM(){return typeof document<"u"&&!document.querySelector(`style[data-${this.prefix}-uid="${this.uid}"]`)}attach(){if(E.registry.some(({uid:t})=>t===this.uid)||E.registry.push(this),this.shouldAttachToDOM()){this.el=document.createElement("style");const t=this.getAttributes();Object.keys(t).forEach(s=>{this.el.setAttribute(s,t[s])}),this.el.textContent=this.render(),document.head.appendChild(this.el)}return this}destroy(){const t=E.registry.indexOf(this);return t>-1&&E.registry.splice(t,1),this.el&&(this.el.parentNode&&this.el.parentNode.removeChild(this.el),this.el=null),this}static toString(){return E.registry.join("")}static toCSS(){return E.registry.map(t=>t.render()).join("")}static destroy(){E.registry.slice().forEach(t=>t.destroy())}}E.classRegex=/^\w+$/;E.globalRegex=/^@global$/;E.globalPrefixRegex=/^@global\s+/;E.referenceRegex=/\$(\w+)/g;E.nestedRegex=/&/g;E.prefix="fun";E.indent="    ";E.registry=[];E.debug=ot;const dt=(e,t)=>new E(e,t).attach();function O(e){return arguments.length>1?O(Array.from(arguments)):e?Array.isArray(e)?e.map(t=>O(t)).filter(Boolean).flat().join(" "):typeof e=="object"?O(Object.keys(e).filter(t=>!!e[t])):typeof e=="string"?e:"":""}const ht=(e,t)=>e.reduce((s,r,a)=>(Object.assign(s,t(r,a)),s),{}),ne=e=>`@media (min-width: ${{sm:640,md:768,lg:1024,xl:1280,xxl:1536}[e]}px)`,M=e=>ht(["primary","secondary","neutral","error","warning","success"],e),_=dt,{classes:pt}=_({root:{display:"inline-flex",alignItems:"center",justifyContent:"space-evenly",boxSizing:"border-box",cursor:"pointer",borderRadius:"var(--rui-borderRadius-sm)",padding:"var(--rui-spacing-sm)",maxHeight:"100%",fontFamily:"var(--rui-typography-button-fontFamily)",fontWeight:"var(--rui-typography-button-fontWeight)",fontSize:"var(--rui-typography-button-fontSize)",lineHeight:"var(--rui-typography-button-lineHeight)",textTransform:"var(--rui-typography-button-textTransform)",textDecoration:"var(--rui-typography-button-textDecoration)",transition:["background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)","color 0.15s cubic-bezier(0.4, 0, 0.2, 1)","border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)","box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)","transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)"].join(", "),"&:where([data-disabled])":{cursor:"not-allowed"},"&>svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"&>svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"&>svg:only-child":{padding:"0"},'&:where([data-size="sm"])':{fontSize:"var(--rui-fontSize-xs)"},'&:where([data-size="lg"])':{fontSize:"var(--rui-fontSize-xl)"},'&:where([data-shape="pill"])':{borderRadius:"var(--rui-borderRadius-full)"},'&:where([data-shape="circle"])':{borderRadius:"50%",aspectRatio:"1 / 1",maxHeight:"none",padding:"var(--rui-spacing-xs)",minWidth:"var(--rui-spacing-xxxxl)",minHeight:"var(--rui-spacing-xxxxl)",justifyContent:"center"},'&:where([data-shape="circle"]):where([data-size="sm"])':{padding:"var(--rui-spacing-xxs)",minWidth:"var(--rui-spacing-xxl)",minHeight:"var(--rui-spacing-xxl)"},'&:where([data-shape="circle"]):where([data-size="lg"])':{padding:"var(--rui-spacing-sm)",minWidth:"calc(var(--rui-spacing-xxxxl) + var(--rui-spacing-sm))",minHeight:"calc(var(--rui-spacing-xxxxl) + var(--rui-spacing-sm))"},...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-main)`,"&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,borderColor:`var(--rui-palette-${e}-dark)`},"&:where(:not([data-disabled])):active":{backgroundColor:`var(--rui-palette-${e}-dark)`,borderColor:`var(--rui-palette-${e}-dark)`,color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,boxShadow:"inset 0 1px 2px rgb(0 0 0 / 0.1)",transform:"translateY(0.5px)"},"&:where([data-disabled])":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,borderColor:`var(--rui-palette-${e}-light)`,boxShadow:"none",transform:"none","&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,borderColor:`var(--rui-palette-${e}-light)`},"&:active":{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.6)`,backgroundColor:`var(--rui-palette-${e}-light)`,borderColor:`var(--rui-palette-${e}-light)`,boxShadow:"none",transform:"none"}}}})),...M(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{border:`1px solid var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-foregroundMain)`,backgroundColor:"transparent","&:hover":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.14)`},"&:where(:not([data-disabled])):active":{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.12)`,transform:"translateY(0.5px)"},"&:where([data-disabled])":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,borderColor:`rgb(var(--rui-palette-${e}-rgb-light) / 0.6)`,transform:"none","&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLevel3) / 0.6)`,backgroundColor:"transparent"},"&:active":{transform:"none",backgroundColor:"transparent"}}}})),...M(e=>({[`&:where([data-variant="plain"][data-color="${e}"])`]:{border:"none",background:"transparent",color:`var(--rui-palette-${e}-foregroundMain)`,"&:hover":{color:`var(--rui-palette-${e}-foregroundDark)`,backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.05)`},"&:where(:not([data-disabled])):active":{color:`var(--rui-palette-${e}-foregroundDark)`,backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.07)`,transform:"translateY(0.5px)"},"&:where([data-disabled])":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`,transform:"none","&:hover":{color:`rgb(var(--rui-palette-${e}-rgb-foregroundLight) / 0.6)`,backgroundColor:"transparent"},"&:active":{backgroundColor:"transparent",transform:"none"}}}})),...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"]):where(:not([data-disabled])):focus-visible`]:{outline:`2px solid rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,outlineOffset:"2px"},[`&:where([data-variant="outlined"][data-color="${e}"]):where(:not([data-disabled])):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"},[`&:where([data-variant="plain"][data-color="${e}"]):where(:not([data-disabled])):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"}})),'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):not(:first-child)':{marginLeft:"-1px",...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{borderLeftColor:`var(--rui-palette-${e}-dark)`}}))},'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):not(:first-child):not(:last-child)':{borderRadius:"0"},'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):first-child':{borderTopRightRadius:"0",borderBottomRightRadius:"0"},'&:where([data-group]):where(:not([data-shape="circle"])):where(:not([data-shape="pill"])):last-child':{borderTopLeftRadius:"0",borderBottomLeftRadius:"0"},"&:where([data-current])":{fontWeight:"var(--rui-fontWeight-xl)"},...M(e=>({[`&:where([data-variant="outlined"][data-color="${e}"][data-current])`]:{border:`1px solid var(--rui-palette-${e}-main)`,backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.05)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="outlined"][data-color="${e}"][data-current]):hover`]:{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.08)`,border:`1px solid var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="plain"][data-color="${e}"][data-current])`]:{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.03)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="plain"][data-color="${e}"][data-current]):hover`]:{backgroundColor:`rgb(var(--rui-palette-${e}-rgb-main) / 0.05)`,color:`var(--rui-palette-${e}-foregroundDark)`},[`&:where([data-variant="solid"][data-color="${e}"][data-current])`]:{color:`rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.98)`,backgroundColor:`var(--rui-palette-${e}-dark)`,border:`1px solid var(--rui-palette-${e}-dark)`,boxShadow:"none"},[`&:where([data-variant="solid"][data-color="${e}"][data-current]):hover`]:{color:`rgb(var(--rui-palette-${e}-rgb-contrastDark) / 0.95)`,backgroundColor:`var(--rui-palette-${e}-dark)`,borderColor:`var(--rui-palette-${e}-dark)`}}))}}),A=b.create`
    <${({props:e})=>e.href?"a":e.type?"input":"button"}
        class="${({props:e})=>O([pt.root,e.className])}"
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
        `}});var ut=b.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
    </svg>
`;const gt=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(", "),Ee=e=>e?Array.from(e.querySelectorAll(gt)).filter(t=>{if(!e.contains(t))return!1;const s=window.getComputedStyle(t);return!(s.display==="none"||s.visibility==="hidden")}):[],{classes:J}=_({root:{position:"fixed",top:0,right:0,bottom:0,left:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgb(var(--rui-palette-neutral-rgb-level3) / 0.2)",backdropFilter:"blur(5px)",zIndex:"var(--rui-zIndex-dialogBackdrop, 1500)",padding:"var(--rui-spacing-md)","&:where([data-top])":{alignItems:"flex-start"},"&:where([data-bottom])":{alignItems:"flex-end"},"&:where([data-left])":{justifyContent:"flex-start"},"&:where([data-right])":{justifyContent:"flex-end"}},dialog:{position:"relative",display:"flex",flexDirection:"column",maxHeight:"calc(var(--rui-viewport-height) * 0.9)",maxWidth:"calc(var(--rui-viewport-width) * 0.9)",width:"auto",minWidth:"250px",padding:"var(--rui-spacing-sm)",borderRadius:"var(--rui-borderRadius-md)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",fontFamily:"var(--rui-fontFamily-body)",...M(e=>({[`&:where([data-color="${e}"])`]:{color:`var(--rui-palette-${e}-foregroundMain)`}})),...M(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{border:`1px solid rgb(var(--rui-palette-${e}-rgb-level1) / 0.4)`}})),...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`}})),'&:where([data-shadow="xs"])':{boxShadow:"var(--rui-shadow-xs)"},'&:where([data-shadow="sm"])':{boxShadow:"var(--rui-shadow-sm)"},'&:where([data-shadow="md"])':{boxShadow:"var(--rui-shadow-md)"},'&:where([data-shadow="lg"])':{boxShadow:"var(--rui-shadow-lg)"},'&:where([data-shadow="xl"])':{boxShadow:"var(--rui-shadow-xl)"},"&:focus-visible":{outline:"2px solid rgb(var(--rui-palette-neutral-rgb-level2) / 0.75)",outlineOffset:"2px"}},header:{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",minHeight:"var(--rui-spacing-xxxl)","& :where(button)":{position:"absolute",top:0,right:0,margin:0,padding:0,borderRadius:"50%"}},title:{fontSize:"var(--rui-fontSize-md)",fontWeight:"var(--rui-fontWeight-md)",color:"var(--rui-palette-neutral-foregroundMain)",textAlign:"center",padding:0,margin:"var(--rui-spacing-xs)"},content:{flex:1,overflowY:"auto",overflowX:"hidden",padding:"var(--rui-spacing-md)",minHeight:0},footer:{display:"flex",justifyContent:"space-evenly",paddingTop:"var(--rui-spacing-md)",flexShrink:0}}),ft=b.create`
    <div class="${({props:e})=>O([J.header,e.className])}" data-slot="header">
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
                    <${ut} />
                </${A}>`:null}
        `}}),mt=b.create`
    <div class="${({props:e})=>O([J.content,e.className])}" data-slot="content">
        ${({props:e})=>e.renderChildren()}
    </div>
`,vt=b.create`
    <div class="${({props:e})=>O([J.footer,e.className])}" data-slot="footer">
        ${({props:e})=>e.renderChildren()}
    </div>
`,W=b.create`
    <div
        class="${({props:e})=>O([J.root,e.className])}"
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
`.extend({onCreate(){this.handleDocumentKeydown=e=>{if(e.key==="Escape"&&this.props.handleClose){this.props.handleClose();return}if(e.key!=="Tab"||!this.dialogEl||!this.dialogEl.contains(document.activeElement))return;const t=Ee(this.dialogEl);if(t.length===0){e.preventDefault();return}if(t.length===1){document.activeElement===t[0]&&e.preventDefault();return}const s=t[0],r=t[t.length-1];e.shiftKey?document.activeElement===s&&(e.preventDefault(),r.focus()):document.activeElement===r&&(e.preventDefault(),s.focus())},this.handleClickOutside=e=>{this.props.handleClose&&!this.el.contains(e.target)&&this.props.handleClose()}},onHydrate(){this.dialogEl=this.$('[role="dialog"]'),this._previousActiveElement=document.activeElement,this._panelTabindexSet=!1;const e=document.body.style.overflow;if(document.body.style.overflow="hidden",this._originalOverflow=e,document.addEventListener("keydown",this.handleDocumentKeydown),this.dialogEl){const t=Ee(this.dialogEl);t.length>0?t[0].focus():(this.dialogEl.setAttribute("tabindex","-1"),this._panelTabindexSet=!0,this.dialogEl.focus())}setTimeout(()=>{document.addEventListener("click",this.handleClickOutside)},0)},onDestroy(){if(this._panelTabindexSet&&this.dialogEl&&this.dialogEl.removeAttribute("tabindex"),this._originalOverflow!==void 0&&(document.body.style.overflow=this._originalOverflow),document.removeEventListener("keydown",this.handleDocumentKeydown),document.removeEventListener("click",this.handleClickOutside),this._previousActiveElement&&typeof this._previousActiveElement.focus=="function")try{this._previousActiveElement.focus()}catch{}}});W.Header=ft;W.Content=mt;W.Footer=vt;var P={},Te;function yt(){if(Te)return P;Te=1,Object.defineProperty(P,"__esModule",{value:!0}),P.PathError=P.TokenData=void 0,P.parse=h,P.compile=j,P.match=p,P.pathToRegexp=$,P.stringify=H;const e="/",t=c=>c,s=/^[$_\p{ID_Start}]$/u,r=/^[$\u200c\u200d\p{ID_Continue}]$/u,a=/^[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*$/u;function n(c){return c.replace(/[{}()\[\]+?!:*\\]/g,"\\$&")}function o(c){return c.replace(/[.+*?^${}()[\]|/\\]/g,"\\$&")}class i{constructor(g,y){this.tokens=g,this.originalPath=y}}P.TokenData=i;class d extends TypeError{constructor(g,y){let v=g;y&&(v+=`: ${y}`),v+="; visit https://git.new/pathToRegexpError for info",super(v),this.originalPath=y}}P.PathError=d;function h(c,g={}){const{encodePath:y=t}=g,v=[...c];let f=0;function k(x){const C=[];let w="";function R(){w&&(C.push({type:"text",value:y(w)}),w="")}for(;f<v.length;){const T=v[f++];if(T===x)return R(),C;if(T==="\\"){if(f===v.length)throw new d(`Unexpected end after \\ at index ${f}`,c);w+=v[f++];continue}if(T===":"||T==="*"){const F=T===":"?"param":"wildcard";let S="";if(s.test(v[f]))do S+=v[f++];while(r.test(v[f]));else if(v[f]==='"'){let N=f;for(;f<v.length;){if(v[++f]==='"'){f++,N=0;break}v[f]==="\\"&&f++,S+=v[f]}if(N)throw new d(`Unterminated quote at index ${N}`,c)}if(!S)throw new d(`Missing parameter name at index ${f}`,c);R(),C.push({type:F,name:S});continue}if(T==="{"){R(),C.push({type:"group",tokens:k("}")});continue}if(T==="}"||T==="("||T===")"||T==="["||T==="]"||T==="+"||T==="?"||T==="!")throw new d(`Unexpected ${T} at index ${f-1}`,c);w+=T}if(x)throw new d(`Unexpected end at index ${f}, expected ${x}`,c);return R(),C}return new i(k(""),c)}function j(c,g={}){const{encode:y=encodeURIComponent,delimiter:v=e}=g,f=typeof c=="object"?c:h(c,g),k=l(f.tokens,v,y);return function(C={}){const w=[],R=k(C,w);if(w.length)throw new TypeError(`Missing parameters: ${w.join(", ")}`);return R}}function l(c,g,y){const v=c.map(f=>u(f,g,y));return(f,k)=>{let x="";for(const C of v)x+=C(f,k);return x}}function u(c,g,y){if(c.type==="text")return()=>c.value;if(c.type==="group"){const f=l(c.tokens,g,y);return(k,x)=>{const C=x.length,w=f(k,x);return x.length===C?w:(x.length=C,"")}}const v=y||t;return c.type==="wildcard"&&y!==!1?(f,k)=>{const x=f[c.name];if(x==null)return k.push(c.name),"";if(!Array.isArray(x)||x.length===0)throw new TypeError(`Expected "${c.name}" to be a non-empty array`);let C="";for(let w=0;w<x.length;w++){if(typeof x[w]!="string")throw new TypeError(`Expected "${c.name}/${w}" to be a string`);w>0&&(C+=g),C+=v(x[w])}return C}:(f,k)=>{const x=f[c.name];if(x==null)return k.push(c.name),"";if(typeof x!="string")throw new TypeError(`Expected "${c.name}" to be a string`);return v(x)}}function p(c,g={}){const{decode:y=decodeURIComponent,delimiter:v=e}=g,{regexp:f,keys:k}=$(c,g),x=k.map(C=>y===!1?t:C.type==="param"?y:w=>w.split(v).map(y));return function(w){const R=f.exec(w);if(!R)return!1;const T=R[0],F=Object.create(null);for(let S=1;S<R.length;S++){if(R[S]===void 0)continue;const N=k[S-1],V=x[S-1];F[N.name]=V(R[S])}return{path:T,params:F}}}function $(c,g={}){const{delimiter:y=e,end:v=!0,sensitive:f=!1,trailing:k=!0}=g,x=[];let C="",w=0;function R(F){if(Array.isArray(F)){for(const N of F)R(N);return}const S=typeof F=="object"?F:h(F,g);L(S.tokens,0,[],N=>{if(w>=256)throw new d("Too many path combinations",S.originalPath);w>0&&(C+="|"),C+=q(N,y,x,S.originalPath),w++})}R(c);let T=`^(?:${C})`;return k&&(T+="(?:"+o(y)+"$)?"),T+=v?"$":"(?="+o(y)+"|$)",{regexp:new RegExp(T,f?"":"i"),keys:x}}function L(c,g,y,v){for(;g<c.length;){const f=c[g++];if(f.type==="group"){const k=y.length;L(f.tokens,0,y,x=>L(c,g,x,v)),y.length=k;continue}y.push(f)}v(y)}function q(c,g,y,v){let f="",k="",x="",C=0,w=0,R=0;function T(S,N){for(;S<c.length;){const V=c[S++];if(V.type===N)return!0;if(V.type==="text"&&V.value.includes(g))break}return!1}function F(S){let N="";for(;S<c.length;){const V=c[S++];if(V.type!=="text")break;N+=V.value}return N}for(;R<c.length;){const S=c[R++];if(S.type==="text"){f+=o(S.value),k+=S.value,C===2&&(x+=S.value),S.value.includes(g)&&(w=0);continue}if(S.type==="param"||S.type==="wildcard"){if(C&&!k)throw new d(`Missing text before "${S.name}" ${S.type}`,v);S.type==="param"?(f+=w&2?`(${D(g,k)}+)`:T(R,"wildcard")?`(${D(g,F(R))}+)`:w&1?`(${D(g,k)}+|${o(k)})`:`(${D(g,"")}+)`,w|=C=1):(f+=w&2?`(${D(k,"")}+)`:x?`(${D(x,"")}+|${D(g,"")}+)`:"([^]+)",x="",w|=C=2),y.push(S),k="";continue}throw new TypeError(`Unknown token type: ${S.type}`)}return f}function D(c,g){return g.length>c.length?D(g,c):(c===g&&(g=""),g.length>1?`(?:(?!${o(c)}|${o(g)})[^])`:c.length>1?`(?:(?!${o(c)})[^${o(g)}])`:`[^${o(c+g)}]`)}function K(c,g){let y="";for(;g<c.length;){const v=c[g++];if(v.type==="text"){y+=n(v.value);continue}if(v.type==="group"){y+="{"+K(v.tokens,0)+"}";continue}if(v.type==="param"){y+=":"+Y(v.name,c[g]);continue}if(v.type==="wildcard"){y+="*"+Y(v.name,c[g]);continue}throw new TypeError(`Unknown token type: ${v.type}`)}return y}function H(c){return K(c.tokens,0)}function Y(c,g){return!a.test(c)||g?.type==="text"&&r.test(g.value[0])?JSON.stringify(c):c}return P}var Le=yt();function bt(e,t={}){const{baseUrl:s=""}=t,r=l=>{const[u,p]=l.replace(s,"").split("?");return{pathname:u,query:p}},a=(l,u)=>Le.match(u,{decode:decodeURIComponent})(l),n=l=>{const{pathname:u,query:p}=r(l);for(const $ of e){const L=a(u,$.path);if(L){const q={path:$.path,params:j(L.params),query:Object.fromEntries(new URLSearchParams(p).entries()),test:D=>!!a(r(D).pathname,$.path)};return()=>$.action(q)}}return null},o=(l,u={})=>{const{addToHistory:p=!0,replaceHistory:$=!1}=u,L=n(l);L?(p&&typeof window<"u"&&window.history[$?"replaceState":"pushState"]({},"",l),L()):console.error("No route matched:",l)},i=(l,u={},p={})=>{const L=Le.compile(l,{encode:encodeURIComponent})(u),q=new URLSearchParams(p).toString();return`${s}${q?`${L}?${q}`:L}`},d=l=>{const u=p=>{if(p.defaultPrevented||p.button!==0||p.metaKey||p.ctrlKey||p.shiftKey||p.altKey)return;const $=p.target.closest("a[data-router]");if($&&$.href){p.preventDefault();const L=new URL($.href);window.scrollTo({top:0,behavior:"instant"}),o(L.pathname+L.search)}};return l.addEventListener("click",u),()=>{l.removeEventListener("click",u)}},h=()=>{const l=()=>{o(window.location.pathname+window.location.search,{addToHistory:!1})};return window.addEventListener("popstate",l),()=>{window.removeEventListener("popstate",l)}},j=l=>{const u={};for(const[p,$]of Object.entries(l))u[p]=String($).replace(/[<>]/g,"");return u};return{navigate:o,createUrl:i,delegateNavigation:d,bindHistory:h}}const xt=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),$t=["h1","h2","h3","h4","titleLg","titleMd","titleSm","bodyLg","bodyMd","bodySm","caption"],{classes:St}=_({root:{color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-md) 0",...Object.fromEntries($t.map(e=>[`&:where([data-level="${e}"])`,xt(e)]))}}),Ae=({props:e})=>{switch(e.level){case"h1":return"h1";case"h2":return"h2";case"h3":return"h3";case"h4":return"h4";case"titleLg":return"h2";case"titleMd":return"h2";case"titleSm":return"h2";case"caption":return"caption";default:return"p"}},B=b.create`
    <${Ae}
        class="${({props:e})=>O([St.root,e.className])}"
        data-level="${({props:e})=>e.level||"bodyMd"}"
    >
        ${({props:e})=>e.renderChildren&&e.renderChildren()}
    </${Ae}>
`;var wt=b.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
    </svg>
`;const{classes:de}=_({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",minHeight:"var(--rui-viewport-height)"},iconContainer:{display:"flex",justifyContent:"center",alignItems:"center",width:"140px",height:"140px",borderRadius:"50%",backgroundColor:"var(--rui-palette-neutral-main)",marginBottom:"var(--rui-spacing-md)"},icon:{width:"120px",height:"120px",fill:"var(--rui-palette-warning-main)"}}),jt=b.create`
    <div class="${de.root}">
        <div class="${de.iconContainer}">
            <${wt} className=${de.icon} />
        </div>
        <${B} level="h1">
            404
        </${B}>
        <${B} level="h3">
            Page Not Found
        </${B}>
        <${B} level="bodyMd">
            The page you are looking for does not exist.
        </${B}>
    </div>
`,{classes:Re}=_({"@global":{html:{scrollBehavior:"smooth"},body:{margin:0,backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)",fontFamily:"var(--rui-fontFamily-body)"},"a.anchor, h2":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-xs))"}},root:{},appBarMenuDialog:{},[ne("sm")]:{$appBarMenuDialog:{display:"none"}}}),Ct=e=>{const{title:t,AppBar:s,AppBarMenuContent:r,Cover:a,Description:n,Features:o,Readme:i,Api:d,Footer:h}=e;return b.create`
        <div class="${Re.root}">
            <${s} 
                location="${({state:l})=>l.location}"
                onMenuClick="${({state:l})=>()=>{l.menuOpen=!0}}"
            />

            ${({state:l,partial:u})=>l.menuOpen&&r?u`<${W}
                    className="${Re.appBarMenuDialog}"
                    handleClose=${()=>{l.menuOpen=!1}}
                    shadow="lg"
                >
                    <${W.Header}
                        handleClose=${()=>{l.menuOpen=!1}}
                        closeButton=${!0}
                    />
                    <${W.Content}
                        renderChildren=${()=>r.mount({handleOpen:p=>{l.menuOpen=p},location:l.location})}
                    />
                </${W}>`:null}

            ${({state:l,partial:u})=>l.location.params.notFound?u`<${jt} />`:l.location.test("/api/")?u`<${d} />`:u`
                        <${a} />
                        ${n?u`<${n} />`:null}
                        <${o} />
                        <${i} />
                    `}

            <${h} />
        </div>
    `.extend({onCreate(l={}){this.state=new ie({location:null,menuOpen:!1});const u=[{path:"/api/",action:p=>this.updateRoute(p)},{path:"/",action:p=>this.updateRoute(p)},{path:"*notFound",action:p=>this.updateRoute(p)}];this.router=bt(u),typeof window<"u"?(this.router.delegateNavigation(document.body),this.router.bindHistory(),this.router.navigate(l.url||window.location.pathname+window.location.search,{addToHistory:!1,replaceHistory:!0})):this.router.navigate(l.url,{addToHistory:!1})},updateRoute(l){this.state.location=l,typeof document<"u"&&(document.title=this.getTitle())},getTitle(){const l=this.state.location.params.notFound?" - Not Found":this.state.location.test("/api/")?" - API Documentation":this.state.location.test("/")?" - Home":"";return`${t}${l}`}})},{classes:Q}=_({section:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-sm)"},left:{flex:"0 0 auto",justifyContent:"flex-start"},center:{flex:"1 1 auto",justifyContent:"center"},right:{flex:"0 0 auto",justifyContent:"flex-end"}}),kt=b.create`
    <div class="${({props:e})=>O([Q.section,Q.left,e.className])}" data-slot="left">
        ${({props:e})=>e.renderChildren()}
    </div>
`,Et=b.create`
    <div class="${({props:e})=>O([Q.section,Q.center,e.className])}" data-slot="center">
        ${({props:e})=>e.renderChildren()}
    </div>
`,Tt=b.create`
    <div class="${({props:e})=>O([Q.section,Q.right,e.className])}" data-slot="right">
        ${({props:e})=>e.renderChildren()}
    </div>
`,{classes:Lt}=_({root:{position:"sticky",top:0,zIndex:"var(--rui-zIndex-appBar, 1000)",display:"flex",alignItems:"center",minHeight:"56px",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",gap:"var(--rui-spacing-md)",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundSoftLevel3) / 0.5)",transition:"background-color 0.2s ease, border-color 0.2s ease",backgroundColor:"var(--rui-palette-neutral-backgroundLevel1)",...M(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{borderBottomColor:`var(--rui-palette-${e}-foregroundSoftLevel3)`}})),...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,borderBottomColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`},[`&:where([data-variant="solid"][data-color="${e}"]) *`]:{color:`var(--rui-palette-${e}-contrastMain)`}}))}}),U=b.create`
    <header
        class="${({props:e})=>O([Lt.root,e.className])}"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
        aria-label="${({props:e})=>e.ariaLabel||null}"
    >
        ${({props:e})=>e.renderChildren()}
    </header>
`;U.Left=kt;U.Center=Et;U.Right=Tt;var At=b.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
    </svg>
`,Rt=b.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
    </svg>
`,_t=b.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
    </svg>
`;const{classes:ee}=_({root:{display:"flex",justifyContent:"right",alignItems:"center",height:"60px","& ul":{padding:0}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),Mt=b.create`
    <div class="${ee.root}">
        <ul>
            <li class="${ee.hiddenIfDark}">
                <${A}
                    variant="plain"
                    shape="circle"
                    onClick=${()=>document.documentElement.setAttribute("data-color-scheme","dark")}
                >
                    <${_t} className=${ee.icon} />
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
`,ve=b.create`
    <svg class="${({props:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
    </svg>
`,_e=b.create`
    <svg class="${({props:e})=>e.className}" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
        <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"></path>
    </svg>
`,{classes:z}=_({root:{boxSizing:"border-box",height:"var(--rui-app-appBarHeight)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",position:"fixed",top:0,left:0,right:0,zIndex:1e3},leftContent:{display:"flex",alignItems:"center"},rightContent:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-sm)"},navLinks:{display:"none","& ul":{display:"flex",justifyContent:"center",alignItems:"center",listStyle:"none",padding:0,margin:0,gap:"var(--rui-spacing-sm)","& li":{margin:0}}},menuButton:{display:"block"},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-neutral-main)","a:hover &":{fill:"var(--rui-palette-neutral-dark)"}},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"},logoInactive:{opacity:.5},menuContent:{"& nav":{maxWidth:"100%",display:"flex",justifyContent:"center",alignItems:"center","& ul":{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",listStyle:"none",padding:0,"& li":{margin:"var(--rui-spacing-md)"}}}},[ne("sm")]:{$navLinks:{display:"block"},$menuButton:{display:"none"}}}),Ot=e=>{const{logoAlt:t,playgroundUrl:s,githubUrl:r,npmUrl:a}=e,n=b.create`
        <div class="${z.menuContent}">
            <nav><ul>
                ${({props:i,partial:d})=>d`
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
                            renderLeftIcon=${()=>ve.mount({className:z.icon})}
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
                            renderLeftIcon=${()=>_e.mount({className:z.icon})}
                        />
                    </li>
                `}
            </ul></nav>
        </div>
    `;return{AppBar:b.create`
        <${U} className="${z.root}">
            <${U.Left}>
                <div class="${z.leftContent}">
                    <a href="/" class="${({props:i})=>i.location.params.notFound||!i.location.test("/")?z.logoInactive:""}" aria-current="${({props:i})=>i.location.test("/")?"page":null}" data-router>
                        <img height="24" class="${z.hiddenIfLight}" alt="${t}" src="/logo-dark.svg">
                        <img height="24" class="${z.hiddenIfDark}" alt="${t}" src="/logo.svg">
                    </a>
                </div>
            </${U.Left}>
            <${U.Center}>
            </${U.Center}>
            <${U.Right}>
                <div class="${z.rightContent}">
                    <nav class="${z.navLinks}">
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
                                    renderChildren=${()=>ve.mount({className:z.icon})}
                                />
                            </li>
                            <li>
                                <${A}
                                    href="${a}"
                                    target="_blank"
                                    variant="plain"
                                    shape="circle"
                                    renderChildren=${()=>_e.mount({className:z.icon})}
                                />
                            </li>
                        </ul>
                    </nav>
                    <${Mt} />
                    <div class="${z.menuButton}">
                        <${A}
                            variant="plain"
                            size="lg"
                            onClick="${({props:i})=>i.onMenuClick}"
                        >
                            <${At} className=${z.icon} />
                        </${A}>
                    </div>
                </div>
            </${U.Right}>
        </${U}>
    `,AppBarMenuContent:n}},{classes:he}=_({root:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"var(--rui-spacing-xl) 0 var(--rui-spacing-xxxxl) 0",borderTop:"1px solid rgb(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)","@global":{a:{color:"var(--rui-palette-neutral-main)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-neutral-main)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-neutral-dark)"}}}},text:{color:"var(--rui-palette-neutral-foregroundLevel3)"}}),Ht=e=>{const{licenseUrl:t,startYear:s}=e,r=()=>{const n=new Date().getFullYear();return n===s?n:`${s}-${n}`};return b.create`
        <footer class="${he.root}">
            <${B} level="titleMd" className="${he.text}">
                Released under the <a href="${t}" target="_blank">MIT License</a>
            </${B}>
            <${B} level="titleSm" className="${he.text}">
                Copyright © ${r} by <a href="https://github.com/8tentaculos/" target="_blank">8tentaculos</a>
            </${B}>
        </footer>
    `},{classes:te}=_({root:{display:"flex",justifyContent:"center",alignItems:"center",height:"var(--rui-viewport-height)",flexDirection:"column",backgroundColor:"var(--rui-palette-neutral-backgroundLevel3)",boxShadow:"var(--rui-shadow-xs)",padding:"0 var(--rui-spacing-xl)",overflow:"hidden","@global":{h1:{textAlign:"center",margin:"var(--rui-app-appBarHeight) 0 0 0"},h2:{color:"var(--rui-palette-neutral-foregroundLevel2)",marginTop:0,marginBottom:"var(--rui-spacing-sm)"},h4:{color:"var(--rui-palette-neutral-foregroundLevel3)",marginBottom:"var(--rui-spacing-md)"},"h1 img":{width:"90%"},pre:{maxWidth:"100%"},code:{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"}}},buttons:{"& a":{margin:"var(--rui-spacing-md) var(--rui-spacing-xs)"},display:"flex",justifyContent:"center"},[ne("sm")]:{"$root h1":{margin:"var(--rui-app-appBarHeight) 0 0 0"},"$root h2":{marginBottom:"var(--rui-spacing-xl)"},"$root h4":{marginBottom:"var(--rui-spacing-xxl)"},"$root h1 img":{width:"75%"},"$buttons a":{margin:"var(--rui-spacing-xxxl) var(--rui-spacing-lg)"}},icon:{width:"24px",height:"24px",fill:"var(--rui-palette-secondary-main)"},hiddenIfLight:{display:"var(--rui-app-hiddenIfLight)"},hiddenIfDark:{display:"var(--rui-app-hiddenIfDark)"}}),Dt=e=>{const{logoAlt:t,tagline:s,renderSubtitle:r,CoverCodeExample:a,githubUrl:n}=e;return b.create`
        <section class="${te.root}">
            <h1>
                <img class="${te.hiddenIfLight}" alt="${t}" src="/logo-dark.svg">
                <img class="${te.hiddenIfDark}" alt="${t}" src="/logo.svg">
            </h1>

            <${B} level="h2">${s}</${B}>

            ${({partial:i})=>r?i`<${B} level="h4">${r}</${B}>`:null}

            <${a} />

            <div class="${te.buttons}">
                <${A} 
                    label="Get Started"
                    color="primary"
                    variant="outlined"
                    href="#gettingstarted"
                />
                <${A} 
                    label="GitHub"
                    color="secondary"
                    variant="outlined"
                    href="${n}"
                    target="_blank"
                    renderLeftIcon=${()=>ve.mount({className:te.icon})}
                />
            </div>
        </section>
    `},Nt=b.create`
    <pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
    button : \{
        backgroundColor : <span class="hljs-string">&#x27;blue&#x27;</span>,
        color : <span class="hljs-string">&#x27;white&#x27;</span>,
        padding : <span class="hljs-string">&#x27;10px&#x27;</span>,
        borderRadius : <span class="hljs-string">&#x27;5px&#x27;</span>
    \}
\});

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Button</span> = (<span class="hljs-params"></span>) =&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">\{classes.button\}</span>&gt;</span>Click me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>;</code></pre>
`,zt=Dt({logoAlt:"CSSFUN",tagline:"Near-zero runtime CSS-in-JS library",renderSubtitle:e=>e.partial`Write modular <strong>CSS</strong> within your <strong>JavaScript</strong> code with built-in <strong>themes</strong> and <strong>SSR</strong> support.`,CoverCodeExample:Nt,githubUrl:"https://github.com/8tentaculos/cssfun"}),{classes:It}=_({root:{borderRadius:"var(--rui-borderRadius-md)",padding:"var(--rui-spacing-md)",backgroundColor:"var(--rui-palette-neutral-backgroundLevel2)",fontFamily:"var(--rui-fontFamily-body)",fontSize:"var(--rui-fontSize-bodyMd)",...M(e=>({[`&:where([data-color="${e}"])`]:{color:`var(--rui-palette-${e}-foregroundMain)`}})),...M(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{border:`1px solid rgb(var(--rui-palette-${e}-rgb-level1) / 0.4)`}})),...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,color:`var(--rui-palette-${e}-contrastMain)`}})),'&:where([data-shadow="xs"])':{boxShadow:"var(--rui-shadow-xs)"},'&:where([data-shadow="sm"])':{boxShadow:"var(--rui-shadow-sm)"},'&:where([data-shadow="md"])':{boxShadow:"var(--rui-shadow-md)"},'&:where([data-shadow="lg"])':{boxShadow:"var(--rui-shadow-lg)"},'&:where([data-shadow="xl"])':{boxShadow:"var(--rui-shadow-xl)"},...M(e=>({[`&:where([data-interactive="true"][data-variant="solid"][data-color="${e}"]):focus-visible`]:{outline:`2px solid rgb(var(--rui-palette-${e}-rgb-contrastMain) / 0.95)`,outlineOffset:"2px"},[`&:where([data-interactive="true"][data-variant="outlined"][data-color="${e}"]):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"},[`&:where([data-interactive="true"][data-variant="plain"][data-color="${e}"]):focus-visible`]:{outline:`2px solid var(--rui-palette-${e}-main)`,outlineOffset:"2px"}}))}}),I=b.create`
    <${({props:e})=>e.tag||"div"}
        class="${({props:e})=>O([It.root,e.className])}"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
        data-shadow="${({props:e})=>e.shadow||!1}"
        data-interactive="${({props:e})=>e.interactive||!1}"
        tabindex="${({props:e})=>{if(!e.interactive)return null;const t=String(e.tag||"div").toLowerCase();return["button","a","input","select","textarea"].includes(t)?null:"0"}}"
        onClick="${({props:e})=>e.onClick}"
    >
        ${({props:e})=>e.renderChildren&&e.renderChildren()}
    </${({props:e})=>e.tag||"div"}>
`,Me=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Bt}=_({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Me("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Me("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},display:"grid",gridTemplateColumns:"auto",gap:"var(--rui-spacing-xl)","& section":{"& h5":{margin:"var(--rui-spacing-xs) 0",padding:"0"}}},[ne("sm")]:{$root:{gridTemplateColumns:"repeat(2, 1fr)"}}}),Ft=e=>[e.className||null,Bt.root].join(" "),Pt=b.create`
            <section class="${({props:e})=>Ft(e)}"><${I} tag="section" shadow="xs"><h5 id="nearzeroruntime">Near-Zero Runtime ⚡</h5>
<p>Styles are generated when the module is initialized, rather than during component rendering. This eliminates runtime 
  style generation, improving performance and reducing complexity.</p></${I}><${I} tag="section" shadow="xs"><h5 id="componentscopedstyles">Component-Scoped Styles ✨</h5>
<p><strong>CSSFUN</strong> scopes styles to the component, preventing style leakage and promoting modularity. It keeps both logic 
  and styling in the same file for easier management.</p></${I}><${I} tag="section" shadow="xs"><h5 id="frameworkagnosticandlightweight">Framework-Agnostic and Lightweight 🌐</h5>
<p><strong>CSSFUN</strong> is compatible with any environment. At just <strong>1.7KB</strong>, it adds minimal overhead to your projects.</p></${I}><${I} tag="section" shadow="xs"><h5 id="nobuildtoolsrequired">No Build Tools Required 🛠️</h5>
<p><strong>CSSFUN</strong> can be used directly in the browser, eliminating the need for complex build tools or configurations.</p></${I}><${I} tag="section" shadow="xs"><h5 id="serversiderenderingssrsupport">Server-Side Rendering (SSR) Support 🚀</h5>
<p><strong>CSSFUN</strong> supports <a href="#serversiderenderingssr">server-side rendering</a> out of the box, optimizing initial load 
  times without duplicating styles.</p></${I}><${I} tag="section" shadow="xs"><h5 id="builtinthememanagement">Built-in Theme Management 🎨</h5>
<p>With built-in <a href="#themes">theme support</a>, <strong>CSSFUN</strong> uses <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">CSS variables</a> 
  to manage light and dark color schemes. Themes update automatically based on user preferences, no re-renders needed.</p></${I}></section>
        `,Oe=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:Wt}=_({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Oe("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...Oe("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}}}}),Ut=e=>[e.className||null,Wt.root].join(" "),qt=b.create`
            <section class="${({props:e})=>Ut(e)}"><h2 id="gettingstarted">Getting Started</h2>
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
<h2 id="classnamegeneration">Class Name Generation</h2>
<p>When you call <code>css()</code>, <strong>CSSFUN</strong> automatically generates unique, scoped class names for each top-level selector in your styles object. These class names are created <strong>at module initialization</strong>, ensuring near-zero runtime overhead.</p>
<h3 id="howclassesaregenerated">How Classes Are Generated</h3>
<ol>
<li><p><strong>When</strong>: Classes are generated immediately when <code>css()</code> is called, during the StyleSheet instance creation.</p></li>
<li><p><strong>Which selectors</strong>: Only top-level selectors that match valid class name patterns (alphanumeric characters, no special characters) get generated classes.</p></li>
<li><p><strong>Format</strong>: The format differs between development and production modes:</p>
<p><strong>Development Mode</strong> (readable, for debugging):</p></li>
</ol>
<pre><code>   \{prefix\}-\{uid\}-\{className\}
</code></pre>
<p>Example: <code>.fun-9qkk9s-button</code> (prefix <code>fun</code> + unique ID <code>9qkk9s</code> + original class name <code>button</code>)</p>
<p><strong>Production Mode</strong> (optimized, smaller bundle):</p>
<pre><code>   \{prefix[0]\}-\{uid\}-\{index\}
</code></pre>
<p>Example: <code>.f-9qkk9s-1</code> (first letter of prefix <code>f</code> + unique ID <code>9qkk9s</code> + sequential index <code>1</code>)</p>
<ol start="4">
<li><strong>Access</strong>: Generated class names are available via the <code>classes</code> object returned by <code>css()</code>:</li>
</ol>
<pre><code class="javascript language-javascript"><span class="hljs-keyword">const</span> \{ classes \} = <span class="hljs-title function_">css</span>(\{
       <span class="hljs-attr">button</span>: \{ <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;red&#x27;</span> \},
       <span class="hljs-attr">link</span>: \{ <span class="hljs-attr">color</span>: <span class="hljs-string">&#x27;blue&#x27;</span> \}
   \});
   <span class="hljs-comment">// classes.button → &quot;fun-9qkk9s-button&quot; (dev) or &quot;f-9qkk9s-1&quot; (prod)</span>
   <span class="hljs-comment">// classes.link → &quot;fun-9qkk9s-link&quot; (dev) or &quot;f-9qkk9s-2&quot; (prod)</span></code></pre>
<blockquote>
  <p><strong>Note</strong>: All examples in this documentation show class names in <strong>development mode</strong> for clarity.<br />
  In <strong>production</strong>, class names are automatically optimized for smaller bundle size.<br />
  You can customize class name generation via <a href="/docs/api.md#new-stylesheetstyles-options"><code>options.generateClassName</code></a> or by <a href="/docs/api.md#stylesheet__generateclassname">extending the class</a>.</p>
</blockquote>
<h2 id="renderers">Renderers</h2>
<p>Renderers are functions that transform style objects into CSS strings. They are applied in sequence, with each renderer receiving the output of the previous one.</p>
<p><strong>CSSFUN</strong> uses two built-in renderers by default:</p>
<ol>
<li><strong><code>parseStyles</code></strong>: Transforms the style object (expands nested selectors, replaces class references, converts camelCase to dashed-case, handles global styles)</li>
<li><strong><code>renderStyles</code></strong>: Converts the processed object into a CSS string</li>
</ol>
<p>The final renderer in the chain outputs the CSS string that gets injected into the DOM.</p>
<p>These are the built-in renderers transformations:</p>
<h4 id="camelizedkeyswillbetransformedtodashedkeys">Camelized keys will be transformed to dashed keys</h4>
<pre><code class="javascript language-javascript"><span class="hljs-title function_">css</span>(\{
    root : \{
        backgroundColor : <span class="hljs-string">&#x27;black&#x27;</span>,
        fontSize : <span class="hljs-string">&#x27;16px&#x27;</span>,
        paddingTop : <span class="hljs-string">&#x27;10px&#x27;</span>
    \}
\}).<span class="hljs-title function_">toString</span>();</code></pre>
<h5 id="rendersto">Renders to:</h5>
<pre><code class="html language-html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">data-fun-uid</span>=<span class="hljs-string">&quot;uwitok&quot;</span>&gt;</span>
    .fun-uwitok-root \{
        background-color: black;
        font-size: 16px;
        padding-top: 10px;
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
resulting CSS string. The renderers are applied in sequence: each renderer receives the output 
of the previous one.</p>
<p><strong>Example flow:</strong></p>
<pre><code>Input styles object
    ↓
[parseStyles] → Transforms object (expands nested, replaces references, converts camelCase)
    ↓
[renderStyles] → Converts object to CSS string
    ↓
Output CSS string
</code></pre>
<h3 id="customrenderers">Custom Renderers</h3>
<p>You can customize the renderers by setting the <code>renderers</code> array on the <a href="/docs/api.md#stylesheet"><code>StyleSheet</code></a> instance. 
If passed via <a href="/docs/api.md#new-stylesheetstyles-options"><code>options.renderers</code></a>, they will be automatically added to the instance.  </p>
<p>Elements in the <code>renderers</code> array can be either functions or strings that reference methods of the <a href="/docs/api.md#stylesheet"><code>StyleSheet</code></a> instance. These 
methods will be bound to the instance before they are invoked.</p>
<p>By default, <a href="/docs/api.md#stylesheet"><code>StyleSheet</code></a> instances are rendered using the built-in renderers: <code>[this.renderStyles, this.parseStyles]</code>.</p>
<p><strong>Note:</strong> The order matters! Renderers are composed, so they execute in reverse order. With <code>[renderStyles, parseStyles]</code>, <code>parseStyles</code> executes first (transforms the object), then <code>renderStyles</code> (converts to CSS string).</p>
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
<h2 id="workingwithllms">Working with LLMs</h2>
<p>For those working with LLMs, there is an <a target="_blank" target="_blank" href="https://github.com/8tentaculos/cssfun/blob/master/docs/AGENTS.md">AI Agents reference guide</a> that provides API patterns, style syntax, theme management, and best practices, optimized for LLM context. You can share this guide with AI assistants to help them understand <strong>CSSFUN</strong>'s architecture and styling APIs.</p>
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
        `;var Kt=b.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/>
    </svg>
`;const{classes:pe}=_({header:{display:"flex",alignItems:"center",gap:"var(--rui-spacing-xs)",marginBottom:"var(--rui-spacing-sm)",flexShrink:0,...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{"& button":{opacity:1,color:`var(--rui-palette-${e}-contrastMain) !important`}}}))},collapseButton:{width:"32px",height:"32px",padding:0,opacity:.4,transition:"transform 0.2s ease, opacity 0.2s ease"},collapseButtonRotated:{transform:"rotate(180deg)"}}),Yt=b.create`
    <div
        class="${()=>pe.header}"
        data-slot="header"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
    >
        <${A}
            variant="outlined"
            color="${({props:e})=>e.color||"neutral"}"
            size="sm"
            title="${({props:e})=>e.collapseButtonTitle||"Toggle sidebar"}"
            className="${({props:e})=>O([pe.collapseButton,e.collapsed&&pe.collapseButtonRotated])}"
            onClick="${({props:e})=>e.handleToggle}"
        >
            <${Kt} />
        </${A}>
    </div>
`,{classes:Ue}=_({root:{position:"sticky",top:0,alignSelf:"flex-start",height:"100%",maxHeight:"var(--rui-viewport-height)",display:"flex",flexDirection:"column",maxWidth:"280px",borderRight:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundSoftLevel3) / 0.5)",transition:"max-width 0.2s ease, padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",padding:"var(--rui-spacing-lg)","&:where([data-collapsed])":{maxWidth:"32px",overflow:"hidden"},...M(e=>({[`&:where([data-variant="outlined"][data-color="${e}"])`]:{borderRightColor:`var(--rui-palette-${e}-foregroundSoftLevel3)`}})),...M(e=>({[`&:where([data-variant="solid"][data-color="${e}"])`]:{backgroundColor:`var(--rui-palette-${e}-main)`,borderRightColor:`var(--rui-palette-${e}-main)`},[`&:where([data-variant="solid"][data-color="${e}"]) > [data-slot="content"]`]:{color:`var(--rui-palette-${e}-contrastMain)`},[`&:where([data-variant="solid"][data-color="${e}"]) > [data-slot="content"] button`]:{color:`var(--rui-palette-${e}-contrastMain)`},[`&:where([data-variant="solid"][data-color="${e}"]) > [data-slot="content"] h3`]:{color:`var(--rui-palette-${e}-contrastMain)`}}))},content:{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden",opacity:1,transition:"opacity 0.2s ease, color 0.2s ease","&:where([data-collapsed])":{opacity:0,visibility:"hidden"}}}),Vt=b.create`
    <div
        class="${({props:e})=>O([Ue.content,e.className])}"
        data-slot="content"
        data-collapsed="${({props:e})=>e.collapsed||!1}"
    >
        ${({props:e})=>e.renderChildren()}
    </div>
`,Z=b.create`
    <aside
        class="${({props:e})=>O([Ue.root,e.className])}"
        data-variant="${({props:e})=>e.variant||"outlined"}"
        data-color="${({props:e})=>e.color||"neutral"}"
        data-collapsed="${({props:e})=>e.collapsed||!1}"
        aria-expanded="${({props:e})=>!e.collapsed}"
        aria-label="${({props:e})=>e.ariaLabel||null}"
    >
        ${({props:e})=>e.renderChildren()}
    </aside>
`;Z.Header=Yt;Z.Content=Vt;var Gt=b.create`
    <svg class="${({props:e})=>e.className||""}" width="${({props:e})=>e.width||"24"}" height="${({props:e})=>e.height||"24"}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
    </svg>
`;const{classes:se}=_({root:{display:"flex",flexDirection:"column",marginTop:"var(--rui-app-appBarHeight)",minHeight:"calc(var(--rui-viewport-height) - var(--rui-app-appBarHeight))","@global a.anchor":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) * 2 + var(--rui-spacing-xs) * 6)"},"@global h2":{scrollMarginTop:"calc(var(--rui-app-appBarHeight) * 2 + var(--rui-spacing-xs) * 6)"}},aside:{display:"none",top:"var(--rui-app-appBarHeight)",maxHeight:"calc(var(--rui-viewport-height) - var(--rui-app-appBarHeight))","@global > *:last-child":{paddingBottom:"var(--rui-spacing-md)"}},content:{flex:1,minWidth:0,width:"100%",paddingTop:"var(--rui-app-appBarHeight)"},secondaryHeader:{position:"fixed",top:"calc(var(--rui-app-appBarHeight) + var(--rui-spacing-lg))",left:"var(--rui-spacing-md)",right:"var(--rui-spacing-md)",display:"flex",alignItems:"center",justifyContent:"flex-start",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)"},apiIndexDialog:{},[ne("sm")]:{$root:{flexDirection:"row","@global a.anchor":{scrollMarginTop:"var(--rui-app-appBarHeight)"},"@global h2":{scrollMarginTop:"var(--rui-app-appBarHeight)"}},$aside:{display:"flex"},$content:{flex:1,minWidth:0,paddingTop:0,paddingLeft:"var(--rui-spacing-xl)",paddingRight:"var(--rui-spacing-xl)"},$secondaryHeader:{display:"none"},$apiIndexDialog:{display:"none"}}}),Zt=e=>{const{ApiIndex:t,Api:s}=e;return b.create`
        <div class="${se.root}">
            <${Z} 
                className="${se.aside}"
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
            <${I}
                className="${se.secondaryHeader}"
                color="neutral"
            >
                <${A}
                    label="API Index"
                    variant="plain"
                    color="neutral"
                    renderLeftIcon=${()=>Gt.mount()}
                    onClick="${({state:a})=>()=>{a.dialogOpen=!0}}"
                />
            </${I}>
            ${({state:a,partial:n})=>a.dialogOpen?n`<${W}
                    className="${se.apiIndexDialog}"
                    handleClose="${({state:o})=>()=>{o.dialogOpen=!1}}"
                    shadow="lg"
                >
                    <${W.Header}
                        title="API Index"
                        handleClose="${({state:o})=>()=>{o.dialogOpen=!1}}"
                        closeButton=${!0}
                    />
                    <${W.Content}>
                        <${t} events="${({state:o})=>({"click a":()=>{o.dialogOpen=!1}})}" />
                    </${W.Content}>
                </${W}>`:null}
            <div class="${se.content}">
                <${s} />
            </div>
        </div>
    `.extend({onCreate(){this.state=new ie({collapsed:!1,dialogOpen:!1})}})},{classes:Xt}=_({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-sm)",lineHeight:"var(--rui-lineHeight-sm)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-sm) 0",padding:"0",borderBottom:"none"},ul:{listStyle:"none",padding:"0",margin:"0"},li:{margin:"var(--rui-spacing-xs) 0",padding:"0"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},code:{fontSize:"var(--rui-fontSize-sm)"}},"& > ul > li":{fontSize:"var(--rui-fontSize-md)",fontWeight:"var(--rui-fontWeight-md)"},"& ul ul":{paddingLeft:"var(--rui-spacing-lg)",marginTop:"var(--rui-spacing-xs)",fontSize:"var(--rui-fontSize-sm)",fontWeight:"var(--rui-fontWeight-sm)"}}}),Jt=e=>[e.className||null,Xt.root].join(" "),Qt=b.create`
            <nav class="${({props:e})=>Jt(e)}"><h2 id="classes">Classes</h2>
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
        `,He=e=>({fontFamily:`var(--rui-typography-${e}-fontFamily)`,fontWeight:`var(--rui-typography-${e}-fontWeight)`,fontSize:`var(--rui-typography-${e}-fontSize)`,lineHeight:`var(--rui-typography-${e}-lineHeight)`}),{classes:es}=_({root:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",padding:"var(--rui-spacing-lg)",margin:"0 auto",maxWidth:"var(--rui-app-maxWidth)",color:"var(--rui-palette-neutral-foregroundLevel2)","@global":{h1:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0"},h2:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xl)",fontSize:"var(--rui-fontSize-xxl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel1)",margin:"var(--rui-spacing-lg) 0",padding:"var(--rui-spacing-sm) 0",borderBottom:"1px solid rgba(var(--rui-palette-neutral-rgb-foregroundLevel1) / 0.2)"},h3:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-xs)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0",overflowY:"hidden",overflowX:"auto"},h4:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-lg)",fontSize:"var(--rui-fontSize-lg)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},h5:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-md)",fontSize:"var(--rui-fontSize-xl)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel3)",margin:"var(--rui-spacing-lg) 0"},p:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},li:{fontFamily:"var(--rui-fontFamily-body)",fontWeight:"var(--rui-fontWeight-xs)",fontSize:"var(--rui-fontSize-md)",lineHeight:"var(--rui-lineHeight-md)",color:"var(--rui-palette-neutral-foregroundLevel2)",margin:"var(--rui-spacing-lg) 0"},"li::marker":{color:"var(--rui-palette-neutral-foregroundLevel3)"},"pre > code":{borderRadius:"var(--rui-borderRadius-sm)",boxShadow:"var(--rui-shadow-xs)",display:"block",background:"#282c34",color:"#abb2bf",overflowX:"auto",padding:"1em"},a:{color:"var(--rui-palette-primary-foregroundMain)",textDecoration:"none","&:visited, &:active":{color:"var(--rui-palette-primary-foregroundMain)"},"&:hover":{textDecoration:"underline",color:"var(--rui-palette-primary-foregroundDark)"}},table:{color:"var(--rui-palette-neutral-foregroundLevel1)",display:"block",overflowX:"auto",borderCollapse:"collapse","& th":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...He("titleMd"),"& div":{display:"flex",alignItems:"center",justifyContent:"space-evenly"},"& svg:first-child":{padding:"0 var(--rui-spacing-xs) 0 0"},"& svg:last-child":{padding:"0 0 0 var(--rui-spacing-xs)"},"& svg:only-child":{padding:"0"}},"& td":{borderColor:"rgb(var(--rui-palette-neutral-rgb-foregroundLevel3) / 0.2)",borderStyle:"none",padding:"var(--rui-spacing-sm) var(--rui-spacing-md)",...He("bodyMd")},"& thead th, & thead td":{borderBottomStyle:"solid",borderBottomWidth:"2px"},"& tfoot th, & tfoot td":{borderTopStyle:"solid",borderTopWidth:"2px"},"& tr:not(:last-child) td":{borderBottomStyle:"solid",borderBottomWidth:"1px"},"& td:not(:last-child), & th:not(:last-child)":{borderRightStyle:"solid",borderRightWidth:"1px"}}},margin:0,width:"100%",boxSizing:"border-box"}}),ts=e=>[e.className||null,es.root].join(" "),ss=b.create`
            <section class="${({props:e})=>ts(e)}"><a name="stylesheet" id="stylesheet" class="anchor"></a></p>
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
<h2 id="cssstylesoptionsc77cstylesheet">css(styles, [options]) ⇒ <a href="#stylesheet"><code>StyleSheet</code></a></h2>
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
        `,as=Zt({ApiIndex:Qt,Api:ss}),{AppBar:rs,AppBarMenuContent:ns}=Ot({logoAlt:"CSSFUN",playgroundUrl:"https://plnkr.co/edit/hLIWLlAHGsE2ojO1?preview",githubUrl:"https://github.com/8tentaculos/cssfun",npmUrl:"https://www.npmjs.com/package/cssfun"}),os=Ct({title:"CSSFUN",AppBar:rs,AppBarMenuContent:ns,Cover:zt,Features:Pt,Readme:qt,Api:as,Footer:Ht({licenseUrl:"https://github.com/8tentaculos/cssfun/blob/master/LICENSE",startYear:2024})});os.mount(window.__APP_OPTIONS__,document.getElementById("root"),!0);
