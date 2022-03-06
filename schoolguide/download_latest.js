const FILE_URL = "https://raw.githubusercontent.com/FazziCLAY/SchoolGuide/main/manifest/v2/version_manifest_v2.json"
const RELEASES_PAGE_URL = "https://github.com/FazziCLAY/SchoolGuide/releases/";

function tryDownloadLatest() {
	fetch(FILE_URL)
	.then(response => response.json())
	.then(json => {
		try {
			var url = json['latestVersion']['download']['release'];
			download(url);
		} catch (e) {
			goToReleases();
		}
	})
	.catch(error => goToReleases())
}

function goToReleases() {
	document.location.href = RELEASES_PAGE_URL;
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