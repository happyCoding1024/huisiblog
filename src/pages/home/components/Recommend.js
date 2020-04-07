import React, { PureComponent } from 'react';
import {
  RecommendWrapper,
  RecommendItem
} from '../style';

class Recommend extends PureComponent {
  render() {
    return (
      <RecommendWrapper>
        <RecommendItem imgUrl='https://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png' />
        <RecommendItem imgUrl='https://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png' />
      </RecommendWrapper>
    )
  }
}

export default Recommend;
