package ecommerce.ecommerce.controller;

import ecommerce.ecommerce.model.Producto;
import ecommerce.ecommerce.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecomendationController {

    @Value("${spring.cloud.gcp.credentials.location}")
    private String credentialsLocation;
    
    @Autowired
    private RecommendationService recommendationService;

    public void RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping
    public List<Producto> recommendProducts(
            @RequestParam(required = false) String occasion,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Integer age,
            @RequestParam(required = false) String interests,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice) {

        return recommendationService.recommendProducts(occasion, gender, age, interests, minPrice, maxPrice);
    }
}
