import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { 
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchHot,
  SearchChange,
  SearchItem,
  SearchHistory,
} from './style';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
// 引入 antd 的样式文件
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

class Header extends PureComponent {
  render() {
    const { focused, mouseIn, list, logout, loginStatus, handleInputFocus, handleInputBlur } = this.props;
    return (
      <HeaderWrapper>
        <Nav>
          <Link to='/'>
            <Logo />
          </Link>
          <NavItem className='left'>首页</NavItem>
          <NavItem className='left'>推荐</NavItem>
          <NavItem className='right'>
            <i className="iconfont">&#xe6b3;</i>
            注册
          </NavItem>
          <NavItem className='right'>
            <i className="iconfont">&#xe60f;</i>
            { loginStatus ? <span onClick={logout}>退出</span> : <Link to='/login'>登录</Link> }
          </NavItem>
            <SearchWrapper>
              <CSSTransition  
                in={focused || mouseIn}
                timeout={200}
                classNames='slide'
              >
                <NavSearch 
                  className={(focused || mouseIn) ? 'focused' : ''}
                  onFocus={() => {handleInputFocus(list)}}
                  onBlur={handleInputBlur}
                />
              </CSSTransition>
              <i className={(focused || mouseIn) ? 'iconfont focused' : 'iconfont'}>&#xe61c;</i>
              { this.searchInfo() }
            </SearchWrapper>
        </Nav>
      </HeaderWrapper>
    )
  }

  searchInfo = () => { 
    const { focused, list , page, mouseIn, handleChangeHot, handleMouseEnter, handleMouseLeave } = this.props;
    const jsList = list.toJS();
    const pageList = [];   
    // 如果去掉这个if的话会显示key值不是unique的，因为在ajax没有获取到数据之前也会运行这个函数此时jsList全是空，令其每一项当做key值肯定会出现key值不唯一的情况。
    if (jsList.length) {
      for ( let i = (page - 1) * 2; i < 2 * page; i++) {
        pageList.push(
          <SearchItem key={jsList[i].content}>{jsList[i].content}
            <i className='iconfont'>&#xe63e;</i>
          </SearchItem>
        );
      } 
    } 
    if (focused || mouseIn) { 
      return ( 
        <SearchInfo 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchHot>
            热门搜索
            <SearchChange onClick={() => {handleChangeHot(this.icon)}}>
              换一批
              <i ref={(icon) => {this.icon = icon}} className='iconfont'>&#xe61d;</i>
            </SearchChange>
          </SearchHot>
          {
            pageList
          }
          <SearchHistory>
            搜索历史
          </SearchHistory>
        </SearchInfo>
      )
    } 
  }
}

const mapStateToProps = (state) => ({
  focused: state.getIn(['header', 'focused']),
  list: state.getIn(['header', 'list']),
  page: state.getIn(['header', 'page']),
  mouseIn: state.getIn(['header', 'mouseIn']),
  loginStatus: state.getIn(['login', 'loginStatus'])
  // 等价于 state.get('header').get('focused')
});

const mapDispatchToProps = (dispatch) => ({
  handleInputFocus(list) {
    dispatch(actionCreators.searchFocus());
    (list.size <= 0 ) && dispatch(actionCreators.getList());
  },
  handleInputBlur() {
    const action = actionCreators.searchBlur();
    dispatch(action);
  },
  handleChangeHot(icon) {
    let originAngle = icon.style.transform.replace(/[^0-9]/ig, '');
    if (originAngle) {
      originAngle = parseInt(originAngle, 10);
    } else {
      originAngle = 0;
    }
    icon.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
    dispatch(actionCreators.changeHot());
  },
  handleMouseEnter() {
    dispatch(actionCreators.mouseEnter());
  },
  handleMouseLeave() {
    dispatch(actionCreators.mouseLeave());
  },
  logout() {
    dispatch(loginActionCreators.logoutStatus());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
