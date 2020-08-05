import React, {PureComponent} from "react";
import {connect} from "react-redux"

import List from "./commmon/list";
import Recommend from "./commmon/recommend";
import Writer from "./commmon/writer";
import Topic from "./commmon/topic";

import * as actionCreator from "./store/actionCreator"

import topBanner from '../../static/images/topbanner.jpg';


import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from "./style";


class Home extends PureComponent {
  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScroll)
  }

  bindEvents = () => {
    window.addEventListener('scroll', this.props.changeScroll)
  };
  handleScrollTop = () => {
    window.scroll(0, 0);
  };

  render() {
    return (
      <div>
        <HomeWrapper>
          <HomeLeft>
            <img className='banner-img' src={topBanner} alt=''/>
            <Topic></Topic>
            <List></List>
          </HomeLeft>
          <HomeRight>
            <Recommend></Recommend>
            <Writer></Writer>
          </HomeRight>
          {
            this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null
          }
        </HomeWrapper>
      </div>
    )
  }
}

const mapState = (state) => ({
  showScroll: state.getIn(["home", "showScroll"])
});
const mapDispatch = (dispatch) => ({
  changeHomeData() {

    dispatch(actionCreator.getHomeData())
  },
  changeScroll() {
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreator.showScroll(true))
    } else {
      dispatch(actionCreator.showScroll(false))
    }
  }
});
export default connect(mapState, mapDispatch)(Home)