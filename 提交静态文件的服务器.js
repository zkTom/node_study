/**
 * Created by 17701 on 2017/7/11.
 */

const path=require('path');
const fs=require('fs');

require('http').createServer(function (req, res) {
    let file=path.normalize('.'+req.url);
    console.log('Trying to serve',file);
    function reportError(err) {
        console.log(err);
        res.writeHead(500);
        res.end('Internal Server Error');
    }
    path.exists(file,function (exists) {
        if(exists){
            fs.stat(file,function (err, stat) {
                let rs;
                if(err){
                    return reportError(err);
                }
                if(stat.isDirectory()){
                    res.writeHead(403);
                    res.end('Forbidden');
                }else{
                    rs=fs.createReadStream(file);
                    rs.on('error',reportError);
                    res.writeHead(200);
                    rs.pipe(res);
                }
            })
        }else{
            res.writeHead(404);
            res.end('not found');
        }
    });
}).listen(3001);
