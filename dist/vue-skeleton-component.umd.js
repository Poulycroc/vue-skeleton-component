(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-skeleton-component"] = factory();
	else
		root["vue-skeleton-component"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 428:
/***/ (function(module) {

/**
 * @author      PoulycrocStudio <poulycroc.studio@gmail.com>
 */

/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isNil = (any) => {
  return (
    any === undefined || any === null || any === "undefined" || any === "null"
  );
};

/**
 * Check if element is an object
 * @param {*} any
 * @return {Boolean}
 */
const isObj = (any) => {
  if (isNil(any)) return false;
  return typeof any === "object" && !Array.isArray(any);
};

/**
 * Select only element from model object
 * @param {Object} model - ex: { fname:null, lname:null }
 * @param {Object} object - ex: { fname:"xyz", lname:"abc", age:23 }
 * @return {Object} - ex: { fname:"xyz", lname:"abc" }
 */
const objPick = (model, object) => {
  if (isNil(model) || isNil(object)) return null;
  const res = {};
  Object.keys(model).forEach((key) => (res[key] = object[key]));
  return res;
};

/**
 * Check if element is null or undefined
 * @param {*} any - String to convert
 * @return {Boolean}
 */
const isBlank = (str) => {
  return !str || /^\s*$/.test(str);
};

/**
 * Check if object or array is empty
 * @param {Array or Object} elem
 * @return {Boolean}
 */
const isEmpty = (elem) => {
  if (!isNil(elem)) {
    if (isObj(elem)) {
      return Object.entries(elem).length === 0 && elem.constructor === Object;
    } else if (Array.isArray(elem)) {
      return elem.length === 0;
    } else {
      throw new Error("Only accept 'Array' or 'Object'");
    }
  } else {
    throw new Error("Can't check if 'null' or 'undefined' is empty");
  }
};

/**
 * Check if is valid date
 * @param {String} date
 * @return {Boolean}
 */
const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

/**
 * get Children's object by position
 * @param {Object} obj - Object to pars
 * @param {Number} numb - Children position we want
 * @return {Object}
 */
const getChildrenN = (obj, numb) => {
  if (isNil(obj) && !isObj(obj)) return;
  if (isNil(numb)) return;
  const keys = Object.keys(obj);
  const key = keys[numb];
  return obj[key];
};

/**
 * @param {Object} obj - String to convert
 * @return {String}
 */
const getObjKeyName = (obj) => {
  if (isNil(obj) && !isObj(obj)) return;
  return Object.keys(obj)[0];
};

/**
 * Omit one or multiple keys from Object
 *
 * Inspiret from lodash'omit helper
 * @param {Array} keys
 * @param {Object} obj
 */
const omit = (keys, obj) => {
  if (isNil(keys) || isNil(obj)) return null;
  if (!isObj(obj) || !Array.isArray(keys)) return null;
  const _o = Object.entries(obj);
  return Object.fromEntries(_o.filter(([k]) => !keys.includes(k)));
};

/**
 * Detect if it's an Array or Object
 * @param {Object or Array} a
 * @param {Object or Array} b
 * @return {Boolean}
 */
const isEqual = (a, b) => {
  if (arguments.length < 2) throw Error("You only can compar 2 element");

  Object.compare = function (obj1, obj2) {
    //Loop through properties in object 1
    for (var p in obj1) {
      //Check property exists on both objects
      if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

      switch (typeof obj1[p]) {
        //Deep compare objects
        case "object":
          if (!Object.compare(obj1[p], obj2[p])) return false;
          break;
        //Compare function code
        case "function":
          if (
            typeof obj2[p] == "undefined" ||
            (p != "compare" && obj1[p].toString() != obj2[p].toString())
          )
            return false;
          break;
        //Compare values
        default:
          if (obj1[p] != obj2[p]) return false;
      }
    }

    //Check object 2 for any extra properties
    for (var p in obj2) if (isNil(obj1[p])) return false;
    return true;
  };

  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length) return false;

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) return false;
      } else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  };

  const isObject = isObj(a) && isObj(b);
  const isArray = Array.isArray(a) && Array.isArray(b);

  if (isObject) return Object.compare(a, b);
  if (isArray) return a.equals(b);

  throw new Error("Can only compare 'Arrays' or 'Object'");
};

