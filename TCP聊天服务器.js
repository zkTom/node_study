/**
 * Created by 17701 on 2017/7/11.
 */
const net=require('net');
const server=net.createServer();
let sockets=[];
let PORT = 3000;
let HOST = '127.0.0.1';

server.listen(PORT, HOST, function(){
    console.log('服务端：开始监听来自客户端的请求');
})

server.on('connection', function(socket){
    console.log("服务端：新建连接",socket.data);
    sockets.push(socket);
    socket.on('data',function (data) {
        console.log('服务端：获取到的数据为',data);
        sockets.forEach(function (otherSocket) {
            if(otherSocket!==socket){
                otherSocket.write(data);
            }
        })
    });
    socket.on('close',function () {
        let index=sockets.indexOf(socket);
        sockets.splice(index,1);
        console.log('服务端：断开连接',index);
    });
})

// server.on('close',function (error) {
//     if(error && error!==undefined){
//         console.log( 'close回调1：服务端异常：' + error.message );
//     }else{
//         console.log( 'close回调1：服务端正常关闭' );
//     }
// });
server.on('error',function (err) {
    console.log("服务端：发生错误，",err.message);
});
server.close(function (error) {
    if(error && error!==undefined){
        console.log( 'close回调：服务端异常：' + error.message );
    }else{
        console.log( 'close回调：服务端正常关闭' );
    }
});
