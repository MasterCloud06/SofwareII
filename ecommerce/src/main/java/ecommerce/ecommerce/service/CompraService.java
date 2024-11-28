package ecommerce.ecommerce.service;

import ecommerce.ecommerce.model.Compra;
import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.repository.CompraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CompraService {
    @Autowired
    private CompraRepository compraRepository;

    public Compra realizarCompra(String usuarioId, List<Producto> productos, int cantidad, LocalDate fecha, double total) {
        Compra compra = new Compra();
        compra.setUsuarioId(usuarioId);
        compra.setProductos(productos);
        compra.setCantidad(cantidad);
        compra.setFecha(fecha); 
        compra.setTotal(total);
        return compraRepository.save(compra);
    }

    public List<Compra> obtenerComprasPorUsuario(String usuarioId) {
        return compraRepository.findByUsuarioId(usuarioId);
    }

    public List<Compra> obtenerTodasLasCompras(){
        return compraRepository.findAll();
    }

    public Compra editarCompra(String compraId, List<Producto> nuevosProductos) {
        Compra compraExistente = compraRepository.findById(compraId).orElse(null);
        if (compraExistente == null) {
            throw new RuntimeException("Compra no encontrada con ID: " + compraId);
        }
        
        compraExistente.setProductos(nuevosProductos);
        compraExistente.setTotal(nuevosProductos.stream().mapToDouble(p -> p.getPrecio() * p.getCantidad()).sum());
        
        return compraRepository.save(compraExistente);
    }

    public void eliminarCompra(String compraId) {
        Compra compraExistente = compraRepository.findById(compraId).orElse(null);
        if (compraExistente == null) {
            throw new RuntimeException("Compra no encontrada con ID: " + compraId);
        }
        
        compraRepository.delete(compraExistente);
    }
}
