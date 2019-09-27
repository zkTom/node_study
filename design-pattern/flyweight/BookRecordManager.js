const BookFactory = require('./BookFactory');
/**
 * 用来管理Book外部状态，包括借出等相关逻辑。
 */
class BookRecordManager {
    constructor() {
        this.database = {};
        this.suId = 0;
    }
    
    addBookRecord(title, author, genre, pageCount, publisherId, ISBN, checkoutDate, checkoutMember, dueReturnDate, availability) {
        const book = BookFactory.createBook(title, author, genre, pageCount, publisherId, ISBN);
        const curId = this.suId;
        this.database[this.suId++] = {
            id: curId,
            checkoutDate,
            checkoutMember,
            dueReturnDate,
            availability,
            book
        }
        return curId;
    }
    // 更新借书状态
    updateCheckoutStatus(bookId, newStatus, checkoutDate, checkoutMember, newReturnDate) {
        const record = this.database[bookId];

        record.availability = newStatus;
        record.checkoutDate = checkoutDate;
        record.checkoutMember = checkoutMember;
        record.dueReturnDate = newReturnDate;
        console.log(`图书${record.book.title}-${bookId}在${checkoutDate}经过${checkoutMember}图书管理员借出，归还时间到${newReturnDate}, 当前图书${newStatus}`);
    }
    // 延期借书
    extendCheckoutPeriod(bookId, newReturnDate) {
        const record = this.database[bookId];
        console.log(`图书${record.book.title}-${bookId}原计划归还时间${record.dueReturnDate}，延期至${newReturnDate}, 当前图书不可用`);
        record.newReturnDate = newReturnDate;
    }
    // 收否过期
    isPastDue(bookId) {
        const currentDate = new Date();
        let isDue = currentDate.getTime() > Date.parse(this.database[bookId].dueReturnDate);
        console.log(`图书${record.book.title}-${bookId}:${isDue ? '已经超过归还时间' : '未超过归还日期'}`);
        return isDue;
    }
    // 查询某本书籍
    queryBookById(bookId) {
        const record = this.database[bookId];
        record.book.showLastRecord(record);
        return 
    }
}
module.exports = BookRecordManager;