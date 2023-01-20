import { InputAdornment, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllBooks, getAllRent } from '../../services/books';
import FilterListIcon from '@mui/icons-material/FilterList';
import { RentContainer } from './styles';
import BackTo from '../../components/main/BackTo';
import { allRentType } from '../../models/book';

type RentType = {
  studentName: string;
  class: string;
  tittle: string;
  withdrawalDate: Date;
  deliveryDate: Date;
};

enum columnEnum {
  STUDENTNAME = 'studentName',
  CLASS = 'class',
  TITLLE = 'tittle',
  WITHDRAWALDATE = 'withdrawalDate',
  DELIVERYDATE = 'deliveryDate',
}

const AllRentHistory = () => {
  const [allRents, setAllRents] = useState<allRentType[]>([]);
  const [filteredBook, setFilteredBook] = useState<allRentType[]>();

  const [studentNameFilter, setStudentNameFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [tittleFilter, setTittleFilter] = useState('');
  const [withdrawalDateFilter, setWithdrawalDateFilter] = useState('');
  const [deliveryDateFilter, setDeliveryDateFilter] = useState('');

  const [sorting, setSorting] = useState<'asc' | 'desc'>('asc');
  const [columnSort, setColumnSort] = useState('');

  async function AsyncGet() {
    const response = await getAllRent();
    console.log(response);
    setAllRents(response.rentHistory);
    setFilteredBook(response.rentHistory);
  }

  useEffect(() => {
    AsyncGet();
  }, []);

  const simplify = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  useEffect(() => {
    if (!studentNameFilter && !classFilter && !tittleFilter && !withdrawalDateFilter && !deliveryDateFilter) {
      setFilteredBook(allRents);
    }
    const filteredRent = allRents?.filter(row => {
      if (studentNameFilter && !simplify(row.studentName).includes(simplify(studentNameFilter))) return false;

      if (classFilter && !simplify(row.class).includes(simplify(classFilter))) return false;

      if (tittleFilter && !simplify(row.tittle).includes(simplify(tittleFilter))) return false;

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
  }, [studentNameFilter, classFilter, tittleFilter, withdrawalDateFilter, deliveryDateFilter, allRents]);

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
    <RentContainer>
      <BackTo back="Home" current="Histórico de Empréstimos" />
      <div className="table-container">
        <Table sx={{ minWidth: '1270px', minHeight: '500px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Aluno</TableCell>
              <TableCell>Turma</TableCell>
              <TableCell>Livro</TableCell>
              <TableCell>Data de Retirada</TableCell>
              <TableCell>Data de Entrega</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TextField
                  value={studentNameFilter}
                  name="studentName"
                  onChange={e => setStudentNameFilter(e.target.value)}
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
                  onChange={e => setClassFilter(e.target.value)}
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
                  value={tittleFilter}
                  name="tittle"
                  onChange={e => setTittleFilter(e.target.value)}
                  variant="standard"
                  sx={{ width: '105px' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleSortClick(columnEnum.TITLLE)}
                      >
                        {columnSort === 'tittle' ? (
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
                  onChange={e => setWithdrawalDateFilter(e.target.value)}
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
                  onChange={e => setDeliveryDateFilter(e.target.value)}
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
                  <TableCell>{row.tittle}</TableCell>
                  <TableCell>{new Date(row.withdrawalDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{new Date(row.deliveryDate).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </RentContainer>
  );
};

export default AllRentHistory;
