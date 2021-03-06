import {Text} from "evergreen-ui";
import React from "react";

const CLIText = ({text = ""}) => {
	return (
		<Text background="#F5F6F7" border="#E4E7EB" borderRadius={8} borderStyle="solid" borderWidth={1} display="flex" flexShrink={1} marginBottom={16} paddingBottom={8} paddingLeft={16} paddingRight={16} paddingTop={8}>
			{text}
		</Text>
	);
};
export default CLIText;
