package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Producto;
import com.ecommerce.backend.enums.Estado;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    List<Producto> findByCategoria(String categoria, Sort sort);
    
    List<Producto> findByNombreContainingIgnoreCase(String nombre, Sort sort);
    
    List<Producto> findByCategoriaAndNombreContainingIgnoreCase(String categoria, String nombre, Sort sort);
    
    @Query("SELECT DISTINCT p.categoria FROM Producto p ORDER BY p.categoria")
    List<String> findAllCategorias();
    
    List<Producto> findByEstado(Estado estado, Sort sort);
    
    @Query("SELECT p FROM Producto p WHERE p.stock > 0 AND p.estado = 'ACTIVO'")
    List<Producto> findProductosDisponibles(Sort sort);
}
