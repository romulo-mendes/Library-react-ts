import React from "react";
import { useBooks } from "../../context/useBooks";

const SearchLibrary = () => {
	const { search, setSearch, category, setCategory } = useBooks();
	return <div>SearchLibrary</div>;
};

export default SearchLibrary;
