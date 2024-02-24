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
import { DataService } from '../../../services/data.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-sp',
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
  templateUrl: './add-sp.component.html',
  styleUrl: './add-sp.component.css'
})
export class AddSPComponent implements OnInit{
  posiciones: string[] = ['DEL', 'TRA', 'DEL TRA', 'CAB'];
  tiposMontajes: string[] = ['A', 'AB', 'ABC','P','ATB'];
  tiposAmortiguador: string[] = ['H', 'G'];
  GABRIEL: string = "";
  MONROE: string = "";
  GRC: string = "";
  Armadora: string = "";
  Posicion= new FormControl('');
  Tipo= new FormControl('');
  LongitudExp: string = "";
  LongitudComp: string = "";
  Carrera: string = "";
  TipoMontajeSup= new FormControl('');
  DiametroSup: string = "";
  LongitudSup: string = "";
  TipoMontajeInf= new FormControl('');
  DiametroInf: string = "";
  LongitudInf: string = "";
  info: string = "";
  ruta: string = "";

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.ruta = params['accion'];
      if(params['accion'] == 'editar'){
        this.dataService.getServicioPesadoID(params['idItem']).subscribe((response) => {
          if(response["intStatus"] == 200){
            this.GABRIEL = response["strAnswer"][0]["GABRIEL"];
            this.MONROE = response["strAnswer"][0]["MONROE"];
            this.GRC = response["strAnswer"][0]["GRC"];
            this.Armadora = response["strAnswer"][0]["Armadora"];
            this.Posicion.setValue(response["strAnswer"][0]["Posicion"].toUpperCase());
            this.Tipo.setValue(response["strAnswer"][0]["Tipo"]);
            this.LongitudExp = response["strAnswer"][0]["LongitudExp"];
            this.LongitudComp = response["strAnswer"][0]["LongitudComp"];
            this.Carrera = response["strAnswer"][0]["Carrera"];
            this.TipoMontajeSup.setValue(response["strAnswer"][0]["TipoMontajeSup"]);
            this.DiametroSup = response["strAnswer"][0]["DiametroSup"];
            this.LongitudSup = response["strAnswer"][0]["LongitudSup"];
            this.TipoMontajeInf.setValue(response["strAnswer"][0]["TipoMontajeInf"]);
            this.DiametroInf = response["strAnswer"][0]["DiametroInf"];
            this.LongitudInf = response["strAnswer"][0]["LongitudInf"];
            this.info = response["strAnswer"][0]["info"];
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response["strAnswer"],
            });
          }
        });
      }
    })
  }

  constructor(private dataService: DataService, private router: ActivatedRoute, private route: Router) {}

  submit() {
    const params = {
      "GABRIEL": this.GABRIEL,
      "MONROE": this.MONROE,
      "GRC": this.GRC,
      "Armadora": this.Armadora,
      "Posicion": this.Posicion.value,
      "Tipo": this.Tipo.value,
      "LongitudExp": this.LongitudExp,
      "LongitudComp": this.LongitudComp,
      "Carrera": this.Carrera,
      "TipoMontajeSup": this.TipoMontajeSup.value,
      "DiametroSup": this.DiametroSup,
      "LongitudSup": this.LongitudSup,
      "TipoMontajeInf": this.TipoMontajeInf.value,
      "DiametroInf": this.DiametroInf,
      "LongitudInf": this.LongitudInf,
      "info": this.info
    }

    if(this.ruta == 'editar'){
      this.dataService.putEditProductoSP(params).subscribe(
        (response) => {
          if(response["intStatus"] == 200){
            Swal.fire({
              icon: 'success',
              title: 'Guardado',
              text: response["strAnswer"],
            });
            this.route.navigate(['/servicioPesado']);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response["strAnswer"],
            });
          }
        }
      )
    }else {
      this.dataService.postNewProductSP(params).subscribe(
        (response) => {
          if(response["intStatus"] == 200){
            Swal.fire({
              icon: 'success',
              title: 'Guardado',
              text: response["strAnswer"],
            });
            this.GABRIEL = "";
            this.MONROE = "";
            this.GRC = "";
            this.Armadora = "";
            this.Posicion.setValue('');
            this.Tipo.setValue('');
            this.LongitudExp = "";
            this.LongitudComp = "";
            this.Carrera = "";
            this.TipoMontajeSup.setValue('');
            this.DiametroSup = "";
            this.LongitudSup = "";
            this.TipoMontajeInf.setValue('');
            this.DiametroInf = "";
            this.LongitudInf = "";
            this.info = "";
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: response,
            });
          }
        }
      )
    }
  }
}
