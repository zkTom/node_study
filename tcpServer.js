/**
 * Created by 17701 on 2017/7/10.
 */
/**
 * net核心模块：可以实现TCP服务器及TCP客户端的建立。
 * net.Server：TCP server，内部通过socket来实现与客户端的通信。
 * net.Socket：tcp/本地 socket的node版实现，它实现了全双工的stream接口。
 *
 *
 * */
// data：当收到另一侧传来的数据时触发。
// connect：当连接建立时触发。(client端事件)
// close：连接断开时触发。如果是因为传输错误导致的连接断开，则参数为error。
// end：当连接另一侧发送了 FIN 包的时候触发（读者可以回顾下HTTP如何断开连接的）。默认情况下（allowHalfOpen == false），socket会完成自我销毁操作。但你也可以把 allowHalfOpen 设置为 true，这样就可以继续往socket里写数据。当然，最后你需要手动调用 socket.end()
// error：当有错误发生时，就会触发，参数为error。（官方文档基本一句话带过，不过考虑到出错的可能太多，也可以理解）
// timeout：提示用户，socket 已经超时，需要手动关闭连接。
// drain：当写缓存空了的时候触发。（不是很好描述，具体可以看下stream的介绍）
// lookup：域名解析完成时触发。
const net=require('net');
var PORT = 3000;
var HOST = '127.0.0.1';

//每当收到新的connection触发createServer
let server=net.createServer(function (socket) {
    console.log('服务端：收到来自客户端的请求');
    let timeout=60000;//1min
    socket.setTimeout(timeout);
    socket.on('',function () {
        console.log("服务端：连接断开");
        socket.end();
    });
    //接受到客户端数据时触发
    socket.on('data',function (data) {
        //获取数据和写入数据
        console.log('服务端：收到客户端数据，内容为{'+ data +'}');
        socket.write('你好，我是服务端');
    });
    //连接断开时触发
    socket.on('close', function(){
        console.log('服务端：客户端连接断开close');
    });
    //当连接另一侧发送了 FIN 包的时候触发(释放连接用的)
    socket.on('end', function(){
        console.log('服务端：释放当前链接end');
    });
    //服务器层出错时触发,（可能原因：无法绑定一个被占用端口或者无权限绑定端口）
    socket.on('error', function(error){
        console.log('服务端错误：',error.message);
    });
})

server.listen(PORT, HOST, function(){
    console.log('服务端：开始监听来自客户端的请求');
})

server.on('connection', function(socket){
    //socket对象既是可读流又是可写流，这就意味这当socket接受数据是会触发data事件。
    //socket.end('2. connection 触发\n');
    console.log("服务端：新建连接",socket.data);
})

server.close(function (error) {
    //连接关闭时触发
    /**
     * 对正在处理中的客户端请求，服务器会等待它们处理完（或超时），然后再正式关闭。
     * 正常关闭的同时，callback 会被执行，同时会触发 close 事件。
     * 异常关闭的同时，callback 也会执行，同时将对应的 error 作为参数传入。（比如还没调用 server.listen(port) 之前，就调用了server.close()）
     *
     * */
    if(error){
        console.log( 'close回调：服务端异常：' + error.message );
    }else{
        console.log( 'close回调：服务端正常关闭' );
    }
});