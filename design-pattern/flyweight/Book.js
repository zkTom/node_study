const BookInterface = require('./BookInterface');
/**
 * 具体享元：Book
 * 规定具体内部状态以及实例化
 */
class Book extends BookInterface {
    constructor(title, author, genre, pageCount, publisherId, ISBN) {
        super();
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pageCount = pageCount;
        this.publisherId = publisherId;
        this.ISBN = ISBN;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getISBN() {
        return this.ISBN;
    }
    showLastRecord(context) {
        if (typeof context === 'object' && context != null) {
            const { id, checkoutDate, checkoutMember, dueReturnDate, availability } = context;
            console.log(`图书${this.title}-${id}在${checkoutDate}经过${checkoutMember}图书管理员借出，归还时间到${dueReturnDate}, 当前图书${availability}`);
        }
    }
}
module.exports = Book;