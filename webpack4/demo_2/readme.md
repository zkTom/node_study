# webpack vue 单页面打包的配置学习
## 资源结构
|- /assets
|– /components
|  |– /my-component
|  |  |– index.jsx
|  |  |– index.css
|  |  |– icon.svg
|  |  |– img.png
耦合性会更低，代码更容易移植如果你安装了正确的loader，如果是全局资源，你仍然可以放到assets下面

## vue-loader
主要配置：
## vue-router
### dynamic import
每个动态加载的组件的style，js会分别打包，多个style块会合成一个style，打包成为css-in-js或者单独的css(不同的plugin处理)

  ```
    eg: component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  ```
