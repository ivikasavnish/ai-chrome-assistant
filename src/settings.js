// Default settings
const DEFAULT_SETTINGS = {
    ollamaServer: 'http://192.168.1.10:11435',
    defaultModel: 'llama3.2:latest'
};

// Load settings when the page opens
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    
    // Add event listener for the save button
    document.getElementById('saveSettings').addEventListener('click', saveSettings);
});

// Load settings from storage
function loadSettings() {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
        document.getElementById('ollamaServer').value = settings.ollamaServer;
        document.getElementById('defaultModel').value = settings.defaultModel;
    });
}

// Save settings to storage
function saveSettings() {
    const settings = {
        ollamaServer: document.getElementById('ollamaServer').value,
        defaultModel: document.getElementById('defaultModel').value
    };

    chrome.storage.sync.set(settings, () => {
        const status = document.getElementById('status');
        status.textContent = 'Settings saved!';
        status.style.display = 'block';
        
        // Hide status message after 2 seconds
        setTimeout(() => {
            status.style.display = 'none';
        }, 2000);
    });
}
