import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { NuevaRelacionHerraComponent } from '../dialogs/nueva-relacion-herra/nueva-relacion-herra.component';

interface DataHerramienta {
  idCovamsa: string,
  Descripcion: string, 
  CLAVE: string, 
  Proveedor: string
}

@Component({
  selector: 'app-herramientas',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './herramientas.component.html',
  styleUrl: './herramientas.component.css'
})
export class HerramientasComponent {
  id = new FormControl('');
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Proveedor'];
  dataSource: DataHerramienta[] = [];
  idCovamsa: string | undefined;
  dataRecibida = {};

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  buscar(){
    if(this.id.value != ''){
      const idValue = this.id.value || '';
      this.dataService.getHerramientaCoincidencia(idValue).subscribe((data) => {
        if(data['intStatus'] == 200){
          this.dataSource = data['strAnswer'];
          this.idCovamsa = this.dataSource[0].idCovamsa;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data['strAnswer']
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha ingresado un valor'
      });
    }
  }

  addCoincidencia(){
    if(this.idCovamsa != '' && this.idCovamsa != undefined){
      const dialogRef = this.dialog.open(NuevaRelacionHerraComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != 'cancelado'){
        this.dataService.datosRelacionesActuales.subscribe((data: any) => {
          this.dataRecibida = data;
        });

        const params = {
          idCovamsa: this.idCovamsa,
          Proveedor: (this.dataRecibida as any)['proveedor'],
          CLAVE: (this.dataRecibida as any)['datos'][0]['CLAVE'],
        };
        this.dataService.putHerramientaCoincidencia(params).subscribe((data) => {
          if(data['intStatus'] == 200){
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: data['strAnswer']
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['strAnswer']
            });
          }
        });
      }
    });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se ha ingresado un valor'
      });
    }
  }
}
