(function(graph){
    function require(file) {
      var exports = {}
      function absRequire(relPath) {
        return require(graph[file].deps[relPath])
      }

      (function(require, exports, code) { 
        eval(code)
       })(absRequire, exports, graph[file].code)

       return exports
    }

    require('./src/index.js')
  })({"./src/index.js":{"deps":{"./add.js":"./src\\add.js","./minus.js":"./src\\minus.js"},"code":"\"use strict\";\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nvar _add = _interopRequireWildcard(require(\"./add.js\"));\n\nvar _minus = require(\"./minus.js\");\n\nfunction _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== \"function\") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }\n\nfunction _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { \"default\": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== \"default\" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj[\"default\"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nvar sum = (0, _add[\"default\"])(1, 2);\nvar division = (0, _minus.minus)(2, 1);\nvar sumMore = (0, _add.addMore)(1, 2, 3);\nconsole.log(\"\\u4E24\\u6570\\u4E4B\\u548C\\uFF1A\".concat(sum));\nconsole.log(\"\\u4E24\\u6570\\u4E4B\\u5DEE\\uFF1A\".concat(division));\nconsole.log(\"\\u4E09\\u6570\\u4E4B\\u548C\\uFF1A\".concat(sumMore));"},"./src\\add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.addMore = addMore;\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;\n\nfunction addMore() {\n  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {\n    rest[_key] = arguments[_key];\n  }\n\n  // inital value is 0\n  return rest.reduce(function (pre, cur, curIdx, arr) {\n    return pre + cur;\n  }, 0);\n}"},"./src\\minus.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = void 0;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;"}})