import React from "react";
import { Modal, Input, Select, DatePicker } from "antd";
import moment from "moment";

export default function MovieForm(props) {
	function onSelect(directorName) {
		const director = props.directors.find(dir => dir.name === directorName);
		props.handleInputChange(director.id, "director_id");
		props.handleInputChange(directorName, "directorName");
	}

	return (
		<Modal
			title="Movie"
			visible={props.show}
			onOk={e =>
				props.handleSave(e, { type: props.type, movie: props.movie })
			}
			onCancel={props.handleCancel}
			okText="Save"
		>
			<label htmlFor="movieName">Movie Name</label>
			<Input
				id="movieName"
				placeholder="Movie Name"
				value={props.movie.movieName}
				onChange={e =>
					props.handleInputChange(e.target.value, "movieName")
				}
			/>
			<label htmlFor="directorName">Director Name</label>
			<Select
				id="directorName"
				value={props.movie.directorName}
				placeholder="Movie's director"
				style={{ width: "100%" }}
				onChange={onSelect}
			>
				{props.directors.map(director => (
					<Select.Option key={director.id} value={director.name}>
						{director.name}
					</Select.Option>
				))}
			</Select>
			<label htmlFor="releaseDate">Release Date</label>
			<DatePicker
				id="releaseDate"
				value={
					props.movie.releaseDate
						? moment(props.movie.releaseDate, "YYYY-MM-DD")
						: null
				}
				style={{ width: "100%" }}
				onChange={value =>
					props.handleInputChange(
						value.format("YYYY-MM-DD"),
						"releaseDate"
					)
				}
			/>
		</Modal>
	);
}
