
//图书馆的管理记事本
const defaultState = {
    val: '',
    list: []
}
//reducers 可以接受state, 但是绝不能修改state，只能深度拷贝原来的数据
//Reducer必须是纯函数，固定的输入，产生固定的输出
export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case 'change_input_value': {
            newState.val = action.value
            //返回新生成的state
            return newState
        }
        case 'add_todo_item': {
            newState.list.push(newState.val)

            return newState
        }
        case 'delete_todo_item': {
            const index = action.index
            newState.list.splice(index, 1)
    
            return newState
        }
        case 'init_list': {
            newState.list = action.list
            
            return newState
        }
        default: return state
    }
}