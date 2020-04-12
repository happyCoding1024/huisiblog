import React, { PureComponent } from 'react';
// import './kbdNav.css';
import createKbdNav from './createKbdNav';
import { KbdNavWrapper, KbdNav, KbdNavdesc } from './style';

class KeyboardNavigator extends PureComponent {
  render() {
    return (
      <KbdNavWrapper>
        <KbdNavdesc className='KdbNavDesc'>
          <h1>键盘导航</h1>
          Q.首页，W.个人主页，E.登录，R.注册，其它按键点击按键上的编辑自定义设置
        </KbdNavdesc>
        <KbdNav className='kbdNav' ref={(KbdNav) => {this.KbdNavElem=KbdNav}}></KbdNav> 
      </KbdNavWrapper>
    )
  }

  componentDidMount() {
    createKbdNav(this.KbdNavElem)
  }
}

export default KeyboardNavigator;
