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
  selector: 'app-add-refa',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './add-refa.component.html',
  styleUrl: './add-refa.component.css'
})
export class AddRefaComponent {
  posiciones: string[] = ['DEL', 'TRAS']
  idModelo: string = ''
  Descripcion: string = ''
  Tipo: string = ''
  Unidad: string = ''
  Modelo: string = ''
  Anio: string = ''
  Posicion= new FormControl('')
  DiametroInt: string = ''
  DiametroExt: string = ''
  Largo: string = ''
  LargoTot: string = ''
  info: string = ''
  ID: string = ''
  ruta: string = ''

  constructor(private dataService: DataService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.ID = params['idItem']
      this.ruta = params['accion']
      if(params['accion'] == 'editar'){
        this.dataService.getRefaccionesID(params['idItem']).subscribe((response: any) => {
          this.idModelo = response['strAnswer'][0]['idModelo'],
          this.Descripcion = response['strAnswer'][0]['Descripcion'],
          this.Tipo = response['strAnswer'][0]['Tipo'],
          this.Unidad = response['strAnswer'][0]['Unidad'],
          this.Modelo = response['strAnswer'][0]['Modelo'],
          this.Anio = response['strAnswer'][0]['Anio'],
          this.Posicion.setValue(response['strAnswer'][0]['Posicion']),
          this.DiametroInt = response['strAnswer'][0]['DiametroInt'],
          this.DiametroExt = response['strAnswer'][0]['DiametroExt'],
          this.Largo = response['strAnswer'][0]['Largo'],
          this.LargoTot = response['strAnswer'][0]['LargoTot'],
          this.info = response['strAnswer'][0]['info']
        })
      }
    });
  }


  submit(){
    if(this.ruta == 'editar'){
      const params = {
        "ID": this.ID,
        "idModelo": this.idModelo,
        "Descripcion": this.Descripcion,
        "Tipo": this.Tipo,
        "Unidad": this.Unidad,
        "Modelo": this.Modelo,
        "Anio": this.Anio,
        "Posicion": this.Posicion.value,
        "DiametroInt": this.DiametroInt,
        "DiametroExt": this.DiametroExt,
        "Largo": this.Largo,
        "LargoTot": this.LargoTot,
        "info": this.info
      }
      this.dataService.putEditProductRefa(params).subscribe((response: any) => {
        if(response['intStatus'] == 200){
          Swal.fire({
            title: 'Refacción editada',
            icon: 'success'
          })
          this.route.navigate(['/menuRefacciones'])
        }else{
          Swal.fire({
            title: 'Error',
            text: 'No se pudo editar la refacción',
            icon: 'error'
          })
        }
      })}else{
        const params = {
          "idModelo": this.idModelo,
          "Descripcion": this.Descripcion,
          "Tipo": this.Tipo,
          "Unidad": this.Unidad,
          "Modelo": this.Modelo,
          "Anio": this.Anio,
          "Posicion": this.Posicion.value,
          "DiametroInt": this.DiametroInt,
          "DiametroExt": this.DiametroExt,
          "Largo": this.Largo,
          "LargoTot": this.LargoTot,
          "info": this.info
        }
      this.dataService.postNewProductRefa(params).subscribe((response: any) => {
        if(response['intStatus'] == 200){
          Swal.fire({
            title: 'Refacción agregada',
            icon: 'success'
          })
          this.idModelo = ''
          this.Descripcion = ''
          this.Tipo = ''
          this.Unidad = ''
          this.Modelo = ''
          this.Anio = ''
          this.Posicion.setValue('')
          this.DiametroInt = ''
          this.DiametroExt = ''
          this.Largo = ''
          this.LargoTot = ''
          this.info = ''
          this.ID = ''
        }else{
          Swal.fire({
            title: 'Error',
            text: 'No se pudo agregar la refacción',
            icon: 'error'
          })
        }
      })}
  }
}
