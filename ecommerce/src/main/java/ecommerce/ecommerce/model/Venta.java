package ecommerce.ecommerce.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "ventas")
public class Venta {
    @Id
    private String id;
    private String vendedorId;
    private String clienteId;
    private String productos;
    private int cantidad;
    private double precioUnitario;
    private Date fecha;
    private double total;
    private double montoPagado;
    private EstadoPago estadoPago;

    public Venta() {
        this.fecha = new Date();
    }

    public Venta(String vendedorId, String clienteId, String productos, int cantidad, double precioUnitario, double total, double montoPagado, EstadoPago estadoPago) {
        this.vendedorId = vendedorId;
        this.clienteId = clienteId;
        this.productos = productos;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.total = total; 
        this.fecha = new Date();
        this.montoPagado = montoPagado;
        this.estadoPago = estadoPago;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVendedorId() {
        return vendedorId;
    }

    public void setVendedorId(String vendedorId) {
        this.vendedorId = vendedorId;
    }

    public String getClienteId() {
        return clienteId;
    }

    public void setClienteId(String clienteId) {
        this.clienteId = clienteId;
    }

    public String getProductos() {
        return productos;
    }

    public void setProductos(String productos) {
        this.productos = productos;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public double getMontoPagado() {
        return montoPagado;
    }

    public void setMontoPagado(double montoPagado) {
        this.montoPagado = montoPagado;
    }

    public EstadoPago getEstadoPago() {
        return estadoPago;
    }

    public void setEstadoPago(EstadoPago estadoPago) {
        this.estadoPago = estadoPago;
    }

    public void setCantidad(int cantidad){
        this.cantidad = cantidad;
    }

    public int getCantidad(){
        return cantidad;
    }

    public double getPrecioUnitario(){
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario){
        this.precioUnitario = precioUnitario;
    }
}
