/**
 * Created by 17701 on 2017/7/8.
 */

function fun(n,o) {
    console.log(o)
    return {
        fun:function (m) {
            // console.log(m)
            // console.log(fun)
            return fun(m,n);
        }
    }
}
/**
 * 神奇的闭包，内层仍然保存着外层函数变量，即使外层函数被调用完毕之后。
 * 函数作用域链的神奇之处
 * */
var a=fun(0);//undefined
a.fun(1);//0
a.fun(2);//0
/**
 *
 *
 *
 * */
var b=fun(0).fun(1).fun(2).fun(3);//undefined 0 1 2
var  c=fun(0).fun(1);//undefined  0
c.fun(2);//1
c.fun(3);//1