/**
 * Created by 17701 on 2017/7/30.
 */
// 加载插件
module.exports = function (grunt) {
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec'
    ].forEach(function (task) {
        grunt.loadNpmTasks(task)
    })
// 配置插件
    grunt.initConfig({
        cafemocha: {
            all: {src: 'qa/tests-*.js',options: {ui: 'tdd'}}
        },
        jshint: {
            app: ['lib/**/*.js','public/js/**/*.js'],
        },
        // exec: {
        //      linkchecker: {cmd: 'linkchecker http://localhost:3001'}
        // }
    })
    grunt.registerTask('default', ['cafemocha','jshint'])
}

