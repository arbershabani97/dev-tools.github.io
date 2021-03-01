/* eslint-disable complexity, max-params */
const renderFormDestructuring = (formText, formNumber, formSearch, formDate, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	const res = [...formText, ...formNumber, ...formSearch, ...formDate, ...(loading ? ["loading"] : [])].join(", ");
	return `
        const {${res}} = this.state;`;
};
const renderFormFunctions = (formText, formNumber, formSearch, formDate, reduxActions, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	return `
    handleChange = (e) => this.setState({[e.target.name]: e.target.value});
    
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

const renderStateFromForm = (formText, formNumber, formSearch, formDate, loading) => {
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
const renderForm = (formText, formNumber, formSearch, formDate, handleSubmit, loading) => {
	if (!formText.length && !formNumber.length && !formSearch.length && !formDate.length) return "";
	const renderFormTexts = formText.map(
		name => `
                    <input type="string" name="${name}" value={${name}} onChange={this.handleChange} />`,
	);
	const renderFormNumbers = formNumber.map(
		name => `
                    <input type="number" name="${name}" value={${name}} onChange={this.handleChange} />`,
	);
	const renderFormSearches = formSearch.map(
		name => `
                    <input type="search" name="${name}" value={${name}} onChange={this.handleChange} />`,
	);
	const renderFormDates = formDate.map(
		name => `
                    <input type="date" name="${name}" value={${name}} onChange={this.handleChange} />`,
	);
	return `
                ${handleSubmit ? "<form onSubmit={this.handleSubmit}>" : ""}${[...renderFormTexts, ...renderFormNumbers, ...renderFormSearches, ...renderFormDates].join("")}${
		handleSubmit
			? `
                    <button type="submit"${loading ? ` disabled={loading}` : ""}>Submit</button>
                </form>`
			: ""
	}
    `;
};

export const componentLiteral = data => {
	const {name, withRouter, state, componentDidMount, componentDidUpdate, mapStateToProps, reduxState, mapDispatchToProps, reduxActions, connect, formText, formNumber, formSearch, formDate, loading, handleSubmit} = data;

	let exportString = name;
	if (withRouter) exportString = `withRouter(${name})`;
	if (connect) exportString = `connect(${mapStateToProps || reduxState.length ? "mapStateToProps" : "null"},${mapDispatchToProps || reduxActions.length ? "mapDispatchToProps" : "null"})(${exportString})`;

	return `import React, {Component} from "react";${
		withRouter
			? `
import {withRouter} from "react-router";`
			: ""
	}${
		connect
			? `
import {connect} from "react-redux";`
			: ""
	}

class ${name} extends Component {${
		state || formText.length || formNumber.length || formSearch.length || formDate.length
			? `
    state = {${renderStateFromForm(formText, formNumber, formSearch, formDate, loading)}
    };
`
			: ""
	}${
		componentDidMount
			? `
    componentDidMount () {

    }
`
			: ""
	}${
		componentDidUpdate
			? `
    componentDidUpdate (prevProps) {

    }
`
			: ""
	}${handleSubmit ? renderFormFunctions(formText, formNumber, formSearch, formDate, reduxActions, loading) : ""}
    render () {${
		withRouter
			? `
        const { match, location, history } = this.props;
    `
			: ""
	}${renderFormDestructuring(formText, formNumber, formSearch, formDate, loading)}
        return (
            <div>
                ${name}${renderForm(formText, formNumber, formSearch, formDate, handleSubmit, loading)}
            </div>
        )
    }
}${
		mapStateToProps || reduxState.length
			? `
const mapStateToProps = ({ ${reduxState.join(", ")} }) => ({ ${reduxState.join(", ")} });`
			: ""
	}${
		mapDispatchToProps || reduxActions.length
			? `
const mapDispatchToProps = {${reduxActions.join(", ")}};`
			: ""
	}

export default ${exportString};`;
};
