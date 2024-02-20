import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.css'
})
export class CotizadorComponent {

  displayedColumns: string[] = [
    'Cantidad',
    'Codigo',
    'Descripcion',
    'Empaque',
    'P.Lista',
    'Descuento',
    'Costo',
    'Importe'
  ];

  getMoneda(){
    return localStorage.getItem('moneda');
  }
}
