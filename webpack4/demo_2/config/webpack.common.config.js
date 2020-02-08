const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MyPlugin = require('../src/utils/myPlugin');
const NODE_ENV = process.env.NODE_ENV;
const config = require('./config')[NODE_ENV];
const isProd = NODE_ENV === 'production';

function genCssLoader(options) {
	const cssLoader = {
		loader: 'css-loader',
		options: {
			importLoaders: 2,
			modules: false,
			sourceMap: false
		}
	}
	if (typeof options === 'object' && options !== null) {
		cssLoader.options = Object.assign({}, cssLoader.options, options)
	}

	return cssLoader
}
// css-loader 开启 css-module
function genModuleCssLoader() {
    const options = {
        modules: {
            localIdentName: '[local]_[hash:base64:8]' 
        }
    }
	return genCssLoader(options)
}
const scssLoader = {
	loader: 'sass-loader',
	options: {
		prependData: '@import "./src/assets/scss/variable.scss";',
		sourceMap: false
	}
}
const extractCssLoader = {
	loader: MiniCssExtractPlugin.loader,
	options: {
		hmr: process.env.NODE_ENV === 'development',
		reloadAll: true
	}
}

// 代码压缩混淆
function compressCss() {
    const minimizer = []
    if (isProd) {
        minimizer.push(new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})) 
    }
    return minimizer;
}
module.exports = {
	entry: {
		main: path.resolve(__dirname, '../src/index.js')
	},
	output: {
		publicPath: config['assetsHost'] + config['assetsPublicPath'], // 当在服务器配置虚拟路径映射时用来添加前缀
		filename: '[name].bundle.[hash].js',
		path: path.resolve(__dirname, '../dist'),
		chunkFilename: '[name].chunk.[chunkhash:8].js'
    },
    stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },
    devtool: config['devtool'],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '../src')
        },
        // import a from 'dir/' == import a from 'dir/index'
        mainFiles: ['index'],
        extensions: ['.js']
	},
	optimization: {
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        usedExports: true,// tree shaking 
        minimize: config['minimize'], // 压缩js
        // 代码压缩混淆
        minimizer: compressCss(), // 压缩css
        splitChunks: {
            chunks: 'all',
            minSize: 0,
			cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                },
                elementUI: {
                    name: 'elementUI', // split elementUI into a single package
                    priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
				commons: {
                    test: /(src\/utils\/common|src\/components)/,// 将该文件夹下的文件分块打包，这是我们自己的公共代码模块
                    name: 'commons',
					minChunks: 3,
					priority: 20,
					chunks: 'all',// 所有的函数公共方法打包到一起，不论initial/async
					reuseExistingChunk: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				include: path.resolve(__dirname, '../src'),
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /\/node_modules\//,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				oneOf: [
					{
						resourceQuery: /module/,
						use: [ extractCssLoader, genModuleCssLoader(), scssLoader, 'postcss-loader' ]
					},
					{
						use: [ extractCssLoader, genCssLoader(), scssLoader, 'postcss-loader' ]
					}
				]
			},
			{
				test: /\.css$/,
				oneOf: [
					{
						resourceQuery: /module/,
						use: [ extractCssLoader, genModuleCssLoader(), 'postcss-loader' ]
					},
					{
						use: [ extractCssLoader, genCssLoader(), 'postcss-loader' ]
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				exclude: path.resolve(__dirname, './src/assets/iconfont'), // exclude svg file
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							// publicPath: config.assetsInternetHost + config.assetsPublicPath,
							outputPath: 'images',
							fallback: 'file-loader',
							limit: 10000 // B为单位, 当小于指定数值时打包成base64,大于的话使用fallback的loader
						}
					}
				]
			},
			{
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 4096,
							fallback: {
								loader: 'file-loader',
								options: {
									publicPath: config.assetsInternetHost + config.assetsPublicPath,
									name: '[name].[hash:5].[ext]',
									outputPath: 'fonts/'
								}
							}
						}
					}
				]
			}
		]
    },
    plugins: [
        new HtmlWebpackPlugin({
			title: '首页',
			template: './src/template/index.html',
			filename: 'index.html'
        }),
        new MyPlugin({
            paths: ['https://code.jquery.com/jquery-3.1.0.js']
        }),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: !isProd ? '[name].css' : '[name].[hash].css',
			chunkFilename: !isProd ? '[id].css' : 'css/[id].chunk.[chunkhash].css',
			ignoreOrder: false // Enable to remove warnings about conflicting order
		}),
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ManifestPlugin()
    ]
}
