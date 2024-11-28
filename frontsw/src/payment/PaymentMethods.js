import React, { useState } from 'react';
import './PaymentMethods.css';

function PaymentMethods({ onClose }) {
  const [selectedMethod, setSelectedMethod] = useState('');

  const handlePayment = () => {
    console.log('Método de pago seleccionado:', selectedMethod);
    // Aquí puedes agregar la lógica de procesamiento de pago
    onClose();
  };

  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Selecciona un método de pago</h2>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="paypal"
              checked={selectedMethod === 'paypal'}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              value="credit-card"
              checked={selectedMethod === 'credit-card'}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Tarjeta de Crédito
          </label>
        </div>
        <button onClick={handlePayment} disabled={!selectedMethod}>Proceder con el pago</button>
      </div>
    </div>
  );
}

export default PaymentMethods;
