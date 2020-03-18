import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from 'redux'
/**
 * javascript Array.prototype.reduce(callback, initValue)
 * 根据initValue和callback进行一次迭代，将得到的值最为下次开始的initValue，再次调用callback，
 * 知道Array每个元素循环一边
 * eg:
 * [1, 10, 100].reduce((sum = 0, num) => (sum + num), 0)
 */
/**
 * 根据上面可知，combineReducers大致实现过程
 * const combineReducers = ( reducers ) => {
    return ( state = {}, action ) => {
        return Object.keys(reducers).reduce(
            ( nextState, key ) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                );
                return nextState;
            },
            {}
        );
    };
};
 */
import todoReducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import sagas from './saga'
//可以对多个reducer进行合并管理
const rootReducer = combineReducers({ todoReducer })
//配置react-redux 
//配置saga中间件
const sagaMiddleware = createSagaMiddleware();
//启用chrome redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, enhancer)

sagaMiddleware.run(sagas)
export default store
//每一个小的组件里都有自己的store
/**
 * header
 *  style.js    css文件
 *  todolist.js 这是UI组件，负责样式的显示
 *  store/index.js 入口文件
 *  store/actionCreators 创建action
 *  store/reducer 创建同步调用获取state的方法
 *  store/saga    创建异步调用数据接口来更新state
 */