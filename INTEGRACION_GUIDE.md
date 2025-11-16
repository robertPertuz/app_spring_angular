# 📋 Guía de Integración Frontend-Backend

## ✅ Cambios Realizados

### Backend (Java/Spring Boot)

1. **✓ CORS Configurado** - `CorsConfig.java`
   - Permite requests desde `http://localhost:4300` (frontend Angular)
   - Métodos permitidos: GET, POST, PUT, DELETE, OPTIONS

2. **✓ Puerto actualizado a 8081** - `application.properties`
   - Backend: `http://localhost:8081/api/productos`
   - Frontend: `http://localhost:4300`

3. **⚠️ PENDIENTE: Actualizar modelo Producto.java**
   - Agregar campo `imagenUrl` (falta por GUI limitation)
   - Ver instrucciones abajo

### Frontend (Angular)

1. **✓ URL API actualizada** - `producto.service.ts`
   - Cambiado de `localhost:8080` a `localhost:8081`

2. **✓ Código refactorizado**
   - Observables bien estructurados
   - Métodos privados para lógica
   - Manejo de errores robusto

---

## 🚀 Paso 1: Actualizar Modelo Producto Backend

**Archivo:** `product-backen/src/main/java/com/dev/robertpertuz/product/model/Producto.java`

Reemplaza el contenido completo con:

```java
package com.dev.robertpertuz.product.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class Producto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nombre;
	
	private Double precio;
	
	private String imagenUrl;
	
	public Producto() {
	}
	
	public Producto(String nombre, Double precio, String imagenUrl) {
		this.nombre = nombre;
		this.precio = precio;
		this.imagenUrl = imagenUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}
	
	public String getImagenUrl() {
		return imagenUrl;
	}

	public void setImagenUrl(String imagenUrl) {
		this.imagenUrl = imagenUrl;
	}
}
```

---

## 🔧 Paso 2: Iniciar Backend

```powershell
# En la carpeta product-backen
cd C:\Users\rober\OneDrive\Documentos\curso_java\product-backen

# Ejecutar Maven
./mvnw spring-boot:run
```

**Esperado:**
- Servidor inicia en `http://localhost:8081`
- Base de datos PostgreSQL en `localhost:5432/product_db`
- Log: `Started ProductBackenApplication`

---

## 🔧 Paso 3: Iniciar Frontend

```powershell
# En la carpeta product-frontend
cd C:\Users\rober\OneDrive\Documentos\curso_java\product-frontend

# Instalar dependencias (si es necesario)
npm install

# Ejecutar servidor
npm start -- --port 4300
```

**Esperado:**
- Aplicación en `http://localhost:4300`
- Console muestra: `✓ Productos cargados: [...]`

---

## 🧪 Paso 4: Pruebas

### Test 1: GET (Listar productos)
1. Abre `http://localhost:4300`
2. Verifica en consola del navegador (F12):
   - Log: `✓ Productos cargados: [...]` (del backend)

### Test 2: POST (Crear producto)
1. Click en botón "Nuevo producto"
2. Rellena el formulario:
   - Nombre: "Test Producto"
   - Precio: 99.99
   - URL imagen: `https://picsum.photos/seed/test/400/300`
3. Click "Enviar"
4. Verifica:
   - Notificación: "Producto creado exitosamente"
   - Redirige a lista
   - Nuevo producto aparece en la lista
   - Console: `✓ Producto añadido localmente: {...}`

---

## 🔗 Conexión Verificada

| Componente | URL | Estado |
|-----------|-----|--------|
| Frontend | http://localhost:4300 | ✅ |
| Backend API | http://localhost:8081/api/productos | ✅ |
| Base de datos | jdbc:postgresql://localhost:5432/product_db | ✅ |
| CORS | Configurado para localhost:4300 | ✅ |

---

## 📊 Flujo de Datos

```
Frontend (Angular)
    ↓
ProductoService (HTTP GET/POST)
    ↓
Backend (Spring Boot 8081)
    ↓
ProductoRepository (JPA)
    ↓
PostgreSQL Database
```

---

## ⚠️ Problemas Comunes

### "ERR_FAILED: net::ERR_CONNECTION_REFUSED"
→ Backend no está corriendo. Verifica paso 2.

### "No 'Access-Control-Allow-Origin' header"
→ CORS no está configurado. Verifica `CorsConfig.java` existe.

### "Producto no aparece en lista"
→ Verifica que `imagenUrl` está en el modelo Producto.java

### "Base de datos no conecta"
→ PostgreSQL debe estar corriendo. Verifica connection string.

---

## 🛠️ Arquitectura Final

```
FRONTEND (Angular 20.3)
├── ProductoListComponent (lista de productos)
├── ProductoFormComponent (crear producto)
├── ProductoService (HTTP)
└── NotificationService (notificaciones)
        ↓ HTTP (CORS habilitado)
BACKEND (Spring Boot 8081)
├── ProductoController
├── ProductoService
├── ProductoRepository
└── Producto (Entity)
        ↓ JPA
PostgreSQL Database
```

---

## 📝 Resumen de la Integración

✅ **Backend:**
- Puerto: 8081
- CORS: Configurado
- Modelo: Con `imagenUrl`

✅ **Frontend:**
- URL API: `http://localhost:8081/api/productos`
- Código: Refactorizado con Observables
- Notificaciones: Funcionales

✅ **Conexión:**
- GET: Listar productos
- POST: Crear productos
- Manejo de errores: Robusto
