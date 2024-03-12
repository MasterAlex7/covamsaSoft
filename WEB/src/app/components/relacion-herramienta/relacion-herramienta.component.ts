import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Proveedores } from '../../interfaces/proveedores';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { NuevaRelacionHerraComponent } from '../dialogs/nueva-relacion-herra/nueva-relacion-herra.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { DataRelacion } from '../../interfaces/data-relacion';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';

interface DataRelaciones{
  datos: DataRelacion[];
  proveedor: string;
}

interface DataRelacionAux{
  proveedor: string;
  CLAVE: string;
  Descripcion: string;
}

@Component({
  selector: 'app-relacion-herramienta',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatCheckboxModule,
    MatSidenavModule
  ],
  templateUrl: './relacion-herramienta.component.html',
  styleUrl: './relacion-herramienta.component.css'
})
export class RelacionHerramientaComponent {
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  proveedores: Proveedores[] = [];
  displayedColumns: string[] = ['Seleccion','Codigo','Descripcion'];
  displayedColumns2: string[] = ['Codigo','Descripcion','Proveedor'];
  Partidas: DataRelaciones[] = [];
  dataRecibida= {};
  dataEnviar: DataRelacionAux[] = [];
  desUnificada= new FormControl('');

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.getProveedores("Herramientas").subscribe((data: any) => {
      this.proveedores = data['strAnswer'];
    });
  }

  nuevaPartida(){
    const dialogRef = this.dialog.open(NuevaRelacionHerraComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != 'cancelado'){
        this.dataService.datosRelacionesActuales.subscribe((data: any) => {
          this.dataRecibida = data;
          //console.log(this.dataRecibida);
        });
        this.Partidas.push(this.dataRecibida as DataRelaciones);
        //console.log(this.Partidas);
      }
    });
  }

  addProduct(event: MatCheckboxChange, proveedor: string, Codigo: string, Descripcion: string){
    if(event.checked){
      const auxData = {
        proveedor: proveedor,
        CLAVE: Codigo,
        Descripcion: Descripcion
      }
      this.dataEnviar.push(auxData as never);
    }else{
      const index = this.dataEnviar.findIndex((data) => data.CLAVE === Codigo);
      this.dataEnviar.splice(index,1);
    }
    //console.log(this.dataEnviar);
    if(this.table){
      this.table.renderRows();
    }
  }

  guardarRelacion(){
    const params = {
      descripcion: this.desUnificada.value,
      data: this.dataEnviar
    }

    this.dataService.postRelacionHerramientas(params).subscribe((data: any) => {
      if(data['intStatus']==200){
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'Relacion guardada correctamente'
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar la relacion'+data['strAnswer']
        });
      }
    });

    console.log(params);
  }
}
