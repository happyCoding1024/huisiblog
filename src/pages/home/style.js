import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  background: rgb(255, 252, 252);
  box-shadow:0 0  4px 0 #eee;
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
  width: 625px;
  margin-left: 13px;
  margin-top: 20px;
  .KdbNav {
    width: 625px;
    height: 240px;
    vertical-align: bottom;
  }
`;

export const HomeRight = styled.div`
  width: 300px;
  margin: 20px 5px 0 0;
  float: right;
  .ant-picker-calendar {
    background: #fffcfc;
    border-radius: 4px;
    box-shadow: 0 0 5px 0 #ccc;
    margin-top: 5px;
  }
  .ant-picker-body {
    background: #fffcfc;
  }
  .CarouselImg {
    width: 300px;
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
  padding: 20px 0;
  overflow: hidden;
  border-bottom: 1px solid #dcdcdc;
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
`;

export const CreateBottom = styled.div`
  overflow: hidden;
  .wait {
    cursor: pointer;
    float: left;
    padding: 14px 50px;
    border-right: 1px solid #ccc;
    text-align: center;
  }
  .draft {
    cursor: pointer;
    float: right;
    padding: 14px 50px;
    text-align: center;
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
   bottom: 40px;
   right: 40px;
   width: 60px;
   height: 60px;
   border: 1px solid #ccc;
   line-height: 60px;
   text-align: center;
   cursor: pointer;
`;

// 音乐组件
export const MusicWrapper = styled.div`
  .aplayer {
    background: #fffcfc;
    margin-top: 10px;
  }
`;

