package ecommerce.ecommerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ecommerce.ecommerce.model.Compra;

import java.util.List;

@Repository
public interface CompraRepository extends MongoRepository<Compra, String> {
    List<Compra> findByUsuarioId(String usuarioId);
}
