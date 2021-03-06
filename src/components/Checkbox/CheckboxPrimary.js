import {Checkbox} from "evergreen-ui";
import React from "react";
import {capitalize} from "../../utils/string";

const CheckboxPrimary = ({checked, onChange, name, label = false}) => {
	return <Checkbox checked={checked} label={label || capitalize(name)} margin={5} name={name} onChange={onChange} />;
};
export default CheckboxPrimary;
