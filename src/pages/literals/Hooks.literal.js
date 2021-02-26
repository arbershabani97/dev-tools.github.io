export const componentLiteral = data => {
	const {name, withRouter, state, useEffect, useEffectUpdate, mapStateToProps, mapDispatchToProps, connect} = data;

	let exportString = name;
	if (withRouter) exportString = `withRouter(${name})`;
	if (connect) exportString = `connect(${mapStateToProps ? "mapStateToProps" : "null"},${mapDispatchToProps ? "mapDispatchToProps" : "null"})(${exportString})`;

	return `import React${state ? ", {useState}" : ""} from "react";${
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

const ${name} = (${withRouter ? `{ match, location, history }` : ""}) => {${
		state
			? `
    const [title, setTitle] = useState("");
`
			: ""
	}${
		useEffect
			? `
    useEffect(() => {

    }, [])
`
			: ""
	}${
		useEffectUpdate
			? `
    useEffect(() => {
        // run fn when id is updated
    }, [id])
`
			: ""
	}
    return (
        <div>
            ${name}
        </div>
    )
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
