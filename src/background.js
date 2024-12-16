// Background script for handling extension events
chrome.runtime.onInstalled.addListener(() => {
  console.log('AI Assistant Extension installed');
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ollamaRequest') {
    console.log('Proxying Ollama request:', request);
    
    fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
    .then(response => response.text())
    .then(result => {
      console.log('Ollama response:', result);
      sendResponse({ success: true, data: result });
    })
    .catch(error => {
      console.error('Ollama error:', error);
      sendResponse({ success: false, error: error.message });
    });
    
    return true; // Will respond asynchronously
  }
});
