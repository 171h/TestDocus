import{k as b,a7 as T,r as v,M as S,_ as q,a9 as I,o as u,e as l,t as L,O as M,f as e,s as p,h as k,w as g,X as C,G as A,av as B,K as x,aC as N,Z as R,p as U,j as z,b as E}from"./entry.d8e26afa.js";import{r as H}from"./asyncData.8f2423e9.js";/* empty css                               */const r=a=>(U("data-v-572e7d1a"),a=a(),z(),a),V=r(()=>e("svg",{viewBox:"0 0 90 90",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M50.0016 71.0999h29.2561c.9293.0001 1.8422-.241 2.6469-.6992.8047-.4582 1.4729-1.1173 1.9373-1.9109.4645-.7936.7088-1.6939.7083-2.6102-.0004-.9162-.2455-1.8163-.7106-2.6095L64.192 29.713c-.4644-.7934-1.1325-1.4523-1.937-1.9105-.8046-.4581-1.7173-.6993-2.6463-.6993-.9291 0-1.8418.2412-2.6463.6993-.8046.4582-1.4726 1.1171-1.937 1.9105l-5.0238 8.5861-9.8224-16.7898c-.4648-.7934-1.1332-1.4522-1.938-1.9102-.8047-.4581-1.7176-.6992-2.6468-.6992-.9292 0-1.842.2411-2.6468.6992-.8048.458-1.4731 1.1168-1.9379 1.9102L6.56062 63.2701c-.46512.7932-.71021 1.6933-.71061 2.6095-.00041.9163.24389 1.8166.70831 2.6102.46443.7936 1.1326 1.4527 1.93732 1.9109.80473.4582 1.71766.6993 2.64686.6992h18.3646c7.2763 0 12.6422-3.1516 16.3345-9.3002l8.9642-15.3081 4.8015-8.1925 14.4099 24.6083H54.8058l-4.8042 8.1925ZM29.2077 62.899l-12.8161-.0028L35.603 30.0869l9.5857 16.4047-6.418 10.9645c-2.4521 3.9894-5.2377 5.4429-9.563 5.4429Z",fill:"currentColor"})],-1)),j=r(()=>e("span",null,"Preview mode enabled",-1)),D={key:0},F=r(()=>e("div",{id:"__preview_background"},null,-1)),O=r(()=>e("svg",{id:"__preview_loading_icon",width:"32",height:"32",viewBox:"0 0 24 24"},[e("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 0 0 4.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 0 1-15.357-2m15.357 2H15"})],-1)),Z=r(()=>e("p",null,"Initializing the preview...",-1)),G={key:0},K=r(()=>e("div",{id:"__preview_background"},null,-1)),X={id:"__preview_loader"},$=b({__name:"ContentPreviewMode",props:{previewToken:{type:Object,required:!0},apiURL:{type:String,required:!0},syncPreview:{type:Function,required:!0},requestPreviewSyncAPI:{type:Function,required:!0}},setup(a){const s=a,_=["__nuxt_preview","__preview_enabled"],P=T(),w=v(!0),m=v(!1),o=v(!1),i=v("");let t;const f=async()=>{B("previewToken").value="",x().query.preview="",await N(x().path),R(()=>{H()}),w.value=!1,i.value="",document.body.classList.remove(..._)},y=async c=>{const n=await s.syncPreview(c);if(o.value!==!0){if(!n){setTimeout(()=>y(c),1e3);return}o.value=!0,P.callHook("nuxt-studio:preview:ready"),window.parent&&window.self!==window.parent&&t.disconnect()}};return S(async()=>{t=(await q(()=>import("./index.db3e7fa1.js"),[],import.meta.url)).connect(`${s.apiURL}/preview`,{transports:["websocket","polling"],auth:{token:s.previewToken.value}});let n;t.on("connect",()=>{n=setTimeout(()=>{o.value||(n=setTimeout(()=>{i.value="Preview sync timed out",o.value=!1},3e4),t.emit("draft:requestSync"))},3e4)});const h=()=>{n&&(clearInterval(n),n=null)};t.on("draft:sync",d=>{if(h(),!d){s.requestPreviewSyncAPI(),t.once("draft:ready",()=>{t.emit("draft:requestSync")});return}y(d)}),t.on("draft:unauthorized",()=>{h(),i.value="Unauthorized preview token",o.value=!1}),t.on("disconnect",()=>{h()}),document.body.classList.add(..._),t.on("draft:update",d=>{m.value=!0,s.syncPreview(d),m.value=!1})}),I(()=>{document.body.classList.remove(..._)}),(c,n)=>(u(),l("div",null,[w.value?(u(),l("div",{key:0,id:"__nuxt_preview",class:L({__preview_ready:o.value,__preview_refreshing:m.value})},[o.value?(u(),l(M,{key:0},[V,j,e("button",{onClick:f}," Close ")],64)):p("",!0)],2)):p("",!0),k(C,{name:"preview-loading"},{default:g(()=>[w.value&&!o.value&&!i.value?(u(),l("div",D,[F,e("div",{id:"__preview_loader"},[O,Z,e("button",{onClick:f}," Cancel ")])])):p("",!0)]),_:1}),k(C,{name:"preview-loading"},{default:g(()=>[i.value?(u(),l("div",G,[K,e("div",X,[e("p",null,A(i.value),1),e("button",{onClick:f}," Exit preview ")])])):p("",!0)]),_:1})]))}}),Y=E($,[["__scopeId","data-v-572e7d1a"]]);export{Y as default};
