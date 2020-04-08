import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Redirect } from 'react-router-dom';
import {
  RegisterWrapper,
  RegisterBox,
  Input,
  Button
} from './style';

class Register extends PureComponent {
  render() {
    const { registerStatus } = this.props;
    if (!registerStatus) {
      return (
        <RegisterWrapper>
          <RegisterBox>
            <Input placeholder='账号' ref={(input) => {this.account=input}} autofocus/>
            <Input placeholder='密码' type='password' ref={(input) => {this.password=input}}/>
            <Button onClick={() => {this.props.register(this.account, this.password)}}>注册</Button>
          </RegisterBox>
        </RegisterWrapper> 
      )
    } else {
      return <Redirect to='/' />
    }
  }
}

const mapStateToProps = (state) => ({
    registerStatus: state.getIn(['register', 'registerStatus'])
});

const mapDispatchToProps = (dispatch) => ({
  register(accountElem, passwordElem) {
    dispatch(actionCreators.register(accountElem.value, passwordElem.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
