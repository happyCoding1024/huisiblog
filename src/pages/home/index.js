import React, { PureComponent } from 'react';
import Topic from './components/Topic';
import List from './components/List';
import Create from './components/Create';
import Writer from './components/Writer';
import Music from './components/Music';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { 
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop                
} from './style';

class Home extends PureComponent {
  
  render() {
    const { showScroll } = this.props;
    return (
      <HomeWrapper className='clearFloat'>
        <HomeLeft>
          <img className='banner-img' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg' />
          <Topic /> 
          <List />
        </HomeLeft>
        <HomeRight>
          <Create />
          {/* <Recommend /> */}
          <Music />
          <Writer />
        </HomeRight>
        {
          showScroll ? <BackTop onClick={this.handleScrollTop}><i className='iconfont'>&#xe60c;</i></BackTop> : null
        }
      </HomeWrapper>
    )
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
  showScroll: state.getIn(['home', 'showScroll'])
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
