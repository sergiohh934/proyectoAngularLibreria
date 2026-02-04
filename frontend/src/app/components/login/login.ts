import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutentificadorService } from '../../services/autentificador.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
email: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private authService: AutentificadorService,
    private router: Router
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Rellena todos los campos.';
      return;
    }

    this.usuariosService.login(this.email, this.password).subscribe({
      next: (resp: any) => {
        if (!resp || !resp.usuario) {
          this.errorMsg = 'Credenciales incorrectas.';
          return;
        }

        // Guardar usuario en LocalStorage
        this.authService.login(resp.usuario);
// Mostrar usuario logueado en alert
        // Redirigir según rol
        if (resp.usuario.role === 'admin') {
          this.router.navigate(['/admin-gestion']);
        } else {
          this.router.navigate(['/productos']);
        }
        
      },
      error: () => {
        this.errorMsg = 'Error al iniciar sesión.';
      }
    });
  }
}
