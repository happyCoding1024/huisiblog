import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
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
import 'antd/dist/antd.css';
import { Calendar, Select, Radio, Col, Row, Typography } from 'antd';
import { Carousel } from 'antd';
import { withRouter } from 'react-router-dom';
import Music from './components/Music';

class Detail extends PureComponent {
  render() { 
    const { title, content } = this.props;
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
              <div className="container container-narrow">
                <SimpleMDEReact
                  className={""}
                  value={content}
                />
              </div>
            </Content>
          </ArticleContent>
        </DetailLeft>
        <DetailRight>
          <Carousel effect="fade" autoplay>
              <div>
                <h3>
                  <img  className='CarouselImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191222135037%E5%A4%B4%E5%83%8F.jpg'></img>
                </h3>
              </div>
              <div>
                <h3>
                <img className='CarouselImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1747474/o_200422025130%E8%87%AA%E6%8B%8D%E5%BC%B9%E7%90%B4.jpg'></img>
                </h3>
              </div>
              <div>
                <h3>
                <img className='CarouselImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1747474/o_200422030208%E6%AD%8C%E6%89%8B%E5%A4%A7%E8%B5%9B.JPG'></img>
                </h3>
              </div>
              <div>
                <h3>
                <img className='CarouselImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200417153555FrontEndLearningTool%E4%B8%BB%E9%A1%B5%E5%9B%BE%E7%89%87.jpg'></img>
                </h3>
              </div>
              <div>
                <h3>
                <img className='CarouselImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200325094714B%E7%AB%99%E4%BA%8C%E7%BB%B4%E7%A0%81188_188.png'></img>
                </h3>
              </div>
              <div>
                <h3>
                <img className='CarouselImg' alt='' src='https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_191225094918Github%E4%BA%8C%E7%BB%B4%E7%A0%81%E8%83%8C%E6%99%AF%E8%89%B2%E7%9B%B8%E5%90%8C188_188.png'></img>
                </h3>
              </div>
            </Carousel>
          <Calendar
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];

              const current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
              }

              for (let index = start; index < end; index++) {
                monthOptions.push(
                  <Select.Option className="month-item" key={`${index}`}>
                    {months[index]}
                  </Select.Option>,
                );
              }
              const month = value.month();

              const year = value.year();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
                );
              }
              return (
                <div style={{ padding: 8 }}>
                  <Typography.Title level={4}>
                    每天都是新的一天
                  </Typography.Title>
                  <Row gutter={8}>
                    <Col>
                      <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        onChange={newYear => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                        value={String(year)}
                      >
                        {options}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={String(month)}
                        onChange={selectedMonth => {
                          const newValue = value.clone();
                          newValue.month(parseInt(selectedMonth, 10));
                          onChange(newValue);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
              }}
          />
          <Music />
        </DetailRight>
      </DetailWrapper>
    )
  }

  componentDidMount() {
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
