import {Text} from "evergreen-ui";
import React from "react";

const HeadingInfo = ({text = "", ...props}) => {
	return (
		<Text color="rgba(67, 90, 111, 0.5)" display="flex" fontSize={12} fontWeight={300} {...props}>
			{text}
		</Text>
	);
};
export default HeadingInfo;
