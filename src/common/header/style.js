import styled from 'styled-components';
import logoPic from '../../static/huisiLogo2.png';
// import { Input } from 'antd';

export const HeaderWrapper = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  height: 52px;
  border-bottom: 1px solid #f0f0f0;
  background-image: linear-gradient(to right, #fff8f8 0%, #fffeef 50%,#fbfdff 70%, #f5f4f9 100%);
`;

export const Nav = styled.div`
  width: 1190px;
  margin: 0 80px;
  padding： 0 50px;
  height: 52px;
  box-sizing: border-box;
  background: rgb(255, 252, 252);
  display: flow-root; // 清除浮动
  border-bottom: 1px solid #f0f0f0;
  background-image: linear-gradient(to right, #fff8f8 0%, #fffeef 50%,#fbfdff 70%, #f5f4f9 100%);
`;

export const Logo = styled.div`
  float: left;
  display: block;
  width: 100px;
  height: 50px;
  margin-top: 5px;
  background: url(${logoPic});
  background-size: contain;
  background-repeat: no-repeat;
`; 

export const NavItem = styled.div`
  line-height: 52px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  &.left {
    float: left;
  }
  &.right {
    float: right; 
    color: #969696;
  }
  &.register {
    display: none;
  }
  &:hover {
    color: black;
  }
  .ant-menu-horizontal > .ant-menu-submenu-selected {
    border-bottom: none;
    color: #fffcfc;
  }
  .ant-menu-horizontal > .ant-menu-item, .ant-menu-horizontal > .ant-menu-submenu {
    position: relative;
    top: 5px;
    display: inline-block;
    vertical-align: bottom;
    border-bottom: 2px solid transparent;
    background: #fffcfc;
    height: 39px;
  }
  .writerImg {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const SearchWrapper = styled.div`
  float: left;
  position: relative;
  .iconfont {
    position: absolute;
    top: 19px;
    left: 197px;
    transition: all .1s ease-in;
    &.focused {     
      left: 230px;
      color: blue;
    }
  }
`;

export const NavSearch = styled.input.attrs({
  placeholder: '珍惜时光，不负韶华'
})`
  width: 200px;
  height: 38px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  outline: none;
  background: pink;
  margin: 7px 0 0 20px;
  padding: 0px 26px 0px 14px;
  background: #eee;
  box-sizing: border-box;
  font-size: 14px;
  &.focused {
    width: 240px;
  }
  &.slide-enter {
      transition: all 0.2s ease-out; 
  }
  &.slide-enter-active {
    width: 240px; 
  }
  &.slide-enter-done {
    width: 240px;
  }
  &.slide-exit {
      transition: all 0.2s ease-out; 
  }
  &.slide-exit-active {
    width: 200px; 
  }
  &.slide-exit-done {
    width: 200px;
  }

`;


// antd Input 框
// export const NavSearch = styled(Input).attrs({
//   placeholder: '搜索'
// })`
//   width: 160px;
//   height: 38px;
//   box-sizing: border-box;
//   border-radius: 19px;
//   border: none;
//   outline: none;
//   background: pink;
//   margin: 7px 0 0 20px;
//   padding: 0px 30px 0px 20px;
//   background: #eee;
//   box-sizing: border-box;
//   font-size: 14px;
// `;

export const SearchInfo = styled.div`
  position: absolute;
  left: 23px;
  top: 52px;
  width: 236px;
  box-shadow: 0 0 6px 0 #ccc;
  background: #fff;
`;

export const SearchHot = styled.div`
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  padding: 6px;
`;

export const SearchChange = styled.span`
  position: relative;
  font-size: 12px;
  margin-left: 132px;
  cursor: pointer;
  .iconfont {
    display: block;
    position: absolute;
    transform-style: preserve-3d;
    top: 3px;
    left: -16px;
    font-size: 12px;
    transition: transform .2s  ease-in;
    transform-origin: center center;
  }
`;


export const SearchItem = styled.div`
  position: relative;
  font-size: 14px;
  padding: 6px 0 6px 6px;
  color: #333;
  cursor: pointer;
  .iconfont {
    position: absolute;
    left: 210px;
    top: 8px;
    color: red;
    font-size: 12px;
  }
`;

export const SearchHistory = styled.div`
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  padding: 6px;
`;




