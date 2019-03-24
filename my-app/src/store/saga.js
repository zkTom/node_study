import axios from 'axios'
import {
    takeEvery,
    call,
    put,
    takeLatest
} from 'redux-saga/effects'
import {
    initListAction
} from './actionCreators'

function* getInitList() {
    try {
        const res = yield axios.get("/api/list")
        const action = initListAction(res.data.data)
        //告诉 middleware 发起一个 指定类型的 action
        yield put(action)
    } catch (error) {
        console.log("/api/list" + error)
    }
}
//generator
function* rootSaga() {
    yield takeEvery("get_init_list", getInitList)
}
export default rootSaga;