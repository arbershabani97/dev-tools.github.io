import {capitalize} from "../../utils/string";

/* eslint-disable complexity, max-params */
export const renderFormDestructuring = (formText, formNumber, formSearch, formDate, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	const res = [...formText, ...formNumber, ...formSearch, ...formDate, ...(loading ? ["loading"] : [])].join(", ");
	return `
        const {${res}} = this.state;`;
};

export const renderFormStateFunctions = (formText, formNumber, formSearch, formDate) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	return [...formText, ...formNumber, ...formSearch, ...formDate]
		.map(
			name => `
    set${capitalize(name)} = ${name} => this.setState({${name}})
	`,
		)
		.join("");
};
export const renderFormFunctions = (formText, formNumber, formSearch, formDate, reduxActions, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	return `    
    handleSubmit = async (e) => {
        e.preventDefault();${renderFormDestructuring(formText, formNumber, formSearch, formDate, loading)}
        ${
			loading
				? `
        if (loading) return;
        this.setState({ loading: true });`
				: ""
		}
        try{
            // api call here --- const {data} = await ${reduxActions?.[0] || "fn"}({${[...formText, ...formNumber, ...formSearch, ...formDate].join(", ")}});
        } catch (e){
            console.error(e);
        }${
			loading
				? ` finally {
            this.setState({ loading: false });
        }`
				: ""
		}
    }
    `;
};
export const renderHookFormFunctions = (formText, formNumber, formSearch, formDate, reduxActions, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	return `
    const handleSubmit = async (e) => {
        e.preventDefault();
        ${
			loading
				? `
        if (loading) return;
        setLoading(true);
        `
				: ""
		}
        try{
            // api call here --- const {data} = await ${reduxActions?.[0] || "fn"}({${[...formText, ...formNumber, ...formSearch, ...formDate].join(", ")}});
        } catch (e){
            console.error(e);
        }${
			loading
				? ` finally {
            setLoading(false);
        }`
				: ""
		}
    }
    `;
};

export const renderStateFromForm = (formText, formNumber, formSearch, formDate, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	const renderFormTexts = formText.map(
		name => `
        ${name}: ""`,
	);
	const renderFormNumbers = formNumber.map(
		name => `
        ${name}: 0`,
	);
	const renderFormSearches = formSearch.map(
		name => `
        ${name}: ""`,
	);
	const renderFormDates = formDate.map(
		name => `
        ${name}: new Date()`,
	);
	return `${[...renderFormTexts, ...renderFormNumbers, ...renderFormSearches, ...renderFormDates]}${
		loading
			? `,
        loading: false`
			: ""
	}`;
};
export const renderHookStateFromForm = (formText, formNumber, formSearch, formDate, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	const renderFormTexts = formText.map(
		name => `
    const [${name}, set${capitalize(name)}] = useState("");`,
	);
	const renderFormNumbers = formNumber.map(
		name => `
    const [${name}, set${capitalize(name)}] = useState(0);`,
	);
	const renderFormSearches = formSearch.map(
		name => `
    const [${name}, set${capitalize(name)}] = useState("");`,
	);
	const renderFormDates = formDate.map(
		name => `
    const [${name}, set${capitalize(name)}] = useState(new Date());`,
	);
	return `${[...renderFormTexts, ...renderFormNumbers, ...renderFormSearches, ...renderFormDates].join("")}${
		loading
			? `
    const [loading, setLoading] = useState(false);
`
			: `
`
	}`;
};
export const renderForm = (formText, formNumber, formSearch, formDate, handleSubmit, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	const renderFormTexts = formText.map(
		name => `
                <TextInput name="${name}" onChangeText={this.set${capitalize(name)}} value={${name}} />`,
	);
	const renderFormNumbers = formNumber.map(
		name => `
                <TextInput keyboardType="numeric" name="${name}" onChangeText={this.set${capitalize(name)}} value={${name}} />`,
	);
	const renderFormSearches =
		[] ||
		formSearch.map(
			name => `
                <TextInput name="${name}" onChangeText={this.set${capitalize(name)}} value={${name}} />`,
		);
	const renderFormDates =
		[] ||
		formDate.map(
			name => `
                <TextInput name="${name}" onChangeText={this.set${capitalize(name)}} value={${name}} />`,
		);
	return `
                ${[...renderFormTexts, ...renderFormNumbers, ...renderFormSearches, ...renderFormDates].join("")}${
		handleSubmit
			? `
            
                <TouchableOpacity onPress={this.handleSubmit}${loading ? ` disabled={loading}` : ""}>
                    <Text>Submit</Text>
                </TouchableOpacity>`
			: ""
	}
    `;
};
export const renderHookForm = (formText, formNumber, formSearch, formDate, handleSubmit, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	const renderFormTexts = formText.map(
		name => `
                <TextInput name="${name}" onChangeText={set${capitalize(name)}} value={${name}} />`,
	);
	const renderFormNumbers = formNumber.map(
		name => `
                <TextInput keyboardType="numeric" name="${name}" onChangeText={set${capitalize(name)}} value={${name}} />`,
	);
	const renderFormSearches =
		[] ||
		formSearch.map(
			name => `
                <TextInput name="${name}" onChangeText={set${capitalize(name)}} value={${name}} />`,
		);
	const renderFormDates =
		[] ||
		formDate.map(
			name => `
                <TextInput name="${name}" onChangeText={set${capitalize(name)}} value={${name}} />`,
		);
	return `
            ${handleSubmit ? "<form onSubmit={handleSubmit}>" : ""}${[...renderFormTexts, ...renderFormNumbers, ...renderFormSearches, ...renderFormDates].join("")}${
		handleSubmit
			? `
				<TouchableOpacity ${loading ? ` disabled={loading}` : ""}>
					<Text>Submit</Text>
				</TouchableOpacity>
            </View>`
			: ""
	}
    `;
};
