export type TModal = 'main' | 'lent' | 'rentHistory' | 'inactive';

export type MainModalProps = {
  bookId: string;

  controlModal: (closeModal: TModal, openModal: TModal) => void;
};