/**
 * @param {Array or Object} source
 * @return {*}
 */
const deepCopy = (source) => {
  if (!isObj(source)) return source;
  const result = {};
  for (let key in source) {
    result[key] =
      typeof source[key] === "object"
        ? this.deepCopy(source[key])
        : source[key];
  }
  return result;
};

/**
 * transform string in Object path
 * @param source {Array|Object}
 * @param string {String}
 * @returns Object path
 */
const convertStringToPropGetter = (source, string) => {
  if (isNil(string)) return;
  return string.split(".").reduce((o, i) => o[i], source);
};

/**
 * Gonna rend a string of params
 * @param {Object} obj
 * @return {String}
 */
const constructQueries = (obj) => {
  const arr = [];
  Object.keys(obj).forEach((key) => arr.push(`${key}=${obj[key]}`));
  return arr.join("&");
};

/**
 * Get child object form value
 * from Object or Array
 *
 * only use if your value is inside a object
 *
 * @param {Array or Object} focus
 * @param {String} keyName - in wich key
 * @param {Any} value - searched value
 * @return {Object}
 */
const getObjectFromValue = (focus, keyName, value) => {
  if (isNil(focus) || isNil(keyName) || isNil(value)) return null;

  let res = null;
  if (Array.isArray(focus)) {
    focus.forEach((elem) => {
      if (elem[keyName] === value) res = elem;
    });
  } else {
    Object.keys(focus).forEach((elem) => {
      if (focus[elem][keyName] === value) res = focus[elem];
    });
  }
  return res;
};

/**
 * Return only object's keys needed
 * @param {Array} keys
 * @param {Object} obj
 * @return {Object}
 */
const only = (keys, obj) => {
  if (isNil(keys) || isNil(obj))
    throw new Error("'keys' or 'obj' can't be 'null' or 'undefined'");
  if (!Array.isArray(keys)) throw new Error("First param need to be an Array");
  if (!isObj(obj)) throw new Error("Second param need to be an Object");

  const res = {};
  keys.forEach((key) => {
    Object.assign(res, { [key]: obj[key] });
  });
  return res;
};

/**
 * @param {String} string
 * @return {Boolean}
 */
const isDigitsOnly = (string) => {
  return [...string].every((c) => "0123456789".includes(c));
};

/**
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */
const hasOwnProperty = (obj, key) => {
  if (isNil(obj) || isNil(key)) return false;
  if (!isObj(obj)) throw new Error("First param need to be an 'Object'");
  return Object.prototype.hasOwnProperty.call(obj, key);
};

/**
 * @param {Object} source
 * @param {Boolean} condition
 * @param {Object} merge
 * @return {Object}
 */
const mergeObjIf = (source = {}, condition = false, merge = {}) => {
  if (isNil(source) || isNil(merge))
    throw new Error("Can't merge 'null' or 'undefined'");

  if (!isObj(source) || !isObj(merge))
    throw new Error("Can only merge 'Object'");

  const _m = condition ? merge : {};
  return Object.assign({}, source, _m);
};

const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (isNil(obj[key])) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
};

/**
 * Remove duplicated value from array
 * @param {Array} arr
 * @return {Array}
 */
const removeDuplicates = (arr) => {
  if (isNil(arr)) throw new Error("Can't work on undifined value");
  if (!Array.isArray(arr)) throw new Error("Only accept 'Array'");
  const uniques = [];
  arr.forEach((e) => {
    if (!uniques.includes(e)) uniques.push(e);
  });
  return uniques;
};

