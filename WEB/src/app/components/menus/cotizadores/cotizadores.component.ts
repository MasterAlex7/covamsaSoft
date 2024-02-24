import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Proveedores } from '../../../interfaces/proveedores';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-cotizadores',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './cotizadores.component.html',
  styleUrl: './cotizadores.component.css'
})
export class CotizadoresComponent {
  constructor(private dataService: DataService, private loginService: LoginService, private route: ActivatedRoute) { }
  dataSource: Proveedores[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['tipo']);
      this.dataService.getProveedores(params['tipo']).subscribe((data) => {
        this.dataSource = data['strAnswer'];
      });
    });
  }

  setMoneda(tipoMoneda: string){
    localStorage.setItem('moneda', tipoMoneda);
  }
}
