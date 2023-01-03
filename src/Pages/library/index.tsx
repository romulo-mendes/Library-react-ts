import SearchLibrary from '../../components/searchLibrary/SearchLibrary';
import BooksProvider from '../../context/useBooks';
import BooksLibrary from '../../components/booksLibrary/BooksLibrary';
import { LibraryContainer } from './styles';
import { ThemeProvider } from '@mui/material';
import { searchInputTheme } from '../../styles/Theme';

const Library = () => {
  return (
    <LibraryContainer>
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
