import styled  from 'styled-components';

// 利用 absolute 填垂直方向的空间
export const Container = styled.div`
  background-image: linear-gradient(to right, #f3e7e9, #e3eeff);  
  padding: 40px;
  position: absolute;
  top: 52px;
  bottom: 0;
  left: 0;
  right: 0;
}
`;

export const RegisterWrapper = styled.div`
  background-color: #fff;
  width: 276px;
  height: 460px;
  border-radius: 15px;
  padding: 0 20px;
  position: relative;
  margin: 0 auto;
`;

export const RegisterHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
`;

export const RegisterBox = styled.div`
;
`;

export const Input = styled.input`
  display: block;
  width: 235px;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
  &::placeholder {
    text-transform: uppercase;   
  }
`;

export const Button = styled.div`
  text-align: center;
  padding: 10px;
  margin-top: 40px;
  background-image: linear-gradient(to right, #f3e7e9, #e3eeff);
  color: #c6c4c4;
  cursor: pointer;
  font-weight: bold;
`;