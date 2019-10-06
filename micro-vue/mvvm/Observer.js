// observe the value, used to proxy data
// 只对引用数据做监测
function Observer(data = {}) {
    if (typeof data !== 'object' || data === null) return;

    Object.keys(data).forEach(key => {
        defineReactive(data, key, data[key]);
    })
}
function defineReactive(obj, key, val) {
    var dep = new Dep();
    // 递归遍历所有子属性
    var childOb = Observer(val);
	Object.defineProperty(obj, key, {
        enumerable: true,
		configurable: true,
		get: function() {
            console.log('get:', val)
            // 当前是否存在一个需要初始化的watcher
            if (Dep.target) {
                dep.addSub(Dep.target);
                // if (childOb) {
                //     childOb.dep.depend()
                // }
            }
			return val
		},
		set: function(newVal) {
			console.log('set:', newVal)
            if (val !== newVal) {
                val = newVal;
                Observer(newVal);
                dep.notify(); //通知订阅器
            }
		}
	})
}