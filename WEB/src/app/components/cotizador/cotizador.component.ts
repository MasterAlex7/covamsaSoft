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
import { ExcelService } from '../../services/excel.service';
import { LoginService } from '../../services/login.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize, takeUntil, Subject } from 'rxjs';

export interface ProductoTornilleria {
  Cantidad: number,
  CVM: string,
  Codigo: string,
  Descripcion: string,
  Empaque: number,
  PLista: number,
  Descuento: Number,
  Costo: number,
  Importe: number,
}

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cotizador.component.html',
  styleUrl: './cotizador.component.css'
})
export class CotizadorComponent {
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild('cantidadInput') cantidadInput: ElementRef | undefined;
  private destroy$ = new Subject<void>();
  mostrarSpinner: boolean | undefined;
  constructor(private dataService: DataService, private route: ActivatedRoute, private excel: ExcelService, private loginService: LoginService) { }

  ID = new FormControl('');
  Cantidad = new FormControl('');
  Moneda = new FormControl('');
  Importacion = new FormControl('');
  tabla='';
  nombreProveedor = '';
  dataSource: any[] = [];
  total = 0;
  totalFormat = '';
  totalDolaresFormat = '';
  totalWImportFormat = '';
  totalDolares = 0;
  totalWImport = 0;
  archivoSeleccionado: File | null = null;
  isTornilleria = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tabla = params['id'],
      this.nombreProveedor = params['nombre']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayedColumns: string[] = [
    'Cantidad',
    'Codigo',
    'Descripcion',
    'Empaque',
    'P.Lista',
    'Descuento',
    'Costo',
    'Importe',
    'Eliminar'
  ];

