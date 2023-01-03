import styled from 'styled-components'

export const FormContainer = styled.div`
    width: 433px;
    height: 456px;
    padding: 56px 40px;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 56px;
    z-index: 1;
    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }
    .link {
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 16px;
    }
    @media (max-width: 450px) {
        width: auto;
        padding: 56px 20px;
    }
`
