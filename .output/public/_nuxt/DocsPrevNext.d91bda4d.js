import{k as f,F as y,u as t,o as c,e as l,c as d,w as h,h as u,f as s,G as r,s as m,Q as k,v as w,x as g,R as C,b as N}from"./entry.d8e26afa.js";/* empty css                         */const B={key:0,class:"docs-prev-next"},D={class:"wrapper"},F={class:"directory"},V={class:"title"},I={key:1},P={class:"wrapper"},b={class:"directory"},j={class:"title"},E=f({__name:"DocsPrevNext",setup(G){const{prev:o,next:n,navigation:v}=y(),{navDirFromPath:x}=C(),p=_=>{const a=x(_._path,v.value||[]);if(a&&a[0])return a[0]._path;{const e=_.split("/");return(e.length>1?e[e.length-2]:"").split("-").map(k).join(" ")}};return(_,a)=>{const e=w,i=g;return t(o)||t(n)?(c(),l("div",B,[t(o)?(c(),d(i,{key:0,to:t(o)._path,class:"prev"},{default:h(()=>[u(e,{name:"heroicons-outline:arrow-sm-left",class:"icon"}),s("div",D,[s("span",F,r(p(t(o)._path)),1),s("span",V,r(t(o).title),1)])]),_:1},8,["to"])):(c(),l("span",I)),t(n)?(c(),d(i,{key:2,to:t(n)._path,class:"next"},{default:h(()=>[s("div",P,[s("span",b,r(p(t(n)._path)),1),s("span",j,r(t(n).title),1)]),u(e,{name:"heroicons-outline:arrow-sm-right",class:"icon"})]),_:1},8,["to"])):m("",!0)])):m("",!0)}}}),Q=N(E,[["__scopeId","data-v-c087c434"]]);export{Q as default};
