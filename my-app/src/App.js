import React, { Component } from 'react';
import ToDoList from './ToDoList'
import './App.css';


class App extends Component {
  constructor(props){
    super(props)
  }
  //只在组件挂在页面上时执行，也就是页面第一次加载得时候
  componentWillMount(){
    //console.log('componentWillMount')
  }
  //只在组件挂在页面上时执行，也就是页面第一次加载得时候
  componentDidMount(){
    //console.log('componentDidMount')
  }
  //
  // componentWillReceiveProps(){
  //   console.log(componentWillReceiveProps)
  // }
  //组件被更新之前执行 true会继续走生命周期否则截断之后的生命周期
  shouldComponentUpdate(){
    //console.log('shouldComponentUpdate')
    return true
  }
  //组件被更新之前，他会自动执行，但是它会在shouldComponentUpdate执行之后（return true）
  //会执行
  componentWillUpdate(){
    //console.log('componentWillUpdate')
  }
  //组件更新完毕（生成vdom,并且通过新旧vdom对比对页面进行更改后执行）
  componentDidUpdate(){
    //console.log('componentDidUpdate')
  }
  // 一旦state或父组件props更改就会触发
  render() {
    //{console.log('app render')}   
    return (
      <ToDoList />
    );
  }
}

export default App;
