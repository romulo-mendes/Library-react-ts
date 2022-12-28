import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
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
} from "@mui/material";

const RentHistory = ({ bookId, controlModal }: MainModalProps) => {
	const [rent, setRent] = useState<rentHistory[]>();
	const [studentNameFilter, setStudentNameFilter] = useState("");
	const [classFilter, setClassFilter] = useState("");
	const [withdrawalDateFilter, setWithdrawalDateFilter] = useState("");
	const [deliveryDateFilter, setDeliveryDateFilter] = useState("");

	async function getBookAwait() {
		const response = await getBook(bookId);
		setRent(response.rentHistory);
	}
	useEffect(() => {
		getBookAwait();
	}, []);

	const filteredRent = useMemo(() => {
		if (!rent) return rent;
		if (
			!studentNameFilter &&
			!classFilter &&
			!withdrawalDateFilter &&
			!deliveryDateFilter
		) {
			return rent;
		}
		return rent.filter((row) => {
			if (
				studentNameFilter &&
				!row.studentName.toLowerCase().includes(studentNameFilter.toLowerCase())
			) {
				return false;
			}
			if (
				classFilter &&
				!row.class.toLowerCase().includes(classFilter.toLowerCase())
			) {
				return false;
			}
			if (
				withdrawalDateFilter &&
				!new Date(row.withdrawalDate)
					.toLocaleDateString("pt-br")
					.toLowerCase()
					.includes(withdrawalDateFilter.toLowerCase())
			) {
				return false;
			}
			if (
				deliveryDateFilter &&
				!new Date(row.deliveryDate)
					.toLocaleDateString("pt-br")
					.toLowerCase()
					.includes(deliveryDateFilter.toLowerCase())
			) {
				return false;
			}
			return true;
		});
	}, [
		studentNameFilter,
		classFilter,
		withdrawalDateFilter,
		deliveryDateFilter,
		rent,
	]);

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>
						Nome do Aluno
						<TextField
							value={studentNameFilter}
							name="studentName"
							onChange={(event) => setStudentNameFilter(event.target.value)}
							variant="standard"
						/>
					</TableCell>
					<TableCell>
						Turma
						<TextField
							value={classFilter}
							name="class"
							onChange={(event) => setClassFilter(event.target.value)}
							variant="standard"
						/>
					</TableCell>
					<TableCell>
						Data de Retirada
						<TextField
							value={withdrawalDateFilter}
							name="withdrawalDate"
							onChange={(event) => setWithdrawalDateFilter(event.target.value)}
							variant="standard"
						/>
					</TableCell>
					<TableCell>
						Data de Entrega
						<TextField
							value={deliveryDateFilter}
							name="deliveryDate"
							onChange={(event) => setDeliveryDateFilter(event.target.value)}
							variant="standard"
						/>
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{filteredRent &&
					filteredRent.map((row, index) => (
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
	);
};

export default RentHistory;
