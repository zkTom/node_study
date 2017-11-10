/**
 * Created by 17701 on 2017/7/30.
 */
//仅仅是和数据库进行交互
const sql=require('../lib/mysql');

//用户注册
let UserService={
    register:(username,password)=>{
        "use strict";
        let str='INSERT INTO user (username,password) VALUES (?,?)';
        sql(str,[username,password],(err,data)=>{
            //res.render('success')
            // res.json({
            //     status:'success'
            // })
            console.log(err);
            if(err){
                console.error(err);
            return false;
            }
            return true;
        });
    },
    isRegister:()=>{
        "use strict";

    }
}
module.exports=UserService;