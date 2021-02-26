import {Pane} from "evergreen-ui";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {solarizedDark} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {CopyToClipboard} from "react-copy-to-clipboard";

const CodeContainer = ({copied, code, handleCopy}) => {
	return (
		<Pane alignSelf="stretch" background="blueTint" border="muted" borderRadius={5} fontSize={12} maxHeight="60vh" overflowY="scroll" position="relative" textAlign="left">
			<SyntaxHighlighter language="javascript" style={solarizedDark}>
				{code}
			</SyntaxHighlighter>

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
