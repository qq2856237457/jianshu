import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {ListItem, ListInfo, LoadMore} from "../style"
import * as actionCreator from '../store/actionCreator'


class List extends PureComponent {
  render() {
    const {list, getMoreList, page} = this.props;
    return (
      <div>
        {
          list.map((item, index) => {
            return (
              <Link key={index} to={'/detail?id='+item.get("id")}>

                <ListItem>
                  <ListInfo>
                    <h3 className='title'>{item.get("title")}</h3>
                    <p className='desc'>{item.get("desc")}</p>
                  </ListInfo>
                  <img className='pic' src={item.get('imageURL')} alt=""/>
                </ListItem>
              </Link>
            )
          })
        }
        <LoadMore onClick={() => getMoreList(page)}>阅读更多>></LoadMore>
      </div>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articlePage'])
});
const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    const action = actionCreator.addMoreList(page);
    dispatch(action)
  }
});
export default connect(mapState, mapDispatch)(List)