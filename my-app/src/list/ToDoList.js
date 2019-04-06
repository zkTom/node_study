import React, { Component } from "react"
import {connect} from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import ToDoItem from './ToDoItem.js'
import store  from '../store'
import { SearchWrapper, SearchBtn, SearchInput, SearchListWrapper, SearchList} from '../list/style'
import * as creators from '../store/actionCreators'

class ToDoList extends Component {
    constructor(props){
        super(props)
        //this.state = store.getState()
        //订阅store的改变，只要store发生变化就会出发订阅回调
        //store.subscribe(this.handleStoreChange.bind(this))
        this.state = {
          list: [],
          val: '',
          inputColor: 'palevioletred',
          defaultValue: "biubiutest",
          inProp: false
        }
        this.inputRef = React.createRef();
    }
    componentDidMount(){
        const action = creators.getInitListAction()
        store.dispatch(action)
      }
    render() {
        const { inputColor, defaultValue } = this.state;
        const { val, list } = this.props;//注入属性
        const { changeValue, addItem, deleteItem } = this.props;//注入方法
        console.log(this.props);

        return (
            <div style={{position: "relative"}}>
                    <SearchWrapper> 
                        <div>
                        <CSSTransition in={this.state.inProp} timeout={200} classNames="slide">
                            {/** 注入组件props  默认值：defaultValue defaultValue={ defaultValue}*/}
                            <SearchInput  className={ this.state.inProp ? "focused" : "focus" }
                              inputColor={inputColor} value={val || defaultValue}
                            // ref 可以拿到当前的DOM节点
                            ref={this.inputRef} onMouseEnter={() => {
                                console.log(this.inputRef.current)}} onChange={changeValue}
                                onFocus={() => {this.setState({inProp: true})}}
                                onBlur={() => {this.setState({inProp: false})}}>
                            </SearchInput>
                        </CSSTransition>
                            <SearchBtn onClick={addItem}>提交</SearchBtn>
                        </div>
                        <SearchListWrapper>
                            <SearchList>
                                { list.map((item, index) => {
                                    return (
                                        <ToDoItem item={item} index={index} key={index} deleteItem={deleteItem}/>
                                    );
                                }) }
                            </SearchList>
                        </SearchListWrapper>  
                    </SearchWrapper>  
            </div>
        //   <div >
        //     <input value={this.props.val} 
        //     //   onChange={this.change.bind(this)} 
        //         onChange={this.props.changeValue}
        //       ref={input => {this.input = input}}
        //     />
        //     <button 
        //     //onClick={this.click.bind(this)} 
        //      onClick={this.props.addItem}
        //     >提交</button>
        //     <ul>
        //       { this.props.list.map((item, index) => {
        //           return (
                    
        //             <ToDoItem item={item} index={index} key={index}
        //             //deleteItem={this.handleDeleteItem.bind(this)}/>
        //             deleteItem={this.props.deleteItem}/>
        //           );
        //         })
        //       }
        //     </ul>
        //   </div>
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
const mapStateToProps = ({todoReducer}) => ({
    val: todoReducer.val,
    list: todoReducer.list
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