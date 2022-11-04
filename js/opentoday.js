const FILE_URL = "https://fazziclay.github.io/api/project_3/v1/latest/direct_url"


dateId = "";
nameId = "";
buildId = "";
changelogId = "";

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

function initOpentoday(_date, _name, _build, _changelog) {
	dateId = _date;
	nameId = _name;
	buildId = _build;
	changelogId = _changelog;


	fetch("/api/project_3/v1/latest/date")
	.then(response => {
		response.text()
		.then(text => {
			latest_date = text.trim();
			updateDate();
		});
	});

	fetch("/api/project_3/v1/latest/name")
	.then(response => {
		response.text()
		.then(text => {
			latest_name = text.trim();
			updateVersionName();
		});
	});

	fetch("/api/project_3/v1/latest/build")
	.then(response => {
		response.text()
		.then(text => {
			latest_build = text.trim();
			updateVersionBuild();
		});
	});

	fetch("/api/project_3/v1/latest/changelog")
	.then(response => {
		response.text()
		.then(text => {
			latest_changelog = text.trim();
			updateChangelog();
		});
	});
}

function updateDate() {
	const rrr = document.getElementById(dateId);
	rrr.innerHTML = latest_date;
}


function updateVersionName() {
	const rrr = document.getElementById(nameId);
	rrr.innerHTML = latest_name;
}



function updateVersionBuild() {
	const rrr = document.getElementById(buildId);
	rrr.innerHTML = latest_build;
}



function updateChangelog() {
	const rrr = document.getElementById(changelogId);
	rrr.innerHTML = latest_changelog.replaceAll("\n", "<br>");
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