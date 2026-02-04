import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutentificadorService {
  private readonly USER_KEY = 'usuario_actual';

  constructor() {}

  // Guardar usuario en localStorage
  login(usuario: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(usuario));
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Saber si hay usuario logueado
  estaAutenticado(): boolean {
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  // Obtener datos del usuario
  obtenerUsuario(): any | null {
    const usuario = localStorage.getItem(this.USER_KEY);
    return usuario ? JSON.parse(usuario) : null;
  }

  // Saber si es admin
  esAdmin(): boolean {
    const usuario = this.obtenerUsuario();
    return usuario && usuario.role === 'admin';
  }
  // Saber si es admin
  esUser(): boolean {
    const usuario = this.obtenerUsuario();
    return usuario && usuario.role === 'user';
  }
}
