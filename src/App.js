import "./App.css";
import React from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";

import history from "./history";
import HomePage from "./pages/Home";
import CopyToolPage from "./pages/CopyTool";
import ExtractToolPage from "./pages/ExtractTool";
import BoilerplatePage from "./pages/Boilerplate";
import ComponentsPage from "./pages/Components";
import HooksPage from "./pages/Hooks";

function App() {
	return (
		<div className="App">
			<BrowserRouter history={history}>
				<Route component={HomePage} exact path="/" />

				<Route exact path="/home" render={() => <Redirect to="/" />} />

				<Route component={CopyToolPage} exact path="/copy-tool" />

				<Route component={ExtractToolPage} exact path="/extract-tool" />

				<Route component={BoilerplatePage} exact path="/boilerplate" />

				<Route component={ComponentsPage} exact path="/components" />

				<Route component={HooksPage} exact path="/hooks" />
			</BrowserRouter>
		</div>
	);
}

export default App;
