import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getArticle = () => ({
  type: actionTypes.GET_ARTICLE
});

export const getDetail = (result) => ({
  type: actionTypes.GET_DETAIL,
  title: result.title,
  content: result.content
});

export const getDetailAction = (id) => {
  return (dispatch) => {
    axios.get('/api/blog/detail?id=' + id).then((res) => {
      const result = res.data.data;
      dispatch(getDetail(result));
    }).catch(() => {
      console.log('detail.json请求失败')
    })
  } 
};