import styled from 'styled-components';

export const InactiveContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 804px;
  gap: 24px;
  button {
    align-self: flex-end;
    padding: 16px 24px;
  }
  @media (max-width: 890px) {
    width: 500px;
  }
`;
