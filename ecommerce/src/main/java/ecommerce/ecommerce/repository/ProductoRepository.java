package ecommerce.ecommerce.repository;

import ecommerce.ecommerce.model.Producto;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends MongoRepository<Producto, String> {
    @Query("{'_id': ?0 }")
    Producto crearProducto(Producto producto);
    List<Producto> findByCategoria(String categoria);
    List<Producto> findByCategoriaIn(List<String> categorias);

}