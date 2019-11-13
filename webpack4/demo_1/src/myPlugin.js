const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自定义plugin
// 目标：将我们指定的一段js插入到生成的html文件的其他引用资源之前。
function MyPlugin(options) {
    this.options = options;
}
MyPlugin.prototype.apply = function(compiler) {
    // debugger;
    const paths = this.options.paths || [];
    // 入口配置完毕钩子
    compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {});
	//compiler.hooks 用来注册插件
	compiler.hooks.done.tap('MyPlugin', (stats) => {})
	compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        // webpack > 4.0
        debugger;
		compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('MyPlugin', (data, cb) => {
            // Manipulate the content
            paths.forEach(path => data.assets.js.unshift(path))
			// Tell webpack to move on
			cb(null, data)
        })
        // compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('MyPlugin', (data, cb) => {
        //     debugger;
        //     // Manipulate the content
        //     paths.forEach(path => data.assets.js.unshift(path))
		// 	// Tell webpack to move on
		// 	cb(null, data)
		// })
	})
}
module.exports = MyPlugin
// interface Hook {
// 	tap: (name: string | Tap, fn: (context?, ...args) => Result) => void,
// 	tapAsync: (name: string | Tap, fn: (context?, ...args, callback: (err, result: Result) => void) => void) => void,
// 	tapPromise: (name: string | Tap, fn: (context?, ...args) => Promise<Result>) => void,
// 	intercept: (interceptor: HookInterceptor) => void
// }
// interface Hook {
// 	isUsed: () => boolean,
// 	call: (...args) => Result,
// 	promise: (...args) => Promise<Result>,
// 	callAsync: (...args, callback: (err, result: Result) => void) => void,
// }
/* istanbul ignore next */
// module.exports.tap = (tappable, hook, name, plugin) => (
//     tappable.hooks /* Webpack >= 4.0 */
//       ? tappable.hooks[camelCase(hook)] && tappable.hooks[camelCase(hook)].tapAsync(name, plugin)
//       : tappable.plugin(hook, plugin)
//   );

//   /* istanbul ignore next */
//   module.exports.tapHtml = (tappable, name, plugin) => {
//     try {
//       const HtmlWebpackPlugin = require('html-webpack-plugin');
//       return HtmlWebpackPlugin.getHooks /* HtmlWebpackPlugin >= 4.0 */
//         ? HtmlWebpackPlugin.getHooks(tappable).afterTemplateExecution.tapAsync(name, plugin)
//         : module.exports.tap(tappable, 'html-webpack-plugin-before-html-processing', name, plugin)
//         ;
//     } catch (_) {
//       // ignore
//     }
//   };
