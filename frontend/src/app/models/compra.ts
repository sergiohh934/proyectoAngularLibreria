export class LibroComprado {
  libroId?: string;           
  libroIdString: string = ''; 
  titulo: string = '';
  autor: string = '';
  precio: number = 0;
  cantidad: number = 0;
  isbn?: string;
  imagen?: string;
  categoria?: string;
  subtotal: number = 0;

  constructor(data?: Partial<LibroComprado>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class Compra {
  _id?: string;
  usuarioId: string = '';
  libros: LibroComprado[] = [];
  total: number = 0;
  fecha?: Date;

  constructor(data?: Partial<Compra>) {
    if (data) {
      Object.assign(this, data);
      if (data.libros) {
        this.libros = data.libros.map(libro => new LibroComprado(libro));
      }
    }
  }
}