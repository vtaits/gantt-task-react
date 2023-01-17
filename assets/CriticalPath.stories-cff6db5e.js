var T=Object.defineProperty;var s=(t,a)=>T(t,"name",{value:a,configurable:!0});import{r as p}from"./index-348f65a9.js";import{j as r,a as b,F as j}from"./jsx-runtime-960a5b19.js";import{A as O,M as D,S as w}from"./Props-b8895c24.js";import"./es.object.get-own-property-descriptor-36da39c2.js";import"./web.url.constructor-75478bb5.js";import{D as x,H as N,G as _,o as A,a as I,b as i,u as P}from"./index-7436a2a4.js";import"./iframe-464b0c09.js";import"./es.number.is-integer-dcb724dc.js";import"./index-681e4b07-879c375d.js";import"./es.map.constructor-d646751b.js";import"./index-eca14e72.js";import"./es.number.is-nan-efdeddb3.js";import"./string-d2fe5096.js";import"./index-e68f7527.js";const C=6,E=s(()=>{const t=[],a=new Date,c=i(a,C),n="project",h={start:a,end:c,name:"Project",id:n,progress:25,type:"project"};t.push(h);for(let e=0;e<C;++e){const l=`${n}/not_connected_task_${e+1}`,u=`Not connected task ${e+1}`,k={start:i(a,e),end:i(a,e+1),name:u,id:l,progress:45,type:"task",parent:n};t.push(k)}let o=null;for(let e=0;e<C;++e){const l=`${n}/task_${e+1}`,u=`Task ${e+1}`,k={start:i(a,e),end:i(a,e+1),name:u,id:l,progress:45,type:"task",parent:n,dependencies:o?[{ownTarget:"startOfTask",sourceTarget:"endOfTask",sourceId:o}]:void 0};o=l,t.push(k)}return t},"initTasks"),m=s(t=>{const[a,c]=p.useState(E),n=p.useCallback((o,e)=>{switch(e.type){case"delete_relation":window.confirm(`Do yo want to remove relation between ${e.payload.taskFrom.name} and ${e.payload.taskTo.name}?`)&&c(o);break;case"delete_task":window.confirm(`Are you sure about ${e.payload.task.name}?`)&&c(o);break;default:c(o);break}},[]),f=p.useCallback(o=>{alert("On Double Click event Id:"+o.id)},[]),h=p.useCallback(o=>{console.log("On Click event Id:"+o.id)},[]);return r(x,{backend:N,children:r(_,{isShowCriticalPath:!0,...t,onAddTask:A,onChangeTasks:n,onDoubleClick:f,onEditTask:I,onClick:h,tasks:a})})},"CriticalPath");try{m.displayName="CriticalPath",m.__docgenInfo={description:"",displayName:"CriticalPath",props:{ganttHeight:{defaultValue:null,description:"",name:"ganttHeight",required:!1,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["stories/CriticalPath.tsx#CriticalPath"]={docgenInfo:m.__docgenInfo,name:"CriticalPath",path:"stories/CriticalPath.tsx#CriticalPath"})}catch{}const g=s(t=>r(m,t),"Template");function y(t){const a=Object.assign({h1:"h1"},P(),t.components);return b(j,{children:[r(D,{title:"CriticalPath",component:_}),`
`,`
`,r(a.h1,{children:"Critical path example"}),`
`,r(w,{name:"CriticalPath",children:g.bind({})})]})}s(y,"_createMdxContent");function M(t={}){const{wrapper:a}=Object.assign({},P(),t.components);return a?r(a,Object.assign({},t,{children:r(y,t)})):y(t)}s(M,"MDXContent");const S=g.bind({});S.storyName="CriticalPath";S.parameters={storySource:{source:`props => {
  return <CriticalPath {...props} />;
}`}};const d={title:"CriticalPath",component:_,includeStories:["criticalPath"]},$={CriticalPath:"criticalPath"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>r(O,{mdxStoryNameToKey:$,mdxComponentAnnotations:d,children:r(M,{})})};const Q=["Template","criticalPath"];export{g as Template,Q as __namedExportsOrder,S as criticalPath,d as default};
//# sourceMappingURL=CriticalPath.stories-cff6db5e.js.map
