import {Pane, Paragraph} from "evergreen-ui";
import React from "react";

const DescriptionPrimary = ({content}) => {
	if (typeof content === "string") {
		return <Paragraph marginBottom={16}>{content}</Paragraph>;
	}
	return (
		<Pane marginBottom={16}>
			{content.map(text => (
				<Paragraph key={text}>{text}</Paragraph>
			))}
		</Pane>
	);
};
export default DescriptionPrimary;
