const fs = require("fs")
const { Writable, Readable } = require("stream")
//自定义实现输出流
class MyWritable extends Writable {
    constructor(options) {
      super(options);
      // ...
    }
  
    _write(chunk, encoding, callback) {
      if (chunk.toString().indexOf('a') >= 0) {
        callback(new Error('无效的数据块'));
      } else {
        callback("传输成功");
      }
    }
  }
//自定义实现输入流
class MyReadable extends Readable {
    constructor(data = [], option) {
        super(option);
        this.data = data 
    }
    //必须重写_read()
    //在_read()中调用push将每一部分数据推送到Pipe中，push(null)表明传输完毕
    _read() {
        this.data.forEach(chunk => {
            this.push(chunk);
        })
        this.push(null);
      }
}
// const reader = new MyReadable(['aa', 'bb', 'cc']);

// reader.on('data', function (chunk) {
//     console.log("reader:"+chunk.toString());
// })
//创建一个读取流
// const readStream = fs.createReadStream("./test.txt")
// //创建一个写入流
// const writeStream = fs.createWriteStream("./test.txt","utf-8")
// readStream.on("data", chunk => {
//     console.log(chunk)
// })
// readStream.on("end", () => console.log("the stream is in the end"))
// fs.open("./test2.txt", "wx", (err, fd) => {
//     if (err) {
//         if (err.code === "EEXIST") {
//             writer.write("123123123123123123123123", "utf-8", err => console.log("write1:"+err))
//             return
//         }

//         throw(err)
//     }

//     //写入数据
//     writer.write("1231231231231999999","utf-8", err => console.log("write2:"+err))
//     //结束写入
//     writer.end("结束写入");
// })
// stream.Writable.on("finish", () => console.log("写入finished"))

