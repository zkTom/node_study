import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import sagas from './saga'
//配置react-redux 
//配置saga中间件
const sagaMiddleware = createSagaMiddleware();
//启用chrome redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(reducer, enhancer)

sagaMiddleware.run(sagas)
export default store