import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private URL = 'http://localhost:5000/api/usuarios';

  constructor(private http: HttpClient) {}

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.URL}/registro`, usuario);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/login`, { email, password });
  }

}
