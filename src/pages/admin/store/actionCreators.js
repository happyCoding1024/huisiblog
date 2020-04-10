import  * as actionTypes from './actionTypes'; 
import axios from 'axios';

const changeHomeData = (result) => ({
  type: actionTypes.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList  
});

const getMoreListAction = (result, otherPage) => ({
  type: actionTypes.GET_MORE_LIST,
  articleList: result.data,
  otherPage
});

export const changeHomeDataAction = () => {
  return (dispatch) => {
    axios.get('/api/blog/list').then((res) => {
      const result = res.data.data;
      dispatch(changeHomeData(result));
    });
  }
};

export const getMoreList = (articlePage) => {
  const otherPage = articlePage + 1; 
  return (dispatch) => {
    axios.get('/api/blog/homelist.json?articlePage=' + otherPage).then((res) => {
      const result = res.data;
      dispatch(getMoreListAction(result, otherPage))
    })
  }
};

export const changeScrollShow = (scrollShow) => ({
  type: actionTypes.CHANGE_SCROLL_SHOW,
  scrollShow
});
