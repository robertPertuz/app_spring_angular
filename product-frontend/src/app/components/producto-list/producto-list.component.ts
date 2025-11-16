import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ProductoCardComponent } from '../producto-card/producto-card.component';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductoCardComponent],
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent {
  productos$: Observable<Producto[]>;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {
    this.productos$ = this.productoService.obtenerProductos();
  }

  navigateToCreate(): void {
    this.router.navigate(['/crear-producto']);
  }
}
