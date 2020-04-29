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
 * 
 * handler.setPrototypeOf() => Object.setPrototypeOf.
 * 
 * handler.isExtensible() => Object.isExtensible.
 * 
 * handler.preventExtensions() => Object.preventExtensions.
 * 
 * handler.getOwnPropertyDescriptor() => Object.getOwnPropertyDescriptor.
 * 
 * handler.defineProperty() => Object.defineProperty.
 * 
 * handler.has() => the in operator.
 * has: function(target, prop) {}
 * @param target 目标对象
 * @param prop 需要检查是否存在的属性
 * 
 * handler.get() => getting property values.
 * get: function(target, property, receiver) {}
 * @param target
 * @param property
 * @param receiver
 * 
 * handler.set() => setting property values.
 * set: function(target, property, value, receiver) {}
 * @param target: 目标对象
 * @param property
 * @param value
 * @param receiver:最初被调用的对象。通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）
 * @returns { boolean } true表示属性设置成功
 * 
 * handler.deleteProperty() => the delete operator.
 * deleteProperty: function(target, property) {}
 * @param target 目标对象
 * @param property 待删除的属性名
 * @return { boolean } 返回一个 Boolean 类型的值，表示了该属性是否被成功删除
 * 
 * handler.ownKeys() => Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
 * 
 * handler.apply() => a function call.
 * apply: function(target, thisArg, argumentsList) {}
 * @param target 目标对象
 * @param thisArg 被调用时的上下文对象
 * @param argumentsList 被调用时的参数数组
 * 
 * handler.construct() => the new operator.
 * construct: function(target, argumentsList, newTarget) {}
 * @param target 目标对象
 * @param argumentsList constructor的参数列表
 * @param newTarget 最初被调用的构造函数
 * @returns { Object }
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
        }
    };
    const p = new Proxy(target, handler);
    p.name; // 实际执行 handler.get
    p.age = 25; // 实际执行 handler.set
    // 执行结果
    // get:name
    // set:age
    // 25
})();
(function() {
    console.log("-- example 2 --");
    const target = {};
    const handler = {
        get: function(target, key) {
            console.log('get:' + key);
            return target[key]; // 不是target.key
        },
        set: function(target, key, value, receiver) {
            // 属性保护
            if (key === "age") {
                if (!Number.isInteger(value)) {
                    throw new TypeError("the age must be integer");
                }
            }
            console.log('set:' + key);
            // receiver 指向proxy对象本身
            if (key === "proxy") {
                target[key] = receiver;
                return true;
            }
            target[key] = value;
        }
    };
    const p = new Proxy(target, handler);
    console.log(p.name);// undefined
    p.name = "Tom";
    console.log(p.name);
    // p.age = "25"; // TypeError: the age must be integer
    p.proxy = {};
    console.log(p.proxy === p);// true
})();
(function() {
    console.log("-- example 3 --");
    // 函数代理
    function sub(a, b){
        return a - b;
    }
    const handler = {
        /**
         * 
         * @param {*} target 目标对象 sub函数
         * @param {*} ctx 被调用时的上下文对象
         * @param {*} args 被调用时的参数数组 [2, 1]
         */
        apply: function(target, ctx, args) {
            console.log('handle apply');
            return target(...args) * 10;
        }
    }
    const p = new Proxy(sub, handler);
    console.log("the sub result:", sub(2, 1)); // the sub result: 1
    console.log("the proxy sub result:",p(2, 1)) // the proxy sub result: 10
})();
(function() {
    console.log("-- example 4 --");
    // has 用来代替 in操作符
    const target = {
        name: "Tom",
        _name: "Ms Tom"
    }
    const handler = {
        // 进行共有和私有属性访问限制
        has: function(target, key) {
            if (key[0] === "_") {
                console.log(key + ' can not be accessed');
                return false;
            }
            return key in target;
        }
    }
    const p = new Proxy(target, handler);
    console.log('_name' in target);// true
    console.log(Reflect.has(p, "_name"));// false
    console.log('_name' in p); // false
})();
(function() {
    console.log("-- example 5 --");
    // 拦截new命令
    class Person {
        constructor(name) {
            this.name = name;
        }
    }
    const handler = {
        construct(target, args, newTarget) {
            console.log('handle construct');
            args[0] = "Li Ming";
            return new target(...args);
            // return Reflect.construct(target, args, newTarget);
        }
    }
    const PersonProxy = new Proxy(Person, handler);
    const person = new Person("Tom");
    const personProxy = new PersonProxy("Tom");
    console.log(person.name);// Tom
    console.log(personProxy.name);// Li Ming
})();
(function() {
    console.log("-- example6 --");
    const target = {
        name: 'Tom'
    }
    // 拦截delete命令
    const handler = {
        deleteProperty: function(target, prop) {
            console.log("called: " + prop);
            delete target[prop];
            return true;
        }
    }
    const p = new Proxy(target, handler);
    delete p.name
    // delete Reflect.deleteProperty(p, 'name');
    console.log(p.name);
})();

