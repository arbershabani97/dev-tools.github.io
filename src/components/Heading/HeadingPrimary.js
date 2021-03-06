import {Heading} from "evergreen-ui";
import React from "react";

const HeadingPrimary = ({text = "", ...props}) => {
	return (
		<Heading is="h3" marginBottom={16} {...props}>
			{text}
		</Heading>
	);
};
export default HeadingPrimary;
