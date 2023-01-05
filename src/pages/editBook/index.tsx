import BackTo from '../../components/main/BackTo';
import BookForm from '../../components/form/BookForm';
import { EditBookContainer } from './styles';

const EditBook = () => {
  return (
    <EditBookContainer>
      <BackTo current="Editar livro" back="Biblioteca" to="/biblioteca" />
      <BookForm />
    </EditBookContainer>
  );
};

export default EditBook;
