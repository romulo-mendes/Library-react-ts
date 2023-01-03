import { CardContainer } from './CardLibraryStyled';

type CardLibraryProps = {
  img: string;
  tittle: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const CardLibrary = ({ img, tittle, onClick }: CardLibraryProps) => {
  return (
    <CardContainer onClick={onClick}>
      <img src={img} alt={`capa do livro ${tittle}`} />
      <h6>{tittle}</h6>
    </CardContainer>
  );
};

export default CardLibrary;
