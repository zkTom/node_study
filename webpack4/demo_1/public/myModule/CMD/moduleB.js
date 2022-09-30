// require 可以用来加载define模块
define(function(require, exports, module) {
      let $count = 1; //私有数据
  
　　  const fn = function(offset = 1) { //私有方法
  　　　　return (++$count + offset);
  　　}
  
       exports.count = $count + 0.5; //公共数据
  
       exports.wrapFn = function() { //公共方法
  　　　　return fn(0.314);
  　　}
  });