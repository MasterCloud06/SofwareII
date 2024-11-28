import axios from 'axios';

const API_URL = 'http://localhost:8081/api/recommendations'; // Cambia la URL si es necesario

const getRecomendaciones = async (occasion, gender, age, interests, minPrice, maxPrice) => {
    const params = { occasion, gender, age, interests, minPrice, maxPrice };
    const response = await axios.get(API_URL, { params });
    return response.data;
};

export default getRecomendaciones;
