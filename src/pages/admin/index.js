import React, { PureComponent } from 'react';
import Topic from './components/Topic';
import List from './components/List';
import Create from './components/Create';
import Author from './components/Author';
import Music from './components/Music';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Redirect } from 'react-router-dom';
import KbdNav from '../../common/kbdNav/keyNav';             
import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop                
} from './style';

class Admin extends PureComponent {
  
  render() {
    const { showScroll, loginStatus } = this.props;
      if (loginStatus) {
        return (
          <HomeWrapper className='clearFloat'>
            <HomeLeft>
              <KbdNav className='KbdNav' />
              <Topic /> 
              <List />
            </HomeLeft>
            <HomeRight>
              <Author />
              <Create />
              <Music />
            </HomeRight>
            {
              showScroll ? <BackTop onClick={this.handleScrollTop}><i className='iconfont'>&#xe60c;</i></BackTop> : null
            }
        </HomeWrapper>
        )
      } else {
        return <Redirect to='/login' />
      }
  }

  componentDidMount() {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.props.changeScrollTopShow, false);
  }

  handleScrollTop() {
    window.scrollTo(0 , 0);
  }

  bindEvents() {
    window.addEventListener('scroll', this.props.changeScrollTopShow, false);
  }
}

const mapStateToProps = (state) => ({
  showScroll: state.getIn(['home', 'showScroll']),
  loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatchToProps = (dispatch) => ({
  changeHomeData() {
    dispatch(actionCreators.changeHomeDataAction());
  },
  changeScrollTopShow() {
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreators.changeScrollShow(true));
    }else {
      dispatch(actionCreators.changeScrollShow(false));
    }
  } 
})
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
