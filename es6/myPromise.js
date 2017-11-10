/**
 * Created by 17701 on 2017/8/24.
 */
function Promise(fn) {
    var state='pending',
        value=null,
        callbacks=[];
    this.then=function (onFulfilled,onRejected) {
        //如果resolve之后注册的callback会由fulfilled装态来决定是否执行
        return new Promise(function (resolve,reject) {
            handle({
                onFulfilled:onFulfilled || null,
                onRejected:onRejected || null,
                resolve: resolve, //用brige Promise 来衔接 两个Promise
                reject: reject
            })
        })
    }

    function handle(callback) {
        //如果状态没有改变
        if (state === 'pending') {
            callbacks.push(callback)
            return;
        }
        //加入reject处理
        var cb = state === 'fulfilled'? callback.onFulfilled:callback.onRejected,ret;
        if (cb === null) {//then中没有传递一个函数类型的参数
            cb = state ==='fulfilled'?callback.resolve:callback.reject;
            cb(value)
            return
        }
        //then中没有返回任何东西
        // if (!callback.onFulfilled) {
        //     callback.resolve(value);
        //     return;
        // }
        //ret= callback.onFulfilled(value)//这里onFulfilled肯定能返回一个值，因为之前已经判断Promise的状态是否改变了
        try {
            ret=cb(value)
            callback.resolve(ret)
        } catch(e) {
            callback.reject(e)
        }
    }
    function resolve(newVal) {
        if (newVal && (typeof newVal==='object' || typeof newVal==='function')) {
            var then=newVal.then
            if (typeof then==='function') {
                then.call(newVal,resolve,reject)
                return
            }
        }
        value =newVal;
        state =  'fulfilled';
        execute()
    }
    function reject(reason) {
        state= 'rejected';
        value=reason;
        execute()
    }
    //只要有装态就会执行execute将callbacks全部执行一次。
    function execute() {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback)
            })
        },0)
    }
    fn(resolve,reject)
}
new Promise(function (resolve) {
    console.log('first request start');
   setTimeout(function () {
       resolve('resolved first request');
   },2000)
}).then(function (res) {
    console.log(res);
    return new Promise(function (resolve,reject) {
        console.log('second request start');
        if (1) {
            resolve('resolve second request')
        } else {
            reject('reject second request')
        }

    })
},function (error) {
    console.log('error: ',error);
}).then(function (res) {
    console.log(res);
},function (error) {
   console.log('error: ',error);
})