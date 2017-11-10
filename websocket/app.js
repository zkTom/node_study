const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
let ws = require('socket.io');

let PORT = 3001;
let HOST = '127.0.0.1';
let numbers = 0;

const VIEWS = __dirname + "/views";
app = express();
app.use(cookieParser('Tom'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", VIEWS);
app.set("view engine", "ejs");
app.set('port', process.env.PORT || PORT);
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.locals.showTests = process.env !== 'production' &&
        req.query.test === '1';
    next();
});


app.use('/', require('./router/index'));
//处理所有没有路由匹配的处理器
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
let server = http.createServer(app);
let io = ws(server);
// 有连接接入就会创建socket连接
// connection有链接接入就会触发
io.on('connection', function(socket) {
    //client 代表当前连接的客户端相关信息
    //socket.handshake请求头信息
    var addeduser = false;// 维护用户是否在线
    socket.on("new msg", function(data) {
        data = {
            username: data.username || socket.handshake.address,
            message: data.message
        }
        // 除了当前socket,其余都会触发clientMessage;
        socket.broadcast.emit('new msg', data);
    });
    // 添加新用户
    socket.on("add user", function(data) {
        if (addeduser) return;

        socket.username = data.username;
        ++numbers;
        addeduser = true;
        socket.emit('login', {
            numbers: numbers
        });
        // 用户加入提示
        socket.broadcast.emit('user joined', {
            username: socket.username,
            numbers: numbers
        });
    });
    // 用户离开聊天室,由Socket.io指定(用户断开连接主动触发)
    socket.on('disconnect', function(reason) {
        if (addeduser) {
            if (numbers) --numbers;
            console.log("disconnect",socket.username);
            socket.broadcast.emit('user left', {
                username: socket.username || socket.handshake.address,
                numbers: numbers
            });
        }
    });
});
server.listen(app.get('port'), HOST, function() {
    console.log('Express started on address:' + HOST + ':' + app.get('port'));
});