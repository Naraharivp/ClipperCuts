"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"8a5a4f307c8c\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzBhODYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCI4YTVhNGYzMDdjOGNcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/ThemeToggle.jsx":
/*!************************************!*\
  !*** ./components/ThemeToggle.jsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ThemeToggle; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=Moon,Sun!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/sun.js\");\n/* harmony import */ var _barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=Moon,Sun!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/moon.js\");\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-themes */ \"(app-pages-browser)/./node_modules/next-themes/dist/index.mjs\");\n/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/button */ \"(app-pages-browser)/./components/ui/button.jsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction ThemeToggle() {\n    _s();\n    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme)();\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);\n    // Avoid hydration mismatch by only rendering after mount\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        setMounted(true);\n    }, []);\n    if (!mounted) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n            variant: \"ghost\",\n            size: \"icon\",\n            className: \"rounded-full w-9 h-9\"\n        }, void 0, false, {\n            fileName: \"E:\\\\Narahari\\\\BarberOne\\\\clippercuts\\\\components\\\\ThemeToggle.jsx\",\n            lineNumber: 18,\n            columnNumber: 12\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n        variant: \"ghost\",\n        size: \"icon\",\n        onClick: ()=>setTheme(theme === \"dark\" ? \"light\" : \"dark\"),\n        \"aria-label\": \"Toggle theme\",\n        className: \"rounded-full w-9 h-9\",\n        children: theme === \"dark\" ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n            className: \"h-5 w-5 text-yellow-300\"\n        }, void 0, false, {\n            fileName: \"E:\\\\Narahari\\\\BarberOne\\\\clippercuts\\\\components\\\\ThemeToggle.jsx\",\n            lineNumber: 30,\n            columnNumber: 9\n        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Moon_Sun_lucide_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n            className: \"h-5 w-5\"\n        }, void 0, false, {\n            fileName: \"E:\\\\Narahari\\\\BarberOne\\\\clippercuts\\\\components\\\\ThemeToggle.jsx\",\n            lineNumber: 32,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"E:\\\\Narahari\\\\BarberOne\\\\clippercuts\\\\components\\\\ThemeToggle.jsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, this);\n}\n_s(ThemeToggle, \"uGU5l7ciDSfqFDe6wS7vfMb29jQ=\", false, function() {\n    return [\n        next_themes__WEBPACK_IMPORTED_MODULE_1__.useTheme\n    ];\n});\n_c = ThemeToggle;\nvar _c;\n$RefreshReg$(_c, \"ThemeToggle\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvVGhlbWVUb2dnbGUuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFFd0M7QUFDRjtBQUNGO0FBQ087QUFFNUIsU0FBU007O0lBQ3RCLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUUsR0FBR04scURBQVFBO0lBQ3BDLE1BQU0sQ0FBQ08sU0FBU0MsV0FBVyxHQUFHTCwrQ0FBUUEsQ0FBQztJQUV2Qyx5REFBeUQ7SUFDekRELGdEQUFTQSxDQUFDO1FBQ1JNLFdBQVc7SUFDYixHQUFHLEVBQUU7SUFFTCxJQUFJLENBQUNELFNBQVM7UUFDWixxQkFBTyw4REFBQ04sOENBQU1BO1lBQUNRLFNBQVE7WUFBUUMsTUFBSztZQUFPQyxXQUFVOzs7Ozs7SUFDdkQ7SUFFQSxxQkFDRSw4REFBQ1YsOENBQU1BO1FBQ0xRLFNBQVE7UUFDUkMsTUFBSztRQUNMRSxTQUFTLElBQU1OLFNBQVNELFVBQVUsU0FBUyxVQUFVO1FBQ3JEUSxjQUFXO1FBQ1hGLFdBQVU7a0JBRVROLFVBQVUsdUJBQ1QsOERBQUNOLG9GQUFHQTtZQUFDWSxXQUFVOzs7OztpQ0FFZiw4REFBQ2Isb0ZBQUlBO1lBQUNhLFdBQVU7Ozs7Ozs7Ozs7O0FBSXhCO0dBNUJ3QlA7O1FBQ01KLGlEQUFRQTs7O0tBRGRJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvVGhlbWVUb2dnbGUuanN4P2UzZTUiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcblxuaW1wb3J0IHsgTW9vbiwgU3VuIH0gZnJvbSAnbHVjaWRlLXJlYWN0J1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICduZXh0LXRoZW1lcydcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vdWkvYnV0dG9uJ1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUaGVtZVRvZ2dsZSgpIHtcbiAgY29uc3QgeyB0aGVtZSwgc2V0VGhlbWUgfSA9IHVzZVRoZW1lKClcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgLy8gQXZvaWQgaHlkcmF0aW9uIG1pc21hdGNoIGJ5IG9ubHkgcmVuZGVyaW5nIGFmdGVyIG1vdW50XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0TW91bnRlZCh0cnVlKVxuICB9LCBbXSlcblxuICBpZiAoIW1vdW50ZWQpIHtcbiAgICByZXR1cm4gPEJ1dHRvbiB2YXJpYW50PVwiZ2hvc3RcIiBzaXplPVwiaWNvblwiIGNsYXNzTmFtZT1cInJvdW5kZWQtZnVsbCB3LTkgaC05XCIgLz5cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvblxuICAgICAgdmFyaWFudD1cImdob3N0XCJcbiAgICAgIHNpemU9XCJpY29uXCJcbiAgICAgIG9uQ2xpY2s9eygpID0+IHNldFRoZW1lKHRoZW1lID09PSAnZGFyaycgPyAnbGlnaHQnIDogJ2RhcmsnKX1cbiAgICAgIGFyaWEtbGFiZWw9XCJUb2dnbGUgdGhlbWVcIlxuICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIHctOSBoLTlcIlxuICAgID5cbiAgICAgIHt0aGVtZSA9PT0gJ2RhcmsnID8gKFxuICAgICAgICA8U3VuIGNsYXNzTmFtZT1cImgtNSB3LTUgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxNb29uIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPlxuICAgICAgKX1cbiAgICA8L0J1dHRvbj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbIk1vb24iLCJTdW4iLCJ1c2VUaGVtZSIsIkJ1dHRvbiIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiVGhlbWVUb2dnbGUiLCJ0aGVtZSIsInNldFRoZW1lIiwibW91bnRlZCIsInNldE1vdW50ZWQiLCJ2YXJpYW50Iiwic2l6ZSIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJhcmlhLWxhYmVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/ThemeToggle.jsx\n"));

/***/ })

});