function parse() {
var queryString = window.location.search.slice(1);
fetch("./codes.json")
      .then(response => response.json())
      .then(json => {
	var url = json[queryString];
	if (url == undefined) {
		document.location.href = "https://fazziclay.github.io";
		return;	
	}
	document.location.href = url;
      })
      .catch(error => {
        console.log(error);
      });
}
