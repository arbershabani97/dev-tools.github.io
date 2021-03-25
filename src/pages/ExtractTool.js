import {Button, EditIcon, Pane, Tab, TabNavigation, TextInput} from "evergreen-ui";
import React, {useEffect, useReducer} from "react";
import Dropzone from "react-dropzone";
import CodeContainer from "../containers/Code";
import ContentContainer from "../containers/Content";
import MainLayoutContainer from "../containers/MainLayout";
import formReducer from "../reducers/form.reducer";
import {insertIntoArray} from "../utils/array";
import {nameExtractor} from "../utils/extractNames";
import fileReader from "../utils/fileReader";

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

	currentTab: 1,

	from: "",
	to: "",

	suggestions: [],

	code: "",
	originalCode: "",
	codePreview: "",
};

const ExtractToolPage = () => {
	const [formState, dispatch] = useReducer(formReducer, initialFormState);

	const handleInputChange = e => dispatch({type: "UPDATE", field: e.target.name, payload: e.target.value});
	const handleChange = (field, payload) => dispatch({type: "UPDATE", field, payload});

	useEffect(() => {
		if (!formState.codePreview.length) return;

		const resFrom = formState.from ? insertIntoArray(formState.code.split("\n"), Number(formState.from) - 1, "------------").join("\n") : formState.code;
		const resTo = formState.to ? insertIntoArray(resFrom.split("\n"), Number(formState.to), "------------").join("\n") : resFrom;
		if (resTo) handleChange("codePreview", resTo);
	}, [formState.code, formState.from]);

	useEffect(() => {
		if (!formState.codePreview.length) return;

		const resFrom = formState.from ? insertIntoArray(formState.code.split("\n"), Number(formState.from) - 1, "------------").join("\n") : formState.code;
		const resTo = formState.to ? insertIntoArray(resFrom.split("\n"), Number(formState.to), "------------").join("\n") : resFrom;
		if (resTo) handleChange("codePreview", resTo);
	}, [formState.to]);

	const onDrop = files =>
		fileReader(files, text => {
			handleChange("code", text);
			handleChange("codePreview", text);
			handleChange("originalCode", text);
			handleChange("suggestions", nameExtractor(text));
		});
	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Extract Tool">
				<Pane>
					<TextInput name="from" onChange={handleInputChange} placeholder="From:" type="number" value={formState.from} />

					<TextInput name="to" onChange={handleInputChange} placeholder="To: " type="number" value={formState.to} />

					<Button iconBefore={EditIcon} marginRight={16} onClick={() => {}}>
						Extract
					</Button>
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
		</MainLayoutContainer>
	);
};
export default ExtractToolPage;
