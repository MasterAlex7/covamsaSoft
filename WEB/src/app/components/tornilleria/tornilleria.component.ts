import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Data, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { DataService } from '../../services/data.service';
import { Proveedores } from '../../interfaces/proveedores';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, finalize, takeUntil } from 'rxjs';
import {MatRadioModule} from '@angular/material/radio';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-tornilleria',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  templateUrl: './tornilleria.component.html',
  styleUrl: './tornilleria.component.css'
})
export class TornilleriaComponent {
  private destroy$ = new Subject<void>();
  linea = new FormControl();
  lineasTornillos: string[] = [];
  proveedores: Proveedores[] = [];
  displayedColumns: string[] = ['idCovamsa', 'Descripcion'];
  dataSource: any = [];
  dataSourceAnterior: any = [];
  mostrarSpinner: boolean = false;
  ID = new FormControl('');
  tablas: string[] = [];
  precios = [];

  constructor(private dataService: DataService, private excel: ExcelService) { }

  ngOnInit(): void {
    this.dataService.getProveedores("Tornilleria").subscribe((data: any) => {
      this.proveedores = data['strAnswer'];
    });

    this.dataService.getLineas().subscribe((data: any) => {
      data['strAnswer'].forEach((element: any) => {
        this.lineasTornillos.push(element['Linea']);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  putProveedores($event: MatCheckboxChange, tabla: string, nomProv: string) {
    if ($event.checked) {
      this.tablas.push(tabla);
      this.displayedColumns.push(nomProv);
    } else {
      const tablaIndex = this.tablas.indexOf(tabla);
      const nomProvIndex = this.displayedColumns.indexOf(nomProv);
      if (tablaIndex !== -1) {
          this.tablas.splice(tablaIndex, 1);
      }
      if (nomProvIndex !== -1) {
          this.displayedColumns.splice(nomProvIndex, 1);
      }
    }
  }

  getCostos(){
    if(this.linea.value != '' && this.ID.value != ''){
      const params = {
        idCovamsa: this.ID.value,
        Linea: this.linea.value,
        arrayProveedores: this.tablas
      }
  
      //console.log(params);
      this.mostrarSpinner = true;
      this.dataService.getCostosTornilleria(params).pipe(
        finalize(() => {
          this.mostrarSpinner = false;
          this.displayedColumns = this.displayedColumns.filter(col => col !== 'Publico' && col !== 'Mayoreo' && col !== 'Platino' && col !== 'Comercio' && col !== 'MAYOR');
        }),
        takeUntil(this.destroy$)
      ).subscribe((data: any) => {
        this.dataSource = data['strAnswer'];
        //console.log(this.dataSource);
      });
  
      this.dataService.getTabPrecios(this.linea.value).pipe(
        takeUntil(this.destroy$)
      ).subscribe((data: any) => {
        this.precios = data['strAnswer'];
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Selecciona una linea y un ID'
      });
    }
  }

  getAnalisis(){
    if(this.dataSource.length != 0){
      this.displayedColumns.push('MAYOR', 'Publico', 'Mayoreo', 'Platino', 'Comercio');
    //console.log(this.precios);

    this.dataSourceAnterior = this.dataSource;
    this.dataSource = this.dataSource.map((element: any) => {
      let nuevoElemento: any = {
        ...element,
        costoMayor: 0,
        publico: 0,
        mayoreo: 0,
        platino: 0,
        comercio: 0,
      };

      this.tablas.forEach((tabla: string) => {
        if (element[tabla] > nuevoElemento.costoMayor) {
          nuevoElemento.costoMayor = element[tabla];
        }
      });

      nuevoElemento.publico = (nuevoElemento.costoMayor * this.precios[0]['Publico']).toFixed(3);
      nuevoElemento.mayoreo = (nuevoElemento.costoMayor * this.precios[0]['Mayoreo']).toFixed(3);
      nuevoElemento.platino = (nuevoElemento.costoMayor * this.precios[0]['Platino']).toFixed(3);
      nuevoElemento.comercio = (nuevoElemento.costoMayor * this.precios[0]['Comercio']).toFixed(3);

      return nuevoElemento;
    });

    //console.log(this.dataSource);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se han cargado los costos'
      });
    
    }
  }

  crearExcel(){
    console.log(this.displayedColumns);
    this.excel.crearExcelTornilleriaCostos(this.dataSource);
  }
}
