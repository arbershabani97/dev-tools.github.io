import React from "react";
import ContentContainer from "../containers/Content";
import MainLayoutContainer from "../containers/MainLayout";

const BoilerplatePage = () => {
	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Boilerplate">
				<span />
			</ContentContainer>
		</MainLayoutContainer>
	);
};
export default BoilerplatePage;
