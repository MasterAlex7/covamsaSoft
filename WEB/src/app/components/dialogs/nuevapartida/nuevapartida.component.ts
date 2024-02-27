import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../services/data.service';
import { Proveedores } from '../../../interfaces/proveedores';
import { MatTable } from '@angular/material/table';
import { ViewChild, ElementRef } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import Swal from 'sweetalert2';
import { AnalisisTor } from '../../../interfaces/analisis-tor';

@Component({
  selector: 'app-nuevapartida',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule
  ],
  templateUrl: './nuevapartida.component.html',
  styleUrl: './nuevapartida.component.css'
})

export class NuevapartidaComponent {
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild('claveInput') claveInput: ElementRef | undefined;
  displayedColumns: string[] = ['Cantidad','Codigo','Proveedor','Descripcion','Costo','P. Venta'];
  dataSource: AnalisisTor[] = [];
  proveedores: Proveedores[] = [];
  tabla = '';
  Proveedor = new FormControl('');
  nomProv: string[] = [];
  Cantidad = new FormControl('');
  Clave = new FormControl('');
  Utilidad = new FormControl('');
  pVentaDef = 0;
  dataEnviar= {};
  criterio = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProveedores("tornilleria").subscribe((data: any) => {
      this.proveedores = data['strAnswer'];
      const filteredProveedores = this.proveedores.map((data) => data.NombreProv).filter((value, index, self) => self.indexOf(value) === index);
      this.nomProv = filteredProveedores;
    });

    this.Utilidad.valueChanges.subscribe((value) => {
      this.dataSource.forEach((data) => {
        data.PVenta = Number(data.Costo) * (1 + Number(value) / 100);
        data.PVenta = Number(data.PVenta.toFixed(2));
      });
      if(this.table){
        this.table.renderRows();
      }
    });
  }

  addProducto(){
    if(this.Cantidad.value != '' && this.Clave.value != '' && this.Proveedor.value != ''){
      this.tabla = this.proveedores.find((data) => data.NombreProv == this.Proveedor.value)?.TablaProv || '';
      const params = {
        tabla: this.tabla,
        idCovamsa: this.Clave.value,
        proveedor: this.Proveedor.value
      }
      //console.log(params);
      this.dataService.getTornilleriaProd(params).subscribe((data: any) => {
        if(data['intStatus'] == 200){
          //this.dataSource.push(data['strAnswer'][0]);
          //console.log(data['strAnswer'][0]);
          const aux = {
            Cantidad: Number(this.Cantidad.value),
            Codigo: String(data['strAnswer'][0].CLAVE),
            Proveedor: this.Proveedor.value || '',
            Descripcion: String(data['strAnswer'][0].Descripcion),
            Costo: Number(data['strAnswer'][0].Costo),
            PVenta: 0
          }
          this.dataSource.push(aux);
          //console.log(this.dataSource);
          if(this.table){
            this.table.renderRows();
          }
          this.Cantidad.setValue('');
          this.Clave.setValue('');
          this.Proveedor.setValue('');
          this.claveInput?.nativeElement.focus();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el producto con clave "'+this.Clave.value+'"',
          });
          this.Cantidad.setValue('');
          this.Clave.setValue('');
          this.Proveedor.setValue('');
          this.claveInput?.nativeElement.focus();
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes llenar todos los campos para agregar un producto',
      });
      this.claveInput?.nativeElement.focus();
    }
    //console.log(this.dataSource);
  }

  changePVenta(event: MatButtonToggleChange){
    if(this.Utilidad.value != ''){
      if(event.value == 'promedio'){
        this.pVentaDef = 0;
        this.dataSource.forEach((data) => {
          this.pVentaDef += data.PVenta;
        });
        this.pVentaDef = this.pVentaDef / this.dataSource.length;
        this.pVentaDef = Number(this.pVentaDef.toFixed(2));
        this.criterio = 'PROMEDIO';
      }else if(event.value == 'caro'){
        this.pVentaDef = 0;
        this.dataSource.forEach((data) => {
          if(data.PVenta > this.pVentaDef){
            this.pVentaDef = data.PVenta;
          }
        });
        this.criterio = 'CARO';
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes ingresar la utilidad para calcular el precio de venta',
      });
    }
  }

  enviarDatos(){
    this.dataEnviar = {
      datos: this.dataSource,
      utilidad: this.Utilidad.value,
      pVentaDef: this.pVentaDef,
      criterio: this.criterio
    }
    console.log(this.dataEnviar);
    this.dataService.enviarAnalisis(this.dataEnviar);
  }
}
