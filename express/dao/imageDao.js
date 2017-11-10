const sql = require('../lib/mysql')


function addImage({img_name,url,article_id}) {
    return new Promise((resolve,reject) => {
        let str = 'insert into image(img_name,url,article_id) values (?,?,?)'
        sql(str,[img_name,url,article_id],(err,data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    })
}
module.exports.addImage=addImage