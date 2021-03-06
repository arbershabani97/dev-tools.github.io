/* eslint-disable react/jsx-newline */
import {Text} from "evergreen-ui";
import React from "react";

const HeadingFile = ({file = ""}) => {
	return (
		<Text>
			File Name:{" "}
			<Text backgroundColor="#f7f9fd" color="dark" fontWeight={500} padding={4}>
				{file}
			</Text>
		</Text>
	);
};
export default HeadingFile;
