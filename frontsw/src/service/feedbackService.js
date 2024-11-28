// src/service/feedbackService.js
import axios from 'axios';

const analyzeFeedback = async (productId, feedback) => {
    try {
        const response = await axios.post('http://localhost:8081/analyze/feedback', feedback, {
            params: {
                productId
            },
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error analizando el feedback:", error);
        throw error;
    }
};

export default analyzeFeedback;
