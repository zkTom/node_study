// A watcher parses an expression, collects dependencies,
// and fires callback when the expression value changes.
function Watcher(vm, prop, callback) {
	this.vm = vm
	this.prop = prop
	this.callback = callback
	this.value = this.get()
}
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function() {
    const value = parsePath(this.vm.$data, this.prop);
	const oldVal = this.value
	if (value !== oldVal) {
		this.value = value
		this.callback(value)
	}
}
/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function() {
    //储存订阅器
    Dep.target = this
    // 通知Dep列表进行依赖收集
    //因为属性被监听，这一步会执行监听器里的 get方法（触发对应属性的getter）
    const value = parsePath(this.vm.$data, this.prop);
	Dep.target = null
	return value
}
