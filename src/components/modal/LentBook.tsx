import { Typography, TextField, Grid, Button } from '@mui/material';
import { MainModalProps } from '../../models/modalState';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers';
import { getBook, editBook } from '../../services/books';
import { Book } from '../../models/book';
import { useEffect, useState } from 'react';
import Closer from './Closer';
import { LentContainer } from './LentBookStyled';

const validationSchema = yup.object({
  studentName: yup.string().required('Campo Obrigatório'),
  studentClass: yup.string().required('Campo Obrigatório'),
  withdrawalDate: yup.string().required('Campo Obrigatório'),
  deliveryDate: yup.string().required('Campo Obrigatório'),
});

const LentBook = ({ controlModal, bookId }: MainModalProps) => {
  const [book, setBook] = useState<Book>();
  useEffect(() => {
    async function startGetBook() {
      setBook(await getBook(bookId));
    }
    startGetBook();
  }, []);

  const formik = useFormik({
    initialValues: {
      studentName: '',
      studentClass: '',
      withdrawalDate: null,
      deliveryDate: null,
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      if (values.deliveryDate !== null && values.withdrawalDate !== null) {
        try {
          const rentHistory = {
            studentName: values.studentName,
            class: values.studentClass,
            withdrawalDate: new Date(values.withdrawalDate),
            deliveryDate: new Date(values.deliveryDate),
          };
          if (book) {
            book.rentHistory.push(rentHistory);
            await editBook(bookId, book);
            controlModal && controlModal('lent', 'main');
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  return (
    <LentContainer>
      <Closer onClick={() => controlModal('lent', 'main')} />
      <Typography variant="h6" sx={{ mb: '24px' }}>
        Informe os dados do aluno antes de continuar
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Grid container columns={{ xs: 1, sm: 12 }} spacing={2.4}>
          <Grid item xs={6}>
            <TextField
              label="Nome do Aluno"
              id="studentName"
              type="text"
              value={formik.values.studentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.studentName && Boolean(formik.errors.studentName)}
              helperText={formik.touched.studentName && formik.errors.studentName}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Turma"
              id="studentClass"
              type="text"
              value={formik.values.studentClass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.studentClass && Boolean(formik.errors.studentClass)}
              helperText={formik.touched.studentClass && formik.errors.studentClass}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Data de Retirada"
              inputFormat="dd/MM/yyyy"
              value={formik.values.withdrawalDate && formik.values.withdrawalDate}
              onChange={value => {
                value && formik.setFieldValue('withdrawalDate', value);
              }}
              renderInput={params => (
                <TextField
                  id="withdrawalDate"
                  error={formik.touched.withdrawalDate && Boolean(formik.errors.withdrawalDate)}
                  helperText={formik.touched.withdrawalDate && formik.errors.withdrawalDate}
                  fullWidth
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Data de Entrada"
              inputFormat="dd/MM/yyyy"
              disableHighlightToday
              minDate={formik.values.withdrawalDate || new Date()}
              value={formik.values.deliveryDate && formik.values.deliveryDate}
              onChange={value => {
                value && formik.setFieldValue('deliveryDate', value);
              }}
              renderInput={params => (
                <TextField
                  id="deliveryDate"
                  error={formik.touched.deliveryDate && Boolean(formik.errors.deliveryDate)}
                  helperText={formik.touched.deliveryDate && formik.errors.deliveryDate}
                  fullWidth
                  {...params}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button className="button-lent" type="submit" variant="contained" color="secondary">
          <AutoStoriesOutlinedIcon sx={{ mr: '12px' }} /> Emprestar
        </Button>
      </form>
    </LentContainer>
  );
};

export default LentBook;
