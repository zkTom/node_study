var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require ('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var coverPath = path.resolve('/node/express','./public/cover');
        if (!fs.existsSync(coverPath)) {
           fs.mkdir(coverPath)
        }
        cb(null, coverPath)
    },
    filename: function (req, file, cb) {
        var ext=path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now()+ext)
    }
})
//设置上传的目录，
//这里指定了一个临时目录（上传后的文件均保存到该目录下），
//真正开发是一般加入path模块后使用path.join(__dirname,'temp');
var upload = multer({storage:storage});

//处理http://127.0.0.1:3000请求，这个例子没有用到
router.get('/', function(req, res){
    res.render('upload');
});


//单位件上传
//注意上传界面中的 <input type="file" name="avatar"/>中的name必须是下面代码中指定的名称
router.post('/singleUpload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    console.log(req.body);
    var img_name,url,article_id
    res.render('success')
});

//多附件上传
//注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名
router.post('/mulUpload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    console.log(req.files);
    console.log(req.body);
    //res.end(req.file + "<br/><br/>" + req.body);
    res.render('success')

})
module.exports = router