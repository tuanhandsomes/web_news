(()=>{var e,t,o={790:e=>{"use strict";e.exports=window.ReactJSXRuntime},6087:e=>{"use strict";e.exports=window.wp.element},7723:e=>{"use strict";e.exports=window.wp.i18n},6942:(e,t)=>{var o;!function(){"use strict";var i={}.hasOwnProperty;function r(){for(var e="",t=0;t<arguments.length;t++){var o=arguments[t];o&&(e=c(e,n(o)))}return e}function n(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var o in e)i.call(e,o)&&e[o]&&(t=c(t,o));return t}function c(e,t){return t?e?e+" "+t:e+t:e}e.exports?(r.default=r,e.exports=r):void 0===(o=function(){return r}.apply(t,[]))||(e.exports=o)}()}},i={};function r(e){var t=i[e];if(void 0!==t)return t.exports;var n=i[e]={exports:{}};return o[e](n,n.exports,r),n.exports}r.m=o,r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[])),r.u=e=>e+".js",r.miniCssF=e=>{},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="gutenkit-blocks-addon:",r.l=(o,i,n,c)=>{if(e[o])e[o].push(i);else{var a,s;if(void 0!==n)for(var l=document.getElementsByTagName("script"),d=0;d<l.length;d++){var g=l[d];if(g.getAttribute("src")==o||g.getAttribute("data-webpack")==t+n){a=g;break}}a||(s=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,r.nc&&a.setAttribute("nonce",r.nc),a.setAttribute("data-webpack",t+n),a.src=o),e[o]=[i];var u=(t,i)=>{a.onerror=a.onload=null,clearTimeout(p);var r=e[o];if(delete e[o],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((e=>e(i))),t)return t(i)},p=setTimeout(u.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=u.bind(null,a.onerror),a.onload=u.bind(null,a.onload),s&&document.head.appendChild(a)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");if(o.length)for(var i=o.length-1;i>-1&&(!e||!/^http(s?):/.test(e));)e=o[i--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e+"../../"})(),(()=>{var e={4700:0};r.f.j=(t,o)=>{var i=r.o(e,t)?e[t]:void 0;if(0!==i)if(i)o.push(i[2]);else{var n=new Promise(((o,r)=>i=e[t]=[o,r]));o.push(i[2]=n);var c=r.p+r.u(t),a=new Error;r.l(c,(o=>{if(r.o(e,t)&&(0!==(i=e[t])&&(e[t]=void 0),i)){var n=o&&("load"===o.type?"missing":o.type),c=o&&o.target&&o.target.src;a.message="Loading chunk "+t+" failed.\n("+n+": "+c+")",a.name="ChunkLoadError",a.type=n,a.request=c,i[1](a)}}),"chunk-"+t,t)}};var t=(t,o)=>{var i,n,c=o[0],a=o[1],s=o[2],l=0;if(c.some((t=>0!==e[t]))){for(i in a)r.o(a,i)&&(r.m[i]=a[i]);s&&s(r)}for(t&&t(o);l<c.length;l++)n=c[l],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0},o=self.webpackChunkgutenkit_blocks_addon=self.webpackChunkgutenkit_blocks_addon||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})(),(()=>{"use strict";const e=window.wp.blocks;var t=r(7723);const o=window.wp.blockEditor;var i=r(6087);const n=window.wp.data;var c=r(6942),a=r.n(c);const s=window.wp.primitives;var l=r(790);const d=(0,l.jsx)(s.SVG,{version:"1.1",className:"svg-shape",x:"0px",y:"0px",viewBox:"0 0 541 64",height:"64",preserveAspectRatio:"none",children:(0,l.jsx)(s.Polygon,{className:"path",points:"85,55 81,55 51,55 42.5,64 34,55 0,55 0,0 34.4,0 42.5,9.5 50.6,0 81,0 85,0 541,0 541,55 "})}),g=(0,i.lazy)((()=>r.e(8026).then(r.bind(r,8026)))),u=JSON.parse('{"UU":"gutenkit/advanced-accordion-item"}'),{advancedAccordionItem:p}=window.gutenkit.editorIcon;(0,e.registerBlockType)(u.UU,{edit:function({attributes:e,setAttributes:r,clientId:c,isSelected:s}){const{GkitIcon:u,GkitStyle:p,GkitSuspense:k,GkitAllowedBlockNames:h}=window.gutenkit.components,{useHasProActive:v,useBlockStyles:m,useDeviceList:f}=window.gutenkit.helpers,b=(f(),v()),w=(0,n.select)("core/block-editor").getBlockParents(c).slice(-1)[0],y=(0,n.select)("core/block-editor").getBlockAttributes(w),[_,x]=(0,i.useState)(e.defaultOpen),[j,S]=(0,i.useState)(!0);let N;"gutenkit-popup"===(0,n.select)("core/editor").getCurrentPostType()&&(N=h());let P=(0,o.useBlockProps)({className:a()("gkit-card",{active:_})});const C=(0,o.useInnerBlocksProps)({},{templateLock:!1,allowedBlocks:b?N:["gutenkit/advanced-paragraph"],template:[["gutenkit/advanced-paragraph",{content:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast"}]]}),A=a()("collapse",{show:_});return(0,i.useEffect)((()=>{j?S(!1):r({parentBlockAttributes:y})}),[y]),m(e,r,"blocksCSS",((e,t)=>{const{parseCSS:o,backgroundGenerator:i,getBoxShadowValue:r,getBoxValue:n,getBorderValue:c,getTypographyValue:a,getSliderValue:s,getColor:l}=window.gutenkit.helpers,d=e?.blockClass;return o({desktop:[{selector:`.${d}.gkit-card .gkit-card-header>.gkit-btn-link, .gkit-accordion .${d}.gkit-card.active .gkit-card-header>.gkit-btn-link`,color:l(e.titleColor),background:"curve-shape"!==t?.style?i(e?.background).background:void 0},{selector:`.curve-shape.gkit-accordion .${d}.gkit-card.active .gkit-card-header>.gkit-btn-link .path, .curve-shape.gkit-accordion .${d}.gkit-card .gkit-card-header>.gkit-btn-link .path`,fill:l("curve-shape"===t?.style?e.curveBackground:void 0),stroke:"curve-shape"===t?.style?e.curveStrokeColor:void 0},{selector:`.gkit-accordion .${d}.gkit-card .gkit-card-header .gkit-btn-link .gkit_accordion_icon_group .gkit_accordion_normal_icon, .gkit-accordion .${d}.gkit-card.active .gkit-card-header .gkit-btn-link .gkit_accordion_icon_group .gkit_accordion_active_icon`,fill:l(e.iconColor)}],tablet:[],mobile:[]})})(e,y)),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(p,{blocksCSS:e?.blocksCSS}),s&&(0,l.jsx)(k,{children:(0,l.jsx)(g,{attributes:e,parentBlockAttributes:y,setAttributes:r})}),(0,l.jsxs)("div",{...P,children:[(0,l.jsx)("div",{className:"gkit-card-header",onClick:()=>x(!_),children:(0,l.jsxs)("a",{className:"gkit-accordion--toggler gkit-btn-link collapsed",children:[("left"==y?.iconPosStyle||"bothside"==y?.iconPosStyle)&&(0,l.jsxs)("div",{className:"gkit_accordion_icon_left_group",children:[(0,l.jsx)(u,{icon:y?.leftIcons,className:"gkit_accordion_normal_icon icon-left"}),(0,l.jsx)(u,{icon:y?.leftIconActives,className:"gkit_accordion_active_icon icon-left"})]}),1==y?.displayLoopCount&&(0,l.jsx)("span",{className:"number"}),(0,l.jsx)(o.RichText,{identifier:"title",tagName:"span",value:e.title,onChange:e=>r({title:e}),placeholder:(0,t.__)("How to Change my Photo from Admin Dashboard?","gutenkit-blocks-addon"),className:"gkit-accordion-title"}),("right"==y?.iconPosStyle||"bothside"==y?.iconPosStyle)&&(0,l.jsxs)("div",{className:"gkit_accordion_icon_group",children:[(0,l.jsx)(u,{icon:y?.rightIcons,className:"gkit_accordion_normal_icon icon-right"}),(0,l.jsx)(u,{icon:y?.rightIconActives,className:"gkit_accordion_active_icon icon-right"})]}),"curve-shape"==y?.style&&d]})}),(0,l.jsx)("div",{className:A,children:(0,l.jsx)("div",{className:"gkit-card-body gkit-accordion--content",children:void 0!==b&&(0,l.jsx)("div",{...C})})})]})]})},icon:{src:p},save:function({attributes:e}){const{GkitIcon:t}=window.gutenkit.components;let{parentBlockAttributes:i}=e;null==i&&(i={style:"accordion-primary",iconPosStyle:"right",displayLoopCount:!1,rightIcons:{title:"down-arrow1",src:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">\n<title>down-arrow1</title>\n<path d="M31.582 8.495c-0.578-0.613-1.544-0.635-2.153-0.059l-13.43 12.723-13.428-12.723c-0.61-0.578-1.574-0.553-2.153 0.059-0.579 0.611-0.553 1.576 0.058 2.155l14.477 13.715c0.293 0.277 0.67 0.418 1.047 0.418s0.756-0.14 1.048-0.418l14.477-13.715c0.611-0.579 0.637-1.544 0.058-2.155z"></path>\n</svg>'},rightIconActives:{title:"up-arrow",src:'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">\n<title>up-arrow</title>\n<path d="M26.915 10.844c0.451 0.451 0.451 1.162 0 1.613-0.436 0.436-1.162 0.436-1.597 0l-8.18-8.18v26.995c0 0.629-0.5 1.129-1.129 1.129s-1.146-0.5-1.146-1.129v-26.996l-8.164 8.18c-0.451 0.436-1.178 0.436-1.613 0-0.451-0.451-0.451-1.162 0-1.613l10.117-10.117c0.436-0.436 1.162-0.436 1.597 0l10.116 10.118z"></path>\n</svg>'}});const r=o.useBlockProps.save({className:a()("gkit-card",{active:e.defaultOpen})}),n=a()("collapse",{show:e.defaultOpen}),c=o.useInnerBlocksProps.save();return(0,l.jsxs)("div",{...r,children:[(0,l.jsx)("div",{className:"gkit-card-header",children:(0,l.jsxs)("a",{className:"gkit-accordion--toggler gkit-btn-link collapsed",children:[("left"==i?.iconPosStyle||"bothside"==i?.iconPosStyle)&&(0,l.jsxs)("div",{className:"gkit_accordion_icon_left_group",children:[(0,l.jsx)(t,{icon:i?.leftIcons,className:"gkit_accordion_normal_icon icon-left"}),(0,l.jsx)(t,{icon:i?.leftIconActives,className:"gkit_accordion_active_icon icon-left"})]}),1==i?.displayLoopCount&&(0,l.jsx)("span",{className:"number"}),(0,l.jsx)(o.RichText.Content,{identifier:"title",tagName:"span",value:e.title,className:"gkit-accordion-title"}),("right"==i?.iconPosStyle||"bothside"==i?.iconPosStyle)&&(0,l.jsxs)("div",{className:"gkit_accordion_icon_group",children:[(0,l.jsx)(t,{icon:i?.rightIcons,className:"gkit_accordion_normal_icon icon-right"}),(0,l.jsx)(t,{icon:i?.rightIconActives,className:"gkit_accordion_active_icon icon-right"})]}),"curve-shape"==i?.style&&d]})}),(0,l.jsx)("div",{className:n,children:(0,l.jsx)("div",{className:"gkit-card-body gkit-accordion--content",children:(0,l.jsx)("div",{...c})})})]})}})})()})();