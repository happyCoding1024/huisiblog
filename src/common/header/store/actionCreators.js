import  * as actionTypes  from './actionTypes';
import { fromJS } from 'immutable';
import axios from 'axios';

export const searchFocus = () => ({
  type: actionTypes.SEARCH_FOCUS
});

export const searchBlur = () => ({
  type: actionTypes.SEARCH_BLUR
});

export const changeHot = () => ({
  type: actionTypes.CHANGE_HOT,
});

export const mouseEnter = () => ({
  type: actionTypes.MOUSE_ENTER
});

export const mouseLeave = () => ({
  type: actionTypes.MOUSE_LEAVE
});

// 本文件中用
export const changeList = (list) => ({
  type: actionTypes.CHANGE_LIST,
  list: fromJS(list),
  totalPage: Math.ceil(list.length/2)
});

// 取得搜索框中的推荐内容
export const getList = () => {
  return (dispatch) => {
    // axios.get('/api/header/headerList.json').then((res) => {
    axios.get('http://www.baidu.com').then((res) => {
      dispatch(changeList(res.data.data));
    }).catch(() => {
      console.error('ajax fail');
    });
  }
};

export const changeFocusTrue = () => ({
  type: actionTypes.CHANGE_FOCUS_TRUE
});

export const changeFocusFalse = () => ({
  type: actionTypes.CHANGE_FOCUS_FALSE
});

export const changeInputElem = (inputElem_header) => ({
  type: actionTypes.CHANGE_INPUT_ELEM,
  inputElem_header
});