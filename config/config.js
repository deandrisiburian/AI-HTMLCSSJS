// Konfigurasi OpenRouter
const OPENROUTER_CONFIG = {
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    API_KEY: 'YOUR_API_KEY', // Ganti dengan API key Anda
    SITE_URL: window.location.origin,
    SITE_NAME: 'EpanD AI'
};

// Model yang tersedia
const AVAILABLE_MODELS = [
    { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'openai/gpt-4', name: 'GPT-4' },
    { id: 'anthropic/claude-2', name: 'Claude 2' },
    { id: 'google/palm-2', name: 'Google PaLM 2' },
    { id: 'meta-llama/llama-2-70b', name: 'Llama 2 70B' },
    { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
    { id: 'codellama/codellama-34b-instruct', name: 'CodeLlama 34B' }
];
