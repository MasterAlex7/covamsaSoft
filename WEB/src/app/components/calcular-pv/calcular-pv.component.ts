import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DataService } from '../../services/data.service';
import { Proveedores } from '../../interfaces/proveedores';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { ExcelService } from '../../services/excel.service';

export interface DataCalcularPV{
  CLAVE: string;
  Descripcion: string;
  Costo: number;
  PrecioVenta: number;
}

@Component({
  selector: 'app-calcular-pv',
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
    MatCheckboxModule,
    MatRadioModule
  ],
  templateUrl: './calcular-pv.component.html',
  styleUrl: './calcular-pv.component.css'
})
export class CalcularPVComponent {
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  Proveedor = new FormControl();
  Codigo = new FormControl();
  Descripcion = new FormControl();
  Tipo = new FormControl();
  Utilidad = new FormControl();
  proveedores: Proveedores[] = [];
  nomProveedor: string[] = [];
  option: string = "";
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Costo', 'PrecioVenta'];
  tipos = ["Herramientas","Muelles","Tornilleria"];
  dataSource: DataCalcularPV[] = [];
  params = {}

  constructor(private dataService: DataService, private excel: ExcelService) { }

  ngOnInit() {
    this.Tipo.valueChanges.subscribe((tipo) => {
      this.dataService.getProveedores(tipo).subscribe((data) => {
        this.proveedores = data['strAnswer'];
        this.nomProveedor = this.proveedores.map((prov) => prov.NombreProv);
      });
    });

    this.Utilidad.valueChanges.subscribe((prov) => {
      this.dataSource.forEach((data) => {
        data.PrecioVenta = Number(data.Costo * (1 + (this.Utilidad.value/100)));
        data.PrecioVenta = Number(data.PrecioVenta.toFixed(2));
      });
      if(this.table){
        this.table.renderRows();
      }
    });
  }

  buscar(){
    this.Utilidad.setValue(0);
    const prov = this.proveedores.find((prov) => prov.NombreProv == this.Proveedor.value)?.TablaProv;
    if(this.option == "Codigo"){
      this.params = {
        tabla: prov,
        datos: this.Codigo.value,
        tipoBusqueda: this.option
      }
    }else if(this.option == "Descripcion"){
      this.params = {
        tabla: prov,
        datos: this.Descripcion.value,
        tipoBusqueda: this.option
      }
    }

    this.dataService.getProductosProv(this.params).subscribe((data) => {
      if(data['intStatus'] == 200){
        this.dataSource = data['strAnswer'];
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error'
        });
      }
    });
  }

  crearExcel(){
    if(this.Utilidad.value != 0){
      this.excel.crearExcelPrecioVenta(this.dataSource, ['CLAVE', 'Descripcion', 'PrecioVenta']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede crear el archivo sin una utilidad'
      });
    }
  }
}
