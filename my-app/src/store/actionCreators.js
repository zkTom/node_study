export const getInputChangeAction = value => ({
    type: 'change_input_value',
    value
})
export const getAddItemAction = () => ({
    type: 'add_todo_item'
})
export const getDeleteItemAction = index => ({
    type: 'delete_todo_item',
    index
})
export const getInitListAction = () => ({
    type: 'get_init_list'
})
export const initListAction = list => ({
    type: 'init_list',
    list: list
})