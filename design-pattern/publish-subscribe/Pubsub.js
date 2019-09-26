/**
 * 发布/订阅者模式
 * publish/subscribe
 * 不同于Observer模式的直接依赖， 发布/订阅者模式使用一个主题/事件通道，客体发布指定事件（指定兴趣点），订阅者可以参考自己的情况决定是否订阅。
 * 缺点：
 * 1. 交互性较低，如果某个订阅者出现异常，发布者无法感知。
 * 2. 订阅者之间很难产生联系，并且对变换发布者的成本视而不见（？？）。
 * 3. 由于订阅者和发布者二者之间的动态关系，很难进行依赖追踪。
 */
class Pubsub {
    constructor() {
        this.topics = {};
        this.subUid = -1;
    }
    /**
     * 发布或者广播事件
     * @param {String} topic topic名称
     * @param {*} args callback的回调参数
     */
    publish(topic, args) {
        if (!this.topics[topic]) {
            console.log('没有订阅者订阅当前topic');
            return false;
        }
        const subscribers = this.topics[topic];
        let len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].callback(args);
        }
        return this; // ??
    }
    /**
     * 通过特定名称和callback订阅事件， topic/event 触发时执行事件
     * @param {String} topic topic名称
     * @param {Function} callback 回调函数
     */
    subscribe(topic, callback) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        const token = ++this.subUid;
        this.topics[topic].push({
            token: token,
            callback: callback
        })
        return token;
    }
    /**
     * 基于订阅上的标记引用，通过特定的topic取消订阅
     * @param {String} param token | topic
     * @returns { boolean } flag 取消订阅是否成功
     */
    unSubscribe(param) {
        let flag = false;
        if (typeof param === 'number') {
            flag = this._unSubscribeByToken(param);
        } else {
            flag = this._unSubscribeByTopic(param);
        }
        return flag;
    }
    /**
     * 基于订阅上的标记引用，通过特定的topic标示取消订阅
     * @param {number} token topic标示
     * @returns { boolean } flag 取消订阅是否成功
     */
    _unSubscribeByToken(token) {
        let flag = false;
        for (let topic in this.topics) {
            const events = this.topics[topic];
            if (events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    if (events[i].token === token) {
                        events.splice(i, 1);
                        flag = true;
                    }
                }
            }
        }
        return flag;
    }
    /**
     * 基于订阅上的topic，通过特定的topic取消订阅
     * @param {String} topic topic名称
     * @returns { boolean } flag 取消订阅是否成功
     */
    _unSubscribeByTopic(topic) {
        let flag = false;
        const events = this.topics[topic];
        if (events.length > 0) {
            events.splice(0, events.length);
            flag = true;
        }
        return flag;
    }
}
module.exports = Pubsub;