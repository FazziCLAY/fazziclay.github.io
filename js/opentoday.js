const FILE_URL = "https://fazziclay.github.io/api/project_3/v1/latest/url" // todo: owo

function tryDownloadLatest() {
	fetch(FILE_URL)
	.then(response => {
		response.text()
		.then(text => {
			console.log(text);
			download(text);
		})
		.catch(e => fazziclay_error(e));
	})
	.catch(error => fazziclay_error(e));
}

function fazziclay_error(e) {
	console.log("error: " + e);
	document.location.href = "https://github.com/fazziclay/opentoday";
}

function download(url) {
	// Create a new link
	const anchor = document.createElement('a');
	anchor.href = url;        

	// Append to the DOM
	document.body.appendChild(anchor);

	// Trigger `click` event
	anchor.click();

	// Remove element from DOM
	document.body.removeChild(anchor);	
}