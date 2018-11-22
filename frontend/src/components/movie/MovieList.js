import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Divider, Button, message } from "antd";
import MovieForm from "./MovieForm";

export default function MovieList(props) {
	const [movies, setMovies] = useState([]);
	const [directors, setDirectors] = useState([]);
	const [showFormModal, setShowFormModal] = useState(false);
	const [editingMovie, setEditingMovie] = useState({});
	const [formType, setFormType] = useState("");

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			sorter: (a, b) => a.id - b.id
		},
		{
			title: "Movie Name",
			dataIndex: "movieName",
			key: "movieName"
		},
		{
			title: "Director Name",
			dataIndex: "directorName",
			key: "directorName"
		},
		{
			title: "Release year",
			dataIndex: "releaseYear",
			key: "releaseYear",
			sorter: (a, b) => a.releaseYear - b.releaseYear
		},
		{
			title: "Action",
			key: "action",
			render: (text, movie) => (
				<div>
					<Button
						type="primary"
						onClick={e =>
							handleDisplayForm(e, { type: "update", movie })
						}
					>
						Edit
					</Button>
					<Divider type="vertical" />
					<Button
						type="danger"
						onClick={e => handleDeleteClick(e, { movie })}
					>
						Delete
					</Button>
				</div>
			)
		}
	];

	useEffect(() => {
		(async function() {
			try {
				let response;
				response = await axios.get("http://localhost:3000/movies");
				setMovies(response.data);

				response = await axios.get("http://localhost:3000/directors");
				setDirectors(response.data);
			} catch (error) {
				message.error(error.message);
			}
		})();
	}, []);

	async function handleDisplayForm(e, { type, movie = {} }) {
		e.preventDefault();
		setEditingMovie(movie);
		setFormType(type);
		setShowFormModal(true);
	}

	async function handleDeleteClick(e, { movie }) {
		e.preventDefault();
		if (window.confirm(`Are you sure?`)) {
			try {
				await axios.delete(`http://localhost:3000/movies/${movie.id}`);
				const updatedMovies = movies.filter(mov => mov.id !== movie.id);
				setMovies(updatedMovies);
				message.success(`Movie ${movie.movieName} deleted`);
			} catch (error) {
				message.error(error.message);
			}
		}
	}

	async function handleSaveForm(e, { type, movie }) {
		e.preventDefault();
		try {
			if (type === "create") {
				await axios.post(`http://localhost:3000/movies`, {
					movie
				});
			} else if (type === "update") {
				await axios.put(`http://localhost:3000/movies`, {
					movie
				});
			} else {
				throw { message: "Save type not provided" };
			}
			const updatedMovies = movies.concat(movie);
			setMovies(updatedMovies);
			closeFormModal();
			message.success(`Movie ${type} successful`);
		} catch (error) {
			message.error(error.message);
		}
	}

	function closeFormModal() {
		setShowFormModal(false);
		setEditingMovie({});
	}

	function handleFormInputChange(value, type) {
		let updatedMovie = editingMovie;
		updatedMovie[type] = value;
		setEditingMovie(updatedMovie);
	}

	return (
		<div>
			<Button
				block
				type="primary"
				style={{ margin: "10px 0" }}
				onClick={e => handleDisplayForm(e, { type: "create" })}
			>
				New Movie
			</Button>
			<Table
				bordered
				columns={columns}
				dataSource={movies.map(mov => {
					mov.key = mov.id;
					return mov;
				})}
			/>
			<MovieForm
				type={formType}
				movie={editingMovie}
				directors={directors}
				setEditingMovie={setEditingMovie}
				show={showFormModal}
				handleSave={handleSaveForm}
				handleCancel={closeFormModal}
				handleInputChange={handleFormInputChange}
			/>
		</div>
	);
}
