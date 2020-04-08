import * as actionTypes from './actionTypes';

export const changeValue = (value) => ({
  type: actionTypes.CHANGE_VALUE,
  textValue: value
});

