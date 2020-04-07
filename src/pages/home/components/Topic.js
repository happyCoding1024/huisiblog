import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  TopicWrapper,
  TopicItem
} from '../style';

class Topic extends PureComponent {
  render() {
    const { topicList } = this.props;
    return (
      <TopicWrapper>
        {
          topicList.map((item) => (
            <TopicItem key={item.get('id')}>
              <img className='topicImg' alt='' src= {item.get('imgUrl')}/>
              { item.get('title') }
            </TopicItem> 
          ))
        }
      </TopicWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  topicList: state.getIn(['home', 'topicList'])
})

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
