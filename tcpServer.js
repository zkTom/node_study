/**
 * Created by 17701 on 2017/7/10.
 */
/**
 * net核心模块：可以实现TCP服务器及TCP客户端的建立。
 * net.
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
net.createServer(function (socket) {
    console.log('服务端：收到来自客户端的请求');
    //接受到客户端数据时触发
    socket.on('data',function (data) {
        //获取数据和写入数据
        console.log('服务端：收到客户端数据，内容为{'+ data +'}');
        socket.write('你好，我是服务端');
    });

    socket.on('close', function(){
        console.log('服务端：客户端连接断开close');
    });

    socket.on('end', function(){
        console.log('服务端：end');
    });
    //服务器层出错时触发,（可能原因：无法绑定一个被占用端口或者无权限绑定端口）
    socket.on('error', function(error){
        console.log('服务端错误：',error.message);
    });

}).listen(PORT, HOST, function(){
    console.log('服务端：开始监听来自客户端的请求');
}).on('connection', function(socket){
    //socket对象既是可读流又是可写流，这就意味这当socket接受数据是会触发data事件。
    //socket.end('2. connection 触发\n');
    console.log("服务端：新建连接",socket.data);
});;