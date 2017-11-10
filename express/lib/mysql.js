/**
 * Created by 17701 on 2017/7/30.
 */
var mysql=require('mysql');
/**
 * @param {string} sql 查询语句
 * @param {array} arr 动态嵌入语句的内容
 * @param {callback} callback 回调函数 (err,data)
 * err：错误信息
 * data:回调数据
 *
 * */
module.exports=function (sql,arr, callback) {
    var config= mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"5690645.",
        port:'3306',
        database:'blog'
    });
//开始连接
    config.connect();
//数据操作
    config.query(sql,arr,function(err,data){
        if(err){
            throw new Error(err);
        }
        callback(err,data);
    });
    config.end();
};
