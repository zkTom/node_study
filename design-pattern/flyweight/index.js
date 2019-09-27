const BookRecordManager = require('./BookRecordManager');
/**
 * flyweight 享元模式
 * 结构性解决方案，用于优化重复，缓慢以及数据共享效率较低的代码。
 * 运用共享技术有效地支持大量细粒度的对象。
 * 特点：
 * 1. 将数据分为内部数据和外部数据，内部数据不可被删除，而外部数据可以则可以被删除，修改。
 * 2. 数据可以被尽可能多的共享以减少应用程序的内存使用空间。
 */
const manager = new BookRecordManager();
// new Book();
const bookId1 = manager.addBookRecord("三体", "刘慈欣", "科幻", 425, "11757834", "11757834", new Date().toLocaleTimeString(), "张三", "无", "可用");
const bookId2 = manager.addBookRecord("东野圭吾：白夜行（2017版）", "东野圭吾", "推理", 607, "12135337", "9787544291163", new Date().toLocaleTimeString(), "张三", "无", "可用");
const bookId3 = manager.addBookRecord("长安十二时辰（上下共两册）", "马伯庸", "推理", 672, "12018031", "12018031", new Date().toLocaleTimeString(), "张三", "无", "可用");
const bookId4 = manager.addBookRecord("你和我的倾城时光（套装共2册）", "丁墨", "爱情", 688, "11563962", "9787550010970", new Date().toLocaleTimeString(), "张三", "无", "可用");
const bookId5 = manager.addBookRecord("世味余年", "江雪落", "爱情", 592, "12372473", "9787550028654", new Date().toLocaleTimeString(), "张三", "无", "可用");
manager.updateCheckoutStatus(bookId4, "不可用", new Date().toLocaleTimeString(), "张三", new Date(2019, 10, 27, 10, 10, 10).toLocaleTimeString());
manager.extendCheckoutPeriod(bookId4, new Date(2019, 10, 27, 15, 15, 10).toLocaleTimeString());
manager.queryBookById(bookId4);