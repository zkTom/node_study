const Pubsub = require('./Pubsub');
/** 测试基本功能
 *  测试结果
 *  ------订阅新闻和天气通知-----
 *  最近新闻:中国建国70周年近在眼前
 *  最近天气：9/26/2019天气 晴
 */
function testBasicFn() {
    console.log('测试基本功能');
    console.log('------订阅新闻和天气通知-----');
    const instance = new Pubsub();
    const token1 = instance.subscribe('getRecentNews', function(data) {
        console.log(`最近新闻:${data.content}`)
    });
    const token2 = instance.subscribe('getRecentWeather', function(data) {
        console.log(`最近天气：${data.weather}`)
    })
    instance.publish('getRecentNews', { content: '中国建国70周年近在眼前' });
    instance.publish('getRecentWeather', { weather: `${ new Date().toLocaleDateString() }天气 晴` });
}
/**
 * 测试通过token取消订阅功能
 * 测试结果
 * ------仅订阅新闻通知-----
 * 最近新闻:中国建国70周年近在眼前
 */
function testUnSubscribeFn() {
    console.log('测试通过token取消订阅功能');
    console.log('------仅订阅新闻通知-----');
    const instance = new Pubsub();
    const token1 = instance.subscribe('getRecentNews', function(data) {
        console.log(`最近新闻:${data.content}`)
    });
    const token2 = instance.subscribe('getRecentWeather', function(data) {
        console.log(`最近天气：${data.weather}`)
    })
    instance.unSubscribe(token2);
    instance.publish('getRecentNews', { content: '中国建国70周年近在眼前' });
    instance.publish('getRecentWeather', { weather: `${ new Date().toLocaleDateString() }天气 晴` });
}
/**
 * 测试通过token取消相同订阅功能中的某一条具体订阅
 * 测试结果
 * ------仅订阅新闻通知-----
 * 最近新闻:中国建国70周年近在眼前
 *  最近天气1：9/26/2019天气 晴
 */
function testUnSubscribeFn1() {
    console.log('测试通过token取消相同订阅功能中的某一条具体订阅');
    console.log('------仅订阅新闻通知-----');
    const instance = new Pubsub();
    const token1 = instance.subscribe('getRecentNews', function(data) {
        console.log(`最近新闻:${data.content}`)
    });
    const token2 = instance.subscribe('getRecentWeather', function(data) {
        console.log(`最近天气：${data.weather}`)
    })
    const token3 = instance.subscribe('getRecentWeather', function(data) {
        console.log(`最近天气1：${data.weather}`)
    })
    instance.unSubscribe(token2);
    instance.publish('getRecentNews', { content: '中国建国70周年近在眼前' });
    instance.publish('getRecentWeather', { weather: `${ new Date().toLocaleDateString() }天气 晴` });
}
/**
 * 测试通过topic名称取消订阅功能
 * 测试结果
 * ------仅订阅新闻通知-----
 * 最近新闻:中国建国70周年近在眼前
 */
function testUnSubscribeFn2() {
    console.log('测试通过topic名称取消订阅功能');
    console.log('------仅订阅新闻通知-----');
    const instance = new Pubsub();
    const token1 = instance.subscribe('getRecentNews', function(data) {
        console.log(`最近新闻:${data.content}`)
    });
    const token2 = instance.subscribe('getRecentWeather', function(data) {
        console.log(`最近天气：${data.weather}`)
    })
    instance.unSubscribe(token2);
    instance.publish('getRecentNews', { content: '中国建国70周年近在眼前' });
    instance.publish('getRecentWeather', { weather: `${ new Date().toLocaleDateString() }天气 晴` });
}
/**
 * 测试通过topic名称批量取消订阅功能
 * 测试结果
 * ------仅订阅新闻通知-----
 * 最近新闻:中国建国70周年近在眼前
 */
function testUnSubscribeFn3() {
    console.log('测试通过topic名称批量取消订阅功能');
    console.log('------仅订阅新闻通知-----');
    const instance = new Pubsub();
    const token1 = instance.subscribe('getRecentNews', function(data) {
        console.log(`最近新闻:${data.content}`)
    });
    const token2 = instance.subscribe('getRecentWeather', function(data) {
        console.log(`最近天气：${data.weather}`)
    })
    const token3 = instance.subscribe('getRecentWeather', function(data) {
        console.log(`最近天气1：${data.weather}`)
    })
    instance.unSubscribe('getRecentWeather');
    instance.publish('getRecentNews', { content: '中国建国70周年近在眼前' });
    instance.publish('getRecentWeather', { weather: `${ new Date().toLocaleDateString() }天气 晴` });
}
testBasicFn();
testUnSubscribeFn();
testUnSubscribeFn1();
testUnSubscribeFn2();
testUnSubscribeFn3();