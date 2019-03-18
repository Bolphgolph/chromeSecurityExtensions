function refresh() {
  document.getElementById('tableBody').innerHTML = "";
  chrome.storage.local.get((logs) => {
    let data = [];
    for (var key in logs) {
      let values = [];
      values.push(key);
      logs[key].split('^~^').forEach((v) => {
        values.push(v)
      })
      data.push(values)
    }
    document.getElementById('tableBody').innerHTML += createRow(data);
  });
}
refresh();

function clear() {
  chrome.storage.local.clear();
  refresh();
}

document.getElementById("refresh").addEventListener("click", refresh);
document.getElementById("clear").addEventListener("click", clear);

function createRow(data) {
  let row = "";
  data.forEach((v) => {
    row += "<tr>" + createCell(v) + "</tr>";
  })
  return row;
}

function createCell(data) {
  let cells = "";
  data.forEach((v, i) => {
    if (v == "") {
      cells += "<td>none</td>";
    } else if (i == 0) {
      cells += "<td>" + new Date(v).toLocaleString() + "</td>";
    } else if (i == 2) {
      cells += "<td><a href=" + v + ">" + v + "</a></td>";
    } else {
      let match = /(user|name|mail|login|usr|pass|key)/.test(v) ? "match": "";
      console.log(match);
      cells += '<td class="' + match + '">' + v + '</td>';
    }

  });
  return cells;
}
