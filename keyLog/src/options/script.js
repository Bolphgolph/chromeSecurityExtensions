
chrome.storage.local.get((logs) => {
  let data = [];
  for (var key in logs) {
      data.push(logs[key].split('^~^'));
  }
  console.log(data);
  document.getElementById('tableBody').innerHTML += createRow(data);
});

function createRow(data) {
  let row = "";
  data.forEach((v) => {
    row += "<tr>" + createCell(v) + "</tr>";
  })
  return row;
}

function createCell(data){
  let cells = "";
  data.forEach((v) => {

    cells += "<td>" + v + "</td>";
  });
  return cells;
}
