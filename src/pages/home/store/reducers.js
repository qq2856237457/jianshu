import {fromJS} from "immutable";
import * as constants from './constants'

const defaultState = fromJS({
  topList: [],
  articleList: [],
  recommendList: [],
  articlePage:1,
  showScroll:false
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_DATA:
      return state.merge({
        'topList': fromJS(action.topList),
        'articleList': fromJS(action.articleList),
        'recommendList': fromJS(action.recommendList)
      });
    case constants.ADD_DATA:
      return state.merge({
        'articleList':state.get("articleList").concat(action.list),
        'articlePage':action.page+1
      });
    case constants.SHOW_SCROLL:
      return state.set("showScroll",action.show);
    default:
      return state;
  }
}
