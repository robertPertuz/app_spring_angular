import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { NotificationService } from '../../services/notification.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {
  form: FormGroup;
  cargando = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.form = this.initForm();
  }

  /**
   * Inicializa el formulario reactivo
   */
  private initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagenUrl: ['', Validators.required]
    });
  }

  /**
   * Envía el formulario para crear un nuevo producto
   */
  enviar(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const nuevoProducto = this.mapFormToProducto(this.form.value);

    this.productoService.crearProducto(nuevoProducto)
      .pipe(
        finalize(() => this.cargando = false)
      )
      .subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError()
      });
  }

  /**
   * Cancela el formulario y vuelve a la lista
   */
  cancelar(): void {
    this.form.reset();
    this.router.navigate(['/productos']);
  }

  /**
   * Mapea los datos del formulario a un objeto Producto
   */
  private mapFormToProducto(datos: any): Producto {
    return {
      nombre: datos.nombre,
      precio: parseFloat(datos.precio),
      imagenUrl: datos.imagenUrl
    } as Producto;
  }

  /**
   * Maneja la creación exitosa
   */
  private onSuccess(): void {
    this.notificationService.showSuccess('Producto creado exitosamente');
    this.form.reset();
    this.router.navigate(['/productos']);
  }

  /**
   * Maneja los errores
   */
  private onError(): void {
    this.notificationService.showError('Error al crear el producto');
  }
}
