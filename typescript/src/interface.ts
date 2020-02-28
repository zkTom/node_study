// 接口定义契约，约定使用情况，以下契约<=>接口
// 约定对象契约
// 可选属性
// 只读属性
interface LabelledValue {
    readonly label: string;
    size?: number;
    [propName: string]: any;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
    if (labelledObj.size) {
        console.log(labelledObj.size);
    }
}
  
let myObj:LabelledValue = {size: 10, label: "Size 10 Object", extraProp: "test"};
printLabel(myObj);
// 函数契约
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配,比如：source->src, subStirng-> sub
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
// 数组契约
interface StringArray {
    [index: number]: string;
}
  
let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
// 字典模式
interface NumberDictionary {
    readonly [index: string]: number;
    length: number;    // 可以，length是number类型
    // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
// 类契约
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date) : void;
    tick(): void;
}
class Clock implements ClockInterface {
    currentTime!: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    tick() {
        throw new Error("Method not implemented.");
    }
    constructor(h: number, m: number) { }
}
// 为检查类的静态部分的类型，要单独定义类Constructor接口
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
    currentTime!: Date;
    constructor(h: number, m: number) { }

    setTime(d: Date) {
        throw new Error("Method not implemented.");
    }
    tick() {
        console.log("beep beep");
    }
}
let digital = createClock(DigitalClock, 12, 17);
// 契约继承/接口继承，方便重用
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
// 接口继承类
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//     select() { }
// }