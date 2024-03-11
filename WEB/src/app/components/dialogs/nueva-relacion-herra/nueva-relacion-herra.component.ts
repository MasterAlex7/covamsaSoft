import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DataService } from '../../../services/data.service';
import { Proveedores } from '../../../interfaces/proveedores';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { DataRelacion } from '../../../interfaces/data-relacion';

@Component({
  selector: 'app-nueva-relacion-herra',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './nueva-relacion-herra.component.html',
  styleUrl: './nueva-relacion-herra.component.css'
})
export class NuevaRelacionHerraComponent {
  proveedores: Proveedores[] = [];
  nomProveedores: string[] = [];
  Proveedor = new FormControl('');
  Descripcion = new FormControl('');
  displayedColumns: string[] = ['Seleccion','Codigo','Descripcion'];
  dataSource: DataRelacion[] = [];
  dataSource2: DataRelacion[] = [];

  constructor(private dataService: DataService, private dialogRef: MatDialogRef<NuevaRelacionHerraComponent>) { }

  ngOnInit() {
    this.dataService.getProveedores("Herramientas").subscribe((data: any) => {
      this.proveedores = data['strAnswer'];
      this.nomProveedores = this.proveedores.map((prov) => prov.NombreProv);
    });
  }

  addProducto($event: MatCheckboxChange, row: DataRelacion){
    if($event.checked){
      this.dataSource2.push(row);
    }else{
      const index = this.dataSource2.indexOf(row);
      this.dataSource2.splice(index,1);
    }
  }

  buscar(){
    const params ={
      descripcion: this.Descripcion.value,
      tabla: this.proveedores.find((prov) => prov.NombreProv === this.Proveedor.value)?.TablaProv
    }
    
    this.dataService.getProdHerramientasProv(params).subscribe((data: any) => {
      this.dataSource = data['strAnswer'];
    });
  }

  agregar(){
    if(this.dataSource2.length > 0){
      const data = {
        datos: this.dataSource2,
        proveedor: this.Proveedor.value
      }
      this.dataService.enviarRelaciones(data);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado ningun producto'
      });
      this.dialogRef.close('cancelado');
    }
  }

  cancelar(){
    this.dialogRef.close('cancelado');
  }
}
