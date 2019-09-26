const ObserverList = require('./ObserverList');

// subject 模拟目标
class Subject {
    constructor() {
        this.observerList = new ObserverList();
    }
    addObserver(observer) {
        this.observerList.add(observer);
    }
    removeObserver(observer) {
        this.observerList.removeByIndex(this.observerList.indexOf(observer));
    }
    notify(context) {
        const count = this.observerList.count();
        for (let i = 0; i < count; i++) {
            this.observerList.get(i).update(context);
        }
    }
}
module.exports = Subject;