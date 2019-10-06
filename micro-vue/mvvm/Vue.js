// const Observer = require("./Observer");
// const Watcher = require('./Watcher');

function Vue(options = {}) {
    this.$options = options;
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    // 监测data数据，进行数据拦截，然后进行依赖收集
    Observer(this.$data);
    // 在进行模版编译的时候进行watcher依赖收集
    new Compile(this);
}

