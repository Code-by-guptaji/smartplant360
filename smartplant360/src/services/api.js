// Placeholder REST client for the future Node.js/Express + MongoDB backend
// and the Python FastAPI AI microservice. Every function currently resolves
// with data from services/dummyData.js so the UI can be developed against a
// stable contract before the real backend exists.
//
// Swap the body of each function for a fetch()/axios call once the backend
// is live — component code should not need to change.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const AI_BASE_URL = import.meta.env.VITE_AI_BASE_URL || 'http://localhost:8000/ai';

export const api = {
  baseUrl: BASE_URL,
  aiBaseUrl: AI_BASE_URL,

  async login(email, password) {
    // Future: POST `${BASE_URL}/auth/login`
    return new Promise((resolve) => {
      setTimeout(() => resolve({ token: 'demo-jwt-token', email }), 600);
    });
  },

  async askAssistant(prompt) {
    // Future: POST `${AI_BASE_URL}/query` -> FastAPI + LLM orchestration
    return new Promise((resolve) => {
      setTimeout(() => resolve({ answer: null }), 500);
    });
  },
};

export default api;
