import styled from '@emotion/styled';

export const CardsContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 45vh;
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
`;

export const style = {
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#FFF',
  border: '1px solid #707070',
  padding: '40px',
  mt: '55px',
  '@media (max-width: 510px)': {
    padding: '50px 15px 15px 15px',
    width: '100%',
  },
};
