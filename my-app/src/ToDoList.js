import React, {Component} from "react"
import {connect} from 'react-redux'
import ToDoItem from './ToDoItem.js'
import store  from './store'
import * as creators from './store/actionCreators'

class ToDoList extends Component {
    constructor(props){
        super(props)
        //this.state = store.getState()
        //订阅store的改变，只要store发生变化就会出发订阅回调
        //store.subscribe(this.handleStoreChange.bind(this))
        // this.state = {
        //   list: [],
        //   val: ''
        // }
    }
    componentDidMount(){
        const action = creators.getInitListAction()
        store.dispatch(action)
      }
    render() {
        return (
          <div >
            <input value={this.props.val} 
            //   onChange={this.change.bind(this)} 
                onChange={this.props.changeValue}
              ref={input => {this.input = input}}
            />
            <button 
            //onClick={this.click.bind(this)} 
             onClick={this.props.addItem}
            >提交</button>
            <ul>
              { this.props.list.map((item, index) => {
                  return (
                    
                    <ToDoItem item={item} index={index} key={index}
                    //deleteItem={this.handleDeleteItem.bind(this)}/>
                    deleteItem={this.props.deleteItem}/>
                  );
                })
              }
            </ul>
          </div>
        );
      }
      handleStoreChange() {
        //this.setState(store.getState())
      }
      change(e) {
        // this.setState({
        //   // val: e.target.value
        //   val: this.input.value
        // })
        //存储数据到store
        // const action = {
        //   type: 'change_input_value',//动作描述
        //   value: e.target.value//传递更新的值
        // }
        // store.dispatch(action)
        //store.dispatch(creators.getInputChangeAction(e.target.value))
      }
    
      click(e) {
        // this.setState({
        //   list: [...this.state.list, this.state.val]
        // })
        //存储数据到store
        // const action = {
        //   type: 'add_todo_item'
        // }
        // store.dispatch(action)
        // store.dispatch(creators.getAddItemAction())
      }
    
      handleDeleteItem(index) {
        // const list = [...this.state.list];
        // list.splice(index, 1);
        // this.setState({
        //   list: list
        // })
        //存储数据到store
        // const action = {
        //   type: 'delete_todo_item',
        //   index: index
        // }
        // store.dispatch(action)
        //store.dispatch(creators.getDeleteItemAction(index))
      }
}
//将store.state映射到props上
const mapStateToProps = state => ({
    val: state.val,
    list: state.list
})
//将store.dispatch映射到props 
const mapDispatchToProps = dispatch => ({
    //inputValue改变
    changeValue(ev) {
        dispatch(creators.getInputChangeAction(ev.target.value))
    },
    //list添加一个元素
    addItem() {
        dispatch(creators.getAddItemAction())
    },
    deleteItem(index) {
        dispatch(creators.getDeleteItemAction(index))
    }
})
export default connect(mapStateToProps ,mapDispatchToProps)(ToDoList);