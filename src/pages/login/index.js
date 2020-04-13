import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Redirect } from 'react-router-dom';
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button
} from './style';

class Login extends PureComponent {
  render() {
    const { loginStatus } = this.props; 
    console.log('loginStatus = ', loginStatus)
    if (!loginStatus) {
      return (
        <LoginWrapper>
          <LoginBox>
            <Input placeholder='账号' ref={(input) => {this.account=input}}/>
            <Input placeholder='密码' type='password' ref={(input) => {this.password=input}}/>
            <Button onClick={() => {this.props.login(this.account, this.password)}}>提交</Button>
          </LoginBox>
        </LoginWrapper> 
      )
    } else {
      return <Redirect to='/admin' />
    }
  }
}

const mapStateToProps = (state) => ({
    loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatchToProps = (dispatch) => ({
  login(accountElem, passwordElem) {
    dispatch(actionCreators.login(accountElem.value, passwordElem.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
