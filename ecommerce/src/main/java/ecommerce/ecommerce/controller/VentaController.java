package ecommerce.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerce.ecommerce.service.VentaService;
import ecommerce.ecommerce.model.Venta;

@RestController
@RequestMapping("/ventas") 
public class VentaController {
    @Autowired
    private VentaService ventaService;

    @PostMapping("/realizar")
    public ResponseEntity<Venta> realizarVenta(@RequestBody Venta ventaRequest) {
        try {
            Venta venta = ventaService.realizarVenta(ventaRequest);
            return new ResponseEntity<>(venta, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{vendedorId}")
    public List<Venta> obtenerVentasPorVendedor(@PathVariable String vendedorId) {
        return ventaService.obtenerVentasPorVendedor(vendedorId);
    }

   @GetMapping
public ResponseEntity<List<Venta>> obtenerTodasLasVentas() {
    List<Venta> ventas = ventaService.obtenerTodasLasVentas();
    return ResponseEntity.ok(ventas);
}

    @GetMapping("/reporte/diario")
    public ResponseEntity<List<Venta>> obtenerVentasDiarias() {
        List<Venta> ventas = ventaService.obtenerVentasDiarias();
        return ResponseEntity.ok(ventas);
    }

    @GetMapping("/reporte/semanal")
    public ResponseEntity<List<Venta>> obtenerVentasSemanales() {
        List<Venta> ventas = ventaService.obtenerVentasSemanales();
        return ResponseEntity.ok(ventas);
    }

    @GetMapping("/reporte/mensual")
    public ResponseEntity<List<Venta>> obtenerVentasMensuales() {
        List<Venta> ventas = ventaService.obtenerVentasMensuales();
        return ResponseEntity.ok(ventas);
    }

    @GetMapping("/reporte/anual")
    public ResponseEntity<List<Venta>> obtenerVentasAnuales() {
        List<Venta> ventas = ventaService.obtenerVentasAnuales();
        return ResponseEntity.ok(ventas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVenta(@PathVariable String id) {
        ventaService.eliminarVenta(id);
        return ResponseEntity.noContent().build();
    }

}
