import React, { Component } from 'react'
import { SearchItem } from './style'
class ToDoItem extends Component {
	constructor(props){
        super(props);
        this.itemClick = this.itemClick.bind(this)
	}
 //只在组件挂在页面上时执行，也就是页面第一次加载得时候
  componentWillMount(){
    //console.log('son componentWillMount')
  }
  //只在组件挂在页面上时执行，也就是页面第一次加载得时候
  componentDidMount(){
    //console.log('son componentDidMount')
  }
  //一个组件要从父组件接受参数，只有当这个组件已经存在于父组件中，这个生命周期才会被触发（也就是页面挂载不会触发）
   componentWillReceiveProps(){
     //console.log('son componentWillReceiveProps')
   }
  //组件被更新之前执行 true会继续走生命周期否则截断之后的生命周期
  shouldComponentUpdate(nextProps, nextState){
  	if(nextProps.item !== this.props.item){
  		return true;
  	} else {
  		return false	
  	}
    //console.log('son shouldComponentUpdate')
  }
  //组件被更新之前，他会自动执行，但是它会在shouldComponentUpdate执行之后（return true）
  //会执行
  componentWillUpdate(){
    //console.log('son componentWillUpdate')
  }
  //组件更新完毕（生成vdom,并且通过新旧vdom对比对页面进行更改后执行）
  componentDidUpdate(){
    //console.log('son componentDidUpdate')
  }
	render(){
          //{console.log('item render')}
        const { item } = this.props;
        const itemClick = this.itemClick
		return (
            <SearchItem onClick={itemClick}>{ item }</SearchItem>
            //    <li
            //     onClick={this.itemClick.bind(this)}
            //     >{this.props.item}</li>
		);
	}


  itemClick(index) {
    console.log(this)
    this.props.deleteItem(this.props.index)
  }
}
export default ToDoItem