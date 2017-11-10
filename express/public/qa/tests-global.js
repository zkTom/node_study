/**
 * Created by 17701 on 2017/7/29.
 */
suite('Global Tests',function () {
    test('page has a valid title',function () {
        assert(document.title && document.title.match(/\s/)&&
        document.title.toUpperCase()!=='TODO');
    });
});
