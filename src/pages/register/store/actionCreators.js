import axios from 'axios';
import * as actionTypes from './actionTypes';

// loginStatus等于0代表登录成功，-1代表登录失败
export const changeRegisterStatus = (registerStatus) => ({
  type: actionTypes.CHANGE_REGISTER,
  registerStatus
});

export const register = (account, password) => {
  return  (dispatch) => {
    axios.post('/api/user/register', {username: account, password}).then((res) => {
    dispatch(changeRegisterStatus(res.data.errno));
    }).catch(() => {
      console.log('register失败');
    })
  }
};

export const changeInputElem = (accountInputElem, passInputElem) => ({
  type: actionTypes.CHANGE_REG_INPUT_ELEM,
  accountInputElem,
  passInputElem
})