/*
词法作用域来决定a=5
function test(){
 var a =10;
test1.call(test)
}
function test1(){
console.log(a);
}
var a= 5;
test()// 5*/
var hanoi = function (disc, src, aux, dst) {
    if (disc > 0) {
       hanoi(disc - 1,src, dst, aux)//把剩下的disc-1个盘移动到aux(辅助盘上)
       console.log('move disc ' + disc + ' from ' +src + ' to ' + dst);//把第disc个盘移动到dst（目标盘）上
       hanoi(disc-1,aux, src, dst)//把剩下的disc-1个盘在移动到dst上
    }
}
hanoi(4,'src', 'aux', 'dst')


