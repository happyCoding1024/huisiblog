import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { actionCreators } from './store';
import { WriteWrapper, WriteHeader } from './style.js';

class Write extends PureComponent {
  render() {
    const { loginStatus, textValue, handleChange } = this.props; 
    if (loginStatus) {
      return (
        <WriteWrapper>
          <WriteHeader>
            <div className="container container-narrow">
              <SimpleMDEReact
                className={""}
                value={textValue}
                onChange={handleChange}
              />
            </div>
          </WriteHeader>
        </WriteWrapper>
      )
    } else {
      return <Redirect to='/login' />
    }
  }

}

const mapStateToProps = (state) => ({
  textValue: state.getIn(['writer', 'textValue']),
  loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatchToProps = (dispatch) => ({
  handleChange(value) {
    dispatch(actionCreators.changeValue(value))
  }
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Write);
