/**
 * Created by 17701 on 2017/8/20.
 */
var path = require('path')
/**
 * basename(path<string>) 可以获取指定文件路径的最后一部分
 * windows下 win32.basename() 更好一点
 *console.log(path.win32.basename('/f/Program/'));
 *
 * dirname(path<string>) 获取指定文件路径的目录
 * console.log(path.dirname('/f/Program/1.txt'));
 *
 * extname(path<string>) 获取文件的扩展名
 * path.extname() 方法返回 path 的扩展名，即从 path 的最后一部分中的最后一个 .（句号）字符到字符串结束。
 * 如果 path 的最后一部分没有 . 或 path 的文件名（见 path.basename()）的第一个字符是 .，则返回一个空字符串。
 * path.extname('index.html');
 // 返回: '.html'

 path.extname('index.coffee.md');// 返回: '.md'

 path.extname('index.');// 返回: '.'

 path.extname('index');// 返回: ''

 path.extname('.index'); // 返回: ''
 *
 * resolve(...path<string>) 解析多个路径为一个绝对路径
 * 1.从右向左开始解析，直到构造出一个绝对路径便停止，并且返回该绝对路径
 * 2.注意参数中的./和../他们的区别
 * 3.无参数默认情况下返回当前工作目录的绝对路径
 * 4.在处理完全部的path片段后，仍不能得到绝对路径，则当前的工作目录的路径会被用上
 * console.log(path.resolve());//F:\node\查询，读写文件
 console.log(path.resolve('../azk'));//F:\node\azk
 console.log(path.resolve('/foo/bar','../azk'));//F:\foo\azk
 console.log(path.resolve('/foo/bar','./azk'))//F:\foo\bar\azk
 console.log(path.resolve('/foo/bar','/azk/file'));//F:\azk\file
 *
 *
 * relative(from<string>,to<string>) 可以确定从一个绝对路径如何到另外一个绝对路径
 * 返回标准化后的to路径相对于from路径 的相对路径
 *
 * console.log(path.relative('a/b/c','a/b/c'));// 空
 * console.log(path.relative('a/b/c','a/b/d'));// ..\d
 * exist() 确定某个指定的目录是否存在
 *
 *
 * join(...path)
 * path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
 * 长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。
 * path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
 * 返回: '/foo/bar/baz/asdf'
 *
 * normalize(path<string>)
 * path.normalize() 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。
 *
 *
 * */