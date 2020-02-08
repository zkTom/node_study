/**
 * parse object string path
 * eg:
 * data = { form: { name: 'llr' } } 
 * path = data.form.name
 * return llr
 * @param { Object } data 
 * @param { String } path data.form.xxx.xxx...
 * @param { String } splitLine 分割符
 * @returns { any } prop 返回的键值
 */
function parsePath(data, path, splitLine = ".") {
    let prop = data;
    path = path.split(splitLine);
    for (let i = 0, len = path.length; i < len; i++) {
        prop = prop[path[i]]
    }
    return prop;
}