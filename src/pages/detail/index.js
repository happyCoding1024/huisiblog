import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import { actionCreators } from './store';
import {
  DetailWrapper,
  DetailLeft,
  DetailRight,
  ArticleHeader,
  Writer,
  ArticleContent,
  ArticleTitle,
  Content
} from './style';
import { withRouter } from 'react-router-dom';

class Detail extends PureComponent {
  render() { 
    const { title, content } = this.props;
    var showdown  = require('showdown');
    var    converter = new showdown.Converter();
    var    text      = content;
    var    html      = converter.makeHtml(text);
    console.log(this.props);
    return (
      <DetailWrapper>
        <DetailLeft>
          <ArticleHeader>
            <img className='writerImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg' />
            <Writer className='writer'>
              <div className='name'>codingOrange</div>
              <div className='time'>2010年02月29日</div>
              <div className='watch'>关注</div>
            </Writer>
          </ArticleHeader>
          <ArticleContent>
            <ArticleTitle>
              {title}
            </ArticleTitle>
            <Content >    
              <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}}></div>
            </Content>
          </ArticleContent>
        </DetailLeft>
        <DetailRight>
        </DetailRight>
      </DetailWrapper>
    )
  }

  componentDidMount() {
    console.log(this.props)
    this.props.getDetail(this.props.match.params.id);
  }

}

const mapStateToProps = (state) => ({
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content'])
});

const mapDispatchToProps = (dispatch) => ({
  getDetail(id) {
    dispatch(actionCreators.getDetailAction(id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));
