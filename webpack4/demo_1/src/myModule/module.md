
### 常见的模块化标准以及实现

#### AMD是RequireJS在推广过程中对模块定义的规范化产出

- 异步加载
- 依赖模块加载完成后，会立即执行其回调函数（即factory函数）；
- 主模块会等所有的依赖模块加载完成后，再调用其对应的回调函数（依赖前置）；

```js
  define(['package/lib'], function(lib) {
    // 回调里面使用lib
  })
```

#### CMD是SeaJS在推广过程中对模块定义的规范化产出，特点是同步加载

- 所有代码都运行在模块作用域中，不会污染全局变量；
- 模块会被异步加载；
- 模块加载完成后，不会执行其回调函数，而是等到主函数运行且需要的执行依赖的时候才运行依赖函数（依赖后置、按需加载）；

```js
  define(function(require, exports, module) {
    var $ = require('jquery');
    // 可以使用jQuery
  })
```

#### Commonjs是CJS模块规范，主要针对服务端运行的js项目，浏览器无法直接使用

```js
  // nodejs实际上生成的代码
  (function(exports, require, module, __filename, __dirname) {
      // 模块的代码实际上在这里
  })
  //  module.exports 导出模块内容；
  // 变量 exports 是对 module.exports 的引用，所以不能对exports有赋值操作
  exports.hello = function() {
    return 'hello';
  };
  module.exports.hello = () => {}
```

#### ES Module是用于处理模块的ECMAScript标准。现代浏览器（高版本）以基本支持 ES Module。

- 所有代码都运行在模块作用域中，不会污染全局变量；
- 在编译时输出模块；
- 输出的模块内容为只读，不可修改；
- 不会缓存模块结果，每次都会动态执行模块内容；

```js
  <script type="module" src="index.js"></script>
  export { foo, bar } from 'my_module';

  // 可以简单理解为
  import { foo, bar } from 'my_module';
  export { foo, bar };
```
