var _=Object.defineProperty;var a=(e,o)=>_(e,"name",{value:o,configurable:!0});import{r as i}from"./index-348f65a9.js";import{j as t,a as C,F as b}from"./jsx-runtime-960a5b19.js";import{A as h,M as g,S as T}from"./Props-b8895c24.js";import"./es.object.get-own-property-descriptor-36da39c2.js";import"./web.url.constructor-75478bb5.js";import{i as O,D as x,H as A,G as p,o as D,a as w,u as d}from"./index-7436a2a4.js";import"./iframe-464b0c09.js";import"./es.number.is-integer-dcb724dc.js";import"./index-681e4b07-879c375d.js";import"./es.map.constructor-d646751b.js";import"./index-eca14e72.js";import"./es.number.is-nan-efdeddb3.js";import"./string-d2fe5096.js";import"./index-e68f7527.js";const m=a(e=>{const[o,l]=i.useState(O()),k=i.useCallback((n,s)=>{switch(s.type){case"delete_relation":window.confirm(`Do yo want to remove relation between ${s.payload.taskFrom.name} and ${s.payload.taskTo.name}?`)&&l(n);break;case"delete_task":window.confirm(`Are you sure about ${s.payload.task.name}?`)&&l(n);break;default:l(n);break}},[]),f=i.useCallback(n=>{alert("On Double Click event Id:"+n.id)},[]),y=i.useCallback(n=>{console.log("On Click event Id:"+n.id)},[]);return t(x,{backend:A,children:t(p,{...e,onAddTask:D,onChangeTasks:k,onDoubleClick:f,onEditTask:w,onClick:y,tasks:o})})},"Simple");try{m.displayName="Simple",m.__docgenInfo={description:"",displayName:"Simple",props:{ganttHeight:{defaultValue:null,description:"",name:"ganttHeight",required:!1,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["stories/Simple.tsx#Simple"]={docgenInfo:m.__docgenInfo,name:"Simple",path:"stories/Simple.tsx#Simple"})}catch{}const u=a(e=>t(m,e),"Template");function c(e){const o=Object.assign({h1:"h1"},d(),e.components);return C(b,{children:[t(g,{title:"Simple",component:p}),`
`,`
`,t(o.h1,{children:"Simple example"}),`
`,t(T,{name:"Simple",children:u.bind({})})]})}a(c,"_createMdxContent");function M(e={}){const{wrapper:o}=Object.assign({},d(),e.components);return o?t(o,Object.assign({},e,{children:t(c,e)})):c(e)}a(M,"MDXContent");const S=u.bind({});S.storyName="Simple";S.parameters={storySource:{source:`props => {
  return <Simple {...props} />;
}`}};const r={title:"Simple",component:p,includeStories:["simple"]},E={Simple:"simple"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>t(h,{mdxStoryNameToKey:E,mdxComponentAnnotations:r,children:t(M,{})})};const P=["Template","simple"];export{u as Template,P as __namedExportsOrder,r as default,S as simple};
//# sourceMappingURL=Simple.stories-91198738.js.map
