import {TextInput} from "evergreen-ui";
import React, {useEffect, useReducer} from "react";
import MainLayoutContainer from "../containers/MainLayout";

import ContentContainer from "../containers/Content";
import SidebarContainer from "../containers/Sidebar";
import {componentLiteral} from "./literals/Hooks.literal";

import formReducer from "../reducers/form.reducer";
import CodeContainer from "../containers/Code";
import CheckboxPrimary from "../components/Checkbox/CheckboxPrimary";
import HeadingSecondary from "../components/Heading/HeadingSecondary";

const initialFormState = {
	copied: false,
	name: "Home",
	withRouter: false,
	state: false,
	useEffect: false,
	useEffectUpdate: false,
	mapStateToProps: false,
	mapDispatchToProps: false,
	connect: false,
};

const HooksPage = () => {
	const [formState, dispatch] = useReducer(formReducer, initialFormState);

	const handleChange = e => dispatch({type: "UPDATE", field: e.target.name, payload: e.target.value});
	const handleToggle = e => dispatch({type: "TOGGLE", field: e?.target?.name || "copied"});

	useEffect(() => {
		let copyTimeout;
		if (formState.copied) copyTimeout = setTimeout(handleToggle, 2000);
		return () => clearTimeout(copyTimeout);
	}, [formState.copied]);

	const renderedString = componentLiteral(formState);

	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Hooks">
				<TextInput marginBottom={16} name="name" onChange={handleChange} placeholder="Component Name" value={formState.name} />

				<CodeContainer code={renderedString} copied={formState.copied} handleCopy={handleToggle} />
			</ContentContainer>

			<SidebarContainer>
				<HeadingSecondary text="Imports" />

				<CheckboxPrimary checked={formState.withRouter} name="withRouter" onChange={handleToggle} />

				<HeadingSecondary text="State" />

				<CheckboxPrimary checked={formState.state} name="state" onChange={handleToggle} />

				<HeadingSecondary text="Lifecycle Methods" />

				<CheckboxPrimary checked={formState.useEffect} name="useEffect" onChange={handleToggle} />

				<CheckboxPrimary checked={formState.useEffectUpdate} name="useEffectUpdate" onChange={handleToggle} />

				<HeadingSecondary text="Redux" />

				<CheckboxPrimary checked={formState.mapStateToProps} name="mapStateToProps" onChange={handleToggle} />

				<CheckboxPrimary checked={formState.mapDispatchToProps} name="mapDispatchToProps" onChange={handleToggle} />

				<CheckboxPrimary checked={formState.connect} name="connect" onChange={handleToggle} />
			</SidebarContainer>
		</MainLayoutContainer>
	);
};

export default HooksPage;
