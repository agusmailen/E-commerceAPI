package com.ecommerce.backend.enums;

public enum Rol {
    ADMIN("admin"),
    CLIENTE("cliente");
    
    private final String value;
    
    Rol(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
}

