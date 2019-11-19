const HtmlWebpackPlugin = require('html-webpack-plugin')
// 自定义plugin
// 目标：将我们指定的一段js插入到生成的html文件的其他引用资源之前。
function MyPlugin(options) {
    this.options = options;
}
MyPlugin.prototype.apply = function(compiler) {
    const paths = this.options.paths || [];
    // 入口配置完毕钩子
    compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {});
	//compiler.hooks 用来注册插件
	compiler.hooks.done.tap('MyPlugin', (stats) => {})
	compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
        // webpack > 4.0
		compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('MyPlugin', (data, cb) => {
            // debugger;
            // Manipulate the content
            paths.forEach(path => data.assets.js.unshift(path))
			// Tell webpack to move on
			cb(null, data)
        })
	})
}
module.exports = MyPlugin