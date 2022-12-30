import { useEffect, useState, useMemo } from "react";
import { rentHistory } from "../../models/book";
import { MainModalProps } from "../../models/modalState";
import { getBook } from "../../services/books";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import InputAdornment from "@mui/material/InputAdornment";
import Closer from "./Closer";
import { RentTableContainer } from "./RentHsitoryStyled";

enum columnEnum {
	STUDENTNAME = "studentName",
	CLASS = "class",
	WITHDRAWALDATE = "withdrawalDate",
	DELIVERYDATE = "deliveryDate",
}

const RentHistory = ({ bookId, controlModal }: MainModalProps) => {
	const [rent, setRent] = useState<rentHistory[]>();
	const [studentNameFilter, setStudentNameFilter] = useState("");
	const [classFilter, setClassFilter] = useState("");
	const [withdrawalDateFilter, setWithdrawalDateFilter] = useState("");
	const [deliveryDateFilter, setDeliveryDateFilter] = useState("");
	const [filteredBook, setFilteredBook] = useState<rentHistory[]>();

	async function getBookAwait() {
		const response = await getBook(bookId);
		setRent(response.rentHistory);
		setFilteredBook(response.rentHistory);
	}
	useEffect(() => {
		getBookAwait();
	}, []);

	useEffect(() => {
		if (
			!studentNameFilter &&
			!classFilter &&
			!withdrawalDateFilter &&
			!deliveryDateFilter
		) {
			setFilteredBook(rent);
		}
		const filteredRent = rent?.filter((row) => {
			if (
				studentNameFilter &&
				!row.studentName.toLowerCase().includes(studentNameFilter.toLowerCase())
			)
				return false;

			if (
				classFilter &&
				!row.class.toLowerCase().includes(classFilter.toLowerCase())
			)
				return false;

			if (
				withdrawalDateFilter &&
				!new Date(row.withdrawalDate)
					.toLocaleDateString("pt-br")
					.toLowerCase()
					.includes(withdrawalDateFilter.toLowerCase())
			)
				return false;

			if (
				deliveryDateFilter &&
				!new Date(row.deliveryDate)
					.toLocaleDateString("pt-br")
					.toLowerCase()
					.includes(deliveryDateFilter.toLowerCase())
			)
				return false;

			return true;
		});
		setFilteredBook(filteredRent);
	}, [
		studentNameFilter,
		classFilter,
		withdrawalDateFilter,
		deliveryDateFilter,
		rent,
	]);

	const handleSortClick = (column: columnEnum) => {
		if (filteredBook) {
			const filteredBookCopy = [...filteredBook];
			const sortRent = filteredBookCopy?.sort(function (a, b) {
				return a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
			});
			setFilteredBook(sortRent);
		}
	};

	return (
		<RentTableContainer>
			<Closer onClick={() => controlModal("rentHistory", "main")} />
			<Typography variant="h6" sx={{ mb: "29px" }}>
				Histórico de empréstimos do livro
			</Typography>
			<Table sx={{ minWidth: 978 }}>
				<TableHead>
					<TableRow>
						<TableCell>Nome do Aluno</TableCell>
						<TableCell>Turma</TableCell>
						<TableCell>Data de Retirada</TableCell>
						<TableCell>Data de Entrega</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<TextField
								value={studentNameFilter}
								name="studentName"
								onChange={(event) => setStudentNameFilter(event.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("studentName")}
										>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								value={classFilter}
								name="class"
								onChange={(event) => setClassFilter(event.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("class")}
										>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								value={withdrawalDateFilter}
								name="withdrawalDate"
								onChange={(event) => setWithdrawalDateFilter(event.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("withdrawalDate")}
										>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								value={deliveryDateFilter}
								name="deliveryDate"
								onChange={(event) => setDeliveryDateFilter(event.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("deliveryDate")}
										>
											<FilterListIcon />
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredBook &&
						filteredBook.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.studentName}</TableCell>
								<TableCell>{row.class}</TableCell>
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
		</RentTableContainer>
	);
};

export default RentHistory;
