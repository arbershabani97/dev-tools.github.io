/* eslint-disable complexity */
import {renderHookStateFromForm, renderHookForm, renderHookFormFunctions} from "./form.literal";

export const componentLiteral = data => {
	// eslint-disable-next-line no-unused-vars
	const {name, withRouter, state, useEffect, useEffectUpdate, mapStateToProps, mapDispatchToProps, connect, reduxState, reduxActions, formText, formNumber, formSearch, formDate, loading, handleSubmit} = data;

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
	}${formText.length || formNumber.length || formSearch.length || formDate.length ? renderHookStateFromForm(formText, formNumber, formSearch, formDate, loading) : ""}${
		useEffect
			? `
    useEffect(() => {

    }, []);
`
			: ""
	}${
		useEffectUpdate
			? `
    useEffect(() => {
        // run fn when id is updated
    }, [id]);
`
			: ""
	}${handleSubmit ? renderHookFormFunctions(formText, formNumber, formSearch, formDate, reduxActions, loading) : ""}
    return (
        <div>
            ${name}${renderHookForm(formText, formNumber, formSearch, formDate, handleSubmit, loading)}
        </div>
    )
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

export const sampleHook = `import React, { useState } from 'react';

const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`;
