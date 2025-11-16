package com.dev.robertpertuz.product.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.robertpertuz.product.model.Producto;
import com.dev.robertpertuz.product.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

	private final ProductoService productoService;

	public ProductoController(ProductoService productoService) {
		this.productoService = productoService;
	}

	@GetMapping
	public ResponseEntity<List<Producto>> getAllProductos() {
		return ResponseEntity.ok(productoService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Producto> getProductoById(@PathVariable @NonNull Long id) {
		return productoService.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<?> createProducto(@RequestBody @NonNull Producto producto) {
		try {
			Producto savedProducto = productoService.save(producto);
			return ResponseEntity.status(HttpStatus.CREATED).body(savedProducto);
		} catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error creating product: " + ex.getMessage());
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Producto> updateProducto(@PathVariable @NonNull Long id,
			@RequestBody @NonNull Producto producto) {
		return productoService.findById(id)
				.map(existing -> {
					producto.setId(id);
					return ResponseEntity.ok(productoService.save(producto));
				})
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProducto(@PathVariable @NonNull Long id) {
		if (productoService.findById(id).isPresent()) {
			productoService.deleteById(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}

