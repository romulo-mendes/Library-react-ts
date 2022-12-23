import { Typography, TextField } from "@mui/material";
import { MainModalProps } from "../../models/modalState";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import { useState } from "react";

const LentBook = ({ setModal, bookId }: MainModalProps) => {
	const [value, setValue] = useState<Date | null>(
		moment("14/12/2022", "DD-MM-YYYY").toDate()
	);

	const handleChange = (newValue: Date | null) => {
		console.log(newValue);
		setValue(newValue);
	};

	return (
		<div>
			<Typography align="center" variant="h6" sx={{ mb: "24px" }}>
				Informe os dados do aluno antes de continuar
			</Typography>
			<form>
				<TextField label="Nome do Aluno" id="studentName" type="text" fullWidth />
				<TextField label="Turma" id="studentClass" type="text" fullWidth />

				<TextField
					label="Data de Retirada"
					id="withdrawalDate"
					type="date"
					InputLabelProps={{ shrink: true }}
					fullWidth
				/>

				<DesktopDatePicker
					label="Date desktop"
					inputFormat="dd/MM/yyyy"
					value={value}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>

				<TextField
					label="Data de Entrada"
					id="deliveryDate"
					type="date"
					onChange={() => {
						("");
					}}
					InputLabelProps={{ shrink: true }}
					fullWidth
				/>
			</form>
		</div>
	);
};

export default LentBook;
