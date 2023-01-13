var T=Object.defineProperty;var r=(t,a)=>T(t,"name",{value:a,configurable:!0});import{r as _}from"./index-348f65a9.js";import{j as o,a as b,F as j}from"./jsx-runtime-960a5b19.js";import{A as O,M as D,S as w}from"./Props-c43a94a3.js";import"./es.object.get-own-property-descriptor-36da39c2.js";import"./web.url.constructor-569f0d4f.js";import{D as x,H as N,G as u,o as A,a as I,b as i,u as y}from"./index-8d80f1a0.js";import"./iframe-0b427e21.js";import"./es.number.is-integer-c8e074a0.js";import"./index-681e4b07-5579487c.js";import"./es.map.constructor-d646751b.js";import"./index-eca14e72.js";import"./es.number.is-nan-efdeddb3.js";import"./string-d2fe5096.js";const k=6,E=r(()=>{const t=[],a=new Date,c=i(a,k),s="project",C={start:a,end:c,name:"Project",id:s,progress:25,type:"project"};t.push(C);for(let e=0;e<k;++e){const l=`${s}/not_connected_task_${e+1}`,m=`Not connected task ${e+1}`,h={start:i(a,e),end:i(a,e+1),name:m,id:l,progress:45,type:"task",parent:s};t.push(h)}let n=null;for(let e=0;e<k;++e){const l=`${s}/task_${e+1}`,m=`Task ${e+1}`,h={start:i(a,e),end:i(a,e+1),name:m,id:l,progress:45,type:"task",parent:s,dependencies:n?[{ownTarget:"startOfTask",sourceTarget:"endOfTask",sourceId:n}]:void 0};n=l,t.push(h)}return t},"initTasks"),p=r(t=>{const[a,c]=_.useState(E),s=_.useCallback((n,e)=>{switch(e.type){case"delete_relation":window.confirm(`Do yo want to remove relation between ${e.payload.taskFrom.name} and ${e.payload.taskTo.name}?`)&&c(n);break;case"delete_task":window.confirm(`Are you sure about ${e.payload.task.name}?`)&&c(n);break;default:c(n);break}},[]);return o(x,{backend:N,children:o(u,{isShowCriticalPath:!0,...t,onAddTask:A,onChangeTasks:s,onDoubleClick:r(n=>{alert("On Double Click event Id:"+n.id)},"handleDblClick"),onEditTask:I,onClick:r(n=>{console.log("On Click event Id:"+n.id)},"handleClick"),tasks:a})})},"CriticalPath");try{p.displayName="CriticalPath",p.__docgenInfo={description:"",displayName:"CriticalPath",props:{ganttHeight:{defaultValue:null,description:"",name:"ganttHeight",required:!1,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["stories/CriticalPath.tsx#CriticalPath"]={docgenInfo:p.__docgenInfo,name:"CriticalPath",path:"stories/CriticalPath.tsx#CriticalPath"})}catch{}const P=r(t=>o(p,t),"Template");function f(t){const a=Object.assign({h1:"h1"},y(),t.components);return b(j,{children:[o(D,{title:"CriticalPath",component:u}),`
`,`
`,o(a.h1,{children:"Critical path example"}),`
`,o(w,{name:"CriticalPath",children:P.bind({})})]})}r(f,"_createMdxContent");function M(t={}){const{wrapper:a}=Object.assign({},y(),t.components);return a?o(a,Object.assign({},t,{children:o(f,t)})):f(t)}r(M,"MDXContent");const g=P.bind({});g.storyName="CriticalPath";g.parameters={storySource:{source:`props => {
  return <CriticalPath {...props} />;
}`}};const d={title:"CriticalPath",component:u,includeStories:["criticalPath"]},$={CriticalPath:"criticalPath"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>o(O,{mdxStoryNameToKey:$,mdxComponentAnnotations:d,children:o(M,{})})};const J=["Template","criticalPath"];export{P as Template,J as __namedExportsOrder,g as criticalPath,d as default};
//# sourceMappingURL=CriticalPath.stories-d3f3e36f.js.map
