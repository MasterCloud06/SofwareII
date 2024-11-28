// src/services/productoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8081';

export const recomendarProductos = (evento) => {
    return axios.post(`${API_URL}/recomendar`, { evento });
};
