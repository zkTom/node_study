// 模拟一个目标上的多个Observer
class ObserverList {
    // list = [];
    constructor() {
        this.list = [];
    }
    // 添加Observer
    add(observer) {
        this.list.push(observer);
    }
    // 获取指定index的Observer
    get(index) {
        if (index > -1 && index < this.list.length) {
            return this.list[index];
        }
    }
    // 插入Observer到指定index后面
    insert(observer, index) {
        let pointer = -1;
        if (index > -1 && index < this.list.length) {
            this.list.splice(index, 0, observer);
            pointer = index + 1;
        }
        return pointer;
    }
    // 指定的Observer是否存在
    indexOf(observer, startIndex) {
        let pointer = -1;
        for (let i = startIndex || 0; i < this.list.length; i++) {
            if (this.list[i] === observer) {
                pointer = i;
            }
        }
        return pointer;
    }
    // 移除Observer通过index
    removeByIndex(index) {
        if (index > -1 && index < this.list.length) {
            this.list.splice(index, 1);
        }
    }
    // 清空ObserverList
    empty() {
        this.list = [];
    }
    count() {
        return this.list.length;
    }
}
module.exports = ObserverList;