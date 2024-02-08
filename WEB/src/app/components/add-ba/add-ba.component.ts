import { Component, OnInit } from '@angular/core';
import {  MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import {  MatInputModule  } from '@angular/material/input';
import {  MatFormFieldModule  } from '@angular/material/form-field';
import {  MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-add-ba',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-ba.component.html',
  styleUrl: './add-ba.component.css'
})
export class AddBAComponent implements OnInit{
  GABRIEL: string = "";
  FIRESTONE: string = "";
  GOODYEAR: string = "";
  CONTITECH: string = "";
  Aplicacion1: string = "";
  Aplicacion2: string = "";
  Aplicacion3: string = "";
  OE1: string = "";
  OE2: string = "";
  OE3: string = "";
  Tapa: string = "";
  Membrana: string = "";
  Piston: string = "";
  info: string = "";
  ruta: string = "";

  constructor(private dataService: DataService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
      this.router.params.subscribe((params) => {
        this.ruta = params['accion'];
        if(params['accion'] == 'editar'){
          this.dataService.getBolsasDeAireID(params['idItem']).subscribe((response) => {
            if(response["intStatus"] == 200){
              this.GABRIEL = response["strAnswer"][0]["GABRIEL"];
              this.FIRESTONE = response["strAnswer"][0]["FIRESTONE"];
              this.GOODYEAR = response["strAnswer"][0]["GOODYEAR"];
              this.CONTITECH = response["strAnswer"][0]["CONTITECH"];
              this.Aplicacion1 = response["strAnswer"][0]["Aplicacion1"];
              this.Aplicacion2 = response["strAnswer"][0]["Aplicacion2"];
              this.Aplicacion3 = response["strAnswer"][0]["Aplicacion3"];
              this.OE1 = response["strAnswer"][0]["OE1"];
              this.OE2 = response["strAnswer"][0]["OE2"];
              this.OE3 = response["strAnswer"][0]["OE3"];
              this.Tapa = response["strAnswer"][0]["Tapa"];
              this.Membrana = response["strAnswer"][0]["Membrana"];
              this.Piston = response["strAnswer"][0]["Piston"];
              this.info = response["strAnswer"][0]["info"];
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'No se pudo obtener la información',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          });
        }
      });
  }

  submit() {
    const params = {
      GABRIEL: this.GABRIEL,
      FIRESTONE: this.FIRESTONE,
      GOODYEAR: this.GOODYEAR,
      CONTITECH: this.CONTITECH,
      Aplicacion1: this.Aplicacion1,
      Aplicacion2: this.Aplicacion2,
      Aplicacion3: this.Aplicacion3,
      OE1: this.OE1,
      OE2: this.OE2,
      OE3: this.OE3,
      Tapa: this.Tapa,
      Membrana: this.Membrana,
      Piston: this.Piston,
      info: this.info
    };

    if(this.ruta == 'editar'){
      this.dataService.putEditProductBA(params).subscribe((response) => {
        if(response["intStatus"] == 200){
          Swal.fire({
            title: 'Guardado',
            text: 'La información se ha guardado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.route.navigate(['/bolsasdeaire']);
        }else{
          console.log(response);
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo guardar la información',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }else{
      this.dataService.postNewProductBA(params).subscribe((response) => {
        if(response["intStatus"] == 200){
          Swal.fire({
            title: 'Guardado',
            text: 'La información se ha guardado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.GABRIEL = "";
          this.FIRESTONE = "";
          this.GOODYEAR = "";
          this.CONTITECH = "";
          this.Aplicacion1 = "";
          this.Aplicacion2 = "";
          this.Aplicacion3 = "";
          this.OE1 = "";
          this.OE2 = "";
          this.OE3 = "";
          this.Tapa = "";
          this.Membrana = "";
          this.Piston = "";
          this.info = "";
          this.route.navigate(['/bolsasdeaire']);
        }else{
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo guardar la información',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }
}
