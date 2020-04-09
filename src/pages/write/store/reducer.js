import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes'; 

const defaultState = fromJS({
  textValue: 'hello world',
  titleValue: '',
  createStatus: false
});

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_VALUE:
      return state.set('textValue', action.textValue);
    case actionTypes.CHANGE_TITLE_VALUE:
      return state.set('titleValue', action.titleValue);
    case actionTypes.CHANGE_CREATE_STATUS:
      return state.set('createStatus', action.createStatus);
    default: 
      return state;
  }
};

export default reducer;