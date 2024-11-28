package ecommerce.ecommerce.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class ProductoService {

    private Map<String, Integer> popularidadMap = new HashMap<>();

    public void adjustProductPopularity(String productId, float sentimentScore) {
        int currentPopularity = popularidadMap.getOrDefault(productId, 0);

        int popularityAdjustment = calculatePopularityAdjustment(sentimentScore);
        popularidadMap.put(productId, currentPopularity + popularityAdjustment);
    }
    
    private int calculatePopularityAdjustment(float sentimentScore) {
        if (sentimentScore > 0) {
            return 1; // Incrementa popularidad por comentarios positivos
        } else {
            return -1; // Decrementa popularidad por comentarios negativos
        }
    }

    public int getProductPopularity(String productId) {
        return popularidadMap.getOrDefault(productId, 0);
    }
}
