package ecommerce.ecommerce.service;

import ecommerce.ecommerce.model.Devolucion;
import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.model.Venta;
import ecommerce.ecommerce.repository.ProductoRepository;
import ecommerce.ecommerce.repository.DevolucionRepository;
import ecommerce.ecommerce.repository.VentaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DevolucionService {
    private static final Logger logger = LoggerFactory.getLogger(DevolucionService.class);

    @Autowired
    private DevolucionRepository devolucionRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private VentaRepository ventaRepository;

    public List<Devolucion> obtenerTodasDevoluciones() {
        return devolucionRepository.findAll();
    }

    public Devolucion procesarDevolucion(String id) {
        try {
            logger.info("Iniciando proceso de devolución para ventaId: {} ", id);

            if (id == null || id.trim().isEmpty()) {
                throw new IllegalArgumentException("El ID de la venta no puede ser nulo o vacío");
            }

            Optional<Venta> optionalVenta = ventaRepository.findById(id.trim());
            if (!optionalVenta.isPresent()) {
                throw new RuntimeException("Venta no encontrada: " + id);
            }
            Venta venta = optionalVenta.get();

            String productosJson = venta.getProductos();
            if (productosJson == null || productosJson.isEmpty()) {
                throw new RuntimeException("Los productos de la venta no pueden ser nulos o vacíos");
            }

            List<String> productoIds = Arrays.asList(productosJson.split(","));

            // Obtener los objetos completos de producto usando los IDs
            List<Producto> productos = new ArrayList<>();
            for (String productoId : productoIds) {
                Producto producto = productoRepository.findById(productoId.trim())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + productoId));
                productos.add(producto);
            }
            for (Producto producto : productos) {
                Producto productoEnRepo = productoRepository.findById(producto.getId())
                        .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + producto.getId()));
                productoEnRepo.setCantidad(productoEnRepo.getCantidad() + producto.getCantidad());
                productoRepository.save(productoEnRepo);
            }
            String ventaId = id;
            Devolucion devolucion = new Devolucion(ventaId, "Solicitado", productos);
            return devolucionRepository.save(devolucion);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error al procesar la devolución: " + e.getMessage(), e);
        }
    }

}

