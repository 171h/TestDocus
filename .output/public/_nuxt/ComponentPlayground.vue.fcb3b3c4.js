import{a6 as m,u as c,a4 as u,m as s,k as l,r as i,A as t,a7 as d}from"./entry.e1e529aa.js";import f from"./Ellipsis.cb668f17.js";import _ from"./ComponentPlaygroundData.ed82dc46.js";async function y(o){m();const e=c(o);{const{data:n}=await u(`nuxt-component-meta${e?`-${e}`:""}`,()=>$fetch(`/api/component-meta${e?`/${e}`:""}`));return s(()=>n.value)}}const P=l({props:{component:{type:String,required:!0},props:{type:Object,required:!1,default:()=>({})}},async setup(o){const e=s(()=>d(o.component)),n=i({...o.props}),a=await y(o.component);return{as:e,formProps:n,componentData:a}},render(o){const e=Object.entries(this.$slots).reduce((n,[a,r])=>{if(a.startsWith("component-")){const p=a.replace("component-","");n[p]=r}return n},{});return t("div",{class:"component-playground"},[t("div",{class:"component-playground-wrapper"},[t(f,{class:"component-playground-ellipsis",blur:"5vw",height:"100%",width:"100%"}),t(o.as,{...o.formProps,class:"component-playground-component"},{...e})]),t(_,{modelValue:o.formProps,componentData:o.componentData,"onUpdate:modelValue":n=>o.formProps=n})])}});export{P as _};