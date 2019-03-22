chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url.includes("https://www.google")) {
      chrome.tabs.executeScript(tabId, {
          allFrames: true,
          file: 'src/inject/payload.js'
      });
  }
});
