import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private URL = 'http://localhost:5000/api/libros';

  constructor(private http: HttpClient) {}
  //Peticion get a la funcion (mostrarLibros)
  mostrarLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.URL);
  }
  //Peticion get a la funcion (mostrarlibro)
  mostrarLibro(id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.URL}/${id}`);
  }
  //Peticion Post a la funcion (crearlibro)
  crearLibro(libro: Libro, imagen?: File): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', libro.titulo);
    formData.append('autor', libro.autor);
    formData.append('descripcion', libro.descripcion || '');
    formData.append('precio', libro.precio.toString());
    formData.append('isbn', libro.isbn);
    formData.append('categoria', libro.categoria);
    formData.append('stock', libro.stock.toString());
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(this.URL, formData);
  }
  // Peticion put a la funcion (editarLibro)
  actualizarLibro(libro: Libro, imagen?: File): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', libro.titulo);
    formData.append('autor', libro.autor);
    formData.append('descripcion', libro.descripcion || '');
    formData.append('precio', libro.precio.toString());
    formData.append('isbn', libro.isbn);
    formData.append('categoria', libro.categoria);
    formData.append('stock', libro.stock.toString());
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.put(`${this.URL}/${libro._id}`, formData);
  }
  // Petición delete a la funcion (borrarLibro)
  borrarLibro(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }
  // Peticion get a la funcion (mostrarcategorias)
  getCategorias(): Observable<string[]> {
    return this.http.get<Libro[]>(this.URL).pipe(
      map(libros => [...new Set(libros.map(lib => lib.categoria))])
    );
  }
}
