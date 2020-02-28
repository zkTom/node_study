class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
// 成员都默认为 public,除此之外还有private,protected
// 使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
// getters/setters来截取对对象成员的访问
class Animal {
    static kind = 'Animal';
    readonly color: string = 'red';
    private _name: string;
    constructor(readonly theName: string) { this._name = theName; }
    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this._name} moved ${distanceInMeters}m.`);
    }

}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
console.log(sam.name);
// console.log(tom.name); // 错误