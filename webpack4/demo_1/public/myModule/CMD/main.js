define(function(require, exports, module) {     
  //a,b模块只下载好了，并且只执行了模块中的define方法，而define方法中的function要等到require时，才会执行
  const a = require('moduleA');     //延迟执行了a,b模块
  a.fn();
  const b = require('moduleB');        
  console.log(`moduleB[count]:${b.count},[count]:${b.wrapFn()}`)
})