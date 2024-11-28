package ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import ecommerce.ecommerce.model.*;
import ecommerce.ecommerce.repository.*;

@RestController
@RequestMapping("/catalogos")
public class CatalogoController {
    @Autowired
    private CatalogoRepository catalogoRepository;

    @GetMapping
    public ResponseEntity<List<Catalogo>> obtenerTodosLosCatalogos() {
        List<Catalogo> catalogos = catalogoRepository.findAll();
        return new ResponseEntity<>(catalogos, HttpStatus.OK);
    }

    @PostMapping("/crear")
    public ResponseEntity<Catalogo> crearCatalogo(@RequestBody Catalogo catalogo) {
        Catalogo nuevoCatalogo = catalogoRepository.save(catalogo);
        return new ResponseEntity<>(nuevoCatalogo, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Catalogo> obtenerCatalogoPorId(@PathVariable("id") String id) {
        Catalogo catalogo = catalogoRepository.findById(id).orElse(null);
        if (catalogo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(catalogo, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCatalogoPorId(@PathVariable("id") String id) {
        if (catalogoRepository.existsById(id)) {
            catalogoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Catalogo> actualizarNombreCatalogo(@PathVariable("id") String id,
            @RequestBody Map<String, String> requestBody) {
        Catalogo catalogo = catalogoRepository.findById(id).orElse(null);
        if (catalogo == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        String nuevoNombre = requestBody.get("nombre");
        catalogo.setNombre(nuevoNombre);
        Catalogo catalogoActualizado = catalogoRepository.save(catalogo);
        return new ResponseEntity<>(catalogoActualizado, HttpStatus.OK);
    }

}
