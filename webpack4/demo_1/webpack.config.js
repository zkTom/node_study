const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/**
 * optimize-css-assets-webpack-plugin
 * 1. 压缩css代码到一行
 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/**
 * terser-webpack-plugin
 */
const TerserPlugin = require('terser-webpack-plugin');
/**
 * mini-css-extract-plugin
 * 1.提取js中的css样式变为单独css文件
 * 2.支持按需加载，sourcemap
 * MinCssExtractPlugin.loader
 * 1.publicPath 当在服务器配置虚拟路径映射时用来添加前缀,默认使用webpack.output.publicPath
 * 2.hmr 热重载
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/**
 * html-webpack-plugin
 * 1.生成html文件，将打包的js文件写入到html->body（按照script标签的规则）
 * 2.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	mode: 'none',
	entry: {
		main: './index.js'
		// main_1: './index1.js'
	},
	output: {
        publicPath: '',// 当在服务器配置虚拟路径映射时用来添加前缀
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		chunkFilename: '[name].[contenthash:8].js'
    },
    // loader执行顺序，从下到上，从右到左
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					/**
                     * style-loader 如何把css写入到html中，以及写入位置
                     * injectType：
                     * styleTag(default) 将css按照<style></style>注入到html中
                     * singletonStyleTag 将css按照<style></style>注入到html中，但是会合并多个css
                     * lazyStyleTag 将css按照<style></style>注入到html中,但是需要手动调用style.use()/style.unuse()
                     * |lazySingletonStyleTag|linkTag
                     * */

                    // { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true
                        },
                    },
					/**
                     * css-loader 识别@import url()/import
                     * url: boolean/function 是否启用url()路径解析。
                     * import: boolean/function 是否启用@import路径解析。
                     * eg：@import 'style.css' => require('./style.css')
                     *     @import url(style.css) => require('./style.css')
                     * modules: Boolean|String|Object 是否使用css模块化
                     * {
                     *      mode: local|global
                     *      localIdentName: [path][name]__[local] dev || [hash:base64] prod 形成的类名
                     *      context:  查找css文件上下文
                     *      hashPrefix: 添加css类名前缀
                     * }
                     * eg: 
                     *  {
                     *      mode: 'local',
                     *      localIdentName: '[path][name]__[local]--[hash:base64:5]',
                     *      context: path.resolve(__dirname, 'src'),
                     *      hashPrefix: 'my-custom-hash',
                     *  }
                     * 生成css样式：.m20 -> ._-assets-css-home__m20--3PRqo
                     * importLoaders： Number 在使用css-loader之前使用指定数量的loader对@import引入的资源进行预处理（postcss-loader/scss-loader）
                     * 在样式嵌套引入的时候（css引入css,scss引入scss），会导致@import无法被正确预编译，importLoaders可以识别@import并进行预处理
                     * */

					{
						loader: 'css-loader',
						options: {
                            importLoaders: 2,
							url: false,
                            import: true,
                            modules: false
						}
                    },
                    'sass-loader',
                    'postcss-loader'
				]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        // todo file-loader 用法
                        // name: 'img/[path][name].[ext]',
                        name: 'img/[name].[ext]'
                    }
                  },
                ],
            }
		]
	},
	optimization: {
        // 压缩js代码到一行
        minimize: true,
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
		splitChunks: {
			// initial 只打包同步引入代码，async 只打包异步引入代码，all分割打包所有内容
			chunks: 'all',
			minSize: 3000, // 超过最小值则会进行代码分割，
			// maxSize: 0, // 超过最大值，则会进行模块二次划分
			minChunks: 1, // >= 1, 最小被几个入口引入的次数
			cacheGroups: {
				default: false,
				vendors: {
					name(module, chunks, cacheGroupKey) {
						const moduleFileName = module.identifier().split('/').reduceRight((item) => item)
						return `${cacheGroupKey}-${moduleFileName}`
					},
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial',
					reuseExistingChunk: true
				},
				common: {
					name(module, chunks, cacheGroupKey) {
						const moduleFileName = module.identifier().split('/').reduceRight((item) => item)
						return `${cacheGroupKey}-${moduleFileName}`
					},
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '首页', // html->head->title(使用template选项后不生效)
			filename: 'index.html', // html文件输出位置
			template: 'template/index.html', // 指定使用的html模版
			templateParameters: {}, // 使用模版引擎可以使用
			inject: true, // js资源文件插入到文件的位置 true || 'head' || 'body' || false
			favicon: 'assets/favicon.ico', // html的ico图标
			meta: {}, // html->head->meta (使用template选项后不生效)
			minify: true, // Boolean|Object html文件压缩规则
			hash: true // 文件缓存
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
            // 当执行多页面打包,为不同的页面指定不同的css文件夹
            // moduleFilename: ({ name }) => {
            //     return `css/${name}.css`
            // }
          }),
		new CleanWebpackPlugin()
	]
}
