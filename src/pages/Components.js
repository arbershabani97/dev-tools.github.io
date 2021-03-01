/* eslint-disable react/jsx-handler-names */
import {TagInput, TextInput} from "evergreen-ui";
import React, {useEffect, useReducer} from "react";
import MainLayoutContainer from "../containers/MainLayout";

import ContentContainer from "../containers/Content";
import SidebarContainer from "../containers/Sidebar";
import {componentLiteral} from "./literals/Components.literal";

import formReducer from "../reducers/form.reducer";
import CodeContainer from "../containers/Code";
import CheckboxPrimary from "../components/Checkbox/CheckboxPrimary";
import HeadingSecondary from "../components/Heading/HeadingSecondary";
import Can from "../utils/can/Can";

const initialFormState = {
	copied: false,
	name: "Home",
	withRouter: false,
	state: false,
	componentDidMount: false,
	componentDidUpdate: false,
	mapStateToProps: false,
	reduxState: [],
	mapDispatchToProps: false,
	reduxActions: [],
	connect: false,

	formText: [],
	"Input - Text": false,
	formNumber: [],
	"Input - Number": false,
	formSearch: [],
	"Input - Search": false,
	formDate: [],
	"Input - Date": false,
	handleSubmit: false,
	loading: false,
};

const ComponentsPage = () => {
	const [formState, dispatch] = useReducer(formReducer, initialFormState);

	const handleInputChange = e => dispatch({type: "UPDATE", field: e.target.name, payload: e.target.value});
	const handleToggle = e => dispatch({type: "TOGGLE", field: e?.target?.name || "copied"});

	const handleChange = (field, payload) => dispatch({type: "UPDATE", field, payload});

	useEffect(() => {
		let copyTimeout;
		if (formState.copied) copyTimeout = setTimeout(handleToggle, 2000);
		return () => clearTimeout(copyTimeout);
	}, [formState.copied]);

	const renderedString = componentLiteral(formState);
	console.log(renderedString);
	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Components">
				<TextInput marginBottom={16} name="name" onChange={handleInputChange} placeholder="Component Name" value={formState.name} />

				<CodeContainer code={renderedString} copied={formState.copied} handleCopy={handleToggle} />
			</ContentContainer>

			<SidebarContainer>
				<Can I="see" on="react-router-dom">
					<HeadingSecondary text="Imports" />

					<CheckboxPrimary checked={formState.withRouter} name="withRouter" onChange={handleToggle} />
				</Can>

				<HeadingSecondary text="State" />

				<CheckboxPrimary checked={formState.state} name="state" onChange={handleToggle} />

				<HeadingSecondary text="Lifecycle Methods" />

				<CheckboxPrimary checked={formState.componentDidMount} name="componentDidMount" onChange={handleToggle} />

				<CheckboxPrimary checked={formState.componentDidUpdate} name="componentDidUpdate" onChange={handleToggle} />

				<Can I="see" on="react-redux">
					<HeadingSecondary text="Redux" />

					<CheckboxPrimary checked={formState.mapStateToProps} name="mapStateToProps" onChange={handleToggle} />

					{formState.mapStateToProps && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("reduxState", values)} values={formState.reduxState} width="100%" />}

					<CheckboxPrimary checked={formState.mapDispatchToProps} name="mapDispatchToProps" onChange={handleToggle} />

					{formState.mapDispatchToProps && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("reduxActions", values)} values={formState.reduxActions} width="100%" />}

					<CheckboxPrimary checked={formState.connect} name="connect" onChange={handleToggle} />
				</Can>

				<HeadingSecondary text="Forms" />

				<CheckboxPrimary checked={formState["Input - Text"]} name="Input - Text" onChange={handleToggle} />

				{formState["Input - Text"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formText", values)} values={formState.formText} width="100%" />}

				<CheckboxPrimary checked={formState["Input - Number"]} name="Input - Number" onChange={handleToggle} />

				{formState["Input - Number"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formNumber", values)} values={formState.formNumber} width="100%" />}

				<CheckboxPrimary checked={formState["Input - Search"]} name="Input - Search" onChange={handleToggle} />

				{formState["Input - Search"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formSearch", values)} values={formState.formSearch} width="100%" />}

				<CheckboxPrimary checked={formState["Input - Date"]} name="Input - Date" onChange={handleToggle} />

				{formState["Input - Date"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formDate", values)} values={formState.formDate} width="100%" />}

				<CheckboxPrimary checked={formState.handleSubmit} name="handleSubmit" onChange={handleToggle} />

				<CheckboxPrimary checked={formState.loading} name="loading" onChange={handleToggle} />
			</SidebarContainer>
		</MainLayoutContainer>
	);
};

export default ComponentsPage;
