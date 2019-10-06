// 观察者模式, 统一管理多个观察者
// 作为Subject，要根据自身状态进行通知，添加/删除订阅者。
function Dep() {
	this.subs = []// 订阅者列表
}
Dep.prototype.addSub = function(sub) {
	this.subs.push(sub)
}
Dep.prototype.notify = function() {
	console.log('属性变化通知 Watcher 执行更新视图函数')
	this.subs.forEach((sub) => {
		sub.update()
	})
}
// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
