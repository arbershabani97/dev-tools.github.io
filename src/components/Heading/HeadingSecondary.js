import {Heading} from "evergreen-ui";
import React from "react";

const HeadingSecondary = ({text}) => {
	return (
		<Heading marginBottom={5} marginLeft={5} marginRight={5} marginTop={10} size={100}>
			{text}
		</Heading>
	);
};
export default HeadingSecondary;
