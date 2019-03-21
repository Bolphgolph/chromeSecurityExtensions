let history = [];
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && !tab.url.includes("chrome-extension://")) {
    chrome.storage.sync.get(['browserHistory'], (result) => {
      history = result.browserHistory;
    });
    history.push({
      title: tab.title,
      url:tab.url
    })

    chrome.storage.sync.set({browserHistory: history}, () => {});
  }
});
