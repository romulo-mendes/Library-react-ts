import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Outlet, useNavigate } from 'react-router-dom';
import { HeaderNav, MainContainer, UserContainer } from './HeaderStyled';
import { validateToken } from '../../services/auth';

const Header = () => {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  async function asyncValidateToken() {
    const isValidToken = await validateToken();
    console.log(isValidToken);
    if (!isValidToken) {
      alert('Token inválido ou expirado, tente fazer login novamente');
      navigate('/login');
    }
  }

  useEffect(() => {
    asyncValidateToken();
  }, []);

  function userLogout(): void {
    localStorage.removeItem('email');
    navigate('/login');
  }
  return (
    <>
      <HeaderNav>
        <a href="/">
          <Logo className="logo" />
        </a>
        <UserContainer
          onClick={() => {
            setLogout(!logout);
          }}
        >
          <PersonIcon sx={{ color: '#ffc501' }} />
          <p className="user-email">{email}</p>
          <KeyboardArrowDownIcon />
          {logout && (
            <div onClick={(): void => userLogout()} className="logout">
              <p>Sair</p>
            </div>
          )}
        </UserContainer>
      </HeaderNav>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};

export default Header;
