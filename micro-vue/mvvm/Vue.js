// const Observer = require("./Observer");
// const Watcher = require('./Watcher');
function Vue(options = {}) {
    this.$options = options;
    this.$data = options.data;
    this.$el = document.querySelector(options.el);
    // proxy data on vue instance
    Object.keys(this.$data).forEach(key => {
        this._proxy(key);
    })
    // 监测data数据，进行数据拦截，然后进行依赖收集
    Observer.prototype.observe(this.$data, this);
    // 在进行模版编译的时候进行watcher依赖收集
    new Compile(this);
}
// 代理this.data.xxx => this.xxx
Vue.prototype._proxy = function(key) {
    var self = this;
    Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function() {
            return self.$data[key];
        },
        set: function(newVal) {
            self.$data[key] = newVal;
        }
    })
}

