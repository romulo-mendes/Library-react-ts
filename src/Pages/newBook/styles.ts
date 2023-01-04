import styled from 'styled-components';

export const NewBookContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  align-items: center;
  overflow: auto;
  flex-direction: column;
  gap: 117px;
  @media (max-width: 805px) {
    gap: 10px;
  }
`;
