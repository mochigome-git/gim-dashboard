"use strict";(self.webpackChunkinkjet_dashboard_app=self.webpackChunkinkjet_dashboard_app||[]).push([[641],{57259:(e,t,a)=>{a.d(t,{Z:()=>r});var n=a(67294);function r(e){let{fieldNames:t,fields:a,data:r,children:l,divide:d,reverse:s}=e;const[i,o]=(0,n.useState)([]),[c,f]=(0,n.useState)([]);(0,n.useEffect)((()=>{if(r&&(null==r?void 0:r.length)>0||0===(null==r?void 0:r.length)){const e=[...r].sort(((e,t)=>new Date(e.created_at)-new Date(t.created_at)));JSON.stringify(e)!==JSON.stringify(i)&&o(e)}}),[r,i]),(0,n.useEffect)((()=>{try{const t=[];for(let n=0;n<i.length;n++){const r={};for(let l=0;l<a.length;l++){var e;const o=a[l],c=i[n][o]?Number(i[n][o])/d:null===(e=t[t.length-1])||void 0===e||null===(e=e[o])||void 0===e?void 0:e.y;r[o]=s?{x:Math.floor(new Date(i[n].created_at).getTime()),y:3e3/c}:{x:Math.floor(new Date(i[n].created_at).getTime()),y:c}}t.push(r)}f(t)}catch(e){console.error(e),f([])}}),[i,a]);const u={datasets:a.map(((e,a)=>({name:t[a],data:c.map((t=>t[e]))})))};return"function"==typeof l?l({ddata:u}):null}},45641:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var n=a(67294),r=a(57214),l=a(13396),d=a(36681),s=a(57259);const i=e=>{let{field:t,chartProps:a,renderDetailsChart:i}=e;const{nk2:o}=(0,n.useContext)(d.C);return n.createElement(r.Z,{item:!0,xs:12,md:12,lg:6},n.createElement(l.Z,{mb:3},o[t]?n.createElement(s.Z,{fieldNames:a.fieldNames,fields:a.fields,data:o[t],divide:a.divide,reverse:a.reverse},(e=>{let{ddata:t}=e;return i({data:t,title:a.title,ymax:a.ymax})})):null))}}}]);
//# sourceMappingURL=641.ca98324efd800f2b8de3.js.map