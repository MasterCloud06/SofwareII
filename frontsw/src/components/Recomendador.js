import React, { useState } from 'react';
import getRecomendaciones from '../service/recomendacionService';
import Producto from './Producto';

const Recomendador = () => {
    const [evento, setEvento] = useState('');
    const [genero, setGenero] = useState('');
    const [edad, setEdad] = useState('');
    const [intereses, setIntereses] = useState('');
    const [minPrecio, setMinPrecio] = useState('');
    const [maxPrecio, setMaxPrecio] = useState('');
    const [productos, setProductos] = useState([]);

    const handleBuscar = async () => {
        try {
            const recomendaciones = await getRecomendaciones(evento, genero, edad, intereses, minPrecio, maxPrecio);
            setProductos(recomendaciones);
        } catch (error) {
            console.error("Error obteniendo recomendaciones:", error);
        }
    };

    return (
        <div className="admin-categories">
            <div className="admin-categories-form">
                <h2> Recomendador de Regalos</h2>
                <form>
                    <div className="form-group">
                        <label>Evento</label>
                        <input
                            type="text"
                            value={evento}
                            onChange={(e) => setEvento(e.target.value)}
                            placeholder="Describe tu evento"
                        />
                    </div>
                    <div className="form-group">
                        <label>Género</label>
                        <input
                            type="text"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            placeholder="Género"
                        />
                    </div>
                    <div className="form-group">
                        <label>Edad</label>
                        <input
                            type="number"
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            placeholder="Edad"
                        />
                    </div>
                    <div className="form-group">
                        <label>Intereses o Gusto</label>
                        <input
                            type="text"
                            value={intereses}
                            onChange={(e) => setIntereses(e.target.value)}
                            placeholder="Intereses"
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio Minimo</label>
                        <input
                            type="number"
                            value={minPrecio}
                            onChange={(e) => setMinPrecio(e.target.value)}
                            placeholder="Precio mínimo"
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio Maximo</label>
                        <input
                            type="number"
                            value={maxPrecio}
                            onChange={(e) => setMaxPrecio(e.target.value)}
                            placeholder="Precio máximo"
                        />
                    </div>
                    <button type="button" onClick={handleBuscar}>Buscar</button>
                    <ul>
                        {productos.map((producto) => (
                            <li key={producto.id}>{producto.nombre}</li>
                        ))}
                    </ul>
                </form>
            </div>
            <div className="productos-list">
                {productos.map((producto) => (
                    <Producto key={producto.id} producto={producto} />
                ))}
            </div>
        </div>
    );
};

export default Recomendador;
