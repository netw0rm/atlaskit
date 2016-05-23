!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory(require("skatejs")) : "function" == typeof define && define.amd ? define([ "skatejs" ], factory) : "object" == typeof exports ? exports.treyflippedButton = factory(require("skatejs")) : root.treyflippedButton = factory(root.skatejs);
}(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _index = __webpack_require__(1), _index3 = (_interopRequireDefault(_index), 
        __webpack_require__(2));
        _interopRequireDefault(_index3);
        //esling no-undef: 0
        exports["default"] = function() {
            return 0;
        };
    }, /* 1 */
    /***/
    function(module, exports) {
        module.exports = '<html>\n    <head>\n        <meta charset="utf-8">\n    </head>\n    <body>\n        <script type="text/javascript" src="bundle.js"></script>\n        <x-hello name="Blah">Hello, Blah!!</x-hello>\n    </body>\n</html>';
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _style = __webpack_require__(3), _skatejs = (_interopRequireDefault(_style), 
        __webpack_require__(7));
        exports["default"] = (0, _skatejs.skate)("x-hello", {
            properties: {
                name: {
                    attribute: !0
                }
            },
            render: function(elem) {
                _skatejs.vdom.text("BYE, " + elem.name);
            }
        });
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        // style-loader: Adds some css to the DOM by adding a <style> tag
        // load the styles
        var content = __webpack_require__(4);
        "string" == typeof content && (content = [ [ module.id, content, "" ] ]);
        // add the styles to the DOM
        __webpack_require__(6)(content, {});
        content.locals && (module.exports = content.locals);
    }, /* 4 */
    /***/
    function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(5)(), exports.push([ module.id, "", "" ]);
    }, /* 5 */
    /***/
    function(module, exports) {
        /*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
        // css base code, injected by the css-loader
        module.exports = function() {
            var list = [];
            // return the list of modules as css string
            // import a list of modules into the list
            return list.toString = function() {
                for (var result = [], i = 0; i < this.length; i++) {
                    var item = this[i];
                    item[2] ? result.push("@media " + item[2] + "{" + item[1] + "}") : result.push(item[1]);
                }
                return result.join("");
            }, list.i = function(modules, mediaQuery) {
                "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    "number" == typeof id && (alreadyImportedModules[id] = !0);
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    // skip already imported module
                    // this implementation is not 100% perfect for weird media query combinations
                    //  when a module is imported multiple times with different media queries.
                    //  I hope this will never occur (Hey this way we have smaller bundles)
                    "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                    list.push(item));
                }
            }, list;
        };
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function listToStyles(list) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        }
        function insertStyleElement(options, styleElement) {
            var head = getHeadElement(), lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
            if ("top" === options.insertAt) lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling) : head.appendChild(styleElement) : head.insertBefore(styleElement, head.firstChild), 
            styleElementsInsertedAtTop.push(styleElement); else {
                if ("bottom" !== options.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                head.appendChild(styleElement);
            }
        }
        function removeStyleElement(styleElement) {
            styleElement.parentNode.removeChild(styleElement);
            var idx = styleElementsInsertedAtTop.indexOf(styleElement);
            idx >= 0 && styleElementsInsertedAtTop.splice(idx, 1);
        }
        function createStyleElement(options) {
            var styleElement = document.createElement("style");
            return styleElement.type = "text/css", insertStyleElement(options, styleElement), 
            styleElement;
        }
        function createLinkElement(options) {
            var linkElement = document.createElement("link");
            return linkElement.rel = "stylesheet", insertStyleElement(options, linkElement), 
            linkElement;
        }
        function addStyle(obj, options) {
            var styleElement, update, remove;
            if (options.singleton) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement(options)), 
                update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
            } else obj.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (styleElement = createLinkElement(options), 
            update = updateLink.bind(null, styleElement), remove = function() {
                removeStyleElement(styleElement), styleElement.href && URL.revokeObjectURL(styleElement.href);
            }) : (styleElement = createStyleElement(options), update = applyToTag.bind(null, styleElement), 
            remove = function() {
                removeStyleElement(styleElement);
            });
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
            }
        }
        function applyToTag(styleElement, obj) {
            var css = obj.css, media = obj.media;
            if (media && styleElement.setAttribute("media", media), styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        function updateLink(linkElement, obj) {
            var css = obj.css, sourceMap = obj.sourceMap;
            sourceMap && (// http://stackoverflow.com/a/26603875
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */");
            var blob = new Blob([ css ], {
                type: "text/css"
            }), oldSrc = linkElement.href;
            linkElement.href = URL.createObjectURL(blob), oldSrc && URL.revokeObjectURL(oldSrc);
        }
        /*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
        var stylesInDom = {}, memoize = function(fn) {
            var memo;
            return function() {
                return "undefined" == typeof memo && (memo = fn.apply(this, arguments)), memo;
            };
        }, isOldIE = memoize(function() {
            return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
        }), getHeadElement = memoize(function() {
            return document.head || document.getElementsByTagName("head")[0];
        }), singletonElement = null, singletonCounter = 0, styleElementsInsertedAtTop = [];
        module.exports = function(list, options) {
            options = options || {}, "undefined" == typeof options.singleton && (options.singleton = isOldIE()), 
            "undefined" == typeof options.insertAt && (options.insertAt = "bottom");
            var styles = listToStyles(list);
            return addStylesToDom(styles, options), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, /* 7 */
    /***/
    function(module, exports) {
        module.exports = __WEBPACK_EXTERNAL_MODULE_7__;
    } ]);
});