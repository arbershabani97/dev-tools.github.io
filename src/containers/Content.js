import {Pane} from "evergreen-ui";
import React from "react";
import HeadingPrimary from "../components/Heading/HeadingPrimary";

const ContentContainer = ({title = "", children}) => {
	return (
		<Pane alignItems="flex-start" display="flex" flex={5} flexDirection="column" overflowX="auto" padding={20} position="relative">
			<HeadingPrimary text={title} />

			{children}
		</Pane>
	);
};

export default ContentContainer;
