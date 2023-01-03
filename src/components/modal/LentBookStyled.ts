import styled from 'styled-components';

export const LentContainer = styled.div`
  width: 722px;
  form {
    display: flex;
    flex-direction: column;
    gap: 40px;
    .button-lent {
      align-self: flex-end;
      width: 272px;
    }
  }
  @media (max-width: 800px) {
    width: 500px;
    form {
      .button-lent {
        align-self: center;
        justify-self: center;
      }
    }
  }
  /* @media (max-width: 550px) {
		width: auto;
		
	} */
`;
