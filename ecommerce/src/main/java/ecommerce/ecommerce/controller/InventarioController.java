package ecommerce.ecommerce.controller;

import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.service.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/inventario")
public class InventarioController {
    @Autowired
    private InventarioService inventarioService;

    @GetMapping
    public List<Producto> obtenerTodosLosProductos() {
        return inventarioService.obtenerTodosLosProductos();
    }

    @GetMapping("/{id}")
    public Optional<Producto> obtenerProductoPorId(@PathVariable String id) {
        return inventarioService.obtenerProductoPorId(id);
    }

    @PostMapping("/crear")
    public Producto agregarProducto(@RequestBody Producto producto) {
        return inventarioService.agregarProducto(producto);
    }

    @PutMapping
    public Producto actualizarProducto(@RequestBody Producto producto) {
        return inventarioService.actualizarProducto(producto);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable String id) {
        inventarioService.eliminarProducto(id);
    }
}

