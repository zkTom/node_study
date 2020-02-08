const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./webpack.common.config');

const prodConfig = {
    mode: 'production'
}
module.exports = merge.smart(commonConfig, prodConfig);