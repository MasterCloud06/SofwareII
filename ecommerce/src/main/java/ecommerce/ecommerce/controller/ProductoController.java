package ecommerce.ecommerce.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.repository.ProductoRepository;

@RestController
@RequestMapping("/productos")
public class ProductoController {
    @Autowired
    private ProductoRepository productoRepository;

    private static String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads";

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return "Por favor seleccione un archivo para cargar.";
        }

        try {
            // Crear directorio si no existe
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // Guardar archivo en el directorio
            Path filePath = Paths.get(UPLOAD_DIR, file.getOriginalFilename());
            Files.write(filePath, file.getBytes());

            // Devolver la URL del archivo cargado
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(file.getOriginalFilename())
                    .toUriString();

            return fileDownloadUri;
        } catch (IOException e) {
            return "Error al cargar el archivo: " + e;
        }
    }

    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodosLosProductos() {
        List<Producto> productos = productoRepository.findAll();
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    @PostMapping("/crear")
public ResponseEntity<Producto> crearProducto(@RequestParam("imagen") MultipartFile imagen,
                                              @RequestParam("nombre") String nombre,
                                              @RequestParam("descripcion") String descripcion,
                                              @RequestParam("precio") double precio,
                                              @RequestParam("cantidad") int cantidad,
                                              @RequestParam("categoria") String categoria) {
    try {
        String imagenUrl = uploadImage(imagen);
        Producto nuevoProducto = new Producto(
            nombre,
            descripcion,
            precio,
            cantidad,
            imagenUrl,
            categoria
        );
        Producto productoCreado = productoRepository.save(nuevoProducto);
        return ResponseEntity.status(HttpStatus.CREATED).body(productoCreado);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}


    @PutMapping("/{id}")
    public Producto actualizarImagenProducto(@PathVariable String id, @RequestParam("imagen") MultipartFile imagen) throws IOException {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        String imagenUrl = uploadImage(imagen);
        producto.setImagen(imagenUrl);
        return productoRepository.save(producto);
    }

    @GetMapping("/ver/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable("id") String id) {
        Optional<Producto> productoOptional = productoRepository.findById(id);
        return productoOptional.map(producto -> new ResponseEntity<>(producto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<Producto> editarProducto(@PathVariable("id") String id, @RequestBody Producto producto) {
        Producto productoExistente = productoRepository.findById(id).orElse(null);
        if (productoExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        producto.setId(id); 
        Producto productoEditado = productoRepository.save(producto);
        return new ResponseEntity<>(productoEditado, HttpStatus.OK);
    }
 
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable("id") String id, @RequestBody Producto producto) {
        Optional<Producto> productoOptional = productoRepository.findById(id);
        if (!productoOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        producto.setId(id);
        Producto actualizadoProducto = productoRepository.save(producto);
        return new ResponseEntity<>(actualizadoProducto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> eliminarProducto(@PathVariable("id") String id) {
        try {
            productoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } 
    }


}

