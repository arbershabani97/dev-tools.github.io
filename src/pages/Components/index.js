import React from "react";
import Can from "../../utils/can/Can";
import Components from "./Components";
import ComponentsRN from "./Components.native";

const ComponentsPage = () => {
	return (
		<>
			<Can I="use" on="react">
				<Components />
			</Can>

			<Can I="use" on="react-native">
				<ComponentsRN />
			</Can>
		</>
	);
};
export default ComponentsPage;
