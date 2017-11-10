/**
 * Created by 17701 on 2017/7/11.
 */
//__filename是当前文件所在目录F:\node\express\router\index.js
//__dirname是当前文件的绝对路径 F:\node\express\router
//process.cwd()是工作目录
//res.sendFile();
//res.json();
const express=require('express');
const fortunes=require(process.cwd()+'/fortune.js');
const router=express.Router();
const sql = require('../lib/mysql')

router.get('/',(req,res) => {
    res.render('index')
})
module.exports=router;