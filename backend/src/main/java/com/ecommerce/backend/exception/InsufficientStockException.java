package com.ecommerce.backend.exception;

public class InsufficientStockException extends RuntimeException {
    
    public InsufficientStockException(String productName, int available, int requested) {
        super(String.format("Stock insuficiente para '%s'. Disponible: %d, Solicitado: %d", 
                          productName, available, requested));
    }
    
    public InsufficientStockException(String message) {
        super(message);
    }
}
