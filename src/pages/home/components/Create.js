import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  CreateWrapper,
  CreateHeader,
  CreateItem,
  CreateBottom 
} from '../style';

class Create extends PureComponent {
  render() {
    return (
      <CreateWrapper>
        <CreateHeader>
          <CreateItem >
            <i className="iconfont question">&#xe605;</i>
            提问题
          </CreateItem>
          <Link to='/write'>
            <CreateItem>
              <i className="iconfont article">&#xe601;</i>
              写文章
            </CreateItem>
          </Link>
          <CreateItem >
            <i className="iconfont thought">&#xeb51;</i>
            写想法
          </CreateItem>
          <CreateItem >
            <i className="iconfont ask">&#xe602;</i>
            回答问题
          </CreateItem>
        </CreateHeader>
        <CreateBottom>
          <div className='wait'>稍后答</div>
          <div className='draft'>草稿箱</div>
        </CreateBottom>
      </CreateWrapper>
    )
  }
}

export default Create;
