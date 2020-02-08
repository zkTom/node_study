module.exports = {
    /**
     * sourceMap
     * minimize
     * assetsHost: "https://hbzner.com",// js css域名配置
     * assetsPublicPath: '/resource/',// js css 路径映射配置
     * 
     */
    development: {
        devtool: 'cheap-module-eval-source-map',// 对业务代码出错追踪，对第三方模块出错追踪
        minimize: false,
        assetsHost: "",// js css域名配置
        assetsPublicPath: '',// js css 路径映射配置 
        assetsInternetHost: "",// iconfont等cdn访问
    },
    test: {
        devtool: 'cheap-module-eval-source-map',
        minimize: false,
        assetsHost: "",
        assetsInternetHost: "",
        assetsPublicPath: '',
    },
    production: {
        devtool: 'none',// source-map, cheap-module-source-map
        minimize: true,
        assetsHost: "",
        assetsInternetHost: "",
        assetsPublicPath: '',
    }
}   