package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.CategoriaDTO;
import com.ecommerce.backend.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
    
    @Autowired
    private CategoriaService categoriaService;
    
    @GetMapping
    public ResponseEntity<List<CategoriaDTO>> obtenerCategorias(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "nombre") String _sort,
            @RequestParam(required = false, defaultValue = "asc") String _order,
            @RequestParam(required = false) Boolean activas) {
        
        List<CategoriaDTO> categorias = categoriaService.obtenerTodasLasCategorias(search, _sort, _order, activas);
        return ResponseEntity.ok(categorias);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDTO> obtenerCategoriaPorId(@PathVariable Long id) {
        CategoriaDTO categoria = categoriaService.obtenerCategoriaPorId(id);
        return ResponseEntity.ok(categoria);
    }
    
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<CategoriaDTO> obtenerCategoriaPorNombre(@PathVariable String nombre) {
        CategoriaDTO categoria = categoriaService.obtenerCategoriaPorNombre(nombre);
        return ResponseEntity.ok(categoria);
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CategoriaDTO> crearCategoria(@Valid @RequestBody CategoriaDTO categoriaDTO) {
        CategoriaDTO categoria = categoriaService.crearCategoria(categoriaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoria);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CategoriaDTO> actualizarCategoria(
            @PathVariable Long id, 
            @Valid @RequestBody CategoriaDTO categoriaDTO) {
        CategoriaDTO categoria = categoriaService.actualizarCategoria(id, categoriaDTO);
        return ResponseEntity.ok(categoria);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
        return ResponseEntity.ok().build();
    }
}
