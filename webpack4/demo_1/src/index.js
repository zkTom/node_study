import bgImg from '@/assets/img/countrypath.jpg'
import smallImg from '@/assets/img/logo.png'
import '@/assets/scss/index.scss';

import './es6.js'
import(/* webpackChunkName: 'injectScript'*/ './config/injectScript.js');
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
    div.onclick = function() {
        // 在css中导出样式可以use()/unuse()进行懒加载
        // import styles from './assets/scss/index.lazy.css';
        // styles.use(); styles.unse();
        // 懒加载样式
        // import(/* webpackChunkName: 'style'*/ "@/assets/scss/index.lazy.scss");
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