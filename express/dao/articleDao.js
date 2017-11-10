const sql = require('../lib/mysql')


function addArticle({title,create_time,content}) {
    return new Promise((resolve,reject) => {
        let str = 'insert into article(title,create_time,content) values (?,?,?)'
        sql(str,[title,create_time,content],(err,data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
module.exports.addArticle=addArticle