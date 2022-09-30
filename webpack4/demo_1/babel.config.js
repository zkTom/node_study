// babel 总共分为三个阶段：解析，转换，生成。
// Plugin 会运行在 Preset 之前。
// Plugin 会从前到后顺序执行。
// Preset 的顺序则 刚好相反(从后向前)。
// preset使用规则： ["env"], ["env", {module: false}]
// babel-node = babel-polyfill + babel-register
// babel-polyfill = core-js + regenerator-runtime

// babel-polyfill
// babel 默认只转换 js 语法，而不转换新的 API，比如 Iterator、Generator、Set、Maps，Promise 等全局对象，
// 以及一些定义在全局对象上的方法(比如 Object.assign)都不会转码,这个时候如果要使用API就要用babel-polyfill
// 对于esModule语法，babel只能转化为commonjs语法【编译】，但是不能运行在浏览器环境，还需要进行webpack【打包bundle】
// 经过打包处理之后就可以运行在浏览器上。
module.exports = function(api) {
	api.cache(true);
    // api.cache(true) - Same as api.cache.forever()
    // api.cache(false) - Same as api.cache.never()
    // 使用一些预设插件，从而不用单个插件引入
    /**
     * 比如常用插件：
     * "@babel/helper-module-imports": es6导入导出
     * "@babel/plugin-proposal-async-generator-functions": 将async/await => generator
     * ...
     *  */ 
    /**
     * targets: 要支持的最小环境
     * modules： 将es6 转化为commonjs或其他
     * useBuiltIns："usage" | "entry" | false
     * 配置usage,不需要在webpack.config.js entry 中配置，也不用在业务代码的顶部引入该polyfill
     * 配置entry,则要在webpack.config.js entry 中配置，也要在业务代码的顶部引入该polyfill
     */
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					edge: '17',
					firefox: '60',
					chrome: '67',
                    safari: '11.1'
				},
				useBuiltIns: 'usage',
				corejs: {
					version: 3,
					proposals: true
				}
			}
		]
    ]
    // 使用到的未在preset-env中的插件可以加在下面
    // 避免重复引用babel的代码（默认情况下babel的helps会在每个文件中都会被重新定义一次）
    // 避免污染全局变量
    // 避免直接修改全局变量的原型链上的属性。
    const plugins = [
        [
            "@babel/plugin-transform-runtime",
            {
              "absoluteRuntime": false,
              "corejs": {
                version: 3,
                proposals: true
              },
              "helpers": true,
              "regenerator": true,
              "useESModules": false
            }
          ]
    ]

	return {
        presets,
        plugins
	}
}