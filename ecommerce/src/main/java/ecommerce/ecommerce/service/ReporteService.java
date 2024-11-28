package ecommerce.ecommerce.service;

import ecommerce.ecommerce.model.Compra;
import ecommerce.ecommerce.model.Venta;
import ecommerce.ecommerce.repository.CompraRepository;
import ecommerce.ecommerce.repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReporteService {
    @Autowired
    private VentaRepository ventaRepository;

    @Autowired
    private CompraRepository compraRepository;

    public Map<String, Object> generarReporteCompras() {
        List<Compra> compras = compraRepository.findAll();
        
        double totalCompras = compras.stream().mapToDouble(Compra::getTotal).sum();
        
        Map<String, Long> productosComprados = compras.stream()
            .flatMap(compra -> compra.getProductos().stream())
            .collect(Collectors.groupingBy(p -> p.getNombre(), Collectors.counting()));

        return Map.of(
            "totalCompras", totalCompras,
            "productosComprados", productosComprados
        );
    }

    private Map<String, Object> crearReporte(String tipoReporte, LocalDate fecha, long cantidadCompras, double totalCompras) {
        Map<String, Object> reporte = new HashMap<>();
        reporte.put("tipoReporte", tipoReporte);
        reporte.put("fecha", fecha);
        reporte.put("cantidadCompras", cantidadCompras);
        reporte.put("totalCompras", totalCompras);
        return reporte;
    }

    public Map<String, Object> generarReporteVentasDiarias() {
        LocalDate hoy = LocalDate.now();
        Date inicio = Date.from(hoy.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(hoy.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Venta> ventas = ventaRepository.findByFechaBetween(inicio, fin);

        double totalVentas = ventas.stream().mapToDouble(Venta::getTotal).sum();
        long cantidadVentas = ventas.size();

        return crearReporte("Ventas Diarias", hoy, cantidadVentas, totalVentas);
    }

    public Map<String, Object> generarReporteVentasSemanales() {
        LocalDate hoy = LocalDate.now();
        LocalDate inicioSemana = hoy.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate finSemana = hoy.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        Date inicio = Date.from(inicioSemana.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(finSemana.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Venta> ventas = ventaRepository.findByFechaBetween(inicio, fin);

        double totalVentas = ventas.stream().mapToDouble(Venta::getTotal).sum();
        long cantidadVentas = ventas.size();

        return crearReporte("Ventas Semanales", hoy, cantidadVentas, totalVentas);
    }

    public Map<String, Object> generarReporteVentasMensuales() {
        LocalDate hoy = LocalDate.now();
        LocalDate inicioMes = hoy.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate finMes = hoy.with(TemporalAdjusters.lastDayOfMonth());
        Date inicio = Date.from(inicioMes.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(finMes.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Venta> ventas = ventaRepository.findByFechaBetween(inicio, fin);

        double totalVentas = ventas.stream().mapToDouble(Venta::getTotal).sum();
        long cantidadVentas = ventas.size();

        return crearReporte("Ventas Mensuales", hoy, cantidadVentas, totalVentas);
    }

    public Map<String, Object> generarReporteVentasAnuales() {
        LocalDate hoy = LocalDate.now();
        LocalDate inicioAno = hoy.with(TemporalAdjusters.firstDayOfYear());
        LocalDate finAno = hoy.with(TemporalAdjusters.lastDayOfYear());
        Date inicio = Date.from(inicioAno.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date fin = Date.from(finAno.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        List<Venta> ventas = ventaRepository.findByFechaBetween(inicio, fin);

        double totalVentas = ventas.stream().mapToDouble(Venta::getTotal).sum();
        long cantidadVentas = ventas.size();

        return crearReporte("Ventas Anuales", hoy, cantidadVentas, totalVentas);
    }

}

