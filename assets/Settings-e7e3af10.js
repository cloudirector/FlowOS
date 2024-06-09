import{d as m,l as u}from"./index-e011716a.js";const d="/FlowOS/assets/preferences-system-c8f3e310.svg",f={config:{name:"Settings",type:"process",icon:d,targetVer:"2.0.0"},run:async a=>{const l=await a.loadLibrary("lib/WindowManager").then(t=>t.createWindow({title:"Settings",icon:d,width:500,height:500},a)),{fs:r}=a,o=await a.loadLibrary("lib/HTML"),{Input:w,Button:p,Dropdown:s}=await a.loadLibrary("lib/Components"),c=async t=>{l.content.innerHTML="";for(const e in t){let n=w.new();if(e==="THEME_PRIMARY"){const{extras:i}=JSON.parse(m.Buffer.from(await r.readFile(`/etc/themes/${t.THEME}.theme`)).toString());n=s.new(Object.keys(i))}else e==="THEME"&&(n=s.new((await r.readdir("/etc/themes")).map(i=>i.replace(".theme",""))));e==="THEME_PRIMARY"||e==="THEME"?n.elm.value=t[e]:n.attr({value:t[e]}),console.log(n.getValue()),new o("div").appendMany(new o("label").style({"text-transform":"capitalize"}).text(`${e.toLowerCase().replaceAll("_"," ")}:`),new o("br"),new o("div").style({display:"flex",gap:"5px"}).appendMany(n,p.new().text("Save").on("click",()=>{t[e]=n.getValue(),r.writeFile("/etc/flow",u.stringify(t)).then(()=>{document.dispatchEvent(new CustomEvent("config_update",{detail:{config:t}})),(e==="THEME"||e==="THEME_PRIMARY")&&document.dispatchEvent(new CustomEvent("theme_update",{}))}).catch(i=>console.error(i))}))).appendTo(l.content)}};await c(a.kernel.config),document.addEventListener("config_update",t=>{c(t.detail.config).catch(e=>console.error(e))})}};export{f as default};
