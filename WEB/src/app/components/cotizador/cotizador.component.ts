import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { ViewChild, ElementRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.css'
})
export class CotizadorComponent {
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild('IDinput') IDInput: ElementRef | undefined;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ID = new FormControl('');
  Cantidad = new FormControl('');
  Moneda = new FormControl('');
  tabla='';
  dataSource: Producto[] = [];
  total = 0;
  totalDolares = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tabla = params['id']
    });
  }

  displayedColumns: string[] = [
    'Cantidad',
    'Codigo',
    'Descripcion',
    'Empaque',
    'P.Lista',
    'Descuento',
    'Costo',
    'Importe'
  ];

  addProduct(){
    const params = {
      tabla: this.tabla,
      clave: this.ID.value,
    };
    if(this.getMoneda() != "Dolar"){
      if (this.ID.value != '' && this.Cantidad.value != ''){
        this.dataService.getProductoProv(params).subscribe((data: any) => {
          if (data['intStatus'] == 200) {
            if(Number(this.Cantidad.value) % Number(data['strAnswer'][0]['PzaCaja']) !== 0){
              Swal.fire({
                title: 'Error en empaque',
                text: 'La cantidad debe ser multiplo o tener un minimo de ' + data['strAnswer'][0]['PzaCaja'],
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              this.ID.setValue('');
              this.Cantidad.setValue('');
              return;
            }else{
              const auxProducto: Producto = {
                "Cantidad": Number(this.Cantidad.value) || 0,
                "Codigo": data['strAnswer'][0]['CLAVE'],
                "Descripcion": data['strAnswer'][0]['Descripcion'],
                "Empaque": data['strAnswer'][0]['PzaCaja'],
                "PLista": data['strAnswer'][0]['PrecioLista'],
                "Descuento": (data['strAnswer'][0]['Descuento'] * 100).toString(),
                "Costo": data['strAnswer'][0]['Costo'],
                "Importe": Number((Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo'])).toFixed(2))
              };
              this.dataSource.push(auxProducto);
              console.log(this.dataSource);
              if (this.table) {
                this.table.renderRows();
              }
              this.total = this.total + Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo']);
              this.total = Number(this.total.toFixed(2));
    
              this.Cantidad.setValue('');
              this.ID.setValue('');
              this.IDInput?.nativeElement.focus();
            }
          }else{
            Swal.fire({
              title: 'Error!',
              text: data['strAnswer'],
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            this.ID.setValue('');
            this.Cantidad.setValue('');
          }
        });
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Favor de llenar todos los campos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.ID.setValue('');
        this.Cantidad.setValue('');
      }
    }else{
      if (this.ID.value != '' && this.Cantidad.value != '' && this.Moneda.value != ''){
        this.dataService.getProductoProv(params).subscribe((data: any) => {
          if (data['intStatus'] == 200) {
            const auxProducto: Producto = {
              "Cantidad": Number(this.Cantidad.value) || 0,
              "Codigo": data['strAnswer'][0]['CLAVE'],
              "Descripcion": data['strAnswer'][0]['Descripcion'],
              "Empaque": data['strAnswer'][0]['PzaCaja'],
              "PLista": data['strAnswer'][0]['PrecioLista'],
              "Descuento": (data['strAnswer'][0]['Descuento'] * 100).toString(),
              "Costo": data['strAnswer'][0]['Costo'],
              "Importe": Number((Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo'])).toFixed(2))
            };
            this.dataSource.push(auxProducto);
            console.log(this.dataSource);
            if (this.table) {
              this.table.renderRows();
            }
            this.total = this.total + Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo']);
            this.total = Number(this.total.toFixed(2));

            this.totalDolares = this.total * Number(this.Moneda.value);
            this.totalDolares = Number(this.totalDolares.toFixed(2));

            this.Cantidad.setValue('');
            this.ID.setValue('');
            this.IDInput?.nativeElement.focus();
          }else{
            Swal.fire({
              title: 'Error!',
              text: data['strAnswer'],
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            this.ID.setValue('');
            this.Cantidad.setValue('');
          }
        });
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Favor de llenar todos los campos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.ID.setValue('');
        this.Cantidad.setValue('');
      }
    }
  }

  getMoneda(){
    return localStorage.getItem('moneda');
  }
}
