"use strict";(self.webpackChunkgutenkit_blocks_addon=self.webpackChunkgutenkit_blocks_addon||[]).push([[3891],{3891:(e,n,a)=>{a.r(n),a.d(n,{default:()=>u});var t=a(7723),o=a(6087),l=a(6427),i=a(5573),s=a(790);const d=(0,s.jsx)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,s.jsx)(i.Path,{d:"M13 5.5H4V4h9v1.5Zm7 7H4V11h16v1.5Zm-7 7H4V18h9v1.5Z"})}),r=(0,s.jsx)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,s.jsx)(i.Path,{d:"M7.5 5.5h9V4h-9v1.5Zm-3.5 7h16V11H4v1.5Zm3.5 7h9V18h-9v1.5Z"})}),c=(0,s.jsx)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,s.jsx)(i.Path,{d:"M11.111 5.5H20V4h-8.889v1.5ZM4 12.5h16V11H4v1.5Zm7.111 7H20V18h-8.889v1.5Z"})}),u=(0,o.memo)((({attributes:e,setAttributes:n,device:a,advancedControl:o})=>{const{GkitBoxShadow:i,GkitColor:u,GkitPanelBody:k,GkitResponsive:g,GkitTabs:b,GkitTypography:_,GkitText:m,GkitSlider:h,GkitRangeUnit:v,GkitMedia:x,GkitChoose:p,GkitAdvancedUrl:C,GkitCSSFilters:j,GkitBorderControl:y,GkitBoxControl:w,GkitSelect:S,GkitSwitcher:B,GkitBackgrounOverlayGroup:F}=window.gutenkit.components,{gkitResponsiveValue:H,useFontFamilyinBlock:f,responsiveHelper:G,boxControlUnit:O}=window.gutenkit.helpers;f([e?.captionTypography]),H(e,"height",a);const T="cover"===H(e,"objectFit",a),R=!(!e.captionSource||"none"===e.captionSource);return(0,s.jsx)(b,{type:"top-level",tabs:[{name:"content",title:(0,t.__)("Content","gutenkit-blocks-addon")},{name:"style",title:(0,t.__)("Style","gutenkit-blocks-addon")},{name:"advanced",title:(0,t.__)("Advanced","gutenkit-blocks-addon")}],children:f=>{switch(f.name){case"content":return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(k,{title:(0,t.__)("Image","gutenkit-blocks-addon"),initialOpen:!0,children:[(0,s.jsx)(x,{label:(0,t.__)("Choose Image","gutenkit-blocks-addon"),mediaTypes:["image"],labelBlock:"block",onChange:e=>n({image:e}),value:e?.image,imageSize:!0}),(0,s.jsx)(g,{children:(0,s.jsx)(p,{label:(0,t.__)("Alignment","gutenkit-blocks-addon"),options:[{label:(0,t.__)("Left","gutenkit-blocks-addon"),value:"left",icon:d},{label:(0,t.__)("Center","gutenkit-blocks-addon"),value:"center",icon:r},{label:(0,t.__)("Right","gutenkit-blocks-addon"),value:"right",icon:c}],value:H(e,"imageAlignment",a),onChange:e=>G("imageAlignment",e,a,n)})}),(0,s.jsx)(S,{label:(0,t.__)("Caption","gutenkit-blocks-addon"),value:e?.captionSource,options:[{label:(0,t.__)("None","gutenkit-blocks-addon"),value:"none"},{label:(0,t.__)("Attachment Caption","gutenkit-blocks-addon"),value:"attachment"},{label:(0,t.__)("Custom Caption","gutenkit-blocks-addon"),value:"custom"}],onChange:e=>n({captionSource:e})}),"custom"===e?.captionSource&&(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(m,{value:e?.customCaption,label:(0,t.__)("Custom Caption","gutenkit-blocks-addon"),type:"textarea",onChange:e=>n({customCaption:e}),labelBlock:"block"})}),(0,s.jsx)(S,{label:(0,t.__)("Link","gutenkit-blocks-addon"),value:e?.linkType,options:[{label:(0,t.__)("None","gutenkit-blocks-addon"),value:"none"},{label:(0,t.__)("Media File","gutenkit-blocks-addon"),value:"file"},{label:(0,t.__)("Custom URL","gutenkit-blocks-addon"),value:"custom"}],onChange:e=>n({linkType:e})}),"file"===e?.linkType&&(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(S,{label:(0,t.__)("Lightbox","gutenkit-blocks-addon"),value:e?.openLightbox,options:[{label:(0,t.__)("Yes","gutenkit-blocks-addon"),value:"yes"},{label:(0,t.__)("No","gutenkit-blocks-addon"),value:"no"}],onChange:e=>n({openLightbox:e})})}),"custom"===e?.linkType&&(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(C,{value:e?.customURL,onChange:e=>n({customURL:e})})})]})});case"style":return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(k,{title:(0,t.__)("Image","gutenkit-blocks-addon"),children:[(0,s.jsx)(g,{children:(0,s.jsx)(v,{label:(0,t.__)("Width","gutenkit-blocks-addon"),value:H(e,"width",a),units:{"%":{min:0,max:100,step:1},px:{min:0,max:1e3,step:1},vw:{min:0,max:100,step:1},rem:{min:0,max:100,step:1},em:{min:0,max:100,step:1}},onChange:e=>G("width",e,a,n)})}),(0,s.jsx)(g,{children:(0,s.jsx)(v,{label:(0,t.__)("Max Width","gutenkit-blocks-addon"),value:H(e,"maxWidth",a),units:{"%":{min:0,max:100,step:1},px:{min:0,max:1e3,step:1},vw:{min:0,max:100,step:1},rem:{min:0,max:100,step:1},em:{min:0,max:100,step:1}},onChange:e=>G("maxWidth",e,a,n)})}),(0,s.jsx)(g,{children:(0,s.jsx)(v,{label:(0,t.__)("Height","gutenkit-blocks-addon"),value:H(e,"height",a),units:{"%":{min:0,max:100,step:1},px:{min:0,max:1e3,step:1},vh:{min:0,max:100,step:1},rem:{min:0,max:100,step:1},em:{min:0,max:100,step:1}},onChange:e=>G("height",e,a,n)})}),(0,s.jsx)(g,{children:(0,s.jsx)(S,{label:(0,t.__)("Object Fit","gutenkit-blocks-addon"),value:H(e,"objectFit",a),options:[{label:(0,t.__)("Default","gutenkit-blocks-addon"),value:"unset"},{label:(0,t.__)("Fill","gutenkit-blocks-addon"),value:"fill"},{label:(0,t.__)("Cover","gutenkit-blocks-addon"),value:"cover"},{label:(0,t.__)("Scale Down","gutenkit-blocks-addon"),value:"scale-down"},{label:(0,t.__)("Contain","gutenkit-blocks-addon"),value:"contain"}],onChange:e=>G("objectFit",e,a,n),help:(0,t.__)("It will applicable when given any width & height.")})}),T&&(0,s.jsx)(g,{children:(0,s.jsx)(S,{label:(0,t.__)("Object Position","gutenkit-blocks-addon"),value:H(e,"objectPosition",a),options:[{label:(0,t.__)("Center Center","gutenkit-blocks-addon"),value:"50% 50%"},{label:(0,t.__)("Center Left","gutenkit-blocks-addon"),value:"0% 50%"},{label:(0,t.__)("Center Right","gutenkit-blocks-addon"),value:"100% 50%"},{label:(0,t.__)("Top Left","gutenkit-blocks-addon"),value:"0% 0%"},{label:(0,t.__)("Top Center","gutenkit-blocks-addon"),value:"50% 0%"},{label:(0,t.__)("Top Right","gutenkit-blocks-addon"),value:"100% 0%"},{label:(0,t.__)("Bottom Left","gutenkit-blocks-addon"),value:"0% 100%"},{label:(0,t.__)("Bottom Center","gutenkit-blocks-addon"),value:"50% 100%"},{label:(0,t.__)("Bottom Right","gutenkit-blocks-addon"),value:"100% 100%"}],onChange:e=>G("objectPosition",e,a,n)})}),(0,s.jsx)(l.__experimentalDivider,{margin:"2"}),(0,s.jsx)(b,{type:"normal",tabs:[{name:"image-effects-normal-tab",title:(0,t.__)("Normal","gutenkit-blocks-addon")},{name:"image-effects-hover-tab",title:(0,t.__)("Hover","gutenkit-blocks-addon")}],children:a=>"image-effects-normal-tab"===a.name?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(h,{label:(0,t.__)("Zoom","gutenkit-blocks-addon"),value:e?.zoom,onChange:e=>n({zoom:e}),range:{min:0,max:3,step:.1}}),(0,s.jsx)(h,{label:(0,t.__)("Opacity","gutenkit-blocks-addon"),value:e?.opacity,onChange:e=>n({opacity:e}),range:{min:0,max:1,step:.01}}),(0,s.jsx)(j,{label:(0,t.__)("CSS Filters","gutenkit-blocks-addon"),value:e?.cssFilters,onChange:e=>n({cssFilters:e})}),(0,s.jsx)(y,{label:(0,t.__)("Border","gutenkit-blocks-addon"),value:e?.imageBorder,onChange:e=>n({imageBorder:e})}),(0,s.jsx)(w,{label:(0,t.__)("Border Radius","gutenkit-blocks-addon"),units:O,values:e?.borderRadius,onChange:e=>n({borderRadius:e})}),(0,s.jsx)(i,{label:(0,t.__)("Box Shadow","gutenkit-blocks-addon"),value:e?.boxShadow,onChange:e=>n({boxShadow:e})})]}):"image-effects-hover-tab"===a.name?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(h,{label:(0,t.__)("Zoom","gutenkit-blocks-addon"),value:e?.hoverZoom,onChange:e=>n({hoverZoom:e}),range:{min:0,max:3,step:.1}}),(0,s.jsx)(h,{label:(0,t.__)("Opacity","gutenkit-blocks-addon"),value:e?.hoverOpacity,onChange:e=>n({hoverOpacity:e}),range:{min:0,max:1,step:.1}}),(0,s.jsx)(j,{label:(0,t.__)("CSS Filters","gutenkit-blocks-addon"),value:e?.cssFiltersHover,onChange:e=>n({cssFiltersHover:e})}),(0,s.jsx)(h,{label:(0,t.__)("Transition Duration (s)","gutenkit-blocks-addon"),value:e?.transitionDuration,onChange:e=>n({transitionDuration:e}),range:{min:0,max:3,step:.1}}),(0,s.jsx)(y,{label:(0,t.__)("Border","gutenkit-blocks-addon"),value:e?.imageBorderHover,onChange:e=>n({imageBorderHover:e})}),(0,s.jsx)(w,{label:(0,t.__)("Border Radius","gutenkit-blocks-addon"),units:O,values:e?.borderRadiusHover,onChange:e=>n({borderRadiusHover:e})}),(0,s.jsx)(i,{label:(0,t.__)("Box Shadow","gutenkit-blocks-addon"),value:e?.boxShadowHover,onChange:e=>n({boxShadowHover:e})})]}):void 0})]}),R&&(0,s.jsxs)(k,{title:(0,t.__)("Caption","gutenkit-blocks-addon"),children:[(0,s.jsx)(p,{label:(0,t.__)("Alignment","gutenkit-blocks-addon"),options:[{label:(0,t.__)("Left","gutenkit-blocks-addon"),value:"left",icon:d},{label:(0,t.__)("Center","gutenkit-blocks-addon"),value:"center",icon:r},{label:(0,t.__)("Right","gutenkit-blocks-addon"),value:"right",icon:c}],value:H(e,"captionAlignment",a),onChange:e=>G("captionAlignment",e,a,n)}),(0,s.jsx)(u,{label:(0,t.__)("Color","gutenkit-blocks-addon"),onChange:e=>n({captionColor:e}),value:e?.captionColor}),(0,s.jsx)(u,{label:(0,t.__)("Background","gutenkit-blocks-addon"),onChange:e=>n({captionBackground:e}),value:e?.captionBackground}),(0,s.jsx)(_,{label:(0,t.__)("Typography","gutenkit-blocks-addon"),value:e?.captionTypography,onChange:e=>n({captionTypography:e})}),(0,s.jsx)(i,{label:(0,t.__)("Text Shadow","gutenkit-blocks-addon"),value:e?.captionShadow,onChange:e=>n({captionShadow:e}),exclude:{position:!0,spread:!0}}),(0,s.jsx)(g,{children:(0,s.jsx)(v,{label:(0,t.__)("Spacing","gutenkit-blocks-addon"),value:H(e,"captionSpacing",a),onChange:e=>G("captionSpacing",e,a,n),units:{px:{min:0,max:100,step:1},"%":{min:0,max:100,step:1},rem:{min:0,max:100,step:1},em:{min:0,max:100,step:1}}})})]}),(0,s.jsxs)(k,{title:(0,t.__)("Overlay","gutenkit-blocks-addon"),initialOpen:!1,children:[(0,s.jsx)(B,{label:(0,t.__)("Show Overlay","gutenkit-blocks-addon"),value:e?.showContainerOverlay,onChange:e=>n({showContainerOverlay:e})}),e?.showContainerOverlay&&(0,s.jsx)(b,{type:"normal",tabs:[{name:"normal-overlay",title:(0,t.__)("Normal","gutenkit-blocks-addon")},{name:"hover-overlay",title:(0,t.__)("Hover","gutenkit-blocks-addon")}],children:a=>"normal-overlay"===a.name?(0,s.jsx)(F,{label:(0,t.__)("Overlay","gutenkit-blocks-addon"),value:e?.containerBackgroundOverlay,onChange:e=>n({containerBackgroundOverlay:e})}):"hover-overlay"===a.name?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(F,{label:(0,t.__)("Overlay","gutenkit-blocks-addon"),value:e?.containerBackgroundHoverOverlay,onChange:e=>n({containerBackgroundHoverOverlay:e})}),(0,s.jsx)(l.__experimentalDivider,{}),(0,s.jsx)(h,{label:(0,t.__)("Transition Duration","gutenkit-blocks-addon"),value:e?.containerOverlayHoverTransitionDuration,onChange:e=>n({containerOverlayHoverTransitionDuration:e}),range:{min:0,max:3,step:.1}})]}):void 0})]})]});case"advanced":return(0,s.jsx)(s.Fragment,{children:o})}}})}))}}]);