/**
 * Created by 17701 on 2017/7/11.
 */
const express=require('express');
const router=express.Router();
const sql=require('../lib/mysql');


//查询用户列表
router.get('/',(req,res)=>{
   var str = 'select * from user'
   sql(str,(err, data) => {
       console.log(data);
       res.render('index.ejs', {user_list:data})
   })
});
router.get('/',(req,res)=>{
    var str = 'select * from user'
    sql(str,(err, data) => {
        console.log(data);
        res.render('index', {pageTestScript:'qa/tests-global.js',
            user_list:data})
    })
    // res.sendFile(process.cwd()+'/express/views/index.html');
});
module.exports=router;