/**
 * @param {Array} arr
 * @param {Number} val
 * @return {*}
 */
const arrIndexOf = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == val) return i;
  }
  return -1;
};

/**
 * generate a random string
 * @param {Number} length - length of random string
 * @return {String}
 */
const makeKey = (length) => {
  const n = isNil(length) ? 6 : length;
  let result = "";
  const chr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const chrLength = chr.length;
  for (let i = 0; i < n; i++) {
    result += chr.charAt(Math.floor(Math.random() * chrLength));
  }
  return result;
};

/**
 * generating embed vo
 * @param {Number} url - url's video
 * @return {String}
 */
const embedYtVideo = (url) => {
  if (!url.includes("youtu")) throw new Error("Only accept YouTube url");
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) return match[2];
  return "error";
};

/**
 * Convert string to lowercase
 * @param {String} str - String to convert
 * @return {String}
 */
const lower = (str) => {
  return str.toLowerCase();
};

/**
 * Convert CamelCaseString to kebab-case-string
 * @param {String} str - String to convert
 * @return {String}
 */
const toKebabCase = (str) => {
  if (isNil(str)) return null;
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

/**
 * Convert CamelCaseString to snake_case
 * @param {String} str - String to convert
 * @return {String}
 */
const toSnakeCase = (str) => {
  if (isNil(str)) return null;
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
};

/**
 * Convert number like '2' into '02'
 * @param {Number or String} int
 * @return {String}
 */
const addZero = (int) => {
  if (isNil(int)) throw new Error("Value can't be 'null' or 'undefined'");
  if (isNaN(int)) throw new Error("'addZero' only accept 'Int' or 'Number'");
  return int < 10 ? `0${int}` : `${int}`;
};

/**
 * First letter in uppercase
 * @param {String} str
 * @return {String}
 */
const capitalize = (str) => {
  if (isNil(str)) throw new Error("Value can't be 'null' or 'undefined'");
  if (typeof str !== "string" || !str instanceof String)
    throw new Error("Value need to be a string");
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Pluralize
 * @param {String} singular
 * @param {Number} count
 * @param {String|null} plural
 * @return {string}
 */
const pluralize = (singular, count = 1, plural = null) => {
  if (isNil(singular)) throw new Error("Value can't be 'null' or 'undefined'");
  if (typeof singular !== "string" || !singular instanceof String)
    throw new Error("Value need to be a string");
  if (isNil(plural)) return count > 1 ? `${singular}s` : singular;
  return count > 1 || count === 0 ? plural : singular;
};

module.exports = {
  isNil,
  isObj,
  isBlank,
  mergeObjIf,
  isEmpty,
  isValidDate,
  hasOwnProperty,
  objPick,
  only,
  isDigitsOnly,
  getChildrenN,
  getObjKeyName,
  omit,
  isEqual,
  deepCopy,
  convertStringToPropGetter,
  constructQueries,
  getObjectFromValue,
  groupByKey,
  removeDuplicates,
  arrIndexOf,
  makeKey,
  embedYtVideo,
  lower,
  toKebabCase,
  toSnakeCase,
  addZero,
  capitalize,
  pluralize,
};


/***/ }),

