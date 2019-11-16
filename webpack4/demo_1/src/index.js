// tree shaking
import { cube } from '@/utils.js';
console.log(cube(8));

import bgImg from '@/assets/img/countrypath.jpg'
import smallImg from '@/assets/img/logo.png'
import '@/assets/scss/index.scss';
//css-module
import homeModule from '@/assets/scss/home.module.scss?module';

import './es6.js'
// 懒加载
// 注意：一个模块如果既被同步引入，又被动态引入，则不会被分块打包
import(/* webpackChunkName: 'injectScript'*/ './config/injectScript.js');
// import(/* webpackChunkName: 'style'*/ "@/assets/scss/index.lazy.scss");
let i = 1000;
function addImg() {
    const img = document.createElement('img'); 
    img.src = bgImg;
    img.onload = function() {
        document.body.appendChild(img);
    }
}
function addSmallImg() {
    const img = document.createElement('img'); 
    img.src = smallImg;
    img.onload = function() {
        document.body.appendChild(img);
    }
}
function lazyLoadStyle() {
    const div = document.createElement('div');
    div.innerText = 'click me load css';
    div.className = homeModule.txt;
    div.onclick = function() {
        // 在css中导出样式可以use()/unuse()进行懒加载
        // import styles from './assets/scss/index.lazy.css';
        // styles.use(); styles.unse();
        
        const div = document.createElement('div');
        div.className = 'li';
        div.innerText = i;
        i = i + 1000;
        document.body.appendChild(div);    
    }
    document.body.appendChild(div);
}

lazyLoadStyle();
addSmallImg();
addImg();