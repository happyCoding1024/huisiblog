import axios from 'axios';
import * as actionTypes from './actionTypes';

// loginStatus等于0代表登录成功，-1代表登录失败
export const changeLoginStatus = (loginStatus) => ({
  type: actionTypes.CHANGE_LOGIN,
  loginStatus
});

export const logoutStatus = () => ({
  type: actionTypes.LOGOUT_STATUS,
  loginStatus: false
});

export const login = (account, password) => {
  return  (dispatch) => {
    axios.post('/api/user/login', {username: account, password}).then((res) => {
      dispatch(changeLoginStatus(res.data.errno));
    }).catch(() => {
      console.log('login.json获取失败');
    })
  }
};