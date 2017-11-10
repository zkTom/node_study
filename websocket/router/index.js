var express=require('express');
var router=express.Router();
router.get('/',(req,res) => {
    res.render('chat');
})
router.get('/test',(req,res) => {
    res.render('test');
})
module.exports=router;