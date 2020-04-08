import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes'; 

const defaultState = fromJS({
  registerStatus: false
});

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_REGISTER:
      // action.loginStatus的值就是后端传递过来的errno，当等于0时登录成功，-1时登录失败
      if (action.registerStatus === 0) {
        return state.set('registerStatus', true);
      } else {
        return state.set('registerStatus', false);        
      }
    default: 
      return state;
  }
};

export default reducer;