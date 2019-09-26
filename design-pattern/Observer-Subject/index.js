const Observer = require('./Observer');
const Subject = require('./Subject');
/**
 * 测试：
 *   一个典型的购票网站,以购票为核心业务(此模式不限于该业务)，但围绕购票会产生不同的其他逻辑，如：
 *   1. 购票后记录文本日志
 *   2. 购票后记录数据库日志
 *   3. 购票后发送短信
 *   4. 购票送抵扣卷、兑换卷、积分
 *   5. 其他各类活动等
 * Subject：购票系统
 * 兴趣点：购票
 * Observer: LogObServer/SmsObserver/PointObserver/ActivityObserver
 * 缺点：会依附于当前Subject，依附性强，一旦注册了Observer则必须订阅内容改变事件。
 **/
class OrderSystem extends Subject {
    constructor() {
        super();
        this.logOb = new LogObserver();
        this.smsOb = new SmsObserver();
        this.pointOb = new PointObserver();
        this.activityOb = new ActivityObserver();
        this.sqlOb = new SqlObServer();
        this.addObserver(this.logOb);
        this.addObserver(this.sqlOb);
        this.addObserver(this.smsOb);
        this.addObserver(this.pointOb);
        this.addObserver(this.activityOb);   
    }
    orderTicket() {
        console.log('开始购票');
        this.notify({ buyDate: new Date().toLocaleDateString() });
        console.log('购票结束');
    }
    orderTicketWithNoSmsObserver() {
        this.removeObserver(this.smsOb);
        this.smsOb = null;
        console.log('开始购票');
        this.notify({ buyDate: new Date().toLocaleDateString() });
        console.log('购票结束');
    }
}
// 文本日志Observer
class LogObserver extends Observer {
    update(context) {
        console.log(`${context.buyDate}:购票成功，开始记录文本日志`);
    }
}
// sqlObServer
class SqlObServer extends Observer {
    update(context) {
        console.log(`${context.buyDate}:购票成功，开始记录数据库日志`);
    }
}
// 短信Observer
class SmsObserver extends Observer {
    update(context) {
        console.log(`${context.buyDate}:购票成功，开始发送短信`);
    }
}
// 积分Observer 
class PointObserver extends Observer {
    update(context) {
        console.log(`${context.buyDate}:购票成功，开始增加购买者积分`);
    }
}
// 最近活动Observer
class ActivityObserver extends Observer {
    update(context) {
        console.log(`${context.buyDate}:购票成功，开始推荐其他活动`);
    }
}
new OrderSystem().orderTicket();