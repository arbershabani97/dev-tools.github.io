/* eslint-disable max-statements */
/* eslint-disable react/jsx-newline */
/* eslint-disable func-names */
import {BanCircleIcon, Button, EditIcon, ListItem, Pane, Tab, TabNavigation, Text, TextInput, TickCircleIcon, UnorderedList} from "evergreen-ui";
import React, {useEffect, useReducer} from "react";
import Dropzone from "react-dropzone";
import HeadingSecondary from "../components/Heading/HeadingSecondary";

import CodeContainer from "../containers/Code";
import ContentContainer from "../containers/Content";
import MainLayoutContainer from "../containers/MainLayout";
import SidebarContainer from "../containers/Sidebar";
import formReducer from "../reducers/form.reducer";
import {nameExtractor} from "../utils/extractNames";
import fileReader from "../utils/fileReader";
import {capitalizeInverse, replaceAll} from "../utils/string";

import "./CopyTool.scss";

const baseStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	borderWidth: 2,
	borderRadius: 2,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
};

const activeStyle = {
	borderColor: "#2196f3",
};

const initialFormState = {
	copied: false,

	default: true,
	capitalizeInverse: false,
	uppercase: false,
	currentTab: 1,

	find: "",
	replace: "",

	suggestions: [],

	code: "",
	originalCode: "",
	codePreview: "",
};

