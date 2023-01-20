import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { MainModalProps } from '../../models/modalState';
import { changeStatus } from '../../services/books';
import Closer from './Closer';
import { InactiveContainer } from './InactivateStyled';

const Inactivate = ({ bookId, controlModal }: MainModalProps) => {
  const [value, setValue] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const bookStatus = { isActive: false, description: value };
    changeStatus(bookId, bookStatus);
    controlModal('inactive', 'main');
  }

  return (
    <>
      <Closer
        onClick={() => {
          controlModal('inactive', 'main');
        }}
      />
      <InactiveContainer
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <Typography variant="h6">Inativar Livro</Typography>
        <TextField
          id="description"
          label="Descrição"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          multiline
          minRows={4}
          maxRows={4}
        />
        <Button variant="outlined" color="error" type="submit">
          Inativar
        </Button>
      </InactiveContainer>
    </>
  );
};

export default Inactivate;
