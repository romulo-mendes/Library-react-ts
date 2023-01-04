import styled from 'styled-components';

export const RentContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  .table-container {
    padding: 40px 24px 24px 24px;
  }

  .MuiTableCell-root {
    font-size: 16px;
  }
  .MuiTableRow-head:first-child {
    background-color: #ffc501;
    .MuiTableCell-root {
      padding: 10px;
      font-weight: 600;
    }
  }
  .MuiTableRow-root {
    .MuiTableCell-root:first-child {
      padding-left: 40px;
    }
  }
`;
