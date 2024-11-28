package ecommerce.ecommerce.controller;

import ecommerce.ecommerce.model.Compra;
import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDate;
@RestController
@RequestMapping("/compras")
public class CompraController {
    @Autowired
    private CompraService compraService;

    @PostMapping("/crear")
    public Compra realizarCompra(@RequestParam String usuarioId, @RequestBody List<Producto> productos, int cantidad, LocalDate fecha, double total) {
        return compraService.realizarCompra(usuarioId, productos, cantidad, fecha, total);
    }

    @GetMapping("/{usuarioId}")
    public List<Compra> obtenerComprasPorUsuario(@PathVariable String usuarioId) {
        return compraService.obtenerComprasPorUsuario(usuarioId);
    }

    @GetMapping
    public List<Compra> obtenerTodasLasCompras() {
        return compraService.obtenerTodasLasCompras();
    }

    @PutMapping("/{compraId}")
    public ResponseEntity<Compra> editarCompra(@PathVariable String compraId, @RequestBody List<Producto> nuevosProductos) {
        try {
            Compra compraEditada = compraService.editarCompra(compraId, nuevosProductos);
            return ResponseEntity.ok(compraEditada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{compraId}")
    public ResponseEntity<Void> eliminarCompra(@PathVariable String compraId) {
        try {
            compraService.eliminarCompra(compraId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
