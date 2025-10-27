package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Categoria;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
    Optional<Categoria> findByNombre(String nombre);
    
    boolean existsByNombre(String nombre);
    
    List<Categoria> findByEstado(Categoria.Estado estado, Sort sort);
    
    @Query("SELECT c FROM Categoria c WHERE c.estado = 'ACTIVA'")
    List<Categoria> findCategoriasActivas(Sort sort);
    
    List<Categoria> findByNombreContainingIgnoreCase(String nombre, Sort sort);
}
