// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// API endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`,
    
    // Chat endpoints
    CHAT: `${API_BASE_URL}/api/chat`,
    
    // Thread endpoints
    THREADS: `${API_BASE_URL}/api/thread`,
};

// Default fetch options with credentials
export const DEFAULT_FETCH_OPTIONS = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
};

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
    const response = await fetch(endpoint, {
        ...DEFAULT_FETCH_OPTIONS,
        ...options,
    });
    
    return response;
};

export default API_BASE_URL;