/***/ 679:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__(679)
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/@poulycroc/js-utils/utils.js
var utils = __webpack_require__(428);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/pug-plain-loader/index.js!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Button.vue?vue&type=template&id=00377c30&lang=pug&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "button-skeleton--component-wrapper",
    class: _vm.rendPositionClass,
    attrs: {
      "id": _vm.componentRef
    }
  }, [_c('div', {
    staticClass: "element button",
    class: _vm.rendClass,
    style: _vm.rendStyle
  })]);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Button.vue?vue&type=script&lang=js&
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var mapHeight = {
  big: '51px',
  default: '40px',
  medium: '36px',
  small: '32px',
  mini: '28px'
};
var authorizedSizes = Object.keys(mapHeight);
/* harmony default export */ var Buttonvue_type_script_lang_js_ = ({
  name: 'ButtonComponent',
  props: {
    full: {
      type: Boolean,
      required: false,
      default: false
    },
    circle: {
      type: Boolean,
      required: false,
      default: false
    },
    round: {
      type: Boolean,
      required: false,
      default: false
    },
    width: {
      type: Number,
      required: false,
      default: 100
    },
    size: {
      type: String,
      required: false,
      default: 'default',
      validator: function validator(v) {
        return authorizedSizes.includes(v);
      }
    },
    centered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    /**
     * @return {Object}
     */
    rendClass: function rendClass() {
      return {
        'is-full': this.full,
        'is-circle': this.circle,
        'is-round': this.round
      };
    },
    /**
     * @return {Object}
     */
    rendStyle: function rendStyle() {
      return _objectSpread(_objectSpread({}, this.rendBaseStyle), {}, {
        width: "".concat(this.width, "px"),
        height: mapHeight[this.size]
      });
    },
    /**
     * @return {String}
     */
    rendPositionClass: function rendPositionClass() {
      if (!this.centered) return;
      return 'centered_content';
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Button.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Buttonvue_type_script_lang_js_ = (Buttonvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/components/Button.vue





/* normalize component */
;
var component = normalizeComponent(
  components_Buttonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Button = (component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/pug-plain-loader/index.js!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Forme.vue?vue&type=template&id=4d8c2ee6&lang=pug&
var Formevue_type_template_id_4d8c2ee6_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "forme-skeleton--component-wrapper",
    attrs: {
      "id": _vm.componentRef
    }
  }, [_c('div', {
    staticClass: "element forme",
    class: _vm.rendClass,
    style: _vm.rendStyle
  })]);
};
var Formevue_type_template_id_4d8c2ee6_lang_pug_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Forme.vue?vue&type=script&lang=js&
function Formevue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return Formevue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Formevue_type_script_lang_js_typeof(obj); }
function Formevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function Formevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? Formevue_type_script_lang_js_ownKeys(Object(source), !0).forEach(function (key) { Formevue_type_script_lang_js_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : Formevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Formevue_type_script_lang_js_defineProperty(obj, key, value) { key = Formevue_type_script_lang_js_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Formevue_type_script_lang_js_toPropertyKey(arg) { var key = Formevue_type_script_lang_js_toPrimitive(arg, "string"); return Formevue_type_script_lang_js_typeof(key) === "symbol" ? key : String(key); }
function Formevue_type_script_lang_js_toPrimitive(input, hint) { if (Formevue_type_script_lang_js_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Formevue_type_script_lang_js_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var authorizedTypes = ['square', 'round', 'circle'];
/* harmony default export */ var Formevue_type_script_lang_js_ = ({
  name: 'FormeComponent',
  props: {
    type: {
      type: String,
      required: false,
      default: 'square',
      validator: function validator(v) {
        return authorizedTypes.includes(v);
      }
    },
    centered: {
      type: Boolean,
      required: false,
      default: false
    },
    mq: {
      type: Object,
      required: false,
      default: null
    },
    size: {
      type: [Number, String],
      default: null
    }
  },
  data: function data() {
    return {
      responsiveState: {
        size: this.size
      }
    };
  },
  computed: {
    /**
     * @return {String}
     */
    rendSizeStyle: function rendSizeStyle() {
      var size = this.responsiveState.size;
      return {
        maxWidth: "".concat(size, "px"),
        maxHeight: "".concat(size, "px"),
        minWidth: "".concat(size, "px"),
        minHeight: "".concat(size, "px"),
        width: "".concat(size, "px"),
        height: "".concat(size, "px")
      };
    },
    /**
     * @param {Object}
     */
    rendStyle: function rendStyle() {
      return Formevue_type_script_lang_js_objectSpread(Formevue_type_script_lang_js_objectSpread({}, this.rendBaseStyle), this.rendSizeStyle);
    },
    /**
     * @return {String}
     */
    rendClass: function rendClass() {
      return [this.type, this.rendSizeStyle];
    }
  },
  mounted: function mounted() {
    if (process.browser) {
      window.addEventListener('resize', this.mqChanger);
    }
    this.mqChanger();
  },
  beforeDestroy: function beforeDestroy() {
    if (process.browser) {
      window.removeEventListener('resize', this.mqChanger);
    }
  },
  methods: {
    /**
     * @param {Array} arr
     * @param {*} goal
     * @return {any}
     */
    getClosestBiggerInt: function getClosestBiggerInt(arr, goal) {
      for (var i = 0; i < arr.length; i++) {
        var arrInt = Number(arr[i]);
        var goalInt = Number(goal);
        if (arrInt > goalInt) {
          return arrInt !== undefined ? arrInt : null;
        }
      }
    },
    mqChanger: function mqChanger() {
      if (this.mq === null) return;
      var s = process.browser ? window.innerWidth : 0;
      var responsiveMap = Object.keys(this.mq);
      var targetKey = this.getClosestBiggerInt(responsiveMap, s);
      // if (s <= ) return users[Number(key)]
      this.responsiveState.size = !this.$utils.isNil(targetKey) ? this.mq[targetKey].size : this.size;

      // this.vpWidth = s
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Forme.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Formevue_type_script_lang_js_ = (Formevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Forme.vue





/* normalize component */
;
var Forme_component = normalizeComponent(
  components_Formevue_type_script_lang_js_,
  Formevue_type_template_id_4d8c2ee6_lang_pug_render,
  Formevue_type_template_id_4d8c2ee6_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Forme = (Forme_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/pug-plain-loader/index.js!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Line.vue?vue&type=template&id=142c3b60&lang=pug&
var Linevue_type_template_id_142c3b60_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "line-skeleton--component-wrapper",
    attrs: {
      "id": _vm.componentRef
    }
  }, [_c('div', {
    staticClass: "element line",
    class: _vm.rendClass,
    style: _vm.rendStyle
  })]);
};
var Linevue_type_template_id_142c3b60_lang_pug_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Line.vue?vue&type=script&lang=js&
function Linevue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return Linevue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Linevue_type_script_lang_js_typeof(obj); }
function Linevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function Linevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? Linevue_type_script_lang_js_ownKeys(Object(source), !0).forEach(function (key) { Linevue_type_script_lang_js_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : Linevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Linevue_type_script_lang_js_defineProperty(obj, key, value) { key = Linevue_type_script_lang_js_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Linevue_type_script_lang_js_toPropertyKey(arg) { var key = Linevue_type_script_lang_js_toPrimitive(arg, "string"); return Linevue_type_script_lang_js_typeof(key) === "symbol" ? key : String(key); }
function Linevue_type_script_lang_js_toPrimitive(input, hint) { if (Linevue_type_script_lang_js_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Linevue_type_script_lang_js_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Linevue_type_script_lang_js_authorizedTypes = ['p', 'h1', 'h2', 'h3'];
/* harmony default export */ var Linevue_type_script_lang_js_ = ({
  name: 'LineComponent',
  props: {
    lines: {
      type: Number,
      required: false,
      default: 3
    },
    height: {
      // in pixel
      type: Number,
      required: false,
      default: null
    },
    width: {
      // in pixel
      type: Number,
      required: false,
      default: 100
    },
    type: {
      type: String,
      required: false,
      default: 'p',
      validator: function validator(v) {
        return Linevue_type_script_lang_js_authorizedTypes.includes(v);
      }
    }
  },
  computed: {
    /**
     * @return {Object}
     */
    rendStyle: function rendStyle() {
      var _r = Linevue_type_script_lang_js_objectSpread(Linevue_type_script_lang_js_objectSpread({}, this.rendBaseStyle), {}, {
        width: "".concat(this.width, "px")
      });
      if (!this.$utils.isNil(this.height)) _r.height = "".concat(this.height, "px");
      return _r;
    },
    /**
     * @return {String}
     */
    rendClass: function rendClass() {
      var height = this.height,
        type = this.type;
      return this.$utils.isNil(height) ? "font_".concat(type) : '';
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Line.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Linevue_type_script_lang_js_ = (Linevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Line.vue





/* normalize component */
;
var Line_component = normalizeComponent(
  components_Linevue_type_script_lang_js_,
  Linevue_type_template_id_142c3b60_lang_pug_render,
  Linevue_type_template_id_142c3b60_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Line = (Line_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/pug-plain-loader/index.js!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Paragraph.vue?vue&type=template&id=43c35368&lang=pug&
var Paragraphvue_type_template_id_43c35368_lang_pug_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "paragraph-skeleton--component-wrapper",
    class: _vm.rendClass,
    attrs: {
      "id": _vm.componentRef
    }
  }, _vm._l(_vm.lines, function (n) {
    return _c('div', {
      key: n,
      staticClass: "element line",
      class: _vm.rendLineName(n),
      style: _vm.rendStyle
    });
  }), 0);
};
var Paragraphvue_type_template_id_43c35368_lang_pug_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/components/Paragraph.vue?vue&type=script&lang=js&
function Paragraphvue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return Paragraphvue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Paragraphvue_type_script_lang_js_typeof(obj); }
function Paragraphvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function Paragraphvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? Paragraphvue_type_script_lang_js_ownKeys(Object(source), !0).forEach(function (key) { Paragraphvue_type_script_lang_js_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : Paragraphvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Paragraphvue_type_script_lang_js_defineProperty(obj, key, value) { key = Paragraphvue_type_script_lang_js_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Paragraphvue_type_script_lang_js_toPropertyKey(arg) { var key = Paragraphvue_type_script_lang_js_toPrimitive(arg, "string"); return Paragraphvue_type_script_lang_js_typeof(key) === "symbol" ? key : String(key); }
function Paragraphvue_type_script_lang_js_toPrimitive(input, hint) { if (Paragraphvue_type_script_lang_js_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Paragraphvue_type_script_lang_js_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var authoriedAligns = ['left', 'right', 'center'];
/* harmony default export */ var Paragraphvue_type_script_lang_js_ = ({
  name: 'ParagraphComponent',
  props: {
    lines: {
      type: Number,
      required: false,
      default: 3
    },
    fontSize: {
      // in pixel
      type: Number,
      required: false,
      default: 18
    },
    align: {
      type: String,
      required: false,
      default: 'left',
      validator: function validator(v) {
        return authoriedAligns.includes(v);
      }
    }
  },
  computed: {
    /**
     * @return {Object}
     */
    rendStyle: function rendStyle() {
      return Paragraphvue_type_script_lang_js_objectSpread(Paragraphvue_type_script_lang_js_objectSpread({}, this.rendBaseStyle), {}, {
        height: "".concat(this.fontSize, "px")
      });
    },
    /**
     * @return {String}
     */
    rendClass: function rendClass() {
      return "is-align-".concat(this.align);
    }
  },
  methods: {
    /**
     * @param {Number} n - number
     * @return {String}
     */
    rendLineName: function rendLineName(n) {
      return "paragraph-line-".concat(n);
    }
  }
});
;// CONCATENATED MODULE: ./src/components/Paragraph.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Paragraphvue_type_script_lang_js_ = (Paragraphvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/components/Paragraph.vue





/* normalize component */
;
var Paragraph_component = normalizeComponent(
  components_Paragraphvue_type_script_lang_js_,
  Paragraphvue_type_template_id_43c35368_lang_pug_render,
  Paragraphvue_type_template_id_43c35368_lang_pug_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Paragraph = (Paragraph_component.exports);
;// CONCATENATED MODULE: ./src/services/components.service.js




/* harmony default export */ var components_service = ({
  Button: Button,
  Forme: Forme,
  Line: Line,
  Paragraph: Paragraph
});
;// CONCATENATED MODULE: ./src/mixins/component.mixin.js
var authorisedFloats = ['left', 'right'];
/* harmony default export */ var component_mixin = ({
  name: 'ComponentMixin',
  props: {
    margin: {
      type: String,
      required: false,
      default: null
    },
    float: {
      type: String,
      required: false,
      default: null,
      validator: function validator(v) {
        return authorisedFloats.includes(v);
      }
    }
  },
  computed: {
    /**
     * @param {String}
     */
    componentRef: function componentRef() {
      var k = this.$utils.makeKey(10);
      return "skeleton_component_".concat(k);
    },
    /**
     * @return {Object}
     */
    rendBaseStyle: function rendBaseStyle() {
      var _this$customPluginOpt = this.customPluginOptions,
        radius = _this$customPluginOpt.radius,
        gradientStart = _this$customPluginOpt.gradientStart,
        gradientEnd = _this$customPluginOpt.gradientEnd,
        fontP = _this$customPluginOpt.fontP,
        fontH1 = _this$customPluginOpt.fontH1,
        fontH2 = _this$customPluginOpt.fontH2,
        fontH3 = _this$customPluginOpt.fontH3;
      var _r = {
        '--radius': radius + 'px',
        '--gradient-start': gradientStart || '#ffffff',
        '--gradient-end': gradientEnd || '#e6e6e6',
        '--font-p': !this.$utils.isNil(fontP) ? "".concat(fontP, "px") : '18px',
        '--font-h1': !this.$utils.isNil(fontH1) ? "".concat(fontH1, "px") : '40px',
        '--font-h2': !this.$utils.isNil(fontH2) ? "".concat(fontH2, "px") : '33px',
        '--font-h3': !this.$utils.isNil(fontH3) ? "".concat(fontH3, "px") : '24px'
      };
      if (!this.$utils.isNil(this.margin)) _r.margin = this.margin;
      if (!this.$utils.isNil(this.float)) _r.float = this.float;
      return _r;
    }
  }
});
;// CONCATENATED MODULE: ./src/main.js
function main_typeof(obj) { "@babel/helpers - typeof"; return main_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, main_typeof(obj); }
function main_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function main_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? main_ownKeys(Object(source), !0).forEach(function (key) { main_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : main_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function main_defineProperty(obj, key, value) { key = main_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function main_toPropertyKey(arg) { var key = main_toPrimitive(arg, "string"); return main_typeof(key) === "symbol" ? key : String(key); }
function main_toPrimitive(input, hint) { if (main_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (main_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



// Import All Mixins


function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;
  Vue.prototype.$utils = utils;

  // Declare all components when options is not set or array is empty
  // Or when the user explicitely specify it
  for (var component in components_service) {
    if (!options || !options.components || options.components.length === 0 || options.components.includes(component)) {
      var componentName = "".concat(utils.toKebabCase(component), "-skeleton");
      Vue.component(componentName, {
        extends: components_service[component],
        mixins: [component_mixin],
        props: {
          customPluginOptions: {
            type: Object,
            default: function _default() {
              return main_objectSpread({}, options);
            }
          }
        }
      });
    }
  }
}

// Create module definition for Vue.use()
var main_plugin = {
  install: install
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof __webpack_require__.g !== 'undefined') {
  GlobalVue = __webpack_require__.g.Vue;
}
if (GlobalVue) GlobalVue.use(main_plugin);

// To allow use as module (npm/webpack/etc.) export components
/* harmony default export */ var main = (main_plugin);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (main);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=vue-skeleton-component.umd.js.map