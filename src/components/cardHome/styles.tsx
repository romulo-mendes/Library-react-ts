import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: #f4f4f4;
  padding: 3px;
  width: 250px;
  height: 225px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #ffc501;
  }
  .icon {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text {
    border-radius: 0 0 5px 5px;
    background-color: #fff;
    height: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }
`;
