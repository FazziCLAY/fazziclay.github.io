// Settings
var div_table_id = "div_table";
var header_names = ["Name", "Date", "Description"];

var sort_mode = "name";
var sort_mode_reverse = false;

var index_json = null;

function openfiletablejs_dev_a(headerCell, name) {
	if (sort_mode_reverse) {
		headerCell.innerHTML = name + "↓";
	} else {
		headerCell.innerHTML = name + "↑";
	}
}

function openfiletablejs_generateTable() {
	var table = document.createElement("TABLE");

	var header_row = table.insertRow();
	for (var i = 0; i < header_names.length; i++) {
		var headerCell = document.createElement("TH");
		headerCell.innerHTML = header_names[i];
		
		if (i == 0) {
			headerCell.onclick = () => openfiletablejs_header_clicked("name");
			if (sort_mode == "name") openfiletablejs_dev_a(headerCell, header_names[i]);
		}
		if (i == 1) {
			headerCell.onclick = () => openfiletablejs_header_clicked("date");
			if (sort_mode == "date") openfiletablejs_dev_a(headerCell, header_names[i]);
		}
		if (i == 2) {
			headerCell.onclick = () => openfiletablejs_header_clicked("description");
			if (sort_mode == "description") openfiletablejs_dev_a(headerCell, header_names[i]);
		}

		header_row.appendChild(headerCell);
	}


    for (var i = 0; i < index_json.length; i++) {
	    const row = table.insertRow();
	    const nameCell = row.insertCell();
	    const dateCell = row.insertCell();
	    const descriptionCell = row.insertCell();

	    name = index_json[i]["name"];
	    href = index_json[i]["href"];
	    date = index_json[i]["date"];
	    description = index_json[i]["description"];

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

	return table;
}

function openfiletablejs_sort_json() {
	if (sort_mode != null) {
		index_json.sort((a, b) => {
	        var r = (a[sort_mode].localeCompare(b[sort_mode]));
	        return r;
	    });
	}

	if (sort_mode_reverse) index_json.reverse();
    return index_json;
}

function openfiletablejs_header_clicked(id) {
	if (sort_mode == id) {
		sort_mode_reverse = !sort_mode_reverse;
	} else {
		sort_mode_reverse = false;
	}
	sort_mode = id;
	openfiletablejs_regenerate_table();
}

function openfiletablejs_regenerate_table() {
	if (index_json != null) {
		index_json = openfiletablejs_sort_json()
		var table = openfiletablejs_generateTable();

		var div_table = document.getElementById(div_table_id);
		div_table.innerText = "";
		div_table.appendChild(table);
	}
}

function openfiletablejs_load(url_to_index, del_after_loading_id, error_id) {
	fetch(url_to_index)
		.then(response => response.json())
		.then(json => {
			index_json = json;
			openfiletablejs_regenerate_table();
		})
		.catch(error => {
			console.log(error);
			if (error_id != null) {
				const err = document.getElementById(error_id);
				err.innerText = error;
			}
		});


	if (del_after_loading_id != null) {
		var	del = document.getElementById(del_after_loading_id);
		del.remove();
	}
}

function openfiletablejs_setup(_div_table_id, _header_names, _sort_mode) {
	div_table_id = _div_table_id;
	header_names = _header_names;
	sort_mode = _sort_mode;
}