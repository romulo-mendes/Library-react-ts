import { useEffect, useState } from 'react';
import { rentHistory } from '../../models/book';
import { MainModalProps } from '../../models/modalState';
import { getBook } from '../../services/books';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputAdornment from '@mui/material/InputAdornment';
import Closer from './Closer';
import { RentTableContainer } from './RentHsitoryStyled';

enum columnEnum {
  STUDENTNAME = 'studentName',
  CLASS = 'class',
  WITHDRAWALDATE = 'withdrawalDate',
  DELIVERYDATE = 'deliveryDate',
}

const RentHistory = ({ bookId, controlModal }: MainModalProps) => {
  const [rent, setRent] = useState<rentHistory[]>();
  const [filteredBook, setFilteredBook] = useState<rentHistory[]>();

  const [studentNameFilter, setStudentNameFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [withdrawalDateFilter, setWithdrawalDateFilter] = useState('');
  const [deliveryDateFilter, setDeliveryDateFilter] = useState('');

  const [sorting, setSorting] = useState<'asc' | 'desc'>('asc');
  const [columnSort, setColumnSort] = useState('');

  async function getBookAwait() {
    const response = await getBook(bookId);
    setRent(response.rentHistory);
    setFilteredBook(response.rentHistory);
  }
  useEffect(() => {
    getBookAwait();
  }, []);

  const simplify = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  useEffect(() => {
    if (!studentNameFilter && !classFilter && !withdrawalDateFilter && !deliveryDateFilter) {
      setFilteredBook(rent);
    }
    const filteredRent = rent?.filter(row => {
      if (studentNameFilter && !simplify(row.studentName).includes(simplify(studentNameFilter))) return false;

      if (classFilter && !simplify(row.class).includes(simplify(classFilter))) return false;

      if (
        withdrawalDateFilter &&
        !new Date(row.withdrawalDate)
          .toLocaleDateString('pt-br')
          .toLowerCase()
          .includes(withdrawalDateFilter.toLowerCase())
      )
        return false;

      if (
        deliveryDateFilter &&
        !new Date(row.deliveryDate).toLocaleDateString('pt-br').toLowerCase().includes(deliveryDateFilter.toLowerCase())
      )
        return false;

      return true;
    });
    setFilteredBook(filteredRent);
  }, [studentNameFilter, classFilter, withdrawalDateFilter, deliveryDateFilter, rent]);

  const handleSortClick = (column: columnEnum) => {
    if (filteredBook) {
      const sortingNext = sorting === 'asc' ? 'desc' : 'asc';
      setSorting(sortingNext);

      setColumnSort(column);
      const filteredBookCopy = [...filteredBook];

      const sortRent = filteredBookCopy?.sort(function (a, b) {
        if (sortingNext === 'desc') return a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;

        return a[column] > b[column] ? -1 : a[column] < b[column] ? 1 : 0;
      });
      setFilteredBook(sortRent);
    }
  };

  return (
    <RentTableContainer>
      <Closer onClick={() => controlModal('rentHistory', 'main')} />
      <Typography variant="h6" sx={{ mb: '29px' }}>
        Histórico de empréstimos do livro
      </Typography>
      <Table sx={{ minWidth: 978, maxHeight: 1300 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome do Aluno</TableCell>
            <TableCell>Turma</TableCell>
            <TableCell>Data de Retirada</TableCell>
            <TableCell>Data de Entrega</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TextField
                value={studentNameFilter}
                name="studentName"
                onChange={event => setStudentNameFilter(event.target.value)}
                variant="standard"
                sx={{ width: '105px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleSortClick(columnEnum.STUDENTNAME)}
                    >
                      {columnSort === 'studentName' ? (
                        <FilterListIcon
                          style={{
                            transform: `rotate(${sorting === 'asc' ? 0 : 180}deg)`,
                          }}
                        />
                      ) : (
                        <FilterListIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                value={classFilter}
                name="class"
                onChange={event => setClassFilter(event.target.value)}
                variant="standard"
                sx={{ width: '105px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleSortClick(columnEnum.CLASS)}
                    >
                      {columnSort === 'class' ? (
                        <FilterListIcon
                          style={{
                            transform: `rotate(${sorting === 'asc' ? 0 : 180}deg)`,
                          }}
                        />
                      ) : (
                        <FilterListIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                value={withdrawalDateFilter}
                name="withdrawalDate"
                onChange={event => setWithdrawalDateFilter(event.target.value)}
                variant="standard"
                sx={{ width: '105px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleSortClick(columnEnum.WITHDRAWALDATE)}
                    >
                      {columnSort === 'withdrawalDate' ? (
                        <FilterListIcon
                          style={{
                            transform: `rotate(${sorting === 'asc' ? 0 : 180}deg)`,
                          }}
                        />
                      ) : (
                        <FilterListIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </TableCell>
            <TableCell>
              <TextField
                value={deliveryDateFilter}
                name="deliveryDate"
                onChange={event => setDeliveryDateFilter(event.target.value)}
                variant="standard"
                sx={{ width: '105px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleSortClick(columnEnum.DELIVERYDATE)}
                    >
                      {columnSort === 'deliveryDate' ? (
                        <FilterListIcon
                          style={{
                            transform: `rotate(${sorting === 'asc' ? 0 : 180}deg)`,
                          }}
                        />
                      ) : (
                        <FilterListIcon />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBook &&
            filteredBook.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.studentName}</TableCell>
                <TableCell>{row.class}</TableCell>
                <TableCell>{new Date(row.withdrawalDate).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{new Date(row.deliveryDate).toLocaleDateString('pt-BR')}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </RentTableContainer>
  );
};

export default RentHistory;
