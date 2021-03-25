/* eslint-disable complexity, max-params */

import {renderForm, renderFormDestructuring, renderFormFunctions, renderStateFromForm} from "./form.literal";

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

export const sampleComponent = `class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}`;
