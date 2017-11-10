/**
 * Created by 17701 on 2017/7/11.
 */
//响应浏览器的方法
/**
 * app.get() 动态添加路由的一种方法
 * app.use() 添加中间件的一种方法
 * */
const http = require('http');
const express = require('express');
const sql = require('./lib/mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let PORT = 3001;
let HOST = '127.0.0.1';
const VIEWS = __dirname + "/views";
//初始化
app = express();
//捕获cookie
app.use(cookieParser('Tom'));
//解析post请求的body
app.use(bodyParser.json());//json化
//extended:true 解析任何格式的数据
app.use(bodyParser.urlencoded({extended: true}));
//设置渲染模板
app.set("views", VIEWS);
app.set("view engine", "ejs");
//设置端口
app.set('port', process.env.PORT || PORT);
//处理所有静态资源（css,js,image） 使用:<img src="/image/2.jpg" />不用加public
app.use(express.static(__dirname + '/public'));
//app.use(public,express.static(__dirname+'/public'));<img src="public/image/2.jpg" />无public则报错
//网页测试 test=1则开启测试
//res.locals是传给视图上下文的一部分
app.use(function (req, res, next) {
    res.locals.showTests = process.env !== 'production' &&
        req.query.test === '1';
    next();
});


app.use('/', require('./router/index'));
app.use('/login',require('./router/login'))
app.use('/register',require('./router/register'))
app.use('/user', require('./router/user'));
app.use('/article',require('./router/article'))
app.use('/upload',require('./router/upload'))
//处理所有没有路由匹配的处理器
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
http.createServer(app).listen(app.get('port'), HOST, function () {
    console.log('Express started on address:' + HOST + ':' + app.get('port'));
});
