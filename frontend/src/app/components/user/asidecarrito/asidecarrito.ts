import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Libro } from '../../../models/libro';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asidecarrito',
  imports: [CommonModule],
  templateUrl: './asidecarrito.html',
  styleUrl: './asidecarrito.css',
})
export class Asidecarrito {
  @Input() carrito: { libro: Libro; cantidad: number }[] = [];
  @Output() quitarCarrito = new EventEmitter<Libro>();
  @Output() finalizar = new EventEmitter<void>();

  quitar(libro: Libro) {
    this.quitarCarrito.emit(libro);
  }

  getTotal(): number {
    return this.carrito.reduce((sum, item) => sum + item.libro.precio * item.cantidad, 0);
  }

  finalizarCompra() {
    this.finalizar.emit();
  }
}
