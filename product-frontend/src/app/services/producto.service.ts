import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly API_URL = 'http://localhost:8081/api/productos';
  private readonly productosSubject = new BehaviorSubject<Producto[]>([]);

  constructor(private http: HttpClient) {
    this.loadProductos();
  }

  /**
   * Obtiene el observable de productos
   */
  obtenerProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  /**
   * Crea un nuevo producto en el backend
   */
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_URL, producto)
      .pipe(
        tap(nuevoProducto => {
          const actual = this.productosSubject.getValue();
          this.productosSubject.next([...actual, nuevoProducto]);
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  /**
   * Elimina un producto en el backend
   */
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        tap(() => {
          const actual = this.productosSubject.getValue();
          this.productosSubject.next(actual.filter(p => p.id !== id));
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  /**
   * Carga los productos desde el backend
   */
  private loadProductos(): void {
    this.http.get<Producto[]>(this.API_URL)
      .pipe(
        tap(productos => this.productosSubject.next(productos)),
        catchError(() => {
          this.productosSubject.next([]);
          return EMPTY;
        })
      )
      .subscribe();
  }
}
