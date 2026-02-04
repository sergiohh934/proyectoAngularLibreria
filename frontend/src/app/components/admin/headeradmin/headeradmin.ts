import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutentificadorService } from '../../../services/autentificador.service';

@Component({
  selector: 'app-headeradmin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './headeradmin.html',
  styleUrls: ['./headeradmin.css']
})
export class Headeradmin {

  constructor(
    private auth: AutentificadorService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
