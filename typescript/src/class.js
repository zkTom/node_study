var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
// 成员都默认为 public,除此之外还有private,protected
// 使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
// getters/setters来截取对对象成员的访问
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.theName = theName;
        this.color = 'red';
        this._name = theName;
    }
    Object.defineProperty(Animal.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newName) {
            this._name = newName;
        },
        enumerable: true,
        configurable: true
    });
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this._name + " moved " + distanceInMeters + "m.");
    };
    Animal.kind = 'Animal';
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
console.log(sam.name);
// console.log(tom.name); // 错误
var RSocket = /** @class */ (function () {
    function RSocket(r) {
        console.log(r);
    }
    // 单例模式实现builder不用重复调用
    RSocket.builder = function () {
        var instance;
        var _builder = /** @class */ (function () {
            function _builder() {
                this._host = '';
                this._namespace = '';
                this._timeout = 0;
                this._port = '';
            }
            _builder.prototype.host = function (host) {
                this._host = host;
                return this;
            };
            _builder.prototype.namespace = function (namespace) {
                this._namespace = namespace;
                return this;
            };
            _builder.prototype.port = function (port) {
                this._port = port;
                return this;
            };
            _builder.prototype.timeout = function (timeout) {
                this._timeout = timeout;
                return this;
            };
            _builder.prototype.build = function () {
                return new RSocket(this);
            };
            return _builder;
        }());
        function getInstance() {
            if (!instance) {
                instance = new _builder();
            }
            return instance;
        }
        return getInstance();
    };
    return RSocket;
}());
var b = RSocket.builder();
b.host('test').namespace('nsp').port('22').timeout(5000).build();
