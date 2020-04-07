import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  // 这里的import和上面的import是不一样的这里是异步加载的一个语法
  // 这里指的是异步加载 index.js 下的 Detail 组件
  loader: () => import('./'),
  // 页面加载需要时间，下面的 loading是一个函数，表示临时显示的内容，不至于让用户看到白屏
  loading() {
    return <div>正在加载</div>
  }
});

// 导出一个无状态组件，LoadableComponent 实际上就是 Detail 组件
export default () => <LoadableComponent/>
