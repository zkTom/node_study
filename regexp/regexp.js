// 0.01 || 1.01 100.01 两位有效数字的数字
let reg = /^(0|[1-9]\d*)\.\d{2}$/
let arr = []
console.log('[0.01]', reg.test('0.01'))
console.log('[1.01]', reg.test('1.01'))
console.log('[11.11]', reg.test('11.11'))
console.log('[100.00]', reg.test('100.00'))
console.log('[1.011]', reg.test('1.011'))
console.log('[011.11]', reg.test('011.11'))
console.log('[1.11.11]', reg.test('1.11.11'))
// 手机号匹配
arr = [ '15128061822', '15064255067', '13703207765', '151280618233', '15403207763' ]
let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
arr.forEach((item) => console.log(`[${item}]:${phoneReg.test(item)}`))
// 邮箱
let mailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
// 身份证
arr = [ '178404199609225441', '130481199209305134' ]
// 简单校验
let idcardReg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
// 严格校验
let idcardDetailReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
arr.forEach((item) => console.log(`[${item}]:${idcardDetailReg.test(item)}`))
// 空白行检测 (可以用来删除空白行)
arr = [ '' ]
let blankReg = /\n\s*\r/
arr.forEach((item) => console.log(`[${item}]:${idcardDetailReg.test(item)}`))
// IP地址
// let ipReg2 = /((0|([1-2][0-5]{0,2}))\.){3}/; test
arr = [ '127.0.0.1', '191.255.255.255', '239.255.255.255', '192.168.0.20', '0.0.0.0', '127.000.1.1' ]
let ipReg = /^\d+\.\d+\.\d+\.\d+$/
let ipReg1 = /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/
arr.forEach((item) => console.log(`[${item}]:${ipReg1.test(item)}`))
// HTML标签过滤
arr = [ '<script>var a = 1;</script>' ]
let htmlTagReg = /<(\S*?)[^>]*>.*?<\/\1>|<.*? \/>/
arr.forEach((item) => console.log(`[${item}]:${htmlTagReg.test(item)}`))
// 货币格式过滤
// 检查身份证格式 + 最后一位校验码校验（根据ISO 7064:1983.MOD 11-2校验码）
function checkCode(val) {
	var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
	var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
	var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
	var code = val.substring(17)
	if (p.test(val)) {
		var sum = 0
		for (var i = 0; i < 17; i++) {
			sum += val[i] * factor[i]
		}
		if (parity[sum % 11] == code.toUpperCase()) {
			return true
		}
	}
	return false
}
// 检查身份证日期
function checkDate(val) {
	var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
	if (pattern.test(val)) {
		var year = val.substring(0, 4)
		var month = val.substring(4, 6)
		var date = val.substring(6, 8)
		var date2 = new Date(year + '-' + month + '-' + date)
		if (date2 && date2.getMonth() == parseInt(month) - 1) {
			return true
		}
	}
	return false
}
// 检查身份证省份
function checkProv(val) {
	var pattern = /^[1-9][0-9]/
	var provs = {
		11: '北京',
		12: '天津',
		13: '河北',
		14: '山西',
		15: '内蒙古',
		21: '辽宁',
		22: '吉林',
		23: '黑龙江 ',
		31: '上海',
		32: '江苏',
		33: '浙江',
		34: '安徽',
		35: '福建',
		36: '江西',
		37: '山东',
		41: '河南',
		42: '湖北 ',
		43: '湖南',
		44: '广东',
		45: '广西',
		46: '海南',
		50: '重庆',
		51: '四川',
		52: '贵州',
		53: '云南',
		54: '西藏 ',
		61: '陕西',
		62: '甘肃',
		63: '青海',
		64: '宁夏',
		65: '新疆',
		71: "台湾",
		81: "香港",
		82: "澳门"
	}
	if (pattern.test(val)) {
		if (provs[val]) {
			return true
		}
	}
	return false
}
