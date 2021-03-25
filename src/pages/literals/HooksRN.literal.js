/* eslint-disable complexity */
import {renderHookStateFromForm, renderHookForm, renderHookFormFunctions} from "./formRN.literal";

export const componentLiteral = data => {
	// eslint-disable-next-line no-unused-vars
	const {name, state, useEffect, useEffectUpdate, mapStateToProps, mapDispatchToProps, connect, reduxState, reduxActions, formText, formNumber, formSearch, formDate, loading, handleSubmit} = data;

	let exportString = name;
	if (connect) exportString = `connect(${mapStateToProps ? "mapStateToProps" : "null"},${mapDispatchToProps ? "mapDispatchToProps" : "null"})(${exportString})`;

	return `import React${state ? ", {useState}" : ""} from "react";
import {View, Text${formText.length || formNumber.length ? ", TextInput" : ""}${handleSubmit ? ", TouchableOpacity" : ""}} from "react-native";${
		connect
			? `
import {connect} from "react-redux";`
			: ""
	}

const ${name} = () => {${
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
        <View>
            <Text>${name}</Text>${renderHookForm(formText, formNumber, formSearch, formDate, handleSubmit, loading)}
        </View>
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
import {View, Text, TouchableOpacity} from 'react-native';

const Example = () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>You clicked {count} times</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}`;
