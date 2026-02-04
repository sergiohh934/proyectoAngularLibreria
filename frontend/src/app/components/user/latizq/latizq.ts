import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Asidecategorias } from '../asidecategorias/asidecategorias';

@Component({
  selector: 'app-latizq',
  imports: [Asidecategorias],
  templateUrl: './latizq.html',
  styleUrl: './latizq.css',
})
export class Latizq {
  @Input() categorias: string[] = [];
  
  @Output() cambioCategorias = new EventEmitter<string[]>();

  onCambioCategorias(categoriasSeleccionadas: string[]) {
    this.cambioCategorias.emit(categoriasSeleccionadas);
  }
}