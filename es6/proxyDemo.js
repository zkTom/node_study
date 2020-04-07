/** 
 * Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。
 * 它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。
 * 
 * 使用Proxy包裹对象，来实现对象代理，可以用于object/array/function/another proxy object
 * const p = new Proxy(target, handler);
 * target:目标对象
 * Handler: 主要存储代理对象的代理操作
 * 主要操作如下：
 * handler.getPrototypeOf() => Object.getPrototypeOf.
 * handler.setPrototypeOf() => Object.setPrototypeOf.
 * handler.isExtensible() => Object.isExtensible.
 * handler.preventExtensions() => Object.preventExtensions.
 * handler.getOwnPropertyDescriptor() => Object.getOwnPropertyDescriptor.
 * handler.defineProperty() => Object.defineProperty.
 * handler.has() => the in operator.
 * handler.get() => getting property values.
 * handler.set() => setting property values.
 * handler.deleteProperty() => the delete operator.
 * handler.ownKeys() => Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
 * handler.apply() => a function call.
 * handler.construct() => the new operator.
 */
(function() {
    console.log("-- example 1 --");
    const target = {
        name: "Tom",
        age: 24
    }
    const handler = {
        get: function(target, key) {
            console.log('get:' + key);
            return target[key]; // 不是target.key
        },
        set: function(target, key, value) {
            console.log('set:' + key);
            target[key] = value;
        },
    };
    const p = new Proxy(target, handler);
    p.name; // 实际执行 handler.get
    p.age = 25; // 实际执行 handler.set
    // 执行结果
    // getting name
    // setting age
    // 25
})();
(function() {
 // todo 2example
 // https://www.runoob.com/w3cnote/es6-reflect-proxy.html
 // https://juejin.im/post/5e1d289c5188254dfd43d0c8
})();



