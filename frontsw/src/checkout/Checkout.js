import React, { useContext, useState, useRef } from 'react';
import { CartContext } from '../CartContext';
import './Checkout.css';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';


function Checkout() {
  const { cart } = useContext(CartContext);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const msgs = useRef(null);

  useMountEffect(() => {
    if (msgs.current) {
      msgs.current.clear();
      msgs.current.show({
        severity: 'info',
        sticky: true,
        content: (
          <React.Fragment>
            <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" width="32" />
            <div className="ml-2">Su Compra ha sido Procesada</div>
          </React.Fragment>
        )
      });
      console.log(msgs);
    }
  });

  const total = cart.reduce((accumulator, item) => {
    return accumulator + (item.precio * 1);
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
  
    const precioUnitario = cart[0]?.precio || 0; // Asume el precio del primer producto
    const total = cart.reduce((accumulator, item) => accumulator + (item.precio * 1), 0);
    const formData = new FormData(e.target);
    const productos = cart.map(product => product.id).join(","); // Asumiendo que `cart` contiene los productos
  
    const ventaData = {
      vendedorId: 'id_del_vendedor', // Sustituye con el ID del vendedor correcto
      clienteId: formData.get('email'), // Ejemplo: obtén el correo electrónico del formulario
      productos: productos,
      cantidad: cart.reduce((acc, item) => acc + 1, 0), // Suma de cantidades en el carrito
      precioUnitario: precioUnitario, // Ajusta según tu lógica
      total: total, // Ajusta según tu lógica
      montoPagado: total, // Inicializa según tu lógica
      estadoPago: formData.get('selectedMethod') === 'paypal' ? 'PAGO_COMPLETO' : 'PAGO_PARCIAL' // Ajusta según el método de pago seleccionado
    };
  
    try {
      const response = await fetch('http://localhost:8081/ventas/realizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ventaData),
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Venta realizada con éxito:', data);
      setPaymentConfirmed(true); // Cambia el estado para mostrar el mensaje de confirmación
    } catch (error) {
      console.error('Error al realizar la venta:', error.message);
      // Maneja el error en tu aplicación
    }
  };
  

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handlePayment}>
        <h2>Contacto</h2>
        <input type="email" placeholder="Tu correo electrónico" required />
        <label className="checkbox-label">
          <input type="checkbox" />
          Envíame un correo electrónico con noticias y ofertas.
        </label>

        <h2>Entrega</h2>
        <div className="delivery-options">
          <label className="radio-label">
            <input type="radio" name="delivery" value="barco" required />
            Barco
          </label>
          <label className="radio-label">
            <input type="radio" name="delivery" value="levantar" required />
            Levantar
          </label>
        </div>

        <h2>Dirección</h2>
        <div className="address-fields">
          <input type="text" placeholder="Nombre de pila" required />
          <input type="text" placeholder="Apellido" required />
          <input type="text" placeholder="Dirección" required />
          <input type="text" placeholder="Apartamento, suite, etc. (opcional)" />
          <input type="text" placeholder="Ciudad" required />
          <select required>
            <option value="">Estado</option>
            <option value="alabama">Alabama</option>
            <option value="bolivia">Bolivia</option>
            {/* Agrega los demás estados aquí */}
          </select>
          <input type="text" placeholder="Código postal" required />
          <input type="tel" placeholder="Teléfono" required />
        </div>

        <label className="checkbox-label">
          <input type="checkbox" />
          Envíame mensajes de texto con noticias y ofertas.
        </label>

        <h2>Método de pago</h2>
        <div className="payment-options">
          <label className="radio-label">
            <input
              type="radio"
              value="paypal"
              checked={selectedMethod === 'paypal'}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            PayPal
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="credit-card"
              checked={selectedMethod === 'credit-card'}
              onChange={(e) => setSelectedMethod(e.target.value)}
            />
            Tarjeta de Crédito
          </label>
        </div>

        {selectedMethod === 'credit-card' && (
          <div className="credit-card-info">
            <input type="text" placeholder="Número de tarjeta" required />
            <div className="credit-card-details">
              <input type="text" placeholder="Fecha de expiración (MM/YY)" required />
              <input type="text" placeholder="Código de seguridad" required />
            </div>
            <input type="text" placeholder="Nombre en la tarjeta" required />
            <label className="checkbox-label">
              <input type="checkbox" />
              Usar la dirección de envío como dirección de facturación
            </label>
          </div>
        )}

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={paymentCompleted}
            onChange={(e) => setPaymentCompleted(e.target.checked)}
          />
          Pago completado
        </label>


        <button type="submit">Completar Pago</button>
      </form>

      <div className="order-summary">
        <h2>Resumen del Pedido</h2>
        {cart.map((product, index) => (
          <div key={index} className="order-item">
            <img src={product.imagen} alt={product.nombre} />
            <div className="order-item-details">
              <h3>{product.nombre}</h3>
              <p>{product.precio}</p>
            </div>
          </div>
        ))}
        <div className="order-total">
          <p>Total parcial: ${total}</p>
          <p>Envío: <span>Gratis</span></p>
          <h3>Total: ${total}</h3>
        </div>
      </div>
      {paymentConfirmed && (
        <div className="card">
          <Messages ref={msgs} />
          <p>Su Compra ha sido procesada</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
