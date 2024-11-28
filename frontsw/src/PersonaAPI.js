import axios from "axios";
export class PersonaService {
    baseUrl = "http://localhost:8081/"
    getAll() {
        return axios.get(this.baseUrl + "catalogos").then(res => res.data);
    }

    getDevolucion() {
        return axios.get(this.baseUrl + "devoluciones").then(res => res.data);
    }

    getimagen() {
        return axios.get(this.baseUrl + 'uploads').then(res => res.data);
    }

    getInfoProduct(id) {
        const url = `${this.baseUrl}productos/ver/${id}`;
        return axios.get(url).then(res => res.data);
    }

    getUsuarios(id) {
        const url = `${this.baseUrl}auth/${id}`;
        return axios.get(url).then(res => res.data);
    }

    getCompras() {
        return axios.get(this.baseUrl + "compras").then(res => res.data);
    }

    saveP(productos) {
        return axios.post(this.baseUrl + "productos/crear", productos).then(res => res.data);
    }

    registrar(usuario) {
        return axios.post(this.baseUrl + "auth/register", usuario).then(res => res.data);
    }

    save(catalogos) {
        return axios.post(this.baseUrl + "catalogos/crear", catalogos).then(res => res.data);
    }

    getProducto() {
        return axios.get(this.baseUrl + "productos").then(res => res.data);
    }

    getUser() {
        return axios.get(this.baseUrl + "auth").then(res => res.data);
    }

    getInventario() {
        return axios.get(this.baseUrl + "inventario").then(res => res.data);
    }

    getVentas() {
        return axios.get(this.baseUrl + "ventas").then(res => res.data);
    }

    async crearCompra(usuarioId, compraData) {
        try {
            const url = `http://localhost:8081/compras/crear?usuarioId=${usuarioId}`;
            console.log('url:',url);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compraData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error('Error en la solicitud: ' + JSON.stringify(errorResponse));
            }
    
            return response.json();
        } catch (error) {
            throw new Error('Error en la solicitud: ' + error.message);
        }

    }


    updateCompra(compra) {
        const url = `${this.comprasUrl}/${compra.id}`;
        return axios.put(url, compra)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    actualizarVenta(ventaData) {
        const url = `${this.ventasUrl}/${ventaData.id}`;
        return axios.put(url, ventaData)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}