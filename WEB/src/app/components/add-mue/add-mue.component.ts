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
  selector: 'app-add-mue',
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
  templateUrl: './add-mue.component.html',
  styleUrl: './add-mue.component.css'
})
export class AddMueComponent implements OnInit{
  posiciones: string[] = ['DEL', 'TRAS', '-----']
  RASSINI: string = ''
  MAF: string = ''
  SANDOVAL: string = ''
  ORIGINAL: string = ''
  No: string = ''
  Ancho: string = ''
  Espesor: string = ''
  Lfrontal: string = ''
  Ltrasero: string = ''
  Posicion= new FormControl('')
  info: string = ''
  marca: string = ''
  ruta: string = ''

  constructor(private dataService: DataService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
      this.router.params.subscribe(params => {
        this.ruta = params['accion']
        if(this.ruta == 'editar'){
          this.dataService.getMuellesID(params['idItem']).subscribe((response: any) => {
            this.RASSINI = response['strAnswer'][0]['RASSINI'],
            this.MAF = response['strAnswer'][0]['MAF'],
            this.SANDOVAL = response['strAnswer'][0]['SANDOVAL'],
            this.ORIGINAL = response['strAnswer'][0]['ORIGINAL'],
            this.No = response['strAnswer'][0]['No'],
            this.Ancho = response['strAnswer'][0]['Ancho'],
            this.Espesor = response['strAnswer'][0]['Espesor'],
            this.Lfrontal = response['strAnswer'][0]['Lfrontal'],
            this.Ltrasero = response['strAnswer'][0]['Ltrasero'],
            this.Posicion.setValue(response['strAnswer'][0]['Posicion']),
            this.info = response['strAnswer'][0]['info'],
            this.marca = response['strAnswer'][0]['marca']
          })
        }
      })
  }

  submit(){
    const params = {
      "RASSINI": this.RASSINI,
      "MAF": this.MAF,
      "SANDOVAL": this.SANDOVAL,
      "ORIGINAL": this.ORIGINAL,
      "No": this.No,
      "Ancho": this.Ancho,
      "Espesor": this.Espesor,
      "Lfrontal": this.Lfrontal,
      "Ltrasero": this.Ltrasero,
      "Posicion": this.Posicion.value,
      "info": this.info,
      "marca": this.marca
    }

    if(this.ruta == 'editar'){
      this.dataService.putEditProductMue(params).subscribe((response: any) => {
        if(response['intStatus'] == 200){
          Swal.fire({
            title: 'Exito',
            text: response['strAnswer'],
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.route.navigate(['/menuMuelles'])
        }else{
          Swal.fire({
            title: 'Error',
            text: response['strAnswer'],
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
    }else {
      this.dataService.postNewProductMue(params).subscribe((response: any) => {
        if(response['intStatus'] == 200){
          Swal.fire({
            title: 'Exito',
            text: response['strAnswer'],
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.RASSINI = ''
          this.MAF = ''
          this.SANDOVAL = ''
          this.ORIGINAL = ''
          this.No = ''
          this.Ancho = ''
          this.Espesor = ''
          this.Lfrontal = ''
          this.Ltrasero = ''
          this.Posicion.setValue('')
          this.info = ''
          this.marca = ''
        }else{
          Swal.fire({
            title: 'Error',
            text: response['strAnswer'],
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      })
    }
  }

}
