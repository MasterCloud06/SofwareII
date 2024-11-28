package ecommerce.ecommerce.repository;

import ecommerce.ecommerce.model.Devolucion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DevolucionRepository extends MongoRepository<Devolucion, String> {
    
}
