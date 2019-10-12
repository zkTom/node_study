// observe the value, used to proxy data
// 只对引用数据做监测
function Observer(obj) {
    // 定义dep的用处
    // this.dep = new Dep() 
    // 不允许for...in 遍历
	Object.defineProperty(obj, '__ob__', {
		value: this,
		enumerable: false,
		writable: true,
		configurable: true
	})
	if (Array.isArray(obj)) {
		// 数组异变代理
		for (var i = 0, l = obj.length; i < l; i++) {
			// 监测内部每个对象，在嵌套对象时起作用
		}
	} else {
		// 遍历对象进行data代理
		Object.keys(obj).forEach((key) => {
			defineReactive(obj, key, obj[key])
		})
	}
}
/**
 * observe data
 * 只对Object和Array(like Object) 进行监测
 */
Observer.prototype.observe = function(value) {
	if (typeof value !== 'object' || value === null) return

	var ob
	if (Object.hasOwnProperty.call(value, '__ob__') && value.__ob__ instanceof Observer) {
		ob = value.__ob__
	} else if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
		ob = new Observer(value)
	}
	return ob
}
function defineReactive(obj, key, val) {
    /**
     * 视图上每有一次vue实例的某个属性的引用（每次绑定，也就是触发一次watcher实例的创建）
     * 也就是说对于同一个属性，视图上引用多次就是产生同一个属性的多个watcher实例进行监测，
     * 这些watcher实例都由在data属性初始化时的getter中通过Dep实例进行收集管理
     */
	var dep = new Dep()
	// 递归遍历所有子属性
	var childOb = Observer.prototype.observe(val)
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function() {
			console.log('get:', val)
			// 当前是否存在一个需要初始化的watcher
			if (Dep.target) {
				dep.addSub(Dep.target)
				// if (childOb) {
				//     childOb.dep.depend()
				// }
            }
			return val
		},
		set: function(newVal) {
			console.log('set:', newVal)
			if (val !== newVal) {
				val = newVal
                Observer.prototype.observe(newVal)
                console.log(dep)
				dep.notify() //通知订阅器
			}
		}
	})
}
