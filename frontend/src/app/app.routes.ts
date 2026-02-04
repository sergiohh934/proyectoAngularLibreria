import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Registro } from './components/registro/registro';
import { Altasadmin } from './components/admin/altasadmin/altasadmin';
import { modificacionesadmin } from './components/admin/modificacionesadmin/modificacionesadmin';
import { Productosmain } from './components/user/productosmain/productosmain';
import { Historial } from './components/user/historial/historial';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login},
    { path: 'registro', component: Registro},
    //usuario
    { path: 'productos', component: Productosmain},
    { path: 'historial', component: Historial},
    //admin
    { path: 'admin-gestion', component: modificacionesadmin},
    { path: 'admin-alta', component: Altasadmin},
    //redigire al login si algo no existe, siempre la ultima
    { path: '**', redirectTo: '', pathMatch: 'full'}

];
