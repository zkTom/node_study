module.exports = function(api) {
	api.cache(true);
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
                // 自动转化使用的es6-es8语法，打上polyfill,筛选出去多余的polyfill
				useBuiltIns: 'usage',
				corejs: {
					version: 3,
					proposals: true
				}
			}
		]
    ]
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