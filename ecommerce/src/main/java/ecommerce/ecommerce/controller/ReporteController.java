package ecommerce.ecommerce.controller;

import ecommerce.ecommerce.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/reportes")
public class ReporteController {
    @Autowired
    private ReporteService reporteService;

    @GetMapping("/compras")
    public Map<String, Object> generarReporteCompras() {
        return reporteService.generarReporteCompras();
    }

    @GetMapping("/ventas/diarias")
    public Map<String, Object> generarReporteVentasDiarias() {
        return reporteService.generarReporteVentasDiarias();
    }

    @GetMapping("/ventas/semanales")
    public Map<String, Object> generarReporteVentasSemanales() {
        return reporteService.generarReporteVentasSemanales();
    }

    @GetMapping("/ventas/mensuales")
    public Map<String, Object> generarReporteVentasMensuales() {
        return reporteService.generarReporteVentasMensuales();
    }

    @GetMapping("/ventas/anuales")
    public Map<String, Object> generarReporteVentasAnuales() {
        return reporteService.generarReporteVentasAnuales();
    }

}

