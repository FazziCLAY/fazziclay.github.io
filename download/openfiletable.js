class OpenFileTable {
  constructor(div_table_id, header_names, sort_mode, sort_mode_reverse) {
    this.json = null;
    this.div_table_id = div_table_id;
    this.header_names = header_names;
    this.sort_mode = sort_mode;
    this.sort_mode_reverse = sort_mode_reverse;
  }

  load(url_to_index, del_after_loading_id, error_id) {
    fetch(url_to_index)
      .then(response => response.json())
      .then(json => {
        this.json = json;
        this.regenerate_table();
      })
      .catch(error => {
        console.log(error);
        if (error_id != null) {
          const err = document.getElementById(error_id);
          err.innerText = error;
        }
      });


    if (del_after_loading_id != null) {
      var del = document.getElementById(del_after_loading_id);
      del.remove();
    }
  }

  regenerate_table() {
    if (this.json != null) {
      this.json = this.resort_json();
      var table = this.create_table();
      var div_table = document.getElementById(this.div_table_id);
      div_table.innerText = "";
      div_table.appendChild(table);
    }
  }

  resort_json() {
    if (this.sort_mode != null) {
      this.json.sort((a, b) => {
          var r = (a[this.sort_mode].localeCompare(b[this.sort_mode]));
          return r;
      });
    }

    if (this.sort_mode_reverse) this.json.reverse();
    return this.json;
  }

  create_table() {
    var table = document.createElement("TABLE");

    // header
    let r = (cell, sort_key, name) => {
      cell.onclick = () => this.on_header_click(sort_key);
      if (this.sort_mode == sort_key) {
        if (this.sort_mode_reverse) {
          headerCell.innerHTML = name + "↓";
        } else {
          headerCell.innerHTML = name + "↑";
        }
      } else {
        headerCell.innerHTML = name;
      }
    };

    // HEADER
    var header_row = table.insertRow();
    for (var i = 0; i < this.header_names.length; i++) {
      var headerCell = document.createElement("TH");
      
      if (i == 0) r(headerCell, "name", this.header_names[i]);
      if (i == 1) r(headerCell, "date", this.header_names[i]);
      if (i == 2) r(headerCell, "description", this.header_names[i]);

      header_row.appendChild(headerCell);
    }

    // Dara
    for (var i = 0; i < this.json.length; i++) {
      const row = table.insertRow();
      const nameCell = row.insertCell();
      const dateCell = row.insertCell();
      const descriptionCell = row.insertCell();

      var name = this.json[i]["name"];
      var href = this.json[i]["href"];
      var date = this.json[i]["date"];
      var description = this.json[i]["description"];

      // name
      if (href == "" || href == null) {
        nameCell.appendChild(document.createTextNode(name));

      } else {
        const a = document.createElement('a');
        a.innerText = name;
        a.href = href;
        nameCell.appendChild(a);
      }
      
      // date
      const t = document.createElement('time');
      t.innerText = date;
      dateCell.appendChild(t);

      // description
      descriptionCell.appendChild(document.createTextNode(description));
    }

    return table;
  }

  on_header_click(sort_key) {
    if (this.sort_mode == sort_key) {
      this.sort_mode_reverse = !this.sort_mode_reverse;
    } else {
      this.sort_mode_reverse = false;
    }
    this.sort_mode = sort_key;
    this.regenerate_table();
  }
}