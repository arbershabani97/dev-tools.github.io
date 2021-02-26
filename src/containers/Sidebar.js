import {Pane} from "evergreen-ui";
import React from "react";

const SidebarContainer = ({children}) => {
	return (
		<Pane alignItems="flex-start" backgroundColor="blueTint" border="muted" display="flex" flex={2} flexDirection="column" padding={20}>
			{children}
		</Pane>
	);
};

export default SidebarContainer;
