import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Libro } from '../../../models/libro';
import { Asidecarrito } from '../asidecarrito/asidecarrito';

@Component({
  selector: 'app-latder',
  imports: [Asidecarrito],
  templateUrl: './latder.html',
  styleUrl: './latder.css',
})
export class Latder {
  @Input() carrito: { libro: Libro; cantidad: number }[] = [];
  
  @Output() quitarCarrito = new EventEmitter<Libro>();
  
  @Output() finalizar = new EventEmitter<void>();

  onQuitarCarrito(libro: Libro) {
    this.quitarCarrito.emit(libro);
  }

  onFinalizar() {
    this.finalizar.emit();
  }
}