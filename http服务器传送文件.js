/**
 * Created by 17701 on 2017/7/11.
 */

const http=require('http');
const fs=require('fs');
const util=require('util');

"use strict";
    const server=http.createServer((req,res)=>{
        res.writeHead(200,{'Content-Type':'video/mp4'});
        let rs=fs.createReadStream('F:\\迅雷下载\\Template\\Deal\\H62\\scripts\\piecemaker\\contents\\video.mp4');
        rs.pipe(res);

}).listen(3001);

