import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, message } from "antd";

export default function DirectorList(props) {
	const [directors, setDirectors] = useState([]);

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Director Name",
			dataIndex: "name",
			key: "name"
		}
	];

	useEffect(() => {
		(async function() {
			try {
				const response = await axios.get(
					"http://localhost:3000/directors"
				);
				setDirectors(response.data);
			} catch (error) {
				message.error(error.message);
			}
		})();
	}, []);

	return (
		<div>
			<Table bordered columns={columns} dataSource={directors} />
		</div>
	);
}
