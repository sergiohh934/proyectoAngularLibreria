import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Libro } from '../../../models/libro';

@Component({
  selector: 'app-mostrarproductos',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './mostrarproductos.html',
  styleUrl: './mostrarproductos.css',
})
export class Mostrarproductos {
  @Input() libros: Libro[] = [];
  @Output() agregarCarrito = new EventEmitter<Libro>();

  agregar(libro: Libro) {
    this.agregarCarrito.emit(libro);
  }
}
