package com.ecommerce.backend.exception;

public class BadRequestException extends RuntimeException {
    
    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String id) {
        super("", id);
    }
}
