import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 196px;
  height: 261px;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 16px;
  align-items: center;
  border: 5px;
  cursor: pointer;
  img {
    max-width: 108px;
    max-height: 155px;
  }
  h6 {
    color: #3e4756;
    font-size: 16px;
    text-align: center;
  }
`;
