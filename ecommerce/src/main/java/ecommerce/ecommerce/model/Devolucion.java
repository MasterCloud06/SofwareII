package ecommerce.ecommerce.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "devoluciones")
public class Devolucion {
    @Id
    private String id;
    private String productoId;
    private String motivo;
    private List<Producto> productos;

    // Constructor, getters y setters

    public Devolucion() {
    }

    public Devolucion(String productoId, String motivo, List<Producto> productos) {
        this.productoId = productoId;
        this.motivo = motivo;
        this.productos = productos;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductoId() {
        return productoId;
    }

    public void setProductoId(String productoId) {
        this.productoId = productoId;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }

}
