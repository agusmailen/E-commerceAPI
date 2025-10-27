package com.ecommerce.backend.service;

import com.ecommerce.backend.dto.ProductoDTO;
import com.ecommerce.backend.entity.Categoria;
import com.ecommerce.backend.entity.Producto;
import com.ecommerce.backend.exception.ResourceNotFoundException;
import com.ecommerce.backend.repository.CategoriaRepository;
import com.ecommerce.backend.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductoService {
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public List<ProductoDTO> obtenerTodosLosProductos(String categoriaNombre, String search, String sortBy, String sortDir) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir != null ? sortDir : "asc"), 
                           sortBy != null ? sortBy : "nombre");
        
        List<Producto> productos;
        
        if (categoriaNombre != null && !categoriaNombre.equals("Todas") && search != null && !search.isEmpty()) {
            Categoria categoria = categoriaRepository.findByNombre(categoriaNombre)
                    .orElseThrow(() -> new ResourceNotFoundException("Categoria", "nombre", categoriaNombre));
            productos = productoRepository.findByCategoriaAndNombreContainingIgnoreCase(categoria, search, sort);
        } else if (categoriaNombre != null && !categoriaNombre.equals("Todas")) {
            Categoria categoria = categoriaRepository.findByNombre(categoriaNombre)
                    .orElseThrow(() -> new ResourceNotFoundException("Categoria", "nombre", categoriaNombre));
            productos = productoRepository.findByCategoria(categoria, sort);
        } else if (search != null && !search.isEmpty()) {
            productos = productoRepository.findByNombreContainingIgnoreCase(search, sort);
        } else {
            productos = productoRepository.findAll(sort);
        }
        
        return productos.stream()
                .map(ProductoDTO::new)
                .collect(Collectors.toList());
    }
    
    public ProductoDTO obtenerProductoPorId(Long id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
        return new ProductoDTO(producto);
    }
    
    public ProductoDTO crearProducto(ProductoDTO productoDTO) {
        Producto producto = convertirDTOAEntidad(productoDTO);
        
        // Si no se especifica imagen principal, usar la primera de la lista
        if (producto.getImagen() == null && !producto.getImagenes().isEmpty()) {
            producto.setImagen(producto.getImagenes().get(0));
        }
        
        Producto productoGuardado = productoRepository.save(producto);
        return new ProductoDTO(productoGuardado);
    }
    
    public ProductoDTO actualizarProducto(Long id, ProductoDTO productoDTO) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", "id", id));
        
        // Actualizar campos
        producto.setNombre(productoDTO.getNombre());
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setPrecio(productoDTO.getPrecio());
        
        // Actualizar categoria si cambió
        if (productoDTO.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(productoDTO.getCategoriaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", productoDTO.getCategoriaId()));
            producto.setCategoria(categoria);
        }
        
        producto.setStock(productoDTO.getStock());
        producto.setImagen(productoDTO.getImagen());
        producto.setImagenes(productoDTO.getImagenes());
        producto.setDetalles(productoDTO.getDetalles());
        
        if (productoDTO.getEstado() != null) {
            producto.setEstado(Producto.Estado.valueOf(productoDTO.getEstado().toUpperCase()));
        }
        
        Producto productoActualizado = productoRepository.save(producto);
        return new ProductoDTO(productoActualizado);
    }
    
    public void eliminarProducto(Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto", "id", id);
        }
        productoRepository.deleteById(id);
    }
    
    private Producto convertirDTOAEntidad(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        
        // Buscar y asignar categoria
        if (dto.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Categoria", "id", dto.getCategoriaId()));
            producto.setCategoria(categoria);
        }
        
        producto.setStock(dto.getStock());
        producto.setImagen(dto.getImagen());
        producto.setImagenes(dto.getImagenes());
        producto.setDetalles(dto.getDetalles());
        
        if (dto.getEstado() != null) {
            try {
                producto.setEstado(Producto.Estado.valueOf(dto.getEstado().toUpperCase()));
            } catch (IllegalArgumentException e) {
                producto.setEstado(Producto.Estado.ACTIVO);
            }
        }
        
        return producto;
    }
}
