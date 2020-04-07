import React, { PureComponent } from 'react';
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer/dist/APlayer.min.js';
import { MusicWrapper } from '../style';

class Music extends PureComponent {
  
  render() {
    return (
      <MusicWrapper>
        <div id="player"  class="aplayer"></div>
      </MusicWrapper>
    )
  }

  componentDidMount() {
    new APlayer({
      element: document.getElementById('player'),
      narrow: false,
      autoplay: false,          
      showlrc: false,
      listFolded: true,
      listMaxHeight: 10,
      volume: 0.2,
      mutex: true,
      theme: 'rgb(255, 252, 252)',      
      music: [{
        title: '小酒窝',
        author: 'JJ',
        url: 'https://blog-static.cnblogs.com/files/zhangguicheng/小酒窝.zip',
        pic: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191224141901%E6%9E%97%E4%BF%8A%E6%9D%B066_66.jpg'
        },{
        title: '你的答案',
        author: '阿冗',
        url: 'https://blog-static.cnblogs.com/files/zhangguicheng/你的答案.zip',
        pic: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200326105611%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%8866_66.jpg'
      },{
        title: '你曾是少年',
        author: 'SHE',
        url: 'https://blog-static.cnblogs.com/files/zhangguicheng/你曾是少年.zip',
        pic: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191225040246SHE66_66.jpg'
      },{
        title: '野狼Disco',
        author: '宝石Gem',
        url: 'https://blog-static.cnblogs.com/files/zhangguicheng/野狼Disco.zip',
        pic: 'https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191225040254%E9%87%8E%E7%8B%BCdesco66_66.jpg'
      }]
    });
  }
}

export default Music;