  addProduct(){
    if(this.getType() != "Tornilleria"){
      const params = {
        tabla: this.tabla,
        clave: this.ID.value,
      };
      if(this.getMoneda() != "Dolar"){
        if (this.ID.value != '' && this.Cantidad.value != ''){
          this.dataService.getProductoProv(params).subscribe((data: any) => {
            if (data['intStatus'] == 200) {
              if (!this.dataSource.some(producto => producto.Codigo === data['strAnswer'][0]['CLAVE'])) {
                const auxProducto: Producto = {
                  "Cantidad": Number(this.Cantidad.value) || 0,
                  "Codigo": data['strAnswer'][0]['CLAVE'],
                  "Descripcion": data['strAnswer'][0]['Descripcion'],
                  "Empaque": Number(data['strAnswer'][0]['PzaCaja']),
                  "PLista": Number(data['strAnswer'][0]['PrecioLista']),
                  "Descuento": Number((data['strAnswer'][0]['Descuento'] * 100)),
                  "Costo": Number(data['strAnswer'][0]['Costo']),
                  "Importe": Number((Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo'])).toFixed(2))
                };
                this.dataSource.push(auxProducto);
                console.log(this.dataSource);
                if (this.table) {
                  this.table.renderRows();
                }
                this.total = this.total + Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo']);
                this.total = Number(this.total.toFixed(2));
                this.totalFormat = this.currencyFormatter({ currency: 'MXN', value: this.total });
                this.Cantidad.setValue('');
                this.ID.setValue('');
                this.cantidadInput?.nativeElement.focus();
              }else{
                Swal.fire({
                  title: 'Error',
                  text: 'El producto ya se encuentra en la lista',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
                this.ID.setValue('');
                this.Cantidad.setValue('');
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
        if (this.ID.value != '' && this.Cantidad.value != ''){
          this.dataService.getProductoProv(params).subscribe((data: any) => {
            if (data['intStatus'] == 200) {
                if (!this.dataSource.some(producto => producto.Codigo === data['strAnswer'][0]['CLAVE'])) {
                  const auxProducto: Producto = {
                    "Cantidad": Number(this.Cantidad.value) || 0,
                    "Codigo": data['strAnswer'][0]['CLAVE'],
                    "Descripcion": data['strAnswer'][0]['Descripcion'],
                    "Empaque": Number(data['strAnswer'][0]['PzaCaja']),
                    "PLista": Number(data['strAnswer'][0]['PrecioLista']),
                    "Descuento": Number((data['strAnswer'][0]['Descuento'] * 100)),
                    "Costo": Number(data['strAnswer'][0]['Costo']),
                    "Importe": Number((Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo'])).toFixed(2))
                  };
                  this.dataSource.push(auxProducto);
                  console.log(this.dataSource);
                  if (this.table) {
                    this.table.renderRows();
                  }
                  this.total = this.total + Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo']);
                  this.total = Number(this.total.toFixed(2));
                  this.totalFormat = this.currencyFormatter({ currency: 'MXN', value: this.total });
                  this.Cantidad.setValue('');
                  this.ID.setValue('');
                  this.cantidadInput?.nativeElement.focus();
                }else{
                  Swal.fire({
                    title: 'Error',
                    text: 'El producto ya se encuentra en la lista',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
                  this.ID.setValue('');
                  this.Cantidad.setValue('');
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
      }
    }else{
      this.isTornilleria = true;
      this.displayedColumns = [
        'Cantidad',
        'CVM',
        'Codigo',
        'Descripcion',
        'Empaque',
        'P.Lista',
        'Descuento',
        'Costo',
        'Importe',
        'Eliminar'
      ]
      const params = {
        tabla: this.tabla,
        idCovamsa: this.ID.value,
        proveedor: this.nombreProveedor
      }
      this.dataService.getTornilleriaProd(params).subscribe((data: any) => {
        if(data['intStatus'] == 200){
            if (!this.dataSource.some(producto => producto.Codigo === data['strAnswer'][0]['CLAVE'])) {
              const auxProducto: ProductoTornilleria = {
                "Cantidad": Number(this.Cantidad.value) || 0,
                "CVM": this.ID.value!,
                "Codigo": data['strAnswer'][0]['CLAVE'],
                "Descripcion": data['strAnswer'][0]['Descripcion'],
                "Empaque": Number(data['strAnswer'][0]['PzaCaja']),
                "PLista": Number(data['strAnswer'][0]['PrecioLista']),
                "Descuento": Number((data['strAnswer'][0]['Descuento'] * 100)),
                "Costo": Number(data['strAnswer'][0]['Costo']),
                "Importe": Number((Number(this.Cantidad.value) * Number(data['strAnswer'][0]['Costo'])).toFixed(2))
              };
              this.dataSource.push(auxProducto);
              console.log(this.dataSource);
              if (this.table) {
                this.table.renderRows();
              }
              this.total = this.total + Number(this.Cantidad.value) * Number(data['strAnswer'][0].Costo);
              this.total = Number(this.total.toFixed(2));
              this.totalFormat = this.currencyFormatter({ currency: 'MXN', value: this.total });
              this.Cantidad.setValue('');
              this.ID.setValue('');
              this.cantidadInput?.nativeElement.focus();
            }else{
              Swal.fire({
                title: 'Error',
                text: 'El producto ya se encuentra en la lista',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              this.ID.setValue('');
              this.Cantidad.setValue('');
            }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontró el producto con clave "'+this.ID.value+'"',
          });
          this.Cantidad.setValue('');
          this.ID.setValue('');
        }
      });
    }
  }

  getMoneda(){
    return localStorage.getItem('moneda');
  }

  crearExcel(){
    if(this.dataSource.length > 0){
      const filename = 'Cotizacion_' + this.tabla;
      if(this.getMoneda() != "Dolar"){
        this.excel.crearExcel(this.dataSource, filename, this.total);
        this.total = 0;
        this.totalFormat = this.currencyFormatter({ currency: 'MXN', value: this.total });
        this.dataSource = [];
        this.table?.renderRows();
        this.cantidadInput?.nativeElement.focus();
        this.Cantidad.setValue('');
        this.ID.setValue('');
      }else{
        const tipoCambio = Number(this.Moneda.value)
        this.excel.crearExcelDolar(this.dataSource, filename, this.total, this.totalDolares,tipoCambio, this.totalWImport);
        this.total = 0;
        this.totalFormat = this.currencyFormatter({ currency: 'MXN', value: this.total });
        this.totalDolares = 0;
        this.totalDolaresFormat = this.currencyFormatter({ currency: 'USD', value: this.totalDolares });
        this.dataSource = [];
        this.table?.renderRows();
        this.cantidadInput?.nativeElement.focus();
        this.Cantidad.setValue('');
        this.ID.setValue('');
        this.Moneda.setValue('');
        this.Importacion.setValue('');
        this.totalWImport = 0;
        this.totalWImportFormat = this.currencyFormatter({ currency: 'USD', value: this.totalWImport });
      }
    }else{
      Swal.fire({
        title: 'Error al crear cotizacion',
        text: 'No hay productos en la lista',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  subirArchivo(event: any): void {
    event.preventDefault();

    if (!this.archivoSeleccionado) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }
    
    this.mostrarSpinner = true;

    const formData = new FormData();
    formData.append('file', this.archivoSeleccionado);

    this.dataService.postNuevoCatalogo(formData,this.tabla)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => {
      this.mostrarSpinner = false,
      this.archivoSeleccionado = null
      }))
    .subscribe((data: any) => {
      if (data['intStatus'] == 200) {
        Swal.fire({
          title: 'Exito!',
          text: data['strAnswer'],
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data['strAnswer'],
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  deleteProduct(element: Producto){
    const index = this.dataSource.indexOf(element);
    this.dataSource.splice(index, 1);
    this.total = this.total - element.Importe;
    this.total = Number(this.total.toFixed(2));
    this.totalFormat = this.currencyFormatter({ currency: 'MXN', value: this.total });
    if(this.dataSource.length == 0){
      this.total = 0;
      this.totalFormat = this.currencyFormatter({ currency: 'MXN', value: this.total });
    }
    if(this.getMoneda() == "Dolar"){
      this.totalDolares = this.total * Number(this.Moneda.value);
      this.totalDolares = Number(this.totalDolares.toFixed(2));
      this.totalDolaresFormat = this.currencyFormatter({ currency: 'USD', value: this.totalDolares });
      this.totalWImport = this.totalDolares+(this.totalDolares * (Number(this.Importacion.value)/100));
      this.totalWImport = Number(this.totalWImport.toFixed(2));
      this.totalWImportFormat = this.currencyFormatter({ currency: 'USD', value: this.totalWImport });
    }
    this.table?.renderRows();
  }

  seleccionarArchivo(event: any): void {
    this.archivoSeleccionado = event.target.files[0];
  }

  applyChange(){
    if(this.Moneda.value != ''){
      this.totalDolares = this.total * Number(this.Moneda.value);
      this.totalDolares = Number(this.totalDolares.toFixed(2));
      this.totalDolaresFormat = this.currencyFormatter({ currency: 'USD', value: this.totalDolares });
    }else{
      this.totalDolares = 0;
      this.totalDolaresFormat = this.currencyFormatter({ currency: 'USD', value: this.totalDolares });
    }
  }

  isImport(){
    if(this.tabla == "championprov" || this.tabla == "mercerprov"){
      return true;
    }else{
      return false;
    }
  }

  applyImport(){
    if(this.Importacion.value != '' && this.totalDolares != 0){
      this.totalWImport = this.totalDolares+(this.totalDolares * (Number(this.Importacion.value)/100));
      this.totalWImport = Number(this.totalWImport.toFixed(2));
      this.totalWImportFormat = this.currencyFormatter({ currency: 'USD', value: this.totalWImport });
    }else{
      this.totalWImport = 0;
      this.totalWImportFormat = this.currencyFormatter({ currency: 'USD', value: this.totalWImport });
    }
  }

  isMaster(): boolean {
    return this.loginService.getAuthToken() == "master";
  }

  getType(){
    return sessionStorage.getItem('type');
  }

  currencyFormatter({ currency, value}: { currency: string, value: number}) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }
}
