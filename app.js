/**
 * Created by 17701 on 2017/7/10.
 */

const  http=require('http');
const server=http.createServer();
const util=require('util');

server.on('request',function (req, res) {

    res.writeHead(200,{'Content-Type':'text/plain','Cache-Control':'max-age=3600'});
    res.write('hello world')
    let obj={
        url:req.url,
        method:req.method,
        headers:req.headers,
    };
    res.write(util.inspect(obj));
    //response.end(param) param可以字符串或者缓冲区，在结束请求之前，将param写入响应
    res.end('this is my first http server');
});
server.listen(3001);
