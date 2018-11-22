import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import MovieList from "./components/movie/MovieList";
import DirectorList from "./components/director/DirectorList";
import "antd/dist/antd.css";

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Dashboard />
					<Route path="/" exact component={MovieList} />
					<Route path="/director" component={DirectorList} />
				</div>
			</Router>
		);
	}
}

export default App;
