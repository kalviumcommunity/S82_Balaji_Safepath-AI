import axios from 'axios';

// Abstracted Axios instance for backend API calls
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optionally, interceptors can be added here for auth tokens, error handling, etc.

export default apiClient;
