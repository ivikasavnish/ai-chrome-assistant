// Action definitions with their properties and retry logic
const actionTypes = {
    // Navigation Actions
    openTab: {
        name: 'Open Tab',
        icon: 'external-link-alt',
        category: 'navigation',
        properties: {
            url: { type: 'text', label: 'URL' },
            waitForLoad: { type: 'checkbox', label: 'Wait for page load' },
            timeout: { type: 'number', label: 'Timeout (ms)', default: 30000 }
        },
        retryConfig: {
            maxRetries: 3,
            delay: 1000
        }
    },
    focusTab: {
        name: 'Focus Tab',
        icon: 'eye',
        category: 'navigation',
        properties: {
            urlPattern: { type: 'text', label: 'URL Pattern' },
            index: { type: 'number', label: 'Tab Index' }
        }
    },
    navigateBack: {
        name: 'Navigate Back',
        icon: 'arrow-left',
        category: 'navigation',
        properties: {
            waitForLoad: { type: 'checkbox', label: 'Wait for page load' }
        }
    },

    // Interaction Actions
    clickElement: {
        name: 'Click Element',
        icon: 'mouse-pointer',
        category: 'interaction',
        properties: {
            selector: { type: 'text', label: 'CSS Selector' },
            text: { type: 'text', label: 'Text Content' },
            xpath: { type: 'text', label: 'XPath' },
            waitForElement: { type: 'checkbox', label: 'Wait for element' },
            timeout: { type: 'number', label: 'Timeout (ms)', default: 5000 }
        },
        retryConfig: {
            maxRetries: 3,
            delay: 500
        }
    },
    typeText: {
        name: 'Type Text',
        icon: 'keyboard',
        category: 'interaction',
        properties: {
            selector: { type: 'text', label: 'CSS Selector' },
            text: { type: 'text', label: 'Text to Type' },
            submit: { type: 'checkbox', label: 'Press Enter after typing' },
            delay: { type: 'number', label: 'Typing Delay (ms)', default: 50 }
        }
    },
    dragAndDrop: {
        name: 'Drag and Drop',
        icon: 'arrows-alt',
        category: 'interaction',
        properties: {
            sourceSelector: { type: 'text', label: 'Source Element' },
            targetSelector: { type: 'text', label: 'Target Element' }
        }
    },
    scroll: {
        name: 'Scroll',
        icon: 'arrows-alt-v',
        category: 'interaction',
        properties: {
            direction: { type: 'select', label: 'Direction', options: ['up', 'down', 'top', 'bottom'] },
            amount: { type: 'number', label: 'Amount (px)' }
        }
    },

    // Wait Actions
    wait: {
        name: 'Wait',
        icon: 'clock',
        category: 'wait',
        properties: {
            duration: { type: 'number', label: 'Duration (ms)' },
            condition: { type: 'text', label: 'Wait Condition (optional)' }
        }
    },
    waitForElement: {
        name: 'Wait for Element',
        icon: 'hourglass',
        category: 'wait',
        properties: {
            selector: { type: 'text', label: 'CSS Selector' },
            timeout: { type: 'number', label: 'Timeout (ms)', default: 5000 },
            visible: { type: 'checkbox', label: 'Wait for visibility' }
        }
    },

    // Data Actions
    extractData: {
        name: 'Extract Data',
        icon: 'database',
        category: 'data',
        properties: {
            selector: { type: 'text', label: 'CSS Selector' },
            attribute: { type: 'text', label: 'Attribute (optional)' },
            variableName: { type: 'text', label: 'Save to Variable' }
        }
    },
    setVariable: {
        name: 'Set Variable',
        icon: 'pencil-alt',
        category: 'data',
        properties: {
            name: { type: 'text', label: 'Variable Name' },
            value: { type: 'text', label: 'Value' }
        }
    },

    // Flow Control
    forEach: {
        name: 'For Each',
        icon: 'repeat',
        category: 'flow',
        properties: {
            dataSource: { type: 'text', label: 'Data Source' },
            variable: { type: 'text', label: 'Iterator Variable' }
        }
    },
    condition: {
        name: 'Condition',
        icon: 'code-branch',
        category: 'flow',
        properties: {
            condition: { type: 'text', label: 'Condition' },
            trueSteps: { type: 'steps', label: 'If True' },
            falseSteps: { type: 'steps', label: 'If False' }
        }
    },
    tryCatch: {
        name: 'Try-Catch',
        icon: 'shield-alt',
        category: 'flow',
        properties: {
            trySteps: { type: 'steps', label: 'Try Steps' },
            catchSteps: { type: 'steps', label: 'Catch Steps' }
        }
    },

    // Advanced Browser Actions
    screenshot: {
        name: 'Take Screenshot',
        icon: 'camera',
        category: 'browser',
        properties: {
            selector: { type: 'text', label: 'Element Selector (optional)' },
            filename: { type: 'text', label: 'Save As' },
            fullPage: { type: 'checkbox', label: 'Full Page' }
        }
    },
    downloadFile: {
        name: 'Download File',
        icon: 'download',
        category: 'browser',
        properties: {
            url: { type: 'text', label: 'URL' },
            filename: { type: 'text', label: 'Save As' }
        }
    },
    uploadFile: {
        name: 'Upload File',
        icon: 'upload',
        category: 'browser',
        properties: {
            selector: { type: 'text', label: 'File Input Selector' },
            filepath: { type: 'text', label: 'File Path' }
        }
    },

    // Advanced Interaction
    hover: {
        name: 'Hover Element',
        icon: 'hand-pointer',
        category: 'interaction',
        properties: {
            selector: { type: 'text', label: 'Element Selector' },
            duration: { type: 'number', label: 'Duration (ms)', default: 1000 }
        }
    },
    rightClick: {
        name: 'Right Click',
        icon: 'mouse-pointer',
        category: 'interaction',
        properties: {
            selector: { type: 'text', label: 'Element Selector' }
        }
    },
    keyPress: {
        name: 'Press Key',
        icon: 'keyboard',
        category: 'interaction',
        properties: {
            key: { type: 'text', label: 'Key (e.g., Enter, Tab)' },
            modifiers: { type: 'text', label: 'Modifiers (e.g., Ctrl+Shift)' }
        }
    },

    // Data Processing
    transformData: {
        name: 'Transform Data',
        icon: 'magic',
        category: 'data',
        properties: {
            input: { type: 'text', label: 'Input Variable' },
            output: { type: 'text', label: 'Output Variable' },
            transform: { type: 'code', label: 'Transform Function' }
        }
    },
    validateData: {
        name: 'Validate Data',
        icon: 'check-circle',
        category: 'data',
        properties: {
            data: { type: 'text', label: 'Data Variable' },
            schema: { type: 'code', label: 'Validation Schema' }
        }
    },
    
    // API Actions
    httpRequest: {
        name: 'HTTP Request',
        icon: 'globe',
        category: 'api',
        properties: {
            method: { type: 'select', label: 'Method', options: ['GET', 'POST', 'PUT', 'DELETE'] },
            url: { type: 'text', label: 'URL' },
            headers: { type: 'code', label: 'Headers' },
            body: { type: 'code', label: 'Body' }
        }
    },

    // Advanced Data Processing
    filterData: {
        name: 'Filter Data',
        icon: 'filter',
        category: 'data',
        properties: {
            input: { type: 'text', label: 'Input Variable' },
            output: { type: 'text', label: 'Output Variable' },
            condition: { type: 'code', label: 'Filter Condition' }
        }
    },
    sortData: {
        name: 'Sort Data',
        icon: 'sort',
        category: 'data',
        properties: {
            input: { type: 'text', label: 'Input Variable' },
            output: { type: 'text', label: 'Output Variable' },
            key: { type: 'text', label: 'Sort Key' },
            direction: { type: 'select', label: 'Direction', options: ['asc', 'desc'] }
        }
    },
    aggregateData: {
        name: 'Aggregate Data',
        icon: 'chart-bar',
        category: 'data',
        properties: {
            input: { type: 'text', label: 'Input Variable' },
            output: { type: 'text', label: 'Output Variable' },
            groupBy: { type: 'text', label: 'Group By Key' },
            operation: { type: 'select', label: 'Operation', options: ['sum', 'avg', 'min', 'max', 'count'] }
        }
    },
    joinData: {
        name: 'Join Data',
        icon: 'object-group',
        category: 'data',
        properties: {
            left: { type: 'text', label: 'Left Variable' },
            right: { type: 'text', label: 'Right Variable' },
            output: { type: 'text', label: 'Output Variable' },
            key: { type: 'text', label: 'Join Key' },
            type: { type: 'select', label: 'Join Type', options: ['inner', 'left', 'right', 'full'] }
        }
    },
    exportData: {
        name: 'Export Data',
        icon: 'file-export',
        category: 'data',
        properties: {
            input: { type: 'text', label: 'Input Variable' },
            format: { type: 'select', label: 'Format', options: ['csv', 'json', 'excel'] },
            filename: { type: 'text', label: 'Filename' }
        }
    }
};

