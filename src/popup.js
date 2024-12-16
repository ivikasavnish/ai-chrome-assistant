// Wait for both DOM and MDC to be loaded
window.addEventListener('load', function() {
    // Initialize Material Components
    const topAppBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
    const select = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));
    const textField = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
    const iconButtons = [].map.call(document.querySelectorAll('.mdc-icon-button'), function(el) {
        return new mdc.ripple.MDCRipple(el);
    });

    // Get DOM elements
    const messageInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const refreshButton = document.getElementById('refreshModels');
    const chatMessages = document.getElementById('chatMessages');
    const modelSelect = document.getElementById('modelSelect');
    const sendingStatus = document.getElementById('sendingStatus');
    const errorStatus = document.getElementById('errorStatus');
    const errorMessage = document.getElementById('errorMessage');

    // Load settings and fetch models
    chrome.storage.sync.get({
        ollamaServer: 'http://localhost:11434',
        defaultModel: 'llama2'
    }, function(items) {
        // Set initial model selection
        modelSelect.value = items.defaultModel;
    });

    // Handle model selection
    modelSelect.addEventListener('change', function() {
        const selectedModel = modelSelect.value;
        // Save selected model
        chrome.storage.sync.set({
            defaultModel: selectedModel
        });
    });

    // Handle message sending
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            const userMessageDiv = document.createElement('div');
            userMessageDiv.className = 'message user-message';
            userMessageDiv.textContent = message;
            chatMessages.appendChild(userMessageDiv);
            
            // Clear input and refocus
            messageInput.value = '';
            textField.focus();

            // Show loading indicator
            sendingStatus.style.display = 'flex';
            userInput.disabled = true;
            sendButton.disabled = true;
            userInput.parentElement.classList.add('processing');

            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Get current model
            const model = modelSelect.value;

            // Send message to Ollama
            chrome.storage.sync.get('ollamaServer', function(items) {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const requestBody = {
                    model: model,
                    prompt: message,
                    stream: false
                };

                console.log('Sending request:', requestBody);

                // Send request through background script
                const response = new Promise((resolve, reject) => {
                    chrome.runtime.sendMessage({
                        type: 'ollamaRequest',
                        url: `${items.ollamaServer}/api/generate`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    }, response => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else if (!response.success) {
                            reject(new Error(response.error));
                        } else {
                            resolve(response.data);
                        }
                    });
                });

                response.then(data => {
                    // Remove loading indicator
                    sendingStatus.style.display = 'none';
                    userInput.disabled = false;
                    sendButton.disabled = false;
                    userInput.parentElement.classList.remove('processing');
                    
                    // Add assistant message
                    const assistantMessageDiv = document.createElement('div');
                    assistantMessageDiv.className = 'message ai-message';
                    assistantMessageDiv.textContent = data.response;
                    chatMessages.appendChild(assistantMessageDiv);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                })
                .catch(error => {
                    // Remove loading indicator
                    sendingStatus.style.display = 'none';
                    userInput.disabled = false;
                    sendButton.disabled = false;
                    userInput.parentElement.classList.remove('processing');
                    
                    // Show error message
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.textContent = 'Error: Could not connect to Ollama server';
                    chatMessages.appendChild(errorDiv);
                });
            });
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    refreshButton.addEventListener('click', async () => {
        // Show loading state
        refreshButton.textContent = 'sync';
        refreshButton.disabled = true;

        // Fetch available models
        chrome.storage.sync.get('ollamaServer', function(items) {
            fetch(`${items.ollamaServer}/api/tags`)
                .then(response => response.json())
                .then(data => {
                    // Update model list
                    modelSelect.innerHTML = '';
                    
                    data.models.forEach(model => {
                        const option = document.createElement('option');
                        option.value = model.name;
                        option.textContent = `${model.name} (${model.details.parameter_size})`;
                        modelSelect.appendChild(option);
                    });

                    // Set the default model if available
                    chrome.storage.sync.get(['defaultModel'], function(result) {
                        console.log('Setting default model:', result.defaultModel);
                        if (result.defaultModel && modelSelect.querySelector(`option[value="${result.defaultModel}"]`)) {
                            modelSelect.value = result.defaultModel;
                        }
                    });
                })
                .catch(error => {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message';
                    errorDiv.textContent = 'Error: Could not fetch models';
                    chatMessages.appendChild(errorDiv);
                })
                .finally(() => {
                    // Reset button
                    refreshButton.textContent = 'refresh';
                    refreshButton.disabled = false;
                });
        });
    });

    // Focus input on load
    textField.focus();
});
