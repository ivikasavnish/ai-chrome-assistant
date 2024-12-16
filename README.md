# AI Chrome Assistant

A Chrome extension that integrates multiple AI models including GPT-3.5, Claude, Llama 2, and Mistral through Ollama.

## Features

- Multiple AI model support
- Clean, modern UI
- Context-aware responses
- Easy model switching
- Local Ollama integration

## Setup

### Backend Server

1. Install Python requirements:
```bash
cd server
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
export OPENAI_API_KEY="your-openai-key"
export ANTHROPIC_API_KEY="your-anthropic-key"
```

3. Start the server:
```bash
python app.py
```

### Ollama Setup

1. Install Ollama from https://ollama.ai/
2. Pull required models:
```bash
ollama pull llama2
ollama pull mistral
```

### Chrome Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `src` directory

## Usage

1. Click the extension icon to open the chat interface
2. Select your preferred AI model
3. Type your message and press Enter or click Send
4. The AI will respond based on the selected model

## Architecture

- Frontend: Chrome Extension (HTML, CSS, JavaScript)
- Backend: FastAPI Python server
- AI Models:
  - OpenAI GPT-3.5
  - Anthropic Claude
  - Llama 2 (via Ollama)
  - Mistral (via Ollama)

## Development

To modify the extension:
1. Edit files in the `src` directory
2. Reload the extension in Chrome

To modify the server:
1. Edit `server/app.py`
2. Restart the server

## License

MIT License
