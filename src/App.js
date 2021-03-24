import "./App.css";
import React from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";

import {connect} from "react-redux";
import history from "./history";
import HomePage from "./pages/Home";
import CopyToolPage from "./pages/CopyTool";
import ExtractToolPage from "./pages/ExtractTool";
import BoilerplatePage from "./pages/Boilerplate";
import ComponentsPage from "./pages/Components/index";
import HooksPage from "./pages/Hooks";
import SettingsPage from "./pages/Settings";
import AdvancedConceptsPage from "./pages/AdvancedConcepts";

function App({_persist}) {
	if (!_persist.rehydrated) return null;
	return (
		<div className="App">
			<BrowserRouter history={history}>
				<Route component={HomePage} exact path="/" />

				<Route exact path="/home" render={() => <Redirect to="/" />} />

				<Route component={AdvancedConceptsPage} exact path="/advanced-concepts" />

				<Route component={CopyToolPage} exact path="/copy-tool" />

				<Route component={ExtractToolPage} exact path="/extract-tool" />

				<Route component={BoilerplatePage} exact path="/boilerplate" />

				<Route component={ComponentsPage} exact path="/components" />

				<Route component={HooksPage} exact path="/hooks" />

				<Route component={SettingsPage} exact path="/settings" />
			</BrowserRouter>
		</div>
	);
}
const mapStateToProps = ({_persist}) => ({_persist});
export default connect(mapStateToProps)(App);
