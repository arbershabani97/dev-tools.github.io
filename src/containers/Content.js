import {Heading, Pane} from "evergreen-ui";
import React from "react";

const ContentContainer = ({title = "", children}) => {
	return (
		<Pane alignItems="flex-start" display="flex" flex={5} flexDirection="column" overflowX="auto" padding={20} position="relative">
			<Heading is="h3" marginBottom={16}>
				{title}
			</Heading>

			{children}
		</Pane>
	);
};

export default ContentContainer;
