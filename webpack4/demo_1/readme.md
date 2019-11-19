# webpack基础的配置学习

## css-module：

- 局部作用域：类名唯一，让你可以在自己的组件里随意书写，不用担心命名冲突的问题。
- 配合打包工具可以让你写样式更加的方便。
- 全局作用域：书写单独的全局样式。
- composes组合多个样式到一起，减少样式重复。

## prefetch/preload

- prefetch(预取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源
### prefetch/preload 异同点

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

### magic comments

```
import(/* webpackPrefetch: true */ 'dialog.js');
import(/* webpackPreload: true */ 'ChartingLibrary.js');
```
