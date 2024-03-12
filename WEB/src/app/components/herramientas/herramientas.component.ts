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
import Swal from 'sweetalert2';

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
    MatTableModule
  ],
  templateUrl: './herramientas.component.html',
  styleUrl: './herramientas.component.css'
})
export class HerramientasComponent {
  id = new FormControl('');
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Proveedor'];
  dataSource: DataHerramienta[] = [];

  constructor(private dataService: DataService) {}

  buscar(){
    if(this.id.value != ''){
      const idValue = this.id.value || '';
      this.dataService.getHerramientaCoincidencia(idValue).subscribe((data) => {
        if(data['intStatus'] == 200){
          this.dataSource = data['strAnswer'];
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
}
