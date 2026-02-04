import { Component, OnInit } from '@angular/core';
import { Headeradmin } from '../headeradmin/headeradmin';
import { AutentificadorService } from '../../../services/autentificador.service';
import { Router } from '@angular/router';
import { Libro } from '../../../models/libro';
import { LibrosService } from '../../../services/libros.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-altasadmin',
  imports: [Headeradmin, FormsModule, CommonModule],
  templateUrl: './altasadmin.html',
  styleUrl: './altasadmin.css',
})
export class Altasadmin implements OnInit{
  constructor(
    private auth: AutentificadorService,
    private router: Router,
    private librosService: LibrosService
  ){}
libro: Libro = {
    _id: '',
    titulo: '',
    autor: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    isbn: '',
    categoria: '',
    imagen: ''
  };
  imagenSeleccionada: File | undefined;
ngOnInit(): void {
    if(!this.auth.esAdmin()){ 
      this.router.navigate(['/login']);
      alert("Acceso denegado. Solo acceso para administradores");
      return;
    }
  }
  // Método para mostrar toast
  mostrarToast(id: string) {
    const toastEl = document.getElementById(id);
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagenSeleccionada = event.target.files[0];
    } else {
      this.imagenSeleccionada = undefined;
    }
  }

  agregarLibro() {
    this.librosService.crearLibro(this.libro, this.imagenSeleccionada).subscribe({
      next: (res) => {
        this.mostrarToast('toastSuccess');
        // Reiniciar formulario
        this.libro = {
          _id: '',
          titulo: '',
          autor: '',
          descripcion: '',
          precio: 0,
          stock: 0,
          isbn: '',
          categoria: '',
          imagen: ''
        };
        this.imagenSeleccionada = undefined;
      },
      error: (err) => {
        console.error(err);
        this.mostrarToast('toastError');
      }
    });
  }
  

}