// Workflow templates
const workflowTemplates = {
    webScraping: {
        name: 'Web Scraping',
        description: 'Extract data from a website',
        steps: [
            {
                type: 'openTab',
                properties: { url: '', waitForLoad: true }
            },
            {
                type: 'extractData',
                properties: { selector: '', variableName: 'rawData' }
            },
            {
                type: 'transformData',
                properties: {
                    input: 'rawData',
                    output: 'processedData',
                    transform: 'return data.map(item => ({ title: item.textContent }))'
                }
            },
            {
                type: 'exportData',
                properties: {
                    input: 'processedData',
                    format: 'csv',
                    filename: 'scraped_data.csv'
                }
            }
        ]
    },
    formFilling: {
        name: 'Form Filling',
        description: 'Automatically fill and submit forms',
        steps: [
            {
                type: 'openTab',
                properties: { url: '', waitForLoad: true }
            },
            {
                type: 'forEach',
                properties: {
                    dataSource: 'formData',
                    variable: 'entry'
                }
            },
            {
                type: 'typeText',
                properties: {
                    selector: '',
                    text: '${entry.value}'
                }
            },
            {
                type: 'clickElement',
                properties: {
                    selector: 'button[type="submit"]'
                }
            }
        ]
    },
    apiIntegration: {
        name: 'API Integration',
        description: 'Fetch and process API data',
        steps: [
            {
                type: 'httpRequest',
                properties: {
                    method: 'GET',
                    url: '',
                    headers: '{"Content-Type": "application/json"}'
                }
            },
            {
                type: 'transformData',
                properties: {
                    input: 'response',
                    output: 'processedData',
                    transform: 'return data.items'
                }
            },
            {
                type: 'validateData',
                properties: {
                    data: 'processedData',
                    schema: '{"type": "array", "items": {"type": "object"}}'
                }
            }
        ]
    }
};

