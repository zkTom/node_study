/**
 * Created by 17701 on 2017/7/10.
 */
var net = require('net');

var PORT = 3000;
var HOST = '127.0.0.1';

// tcp客户端
var client = net.createConnection(PORT, HOST);
//客户端新建连接时触发
client.on('connect', function(){
    console.log('客户端：已经与服务端建立连接');
});
//收到服务端返回数据时触发
client.on('data', function(data){
    console.log('客户端：收到服务端数据，内容为{'+ data +'}');
});
//与服务端断开连接的时候触发
client.on('close', function(data){
    console.log('客户端：连接断开');
});
//TODO
client.end('你好，我是客户端');