package ecommerce.ecommerce.service;

import com.google.cloud.storage.Storage;
import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final ProductoRepository productRepository;
    private final Storage storage;

    @Autowired
    public RecommendationService(ProductoRepository productRepository, Storage storage) {
        this.productRepository = productRepository;
        this.storage = storage;
    }

    public List<Producto> recommendProducts(String occasion, String gender, Integer age, String interests,
                                            Double minPrice, Double maxPrice) {
        Logger logger = Logger.getLogger(RecommendationService.class.getName());

        List<Producto> products = productRepository.findAll();
        logger.info("Total products: " + products.size());

        // Compilar patrón de búsqueda para intereses
        Pattern pattern = null;
        if (interests != null && !interests.isEmpty()) {
            try {
                pattern = Pattern.compile(".*" + Pattern.quote(interests) + ".*", Pattern.CASE_INSENSITIVE);
            } catch (Exception e) {
                logger.severe("Failed to compile pattern: " + e.getMessage());
            }
        }

        Pattern finalPattern = pattern;
        List<Producto> filteredProducts = products.stream()
                .filter(product -> (minPrice == null || product.getPrecio() >= minPrice))
                .filter(product -> (maxPrice == null || product.getPrecio() <= maxPrice))
                .filter(product -> {
                    if (finalPattern == null) {
                        return true;
                    }
                    if (product.getDescripcion() == null) {
                        logger.info("Filtered out by null description: " + product);
                        return false;
                    }
                    return finalPattern.matcher(product.getDescripcion()).matches();
                })
                .collect(Collectors.toList());

        logger.info("Filtered products: " + filteredProducts.size());
        return filteredProducts;
    }
}
