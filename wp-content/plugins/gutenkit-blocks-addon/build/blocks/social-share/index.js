(()=>{var e,t,i,o={278:(e,t,i)=>{"use strict";const o=window.wp.blocks;i(7723);var r=i(6087),a=i(6942),s=i.n(a);const l=window.wp.blockEditor;var n=i(790);const c=({attributes:e})=>{const{GkitIcon:t}=window.gutenkit.components,{gkitSocialShareIcons:i,gkitSocialShareStyle:o,gkitSocialShareStyleIconPosition:r}=e;return(0,n.jsx)(n.Fragment,{children:i&&(0,n.jsx)("ul",{className:s()({"gkit-social-share-menu":!0,[`gkit-social-share-icon-position-${r}`]:"both"===o,[`gkit-social-share-icon-style-${o}`]:o}),children:i.map(((e,i)=>(0,n.jsx)("li",{className:`gkit-social-share-menu-item gkit-social-share-menu-item-${Number(i)}`,"data-social":e.gkitSocialMedia,children:(0,n.jsxs)("a",{className:"gkit-social-share-menu-item-link","aria-label":e?.gkitSocialMedia,children:["icon"!==o&&(0,n.jsx)("span",{className:"gkit-social-share-menu-item-name",children:e?.gkitSocialShareLabel}),"text"!==o&&(0,n.jsx)(t,{icon:e?.gkitSocialShareIcon})]})},i)))})})},g=(0,r.lazy)((()=>i.e(1935).then(i.bind(i,1935)))),h=JSON.parse('{"UU":"gutenkit/social-share"}'),{socialShare:u}=window.gutenkit.editorIcon;(0,o.registerBlockType)(h.UU,{edit:function({attributes:e,setAttributes:t,advancedControl:i,isSelected:o}){const{GkitStyle:r,GkitSuspense:a}=window.gutenkit.components,{useDeviceType:h,useBlockStyles:u,useDeviceList:k}=window.gutenkit.helpers,d=k(),S=h(),m=(0,l.useBlockProps)({classnames:s()({"gkit-social-share":!0})});return u(e,t,"blocksCSS",((e,t)=>{const{parseCSS:i,getBorderValue:o,getBoxShadowValue:r,getBoxValue:a,getSliderValue:s,getTypographyValue:l,backgroundGenerator:n,getColor:c}=window.gutenkit.helpers,g=e?.blockClass;return i([[{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item .gkit-social-share-menu-item-link`,...o(e?.gkitSocialShareBorder),...a(e?.gkitSocialShareListBorderRadiusDesktop,"border-radius"),"box-shadow":r(e?.gkitSocialShareBoxShadow),background:n(e?.gkitIconBgColor).background,fill:c(e?.gkitIconColor),color:c(e?.gkitIconColor)},{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item:hover .gkit-social-share-menu-item-link`,...o(e?.gkitSocialShareBorderHover),"box-shadow":r(e?.gkitSocialShareBoxShadowHover),background:n(e?.gkitIconBgColorHover).background,fill:c(e?.gkitIconColorHover),color:c(e?.gkitIconColorHover)},{selector:`.${g} :is(.gkit-social-share-icon-style-both, .gkit-social-share-icon-style-text) .gkit-social-share-menu-item .gkit-social-share-menu-item-link`,"text-shadow":r(e?.gkitSocialShareTextShadow)},{selector:`.${g} :is(.gkit-social-share-icon-style-both, .gkit-social-share-icon-style-text) .gkit-social-share-menu-item:hover .gkit-social-share-menu-item-link`,"text-shadow":r(e?.gkitSocialShareTextShadowHover)},...(e=>{const t=e.map(((e,t)=>[{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item-${t} .gkit-social-share-menu-item-link`,color:c(e.gkitSocialShareIconColor),fill:c(e.gkitSocialShareIconColor),"background-color":e.gkitSocialShareIconBgColor,"border-color":e.gkitSocialShareBorder,"box-shadow":r(e.gkitSocialShareBoxShadow)},{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item-${t}:hover .gkit-social-share-menu-item-link`,color:c(e.gkitSocialShareIconHoverColor),fill:c(e.gkitSocialShareIconHoverColor),"background-color":e.gkitSocialShareIconHoverBgColor,"border-color":e.gkitSocialShareBorderHover,"box-shadow":r(e.gkitSocialShareBoxShadowHover)},{selector:`.${g} :is(.gkit-social-share-icon-style-both, .gkit-social-share-icon-style-text) .gkit-social-share-menu-item-${t} .gkit-social-share-menu-item-link`,"text-shadow":r(e.gkitSocialShareTextShadow)},{selector:`.${g} :is(.gkit-social-share-icon-style-both, .gkit-social-share-icon-style-text) .gkit-social-share-menu-item-${t}:hover .gkit-social-share-menu-item-link`,"text-shadow":r(e.gkitSocialShareTextShadowHover)}]));let i=[];return t.forEach((e=>{i=[...i,...e]})),i})(e?.gkitSocialShareIcons)],t=>[{selector:`.${g} .gkit-social-share-menu`,"justify-content":"row"===e[`gkitSocialShareListDisplay${t}`]?e[`gkitSocialShareListAlign${t}`]:"flex-start","align-items":"column"===e[`gkitSocialShareListDisplay${t}`]?e[`gkitSocialShareListAlign${t}`]:"center",gap:s(e[`gkitSocialShareElementSpacing${t}`]),"flex-direction":e[`gkitSocialShareListDisplay${t}`]},{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item .gkit-social-share-menu-item-link`,...a(e[`gkitSocialShareListBorderRadius${t}`],"border-radius"),width:e?.useHeightWidth&&"text"!=e?.gkitSocialShareStyle?s(e[`gkitSocialShareListWidth${t}`]):void 0,height:e?.useHeightWidth&&"text"!=e?.gkitSocialShareStyle?s(e[`gkitSocialShareListHeight${t}`]):void 0,gap:s("both"===e?.gkitSocialShareStyle&&e?.[`gkitSocialShareIconSpacing${t}`]),...a(!1===e?.useHeightWidth&&"icon"===e?.gkitSocialShareStyle&&e[`gkitSocialShareIconPadding${t}`],"padding")},{selector:`.${g} :is(.gkit-social-share-icon-style-text, .gkit-social-share-icon-style-both) .gkit-social-share-menu-item .gkit-social-share-menu-item-link`,...a("icon"!==e?.gkitSocialShareStyle&&e[`gkitSocialListPadding${t}`],"padding")},{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item`,width:"column"===e[`gkitSocialShareListDisplay${t}`]&&"100%"},{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item:hover .gkit-social-share-menu-item-link`,...a(e[`gkitSocialShareListBorderRadiusHover${t}`],"border-radius")},{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item .gkit-social-share-menu-item-link svg`,"font-size":s(e[`gkitSocialShareListIconSize${t}`])},{selector:`.${g} .gkit-social-share-menu .gkit-social-share-menu-item .gkit-social-share-menu-item-link`,...l(e.gkitSocialShareListTypography,t)}]],t)})(e,d)),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r,{blocksCSS:e?.blocksCSS}),o&&(0,n.jsx)(a,{children:(0,n.jsx)(g,{attributes:e,setAttributes:t,device:S,advancedControl:i})}),(0,n.jsx)("div",{...m,children:(0,n.jsx)(c,{attributes:e})})]})},icon:{src:u},save:function({attributes:e}){const t=l.useBlockProps.save({classnames:s()({"gkit-social-share":!0})});return(0,n.jsx)("div",{...t,children:(0,n.jsx)(c,{attributes:e})})}})},790:e=>{"use strict";e.exports=window.ReactJSXRuntime},6427:e=>{"use strict";e.exports=window.wp.components},6087:e=>{"use strict";e.exports=window.wp.element},7723:e=>{"use strict";e.exports=window.wp.i18n},5573:e=>{"use strict";e.exports=window.wp.primitives},6942:(e,t)=>{var i;!function(){"use strict";var o={}.hasOwnProperty;function r(){for(var e="",t=0;t<arguments.length;t++){var i=arguments[t];i&&(e=s(e,a(i)))}return e}function a(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var i in e)o.call(e,i)&&e[i]&&(t=s(t,i));return t}function s(e,t){return t?e?e+" "+t:e+t:e}e.exports?(r.default=r,e.exports=r):void 0===(i=function(){return r}.apply(t,[]))||(e.exports=i)}()}},r={};function a(e){var t=r[e];if(void 0!==t)return t.exports;var i=r[e]={exports:{}};return o[e](i,i.exports,a),i.exports}a.m=o,e=[],a.O=(t,i,o,r)=>{if(!i){var s=1/0;for(g=0;g<e.length;g++){i=e[g][0],o=e[g][1],r=e[g][2];for(var l=!0,n=0;n<i.length;n++)(!1&r||s>=r)&&Object.keys(a.O).every((e=>a.O[e](i[n])))?i.splice(n--,1):(l=!1,r<s&&(s=r));if(l){e.splice(g--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var g=e.length;g>0&&e[g-1][2]>r;g--)e[g]=e[g-1];e[g]=[i,o,r]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var i in t)a.o(t,i)&&!a.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,i)=>(a.f[i](e,t),t)),[])),a.u=e=>e+".js",a.miniCssF=e=>{},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},i="gutenkit-blocks-addon:",a.l=(e,o,r,s)=>{if(t[e])t[e].push(o);else{var l,n;if(void 0!==r)for(var c=document.getElementsByTagName("script"),g=0;g<c.length;g++){var h=c[g];if(h.getAttribute("src")==e||h.getAttribute("data-webpack")==i+r){l=h;break}}l||(n=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.setAttribute("data-webpack",i+r),l.src=e),t[e]=[o];var u=(i,o)=>{l.onerror=l.onload=null,clearTimeout(k);var r=t[e];if(delete t[e],l.parentNode&&l.parentNode.removeChild(l),r&&r.forEach((e=>e(o))),i)return i(o)},k=setTimeout(u.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=u.bind(null,l.onerror),l.onload=u.bind(null,l.onload),n&&document.head.appendChild(l)}},a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&"SCRIPT"===t.currentScript.tagName.toUpperCase()&&(e=t.currentScript.src),!e)){var i=t.getElementsByTagName("script");if(i.length)for(var o=i.length-1;o>-1&&(!e||!/^http(s?):/.test(e));)e=i[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e+"../../"})(),(()=>{var e={6358:0,1530:0};a.f.j=(t,i)=>{var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)i.push(o[2]);else if(1530!=t){var r=new Promise(((i,r)=>o=e[t]=[i,r]));i.push(o[2]=r);var s=a.p+a.u(t),l=new Error;a.l(s,(i=>{if(a.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var r=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+s+")",l.name="ChunkLoadError",l.type=r,l.request=s,o[1](l)}}),"chunk-"+t,t)}else e[t]=0},a.O.j=t=>0===e[t];var t=(t,i)=>{var o,r,s=i[0],l=i[1],n=i[2],c=0;if(s.some((t=>0!==e[t]))){for(o in l)a.o(l,o)&&(a.m[o]=l[o]);if(n)var g=n(a)}for(t&&t(i);c<s.length;c++)r=s[c],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(g)},i=self.webpackChunkgutenkit_blocks_addon=self.webpackChunkgutenkit_blocks_addon||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var s=a.O(void 0,[1530],(()=>a(278)));s=a.O(s)})();