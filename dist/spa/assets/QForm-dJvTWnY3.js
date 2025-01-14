import{k as E,r as P,I as q,Z as A,_ as I,o as B,h as R,g as V,G as S,p as Q,$}from"./index-B--a_9vc.js";import{q as j}from"./QTable-ComeHYaz.js";import{h as k,v as D}from"./QBtn-CGi78GET.js";const T=E({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(a,{slots:F,emit:d}){const C=V(),i=P(null);let s=0;const u=[];function l(e){const r=typeof e=="boolean"?e:a.noErrorFocus!==!0,c=++s,h=(t,n)=>{d(`validation${t===!0?"Success":"Error"}`,n)},x=t=>{const n=t.validate();return typeof n.then=="function"?n.then(o=>({valid:o,comp:t}),o=>({valid:!1,comp:t,err:o})):Promise.resolve({valid:n,comp:t})};return(a.greedy===!0?Promise.all(u.map(x)).then(t=>t.filter(n=>n.valid!==!0)):u.reduce((t,n)=>t.then(()=>x(n).then(o=>{if(o.valid===!1)return Promise.reject(o)})),Promise.resolve()).catch(t=>[t])).then(t=>{if(t===void 0||t.length===0)return c===s&&h(!0),!0;if(c===s){const{comp:n,err:o}=t[0];if(o!==void 0&&console.error(o),h(!1,n),r===!0){const p=t.find(({comp:g})=>typeof g.focus=="function"&&D(g.$)===!1);p!==void 0&&p.comp.focus()}}return!1})}function m(){s++,u.forEach(e=>{typeof e.resetValidation=="function"&&e.resetValidation()})}function v(e){e!==void 0&&S(e);const r=s+1;l().then(c=>{r===s&&c===!0&&(a.onSubmit!==void 0?d("submit",e):e!==void 0&&e.target!==void 0&&typeof e.target.submit=="function"&&e.target.submit())})}function b(e){e!==void 0&&S(e),d("reset"),Q(()=>{m(),a.autofocus===!0&&a.noResetFocus!==!0&&f()})}function f(){j(()=>{if(i.value===null)return;const e=i.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||i.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||i.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(i.value.querySelectorAll("[tabindex]"),r=>r.tabIndex!==-1);e?.focus({preventScroll:!0})})}q($,{bindComponent(e){u.push(e)},unbindComponent(e){const r=u.indexOf(e);r!==-1&&u.splice(r,1)}});let y=!1;return A(()=>{y=!0}),I(()=>{y===!0&&a.autofocus===!0&&f()}),B(()=>{a.autofocus===!0&&f()}),Object.assign(C.proxy,{validate:l,resetValidation:m,submit:v,reset:b,focus:f,getValidationComponents:()=>u}),()=>R("form",{class:"q-form",ref:i,onSubmit:v,onReset:b},k(F.default))}});export{T as Q};
