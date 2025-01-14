import{k as B,c,h as k,g as C,m as X,aa as A,w as I,o as G,p as $,x as b,q as v,G as F,af as Z,Z as J,ag as ee,r as R,Y as te}from"./index-B--a_9vc.js";import{h as M,m as ne,n as le,o as Q,v as oe,p as ie,q as re,a as se}from"./QBtn-CGi78GET.js";const he=B({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:t}){const n=c(()=>parseInt(e.lines,10)),l=c(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(n.value===1?" ellipsis":"")),o=c(()=>e.lines!==void 0&&n.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":n.value}:null);return()=>k("div",{style:o.value,class:l.value},M(t.default))}}),N={dark:{type:Boolean,default:null}};function j(e,t){return c(()=>e.dark===null?t.dark.isActive:e.dark)}const ae=["ul","ol"],ge=B({name:"QList",props:{...N,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:t}){const n=C(),l=j(e,n.proxy.$q),o=c(()=>ae.includes(e.tag)?null:"list"),d=c(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(l.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>k(e.tag,{class:d.value,role:o.value},M(t.default))}});function ye(e,t,n){let l;function o(){l!==void 0&&(A.remove(l),l=void 0)}return X(()=>{e.value===!0&&o()}),{removeFromHistory:o,addToHistory(){l={condition:()=>n.value===!0,handler:t},A.add(l)}}}const qe={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},ke=["beforeShow","show","beforeHide","hide"];function Le({showing:e,canShow:t,hideOnRouteChange:n,handleShow:l,handleHide:o,processOnMount:d}){const s=C(),{props:a,emit:f,proxy:L}=s;let u;function p(i){e.value===!0?g(i):h(i)}function h(i){if(a.disable===!0||i!==void 0&&i.qAnchorHandled===!0||t!==void 0&&t(i)!==!0)return;const r=a["onUpdate:modelValue"]!==void 0;r===!0&&(f("update:modelValue",!0),u=i,$(()=>{u===i&&(u=void 0)})),(a.modelValue===null||r===!1)&&m(i)}function m(i){e.value!==!0&&(e.value=!0,f("beforeShow",i),l!==void 0?l(i):f("show",i))}function g(i){if(a.disable===!0)return;const r=a["onUpdate:modelValue"]!==void 0;r===!0&&(f("update:modelValue",!1),u=i,$(()=>{u===i&&(u=void 0)})),(a.modelValue===null||r===!1)&&T(i)}function T(i){e.value!==!1&&(e.value=!1,f("beforeHide",i),o!==void 0?o(i):f("hide",i))}function E(i){a.disable===!0&&i===!0?a["onUpdate:modelValue"]!==void 0&&f("update:modelValue",!1):i===!0!==e.value&&(i===!0?m:T)(u)}I(()=>a.modelValue,E),n!==void 0&&ne(s)===!0&&I(()=>L.$route.fullPath,()=>{n.value===!0&&e.value===!0&&g()}),d===!0&&G(()=>{E(a.modelValue)});const S={show:h,hide:g,toggle:p};return Object.assign(L,S),S}const Te=[Element,String],ue=[null,document,document.body,document.scrollingElement,document.documentElement];function Ee(e,t){let n=le(t);if(n===void 0){if(e==null)return window;n=e.closest(".scroll,.scroll-y,.overflow-auto")}return ue.includes(n)?window:n}function ce(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function de(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let x;function Se(){if(x!==void 0)return x;const e=document.createElement("p"),t=document.createElement("div");Q(e,{width:"100%",height:"200px"}),Q(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const n=e.offsetWidth;t.style.overflow="scroll";let l=e.offsetWidth;return n===l&&(l=t.clientWidth),t.remove(),x=n-l,x}function fe(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let y=0,P,V,q,H=!1,z,Y,D,w=null;function me(e){ve(e)&&F(e)}function ve(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=Z(e),n=e.shiftKey&&!e.deltaX,l=!n&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),o=n||l?e.deltaY:e.deltaX;for(let d=0;d<t.length;d++){const s=t[d];if(fe(s,l))return l?o<0&&s.scrollTop===0?!0:o>0&&s.scrollTop+s.clientHeight===s.scrollHeight:o<0&&s.scrollLeft===0?!0:o>0&&s.scrollLeft+s.clientWidth===s.scrollWidth}return!0}function K(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function _(e){H!==!0&&(H=!0,requestAnimationFrame(()=>{H=!1;const{height:t}=e.target,{clientHeight:n,scrollTop:l}=document.scrollingElement;(q===void 0||t!==window.innerHeight)&&(q=n-t,document.scrollingElement.scrollTop=l),l>q&&(document.scrollingElement.scrollTop-=Math.ceil((l-q)/8))}))}function O(e){const t=document.body,n=window.visualViewport!==void 0;if(e==="add"){const{overflowY:l,overflowX:o}=window.getComputedStyle(t);P=de(window),V=ce(window),z=t.style.left,Y=t.style.top,D=window.location.href,t.style.left=`-${P}px`,t.style.top=`-${V}px`,o!=="hidden"&&(o==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),l!=="hidden"&&(l==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,b.is.ios===!0&&(n===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",_,v.passiveCapture),window.visualViewport.addEventListener("scroll",_,v.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",K,v.passiveCapture))}b.is.desktop===!0&&b.is.mac===!0&&window[`${e}EventListener`]("wheel",me,v.notPassive),e==="remove"&&(b.is.ios===!0&&(n===!0?(window.visualViewport.removeEventListener("resize",_,v.passiveCapture),window.visualViewport.removeEventListener("scroll",_,v.passiveCapture)):window.removeEventListener("scroll",K,v.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=z,t.style.top=Y,window.location.href===D&&window.scrollTo(P,V),q=void 0)}function we(e){let t="add";if(e===!0){if(y++,w!==null){clearTimeout(w),w=null;return}if(y>1)return}else{if(y===0||(y--,y>0))return;if(t="remove",b.is.ios===!0&&b.is.nativeMobile===!0){w!==null&&clearTimeout(w),w=setTimeout(()=>{O(t),w=null},100);return}}O(t)}function xe(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,we(t))}}}function _e(){let e=null;const t=C();function n(){e!==null&&(clearTimeout(e),e=null)}return J(n),X(n),{removeTimeout:n,registerTimeout(l,o){n(),oe(t)===!1&&(e=setTimeout(()=>{e=null,l()},o))}}}function Be(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),ee.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const U=["B","KB","MB","GB","TB","PB"];function Ce(e,t=1){let n=0;for(;parseInt(e,10)>=1024&&n<U.length-1;)e/=1024,++n;return`${e.toFixed(t)}${U[n]}`}function Pe(e,t,n){return n<=t?t:Math.min(n,Math.max(t,e))}function Ve(e,t,n){if(n<=t)return t;const l=n-t+1;let o=t+(e-t)%l;return o<t&&(o=l+o),o===0?0:o}const He=B({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const n=c(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>k("div",{class:n.value},M(t.default))}}),Me=B({name:"QItem",props:{...N,...ie,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:t,emit:n}){const{proxy:{$q:l}}=C(),o=j(e,l),{hasLink:d,linkAttrs:s,linkClass:a,linkTag:f,navigateOnClick:L}=re(),u=R(null),p=R(null),h=c(()=>e.clickable===!0||d.value===!0||e.tag==="label"),m=c(()=>e.disable!==!0&&h.value===!0),g=c(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(o.value===!0?" q-item--dark":"")+(d.value===!0&&e.active===null?a.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(m.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),T=c(()=>e.insetLevel===void 0?null:{["padding"+(l.lang.rtl===!0?"Right":"Left")]:16+e.insetLevel*56+"px"});function E(r){m.value===!0&&(p.value!==null&&(r.qKeyEvent!==!0&&document.activeElement===u.value?p.value.focus():document.activeElement===p.value&&u.value.focus()),L(r))}function S(r){if(m.value===!0&&te(r,[13,32])===!0){F(r),r.qKeyEvent=!0;const W=new MouseEvent("click",r);W.qKeyEvent=!0,u.value.dispatchEvent(W)}n("keyup",r)}function i(){const r=se(t.default,[]);return m.value===!0&&r.unshift(k("div",{class:"q-focus-helper",tabindex:-1,ref:p})),r}return()=>{const r={ref:u,class:g.value,style:T.value,role:"listitem",onClick:E,onKeyup:S};return m.value===!0?(r.tabindex=e.tabindex||"0",Object.assign(r,s.value)):h.value===!0&&(r["aria-disabled"]="true"),k(f.value,r,i())}}}),We=(e,t)=>{const n=e.__vccOpts||e;for(const[l,o]of t)n[l]=o;return n};export{He as Q,We as _,N as a,ke as b,Be as c,j as d,_e as e,Le as f,ye as g,Pe as h,xe as i,Ee as j,ce as k,de as l,Se as m,he as n,Me as o,ge as p,Ce as q,Ve as r,Te as s,qe as u};
