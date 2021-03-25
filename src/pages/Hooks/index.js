import React from "react";
import Can from "../../utils/can/Can";
import Hooks from "./Hooks";
import HooksRN from "./Hooks.native";

const HooksPage = () => {
	return (
		<>
			<Can I="use" on="react">
				<Hooks />
			</Can>

			<Can I="use" on="react-native">
				<HooksRN />
			</Can>
		</>
	);
};
export default HooksPage;
