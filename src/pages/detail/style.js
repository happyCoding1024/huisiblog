import styled from 'styled-components';

export const DetailWrapper = styled.div`
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

export const DetailLeft = styled.div`
  float: left;
  width: 800px;
  margin-left: 10px;
  margin-top: 20px;
`;

export const DetailRight = styled.div`
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

export const ArticleHeader = styled.div`
  overflow: hidden;
  padding: 24px;
  .writerImg {
    float: left;
    width: 39px;
    height: 39px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const ArticleWriter = styled.div`
`;

export const Writer = styled.div`
  position: relative;
  margin-left: 50px;
  .name {
    padding-top: 2px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  .time {
    padding-top: 5px;
    display: inline-block;
    font-size: 14px;
    color: #ccc;
  }
  .watch { 
    position: absolute;
    top: 7px;
    left: 520px;
    line-height: 26px;
    text-align: center;
    width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #6cbd45;
    color: #6cbd45;
    background-color: #fff;
    cursor: pointer;
  }
`;


export const ArticleContent = styled.div`
  padding: 24px;
`;

export const ArticleTitle = styled.div`
  margin: 8px 0;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;

export const Content = styled.div`
  
`;

// 音乐组件
export const MusicWrapper = styled.div`
  .aplayer {
    background: #fffcfc;
    margin-top: 10px;
  }
`;