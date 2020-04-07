import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes'; 

const defaultState = fromJS({
  topicList: [],
  articleList: [],
  articlePage: 0,
  showScroll: false
});

const changeHomeData = (state, action) => (
 state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList)
  })
);

const getMoreList = (state, action) => (
  state.set('articleList', state.get('articleList').concat(fromJS(action.articleList))).set('articlePage', action.otherPage)
);

const changeScrollShow = (state, action) => (
  state.set('showScroll', fromJS(action.scrollShow))
);

const reducer = (state=defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_HOME_DATA:
      return changeHomeData(state, action);
    case actionTypes.GET_MORE_LIST:
      return getMoreList(state, action);
    case actionTypes.CHANGE_SCROLL_SHOW:
      return changeScrollShow(state, action);
    default: 
      return state;
  }
};

export default reducer;