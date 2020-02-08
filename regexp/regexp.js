// 0.01 || 1.01 100.01 两位有效数字的数字
let reg = /^(0|[1-9]\d*)\.\d{2}$/;
let arr = [];
console.log("[0.01]", reg.test('0.01'));
console.log("[1.01]", reg.test('1.01'));
console.log("[11.11]", reg.test('11.11'));
console.log("[100.00]", reg.test('100.00'));
console.log("[1.011]", reg.test('1.011'));
console.log("[011.11]", reg.test('011.11'));
console.log("[1.11.11]", reg.test('1.11.11'));
// 手机号匹配
arr = ['15128061822', '15064255067', '13703207765', '151280618233', '15403207763'];
let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
arr.forEach(item => console.log(`[${item}]:${phoneReg.test(item)}`));
// 邮箱
let mailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
// 身份证 
arr = ['178404199609225441', '130481199209305134'];
let idcardReg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
let idcardDetailReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|1[012])(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
arr.forEach(item => console.log(`[${item}]:${idcardDetailReg.test(item)}`));
// 空白行检测 (可以用来删除空白行)
arr = [''];
let blankReg = /\n\s*\r/;
arr.forEach(item => console.log(`[${item}]:${idcardDetailReg.test(item)}`));
// IP地址
// let ipReg2 = /((0|([1-2][0-5]{0,2}))\.){3}/; test
arr = ['127.0.0.1', '191.255.255.255', '239.255.255.255', '192.168.0.20', '0.0.0.0', '127.000.1.1'];
let ipReg = /^\d+\.\d+\.\d+\.\d+$/;
let ipReg1 = /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/;
arr.forEach(item => console.log(`[${item}]:${ipReg1.test(item)}`));
// HTML标签过滤
arr = ['<script>var a = 1;</script>'];
let htmlTagReg = /<(\S*?)[^>]*>.*?<\/\1>|<.*? \/>/;
arr.forEach(item => console.log(`[${item}]:${htmlTagReg.test(item)}`));
// 货币格式过滤
