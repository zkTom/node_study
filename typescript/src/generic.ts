// <string> => 指定泛型具体的类型
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("tom");
let output1 = identity("jerry");

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
// 泛型契约（泛型类型）
interface GenericIdentityFn {
    <T>(arg: T): T;
}
let myIdentity: GenericIdentityFn = identity;
// 泛型类
// 泛型约束来约束泛型类
interface Lengthwise {
    length: number;
}
class GenericNumber<T extends Lengthwise> {
    zeroValue: T | undefined;
    add: ((x: T, y: T) => T) | undefined;
}
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let y = { a: 1, b: 2, c: 3, d: 4 };

getProperty(y, "a"); // okay
// getProperty(y, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.