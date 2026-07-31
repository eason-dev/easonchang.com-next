import{i as e}from"./preload-helper-MclHqJXp.js";import{a as t,p as n,t as r}from"./iframe-BJojB9Yg.js";import{n as i,t as a}from"./CustomLink-BSMHsnee.js";var o,s=e((()=>{o=`zh-TW`})),c,l=e((()=>{s(),c=(e,t=o)=>new Date(e).toLocaleDateString(t,{year:`numeric`,month:`long`,day:`numeric`})}));function u({posts:e=[]}){let n=t();return(0,d.jsxs)(`ul`,{className:`grid grid-cols-1 gap-4 py-6`,children:[!e.length&&`No posts found.`,e.map(e=>{let{slug:t,date:r,title:i,description:o,path:s}=e;return(0,d.jsx)(`li`,{children:(0,d.jsx)(a,{href:s,className:`block`,children:(0,d.jsxs)(`article`,{onMouseMove:f,className:`bento-card spotlight-card p-6 sm:p-7`,children:[(0,d.jsxs)(`dl`,{children:[(0,d.jsx)(`dt`,{className:`sr-only`,children:`Published on`}),(0,d.jsx)(`dd`,{className:`text-sm font-medium text-gray-400 dark:text-gray-500`,children:(0,d.jsx)(`time`,{dateTime:r,children:c(r,n)})})]}),(0,d.jsx)(`h3`,{className:`mt-2 text-lg font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100 sm:text-xl`,children:i}),o&&(0,d.jsx)(`p`,{className:`mt-2 line-clamp-2 text-gray-500 transition-colors dark:text-gray-400`,children:o})]})})},t)})]})}var d,f,p=e((()=>{d=n(),r(),i(),l(),f=e=>{let t=e.currentTarget,n=t.getBoundingClientRect();t.style.setProperty(`--spotlight-x`,`${e.clientX-n.left}px`),t.style.setProperty(`--spotlight-y`,`${e.clientY-n.top}px`)},u.__docgenInfo={description:``,methods:[],displayName:`PostList`,props:{posts:{required:!1,tsType:{name:`Array`,elements:[{name:`PostForPostList`}],raw:`PostForPostList[]`},description:``,defaultValue:{value:`[]`,computed:!1}}}}})),m,h,g,_;e((()=>{p(),m={title:`organisms/PostList`,component:u},h={args:{posts:[{slug:`hello-world`,date:`2024-01-15T00:00:00.000Z`,title:`Hello World`,description:`A first post about getting started with this blog.`,path:`/posts/hello-world`},{slug:`nextjs-app-router`,date:`2024-03-02T00:00:00.000Z`,title:`Migrating to the Next.js App Router`,description:`Notes from moving a bilingual MDX blog onto React Server Components.`,path:`/posts/nextjs-app-router`}]}},g={args:{posts:[]}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    posts: [{
      slug: 'hello-world',
      date: '2024-01-15T00:00:00.000Z',
      title: 'Hello World',
      description: 'A first post about getting started with this blog.',
      path: '/posts/hello-world'
    }, {
      slug: 'nextjs-app-router',
      date: '2024-03-02T00:00:00.000Z',
      title: 'Migrating to the Next.js App Router',
      description: 'Notes from moving a bilingual MDX blog onto React Server Components.',
      path: '/posts/nextjs-app-router'
    }]
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    posts: []
  }
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Empty`]}))();export{h as Default,g as Empty,_ as __namedExportsOrder,m as default};