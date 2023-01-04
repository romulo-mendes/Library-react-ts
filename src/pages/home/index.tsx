import CardHome from '../../components/cardHome';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { HomeContainer } from './styles';

const Home = () => {
  return (
    <HomeContainer>
      <CardHome text="Cadastrar novo livro" icon={<AddCircleOutlineIcon sx={{ fontSize: 50 }} />} linkTo="cadastrar" />
      <CardHome text="Biblioteca" icon={<AutoStoriesOutlinedIcon sx={{ fontSize: 50 }} />} linkTo="biblioteca" />
      <CardHome
        text="Histórico de empréstimos"
        icon={<PendingActionsOutlinedIcon sx={{ fontSize: 50 }} />}
        linkTo="historico"
      />
    </HomeContainer>
  );
};

export default Home;
