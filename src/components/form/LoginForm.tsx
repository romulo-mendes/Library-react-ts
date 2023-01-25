import { ReactComponent as Logo } from '../../assets/logo.svg';
import { useState } from 'react';
import { Alert, Button, Link, Snackbar, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../services/auth';
import { FormContainer } from './LoginFormStyled';

const validationSchema = yup.object({
  email: yup.string().email('Digite um email válido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

const LoginForm = () => {
  const [err, setErr] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      setErr('');
      const user = {
        email: values.email,
        password: values.password,
      };
      const response = await userLogin(user);
      if (response.status === 200) {
        console.log(response);
        localStorage.setItem('token', response.data);
        localStorage.setItem('email', values.email);
        navigate('/');
      } else if (response === 401) {
        setErr('Login ou senha inválido!');
        setOpen(true);
      } else {
        setErr('Erro no servidor, tente novamente mais tarde!');
        setOpen(true);
      }
    },
  });
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => {
          setOpen(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
      </Snackbar>
      <FormContainer
        onSubmit={e => {
          e.preventDefault();
          if (formik.values.email.length < 1 || formik.values.password.length < 1) {
            setErr('Preencha todos os campos!');
            setOpen(true);
          }
          formik.handleSubmit();
        }}
      >
        <div>
          <Logo className="logo" />
        </div>
        <form>
          <TextField
            className="inputs-login "
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            style={open ? { border: '1px solid red' } : {}}
            placeholder={'E-mail'}
            sx={{
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
              '& fieldset': {
                border: 'none',
              },
              '& input': {
                padding: ' 14px 16px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MailTwoToneIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <TextField
            className="inputs-login "
            id="password"
            type={'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={open ? { border: '1px solid red' } : {}}
            placeholder={'Senha'}
            sx={{
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
              '& fieldset': {
                border: 'none',
              },
              '& input': {
                padding: ' 14px 16px',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockTwoToneIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Link className="link" href="" color="inherit">
            {'Esqueci minha senha'}
          </Link>

          <Button type="submit" size="large" variant="contained" color="secondary">
            ENTRAR
          </Button>
        </form>
      </FormContainer>
    </>
  );
};

export default LoginForm;
