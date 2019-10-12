// 改造数组原型以便收集依赖和触发数据更新
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
// 需要改造的方法
['push',
'pop',
'shift',
'unshift',
'splice'
].forEach(name => {
    Object.defineProperty(arrayMethods, name, {
        enumerable: true,
        configurable: true,
        value: function mutate() {
            // todo     
        }
    })
})