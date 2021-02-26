export const componentLiteral = data => {
	const {name, withRouter, state, componentDidMount, componentDidUpdate, mapStateToProps, mapDispatchToProps, connect} = data;

	let exportString = name;
	if (withRouter) exportString = `withRouter(${name})`;
	if (connect) exportString = `connect(${mapStateToProps ? "mapStateToProps" : "null"},${mapDispatchToProps ? "mapDispatchToProps" : "null"})(${exportString})`;

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
		state
			? `
    state = {

    }
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
	}
    render () {${
		withRouter
			? `
        const { match, location, history } = this.props;
    `
			: ""
	}
        return (
            <div>
                ${name}
            </div>
        )
    }
}${
		mapStateToProps
			? `
const mapStateToProps = ({ }) => ({ });`
			: ""
	}${
		mapDispatchToProps
			? `
const mapDispatchToProps = {};`
			: ""
	}

export default ${exportString};`;
};
