import axios from "axios";
import {fromJS} from "immutable";

import * as  constants from './constants'

export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('./api/detail.json?id='+id).then((res) => {
      const result = res.data.data;

      const action = {
        type: constants.GET_DETAIL_DATA,
        title: fromJS(result.title),
        content: fromJS(result.content)
      };
      dispatch(action)
    })
  };

};