import React from 'react';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
	const [term, setTerm] = useState("");

	const handleChange = (event) => {
		setTerm(event.target.value)
	};

	return (
		<form className="searchform" onSubmit={onSubmit}>
			<input id="search" type="text" name="search" value={term} placeholder="Search" onChange={handleChange} />
		</form>
	);
}

export default Searchbar; 