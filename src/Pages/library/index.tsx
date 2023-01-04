import SearchLibrary from '../../components/searchLibrary/SearchLibrary';
import BooksProvider from '../../context/useBooks';
import BooksLibrary from '../../components/booksLibrary/BooksLibrary';
import { LibraryContainer } from './styles';
import { ThemeProvider } from '@mui/material';
import { searchInputTheme } from '../../styles/Theme';
import BackTo from '../../components/main/BackTo';

const Library = () => {
  return (
    <LibraryContainer>
      <BackTo back="Home" current="Biblioteca" />
      <BooksProvider>
        <ThemeProvider theme={searchInputTheme}>
          <SearchLibrary />
        </ThemeProvider>
        <BooksLibrary />
      </BooksProvider>
    </LibraryContainer>
  );
};

export default Library;
