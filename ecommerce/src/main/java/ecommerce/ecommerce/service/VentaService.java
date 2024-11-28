package ecommerce.ecommerce.service;

import java.time.LocalDate;
import java.time.DayOfWeek;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.model.Venta;
import ecommerce.ecommerce.repository.VentaRepository;
import ecommerce.ecommerce.repository.ProductoRepository;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Venta realizarVenta(Venta ventaRequest) {
        String[] productosIds = ventaRequest.getProductos().split(",");

        for (String productoId : productosIds) {
            Producto producto = productoRepository.findById(productoId.trim()).orElseThrow(() -> new RuntimeException("Producto no encontrado: " + productoId));

            if (producto.getCantidad() < ventaRequest.getCantidad()) {
                throw new RuntimeException("No hay suficiente stock para el producto: " + producto.getNombre());
            }

            producto.setCantidad(producto.getCantidad() - ventaRequest.getCantidad());
            productoRepository.save(producto);
        }
        double total = ventaRequest.getCantidad() * ventaRequest.getPrecioUnitario();
        ventaRequest.setTotal(total);

        return ventaRepository.save(ventaRequest);
    }

    public void eliminarVenta(String id) {
        ventaRepository.deleteById(id);
    }

    public List<Venta> obtenerVentasPorVendedor(String vendedorId) {
        return ventaRepository.findByVendedorId(vendedorId);
    }

    public List<Venta> obtenerTodasLasVentas() {
      return ventaRepository.findAll();
    }

    public List<Venta> obtenerVentasPorPeriodo(Date inicio, Date fin) {
        return ventaRepository.findByFechaBetween(inicio, fin);
    } 

    public List<Venta> obtenerVentasDiarias() {
        LocalDate hoy = LocalDate.now();
        Date inicio = Date.from(hoy.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(hoy.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return obtenerVentasPorPeriodo(inicio, fin);
    }

    public List<Venta> obtenerVentasSemanales() {
        LocalDate hoy = LocalDate.now();
        LocalDate inicioSemana = hoy.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate finSemana = hoy.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        Date inicio = Date.from(inicioSemana.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(finSemana.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return obtenerVentasPorPeriodo(inicio, fin);
    }

    public List<Venta> obtenerVentasMensuales() {
        LocalDate hoy = LocalDate.now();
        LocalDate inicioMes = hoy.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate finMes = hoy.with(TemporalAdjusters.lastDayOfMonth());
        Date inicio = Date.from(inicioMes.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(finMes.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return obtenerVentasPorPeriodo(inicio, fin);
    }

    public List<Venta> obtenerVentasAnuales() {
        LocalDate hoy = LocalDate.now();
        LocalDate inicioAno = hoy.with(TemporalAdjusters.firstDayOfYear());
        LocalDate finAno = hoy.with(TemporalAdjusters.lastDayOfYear());
        Date inicio = Date.from(inicioAno.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(finAno.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        return obtenerVentasPorPeriodo(inicio, fin);
    }
}

