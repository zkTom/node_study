let isDone: boolean = false;
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;// 16进制
let binaryLiteral: number = 0b1010;// 2进制
let octalLiteral: number = 0o744;// 8进制
let firstName: string = "bob";
let sentence: string = `Hello, my name is ${ firstName }.`
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
// 元组
let truple: [string, number] = ['hello', 10];
// 枚举
enum Color {
    Red,
    Green, 
    Blue
}
let c: Color = Color.Green;
// 在编程阶段还不清楚类型的变量指定一个类型
let notSure: any = 4;
// 没有返回类型
function warnUser(): void {
    console.log("This is my warning message");
}
// undefined和null两者各自有自己的类型分别叫做undefined和null。
// 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量
let u: undefined = undefined;
let n: null = null;