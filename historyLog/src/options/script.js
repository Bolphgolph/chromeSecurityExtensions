chrome.storage.sync.get(['browserHistory'], (result) => {
  document.getElementById("tableBody").innerHTML = createRow(result.browserHistory);
});

document.getElementById("refresh").addEventListener("click", refresh);
document.getElementById("clear").addEventListener("click", clear);

function refresh() {
  document.getElementById('tableBody').innerHTML = "";
  chrome.storage.sync.get(['browserHistory'], (result) => {
    document.getElementById("tableBody").innerHTML = createRow(result.browserHistory);
  });
}
refresh();

function clear() {
  chrome.storage.sync.set({browserHistory: []}, () => {});
  refresh();
}

function createRow(data) {
  let row = "";
  data.forEach((v) => {
    row += "<tr>" + createCell(v) + "</tr>";
  })
  return row;
}

function createCell(data) {
  return "<td>" + data.title + "</td><td><a href=" + data.url + ">" + data.url + "</a></td>";
}
