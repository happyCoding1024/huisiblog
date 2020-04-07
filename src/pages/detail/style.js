import styled from 'styled-components';

export const DetailWrapper = styled.div`
  width: 960px;
  margin: 20px auto 20px;
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
  width: 700px;
  height: 500px;
`;

export const DetailRight = styled.div`
  margin-left: 720px;
  background: pink;
  width: 240px; 
  height: 500px;
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