import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Redirect } from 'react-router-dom';
import {
  Container,
  LoginWrapper,
  LoginHeader,
  LoginBox,
  Input,
  Button
} from './style';

class Login extends PureComponent {
 
  render() {
    const { loginStatus } = this.props; 
    if (!loginStatus) {
      return (
        <Container>
          <LoginWrapper>
            <LoginHeader>login</LoginHeader>
            <LoginBox>
              <Input 
                placeholder='username' 
                ref={(input) => {this.account=input}} 
              />
              <Input placeholder='password' type='password' ref={(input) => {this.password=input}}/>
              <Button onClick={() => {this.props.login(this.account, this.password)}}>login</Button>
            </LoginBox>
          </LoginWrapper> 
        </Container>
      )
    } else {
      return <Redirect to='/admin' />
    }
  }

  componentDidMount() {
    this.props.changeInputElem(this.account, this.password)
  }
}

const mapStateToProps = (state) => ({
    loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatchToProps = (dispatch) => ({
  login(accountElem, passwordElem) {
    dispatch(actionCreators.login(accountElem.value, passwordElem.value));
  },
  changeInputElem(accountInputElem, passInputElem) {
    dispatch(actionCreators.changeInputElem(accountInputElem, passInputElem))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
