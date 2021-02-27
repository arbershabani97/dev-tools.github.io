import {Pane} from "evergreen-ui";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {solarizedDark} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {CopyToClipboard} from "react-copy-to-clipboard";

const CodeContainer = ({copied, code, handleCopy, maxHeight = "80vh"}) => {
	return (
		<Pane alignSelf="stretch" background="blueTint" border="muted" borderRadius={5} fontSize={12} maxHeight={maxHeight} position="relative" textAlign="left">
			<Pane maxHeight="100%" overflowY="scroll">
				<SyntaxHighlighter language="javascript" style={solarizedDark}>
					{code || "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}
				</SyntaxHighlighter>
			</Pane>

			<Pane background="blueTint" borderTopLeftRadius={5} bottom={0} cursor="pointer" padding={5} position="absolute" right={0}>
				{copied ? (
					<span>Copied.</span>
				) : (
					<CopyToClipboard onCopy={handleCopy} text={code}>
						<span>Copy To Clipboard</span>
					</CopyToClipboard>
				)}
			</Pane>
		</Pane>
	);
};

export default CodeContainer;
