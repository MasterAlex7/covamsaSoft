import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import Swal from 'sweetalert2';
import { PositionFilterPipe } from '../../pipes/position-filter.pipe';
import { DiaExtPipe } from '../../pipes/pipesRefacciones/dia-ext.pipe';
import { DiaIntPipe } from '../../pipes/pipesRefacciones/dia-int.pipe';
import { LargoPipe } from '../../pipes/pipesRefacciones/largo.pipe';
import { LargoTotalPipe } from '../../pipes/pipesRefacciones/largo-total.pipe';
import { Refaccion } from '../../interfaces/refaccion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogImgComponent } from '../../dialog-img/dialog-img.component';

@Component({
  selector: 'app-refacciones',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    PositionFilterPipe,
    DiaExtPipe,
    DiaIntPipe,
    LargoPipe,
    LargoTotalPipe,
    MatDialogModule
  ],
  templateUrl: './refacciones.component.html',
  styleUrl: './refacciones.component.css'
})
export class RefaccionesComponent implements OnInit{
  constructor(private loginService: LoginService, private dataService: DataService,private route: ActivatedRoute, public dialog: MatDialog) { }
  dataSource: Refaccion[] = [];
  datosOriginales: Refaccion[] = [];
  Buscar = new FormControl('');
  Posicion = new FormControl('');
  DiametroInt = new FormControl('');
  DiametroExt = new FormControl('');
  Largo = new FormControl('');
  LargoTot = new FormControl('');
  posiciones: string[] = [];
  tipoRefaccion = {};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipoRefaccion = {
        "tipo": params['tipo']
      }
    });

    this.dataService.getRefacciones(this.tipoRefaccion).subscribe((data: any) => {
      this.dataSource = data['strAnswer'];
      this.datosOriginales = [...this.dataSource];

      const posiciones = this.dataSource
      .map((data) => data.Posicion)
      .filter((value, index, self) => self.indexOf(value) === index);
      this.posiciones = posiciones.sort();
    });

    this.Buscar.valueChanges.subscribe((value) => {
      this.buscar(value);
    });

    if(this.getUser() == 'master'){
      this.displayedColumns = [
        "idModelo",
        "Descripcion",
        "TipoRefaccion",
        "TipoForma",
        "Unidad",
        "Modelo",
        "Anio",
        "Posicion",
        "DiametroInt",
        "DiametroExt",
        "Largo",
        "LargoTot",
        "info",
        'actions'
      ]
    }
  }

  displayedColumns: string[] = [
    "idModelo",
    "Descripcion",
    "TipoRefaccion",
    "TipoForma",
    "Unidad",
    "Modelo",
    "Anio",
    "Posicion",
    "DiametroInt",
    "DiametroExt",
    "Largo",
    "LargoTot",
    "info"
  ]

  buscar(value: string | null) {
    if(!value){
      this.dataSource = this.datosOriginales;
    } else {
      this.dataSource = this.datosOriginales.filter((data) => {
        return data.Modelo.toLowerCase().includes(value.toLowerCase()) ||
        data.idModelo.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  borrarFiltro() {
    this.Buscar.setValue('');
    this.Posicion.setValue('');
    this.DiametroInt.setValue('');
    this.DiametroExt.setValue('');
    this.Largo.setValue('');
    this.LargoTot.setValue('');
    this.dataSource = this.datosOriginales;
  }

  toggleInput(element: any) {
    if(this.loginService.getAuthToken() == 'ventas' || this.loginService.getAuthToken() == ""){
      element.mostrarInput = false;
    }else{
      element.mostrarInput = !element.mostrarInput;
      element.valorInput = element.info;
    }
  }

  guardarYCerrar(element: any) {
    this.dataSource.map((data) => {
      if (data.ID === element.ID) {
        data.info = element.valorInput;
      }
    });
    this.dataSource = [...this.dataSource];
    const data ={
      "ID": element.ID,
      "info": element.valorInput,
    }
    this.dataService.postRefacciones(data).subscribe((data) => {
      console.log(data);
    });
    
    console.log(this.dataSource);
    element.mostrarInput = false;
  }

  cerrarInput(element: any) {
    element.mostrarInput = false;
  }

  getUser(): string | null {
    return this.loginService.getAuthToken();
  }

  deleteProducto(id: number) {
    const params = {
      "ID": id
    }

    this.dataService.deleteProductRefa(params).subscribe((data) => {
      if(data['intStatus'] == 200){
        Swal.fire({
          title: 'Refacción eliminada',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ngOnInit();
      }else{
        Swal.fire({
          title: 'Error',
          text: data['strAnswer'],
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  mostrarDialogo() {
    const dialogRef = this.dialog.open(DialogImgComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
