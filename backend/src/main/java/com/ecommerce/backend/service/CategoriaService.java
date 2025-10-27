package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.CategoriaDTO;
import com.ecommerce.backend.entity.Categoria;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<CategoriaDTO> obtenerTodasLasCategorias(String search, String sortBy, String sortDir, Boolean soloActivas) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir != null ? sortDir : "asc"), 
                           sortBy != null ? sortBy : "nombre");
        
        List<Categoria> categorias;
        
        if (soloActivas != null && soloActivas) {
            if (search != null && !search.isEmpty()) {
                categorias = categoriaRepository.findByNombreContainingIgnoreCase(search, sort)
                        .stream()
                        .filter(c -> c.getEstado() == Categoria.Estado.ACTIVA)
                        .collect(Collectors.toList());
            } else {
                categorias = categoriaRepository.findCategoriasActivas(sort);
            }
        } else if (search != null && !search.isEmpty()) {
            categorias = categoriaRepository.findByNombreContainingIgnoreCase(search, sort);
        } else {
            categorias = categoriaRepository.findAll(sort);
        }
        
        return categorias.stream()
                .map(CategoriaDTO::new)
                .collect(Collectors.toList());
    }
    
    public CategoriaDTO obtenerCategoriaPorId(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));
        return new CategoriaDTO(categoria);
    }
    
    public CategoriaDTO obtenerCategoriaPorNombre(String nombre) {
        Categoria categoria = categoriaRepository.findByNombre(nombre)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "nombre", nombre));
        return new CategoriaDTO(categoria);
    }
    
    public CategoriaDTO crearCategoria(CategoriaDTO categoriaDTO) {
        // Validar que no exista una categoría con el mismo nombre
        if (categoriaRepository.existsByNombre(categoriaDTO.getNombre())) {
            throw new BadRequestException("Ya existe una categoría con el nombre: " + categoriaDTO.getNombre());
        }
        
        Categoria categoria = convertirDTOAEntidad(categoriaDTO);
        Categoria categoriaGuardada = categoriaRepository.save(categoria);
        return new CategoriaDTO(categoriaGuardada);
    }
    
    public CategoriaDTO actualizarCategoria(Long id, CategoriaDTO categoriaDTO) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));
        
        // Validar que no exista otra categoría con el mismo nombre
        if (!categoria.getNombre().equals(categoriaDTO.getNombre()) && 
            categoriaRepository.existsByNombre(categoriaDTO.getNombre())) {
            throw new BadRequestException("Ya existe una categoría con el nombre: " + categoriaDTO.getNombre());
        }
        
        // Actualizar campos
        categoria.setNombre(categoriaDTO.getNombre());
        categoria.setDescripcion(categoriaDTO.getDescripcion());
        categoria.setImagenUrl(categoriaDTO.getImagenUrl());
        
        if (categoriaDTO.getEstado() != null) {
            categoria.setEstado(Categoria.Estado.valueOf(categoriaDTO.getEstado().toUpperCase()));
        }
        
        Categoria categoriaActualizada = categoriaRepository.save(categoria);
        return new CategoriaDTO(categoriaActualizada);
    }
    
    public void eliminarCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", id));
        
        // Validar que no tenga productos asociados
        if (categoria.getCantidadProductos() > 0) {
            throw new BadRequestException(
                "No se puede eliminar la categoría porque tiene " + 
                categoria.getCantidadProductos() + " productos asociados");
        }
        
        categoriaRepository.deleteById(id);
    }
    
    private Categoria convertirDTOAEntidad(CategoriaDTO dto) {
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getNombre());
        categoria.setDescripcion(dto.getDescripcion());
        categoria.setImagenUrl(dto.getImagenUrl());
        
        if (dto.getEstado() != null) {
            try {
                categoria.setEstado(Categoria.Estado.valueOf(dto.getEstado().toUpperCase()));
            } catch (IllegalArgumentException e) {
                categoria.setEstado(Categoria.Estado.ACTIVA);
            }
        }
        
        return categoria;
    }
}
