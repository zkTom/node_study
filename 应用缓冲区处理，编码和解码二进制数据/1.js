/**
 * Created by 17701 on 2017/7/29.
 */
//buffer 只是把数据转换成二进制数据来操作
/**
 *  new Buffer(array)
 new Buffer(arrayBuffer[, byteOffset [, length]])
 new Buffer(buffer)
 new Buffer(size)
 new Buffer(string[, encoding])
 以上API全部废弃了
 buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

     target: <Buffer> | <Uint8Array> 要拷贝进的 Buffer 或 Uint8Array。
     targetStart: <integer> target 中开始拷贝进的偏移量。 默认: 0
     sourceStart: <integer> buf 中开始拷贝的偏移量。 当 targetStart 为 undefined 时忽略。 默认: 0
     sourceEnd: <integer> buf 中结束拷贝的偏移量（不包含）。 当 sourceStart 为 undefined 时忽略。 默认: buf.length
     返回: <integer> 被拷贝的字节数。
     eg:
     var buf=Buffer.from("ahello world");
     var buf1=new Buffer(20);

     buf.copy(buf1,0,1,8);//hello w

 Buffer.from(array)  返回一个新建的包含所提供的字节数组的副本的 Buffer。
     eg:
     var buf2=Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);


 Buffer.from(arrayBuffer[, byteOffset [, length]]) 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
     arrayBuffer： <ArrayBuffer> 一个 ArrayBuffer，或一个 TypedArray 的 .buffer 属性。
     byteOffset： <integer> 开始拷贝的索引。默认为 0。
     length： <integer> 拷贝的字节数。默认为 arrayBuffer.length - byteOffset。
     该方法将创建一个 ArrayBuffer 的视图，而不会复制底层内存。例如，当传入一个 TypedArray 实例的 .buffer 属性的引用时，这个新建的 Buffer 会像 TypedArray 那样共享同一分配的内存。
    Buffer.from(buffer) 返回一个新建的包含所提供的 Buffer 的内容的副本的 Buffer。
    eg
     var arr=new Uint16Array(2);
     var buf4=Buffer.from(arr.buffer);
     arr[0]=5000;
     arr[1]=111;
     console.log(arr);Uint16Array [ 5000, 111 ]
     buf4[0]=1;
     console.log(arr);Uint16Array [ 4865, 111 ]

 Buffer.from(string[, encoding]) 返回一个新建的包含所提供的字符串的副本的 Buffer。
 eg:
 var buf3=Buffer.from("who am i",'binary');
 console.log(buf3.toString('hex'));//77686f20616d2069
 console.log(buf3.toString('utf-8'));//who am i

 Buffer.alloc(size[, fill[, encoding]]) 返回一个指定大小的被填满的 Buffer 实例。 这个方法会明显地比 Buffer.allocUnsafe(size) 慢，但可确保新创建的 Buffer 实例绝不会包含旧的和潜在的敏感数据。
 Buffer.allocUnsafe(size) 与 Buffer.allocUnsafeSlow(size) 返回一个新建的指定 size 的 Buffer，但它的内容必须被初始化，可以使用 buf.fill(0) 或完全写满。
 Buffer.isBuffer(obj) 用于判读obj是否是Buffer类型，return boolean;
 Buffer.isEncoding(encoding) 是一个支持的字符编码则返回 true，否则返回 false 。

 * */
var buf=Buffer.from("ahello world");
var buf2=Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
var buf3=Buffer.from("who am i",'binary');

console.log(buf);
console.log(buf.length);


