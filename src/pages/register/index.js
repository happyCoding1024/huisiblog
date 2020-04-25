import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Redirect } from 'react-router-dom';
import {
  Container,
  RegisterHeader,
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
        <Container>
          <RegisterWrapper>
            <RegisterHeader>register</RegisterHeader>
            <RegisterBox>
              <Input placeholder='username' ref={(input) => {this.account=input}} autofocus/>
              <Input placeholder='password' type='password' ref={(input) => {this.password=input}}/>
              <Button onClick={() => {this.props.register(this.account, this.password)}}>sign up</Button>
            </RegisterBox>
          </RegisterWrapper> 
        </Container>
      )
    } else {
      return <Redirect to='/' />
    }
  }

  componentDidMount() {
    this.props.changeInputElem(this.account, this.password)
  }
}

const mapStateToProps = (state) => ({
    registerStatus: state.getIn(['register', 'registerStatus'])
});

const mapDispatchToProps = (dispatch) => ({
  register(accountElem, passwordElem) {
    dispatch(actionCreators.register(accountElem.value, passwordElem.value));
  },
  changeInputElem(accountInputElem, passInputElem) {
    dispatch(actionCreators.changeInputElem(accountInputElem, passInputElem))
  }  
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
