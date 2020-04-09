import axios from 'axios';
import * as actionTypes from './actionTypes';

export const changeValue = (value) => ({
  type: actionTypes.CHANGE_VALUE,
  textValue: value
});

export const changeTitleValue = (titleValue) => ({
  type: actionTypes.CHANGE_TITLE_VALUE,
  titleValue
});

export const changeCreateStatus = (createStatus) => ({
  type: actionTypes.CHANGE_CREATE_STATUS,
  createStatus
});

export const articlePublish = (title, content) => {
  return (dispatch) => {
    axios.post('/api/blog/new', {
      title,
      content
    }).then((res) => {
      if (res.data.errno === 0) {
        dispatch(changeCreateStatus(true))
      } 
    }).catch((err) => {
      console.error(err);
    })
  }
}
