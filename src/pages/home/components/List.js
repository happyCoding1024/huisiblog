import React, { PureComponent, Fragment } from 'react';
import {
  ListItem,
  ListInfo,
  ListFootnote,
  LoadMore
} from '../style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
  render() {
    const { articleList, articlePage, handleLoadMore } = this.props;
    return (
      <Fragment>
        {
          articleList.map((item, index) => (
            <Link key={index} to={'/detail/' + item.get('id')}>
              <ListItem>
                {/* <img className='listImg' src={item.get('imgUrl')} alt='' /> */}
                <ListInfo>
                  <h3 className='listTitle'>{item.get('title')}</h3>
                  <p className='listContent'>{item.get('abstract')}</p>
                </ListInfo>
                <ListFootnote>
                  <div className='writer'>codingOrange</div>
                  <div className='read'>阅读</div>
                  <div className='comment'>评论</div>
                </ListFootnote>
              </ListItem>
            </Link>
          ))
        }
        <LoadMore onClick={()=>handleLoadMore(articlePage)}>更多博客</LoadMore>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  articleList: state.getIn(['home', 'articleList']),
  articlePage: state.getIn(['home', 'articlePage'])
});

const mapDispatchToProps = (dispatch) => ({
  handleLoadMore(articlePage) {
    dispatch(actionCreators.getMoreList(articlePage));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
