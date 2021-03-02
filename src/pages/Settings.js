/* eslint-disable react/jsx-newline */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable max-statements */
import {Button, Checkbox, CrossIcon, Dialog, Pane, Radio, RadioGroup, Tab, TabNavigation, Text, TextInput} from "evergreen-ui";
import React, {useEffect, useReducer, useRef, useState} from "react";
import {connect} from "react-redux";
import FileSaver from "file-saver";
import moment from "moment";
import ContentContainer from "../containers/Content";
import MainLayoutContainer from "../containers/MainLayout";
import formReducer from "../reducers/form.reducer";
import SidebarContainer from "../containers/Sidebar";
import HeadingSecondary from "../components/Heading/HeadingSecondary";
import CheckboxPrimary from "../components/Checkbox/CheckboxPrimary";

import {addProject, editProject, setProjects, removeProject} from "../store/components/projects/projects.actions";
import {setPages} from "../store/components/pages/pages.actions";
import reactLibraries from "../static/reactLibraries";
import reactNativeLibraries from "../static/reactNativeLibraries";
import newProject from "../static/projects";
import Config from "../utils/config";
import "./Settings.scss";

const SettingsPage = ({projects, setPages, addProject, editProject, removeProject, pages, setProjects}) => {
	const fileInput = useRef(null);
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
	const [confirmImportDialog, setConfirmImportDialog] = useState(false);
	const [importedProjects, setImportedProjects] = useState("");
	const [formState, dispatch] = useReducer(formReducer, projects.list[projects.activeProject]);
	const [form2State, dispatch2] = useReducer(formReducer, pages);

	const handleChange = (field, payload) => dispatch({type: "UPDATE", field, payload});
	const handleInputChange = e => dispatch({type: "UPDATE", field: e.target.name, payload: e.target.value});
	const handleToggle2 = e => dispatch2({type: "TOGGLE", field: e?.target?.name});

	const changeTab = project => {
		dispatch({
			type: "UPDATE_ALL",
			payload: {
				...formState,
				...project,
			},
		});
	};
	const createProject = () => (projects.order.length < Config.MAX_PROJECTS ? addProject() : null);
	const showDeleteDialog = (e, projectId) => {
		e.preventDefault();
		e.stopPropagation();
		setConfirmDeleteDialog({id: projectId});
	};

	useEffect(() => {
		if (!projects.order.includes(formState.id)) changeTab(projects.list[projects.activeProject]);
	}, [projects.order]);

	const handleReset = () =>
		dispatch({
			type: "UPDATE_ALL",
			payload: {
				...newProject(),
				id: formState.id,
			},
		});

	const handleSave = () => editProject(formState);
	const handleSavePages = () => setPages(form2State);

	const exportConfig = () => {
		const file = new Blob([JSON.stringify(projects)], {type: "application/json"});
		FileSaver.saveAs(file, `dev-tools ${moment().format("DD-MMM")}.json`);
	};
	const importConfig = e => {
		const f = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (function(theFile) {
			return function(_e) {
				setConfirmImportDialog(true);
				setImportedProjects(JSON.parse(_e.target.result));
				e.target.value = null;
			};
		})(f);
		// Read in the image file as a data URL.
		reader.readAsText(f);
	};
	const handleFileChange = () => fileInput.current.click();
	const replaceConfig = () => {
		setProjects(importedProjects);
		setConfirmImportDialog(false);
	};

	useEffect(() => {
		if (formState.language === "react") {
			if (formState.libraries.hasOwnProperty("react-navigation")) {
				handleChange("libraries", reactLibraries);
			}
		} else if (formState.language === "react-native") {
			if (formState.libraries.hasOwnProperty("react-router-dom")) {
				handleChange("libraries", reactNativeLibraries);
			}
		}
	}, [formState.language]);

	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Settings">
				<Pane position="absolute" right={20} top={20}>
					<Text color="#1070ca" cursor="pointer" fontSize={12} marginRight={8} onClick={handleFileChange} padding={4} size={300}>
						Import
					</Text>

					<Dialog confirmLabel="Replace" isShown={confirmImportDialog} onCloseComplete={() => setConfirmImportDialog(false)} onConfirm={replaceConfig} title="Import Config">
						<Text cursor="pointer" fontSize={12} lineHeight={2.5} size={300}>
							Are you sure you want to import this config?
							<br />
							The old configuration will be replaced!
						</Text>
					</Dialog>

					<input ref={fileInput} hidden onChange={e => importConfig(e)} type="file" />

					<Text color="#1070ca" cursor="pointer" fontSize={12} onClick={exportConfig} padding={4} size={300}>
						Export
					</Text>
				</Pane>

				<TabNavigation>
					{projects.order.map(projectId => (
						<Tab key={projectId} className="Tab" height={28} is="a" isSelected={formState.id === projects.list[projectId].id} onSelect={() => changeTab(projects.list[projectId])}>
							{projects.list[projectId].name || `(empty)`}
							{projects.order.length > 1 && <CrossIcon color="disabled" cursor="pointer" marginLeft={4} onClick={e => showDeleteDialog(e, projectId)} size={12} />}
						</Tab>
					))}
					<Dialog
						confirmLabel="Delete"
						intent="danger"
						isShown={confirmDeleteDialog}
						onCloseComplete={() => setConfirmDeleteDialog(false)}
						onConfirm={() => {
							removeProject(confirmDeleteDialog.id);
							setConfirmDeleteDialog(false);
						}}
						title={`Delete ${projects.list?.[confirmDeleteDialog?.id]?.name || "(empty)"}`}
					>
						<Text cursor="pointer" fontSize={12} lineHeight={2.5} size={300}>
							Are you sure you want to delete this project?
						</Text>
					</Dialog>

					{projects.order.length < Config.MAX_PROJECTS && (
						<Tab is="a" onSelect={createProject}>
							+ New
						</Tab>
					)}
				</TabNavigation>

				<Pane background="blueTint" border="muted" display="flex" flexDirection="column" flexGrow={1} padding={20} width="100%">
					<Pane marginLeft="auto" marginRight="auto" minWidth={300} width="40%">
						<Pane marginBottom={16} role="group">
							<RadioGroup label="Name" marginBottom={8} textAlign="left" value />

							<TextInput marginBottom={16} name="name" onChange={handleInputChange} placeholder="Project Name" value={formState.name} />
						</Pane>

						<Pane marginBottom={16} role="group">
							<RadioGroup label="Select Language" textAlign="left" value />

							<Pane display="flex">
								<Radio checked={formState.language === "react"} label="React" marginRight={15} name="group" onClick={() => handleChange("language", "react")} />

								<Radio checked={formState.language === "react-native"} label="React Native" marginRight={15} name="group" onClick={() => handleChange("language", "react-native")} />
							</Pane>
						</Pane>

						<Pane marginBottom={16} role="group">
							<RadioGroup label="Libraries" textAlign="left" value />

							{Object.entries(formState.libraries).map(([key, val]) => (
								<Checkbox key={Math.random()} checked={val} label={key} margin={8} onClick={() => handleChange("libraries", {...formState.libraries, [key]: !val})} />
							))}
						</Pane>

						<Pane marginBottom={32} role="group">
							<RadioGroup label="State Management" textAlign="left" value />

							{Object.entries(formState.stateManagement).map(([key, val]) => (
								<Checkbox key={Math.random()} checked={val} label={key} margin={8} onClick={() => handleChange("stateManagement", {...formState.stateManagement, [key]: !val})} />
							))}
						</Pane>

						<Pane>
							<Button appearance="primary" marginRight={16} onClick={handleSave}>
								Save
							</Button>

							<Button onClick={handleReset}>Reset to Defaults</Button>
						</Pane>
					</Pane>
				</Pane>
			</ContentContainer>

			<SidebarContainer>
				<HeadingSecondary text="Pages" />

				{Object.entries(form2State).map(([name, value]) => (
					<CheckboxPrimary key={name} checked={value} name={name} onChange={handleToggle2} />
				))}

				<Pane marginTop={16}>
					<Button appearance="primary" marginRight={16} onClick={handleSavePages}>
						Save
					</Button>
				</Pane>
			</SidebarContainer>
		</MainLayoutContainer>
	);
};

const mapStateToProps = ({projects, pages}) => ({projects, pages});
const mapDispatchToProps = {addProject, editProject, setPages, setProjects, removeProject};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
