(this.webpackJsonpvwd21_noobs=this.webpackJsonpvwd21_noobs||[]).push([[0],{115:function(e,t,n){},116:function(e,t,n){},117:function(e,t,n){},118:function(e,t,n){},125:function(e,t){},127:function(e,t){},138:function(e,t){},140:function(e,t){},165:function(e,t){},167:function(e,t){},168:function(e,t){},173:function(e,t){},175:function(e,t){},194:function(e,t){},206:function(e,t){},209:function(e,t){},212:function(e,t,n){"use strict";n.r(t);var o=n(3),c=n(10),i=n.n(c),a=n(108),d=n.n(a),s=(n(115),n(116),n(117),function(){console.log("Hello")}),r=function(){return Object(o.jsxs)("div",{children:[Object(o.jsx)("h1",{className:"Header",children:"Hello world!"}),Object(o.jsx)("button",{onClick:s,className:"Button",children:"Hello"})]})},u=n(16),l=(n(118),n(109)),j=function(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1],d=Object(c.useState)({}),s=Object(u.a)(d,2),r=s[0],j=s[1],f=Object(c.useState)(void 0),v=Object(u.a)(f,2),b=v[0],g=v[1];console.log("Predictions:",null===n||void 0===n?void 0:n[0]),Object(c.useEffect)((function(){l.a({flipHorizontal:!1,imageScaleFactor:1,maxNumBoxes:20,iouThreshold:.5,scoreThreshold:.85}).then((function(e){g(e),j(function(){var e=document.querySelector("#video");return e.width=500,e.height=500,navigator.mediaDevices.getUserMedia&&(console.log(navigator.mediaDevices.getUserMedia),navigator.mediaDevices.getUserMedia({video:!0}).then((function(t){e.srcObject=t})).catch((function(e){console.log("Something went wrong!")}))),e}())}))}),[]);return Object(o.jsx)("div",{id:"container",children:b?Object(o.jsxs)(i.a.Fragment,{children:[Object(o.jsx)("video",{autoPlay:!0,id:"video"}),Object(o.jsx)("button",{onClick:function e(){b.detect(r).then((function(t){var n;(a(t),void 0!==t)&&h(null===(n=t[0])||void 0===n?void 0:n.bbox,r);e()}))},children:"Predict Pose"}),Object(o.jsx)("canvas",{id:"myCanvas"})]}):Object(o.jsx)("span",{children:"Loading model"})})},h=function(e,t){if(void 0!==e){var n=document.querySelector("canvas"),o=n.getContext("2d");n.height=t.videoHeight,n.width=t.videoWidth,o.clearRect(0,0,n.width,n.height),o.drawImage(t,0,0),o.beginPath(),o.lineWidth=4,o.strokeStyle="red",o.rect(e[0],e[1],e[2],e[3]),o.stroke()}};var f=function(){return Object(o.jsxs)("div",{className:"App",children:[Object(o.jsx)(r,{}),Object(o.jsx)(j,{})]})};d.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(f,{})}),document.getElementById("root"))}},[[212,1,2]]]);
//# sourceMappingURL=main.042ef35b.chunk.js.map