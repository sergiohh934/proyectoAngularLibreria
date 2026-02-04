import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutentificadorService } from '../../../services/autentificador.service';

@Component({
  selector: 'app-headeruser',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './headeruser.html',
  styleUrls: ['./headeruser.css']
})
export class HeaderUser {

  constructor(private authService: AutentificadorService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
