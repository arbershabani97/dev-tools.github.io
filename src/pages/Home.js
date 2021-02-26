import {Heading} from "evergreen-ui";
import React from "react";
import MainLayoutContainer from "../containers/MainLayout";

const HomePage = () => {
	console.log("a");
	return (
		<MainLayoutContainer>
			<Heading is="h3">Home</Heading>
		</MainLayoutContainer>
	);
};
export default HomePage;
