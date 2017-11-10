const express=require('express');
const router=express.Router();
const sql=require('../lib/mysql');


router.get('/',(req, res)=>{
    res.render('register');
})
//处理注册用户
router.post('/',(req,res)=>{
    // let bool=  UserService.register(req.body.name,req.body.password);
    let str='INSERT INTO User (username,password,create_time) VALUES (?,?,?)';
    sql(str,[req.body.name,
        req.body.password,
        new Date()],(err,data)=>{
        if(err){
            res.render('register');
            return;
        }
        res.json({
            status:'success'
        })
    });
});
module.exports=router;
