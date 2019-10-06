/**
 * this.value => this._data.value =>Observe(this._data.value)
 */
const data = {
	value: 'test string'
	// arr: [ 1, 2, 3 ],
	// obj: {
	// 	account: 'tom',
	// 	gender: 'male',
	// 	isOk: true
	// }
}
/**
 * 代理data.value,当触发getter/setter时，访问和修改的都是val,而不是data.value;
 * val -> data.value
 */
const data = { 
    value: 'test string'
  };
  function test() {
    let val = data["value"];
    Object.defineProperty(data, "value", {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('get:', val)
			return val
        },
        set: function(newVal) {
            console.log('set:', newVal);
            val = newVal;
        }
    })
}
test();
data.value = "test changed";
