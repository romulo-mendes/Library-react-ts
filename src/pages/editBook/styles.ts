import styled from 'styled-components';

export const EditBookContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 110px;
  align-items: center;
  overflow: auto;
  @media (max-width: 805px) {
    gap: 10px;
  }
`;
