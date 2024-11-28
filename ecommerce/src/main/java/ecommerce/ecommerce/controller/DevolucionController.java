package ecommerce.ecommerce.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecommerce.ecommerce.service.DevolucionService;
import ecommerce.ecommerce.model.Devolucion;
import java.util.Map;

@RestController
@RequestMapping("/devoluciones")
public class DevolucionController {
    @Autowired
    private DevolucionService devolucionService;

    @GetMapping
    public List<Devolucion> obtenerTodasDevoluciones() {
        return devolucionService.obtenerTodasDevoluciones();
    }

    @PostMapping("/crear")
    public ResponseEntity<String> crearDevolucion(@RequestBody Map<String, Object> request) {
        String productoId = (String) request.get("productoId");

        try {
            devolucionService.procesarDevolucion(productoId);
            return ResponseEntity.ok("Devolución procesada correctamente");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}

