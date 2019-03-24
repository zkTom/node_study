import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store'
// Provider 可以使得内部组件 和 store 进行连接
import {
    Provider
} from 'react-redux'


ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>
    , document.getElementById('root'));