class AutomationDesigner {
    constructor() {
        this.workflow = [];
        this.recording = false;
        this.variables = new Map();
        this.retryDelays = [1000, 2000, 5000]; // Progressive retry delays
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;
        this.initializeDragAndDrop();
        this.initializeToolbar();
        this.initializePropertyPanel();
        this.initializeRecording();
        this.initializeUndoRedo();
        this.initializeValidation();
        this.debugMode = false;
        this.breakpoints = new Set();
        this.initializeDebugging();
    }

    initializeDragAndDrop() {
        const actionItems = document.querySelectorAll('.action-item');
        const canvas = document.getElementById('workflowCanvas');

        actionItems.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));
        });

        canvas.addEventListener('dragover', this.handleDragOver.bind(this));
        canvas.addEventListener('drop', this.handleDrop.bind(this));
    }

    initializeToolbar() {
        document.getElementById('saveWorkflow').addEventListener('click', () => this.saveWorkflow());
        document.getElementById('loadWorkflow').addEventListener('click', () => this.loadWorkflow());
        document.getElementById('runWorkflow').addEventListener('click', () => this.runWorkflow());
        document.getElementById('recordWorkflow').addEventListener('click', () => this.toggleRecording());
        document.getElementById('exportWorkflow').addEventListener('click', () => this.exportWorkflow());
        document.getElementById('importWorkflow').addEventListener('click', () => this.importWorkflow());
    }

    initializePropertyPanel() {
        this.propertiesPanel = document.getElementById('propertiesContent');
    }

    initializeRecording() {
        this.recordButton = document.getElementById('recordWorkflow');
        this.recordButton.addEventListener('click', () => this.toggleRecording());
    }

    initializeUndoRedo() {
        document.addEventListener('keydown', (e) => {
            if (e.metaKey || e.ctrlKey) {
                if (e.key === 'z' && !e.shiftKey) {
                    this.undo();
                } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
                    this.redo();
                }
            }
        });
    }

    initializeValidation() {
        this.validationRules = {
            required: (value) => value !== undefined && value !== '',
            url: (value) => /^https?:\/\/.*/.test(value),
            selector: (value) => /^[#.]?[\w-]+.*/.test(value),
            number: (value) => !isNaN(value),
            json: (value) => {
                try {
                    JSON.parse(value);
                    return true;
                } catch {
                    return false;
                }
            },
            variable: (value) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value),
            email: (value) => /^[^@]+@[^@]+\.[^@]+$/.test(value),
            phone: (value) => /^\+?[\d\s-]{10,}$/.test(value),
            date: (value) => !isNaN(Date.parse(value)),
            code: (value) => {
                try {
                    new Function('data', value);
                    return true;
                } catch {
                    return false;
                }
            }
        };
    }

    initializeDebugging() {
        this.debugControls = {
            play: document.getElementById('debugPlay'),
            pause: document.getElementById('debugPause'),
            stepOver: document.getElementById('debugStepOver'),
            stepInto: document.getElementById('debugStepInto'),
            stepOut: document.getElementById('debugStepOut')
        };

        Object.entries(this.debugControls).forEach(([action, button]) => {
            button?.addEventListener('click', () => this[action]());
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.action);
        e.target.classList.add('dragging');
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    handleDrop(e) {
        e.preventDefault();
        const actionType = e.dataTransfer.getData('text/plain');
        this.addWorkflowStep(actionType, e.clientY);
    }

    addWorkflowStep(actionType, yPosition, properties = {}) {
        const step = document.createElement('div');
        step.className = 'workflow-step';
        step.dataset.action = actionType;

        const action = actionTypes[actionType];
        step.innerHTML = `
            <div class="step-handle"></div>
            <i class="fas fa-${action.icon}"></i>
            ${action.name}
            <div class="step-connector"></div>
        `;

        const canvas = document.getElementById('workflowCanvas');
        canvas.appendChild(step);

        step.addEventListener('click', () => this.showProperties(step));
        this.makeStepDraggable(step);

        // Set properties
        for (const [key, value] of Object.entries(properties)) {
            const input = document.getElementById(key);
            if (input) {
                input.value = value;
            }
        }
    }

    showProperties(step) {
        const actionType = step.dataset.action;
        const action = actionTypes[actionType];
        
        let html = `<h4>${action.name} Properties</h4>`;
        for (const [key, prop] of Object.entries(action.properties)) {
            html += `
                <div class="property-field">
                    <label>${prop.label}</label>
                    ${this.createPropertyInput(key, prop)}
                </div>
            `;
        }

        this.propertiesPanel.innerHTML = html;
    }

    createPropertyInput(key, prop) {
        switch (prop.type) {
            case 'checkbox':
                return `<input type="checkbox" id="${key}">`;
            case 'number':
                return `<input type="number" id="${key}">`;
            case 'select':
                return `
                    <select id="${key}">
                        ${prop.options.map(option => `<option value="${option}">${option}</option>`).join('')}
                    </select>
                `;
            default:
                return `<input type="text" id="${key}">`;
        }
    }

    makeStepDraggable(step) {
        step.draggable = true;
        step.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'move-step');
            step.classList.add('dragging');
        });
    }

    async saveWorkflow() {
        const workflow = this.serializeWorkflow();
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'workflow.json',
                types: [{
                    description: 'JSON Files',
                    accept: { 'application/json': ['.json'] },
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(JSON.stringify(workflow, null, 2));
            await writable.close();
        } catch (err) {
            console.error('Failed to save workflow:', err);
        }
    }

    async loadWorkflow() {
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [{
                    description: 'JSON Files',
                    accept: { 'application/json': ['.json'] },
                }],
            });
            const file = await handle.getFile();
            const workflow = JSON.parse(await file.text());
            this.deserializeWorkflow(workflow);
        } catch (err) {
            console.error('Failed to load workflow:', err);
        }
    }

    serializeWorkflow() {
        const steps = document.querySelectorAll('.workflow-step');
        return Array.from(steps).map(step => ({
            type: step.dataset.action,
            properties: this.getStepProperties(step)
        }));
    }

    deserializeWorkflow(workflow) {
        const canvas = document.getElementById('workflowCanvas');
        canvas.innerHTML = '<div class="workflow-start">Start</div>';
        workflow.forEach(step => this.addWorkflowStep(step.type, null, step.properties));
    }

    getStepProperties(step) {
        const actionType = step.dataset.action;
        const action = actionTypes[actionType];
        const properties = {};
        
        for (const key of Object.keys(action.properties)) {
            const input = document.getElementById(key);
            if (input) {
                properties[key] = input.type === 'checkbox' ? input.checked : input.value;
            }
        }
        
        return properties;
    }

    async runWorkflow() {
        const errors = this.validateWorkflow();
        if (errors.length > 0) {
            const errorList = errors.join('\n');
            throw new Error(`Workflow validation failed:\n${errorList}`);
        }

        const workflow = this.serializeWorkflow();
        for (const step of workflow) {
            try {
                await this.executeStep(step);
            } catch (err) {
                console.error(`Error executing step ${step.type}:`, err);
                break;
            }
        }
    }

    async executeStep(step, context = {}) {
        const action = actionTypes[step.type];
        const maxRetries = action.retryConfig?.maxRetries || 1;
        const delay = action.retryConfig?.delay || 1000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.executeStepWithTimeout(step, context);
                return;
            } catch (error) {
                if (attempt === maxRetries) {
                    throw new Error(`Failed to execute ${step.type} after ${maxRetries} attempts: ${error.message}`);
                }
                console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    async executeStepWithTimeout(step, context) {
        const timeout = step.properties.timeout || 30000;
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Step execution timed out')), timeout)
        );

        return Promise.race([
            this.executeStepInternal(step, context),
            timeoutPromise
        ]);
    }

    async executeStepInternal(step, context) {
        switch (step.type) {
            case 'openTab':
                return this.executeOpenTab(step.properties);
            case 'clickElement':
                return this.executeClickElement(step.properties);
            case 'typeText':
                return this.executeTypeText(step.properties);
            case 'extractData':
                return this.executeExtractData(step.properties);
            // ... add other step type handlers
        }
    }

    async toggleRecording() {
        this.recording = !this.recording;
        this.recordButton.classList.toggle('recording', this.recording);

        if (this.recording) {
            await this.startRecording();
        } else {
            await this.stopRecording();
        }
    }

    async startRecording() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: this.injectEnhancedRecordingScript
        });

        chrome.runtime.onMessage.addListener(this.handleRecordedAction.bind(this));
    }

    async stopRecording() {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                window.stopRecording();
            }
        });
    }

    injectEnhancedRecordingScript() {
        window.recordedActions = [];
        
        const recordAction = (action) => {
            window.recordedActions.push(action);
            chrome.runtime.sendMessage({ type: 'recordedAction', action });
        };

        // Track mouse movements for hover detection
        let hoverTimer = null;
        let hoveredElement = null;

        document.addEventListener('mouseover', (e) => {
            hoveredElement = e.target;
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                recordAction({
                    type: 'hover',
                    properties: {
                        selector: generateSelector(hoveredElement),
                        duration: 1000
                    }
                });
            }, 1000);
        });

        document.addEventListener('mouseout', () => {
            clearTimeout(hoverTimer);
            hoveredElement = null;
        });

        // Track right clicks
        document.addEventListener('contextmenu', (e) => {
            recordAction({
                type: 'rightClick',
                properties: {
                    selector: generateSelector(e.target)
                }
            });
        });

        // Track file inputs
        document.addEventListener('change', (e) => {
            if (e.target.type === 'file') {
                recordAction({
                    type: 'uploadFile',
                    properties: {
                        selector: generateSelector(e.target),
                        filepath: Array.from(e.target.files).map(f => f.name).join(', ')
                    }
                });
            }
        });

        // Track keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            const modifiers = [];
            if (e.ctrlKey) modifiers.push('Ctrl');
            if (e.shiftKey) modifiers.push('Shift');
            if (e.altKey) modifiers.push('Alt');
            if (e.metaKey) modifiers.push('Meta');

            if (modifiers.length > 0 || e.key.length > 1) {
                recordAction({
                    type: 'keyPress',
                    properties: {
                        key: e.key,
                        modifiers: modifiers.join('+')
                    }
                });
            }
        });
    }

    generateSelector(element) {
        // Generate unique CSS selector for element
        let path = [];
        while (element.nodeType === Node.ELEMENT_NODE) {
            let selector = element.nodeName.toLowerCase();
            if (element.id) {
                selector += '#' + element.id;
                path.unshift(selector);
                break;
            } else {
                let sibling = element;
                let nth = 1;
                while (sibling = sibling.previousElementSibling) {
                    if (sibling.nodeName.toLowerCase() === selector) nth++;
                }
                if (nth !== 1) selector += ":nth-of-type("+nth+")";
            }
            path.unshift(selector);
            element = element.parentNode;
        }
        return path.join(' > ');
    }

    handleRecordedAction(message) {
        if (message.type === 'recordedAction') {
            this.addWorkflowStep(message.action.type, null, message.action.properties);
        }
    }

    async exportWorkflow() {
        const workflow = this.serializeWorkflow();
        const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workflow.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async importWorkflow() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const workflow = JSON.parse(event.target.result);
                    this.deserializeWorkflow(workflow);
                } catch (error) {
                    console.error('Failed to import workflow:', error);
                    alert('Invalid workflow file');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }

    saveState() {
        const state = {
            workflow: this.serializeWorkflow(),
            selectedStep: this.selectedStep ? this.selectedStep.dataset.id : null
        };
        
        this.undoStack.push(JSON.stringify(state));
        if (this.undoStack.length > this.maxUndoSteps) {
            this.undoStack.shift();
        }
        this.redoStack = [];
    }

    undo() {
        if (this.undoStack.length === 0) return;
        
        const currentState = {
            workflow: this.serializeWorkflow(),
            selectedStep: this.selectedStep ? this.selectedStep.dataset.id : null
        };
        this.redoStack.push(JSON.stringify(currentState));
        
        const previousState = JSON.parse(this.undoStack.pop());
        this.loadState(previousState);
    }

    redo() {
        if (this.redoStack.length === 0) return;
        
        const currentState = {
            workflow: this.serializeWorkflow(),
            selectedStep: this.selectedStep ? this.selectedStep.dataset.id : null
        };
        this.undoStack.push(JSON.stringify(currentState));
        
        const nextState = JSON.parse(this.redoStack.pop());
        this.loadState(nextState);
    }

    loadState(state) {
        this.deserializeWorkflow(state.workflow);
        if (state.selectedStep) {
            const step = document.querySelector(`[data-id="${state.selectedStep}"]`);
            if (step) this.showProperties(step);
        }
    }

    validateWorkflow() {
        const errors = [];
        const warnings = [];
        const workflow = this.serializeWorkflow();

        // Validate workflow structure
        if (workflow.length === 0) {
            errors.push('Workflow is empty');
            return { errors, warnings };
        }

        // Track variables for scope validation
        const declaredVariables = new Set();
        const usedVariables = new Set();

        // Validate each step
        workflow.forEach((step, index) => {
            const action = actionTypes[step.type];
            if (!action) {
                errors.push(`Step ${index + 1}: Invalid action type "${step.type}"`);
                return;
            }

            // Track variable declarations and usage
            if (step.properties.output) {
                declaredVariables.add(step.properties.output);
            }
            if (step.properties.input) {
                usedVariables.add(step.properties.input);
            }

            // Validate properties
            Object.entries(action.properties).forEach(([key, prop]) => {
                const value = step.properties[key];
                
                // Required field validation
                if (prop.required && !this.validationRules.required(value)) {
                    errors.push(`Step ${index + 1}: Missing required property "${key}"`);
                }

                // Type-specific validation
                if (value) {
                    const validationResult = this.validateProperty(prop.type, value, key);
                    if (!validationResult.isValid) {
                        errors.push(`Step ${index + 1}: ${validationResult.error}`);
                    }
                }
            });

            // Action-specific validation
            this.validateActionSpecific(step, index, errors, warnings);
        });

        // Check for undefined variables
        usedVariables.forEach(variable => {
            if (!declaredVariables.has(variable)) {
                errors.push(`Variable "${variable}" is used but never declared`);
            }
        });

        // Performance warnings
        this.checkPerformance(workflow, warnings);

        return { errors, warnings };
    }

    validateProperty(type, value, key) {
        switch (type) {
            case 'url':
                return {
                    isValid: this.validationRules.url(value),
                    error: `Invalid URL in "${key}"`
                };
            case 'selector':
                return {
                    isValid: this.validationRules.selector(value),
                    error: `Invalid selector in "${key}"`
                };
            case 'number':
                return {
                    isValid: this.validationRules.number(value),
                    error: `Invalid number in "${key}"`
                };
            case 'json':
            case 'code':
                return {
                    isValid: this.validationRules.json(value),
                    error: `Invalid ${type} in "${key}"`
                };
            case 'variable':
                return {
                    isValid: this.validationRules.variable(value),
                    error: `Invalid variable name in "${key}"`
                };
            default:
                return { isValid: true };
        }
    }

    validateActionSpecific(step, index, errors, warnings) {
        switch (step.type) {
            case 'httpRequest':
                if (step.properties.method === 'POST' && !step.properties.body) {
                    warnings.push(`Step ${index + 1}: POST request without body`);
                }
                break;
            case 'waitForElement':
                if (!step.properties.timeout) {
                    warnings.push(`Step ${index + 1}: No timeout specified for wait action`);
                }
                break;
            case 'transformData':
                try {
                    new Function('data', step.properties.transform);
                } catch (e) {
                    errors.push(`Step ${index + 1}: Invalid transform function: ${e.message}`);
                }
                break;
        }
    }

    checkPerformance(workflow, warnings) {
        // Check for excessive waits
        const totalWaitTime = workflow.reduce((sum, step) => {
            return sum + (step.type === 'wait' ? parseInt(step.properties.duration) || 0 : 0);
        }, 0);
        if (totalWaitTime > 10000) {
            warnings.push(`Workflow contains ${totalWaitTime}ms of explicit waits`);
        }

        // Check for nested loops
        let loopDepth = 0;
        workflow.forEach((step, index) => {
            if (step.type === 'forEach') {
                loopDepth++;
                if (loopDepth > 2) {
                    warnings.push(`Step ${index + 1}: Deeply nested loops may impact performance`);
                }
            } else if (step.type === 'endForEach') {
                loopDepth--;
            }
        });
    }

    toggleBreakpoint(stepId) {
        if (this.breakpoints.has(stepId)) {
            this.breakpoints.delete(stepId);
        } else {
            this.breakpoints.add(stepId);
        }
        this.updateBreakpointUI(stepId);
    }

    updateBreakpointUI(stepId) {
        const step = document.querySelector(`[data-id="${stepId}"]`);
        if (step) {
            step.classList.toggle('breakpoint', this.breakpoints.has(stepId));
        }
    }

    async debugWorkflow() {
        this.debugMode = true;
        this.currentStep = 0;
        this.callStack = [];
        this.variables.clear();

        const workflow = this.serializeWorkflow();
        while (this.currentStep < workflow.length && this.debugMode) {
            const step = workflow[this.currentStep];
            
            // Check for breakpoint
            if (this.breakpoints.has(step.id)) {
                await this.pauseExecution();
            }

            // Update UI
            this.highlightCurrentStep();
            this.updateVariablePanel();

            // Execute step
            try {
                await this.executeStep(step);
                this.logStepExecution(step, 'success');
            } catch (error) {
                this.logStepExecution(step, 'error', error);
                if (!await this.handleError(error)) {
                    break;
                }
            }

            this.currentStep++;
        }

        this.debugMode = false;
        this.clearHighlight();
    }

    async pauseExecution() {
        return new Promise(resolve => {
            this.resumeCallback = resolve;
        });
    }

    play() {
        if (this.resumeCallback) {
            this.resumeCallback();
            this.resumeCallback = null;
        }
    }

    pause() {
        this.debugMode = false;
    }

    stepOver() {
        this.play();
    }

    stepInto() {
        if (this.isStepWithChildren(this.currentStep)) {
            this.callStack.push(this.currentStep);
        }
        this.play();
    }

    stepOut() {
        if (this.callStack.length > 0) {
            this.currentStep = this.callStack.pop();
        }
        this.play();
    }

    highlightCurrentStep() {
        this.clearHighlight();
        const step = document.querySelector(`[data-id="${this.currentStep}"]`);
        if (step) {
            step.classList.add('current-step');
        }
    }

    updateVariablePanel() {
        const panel = document.getElementById('variablePanel');
        if (!panel) return;

        panel.innerHTML = '';
        for (const [name, value] of this.variables.entries()) {
            const div = document.createElement('div');
            div.className = 'variable-item';
            div.innerHTML = `
                <span class="variable-name">${name}</span>
                <span class="variable-value">${this.formatValue(value)}</span>
            `;
            panel.appendChild(div);
        }
    }

    formatValue(value) {
        if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        }
        return String(value);
    }

    logStepExecution(step, status, error = null) {
        const log = document.getElementById('executionLog');
        if (!log) return;

        const entry = document.createElement('div');
        entry.className = `log-entry ${status}`;
        entry.innerHTML = `
            <span class="step-name">${step.type}</span>
            <span class="step-status">${status}</span>
            ${error ? `<span class="error-message">${error.message}</span>` : ''}
        `;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    }

    async handleError(error) {
        return new Promise(resolve => {
            const dialog = document.createElement('div');
            dialog.className = 'error-dialog';
            dialog.innerHTML = `
                <h3>Error in step ${this.currentStep + 1}</h3>
                <p>${error.message}</p>
                <div class="error-actions">
                    <button id="continueExecution">Continue</button>
                    <button id="stopExecution">Stop</button>
                </div>
            `;
            document.body.appendChild(dialog);

            dialog.querySelector('#continueExecution').onclick = () => {
                dialog.remove();
                resolve(true);
            };

            dialog.querySelector('#stopExecution').onclick = () => {
                dialog.remove();
                resolve(false);
            };
        });
    }
}

