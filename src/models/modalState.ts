type TModal = "main" | "lent" | "isRent" | "rentHistory" | "inactive" | "isInactive";

export type MainModalProps = {
	setModal: React.Dispatch<
		React.SetStateAction<{
			main: boolean;
			lent: boolean;
			isRent: boolean;
			rentHistory: boolean;
			inactive: boolean;
			isInactive: boolean;
		}>
	>;
	bookId: string;

	controleModal?: (closeModal: TModal, openModal: TModal) => void;
};
