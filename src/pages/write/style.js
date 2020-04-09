import styled from 'styled-components';

export const WriteWrapper = styled.div`
  margin-top: 10px;
`;

export const WriteHeader = styled.div`

`;

export const Publish = styled.div`
  position: fixed;
  width: 100px;
  height: 37px;
  top: 8px;
  right: 300px;
  background: #54bdf3;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  line-height: 37px;
  z-index: 100;
  cursor: pointer;
`;

export const Title = styled.input.attrs({
  placeholder: '请输入文章标题...'
})`
  width: 100%;
  height: 45px;
  padding: 0 10px;
`