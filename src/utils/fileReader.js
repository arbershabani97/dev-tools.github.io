/* eslint-disable func-names */
const fileReader = (files, onRead) => {
	const f = files[0];
	const reader = new FileReader();
	reader.onload = (function(theFile) {
		return function(e) {
			onRead(e.target.result);
		};
	})(f);
	// Read in the image file as a data URL.
	reader.readAsText(f);
};
export default fileReader;
