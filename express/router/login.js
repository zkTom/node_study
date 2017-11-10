const express=require('express');
const router=express.Router();
const sql=require('../lib/mysql');


router.get('/',(req,res)=>{
    res.render('login');
});
//用户登录
router.post('/',(req,res)=>{
    let str='select * from User where username=? and password=?';
    sql(str,[req.body.name,
        req.body.password], (err,data)=>{
        if(!err && data.length===1){
            res.cookie('user',{username:req.body.name},{maxAge:1000*60});
            res.locals.status = 'success'
            res.render('success');
            return;
        }
        // res.json({
        //     status:'error'
        // })
        res.locals.status='error';
        res.render('login');
    });
});
module.exports=router;