import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { actionCreators } from './store';
import { WriteWrapper, WriteHeader, Publish, Title } from './style.js';

class Write extends PureComponent {
  render() {
    const { loginStatus, textValue, titleValue, handleChange, handleArticlePublish, handleTitleChange } = this.props; 
    if (loginStatus) {
      return (
        <WriteWrapper>
          <WriteHeader>
            <Publish 
              className='publish'
              onClick = {() => {handleArticlePublish(titleValue, textValue)}}
            >
              发表文章
            </Publish>
            <Title 
              value={titleValue}
              onChange={handleTitleChange}
            >
            </Title>
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
  titleValue: state.getIn(['writer', 'titleValue']),
  loginStatus: state.getIn(['login', 'loginStatus'])
});

const mapDispatchToProps = (dispatch) => ({
  handleChange(value) {
    dispatch(actionCreators.changeValue(value))
  },
  handleTitleChange(e) {
    dispatch(actionCreators.changeTitleValue(e.target.value))
  },
  handleArticlePublish(title, content) {
    dispatch(actionCreators.articlePublish(title, content))
  }
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Write);
