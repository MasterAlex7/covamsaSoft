import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { finalize, takeUntil, Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Proveedores } from '../../../interfaces/proveedores';
import { ExcelService } from '../../../services/excel.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-tor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-tor.component.html',
  styleUrl: './add-tor.component.css'
})
export class AddTorComponent {
  private destroy$ = new Subject<void>();
  archivoSeleccionadoVerificar: File | null = null;
  archivoSeleccionadoAdd: File | null = null;
  archivoSeleccionadoAddProduct: File | null = null;
  mostrarSpinner = false;
  Proveedor = new FormControl();
  Linea = new FormControl();
  nomProv: string[] = [];
  proveedores: Proveedores[] = [];
  lineas: string[] = [];

  constructor(private dataService: DataService, private excel: ExcelService) {}

  ngOnInit(): void {
    this.dataService.getProveedores("tornilleria").subscribe((data: any) => {
      this.proveedores = data['strAnswer'];
      const filteredProveedores = this.proveedores.map((data) => data.NombreProv).filter((value, index, self) => self.indexOf(value) === index);
      this.nomProv = filteredProveedores;
    });

    this.dataService.getLineas().subscribe((data: any) => {
      data['strAnswer'].forEach((element: any) => {
        this.lineas.push(element['Linea']);
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  subirArchivoVerificar(event: any): void {
    event.preventDefault();

    if (!this.archivoSeleccionadoVerificar) {
      Swal.fire({
        title: 'Error al cargar el archivo',
        text: 'Selecciona un archivo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
      return;
    }
    
    this.mostrarSpinner = true;

    const formData = new FormData();
    formData.append('file', this.archivoSeleccionadoVerificar);

    if(this.Proveedor.value != null){
      this.dataService.postVerificarCoincidencias(formData,this.Proveedor.value).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.mostrarSpinner = false)
      ).subscribe((data: any) => {
        if (data['intStatus'] === 200) {
          const headers = [ 'CLAVE', 'Nombre' ]
          this.excel.crearExcelNoCoincidencia(data['strAnswer'], headers);
          Swal.fire({
            title: 'Archivo cargado',
            text: 'El archivo se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        } else {
          Swal.fire({
            title: 'Error al cargar el archivo',
            text: 'El archivo no se ha cargado correctamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }
      });
    }else{
      Swal.fire({
        title: 'Error al cargar el archivo',
        text: 'Selecciona un proveedor.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
      this.mostrarSpinner = false;
    }
  }

  subirArchivoAnadir(event: any): void {
    event.preventDefault();

    if (!this.archivoSeleccionadoAdd) {
      Swal.fire({
        title: 'Error al cargar el archivo',
        text: 'Selecciona un archivo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
      return;
    }
    
    this.mostrarSpinner = true;

    const formData = new FormData();
    formData.append('file', this.archivoSeleccionadoAdd);

    if(this.Proveedor.value != null){
      this.dataService.postAddCoincidencias(formData,this.Proveedor.value).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.mostrarSpinner = false)
      ).subscribe((data: any) => {
        if (data['intStatus'] === 200) {
          Swal.fire({
            title: 'Archivo cargado',
            text: 'El archivo se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        } else {
          Swal.fire({
            title: 'Error al cargar el archivo',
            text: 'El archivo no se ha cargado correctamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }
      });
    }else{
      Swal.fire({
        title: 'Error al cargar el archivo',
        text: 'Selecciona un proveedor.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
      this.mostrarSpinner = false;
    }
  }

  subirArchivoAddProduct(event: any): void {
    event.preventDefault();

    if (!this.archivoSeleccionadoAddProduct) {
      Swal.fire({
        title: 'Error al cargar el archivo',
        text: 'Selecciona un archivo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
      return;
    }
    
    this.mostrarSpinner = true;

    const formData = new FormData();
    formData.append('file', this.archivoSeleccionadoAddProduct);

    if(this.Linea.value != null && this.Proveedor.value != null){
      this.dataService.postAddProductTor(formData,this.Linea.value,this.Proveedor.value).pipe(
        takeUntil(this.destroy$),
        finalize(() => this.mostrarSpinner = false)
      ).subscribe((data: any) => {
        if (data['intStatus'] === 200) {
          Swal.fire({
            title: 'Archivo cargado',
            text: 'El archivo se ha cargado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        } else {
          console.log(data);
          Swal.fire({
            title: 'Error al cargar el archivo',
            text: 'El archivo no se ha cargado correctamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        }
      });
    }else{
      Swal.fire({
        title: 'Error al cargar el archivo',
        text: 'Selecciona un proveedor y una línea.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
      this.mostrarSpinner = false;
    }
  }

  seleccionarArchivoAnadir(event: any): void {
    this.archivoSeleccionadoAdd = event.target.files[0];
  }

  seleccionarArchivoVerificar(event: any): void {
    this.archivoSeleccionadoVerificar = event.target.files[0];
  }

  seleccionarArchivoAddProduct(event: any): void {
    this.archivoSeleccionadoAddProduct = event.target.files[0];
  }

  crearPlantilla(tipo: string){
    this.excel.crearPlantilla(tipo);
  }
}
