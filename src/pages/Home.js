import React from "react";
import ContentContainer from "../containers/Content";
import MainLayoutContainer from "../containers/MainLayout";

const HomePage = () => {
	console.log("a");
	return (
		<MainLayoutContainer alignItems="stretch" flexDirection="row">
			<ContentContainer title="Home">
				<span />
			</ContentContainer>
		</MainLayoutContainer>
	);
};
export default HomePage;
