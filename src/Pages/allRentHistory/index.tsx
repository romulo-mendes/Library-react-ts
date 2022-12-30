import {
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllBooks } from "../../services/books";
import FilterListIcon from "@mui/icons-material/FilterList";
import { RentContainer } from "./styles";
import Closer from "../../components/modal/Closer";
import BackTo from "../../components/main/BackTo";

type RentType = {
	studentName: string;
	class: string;
	tittle: string;
	withdrawalDate: Date;
	deliveryDate: Date;
};

const AllRentHistory = () => {
	const [allRents, setAllRents] = useState<RentType[]>([]);

	useEffect(() => {
		getAllBooks().then((books) => {
			setAllRents(
				books.flatMap((book) =>
					book.rentHistory.map((history) => ({
						studentName: history.studentName,
						class: history.class,
						tittle: book.tittle,
						withdrawalDate: history.withdrawalDate,
						deliveryDate: history.deliveryDate,
					}))
				)
			);
		});
	}, []);

	return (
		<RentContainer>
			<BackTo back="Home" current="Histórico de Empréstimos" />
			<Table sx={{ width: "100%" }}>
				<TableHead>
					<TableRow>
						<TableCell>Aluno</TableCell>
						<TableCell>Turma</TableCell>
						<TableCell>Livro</TableCell>
						<TableCell>Data de Retirada</TableCell>
						<TableCell>Data de Entrega</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<TextField
								name="studentName"
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start" sx={{ cursor: "pointer" }}>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								name="class"
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start" sx={{ cursor: "pointer" }}>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								name="tittle"
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start" sx={{ cursor: "pointer" }}>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								name="withdrawalDate"
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start" sx={{ cursor: "pointer" }}>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								name="deliveryDate"
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start" sx={{ cursor: "pointer" }}>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{allRents &&
						allRents.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.studentName}</TableCell>
								<TableCell>{row.class}</TableCell>
								<TableCell>{row.tittle}</TableCell>
								<TableCell>
									{new Date(row.withdrawalDate).toLocaleDateString("pt-BR")}
								</TableCell>
								<TableCell>
									{new Date(row.deliveryDate).toLocaleDateString("pt-BR")}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</RentContainer>
	);
};

export default AllRentHistory;
