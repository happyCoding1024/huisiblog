import  * as actionTypes  from './actionTypes';
import { fromJS } from 'immutable';

// fromJS也会将内部的list数组转换为一个immutable数组，所以在使用set对它进行修改时
// 一定要注意赋值给它的也必须是一个immutable数组
const defaultState = fromJS({
  focused: false,
  list: [],
  mouseIn: false,
  page: 1,
  totalPage: 1
});
const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case actionTypes.SEARCH_FOCUS: 
      return state.set('focused', true);
    case actionTypes.SEARCH_BLUR:
      return state.set('focused', false);
    case actionTypes.CHANGE_LIST:
      return state.merge({
        list: action.list,
        totalPage: action.totalPage
      });
      // return state.set('list', action.list).set('totalPage', action.totalPage);     
    case actionTypes.CHANGE_HOT:
      const page = state.get('page');
      const totalPage = state.get('totalPage');
      if (page < totalPage) {
        return state.set('page', page + 1);
      } else {
        return state.set('page', 1);
      }
    case actionTypes.MOUSE_ENTER:
      return state.set('mouseIn', true);
    case actionTypes.MOUSE_LEAVE:
      return state.set('mouseIn', false); 
    default: 
      return state;
  }
};

export default reducer;