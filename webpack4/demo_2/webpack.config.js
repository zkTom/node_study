const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: 'development',
	entry: './src/index.js',
	output: {
		// publicPath: '',// 当在服务器配置虚拟路径映射时用来添加前缀
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].chunk.[chunkhash:8].js'
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		writeToDisk: true,
		port: 8080,
		// 热更新不刷新页面
		hot: true,
		hotOnly: true
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				include: path.resolve(__dirname, 'src'),
				/**
                 * vue-loader 用来处理单文件组件（*.vue）,
                 * vue-loader 要搭配vue-template-compiler使用，注意：每次vue版本变更，vue-template-compiler都要变更为对应版本。
                 * 内部自带模版处理，自动把预编译处理好，所以构建好的代码已经包含了编译出来的渲染函数而不是原始的模板字符串，
                 * 所以内部webpack打包vue时，使用的是运行时版本而不是完全版（运行时+模版编译器）
                 * 包含三个模块<template>,<script>,<style>
                 * 1. template(默认lang=html)
                 * 最终会编译为 JavaScript 渲染函数。
                 * 如果使用babel-loader，那么还可以使用es6/7/8的语法，经过babel-loader可以编译浏览器可以使用的代码
                 * 
                 *  eg：<img :src="require('./assets/img/logo.png')" />
                 *  img标签[src]路径解析：
                 *      /img/test.jpg 绝对路径会被保留下来
                 *      ./img/test.jpg 相对路径，会被基于文件结构的文件系统所解析
                 *      ～/img/test.jpg 来自node_modules下面的资源
                 *      @/img/test.jpg  resolve.alias配置的路径，@ + /img/test.jpg 最后拼成绝对路径
                 * 2. script(默认lang=js)
                 * 如果使用babel-loader或其他模块的话，script模块中还可以使用es6/7/8的语法，经过babel-loader可以编译浏览器可以使用的代码
                 * 3. style(默认lang=css)
                 * 会编译样式文件，最终
                 * 可以混用本地和全局样式（通过scoped区分） 
                 * <style scoped></style>内部样式只有当前组件生效
                 * <style></style> 对全局样式都生效
                 * 可以使用module 来实现模块化
                 * https://vue-loader-v14.vuejs.org/zh-cn/features/css-modules.html
                 * 可以配合postcss-loader使用以便处理css的兼容性
                 */
				loader: 'vue-loader',
				options: {
                    // 配置css-loader
                    cssModules: {},
                    loaders: {
                        // 替换默认的模块对应的loader
                        // js: 'coffee-loader'
                    },
                }
			},
			{
				test: /\.js$/,
				exclude: /\/node_modules\//,
				loader: 'babel-loader'
			},
			{
				test: /\.s?css$/,
				oneOf: [
					{
						resourceQuery: /module/,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
								options: {
									publicPath: '../',
									// hmr: process.env.NODE_ENV === 'development',
									hmr: true,
									// if hmr does not work, this is a forceful method.
									reloadAll: true
								}
							},
							{
								loader: 'css-loader',
								options: {
									importLoaders: 2,
									modules: {
										localIdentName: '[local]_[hash:base64:8]'
									},
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									prependData: '@import "./src/assets/scss/variable.scss";',
									sourceMap: false
								}
							},
							'postcss-loader'
						]
					},
					{
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
								options: {
									publicPath: '../',
									// hmr: process.env.NODE_ENV === 'development',
									hmr: true,
									// if hmr does not work, this is a forceful method.
									reloadAll: true
								}
							},
							{
								loader: 'css-loader',
								options: {
									importLoaders: 2,
									url: false,
									import: true,
									modules: false,
									sourceMap: false
								}
							},
							{
								loader: 'sass-loader',
								options: {
									prependData: '@import "./src/assets/scss/variable.scss";',
									sourceMap: false
								}
							},
							'postcss-loader'
						]
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images',
							fallback: 'file-loader',
							limit: 8000 // B为单位, 当小于指定数值时打包成base64,大于的话使用fallback的loader
						}
					}
				]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                  {
                    loader: "url-loader",
                    options: {
                      name: "[name]-[hash:5].[ext]",
                      limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                      publicPath: "fonts/",
                      outputPath: "fonts/"
                    }
                  }
                ]
              }
		]
    },
    optimization: {
        usedExports: true,
		// 压缩js代码到一行
		minimize: isProd ? true: false,
		minimizer: [ new TerserPlugin({}), new OptimizeCSSAssetsPlugin({}) ],
		splitChunks: {
			// initial 只打包同步引入代码，async 只打包异步引入代码，all分割打包所有内容
			chunks: 'all',
			minSize: 10000, // 超过最小值则会进行代码分割，
			// maxSize: 0, // 超过最大值，则会进行模块二次划分
			minChunks: 1, // >= 1, 最小被几个入口引入的次数
			cacheGroups: {
                default: false,
                // 项目公用js
				common: {
                    name: 'chunk-common',
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
			title: '首页',
			template: './src/template/index.html',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: 'css/[name].css',
			chunkFilename: 'css/[id].css',
			ignoreOrder: false // Enable to remove warnings about conflicting order
			// 当执行多页面打包,为不同的页面指定不同的css文件夹
			// moduleFilename: ({ name }) => {
			//     return `css/${name}.css`
			// }
		}),
		/**
         * 使用vue-loader时是必须的，负责拷贝文件处理规则到对应的文件块处理规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
                test: /\.css$/,
                use: [
                'vue-style-loader',
                'css-loader'
                ]
            }
         */
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
}
