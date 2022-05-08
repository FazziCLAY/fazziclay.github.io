sort = null;
sort_invert = false;

function main() {
  // Sort logic
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  sort = params.sort;
  if (sort == "null") sort = null;
  sort_invert = params.invert == "true";


  // replace href
  const disable_sort = document.getElementById("disable_sort");
  const header_name = document.getElementById("header_name");
  const header_date = document.getElementById("header_date");
  const header_description = document.getElementById("header_description");

  header_name.href = "?sort=name&invert=false";
  header_date.href = "?sort=date&invert=false";
  header_description.href = "?sort=description&invert=false";

  if (!sort_invert) {
    if (sort == "name") header_name.href = "?sort=name&invert=true";
    if (sort == "date") header_date.href = "?sort=date&invert=true";
    if (sort == "description") header_description.href = "?sort=description&invert=true";
  }

  disable_sort.href = "?sort=null&invert=false";
  if (sort == null) {
    disable_sort.remove();
  }


  fetch("./index.json")
	.then(response => response.json())
	.then(json => {
    if (sort != null && sort != undefined) {
      json.sort((a, b) => {
        var r = (a[sort].localeCompare(b[sort]));
        return r;
      });
    }
    if (sort_invert) {
      json.reverse();
    }

		console.log(json);
    appendTable(json);
	})
	.catch(error => {
	  console.log(error);
    const err = document.createElement('p');
    err.innerText = error;
    document.body.appendChild(err);
  })
}

function appendTable(json) {
  const table = document.getElementById("main_table");

  for (var i = 0; i < json.length; i++) {
    const row = table.insertRow();
    const nameCell = row.insertCell();
    const dateCell = row.insertCell();
    const descriptionCell = row.insertCell();

    name = json[i]["name"];
    href = json[i]["href"];
    date = json[i]["date"];
    description = json[i]["description"];

    if (href == "" || href == null) {
      nameCell.appendChild(document.createTextNode(name));

    } else {
      const a = document.createElement('a');
      a.innerText = name;
      a.href = href;
      nameCell.appendChild(a);
    }
    
    const t = document.createElement('time');
    t.innerText = date;
    dateCell.appendChild(t);


    descriptionCell.appendChild(document.createTextNode(description));
  }
}


main();