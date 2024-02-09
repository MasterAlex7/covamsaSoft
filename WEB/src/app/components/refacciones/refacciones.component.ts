import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';

export interface Refaccion {
  ID: number,
  idModelo: string,
  Descripcion: string,
  Tipo: string,
  Unidad: string,
  Modelo: string,
  Anio: string,
  Posicion: string,
  DiametroInt: string,
  DiametroExt: string,
  Largo: string,
  LargoTot: string,
  info: string,
}

@Component({
  selector: 'app-refacciones',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './refacciones.component.html',
  styleUrl: './refacciones.component.css'
})
export class RefaccionesComponent implements OnInit{
  constructor(private loginService: LoginService, private dataService: DataService) { }

  ngOnInit(): void {
      
  }

  displayedCloumns: string[] = [
    "ID",
    "idModelo",
    "Descripcion",
    "Tipo",
    "Unidad",
    "Modelo",
    "Anio",
    "Posicion",
    "DiametroInt",
    "DiametroExt",
    "Largo",
    "LargoTot",
    "info"
  ]
}
