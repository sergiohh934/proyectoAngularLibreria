import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutentificadorService } from '../../../services/autentificador.service';
import { HeaderUser } from '../headeruser/headeruser';
import { ComprasService } from '../../../services/compras.service';
import { Compra } from '../../../models/compra';

@Component({
  selector: 'app-historial',
  imports: [HeaderUser, CommonModule, FormsModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css',
})
export class Historial implements OnInit {
  comprasConLibros: any[] = [];
  cargando: boolean = true;

  constructor(
    private auth: AutentificadorService,
    private router: Router,
    private comprasService: ComprasService
  ) {}

  ngOnInit(): void {
    if (!this.auth.esUser()) {
      alert('Debe loguearse antes de poder acceder a sus compras.');
      this.router.navigate(['/login']);
      return;
    }

    const usuario = this.auth.obtenerUsuario();
    if (!usuario) {
      alert('No se ha podido obtener el usuario.');
      this.router.navigate(['/login']);
      return;
    }

    this.comprasService.mostrarCompras(usuario.id).subscribe({
      next: (compras: Compra[]) => {
        if (!compras || compras.length === 0) {
          this.cargando = false;
          return;
        }

        // Ahora los datos ya vienen desnormalizados, no necesitamos populate
        // Solo mapeamos a la estructura que espera el template
        this.comprasConLibros = compras.map((compra) => {
          const libros = compra.libros.map((item) => ({
            titulo: item.titulo || 'Libro eliminado',
            cantidad: item.cantidad,
            precio: item.precio || 0,
            eliminado: !item.libroId // Indicador de si el libro fue eliminado
          }));

          return {
            fecha: compra.fecha || new Date(),
            total: compra.total,
            libros: libros,
          };
        })
        //ordena de mas cerca a más lejos
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      },
    });
  }
}