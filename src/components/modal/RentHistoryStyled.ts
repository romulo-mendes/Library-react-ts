import styled from 'styled-components';

export const RentTableContainer = styled.div`
  overflow: auto;
  .MuiTableRow-head:first-child {
    background-color: #ffc501;
    .MuiTableCell-root {
      padding: 10px;
    }
  }
  .MuiTableRow-root {
    .MuiTableCell-root:first-child {
      padding-left: 40px;
    }
  }
  @media (max-width: 1050px) {
    width: 550px;
  }
`;
