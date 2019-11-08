import bgImg from './assets/img/countrypath.jpg'
import './assets/scss/index.scss';

// import _ from 'lodash';
// import a from './a.js'
// import b from './b.js'
// import help from './help';
// help();
// _.cloneDeep({a: 1, b: [1, 2, 3]});
function addImg() {
    const img = document.createElement('img'); 
    img.src = bgImg;
    img.onload = function() {
        document.body.appendChild(img);
    }
}
function lazyLoadStyle() {
    const div = document.createElement('div');
    div.innerText = 'click me to use css';
    div.onclick = function() {
        // 在css中导出样式可以use()/unuse()进行懒加载
        // import styles from './assets/scss/index.lazy.css';
        // styles.use(); styles.unse();
        // 懒加载样式
        import(/* webpackChunkName: 'style'*/ "./assets/scss/index.lazy.scss");
    }
    document.body.appendChild(div);
}
lazyLoadStyle();
addImg();