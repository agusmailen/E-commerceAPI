package com.ecommerce.backend.enums;

public enum Estado {
    ACTIVO("activo"),
    AGOTADO("agotado"),
    INACTIVO("inactivo");
    
    private final String value;
    
    Estado(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
    }
}

