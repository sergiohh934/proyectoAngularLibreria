import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-asidecategorias',
  imports: [CommonModule],
  templateUrl: './asidecategorias.html',
  styleUrl: './asidecategorias.css',
})
export class Asidecategorias {
@Input() categorias: string[] = [];
@Output() cambioCategorias = new EventEmitter<string[]>();

  seleccionadas: string[] = [];

  onChangeCategoria(cat: string, checked: boolean) {
    if (checked) {
      this.seleccionadas.push(cat);
    } else {
      this.seleccionadas = this.seleccionadas.filter(c => c !== cat);
    }

    this.cambioCategorias.emit([...this.seleccionadas]);
  }
}
