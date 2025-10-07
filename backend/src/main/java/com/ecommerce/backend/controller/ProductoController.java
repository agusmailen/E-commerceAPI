package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.ProductoDTO;
import com.ecommerce.backend.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @GetMapping
    public ResponseEntity<List<ProductoDTO>> obtenerProductos(
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "nombre") String _sort,
            @RequestParam(required = false, defaultValue = "asc") String _order) {
        
        List<ProductoDTO> productos = productoService.obtenerTodosLosProductos(categoria, search, _sort, _order);
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerProductoPorId(@PathVariable Long id) {
        ProductoDTO producto = productoService.obtenerProductoPorId(id);
        return ResponseEntity.ok(producto);
    }
    
    @PostMapping
    public ResponseEntity<ProductoDTO> crearProducto(@Valid @RequestBody ProductoDTO productoDTO) {
        ProductoDTO producto = productoService.crearProducto(productoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(producto);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizarProducto(
            @PathVariable Long id, 
            @Valid @RequestBody ProductoDTO productoDTO) {
        ProductoDTO producto = productoService.actualizarProducto(id, productoDTO);
        return ResponseEntity.ok(producto);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.ok().build();
    }
}
