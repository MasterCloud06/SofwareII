// src/components/Feedback.js
import React, { useState } from 'react';
import analyzeFeedback from '../service/feedbackService';

const Feedback = ({ productId }) => {
    const [feedback, setFeedback] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const sentimentResult = await analyzeFeedback(productId, feedback);
            setResult(sentimentResult);
            setError(null);
        } catch (error) {
            setError("Error analizando el feedback");
            setResult(null);
        }
    };

    return (
        <div className="feedback-form">
            <h2>Enviar Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Feedback</label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Escribe tu feedback aquí"
                        rows="4"
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {result && (
                <div className="feedback-result">
                    <h3>Resultado del Análisis de Sentimiento</h3>
                    <p>{result}</p>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Feedback;
