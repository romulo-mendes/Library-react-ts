export type bookStatus = {
  isActive: boolean;
  description: string;
};

export type rentHistory = {
  studentName: string;
  class: string;
  withdrawalDate: Date;
  deliveryDate: Date;
};

export type Book = {
  id: string;
  tittle: string;
  author: string;
  genre: string;
  status: bookStatus;
  image: string;
  systemEntryDate: Date;
  synopsis: string;
  rentHistory: rentHistory[];
};

export type allRentType = {
  studentName: string;
  class: string;
  tittle: string;
  withdrawalDate: Date;
  deliveryDate: Date;
};

export type UserType = {
  email: string;
  password: string;
};
