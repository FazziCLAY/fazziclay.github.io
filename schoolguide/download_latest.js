const FILE_URL = "https://raw.githubusercontent.com/FazziCLAY/SchoolGuide/main/manifest/v2/version_manifest_v2.json"
const RELEASES_PAGE_URL = "https://github.com/FazziCLAY/SchoolGuide/releases/";

function tryDownloadLatest() {
	fetch(FILE_URL)
	.then(response => response.json())
	.then(json => {
		try {
			var url = json['latestVersion']['download']['release'];
			window.open(url, '_blank').focus();
		} catch (e) {
			goToReleases();
		}
	})
	.catch(error => goToReleases())
}

function goToReleases() {
	document.location.href = RELEASES_PAGE_URL;
}