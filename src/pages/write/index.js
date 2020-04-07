import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends PureComponent {
  render() {
    const { loginStatus } = this.props; 
    if (loginStatus) {
      return (
        <div>write</div>
      )
    } else {
      return <Redirect to='/login' />
    }
  }
}

const mapStateToProps = (state) => ({
    loginStatus: state.getIn(['login', 'loginStatus'])
});

export default connect(mapStateToProps, null)(Login);
