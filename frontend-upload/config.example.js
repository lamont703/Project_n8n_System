/**
 * Frontend Upload Configuration Template
 * 
 * SECURITY INSTRUCTIONS:
 * 1. Copy this file to: script-local.js
 * 2. Replace the placeholder values with your actual credentials
 * 3. Use script-local.js for development (this file is in .gitignore)
 * 4. NEVER commit real API keys to version control
 */

// Assembly AI Configuration - Replace with your actual API key
const ASSEMBLYAI_API_KEY = 'YOUR_ASSEMBLYAI_API_KEY_HERE'; // Get from: https://www.assemblyai.com/dashboard

// n8n Webhook Configuration - Replace with your actual webhook URL  
const N8N_WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL_HERE"; // Get from your n8n workflow

// Instructions to get your API keys:
//
// 1. ASSEMBLY AI API KEY:
//    - Go to: https://www.assemblyai.com/dashboard
//    - Sign up or log in
//    - Navigate to your API Keys section
//    - Copy your API key (starts with: a long alphanumeric string)
//
// 2. N8N WEBHOOK URL:
//    - Open your n8n workflow
//    - Find the Webhook node
//    - Copy the webhook URL (looks like: https://your-n8n.app.n8n.cloud/webhook/...)
//
// 3. SETUP PROCESS:
//    - Copy this file to: script-local.js
//    - Replace the placeholder values above
//    - Update the script.js import to use script-local.js for development
//
// 4. PRODUCTION DEPLOYMENT:
//    - Use environment variables or secure configuration management
//    - Never expose API keys in client-side code for production apps
//    - Consider server-side proxy for API calls in production

// Example of what your real values should look like:
// const ASSEMBLYAI_API_KEY = 'abc123def456ghi789...'; // Real API key (32+ characters)
// const N8N_WEBHOOK_URL = "https://your-n8n.app.n8n.cloud/webhook/c0b2e4e8-c7b1-41c1-8e6e-db02f612b80d"; 