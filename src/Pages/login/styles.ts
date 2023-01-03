import styled from 'styled-components';
import img from '../../assets/backgroundlogin.png';

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${img}) no-repeat;
  background-position: 20% 70%;
  background-size: cover;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #343a40;
    opacity: 0.7;
  }
`;
