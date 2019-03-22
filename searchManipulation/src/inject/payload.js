let results = document.querySelectorAll('.g .iUh30');
let urls = [];

results.forEach((searchResult) => {
  urls.push(searchResult.innerHTML.split(' ')[0])
});

urls.forEach((url, idx) => {
  if (url.includes("www.foxnews.com")) {
    let item = results.item(idx).closest('.g');
    item.parentNode.removeChild(item);
  }
});