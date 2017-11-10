// 文件系统   操作文件
const fs = require('fs');
//fs.mkdir('../test1')
//fs.rmdir('./test')
// fs.unlink('./text1',(err) => {
//     if (err) throw err;
//     else console.log('success')
// })
fs.open('./mysql.js','a+', (err, fd) => {
    if (err) {
    console.log('err',err);
    } else {
    console.log(fd);
    }
})
/**
 * fs.access(path[, mode], callback)
 * mode
 * fs.constants.F_OK - path 文件对调用进程可见。 这在确定文件是否存在时很有用，但不涉及 rwx 权限。 如果没指定 mode，则默认为该值。
 * fs.constants.R_OK - path 文件可被调用进程读取。
 * fs.constants.W_OK - path 文件可被调用进程写入。
 * fs.constants.X_OK - path 文件可被调用进程执行。 对 Windows 系统没作用（相当于 fs.constants.F_OK）。
 * */
fs.access('./mysql.js','fs.constants.R_OK | fs.constants.W_OK',(err) => {
    console.log(err ? 'no right to access': 'can read/write');
})
// fs.stat('./mysql.js',(err, data) => {
//     if (err) throw err
//     console.log(data);
// })
// 打开文件 , 如果这个文件不存在则创建
// 可以用来检测 文件时候存在
// fs.open(path, flags[, mode], callback)
/*fs.open('./3.txt','wx',(err,data) => {
    console.log(data);
});*/

/** fs.appendFile(file, data[, options], callback)
    异步地追加数据到一个文件，如果文件不存在则创建文件。 data 可以是一个字符串或 buffer。
fs.appendFile('./mysql.js','这是用来测试的','utf8',(err) => {
    console.log(err);
})
 */
/** fs.writeFile(file, data[, options], callback)
   异步地写入数据到文件，如果文件已经存在，则替代文件。 data 可以是一个字符串或一个 buffer。
fs.writeFile('./mysql1.js','这个方法是替换1231',(err) => {
    console.log(err);
});
 */
// fs.readFile(path[, options], callback)
fs.readFile('./mysql1.js',(err,data) => {
    console.log(data);
});

// 读取文件夹
/*fs.readdir('./views/admin',(err,data) => {
    console.log(data);
});*/

// Sync 同步操作
/*let a = fs.readdirSync('./views/admin');
console.log(a);*/
// 重命名
// fs.rename('./app.txt','app.js',() => {
//
// });
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
