/**
 * Created by 17701 on 2017/7/10.
 */
//当前文件的路径
var os = require('os');
var fs = require('fs');
console.log(__filename);
//当前文件的目录路径
console.log(__dirname);
//process对象 node进程的工作目录(根目录)
console.log(process.cwd());
// fs.open('F:/myproject/myblogServer/public/cover2/1.txt', 'w+', (err, fd) => {
//       if (err) throw err;
// });