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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, finalize, takeUntil } from 'rxjs';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './add-refa.component.html',
  styleUrl: './add-refa.component.css'
})
export class AddRefaComponent {
  private destroy$ = new Subject<void>();
  posiciones: string[] = ['DEL', 'TRAS']
  tipos: string[] = ['Percha', 'Perno', 'Buje', 'Soporte', 'Granada']
  idModelo: string = ''
  Descripcion: string = ''
  Tipo= new FormControl('')
  TipoForma: string = ''
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
  archivoSeleccionado: File | null = null;
  mostrarSpinner: boolean | undefined;

  constructor(private dataService: DataService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.ID = params['idItem']
      this.ruta = params['accion']
      if(params['accion'] == 'editar'){
        this.dataService.getRefaccionesID(params['idItem']).subscribe((response: any) => {
          this.idModelo = response['strAnswer'][0]['idModelo'],
          this.Descripcion = response['strAnswer'][0]['Descripcion'],
          this.Tipo.setValue(response['strAnswer'][0]['TipoRefaccion']),
          this.TipoForma = response['strAnswer'][0]['TipoForma'],
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  submit(){
    if(this.ruta == 'editar'){
      const params = {
        "ID": this.ID,
        "idModelo": this.idModelo,
        "Descripcion": this.Descripcion,
        "Tipo": this.Tipo.value,
        "TipoForma": this.TipoForma,
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
      })}
  }

  add(): boolean{
    return this.ruta == 'add' ? true : false
  }

  seleccionarArchivo(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirArchivo(event: any): void {
    event.preventDefault();

    if (!this.archivoSeleccionado) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    this.mostrarSpinner = true;

    const formData = new FormData();
    formData.append('file', this.archivoSeleccionado);

    this.dataService.postNewProductRefa(formData)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => {
      this.mostrarSpinner = false,
      this.archivoSeleccionado = null
      }))
    .subscribe((data: any) => {
      if (data['intStatus'] == 200) {
        Swal.fire({
          title: 'Exito!',
          text: data['strAnswer'],
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data['strAnswer'],
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
