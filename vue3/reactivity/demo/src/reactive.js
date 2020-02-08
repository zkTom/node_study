import { handle } from './handle.js'

export function reactive(target) {
	const observed = new Proxy(target, handle)
	return observed
}