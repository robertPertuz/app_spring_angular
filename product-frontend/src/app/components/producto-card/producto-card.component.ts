import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-card.component.html',
  styleUrls: ['./producto-card.component.css']
})
export class ProductoCardComponent {
  @Input() producto!: Producto;
  deleting = false;

  constructor(
    private productoService: ProductoService,
    private notificationService: NotificationService
  ) {}

  eliminar(): void {
    if (!this.producto?.id) return;
    if (!confirm(`¿Eliminar producto "${this.producto.nombre}"?`)) return;

    this.deleting = true;
    this.productoService.eliminarProducto(this.producto.id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Producto eliminado');
        this.deleting = false;
      },
      error: () => {
        this.notificationService.showError('Error al eliminar producto');
        this.deleting = false;
      }
    });
  }
}
