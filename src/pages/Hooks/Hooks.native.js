/* eslint-disable react/jsx-handler-names */
import {TagInput, TextInput} from "evergreen-ui";
import React, {useEffect, useReducer} from "react";
import MainLayoutContainer from "../../containers/MainLayout";

import ContentContainer from "../../containers/Content";
import SidebarContainer from "../../containers/Sidebar";
import {componentLiteral} from "../literals/HooksRN.literal";

import formReducer from "../../reducers/form.reducer";
import CodeContainer from "../../containers/Code";
import CheckboxPrimary from "../../components/Checkbox/CheckboxPrimary";
import HeadingSecondary from "../../components/Heading/HeadingSecondary";
import Can from "../../utils/can/Can";

const initialFormState = {
	copied: false,
	name: "Home",
	// withRouter: false,
	state: false,
	useEffect: false,
	useEffectUpdate: false,

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

const HooksPage = () => {
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

	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Hooks">
				<TextInput marginBottom={16} name="name" onChange={handleInputChange} placeholder="Component Name" value={formState.name} />

				<CodeContainer code={renderedString} copied={formState.copied} handleCopy={handleToggle} />
			</ContentContainer>

			<SidebarContainer>
				{/* <HeadingSecondary text="Imports" />

				<CheckboxPrimary checked={formState.withRouter} name="withRouter" onChange={handleToggle} /> */}

				<HeadingSecondary text="State" />

				<CheckboxPrimary checked={formState.state} name="state" onChange={handleToggle} />

				<HeadingSecondary text="Lifecycle Methods" />

				<CheckboxPrimary checked={formState.useEffect} name="useEffect" onChange={handleToggle} />

				<CheckboxPrimary checked={formState.useEffectUpdate} name="useEffectUpdate" onChange={handleToggle} />

				<Can I="see" on="react-redux">
					<HeadingSecondary text="Redux" />

					<CheckboxPrimary checked={formState.mapStateToProps} name="mapStateToProps" onChange={handleToggle} />

					{formState.mapStateToProps && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("reduxState", values)} values={formState.reduxState} width="100%" />}

					<CheckboxPrimary checked={formState.mapDispatchToProps} name="mapDispatchToProps" onChange={handleToggle} />

					{formState.mapDispatchToProps && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("reduxActions", values)} values={formState.reduxActions} width="100%" />}

					<CheckboxPrimary checked={formState.connect} name="connect" onChange={handleToggle} />
				</Can>

				<Can I="see" not on="react-hook-form">
					<HeadingSecondary text="Forms" />

					<CheckboxPrimary checked={formState["Input - Text"]} label={`Input - Text ${formState.formText.length ? `(${formState.formText.length})` : ""}`} name="Input - Text" onChange={handleToggle} />

					{formState["Input - Text"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formText", values)} values={formState.formText} width="100%" />}

					<CheckboxPrimary checked={formState["Input - Number"]} label={`Input - Number ${formState.formNumber.length ? `(${formState.formNumber.length})` : ""}`} name="Input - Number" onChange={handleToggle} />

					{formState["Input - Number"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formNumber", values)} values={formState.formNumber} width="100%" />}

					{/* 
					<CheckboxPrimary checked={formState["Input - Search"]} label={`Input - Search ${formState.formSearch.length ? `(${formState.formSearch.length})` : ""}`} name="Input - Search" onChange={handleToggle} />

					{formState["Input - Search"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formSearch", values)} values={formState.formSearch} width="100%" />}

					<CheckboxPrimary checked={formState["Input - Date"]} label={`Input - Date ${formState.formDate.length ? `(${formState.formDate.length})` : ""}`} name="Input - Date" onChange={handleToggle} />

					{formState["Input - Date"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formDate", values)} values={formState.formDate} width="100%" />} */}

					<CheckboxPrimary checked={formState.handleSubmit} name="handleSubmit" onChange={handleToggle} />

					<CheckboxPrimary checked={formState.loading} name="loading" onChange={handleToggle} />
				</Can>

				<Can I="see" on="react-hook-form">
					<HeadingSecondary text="React Hook Forms (Library)" />

					<CheckboxPrimary checked={formState["Input - Text"]} label={`Input - Text ${formState.formText.length ? `(${formState.formText.length})` : ""}`} name="Input - Text" onChange={handleToggle} />

					{formState["Input - Text"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formText", values)} values={formState.formText} width="100%" />}

					<CheckboxPrimary checked={formState["Input - Number"]} label={`Input - Number ${formState.formNumber.length ? `(${formState.formNumber.length})` : ""}`} name="Input - Number" onChange={handleToggle} />

					{formState["Input - Number"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formNumber", values)} values={formState.formNumber} width="100%" />}

					<CheckboxPrimary checked={formState["Input - Search"]} label={`Input - Search ${formState.formSearch.length ? `(${formState.formSearch.length})` : ""}`} name="Input - Search" onChange={handleToggle} />

					{formState["Input - Search"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formSearch", values)} values={formState.formSearch} width="100%" />}

					<CheckboxPrimary checked={formState["Input - Date"]} label={`Input - Date ${formState.formDate.length ? `(${formState.formDate.length})` : ""}`} name="Input - Date" onChange={handleToggle} />

					{formState["Input - Date"] && <TagInput inputProps={{placeholder: "Write name and enter..."}} marginBottom={8} onChange={values => handleChange("formDate", values)} values={formState.formDate} width="100%" />}

					<CheckboxPrimary checked={formState.handleSubmit} name="handleSubmit" onChange={handleToggle} />

					<CheckboxPrimary checked={formState.loading} name="loading" onChange={handleToggle} />
				</Can>
			</SidebarContainer>
		</MainLayoutContainer>
	);
};

export default HooksPage;
