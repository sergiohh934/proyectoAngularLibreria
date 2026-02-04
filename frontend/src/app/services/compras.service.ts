import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private URL = 'http://localhost:5000/api/compras';

  constructor(private http: HttpClient) {}

  // Peticion backend (crearcompra) 
  realizarCompra(compra: Compra): Observable<any> {
    const compraData = {
      usuarioId: compra.usuarioId,
      libros: compra.libros.map(libro => ({
        libroId: libro.libroId,
        cantidad: libro.cantidad
      }))
    };
    return this.http.post(this.URL, compraData);
  }

  // Petición historial de compras de un usuario (miscompras) 
  mostrarCompras(usuarioId: string): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.URL}/usuario/${usuarioId}`);
  }
}