const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const devConfig = {
    mode: 'development',
    devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		port: 8080,
		// 热更新不刷新页面
		hot: true,
		hotOnly: true
    }
}
module.exports = merge.smart(commonConfig, devConfig);