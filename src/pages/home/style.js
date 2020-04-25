import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 1190px;
  margin: 52px auto 0;
  background: rgb(255, 252, 252);
  &::after {
    content: '';
    clear: both;
    display: block;
    visibility: hidden;
    height: 0;
  }
`;

export const HomeLeft = styled.div`
  float: left;
  width: 800px;
  margin-left: 10px;
  margin-top: 20px;
  .KdbNav {
    width: 625px;
    height: 240px;
    vertical-align: bottom;
    background: url('https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg');
  }
`;

export const HomeRight = styled.div`
  width: 310px;
  margin: 20px 16px 0 0;
  float: right;
  .ant-picker-calendar {
    background: #fffcfc;
    border-radius: 4px;
    box-shadow: 0 0 5px 0 #ccc;
    margin-top: 5px;
    background-image: linear-gradient(to right, #fff8f8 0%, #fffeef 50%,#fbfdff 70%, #f5f4f9 100%);
  }
  .ant-picker-body {
    background: #fffcfc;
    background-image: linear-gradient(to right, #fff8f8 0%, #fffeef 50%,#fbfdff 70%, #f5f4f9 100%);    
  }
  .CarouselImg {
    width: 310px;
    height: 200px;
    border-radius: 10px;
    margin: 10px 0;
    box-shadow: 0 0 4px 0 #ccc;
  }
`;

// Topic组件
export const TopicWrapper = styled.div`
  padding: 6px 0 10px 0;
  overflow: hidden;
  box-shadow: 0 0 4px 0 #ccc;
  margin: 12px 0;
  background-image: linear-gradient(to right,#fffcfc,#f4ccff);
  border-radius: 10px;
  h1 {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 6px;
  }
`;

export const TopicItem = styled.div`
  float: left;
  position: relative;
  margin: 0 0 18px 18px;
  padding: 8px 8px 8px 30px;
  border-radius: 6px;
  font-size: 14px;
  background: #f7f7f7;
  .topicImg {
    position: absolute;
    width: 18px;
    height: 18px;
    left: 6px;
    top: 6px;
  }
`;

// List组件
export const ListItem = styled.div`
  padding: 20px 10px;
  overflow: hidden;
  border-bottom: 1px solid #dcdcdc;
  box-shadow: 0 0 4px 0 #ccc;
  background-image: linear-gradient(to right,#fffcfc, #f0f5fd);
  margin: 4px 0;
  height: 136px;
  border-radius: 10px;
  .listImg {
    float: right;
    width: 125px;
    height: 100px;
    border-radius: 10px;
    margin-left: 15px;
  }
`;

export const ListInfo = styled.div`
  .listTitle {
    cursor: pointer;
    padding-bottom: 6px; 
    font-size: 18px;
    font-weight: bold;
    color: #333;
    line-height: 27px;
  }
  .listContent {
    cursor: default;
    line-height: 20px;
    font-size: 14px;
    color: #999;
  }
`;

export const ListFootnote = styled.div`
  margin-top: 10px;
  font-size: 12px;
  margin-left: -20px;
  color: #999;
  .writer {
    cursor: pointer;
    float: left;
    margin-left: 20px;

  }
  .read {
    cursor: default;
    float: left;
    margin-left: 20px;
  }
  .comment {
    cursor: default;
    float: left;
    margin-left: 20px;
  }
`;

export const LoadMore = styled.div`
  width: 100%
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 30px 0;
  background: #a5a5a5;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
`;

// Create组件
export const CreateWrapper = styled.div`
  background: #fffcfc;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 0 4px 0 #ccc;
  background-image: linear-gradient(to right, #fff8f8 0%, #fffeef 50%,#fbfdff 70%, #f5f4f9 100%);
`;

export const CreateHeader = styled.div`
  overflow: hidden;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
`;

export const CreateItem = styled.div`
  float: left;
  margin-left: 24px;
  padding-top: 25px;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  .iconfont {
    display: block;
    width: 35px;
    height: 35px;
    color: blue;
    margin-bottom: 14px;
    margin-left: 10px;
    font-size: 24px;
  }
  .question {
    color: blue;
  }
  .article {
    color: rgb(244, 200, 7);
  }
  .thought {
    color: rgb(38, 191, 191);
  }
  &:hover {
    color: rgb(24, 144, 255);
  }
`;

export const CreateBottom = styled.div`
  overflow: hidden;
  .live {
    text-decoration: none;
    display: block;
    cursor: pointer;
    padding: 14px 40px;
    text-align: center;
    font-size: 15px;
    line-height: 25px;
    color: #666;
  }
`;

// Recommend组件
export const RecommendWrapper = styled.div`
  margin: 15px 0;
  width: 300px;
`;

export const RecommendItem = styled.div`
  width: 300px;
  height: 50px;
  background: url(${(props)=>(props.imgUrl)});
  background-size: contain;
`;

// 回到顶部组件
export const BackTop = styled.div`
   position: fixed;
   bottom: 10px;
   right: 10px;
   width: 60px;
   height: 60px;
   box-shadow: 0 0 4px 0 #ccc;
   line-height: 60px;
   text-align: center;
   background-image: linear-gradient(to right, #fff8f8 0%, #fffeef 50%,#fbfdff 70%, #f5f4f9 100%);
   cursor: pointer;
   border-radius: 6px;
`;

// 音乐组件
export const MusicWrapper = styled.div`
  .aplayer {
    background: #fffcfc;
    margin-top: 10px;
  }
`;

