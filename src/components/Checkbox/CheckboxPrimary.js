import {Checkbox} from "evergreen-ui";
import React from "react";
import {capitalize} from "../../utils/capitalize";

const CheckboxPrimary = ({checked, onChange, name}) => {
	return <Checkbox checked={checked} label={capitalize(name)} margin={5} name={name} onChange={onChange} />;
};
export default CheckboxPrimary;
