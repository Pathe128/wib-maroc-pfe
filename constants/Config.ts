// Pour Expo/React Native, il est recommandé d'utiliser app.config.js/app.json pour injecter les variables d'environnement
// et d'accéder à la clé via Constants.manifest.extra
import Constants from 'expo-constants';

export const OPENROUTER_API_KEY = Constants.manifest?.extra?.OPENROUTER_API_KEY;

export const AI_CONFIG = {
  MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 500,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  FREQUENCY_PENALTY: 0.1,
  PRESENCE_PENALTY: 0.1
};

// Utilisation :
// 1. Ajoute dans app.config.js ou app.json :
//   "extra": {
//     "OPENROUTER_API_KEY": "ta_nouvelle_cle"
//   }
// 2. Ajoute app.config.js/app.json à ton .gitignore si tu veux garder la clé secrète en local
// 3. Accède à la clé dans ton code via OPENROUTER_API_KEY

// Configuration de l'application WIB Maroc
export const CONFIG = {
  // Configuration de l'IA
  AI: {
    MODEL: 'gpt-3.5-turbo', // Changé de gpt-4 vers gpt-3.5-turbo
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7,
    TOP_P: 0.9,
    FREQUENCY_PENALTY: 0.1,
    PRESENCE_PENALTY: 0.1
  },
  
  // Configuration de l'application
  APP: {
    NAME: 'WIB Maroc',
    VERSION: '1.0.0',
    SUPPORT_EMAIL: 'support@wibmaroc.ma'
  }
}; 