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
import BackTo from "../../components/main/BackTo";

type RentType = {
	studentName: string;
	class: string;
	tittle: string;
	withdrawalDate: Date;
	deliveryDate: Date;
};

enum columnEnum {
	STUDENTNAME = "studentName",
	CLASS = "class",
	TITLLE = "tittle",
	WITHDRAWALDATE = "withdrawalDate",
	DELIVERYDATE = "deliveryDate",
}

const AllRentHistory = () => {
	const [allRents, setAllRents] = useState<RentType[]>([]);
	const [filteredBook, setFilteredBook] = useState<RentType[]>();

	const [studentNameFilter, setStudentNameFilter] = useState("");
	const [classFilter, setClassFilter] = useState("");
	const [tittleFilter, setTittleFilter] = useState("");
	const [withdrawalDateFilter, setWithdrawalDateFilter] = useState("");
	const [deliveryDateFilter, setDeliveryDateFilter] = useState("");

	const [sorting, setSorting] = useState<"asc" | "desc">("asc");
	const [rotateStudentName, setRotateStudentName] = useState(0);
	const [rotateClass, setRotateClass] = useState(0);
	const [rotateTittle, setRotateTittle] = useState(0);
	const [rotateWithdrawalDate, setRotateWithdrawalDate] = useState(0);
	const [rotateDeliveryDate, setRotateDeliveryDate] = useState(0);

	/* async function getBookAwait(){

	} */

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
			setFilteredBook(
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

	useEffect(() => {
		if (
			!studentNameFilter &&
			!classFilter &&
			!tittleFilter &&
			!withdrawalDateFilter &&
			!deliveryDateFilter
		) {
			setFilteredBook(allRents);
		}
		const filteredRent = allRents?.filter((row) => {
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
				tittleFilter &&
				!row.class.toLowerCase().includes(tittleFilter.toLowerCase())
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
		tittleFilter,
		withdrawalDateFilter,
		deliveryDateFilter,
		allRents,
	]);

	const handleSortClick = (column: columnEnum) => {
		if (filteredBook) {
			if (column === "studentName") {
				setRotateStudentName(rotateStudentName + 180);
			} else if (column === "class") {
				setRotateClass(rotateClass + 180);
			} else if (column === "tittle") {
				setRotateTittle(rotateTittle + 180);
			} else if (column === "withdrawalDate") {
				setRotateWithdrawalDate(rotateWithdrawalDate + 180);
			} else if (column === "deliveryDate") {
				setRotateDeliveryDate(rotateDeliveryDate + 180);
			}
			const filteredBookCopy = [...filteredBook];
			if (sorting === "asc") {
				const sortRent = filteredBookCopy?.sort(function (a, b) {
					if (column === "class") {
						const aInt = parseInt(a[column].replace(/^[^\d]*/, ""));
						const bInt = parseInt(b[column].replace(/^[^\d]*/, ""));
						return aInt < bInt ? -1 : aInt > bInt ? 1 : 0;
					}
					return a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
				});
				setFilteredBook(sortRent);
				setSorting("desc");
			}
			if (sorting === "desc") {
				const sortRent = filteredBookCopy?.sort(function (a, b) {
					if (column === "class") {
						const aInt = parseInt(a[column].replace(/^[^\d]*/, ""));
						const bInt = parseInt(b[column].replace(/^[^\d]*/, ""));
						return aInt > bInt ? -1 : aInt < bInt ? 1 : 0;
					}
					return a[column] > b[column] ? -1 : a[column] < b[column] ? 1 : 0;
				});
				setFilteredBook(sortRent);
				setSorting("asc");
			}
		}
	};

	return (
		<RentContainer>
			<BackTo back="Home" current="Histórico de Empréstimos" />
			<Table sx={{ minWidth: "1270px", minHeight: "500px" }}>
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
								value={studentNameFilter}
								name="studentName"
								onChange={(e) => setStudentNameFilter(e.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("studentName")}
										>
											<FilterListIcon
												style={{
													transform: `rotate(${rotateStudentName}deg)`,
												}}
											/>
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								value={classFilter}
								name="class"
								onChange={(e) => setClassFilter(e.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("class")}
										>
											<FilterListIcon
												style={{
													transform: `rotate(${rotateClass}deg)`,
												}}
											/>
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								value={tittleFilter}
								name="tittle"
								onChange={(e) => setTittleFilter(e.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("tittle")}
										>
											<FilterListIcon
												style={{
													transform: `rotate(${rotateTittle}deg)`,
												}}
											/>
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								value={withdrawalDateFilter}
								name="withdrawalDate"
								onChange={(e) => setWithdrawalDateFilter(e.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("withdrawalDate")}
										>
											<FilterListIcon
												style={{
													transform: `rotate(${rotateWithdrawalDate}deg)`,
												}}
											/>
										</InputAdornment>
									),
								}}
							/>
						</TableCell>
						<TableCell>
							<TextField
								value={deliveryDateFilter}
								name="deliveryDate"
								onChange={(e) => setDeliveryDateFilter(e.target.value)}
								variant="standard"
								sx={{ width: "105px" }}
								InputProps={{
									startAdornment: (
										<InputAdornment
											position="start"
											sx={{ cursor: "pointer" }}
											onClick={() => handleSortClick("deliveryDate")}
										>
											<FilterListIcon
												style={{
													transform: `rotate(${rotateDeliveryDate}deg)`,
												}}
											/>
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
