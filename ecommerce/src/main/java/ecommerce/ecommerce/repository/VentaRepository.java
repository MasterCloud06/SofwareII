package ecommerce.ecommerce.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import ecommerce.ecommerce.model.Venta;

@Repository
public interface VentaRepository extends MongoRepository<Venta, String> {
    List<Venta> findByVendedorId(String vendedorId);
    long countByFechaBetween(LocalDate inicio, LocalDate fin);

    List<Venta> findByFechaBetween(Date inicio, Date fin);
}
