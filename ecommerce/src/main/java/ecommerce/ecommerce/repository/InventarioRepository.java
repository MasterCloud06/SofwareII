package ecommerce.ecommerce.repository;

import ecommerce.ecommerce.model.Producto;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InventarioRepository extends MongoRepository<Producto, String> {
    
}
