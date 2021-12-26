System.register(["single-spa"],(function(e,t){var n={};return{setters:[function(e){n.addErrorHandler=e.addErrorHandler,n.checkActivityFunctions=e.checkActivityFunctions,n.getAppNames=e.getAppNames,n.getMountedApps=e.getMountedApps,n.mountRootParcel=e.mountRootParcel,n.navigateToUrl=e.navigateToUrl,n.pathToActiveWhen=e.pathToActiveWhen,n.registerApplication=e.registerApplication,n.removeErrorHandler=e.removeErrorHandler,n.start=e.start}],execute:function(){e((()=>{var e={722:(e,t,n)=>{const r=n(905).R;t.s=function(e){if(e||(e=1),!n.y.meta||!n.y.meta.url)throw console.error("__system_context__",n.y),Error("systemjs-webpack-interop was provided an unknown SystemJS context. Expected context.meta.url, but none was provided");n.p=r(n.y.meta.url,e)}},905:(e,t,n)=>{t.R=function(e,t){var n=document.createElement("a");n.href=e;for(var r="/"===n.pathname[0]?n.pathname:"/"+n.pathname,o=0,a=r.length;o!==t&&a>=0;)"/"===r[--a]&&o++;if(o!==t)throw Error("systemjs-webpack-interop: rootDirectoryLevel ("+t+") is greater than the number of directories ("+o+") in the URL path "+e);var i=r.slice(0,a+1);return n.protocol+"//"+n.host+i};Number.isInteger},645:e=>{"use strict";e.exports=n}},r={};function o(t){var n=r[t];if(void 0!==n)return n.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,o),a.exports}o.y=t,o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="";var a={};return(0,o(722).s)(1),(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}o.r(a);var t=o(645);function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function r(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||s(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){if(e){if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p="undefined"!=typeof window;function d(e,t){if("object"!==i(t)||Array.isArray(t)||null===t)throw Error("Invalid ".concat(e,": received ").concat(Array.isArray(t)?"array":t," but expected a plain object"))}function f(e,t){if("boolean"!=typeof t)throw Error("Invalid ".concat(e,": received ").concat(i(t),", but expected a boolean"))}function m(e,t,n,r){if(!r){var o=Object.keys(t),a=[];o.forEach((function(e){n.indexOf(e)<0&&a.push(e)})),a.length>0&&console.warn(Error("Invalid ".concat(e,": received invalid properties '").concat(a.join(", "),"', but valid properties are ").concat(n.join(", "))))}}function v(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if("string"!=typeof t||n&&""===t.trim())throw Error("Invalid ".concat(e,": received '").concat(t,"', but expected a").concat(n?" non-blank":""," string"))}function h(e,t){if(v(e,t),t.indexOf("/")<0)throw Error("Invalid ".concat(e,": received '").concat(t,"', but expected an absolute path that starts with /"))}function y(e,t,n){if(!Array.isArray(t)&&("object"!==i(i(t))||"number"!==t.length))throw Error("Invalid ".concat(e,": received '").concat(t,"', but expected an array"));for(var r=arguments.length,o=new Array(r>3?r-3:0),a=3;a<r;a++)o[a-3]=arguments[a];for(var c=0;c<t.length;c++)n.apply(void 0,[t[c],"".concat(e,"[").concat(c,"]")].concat(o))}function g(e,t){var n;return"/"===(n="/"===e.substr(-1)?"/"===t[0]?e+t.slice(1):e+t:"/"===t[0]?e+t:e+"/"+t).substr(-1)&&n.length>1&&(n=n.slice(0,n.length-1)),n}function b(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return e[n];return null}var w="undefined"!=typeof Symbol?Symbol():"@";function E(e,t){if(p)return e.getAttribute(t);var n=b(e.attrs,(function(e){return e.name===t.toLowerCase()}));return n?n.value:null}function N(e,t){return p?e.hasAttribute(t):e.attrs.some((function(e){return e.name===t}))}function A(e,t,n){if("application"===e.nodeName.toLowerCase()){if(e.childNodes.length>0)throw Error("<application> elements must not have childNodes. You must put in a closing </application> - self closing is not allowed");var r={type:"application",name:E(e,"name")},o=E(e,"loader");if(o)if(t.loaders&&t.loaders.hasOwnProperty(o))r.loader=t.loaders[o];else if(p)throw Error("Application loader '".concat(o,"' was not defined in the htmlLayoutData"));var a=E(e,"error");if(a)if(t.errors&&t.errors.hasOwnProperty(a))r.error=t.errors[a];else if(p)throw Error("Application error handler '".concat(o,"' was not defined in the htmlLayoutData"));return S(e,r,t),[r]}if("route"===e.nodeName.toLowerCase()){var i={type:"route",routes:[]},c=E(e,"path");c&&(i.path=c),N(e,"default")&&(i.default=!0),N(e,"exact")&&(i.exact=!0),S(e,i,t);for(var s=0;s<e.childNodes.length;s++){var l;(l=i.routes).push.apply(l,u(A(e.childNodes[s],t,n)))}return[i]}if("redirect"===e.nodeName.toLowerCase())return n.redirects[g("/",E(e,"from"))]=g("/",E(e,"to")),[];if("undefined"!=typeof Node&&e instanceof Node){if(e.nodeType===Node.TEXT_NODE&&""===e.textContent.trim())return[];if(e.childNodes&&e.childNodes.length>0){e.routes=[];for(var d=0;d<e.childNodes.length;d++){var f;(f=e.routes).push.apply(f,u(A(e.childNodes[d],t,n)))}}return[e]}if(e.childNodes){for(var m={type:e.nodeName.toLowerCase(),routes:[],attrs:e.attrs},v=0;v<e.childNodes.length;v++){var h;(h=m.routes).push.apply(h,u(A(e.childNodes[v],t,n)))}return[m]}return"#comment"===e.nodeName?[{type:"#comment",value:e.data}]:"#text"===e.nodeName?[{type:"#text",value:e.value}]:void 0}function S(e,t,n){for(var r=(E(e,"props")||"").split(","),o=0;o<r.length;o++){var a=r[o].trim();if(0!==a.length)if(t.props||(t.props={}),n.props&&n.props.hasOwnProperty(a))t.props[a]=n.props[a];else{if(p)throw Error("Prop '".concat(a,"' was not defined in the htmlLayoutData. Either remove this attribute from the HTML element or provide the prop's value"));t.props[a]=w}}}function x(e){return{bootstrap:function(){return Promise.resolve()},mount:function(t){return Promise.resolve().then((function(){t.domElement.innerHTML=e}))},unmount:function(e){return Promise.resolve().then((function(){e.domElement.innerHTML=""}))}}}function O(e){return t=["application","route","fragment","assets","redirect"],n=e.type,!t.some((function(e){return e===n}));var t,n}function P(e,t){var n,r;return!!e&&(r=t instanceof Node?t:function(e){switch(e.type){case"#text":return document.createTextNode(e.value);case"#comment":return document.createComment(e.value);default:var t=document.createElement(e.type);return e.attrs.forEach((function(e){t.setAttribute(e.name,e.value)})),t}}(t),(n=e).nodeType===r.nodeType&&n.nodeName===r.nodeName&&function(e,t){var n=e.getAttributeNames?e.getAttributeNames().sort():[],r=e.getAttributeNames?e.getAttributeNames().sort():[];return n.length===r.length&&!n.some((function(n){return e.getAttribute(n)!==t.getAttribute(n)}))}(n,r))}function C(e){var t=e.location,n=e.routes,r=e.parentContainer,o=e.previousSibling,a=e.shouldMount,i=e.applicationContainers;return n.forEach((function(e,n){if("application"===e.type){if(a){var c,u=j(e.name);i[e.name]?c=i[e.name]:document.getElementById(u)?c=document.getElementById(u):(c=document.createElement("div")).id=u,T(c,r,o),o=c}}else if("route"===e.type)o=C({location:t,routes:e.routes,parentContainer:r,previousSibling:o,shouldMount:a&&e.activeWhen(t),applicationContainers:i});else if(e instanceof Node||"string"==typeof e.type)if(a){if(!e.connectedNode){var s=e instanceof Node?e.cloneNode(!1):W(e);e.connectedNode=s}T(e.connectedNode,r,o),e.routes&&C({location:t,routes:e.routes,parentContainer:e.connectedNode,previousSibling:null,shouldMount:a,applicationContainers:i}),o=e.connectedNode}else(l=e.connectedNode)&&(l.remove?l.remove():l.parentNode.removeChild(l)),delete e.connectedNode;var l})),o}function L(e){for(var t=e.applicationName,n=e.location,r=e.routes,o=0;o<r.length;o++){var a=r[o];if("application"===a.type){if(a.name===t)return a}else if("route"===a.type){if(a.activeWhen(n)){var i=L({applicationName:t,location:n,routes:a.routes});if(i)return i}}else if(a.routes){var c=L({applicationName:t,location:n,routes:a.routes});if(c)return c}}}function T(e,t,n){var r=n?n.nextSibling:t.firstChild;r!==e&&t.insertBefore(e,r)}function j(e){return"single-spa-application:".concat(e)}function W(e){if("#text"===e.type.toLowerCase())return document.createTextNode(e.value);if("#comment"===e.type.toLowerCase())return document.createComment(e.value);var t=document.createElement(e.type);return(e.attrs||[]).forEach((function(e){t.setAttribute(e.name,e.value)})),t.routes&&t.routes.forEach((function(e){t.appendChild(W(e))})),t}function I(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location;return t["hash"===e.mode?"hash":"pathname"]}function M(e){try{return new URL(e)}catch(n){var t=document.createElement("a");return t.href=e,t}}function D(e){var n=[],r=(0,t.checkActivityFunctions)(e?M(e):location);return(0,t.getAppNames)().forEach((function(e){r.indexOf(e)<0&&n.push(e)})),n}function H(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return r(r({},e),t)}var R=document.querySelector("#single-spa-layout"),k=(R.innerHTML.match(/base\=\"(.+?)\"/)[1],function(e,n){if(e&&e.nodeName||"string"==typeof e){if(p&&!n&&window.singleSpaLayoutData&&(n=window.singleSpaLayoutData),"string"==typeof e){if(!p)throw Error("calling constructRoutes with a string on the server is not yet supported");if(!(e=(new DOMParser).parseFromString(e,"text/html").documentElement.querySelector("single-spa-router")))throw Error("constructRoutes should be called with a string HTML document that contains a <single-spa-router> element.")}e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("template"===e.nodeName.toLowerCase()&&(e=(e.content||e).querySelector("single-spa-router")),"single-spa-router"!==e.nodeName.toLowerCase())throw Error("single-spa-layout: The HTMLElement passed to constructRoutes must be <single-spa-router> or a <template> containing the router. Received ".concat(e.nodeName));p&&e.isConnected&&e.parentNode.removeChild(e);var n={routes:[],redirects:{}};E(e,"mode")&&(n.mode=E(e,"mode")),E(e,"base")&&(n.base=E(e,"base")),E(e,"containerEl")&&(n.containerEl=E(e,"containerEl"));for(var r=0;r<e.childNodes.length;r++){var o;(o=n.routes).push.apply(o,u(A(e.childNodes[r],t,n)))}return n}(e,n)}else if(n)throw Error("constructRoutes should be called either with an HTMLElement and layoutData, or a single json object.");return function(e){d("routesConfig",e);var n,r=e.disableWarnings;if(m("routesConfig",e,["mode","base","containerEl","routes","disableWarnings","redirects"],r),e.hasOwnProperty("containerEl")?function(e,t){if("string"==typeof t?""===t.trim():!(p&&t instanceof HTMLElement))throw Error("Invalid ".concat("routesConfig.containerEl",": received ").concat(t," but expected either non-blank string or HTMLElement"))}(0,e.containerEl):e.containerEl="body",e.hasOwnProperty("mode")||(e.mode="history"),function(e,t,n){if(n.indexOf(t)<0)throw Error("Invalid ".concat("routesConfig.mode",": received '").concat(t,"' but expected ").concat(n.join(", ")))}(0,e.mode,["history","hash"]),e.hasOwnProperty("base")?(v("routesConfig.base",e.base),e.base=(0!==(n=e.base).indexOf("/")&&(n="/"+n),"/"!==n[n.length-1]&&(n+="/"),n)):e.base="/",e.hasOwnProperty("redirects"))for(var o in d("routesConfig.redirects",e.redirects),e.redirects){var a=e.redirects[o];h("routesConfig.redirects key",o),h("routesConfig.redirects['".concat(o,"']"),a)}var i=p?window.location.pathname:"/",c="hash"===e.mode?i+"#":"";y("routesConfig.routes",e.routes,(function e(n,o,a){var i=a.parentPath,c=a.siblingActiveWhens,u=a.parentActiveWhen;if(d(o,n),"application"===n.type)m(o,n,["type","name","props","loader","error"],r),n.props&&d("".concat(o,".props"),n.props),v("".concat(o,".name"),n.name);else if("route"===n.type){m(o,n,["type","path","routes","props","default","exact"],r),n.hasOwnProperty("exact")&&f("".concat(o,".exact"),n.exact);var s,l=n.hasOwnProperty("path"),p=n.hasOwnProperty("default");if(l)v("".concat(o,".path"),n.path),s=g(i,n.path),n.activeWhen=(0,t.pathToActiveWhen)(s,n.exact),c.push(n.activeWhen);else{if(!p)throw Error("Invalid ".concat(o,": routes must have either a path or default property."));f("".concat(o,".default"),n.default),s=i,n.activeWhen=function(e,t){return function(n){return t(n)&&!e.some((function(e){return e(n)}))}}(c,u)}if(l&&p&&n.default)throw Error("Invalid ".concat(o,": cannot have both path and set default to true."));n.routes&&y("".concat(o,".routes"),n.routes,e,{parentPath:s,siblingActiveWhens:[],parentActiveWhen:n.activeWhen})}else{if("undefined"!=typeof Node&&n instanceof Node);else for(var h in n)"routes"!==h&&"attrs"!==h&&v("".concat(o,"['").concat(h,"']"),n[h],!1);n.routes&&y("".concat(o,".routes"),n.routes,e,{parentPath:i,siblingActiveWhens:c,parentActiveWhen:u})}}),{parentPath:c+e.base,parentActiveWhen:function(){return!0},siblingActiveWhens:[]}),delete e.disableWarnings}(e),e}(R));console.log(k);var U,_,B,q,F=(_=(U={routes:k,loadApp:function(e){var t=e.name;return System.import(t)}}).routes,B=U.loadApp,function e(t,n,r,o){o.forEach((function(o){"application"===o.type?(t[o.name]||(t[o.name]=[]),t[o.name].push({activeWhen:n,props:H(r,o.props),loader:o.loader})):"route"===o.type?e(t,o.activeWhen,H(r,o.props),o.routes):o.routes&&e(t,n,r,o.routes)}))}(q={},(function(){return!0}),{},_.routes),Object.keys(q).map((function(e){var n=q[e];return{name:e,customProps:function(e,t){var r=b(n,(function(e){return e.activeWhen(t)}));return r?r.props:{}},activeWhen:n.map((function(e){return e.activeWhen})),app:function(){var r;p&&(r=b(n,(function(e){return e.activeWhen(window.location)})));var o=B({name:e});return r&&r.loader?function(e,n,r){return Promise.resolve().then((function(){var o,a=j(e),i=document.getElementById(a);i||((i=document.createElement("div")).id=a,i.style.display="none",document.body.appendChild(i),o=function(){i.style.removeProperty("display"),""===i.getAttribute("style")&&i.removeAttribute("style"),window.removeEventListener("single-spa:before-mount-routing-event",o)},window.addEventListener("single-spa:before-mount-routing-event",o));var c="string"==typeof n.loader?x(n.loader):n.loader,u=(0,t.mountRootParcel)(c,{name:"application-loader:".concat(e),domElement:i});function l(){return u.unmount().then((function(){o&&o()}))}return Promise.all([u.mountPromise,r]).then((function(e){var t,n=function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),2!==a.length);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw o}}return a}}(t)||s(t,2)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();n[0];var r=n[1];return l().then((function(){return r}))}),(function(e){return l().then((function(){throw e}))}))}))}(e,r,o):o}}}))),X=function(e){var n=e.routes,r=e.active,o=void 0===r||r,a=!1,c={},u=p&&Boolean(window.singleSpaLayoutData);if(!n)throw Error("single-spa-layout constructLayoutEngine(opts): opts.routes must be provided. Value was ".concat(i(n)));var s=n.base.slice(0,n.base.length-1),l={isActive:function(){return a},activate:function(){a||(a=!0,p&&(window.addEventListener("single-spa:before-routing-event",f),window.addEventListener("single-spa:before-mount-routing-event",m),window.addEventListener("single-spa:routing-event",v),(0,t.addErrorHandler)(d),u&&h(y(),n.routes),m()))},deactivate:function(){a&&(a=!1,p&&(window.removeEventListener("single-spa:before-routing-event",f),window.removeEventListener("single-spa:before-mount-routing-event",m),window.removeEventListener("single-spa:routing-event",v),(0,t.removeErrorHandler)(d)))}};return o&&l.activate(),l;function d(e){var r=L({applicationName:e.appOrParcelName,location:window.location,routes:n.routes});if(r&&r.error){var o=document.getElementById(j(r.name)),a="string"==typeof r.error?x(r.error):r.error;c[r.name]=(0,t.mountRootParcel)(a,{domElement:o})}setTimeout((function(){throw e}))}function f(e){var r=e.detail,o=r.cancelNavigation,a=r.newUrl,u=I(n,M(a)),s=function(e){var r=n.redirects[e];if(e===u){if(!o)throw Error("single-spa-layout: <redirect> requires single-spa@>=5.7.0");return o(),setTimeout((function(){(0,t.navigateToUrl)(r)})),{v:void 0}}};for(var l in n.redirects){var p=s(l);if("object"===i(p))return p.v}var d=[];D(a).forEach((function(e){c[e]&&(d.push(c[e].unmount()),delete c[e])})),d.length>0&&(o(),Promise.all(d).then((function(){(0,t.navigateToUrl)(a)})))}function m(){if(0===I(n).indexOf(s)){var e=(0,t.getMountedApps)().reduce((function(e,t){return e[t]=document.getElementById(j(t)),e}),{});C({location:window.location,routes:n.routes,parentContainer:y(),shouldMount:!0,applicationContainers:e})}}function v(e){D(e.detail.newUrl).forEach((function(e){var t=document.getElementById(j(e));t&&t.isConnected&&t.parentNode.removeChild(t)}))}function h(e,t){if(e&&e.childNodes&&t)for(var n={nextSibling:e.childNodes[0]},r=0;r<t.length;r++){var o,a=t[r];if("route"!==a.type){for(var i=null===(o=n)||void 0===o?void 0:o.nextSibling;(null===(c=i)||void 0===c?void 0:c.nodeType)===Node.TEXT_NODE&&""===i.textContent.trim();){var c;i=i.nextSibling}n=i,O(a)&&P(i,a)&&(a.connectedNode=i),a.routes&&h(i,a.routes)}else h(e,a.routes)}}function y(){return"string"==typeof n.containerEl?document.querySelector(n.containerEl):n.containerEl}}({routes:k,applications:F});F.forEach((function(n){console.log(n),console.log(e(n.activeWhen)),(0,t.registerApplication)(n.name,n.app,(function(e){return n.activeWhen.map((function(t){return t(e)})).indexOf(!0)>-1}),n.customProps)})),X.activate(),(0,t.start)()})(),a})())}}}));
//# sourceMappingURL=hexive-root-config.js.map