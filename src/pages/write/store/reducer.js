import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes'; 

const defaultState = fromJS({
  textValue: 'hello world'
});

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_VALUE:
      return state.set('textValue', action.textValue);
    default: 
      return state;
  }
};

export default reducer;