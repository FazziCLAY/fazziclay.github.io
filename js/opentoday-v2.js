const LATEST_JSON = "https://fazziclay.github.io/api/project_3/v2/latest.json"


dateId = "";
nameId = "";
buildId = "";
changelogId = "";

latest_date = "????-??-??";
latest_name = "?";
latest_build = "?";
latest_changelog = "?";

function tryDownloadLatest() {
	fetch(LATEST_JSON)
	.then(response => {
		response.json()
		.then(json => {
			console.log(json);
			download(json["direct_url"]);
		})
		.catch(e => fazziclay_error(e));
	})
	.catch(error => fazziclay_error(e));
}

function fazziclay_error(e) {
	console.log("error: " + e);
	//document.location.href = "https://github.com/fazziclay/opentoday";
}

function tfromunix(unix_timestamp) {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
return formattedTime;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = "0" + a.getHours();
  var min = "0" + a.getMinutes();
  var sec = "0" + a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
  return time;
}

function initOpentoday(_date, _name, _build, _changelog) {
	dateId = _date;
	nameId = _name;
	buildId = _build;
	changelogId = _changelog;





	fetch(LATEST_JSON)
	.then(response => {
		response.json()
		.then(json => {
			console.log(json);
			
			
			var unix = json['date'];
			latest_date = timeConverter(unix).toString().trim();
			updateDate();


			latest_name = json["name"].toString().trim();
			updateVersionName();

			latest_build = json['build'].toString().trim();
			updateVersionBuild();

			var changelog_url = json["changelog_url"].toString().trim();
			fetch(changelog_url)
			.then(response => {
				response.text()
				.then(text => {
					latest_changelog = text.trim();
					updateChangelog();
				});
			});


		})
		.catch(e => fazziclay_error(e));
	})
	.catch(error => fazziclay_error(e));
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