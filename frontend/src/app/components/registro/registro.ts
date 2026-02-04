import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AutentificadorService } from '../../services/autentificador.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
 usuario: Usuario = {
    _id: '',
    nombre: '',
    email: '',
    password: '',
    role: 'user'
  };

  errorMsg: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  registrar() {
    this.errorMsg = '';

    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.password) {
      this.errorMsg = 'Rellena todos los campos.';
      return;
    }
    
    this.usuariosService.registrar(this.usuario).subscribe({
      next: (res: any) => {
        const user = res.usuario || res;
        // Redirigir al login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        this.errorMsg = err.error?.message || 'Error al registrar usuario';
      }
    });
  }
}
