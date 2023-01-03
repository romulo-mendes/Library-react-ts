import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CloseContainer } from './CloserStyled';

const Closer = ({ onClick }: { onClick: React.MouseEventHandler<HTMLDivElement> }) => {
  return (
    <CloseContainer onClick={onClick}>
      <CloseIcon sx={{ fontSize: '28px' }} />
    </CloseContainer>
  );
};

export default Closer;
