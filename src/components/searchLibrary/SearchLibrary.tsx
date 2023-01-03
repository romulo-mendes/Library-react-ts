import { useState } from 'react';
import { categoryEnum, useBooks } from '../../context/useBooks';
import { TextField, Button, ThemeProvider } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormContainer } from './SearchLibraryStyled';
import { mainTheme } from '../../styles/Theme';

const SearchLibrary = () => {
  const { setSearch, setCategory } = useBooks();
  const [searchInput, setSearchInput] = useState('');
  const [categorySelect, setCategorySelect] = useState('');
  return (
    <FormContainer
      onSubmit={e => {
        e.preventDefault();
        if (categorySelect === '') setCategorySelect('tittle');
        setCategory(categorySelect as categoryEnum);
        setSearch(searchInput);
      }}
    >
      <div className="input-container">
        <div className="div-input">
          <TextField
            name="search"
            placeholder="Pesquisar livro..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <ThemeProvider theme={mainTheme}>
                    <Button type="submit" sx={{ height: '43px' }} variant="contained" color="secondary">
                      Buscar
                    </Button>
                  </ThemeProvider>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
      </div>
      <div className="div-select">
        <FormControl fullWidth>
          <InputLabel id="category-label">Filtrar</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={categorySelect}
            label="Filtrar"
            onChange={e => setCategorySelect(e.target.value)}
          >
            <MenuItem value="tittle">Titulo</MenuItem>
            <MenuItem value="author">Autor</MenuItem>
            <MenuItem value="genre">Gênero</MenuItem>
            <MenuItem value="systemEntryDate">Data de entrada</MenuItem>
          </Select>
        </FormControl>
      </div>
    </FormContainer>
  );
};

export default SearchLibrary;
