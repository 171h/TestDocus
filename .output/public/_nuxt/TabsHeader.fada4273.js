import{k as m,r as l,S as b,o as a,e as s,O as v,V as g,f as u,s as x,H as y,t as k,G as I,p as T,j as S,Z as C,b as $}from"./entry.d8e26afa.js";const H=t=>(T("data-v-fa060d5c"),t=t(),S(),t),w={class:"tabs-header"},B=["onClick"],N=H(()=>u("span",{class:"tab"},null,-1)),U=[N],V=m({__name:"TabsHeader",props:{tabs:{type:Array,required:!0},activeTabIndex:{type:Number,required:!0}},emits:["update:activeTabIndex"],setup(t,{emit:_}){const p=t,n=l(),r=l(),i=e=>{!e||(r.value.style.left=`${e.offsetLeft}px`,r.value.style.width=`${e.clientWidth}px`)},f=(e,c)=>{_("update:activeTabIndex",c),C(()=>i(e.target))};return b(n,e=>{!e||setTimeout(()=>{i(n.value.children[p.activeTabIndex])},50)},{immediate:!0}),(e,c)=>(a(),s("div",w,[t.tabs?(a(),s("div",{key:0,ref_key:"tabsRef",ref:n,class:"tabs"},[(a(!0),s(v,null,g(t.tabs,({label:d},o)=>(a(),s("button",{key:`${o}${d}`,class:k([t.activeTabIndex===o?"active":"not-active"]),onClick:h=>f(h,o)},I(d),11,B))),128)),u("span",{ref_key:"highlightUnderline",ref:r,class:"highlight-underline"},U,512)],512)):x("",!0),y(e.$slots,"footer",{},void 0,!0)]))}});const L=$(V,[["__scopeId","data-v-fa060d5c"]]);export{L as default};
