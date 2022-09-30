define(function(require, exports, module) {
  var m = new Date().getTime();
  console.log('from module a')
  exports.fn = function() {
    setTimeout(() => {console.log('from module A:',m)},1000)
  }
})