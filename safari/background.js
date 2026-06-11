// background.js — MV3 service worker
// Clicking the toolbar icon opens the extension Options page.

chrome.action.onClicked.addListener(() => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    // Fallback: open options.html directly
    chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
  }
});

