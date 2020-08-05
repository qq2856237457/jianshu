import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CSSTransition from "react-transition-group/cjs/CSSTransition";

import * as actionCreator from './store/actionCreator';
import * as loginActionCreator from '../../pages/login/store/actionCreator'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  Search,
  SearchTitle,
  SearchSwitch,
  SearchWrapper,
  SearchInfo,
  SearchList,
  SearchItem,
  Addition,
  Button,
} from './style';



class Header extends Component {

  getList = () => {
    const {focus, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, changePage} = this.props;
    const newList = list.toJS();
    const pageList = [];
    if (newList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(<SearchItem key={newList[i]}>{newList[i]}</SearchItem>)
      }
    }
    if (focus || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchTitle>
            热门搜索
            <SearchSwitch onClick={() => changePage(page, totalPage, this.spinIcon)}>
              <span ref={(icon) => {
                this.spinIcon = icon
              }} className="iconfont spin">&#xe606;</span>
              换一批
            </SearchSwitch>
          </SearchTitle>
          <SearchList>
            {
              pageList
            }
          </SearchList>
        </SearchInfo>
      )
    } else {
      return null;
    }
  };

  render() {
    const {focus, handleInputFocus, handleInputBlur, list,login,logout} = this.props;
    return (
      <HeaderWrapper>
        <Link to='/'>
          <Logo/>
        </Link>
        <Nav>
          <NavItem className='left active'>首页</NavItem>
          <NavItem className='left'>下载App</NavItem>
          {
            login ? <NavItem className='right' onClick={logout}>退出</NavItem> :
              <Link to={'/login'}><NavItem className='right'>登录</NavItem></Link>
          }
          <NavItem className='right'>
            <span className="iconfont">&#xe636;</span>
          </NavItem>
          <SearchWrapper className='search'>
            <CSSTransition
              in={focus}
              timeout={200}
              classNames='slide'
            >
              <Search className={focus ? 'focused' : ''}
                      onFocus={() => handleInputFocus(list)}
                      onBlur={handleInputBlur}/>
            </CSSTransition>
            <span className='iconfont zoom'>&#xe60c;</span>
            {this.getList()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className='writing'><span className="iconfont">&#xe708;</span>写文章</Button>
          <Button className='reg'>注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    focus: state.getIn(['header', 'focus']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    totalPage: state.getIn(['header', 'totalPage']),
    login:state.getIn(['login','login'])
  }

};
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      if (list.size === 0) {
        dispatch(actionCreator.getList());
      }
      dispatch(actionCreator.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreator.searchBlur())
    },
    handleMouseEnter() {
      dispatch(actionCreator.mouseEnter())
    },
    handleMouseLeave() {
      dispatch(actionCreator.mouseLeave())
    },
    changePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }

      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
      if (page < totalPage) {
        dispatch(actionCreator.changePage(page + 1))
      } else {
        dispatch(actionCreator.changePage(1))
      }
    },
    logout(){
      dispatch(loginActionCreator.logout())
    }

  }

};
export default connect(mapStateToProps, mapDispatchToProps)(Header)