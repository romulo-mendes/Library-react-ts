import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/main/Header';
import Home from './pages/home';
import Login from './pages/login';
import Library from './pages/library';
import { mainTheme } from './styles/Theme';
import { ThemeProvider } from '@mui/material';
import NewBook from './pages/newBook';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import EditBook from './pages/editBook';
import AllRentHistory from './pages/allRentHistory';

function App() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Header />}>
                <Route index element={<Home />} />
                <Route path="biblioteca" element={<Library />} />
                <Route path="biblioteca/editar/:bookId" element={<EditBook />} />
                <Route path="cadastrar" element={<NewBook />} />
                <Route path="historico" element={<AllRentHistory />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
