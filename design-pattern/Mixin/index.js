const Car = require('./Car');
const Mixin = require('./Mixin');
/**
 * Mixin模式
 * 可以扩展原有对象功能
 * 减少系统中的重复功能以及增加函数复用性
 * 可以将一些通用函数通过Mixin进行共享
 */
/**
 * 只能用来扩展指定对象的函数
 * @param { Function } receivingClass 接受扩展的类
 * @param { Function } givingClass 给予扩展的类
 * @param  {...any} rest 指定的扩展参数 
 */
function extendProperty(receivingClass, givingClass, ...rest) {
    const len = rest.length;
    // 扩展指定参数
    if (len > 0) {
        for (let i = 0, propertyName = rest[i]; i < len; i++) {
            propertyName = rest[i];
            if (Object.keys(receivingClass).indexOf(propertyName) === -1) {
                receivingClass.prototype[propertyName] = givingClass.prototype[propertyName];
            }
        }
    // 扩展所有参数
    } else {
        for (let propertyName in givingClass.prototype) {
            if (Object.keys(receivingClass).indexOf(propertyName) === -1) {
                receivingClass.prototype[propertyName] = givingClass.prototype[propertyName];
            }
        }
    }
}
/**
 * 测试合并指定属性到指定对象
 * 测试结果
 * driveForward
 * driveBackward
 */
function testExtendPart() {
    extendProperty(Car, Mixin, 'driveBackward', 'driveForward');
    const car = new Car({
        model: 'Ford Escort',
        color: 'blue'
    })
    car.driveForward();
    car.driveBackward();
}
/**
 * 测试合并所有属性到指定对象
 * 测试结果
 * driveForward
 * driveBackward
 * Ford Escort:driveSideways
 */
function testExtendFull() {
    extendProperty(Car, Mixin);
    const car = new Car({
        model: 'Ford Escort',
        color: 'blue'
    })
    car.driveForward();
    car.driveBackward();
    car.driveSideways();
}
testExtendPart();
testExtendFull();