package ecommerce.ecommerce.repository;

import ecommerce.ecommerce.model.Catalogo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogoRepository  extends MongoRepository<Catalogo, String> {
    
}
