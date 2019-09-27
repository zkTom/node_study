const Book = require('./Book');
/**
 * 享元工厂：BookFactory
 * 保证为每一本书仅仅做一次初始化，若已经存在则返回已经有的实例。
 */
class BookFactory {
    constructor() {
        // 维护所有已经存在的Book
        // this.books = {};
    }
    static createBook(title, author, genre, pageCount, publisherId, ISBN) {
        if (!(BookFactory.books instanceof Object)) {
            BookFactory.books = {};
        }
        let book = BookFactory.books[ISBN];
        if (!(book instanceof Book)) {
            book = new Book(title, author, genre, pageCount, publisherId, ISBN);
            BookFactory.books[ISBN] = book;
        }
        return book;
    }
}
module.exports = BookFactory;