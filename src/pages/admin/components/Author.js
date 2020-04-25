import React, { PureComponent } from 'react';
import { AuthorHeader, Writer } from '../style';

class Author extends PureComponent {
  render() {
    return (
      <AuthorHeader>
      <img className='writerImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg' />
      <Writer className='writer'>
        <div className='name'>codingOrange</div>
        <div className='jieshao'>前端初学者</div>
      </Writer>
    </AuthorHeader>
    )
  }
}

export default Author;
