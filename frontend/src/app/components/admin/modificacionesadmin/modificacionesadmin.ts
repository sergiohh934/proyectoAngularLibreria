import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutentificadorService } from '../../../services/autentificador.service';
import { Libro } from '../../../models/libro';
import { LibrosService } from '../../../services/libros.service';
import { Headeradmin } from '../headeradmin/headeradmin';
declare var bootstrap: any;

@Component({
  selector: 'app-modificacionesadmin',
  standalone: true,
  imports: [CommonModule, FormsModule, Headeradmin],
  templateUrl: './modificacionesadmin.html',
  styleUrls: ['./modificacionesadmin.css']
})
export class modificacionesadmin implements OnInit {

  libros: Libro[] = [];
  cargado: boolean = false;

  libroSeleccionado: Libro | null = null;
  imagenSeleccionada: File | undefined;

  constructor(
    private auth: AutentificadorService,
    private router: Router,
    private librosService: LibrosService
  ) {}

  ngOnInit(): void {
    if (!this.auth.esAdmin()) { 
      this.router.navigate(['/login']);
      alert("Acceso denegado. Solo acceso para administradores");
      return;
    }
    this.cargarLibros();
  }

  cargarLibros() {
    this.cargado = false;
    this.librosService.mostrarLibros().subscribe({
      next: (data) => {
        this.libros = data;
        this.cargado = true;
      },
      error: (err) => {
        console.error(err);
        this.cargado = true;
      }
    });
  }
  mostrarToast(id: string, mensaje?: string) {
    const toastEl = document.getElementById(id);
    if (toastEl) {
      if (mensaje) {
        const body = toastEl.querySelector('.toast-body');
        if (body) body.textContent = mensaje;
      }
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }
  }
  cargarLibro(libro: Libro) {
    this.libroSeleccionado = { ...libro }; // Clonamos para no modificar listado
    this.imagenSeleccionada = undefined;
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imagenSeleccionada = event.target.files[0];
    } else {
      this.imagenSeleccionada = undefined;
    }
  }

  modificarLibro() {
    if (!this.libroSeleccionado) return;

    this.librosService.actualizarLibro(this.libroSeleccionado, this.imagenSeleccionada)
      .subscribe({
        next: () => {
          this.mostrarToast('toastSuccess', 'Libro modificado correctamente');
          this.libroSeleccionado = null;
          this.imagenSeleccionada = undefined;
          this.cargarLibros();
        },
        error: (err) => {
          console.error(err);
          this.mostrarToast('toastError', 'Error al modificar el libro');
        }
      });
  }

  eliminarLibro(id: string) {
    if (!confirm('¿Estás seguro de eliminar este libro?')) return;

    this.librosService.borrarLibro(id).subscribe({
      next: () => {
        this.mostrarToast('toastSuccess', 'Libro eliminado correctamente');
        this.cargarLibros();
      },
      error: (err) => {
        console.error(err);
        this.mostrarToast('toastError', 'Error al eliminar el libro');
      }
    });
  }
}
