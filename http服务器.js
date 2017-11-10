/**
 * Created by 17701 on 2017/7/11.
 */
//也可以这样简洁的建立
//require('http').createServer(function (req, res) {
//     res.writeHead(200,{'Content-Type':'text/plain'});
//      res.write('hello world')
//      res.end();
// }).listen(3001);
/**
 *      //设置请求头
 *      res.writeHead(200,{'Content-Type':'text/plain'});
 *      //写入body内容
 *      res.write('hello world')
 *      //发送响应
 *      res.end();
 *
 * */
const  http=require('http');
const server=http.createServer();
const util=require('util');

server.on('request',function (req, res) {
    //res.setHeader('abc','abc');
    //res.removeHeader('Cache-Control');
    //如果在当前的response使用了writeHead，setHeader会失效，因为writeHead会发送响应头,removeHeader也会失效
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

