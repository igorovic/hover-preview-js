/*!
 * hover-preview-js v2.0.5 - Adds hoverable video and image previews to elements in Vanilla JS.
 * Copyright emy (sixem) (c) 2021 [https://github.com/sixem/hover-preview-js]
 * Build: 2021-02-21 (d63eb434469ec26188fd)
 * License: MIT
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hoverPreview"] = factory();
	else
		root["hoverPreview"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************************!*\
  !*** ./index.js + 3 modules ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": function() { return /* binding */ index; }\n});\n\n;// CONCATENATED MODULE: ./utils.js\n\n\nfunction getLeft(left, eWidth, offsetX) {\n  if (left) {\n    if (window.innerWidth - offsetX - 20 > eWidth) {\n      return offsetX + 20;\n    } else if (window.innerWidth > eWidth) {\n      return window.innerWidth - eWidth;\n    }\n  } else {\n    if (eWidth < offsetX - 20) {\n      return offsetX - eWidth - 20;\n    } else {\n      return 0;\n    }\n  }\n\n  return 0;\n}\n\nfunction getTop(offset, dimensions) {\n  var wHeight = window.innerHeight;\n\n  if (dimensions.y >= wHeight) {\n    return 0;\n  }\n\n  var percentage = offset.y / wHeight * 100;\n  percentage = percentage > 100 ? 100 : percentage;\n  return wHeight / 100 * percentage - dimensions.y / 100 * percentage;\n}\n\nfunction move(left, element, data) {\n  var offset = data.offset,\n      dimensions = data.dimensions;\n  element.style['left'] = getLeft(left, element.clientWidth, offset.x) + 'px';\n  element.style['top'] = getTop(offset, dimensions) + 'px';\n  return false;\n}\n\nfunction getMove() {\n  if (window.requestAnimationFrame) {\n    return function (left, element, data) {\n      window.requestAnimationFrame(function () {\n        move(left, element, data);\n      });\n    };\n  }\n\n  return function (left, element, data) {\n    move(left, element, data);\n  };\n}\nfunction getType() {\n  this.data.extension = this.data.src.split('.').pop().toLowerCase();\n\n  if (['jpg', 'jpeg', 'gif', 'png', 'ico', 'svg', 'bmp', 'webp'].includes(this.data.extension)) {\n    return 0;\n  } else if (['webm', 'mp4'].includes(this.data.extension)) {\n    return 1;\n  }\n\n  return null;\n}\nfunction destroy(e) {\n  if (this.options.cursor && e.target.style.cursor === 'progress') {\n    e.target.style.cursor = this.data.cursor ? this.data.cursor : '';\n    this.data.cursor = null;\n  }\n\n  var container = document.querySelector('.preview-container');\n\n  if (container) {\n    container.remove();\n  }\n\n  clearTimeout(this.timers.delay);\n  clearInterval(this.timers.load);\n  this.loaded = false;\n}\nfunction createContainer(options) {\n  var container = document.createElement('div');\n  container.addEventListener('click', function (e) {\n    e.preventDefault();\n    e.stopPropagation();\n    destroy.apply(options.hoverPreview, [e]);\n  });\n  container.addEventListener('touchend', function (e) {\n    e.preventDefault();\n    e.stopPropagation();\n    destroy.apply(options.hoverPreview, [e]);\n  });\n  container.className = 'preview-container';\n  var styles = {\n    'display': options.touch ? 'flex' : 'inherit',\n    'flex-direction': 'row',\n    'align-content': 'center',\n    'justify-content': 'center',\n    'pointer-events': options.touch ? 'inherit' : 'none',\n    'position': 'fixed',\n    'visibility': 'hidden',\n    'z-index': '9999',\n    'top': options.touch ? '0px' : '-9999px',\n    'left': options.touch ? '0px' : '-9999px',\n    'width': options.touch ? '100vw' : 'inherit',\n    'max-width': '100vw',\n    'background-color': options.touch ? 'rgba(0,0,0, 0.8)' : 'inherit',\n    'height': options.touch ? '100vh' : 'inherit',\n    'max-height': options.touch ? 'unset' : 'calc(100vh - 20px)'\n  };\n  Object.keys(styles).forEach(function (key) {\n    container.style[key] = styles[key];\n  });\n  return container;\n}\n\nfunction encodeUrl(input) {\n  return this.options.encodeAll ? encodeURI(input).replace('#', '%23').replace('?', '%3F') : encodeURI(input);\n}\n\nfunction loadImage(src, callback) {\n  var img = document.createElement('img'),\n      _this = this;\n\n  img.style['max-width'] = 'inherit';\n  img.style['max-height'] = 'inherit';\n  img.style['object-fit'] = 'contain';\n  img.src = encodeUrl.call(_this, src);\n  _this.timers.load = setInterval(function () {\n    var w = img.naturalWidth,\n        h = img.naturalHeight;\n\n    if (w && h) {\n      clearInterval(_this.timers.load);\n      callback(img, [w, h]);\n    }\n  }, 30);\n}\nfunction loadVideo(src, callback) {\n  var video = document.createElement('video'),\n      source = video.appendChild(document.createElement('source'));\n  ['muted', 'loop', 'autoplay'].forEach(function (key) {\n    video[key] = true;\n  });\n  source.type = 'video/' + this.data.extension;\n  source.src = encodeUrl.call(this, src);\n  video.style['max-width'] = 'inherit';\n  video.style['max-height'] = 'inherit';\n\n  video.onloadedmetadata = function () {\n    callback(video, [this.videoWidth, this.videoHeight]);\n  };\n}\n;// CONCATENATED MODULE: ./events.js\n\n\n\n\nfunction setOffset(e) {\n  this.data.offset = {\n    x: e.clientX,\n    y: e.clientY\n  };\n}\n\nfunction onEnter(e) {\n  var target = e.target;\n  var touch = e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || e.type === 'touchend';\n  this._touch = touch; // get source\n\n  if (Object.prototype.hasOwnProperty.call(this.options, 'source') && this.options.source) {\n    this.data.src = this.options.source;\n  } else {\n    if (target.hasAttribute('data-src')) {\n      this.data.src = target.getAttribute('data-src');\n    } else if (target.hasAttribute('src')) {\n      this.data.src = target.getAttribute('src');\n    } else if (target.hasAttribute('href')) {\n      this.data.src = target.getAttribute('href');\n    }\n  }\n\n  if (this.data.src === null) {\n    throw Error('No valid source value found.');\n  } // get source type\n\n\n  this.data.type = getType.call(this); // if valid source type\n\n  if (this.data.type != null) {\n    var _this = this; // whether the cursor is on the left or ride side of the viewport\n\n\n    this.data.left = this.data.offset.x <= window.innerWidth / 2; // create preview container\n\n    var container;\n\n    if (document.body.firstChild) {\n      container = document.body.insertBefore(createContainer({\n        touch: touch,\n        hoverPreview: _this\n      }), document.body.firstChild);\n    } else {\n      container = document.body.appendChild(createContainer({\n        touch: touch,\n        hoverPreview: _this\n      }));\n    } // change cursor style if option is set\n\n\n    if (this.options.cursor && this.data.cursor === null) {\n      this.data.cursor = target.style.cursor;\n      target.style.cursor = 'progress';\n    } // handle image type\n\n\n    if (this.data.type === 0 || this.data.type === 1) {\n      // wait for media to show its dimensions\n      (this.data.type === 0 ? loadImage : loadVideo).call(this, this.data.src, function (e, dimensions) {\n        container.appendChild(e);\n        _this.data.container = container;\n        _this.data.dimensions = {\n          x: dimensions[0],\n          y: dimensions[1]\n        };\n        _this.loaded = true;\n\n        if (!touch) {\n          update.call(_this);\n        }\n\n        container.style['visibility'] = 'visible'; // media is loaded, revert loading cursor\n\n        if (_this.options.cursor) {\n          target.style.cursor = _this.data.cursor ? _this.data.cursor : '';\n        }\n      });\n    }\n  }\n}\n\nfunction update() {\n  this.updater(this.data.left, this.data.container, {\n    dimensions: this.data.dimensions,\n    offset: {\n      x: this.data.offset.x,\n      y: this.data.offset.y\n    }\n  });\n}\n\nfunction mousemove(e) {\n  setOffset.call(this, e);\n\n  if (!this.loaded) {\n    return false;\n  }\n\n  update.call(this);\n}\nfunction mouseenter(e) {\n  setOffset.call(this, e);\n\n  var _this = this;\n\n  if (this.options.delay && this.options.delay > 0) {\n    this.timers.delay = setTimeout(function () {\n      onEnter.call(_this, e);\n    }, this.options.delay);\n  } else {\n    onEnter.call(_this, e);\n  }\n} // destroy preview container\n\nfunction mouseleave(e) {\n  destroy.call(this, e);\n}\n;// CONCATENATED MODULE: ./hover-preview.js\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar defaults = {\n  delay: 75,\n  encodeAll: false,\n  cursor: true\n};\n\nvar hoverPreview = /*#__PURE__*/function () {\n  function hoverPreview(element) {\n    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, hoverPreview);\n\n    if (!element) {\n      throw Error('No element were passed.');\n    }\n\n    this.element = element;\n    this.options = options;\n    setup.call(this);\n  }\n\n  _createClass(hoverPreview, [{\n    key: \"reload\",\n    value: function reload() {\n      this.destroy();\n      setup.call(this);\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      var events = this.events;\n      this.handle.removeEventListener('mouseenter', events.mouseenter, false);\n      this.handle.removeEventListener('mouseleave', events.mouseleave, false);\n      this.handle.removeEventListener('mousemove', events.mousemove, false);\n      this.handle.removeEventListener('touchend', events.mouseenter, false);\n    }\n  }]);\n\n  return hoverPreview;\n}();\n\nfunction setup() {\n  // set options and data\n  this.options = _objectSpread(_objectSpread({}, defaults), this.options);\n  this.data = {\n    cursor: null,\n    left: null,\n    src: null,\n    type: null,\n    offset: null,\n    dimensions: null\n  };\n  this.timers = {\n    load: null,\n    delay: null\n  }; // set handle\n\n  this.handle = this.element; // move function\n\n  this.updater = getMove();\n  this.events = {\n    mouseenter: mouseenter.bind(this),\n    mouseleave: mouseleave.bind(this),\n    mousemove: mousemove.bind(this)\n  }; // add events\n\n  this.handle.addEventListener('mouseenter', this.events.mouseenter, false);\n  this.handle.addEventListener('mouseleave', this.events.mouseleave, false);\n  this.handle.addEventListener('mousemove', this.events.mousemove, false);\n  this.handle.addEventListener(\"touchend\", this.events.mouseenter, false);\n} // export default\n\n\n/* harmony default export */ var hover_preview = (function (element, options) {\n  return new hoverPreview(element, options);\n});\n;// CONCATENATED MODULE: ./index.js\n\n/* harmony default export */ var index = (hover_preview);\n\n//# sourceURL=webpack://hoverPreview/./index.js_+_3_modules?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});