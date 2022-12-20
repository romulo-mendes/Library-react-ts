type Status = {
	isActive: boolean;
	description: string;
};

type RentHistory = {
	studentName: string;
	class: string;
	withdrawalDate: string;
	deliveryDate: string;
};

export type Book = {
	id: string;
	tittle: string;
	author: string;
	genre: string;
	status: Status;
	image: string;
	systemEntryDate: string;
	synopsis: string;
	rentHistory?: RentHistory[];
};
