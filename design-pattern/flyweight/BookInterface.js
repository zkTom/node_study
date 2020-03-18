/**
 * 要被具体的享元所实现的方法
 * 抽象享元：BookInterface
 */
class BookInterface {
    constructor() {
        this.getTitle();
        this.getAuthor();
        this.getISBN();
        this.showLastRecord();
    }
    getTitle() {
        throw new Error('getTitle must be override');
    }
    getAuthor() {
        throw new Error('getAuthor must be override');
    }
    getISBN() {
        throw new Error('getISBN must be override');
    }
    // 展示这本书最近的借阅
    showLastRecord(context) {
        throw new Error('showLastRecord must be override');
    }
}
module.exports = BookInterface;