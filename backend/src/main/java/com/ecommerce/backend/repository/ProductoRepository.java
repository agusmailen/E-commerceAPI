package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Categoria;
import com.ecommerce.backend.entity.Producto;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    List<Producto> findByCategoria(Categoria categoria, Sort sort);
    
    List<Producto> findByCategoriaId(Long categoriaId, Sort sort);
    
    List<Producto> findByNombreContainingIgnoreCase(String nombre, Sort sort);
    
    List<Producto> findByCategoriaAndNombreContainingIgnoreCase(Categoria categoria, String nombre, Sort sort);
    
    List<Producto> findByCategoriaIdAndNombreContainingIgnoreCase(Long categoriaId, String nombre, Sort sort);
    
    List<Producto> findByEstado(Producto.Estado estado, Sort sort);
    
    @Query("SELECT p FROM Producto p WHERE p.stock > 0 AND p.estado = 'ACTIVO'")
    List<Producto> findProductosDisponibles(Sort sort);
}
