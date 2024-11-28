package ecommerce.ecommerce.service;

import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioService {
    @Autowired
    private InventarioRepository inventarioRepository;

    public List<Producto> obtenerTodosLosProductos() {
        return inventarioRepository.findAll();
    }

    public Optional<Producto> obtenerProductoPorId(String id) {
        return inventarioRepository.findById(id);
    }

    public Producto agregarProducto(Producto producto) {
        return inventarioRepository.save(producto);
    }

    public Producto actualizarProducto(Producto producto) {
        return inventarioRepository.save(producto);
    }

    public void eliminarProducto(String id) {
        inventarioRepository.deleteById(id);
    }
}

