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

interface Tornilleria {
  idCovamsa: string;
  Descripcion: string;
}

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
    MatProgressSpinnerModule
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
  dataSource: Tornilleria[] = [];
  mostrarSpinner: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProveedores("Tornilleria").subscribe((data: any) => {
      this.proveedores = data['strAnswer'];
    });

    this.dataService.getLineas().subscribe((data: any) => {
      data['strAnswer'].forEach((element: any) => {
        this.lineasTornillos.push(element['Linea']);
      });
    });

    this.linea.valueChanges.subscribe((value) => {
      this.getProductos();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  prueba($event: MatCheckboxChange,tablaProv: string,nomProv: string){
    if($event.checked){
      if(this.linea.value != ''){
        this.displayedColumns.push(nomProv);

        this.mostrarSpinner = true;

        const params={
          arrayProductos: this.dataSource,
          tablaProv: tablaProv
        }
        this.dataService.getCostosProveedor(params)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.mostrarSpinner = false;
          }))
        .subscribe((data: any) => {
          if(data['intStatus']==200){
          this.dataSource = this.dataSource.map((element: any) => {
            let nuevoElemento: any = {
              idCovamsa: element.idCovamsa,
              descripcion: element.descripcion,
              ...this.dataSource.filter(item => item.idCovamsa === element.idCovamsa)
                              .reduce((acc, item) => ({ ...acc, ...item }), {}),
            };
          
            data['strAnswer'].forEach((datos: any) => {
              if (datos['idCovamsa'] === element.idCovamsa) {
                nuevoElemento[tablaProv] = datos['Costo'];
              }
            });
          
            return nuevoElemento;
          });

          console.log(this.dataSource);
          }else{
            Swal.fire('Error', 'No existen Costos', 'error');
          }
        });
      }else{
        Swal.fire('Error', 'Seleccione una linea', 'error');
      }
    }else{
      //Swal.fire('Desactivado',nomProv);
      this.displayedColumns = this.displayedColumns.filter((value) => value !== nomProv);
    }
  }

  getProductos() {
    this.dataService.getTornilleriaLinea(this.linea.value).subscribe((data: any) => {
      this.dataSource = data['strAnswer'];
    });
  }
}
