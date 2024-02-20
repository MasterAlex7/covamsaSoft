import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-cotizadores',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './menu-cotizadores.component.html',
  styleUrl: './menu-cotizadores.component.css'
})
export class MenuCotizadoresComponent {
  constructor(private dataService: DataService, private loginService: LoginService, private route: ActivatedRoute) { }
}
