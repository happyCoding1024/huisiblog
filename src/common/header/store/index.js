// 这个index.js文件的作用就是将actionTypes，actionCreators，reducer的内容导出出去，这样在引入这些文件的
// 时候路径可以只到store这个文件夹就可以了。 
import reducer from './reducer';
import * as actionTypes from './actionTypes';
import * as actionCreators from './actionCreators';

export { reducer, actionTypes, actionCreators };