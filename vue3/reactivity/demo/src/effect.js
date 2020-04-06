// targetMap 保存原始对象以及他们的依赖映射
// key: target val: depsMap
// depsMap  保存依赖关系
// key: target对象键名 val: effect数组(又叫做deps)
// 完成了 target => key => dep 的关系建立
const targetMap = new WeakMap()
// 便于依赖收集使用
const effectStack = []
// 依赖追踪
export function track(target, operationType, key) {
	const effect = effectStack[effectStack.length - 1]
	if (effect) {
        let depsMap = targetMap.get(target)
        console.log(depsMap);
		if (depsMap === void 0) {                                                                                                                                     
			targetMap.set(target, (depsMap = new Map()))
		}

		let dep = depsMap.get(key)
		if (dep === void 0) {
			depsMap.set(key, (dep = new Set()))
		}

		if (!dep.has(effect)) {
			dep.add(effect)
		}
	}
}
// 依赖收集/触发
export function trigger(target, operationType, key) {
	const depsMap = targetMap.get(target)
	if (depsMap === void 0) {
		return
	}
	const effects = new Set()
	if (key !== void 0) {
        const dep = depsMap.get(key)
		dep &&
			dep.forEach((effect) => {
				effects.add(effect)
			})
    }
	if (operationType === 'add' || operationType === 'set') {
		const iterationKey = Array.isArray(target) ? 'length' : Symbol('iterate')
        const dep = depsMap.get(iterationKey)
		dep &&
			dep.forEach((effect) => {
				effects.add(effect)
			})
	}
	effects.forEach((effect) => {
		effect()
	})
}
export function effect(fn) {
	const effect = function(...args) {
		return run(effect, fn, args)
	}
	// 立即执行一次
	effect()
	return effect
}
function run(effect, fn, args) {
	if (effectStack.indexOf(effect) === -1) {
		try {
			// 往池子里放入当前 effect
            effectStack.push(effect)
			// 立即执行一遍 fn()
			// fn() 执行过程会完成依赖收集，会用到 effect
			return fn(...args)
		} finally {
            // 完成依赖收集后从池子中扔掉这个 effect
			effectStack.pop()
		}
	}
}
