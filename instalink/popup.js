document.getElementById('fetchData').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab.url.includes('instagram.com')) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['contentScript.js']
      });
    } else {
      alert('Please navigate to instagram.com and log in.');
    }
  });
  