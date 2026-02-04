import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificadorService } from '../../../services/autentificador.service';
import { Latizq } from '../latizq/latizq';
import { Latder } from '../latder/latder';
import { Footeruser } from '../footeruser/footeruser';
import { HeaderUser } from '../headeruser/headeruser';
import { Mostrarproductos } from '../mostrarproductos/mostrarproductos';
import { LibrosService } from '../../../services/libros.service';
import { Libro } from '../../../models/libro';
import { Compra, LibroComprado } from '../../../models/compra';
import { ComprasService } from '../../../services/compras.service';
declare var bootstrap: any;

@Component({
  selector: 'app-productosmain',
  imports: [Latizq, Latder, Footeruser, Mostrarproductos, HeaderUser],
  templateUrl: './productosmain.html',
  styleUrl: './productosmain.css',
})
export class Productosmain implements OnInit{
  libros: Libro[]=[];
  librosFiltrados: Libro[] = [];
  categorias: string[] = [];
  carrito: { libro: Libro; cantidad: number }[] = [];
  constructor(
    private auth: AutentificadorService,
    private router: Router,
    private librosService: LibrosService,
    private comprasService: ComprasService
  ){}

  ngOnInit(): void {
    if (!this.auth.esUser()) { 
      this.router.navigate(['/login']);
      alert("Debe loguearse antes de poder acceder a los libros en venta.")
      return;
    }
    //logueo correcto, pasamos a introducir nuevos datos
    this.librosService.mostrarLibros().subscribe(data=>{
      this.libros=data;
      //mapeamos los libros sacando categoria y creamos un set elementos únicos
      this.categorias = [...new Set(data.map(lib => lib.categoria))];
      //muestra todos
      this.librosFiltrados=[...this.libros];
    })
  }
  aplicarFiltro(categoriasSeleccionadas: string[]) {
    if (categoriasSeleccionadas.length === 0) {
      this.librosFiltrados = [...this.libros];
      return;
    }
    //solo coge los libros con categoria seleccionada
    this.librosFiltrados = this.libros.filter(lib =>
      categoriasSeleccionadas.includes(lib.categoria)
    );
  }
  // Agregar libro al carrito temporal
  agregarAlCarrito(libro: Libro) {
    if (libro.stock <= 0) return;

    const index = this.libros.findIndex((l) => l._id === libro._id);
    if (index !== -1) this.libros[index].stock--;

    const carritoIndex = this.carrito.findIndex((c) => c.libro._id === libro._id);
    if (carritoIndex === -1) {
      this.carrito.push({ libro, cantidad: 1 });
    } else {
      this.carrito[carritoIndex].cantidad++;
    }
  }

  // Quitar libro del carrito temporal
  quitarDelCarrito(libro: Libro) {
    const carritoIndex = this.carrito.findIndex((c) => c.libro._id === libro._id);
    if (carritoIndex !== -1) {
      if (this.carrito[carritoIndex].cantidad > 1) {
        this.carrito[carritoIndex].cantidad--;
      } else {
        this.carrito.splice(carritoIndex, 1);
      }

      const index = this.libros.findIndex((l) => l._id === libro._id);
      if (index !== -1) this.libros[index].stock++;
    }
  }

  // Finalizar compra
  finalizarCompra() {
    const usuario = this.auth.obtenerUsuario();
    if (!usuario) {
      this.mostrarToast('toastError', 'No se ha podido obtener el usuario. Inicia sesión de nuevo.');
      return;
    }

    if (this.carrito.length === 0) {
      this.mostrarToast('toastError', 'El carrito está vacío.');
      return;
    }

    // Construimos la compra 
    const compra: Compra = {
      usuarioId: usuario.id,
      libros: this.carrito.map((c): LibroComprado => ({
        libroId: c.libro._id,
        libroIdString: c.libro._id, 
        titulo: c.libro.titulo,
        autor: c.libro.autor,
        precio: c.libro.precio,
        cantidad: c.cantidad,
        isbn: c.libro.isbn,
        imagen: c.libro.imagen,
        categoria: c.libro.categoria,
        subtotal: c.libro.precio * c.cantidad
      })),
      total: this.carrito.reduce((sum, c) => sum + c.libro.precio * c.cantidad, 0),
    };

    this.comprasService.realizarCompra(compra).subscribe({
      next: () => {
        this.mostrarToast('toastSuccess', 'Compra realizada correctamente.');
        this.carrito = [];
      },
      error: (err: any) => {
        console.error(err);
        this.mostrarToast('toastError', 'Error al procesar la compra: ' + (err.error?.error || 'Error desconocido'));
      },
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
}