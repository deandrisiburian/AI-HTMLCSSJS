// Konfigurasi OpenRouter
const OPENROUTER_CONFIG = {
    API_URL: 'https://openrouter.ai/api/v1/chat/completions',
    API_KEY: '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', // Ganti dengan API key Anda
    SITE_URL: window.location.origin,
    SITE_NAME: 'EpanD AI'
};

// Model yang tersedia
const AVAILABLE_MODELS = [
    { id: 'nvidia/nemotron-nano-9b-v2:free', name: 'Nemotron Nano 9B V2' },
    { id: 'openai/gpt-4', name: 'GPT-4' },
    { id: 'anthropic/claude-2', name: 'Claude 2' },
];
