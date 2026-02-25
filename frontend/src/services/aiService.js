import apiClient from './api';

/**
 * Sends a message in the chat interface to the AI assistant.
 * @param {Object} data payload with { message, disasterType, location, lang }
 * @returns {Promise<Object>} API response including { ok, reply }
 */
export const sendChatMessage = async (data) => {
    try {
        const response = await apiClient.post('/chain-of-thought', data);
        return response.data;
    } catch (error) {
        console.error('Error in sendChatMessage:', error);
        throw error?.response?.data || new Error('Failed to send message');
    }
};

/**
 * Generates an AI-powered checklist for preparedness.
 * @param {Object} data payload with { disasterType, location, lang }
 * @returns {Promise<Object>} API response including { ok, reasoning }
 */
export const generateChecklist = async (data) => {
    try {
        const response = await apiClient.post('/chain-of-thought', data);
        return response.data;
    } catch (error) {
        console.error('Error in generateChecklist:', error);
        throw error?.response?.data || new Error('Failed to generate checklist');
    }
};
