const express=require('express');
const router=express.Router();
const sql=require('../lib/mysql');
const fs = require('fs');
const multer = require ('multer');
const path = require('path');
let articleDao=require('../dao/articleDao');
let imageDao=require('../dao/imageDao');
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
var upload = multer({storage:storage});
router.get('/',(req,res) => {
    res.render('article')
})


router.post('/singleUpload', upload.single('cover'), function (request, response, next) {
    console.log(request.file);
    console.log(request.body);
    //判断 文章标题，内容，不为空
    let body=request.body;
    if (!body.title||!body.content) {
        response.json({status:'400',message:'参数错误'})
        return
    }
    if (body.title.length===0 && body.content.length ===0) {
        response.json({status:'400',message:'参数长度不满足'})
        return
    }
    articleDao.addArticle({
        title:request.body.title,
        create_time:new Date(),
        content:request.body.content
    }).then((res) => {
        return imageDao.addImage({
            img_name:request.file.originalname,
            url:request.file.path.replace(/(public)\//,''),
            article_id:res.insertId
        })
    }).then((res) => {
        response.json({status:'success'})
    }).catch(err => {
        res.json({status:err})
    })
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
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