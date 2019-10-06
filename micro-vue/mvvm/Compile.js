function Compile(vm) {
	this.vm = vm
	this.el = vm.$el
	this.fragment = null // 文档片段
	this.init()
}
Compile.prototype.init = function() {
	this.fragment = this.nodeFragment(this.el)
	this.compileNode(this.fragment)
	this.el.appendChild(this.fragment) //解析完成添加到元素中
}
Compile.prototype.nodeFragment = function(el) {
	const fragment = document.createDocumentFragment()
	let child = el.firstChild
	//将子节点，全部移动文档片段里
	while (child) {
		fragment.appendChild(child)
		child = el.firstChild
	}
	return fragment
}
Compile.prototype.compileNode = function(fragment) {
    let childNodes = fragment.childNodes;
	[ ...childNodes ].forEach((node) => {
		if (this.isElementNode(node)) {
			this.compile(node)
		}

		let reg = /\{\{(.*)\}\}/
		let text = node.textContent

		if (reg.test(text)) {
			let prop = reg.exec(text)[1].trim();
			this.compileText(node, prop) //替换模板
		}

		//编译子节点
		if (node.childNodes && node.childNodes.length) {
			this.compileNode(node)
		}
	})
}
Compile.prototype.compile = function(node) {
	let nodeAttrs = node.attributes
	;[ ...nodeAttrs ].forEach((attr) => {
		let name = attr.name
		if (this.isDirective(name)) {
			let value = attr.value
			if (name === 'v-model') {
				this.compileModel(node, value)
			}
		}
	})
}
// 编译v-model
Compile.prototype.compileModel = function(node, prop) {
	let val = this.vm.$data[prop]
	this.updateModel(node, val)

	new Watcher(this.vm, prop, (value) => {
        console.log('watcher callback', value)
		this.updateModel(node, value)
	})

	node.addEventListener('input', (e) => {
		let newValue = e.target.value
		if (val === newValue) {
			return
		}
		this.vm.$data[prop] = newValue
	})
}
Compile.prototype.compileText = function(node, prop) {
    let text = this.vm.$data[prop]
	this.updateView(node, text);
	new Watcher(this.vm, prop, (value) => {
		this.updateView(node, value)
	})
}
Compile.prototype.updateModel = function(node, value) {
	node.value = typeof value == 'undefined' ? '' : value
}
Compile.prototype.updateView = function(node, value) {
	node.textContent = typeof value === 'undefined' ? '' : value
}
Compile.prototype.isDirective = function(attr) {
	return attr.indexOf('v-') !== -1
}
// 是否是一个元素节点
Compile.prototype.isElementNode = function(node) {
	return node.nodeType === 1
}
Compile.prototype.isTextNode = function(node) {
	return node.nodeType === 3
}