// Layout Management
class LayoutManager {
    constructor() {
        this.container = document.querySelector('.extension-container');
        this.resizeHandle = document.querySelector('.resize-handle');
        this.toggleCollapseBtn = document.getElementById('toggleCollapse');
        this.toggleFullscreenBtn = document.getElementById('toggleFullscreen');
        this.viewModeButtons = document.querySelectorAll('.view-mode-toggle button');
        
        this.initializeResizing();
        this.initializeViewModes();
        this.initializeCollapse();
        
        // Store the last width before fullscreen
        this.lastWidth = '800px'; // Updated default width
    }
    
    initializeResizing() {
        let isResizing = false;
        let startX, startWidth;
        
        this.resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = parseInt(getComputedStyle(this.container).width, 10);
            
            this.resizeHandle.classList.add('active');
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            
            const width = startWidth - (e.clientX - startX);
            // Updated minimum width to 800px
            if (width >= 800 && width <= window.innerWidth * 0.9) {
                this.container.style.width = `${width}px`;
                this.lastWidth = `${width}px`;
            }
        });
        
        document.addEventListener('mouseup', () => {
            isResizing = false;
            this.resizeHandle.classList.remove('active');
        });
    }
    
    initializeViewModes() {
        this.viewModeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const mode = button.dataset.mode;
                
                // Update buttons
                this.viewModeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update container
                if (mode === 'fullscreen') {
                    this.container.classList.remove('sidebar-mode');
                    this.container.classList.add('fullscreen-mode');
                    this.lastWidth = this.container.style.width;
                    this.container.style.width = '100%';
                } else {
                    this.container.classList.remove('fullscreen-mode');
                    this.container.classList.add('sidebar-mode');
                    this.container.style.width = this.lastWidth;
                }
            });
        });
    }
    
    initializeCollapse() {
        this.toggleCollapseBtn.addEventListener('click', () => {
            this.container.classList.toggle('collapsed');
            
            // Update icon
            const icon = this.toggleCollapseBtn.querySelector('i');
            if (this.container.classList.contains('collapsed')) {
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            } else {
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            }
        });
        
        this.toggleFullscreenBtn.addEventListener('click', () => {
            const isFullscreen = this.container.classList.contains('fullscreen-mode');
            const fullscreenButton = document.querySelector('[data-mode="fullscreen"]');
            const sidebarButton = document.querySelector('[data-mode="sidebar"]');
            
            if (isFullscreen) {
                sidebarButton.click();
            } else {
                fullscreenButton.click();
            }
        });
    }
}

// Initialize the designer when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all MDC components
    const topAppBar = new mdc.topAppBar.MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
    const buttons = [].map.call(document.querySelectorAll('.mdc-icon-button'), function(el) {
        return new mdc.iconButton.MDCIconButtonToggle(el);
    });
    const cards = [].map.call(document.querySelectorAll('.mdc-card'), function(el) {
        return new mdc.ripple.MDCRipple(el.querySelector('.mdc-card__primary-action'));
    });

    // Initialize drawers
    const drawer = new mdc.drawer.MDCDrawer(document.querySelector('.mdc-drawer'));
    const propertyDrawer = new mdc.drawer.MDCDrawer(document.querySelector('.properties-panel'));

    window.automationDesigner = new AutomationDesigner();
    const layoutManager = new LayoutManager();
});