const CopyToolPage = () => {
	const [formState, dispatch] = useReducer(formReducer, initialFormState);

	const handleInputChange = e => dispatch({type: "UPDATE", field: e.target.name, payload: e.target.value});
	const handleChange = (field, payload) => dispatch({type: "UPDATE", field, payload});
	const handleToggle = field => dispatch({type: "TOGGLE", field: field || "copied"});

	const handleReplace = () => {
		const res = formState.default ? replaceAll(String(formState.code), formState.find, formState.replace) : String(formState.code);
		const res1 = formState.capitalizeInverse ? replaceAll(String(res), capitalizeInverse(formState.find), capitalizeInverse(formState.replace)) : String(res);
		const res2 = formState.uppercase ? replaceAll(String(res1), formState.find.toUpperCase(), formState.replace.toUpperCase()) : String(res1);

		handleChange("codePreview", res2);
		handleChange("code", res2);
	};

	useEffect(() => {
		if (!formState.codePreview.length || !formState.find.length) return;
		const res = formState.default ? replaceAll(String(formState.code), formState.find, `\`\`\`${formState.find}\`\`\``) : String(formState.code);
		const res1 = formState.capitalizeInverse ? replaceAll(String(res), capitalizeInverse(formState.find), `\`\`\`${capitalizeInverse(formState.find)}\`\`\``) : String(res);
		const res2 = formState.uppercase ? replaceAll(String(res1), formState.find.toUpperCase(), `\`\`\`${formState.find.toUpperCase()}\`\`\``) : String(res1);

		handleChange("codePreview", res2);
	}, [formState.code, formState.find, formState.default, formState.capitalizeInverse, formState.uppercase]);

	useEffect(() => {
		if (!formState.codePreview.length || !formState.replace.length) return;
		const res = formState.default ? replaceAll(String(formState.code), formState.find, `\`\`\`${formState.replace}\`\`\``) : String(formState.code);
		const res1 = formState.capitalizeInverse ? replaceAll(String(res), capitalizeInverse(formState.find), `\`\`\`${capitalizeInverse(formState.replace)}\`\`\``) : String(res);
		const res2 = formState.uppercase ? replaceAll(String(res1), formState.find.toUpperCase(), `\`\`\`${formState.replace.toUpperCase()}\`\`\``) : String(res1);
		handleChange("codePreview", res2);
	}, [formState.replace, formState.default, formState.capitalizeInverse, formState.uppercase]);

	const onDrop = files =>
		fileReader(files, text => {
			handleChange("code", text);
			handleChange("codePreview", text);
			handleChange("originalCode", text);
			handleChange("suggestions", nameExtractor(text));
		});

	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="CopyTool">
				<Pane>
					<TextInput name="find" onChange={handleInputChange} placeholder="Find" value={formState.find} />

					<TextInput name="replace" onChange={handleInputChange} placeholder="Replace" value={formState.replace} />

					<Button iconBefore={EditIcon} marginRight={16} onClick={handleReplace}>
						Replace
					</Button>
				</Pane>
				<Text color="dark" cursor="pointer" fontSize={10} marginRight={5} marginTop={4} size={300}>
					Suggestions:
				</Text>

				<Pane display="flex" flexWrap="wrap" marginBottom={16}>
					{formState.suggestions.map(word => (
						<Text key={word} color="#1070ca" cursor="pointer" fontSize={12} marginBottom={4} marginRight={5} marginTop={2} onClick={() => handleChange("find", word)} size={300}>
							{word}
						</Text>
					))}
				</Pane>
				<TabNavigation>
					<Tab is="a" isSelected={formState.currentTab === 1} onSelect={() => handleChange("currentTab", 1)}>
						Code Preview
					</Tab>
					<Tab is="a" isSelected={formState.currentTab === 2} onSelect={() => handleChange("currentTab", 2)}>
						Code
					</Tab>
					<Tab is="a" isSelected={formState.currentTab === 3} onSelect={() => handleChange("currentTab", 3)}>
						Original
					</Tab>
					<Tab is="a" isSelected={formState.currentTab === 4} onSelect={() => handleChange("currentTab", 4)}>
						Editor
					</Tab>
				</TabNavigation>
				<Pane alignSelf="stretch" display="flex" flexDirection="column" position="relative" width="auto">
					{formState.currentTab === 1 && <CodeContainer code={formState.codePreview} copied={false} maxHeight="55vh" />}
					{formState.currentTab === 2 && <CodeContainer code={formState.code} copied={false} maxHeight="55vh" />}
					{formState.currentTab === 3 && <CodeContainer code={formState.originalCode} copied={false} maxHeight="55vh" />}
					{/* {formState.currentTab === 4 && <CodeContainer code={originalCode} copied={false} maxHeight="70vh" />} */}
				</Pane>
				<Pane alignSelf="stretch" className="Dropzone" marginTop={16}>
					<Dropzone onDrop={onDrop}>
						{({getRootProps, getInputProps, isDragActive}) => (
							<section>
								<div {...getRootProps()} style={{...baseStyle, ...(isDragActive ? activeStyle : {})}}>
									<input {...getInputProps()} />

									<p>Drag&apos;n&apos;drop here</p>
								</div>
							</section>
						)}
					</Dropzone>
				</Pane>
			</ContentContainer>
			<SidebarContainer>
				<HeadingSecondary text="Casing Sensitivity" />
				<UnorderedList marginBottom={16} textAlign="left">
					<ListItem icon={formState.default ? TickCircleIcon : BanCircleIcon} iconColor={formState.default ? "success" : "danger"} onClick={() => handleToggle("default")}>
						{formState.find || "Default"} - {formState.replace}
					</ListItem>
					<ListItem icon={formState.capitalizeInverse ? TickCircleIcon : BanCircleIcon} iconColor={formState.capitalizeInverse ? "success" : "danger"} onClick={() => handleToggle("capitalizeInverse")}>
						{capitalizeInverse(formState.find) || "default"} - {capitalizeInverse(formState.replace)}
					</ListItem>
					<ListItem icon={formState.uppercase ? TickCircleIcon : BanCircleIcon} iconColor={formState.uppercase ? "success" : "danger"} onClick={() => handleToggle("uppercase")}>
						{formState.find.toUpperCase() || "DEFAULT"} - {formState.replace.toUpperCase()}
					</ListItem>
				</UnorderedList>
			</SidebarContainer>
		</MainLayoutContainer>
	);
};
export default CopyToolPage;
