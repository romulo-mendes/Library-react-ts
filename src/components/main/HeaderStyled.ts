import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 105px);
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
`

export const HeaderNav = styled.header`
    padding: 24px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    position: relative;
    p {
        color: #495057 !important;
        font-weight: 500;
        font-size: 18px;
    }
    .logout {
        color: #2a2a2a;
        background-color: #f4f4f4;
        border-radius: 5px;
        position: absolute;
        width: 148px;
        height: 57px;
        right: 0;
        top: 0;
        padding: 16px;
        margin-top: 46px;
        z-index: 2;
    }
    @media (max-width: 420px) {
        .user-email {
            display: none;
        }
    }
`
