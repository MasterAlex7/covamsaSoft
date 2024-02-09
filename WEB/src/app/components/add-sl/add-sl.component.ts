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

@Component({
  selector: 'app-add-sl',
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
  templateUrl: './add-sl.component.html',
  styleUrl: './add-sl.component.css'
})
export class AddSlComponent implements OnInit{
  posiciones: string[] = ['Del', 'Tra'];
  tiposAmortiguador: string[] = ['Hidráulico', 'Gas'];

  MarcaAuto: string = ''
  Submarca: string = ''
  Referencia: string = ''
  Modelo: string = ''
  AnoInicio: string = ''
  AnoFinal: string = ''
  Marca: string = ''
  Posicion = new FormControl('')
  Tipo = new FormControl('')
  LongExp: string = ''
  LongComp: string = ''
  Carrera: string = ''
  MontSup: string = ''
  MontInf: string = ''
  MONROE: string = ''
  GRC: string = ''
  KYB: string = ''
  BOGE: string = ''
  info: string = ''
  ruta: string = ''
  IdItem: string = ''

  constructor(private dataService: DataService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
      this.router.params.subscribe((params) => {
        this.ruta = params['accion'];
        this.IdItem = params['idItem'];
        if(params['accion'] == 'editar'){
          this.dataService.getServicioLigeroID(params['idItem']).subscribe((response) => {
            if(response["intStatus"] == 200){
              this.MarcaAuto = response["strAnswer"][0]["MarcaAuto"];
              this.Submarca = response["strAnswer"][0]["Submarca"];
              this.Referencia = response["strAnswer"][0]["Referencia"];
              this.Modelo = response["strAnswer"][0]["Modelo"];
              this.AnoInicio = response["strAnswer"][0]["AnoInicio"];
              this.AnoFinal = response["strAnswer"][0]["AnoFinal"];
              this.Marca = response["strAnswer"][0]["Marca"];
              this.Posicion.setValue(response["strAnswer"][0]["Posicion"]);
              this.Tipo.setValue(response["strAnswer"][0]["Tipo"]);
              this.LongExp = response["strAnswer"][0]["LongExp"];
              this.LongComp = response["strAnswer"][0]["LongComp"];
              this.Carrera = response["strAnswer"][0]["Carrera"];
              this.MontSup = response["strAnswer"][0]["MontSup"];
              this.MontInf = response["strAnswer"][0]["MontInf"];
              this.MONROE = response["strAnswer"][0]["MONROE"];
              this.GRC = response["strAnswer"][0]["GRC"];
              this.KYB = response["strAnswer"][0]["KYB"];
              this.BOGE = response["strAnswer"][0]["BOGE"];
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
      });
  }

  submit() {
    const params = {
      "MarcaAuto": this.MarcaAuto,
      "Submarca": this.Submarca,
      "Referencia": this.Referencia,
      "Modelo": this.Modelo,
      "AnoInicio": this.AnoInicio,
      "AnoFinal": this.AnoFinal,
      "Marca": this.Marca,
      "Posicion": this.Posicion.value,
      "Tipo": this.Tipo.value,
      "LongExp": this.LongExp,
      "LongComp": this.LongComp,
      "Carrera": this.Carrera,
      "MontSup": this.MontSup,
      "MontInf": this.MontInf,
      "MONROE": this.MONROE,
      "GRC": this.GRC,
      "KYB": this.KYB,
      "BOGE": this.BOGE,
      "info": this.info,
      "ID": this.IdItem
    }

    if(this.ruta == 'editar'){
      const params2 = {
        "MarcaAuto": this.MarcaAuto,
        "Submarca": this.Submarca,
        "Referencia": this.Referencia,
        "Modelo": this.Modelo,
        "AnoInicio": this.AnoInicio,
        "AnoFinal": this.AnoFinal,
        "Marca": this.Marca,
        "Posicion": this.Posicion.value,
        "Tipo": this.Tipo.value,
        "LongExp": this.LongExp,
        "LongComp": this.LongComp,
        "Carrera": this.Carrera,
        "MontSup": this.MontSup,
        "MontInf": this.MontInf,
        "MONROE": this.MONROE,
        "GRC": this.GRC,
        "KYB": this.KYB,
        "BOGE": this.BOGE,
        "info": this.info,
        "ID": this.IdItem
      }
      this.dataService.putEditProductSL(params2).subscribe((response) => {
        if(response["intStatus"] == 200){
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: response["strAnswer"],
          });
          this.route.navigate(['/servicioLigero']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response["strAnswer"],
          });
        }
      });
    }else{
      this.dataService.postNewProductSL(params).subscribe((response) => {
        if(response["intStatus"] == 200){
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: response["strAnswer"],
          });
          this.MarcaAuto = ''
          this.Submarca = ''
          this.Referencia = ''
          this.Modelo = ''
          this.AnoInicio = ''
          this.AnoFinal = ''
          this.Marca = ''
          this.Posicion.setValue('')
          this.Tipo.setValue('')
          this.LongExp = ''
          this.LongComp = ''
          this.Carrera = ''
          this.MontSup = ''
          this.MontInf = ''
          this.MONROE = ''
          this.GRC = ''
          this.KYB = ''
          this.BOGE = ''
          this.info = ''
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response["strAnswer"],
          });
        }
      });
    }
  }

}
