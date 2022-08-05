const FILE_URL = "https://fazziclay.github.io/api/project_3/v1/latest/url" // todo: owo


latest_id = "";
latest_date = "????-??-??";
latest_name = "?";
latest_build = "?";
latest_changelog = "?";

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

function loadLatestData(idd) {
	latest_id = idd;
	updateLatest();

	fetch("/api/project_3/v1/latest/date")
	.then(response => {
		response.text()
		.then(text => {
			latest_date = text;
			updateLatest();
		});
	});

	fetch("/api/project_3/v1/latest/name")
	.then(response => {
		response.text()
		.then(text => {
			latest_name = text;
			updateLatest();
		});
	});

	fetch("/api/project_3/v1/latest/build")
	.then(response => {
		response.text()
		.then(text => {
			latest_build = text;
			updateLatest();
		});
	});

	fetch("/api/project_3/v1/latest/changelog")
	.then(response => {
		response.text()
		.then(text => {
			latest_changelog = text;
			updateLatest();
		});
	});
}

function updateLatest() {
	const rrr = document.getElementById(latest_id);
	rrr.innerHTML = "Latest ("+latest_date+") "+latest_name+" build "+latest_build+":<br>"+latest_changelog.replace("\n", "<br>");
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