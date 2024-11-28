package ecommerce.ecommerce.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ecommerce.ecommerce.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUsername(String username);
}
