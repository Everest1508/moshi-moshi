// Configuration file for Movie Chat Extension
const CONFIG = {
  // Development server (localhost)
  development: {
    websocketUrl: 'ws://localhost:3000',
    serverUrl: 'http://localhost:3000'
  },
  
  // Production server
  production: {
    websocketUrl: 'wss://api.moshi-moshi.encryptedbar.com',
    serverUrl: 'https://api.moshi-moshi.encryptedbar.com'
  }
};

// Current environment - change this when deploying
const CURRENT_ENV = 'production'; // Change to 'production' when deploying

// Export the current configuration
const CURRENT_CONFIG = CONFIG[CURRENT_ENV];

// Make it available globally
if (typeof window !== 'undefined') {
  window.MOVIE_CHAT_CONFIG = CURRENT_CONFIG;
}
