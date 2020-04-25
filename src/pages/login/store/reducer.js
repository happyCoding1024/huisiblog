import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes'; 

const defaultState = fromJS({
  loginStatus: false,
  accountInputElem: '',
  passInputElem: ''
});

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_LOGIN:
      // action.loginStatus的值就是后端传递过来的errno，当等于0时登录成功，-1时登录失败
      if (action.loginStatus === 0) {
        return state.set('loginStatus', true);
      } else {
        return state.set('loginStatus', false);        
      }
    case actionTypes.LOGOUT_STATUS:
      return state.set('loginStatus', action.loginStatus);
    case actionTypes.CHANGE_INPUT_ELEM:
      return state.merge({
        accountInputElem: action.accountInputElem,
        passInputElem: action.passInputElem
      });
    default: 
      return state;
  }
};

export default reducer;