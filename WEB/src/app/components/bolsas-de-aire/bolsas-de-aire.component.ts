import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { AplicacionBAPipe } from '../../pipes/aplicacion-ba.pipe';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DataBolsasDeAire } from '../../interfaces/data-bolsas-de-aire';

@Component({
  selector: 'app-bolsas-de-aire',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    AplicacionBAPipe,
    RouterModule
  ],
  templateUrl: './bolsas-de-aire.component.html',
  styleUrl: './bolsas-de-aire.component.css'
})
export class BolsasDeAireComponent implements OnInit{
  dataSource: DataBolsasDeAire[] = [];
  datosOriginales: DataBolsasDeAire[] = [];
  aplicaciones: string[] = [];
  Aplicacion= new FormControl('');
  Buscar = new FormControl('');

  constructor(private dataService: DataService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.dataService.getBolsasDeAire().subscribe((data) => {
      this.dataSource = data['strAnswer'];
      this.datosOriginales = [...this.dataSource];
      console.log(this.dataSource);

      const filteredAplicaciones1 = this.dataSource
      .map((data) => data.Aplicacion1)
      .filter((value, index, self) => self.indexOf(value) === index);
      const filteredAplicaciones2 = this.dataSource
      .map((data) => data.Aplicacion2)
      .filter((value, index, self) => self.indexOf(value) === index);
      const filteredAplicaciones3 = this.dataSource
      .map((data) => data.Aplicacion3)
      .filter((value, index, self) => self.indexOf(value) === index);
      
      this.aplicaciones = [...filteredAplicaciones1, ...filteredAplicaciones2, ...filteredAplicaciones3];
      this.aplicaciones = this.aplicaciones.filter((value, index, self) => self.indexOf(value) === index);
    });

    this.Buscar.valueChanges.subscribe((value) => {
      this.buscar(value);
    });

    if(this.getUser() == 'master'){
      this.displayedColumns= [
        'GABRIEL',
        'FIRESTONE',
        'GOODYEAR',
        'CONTITECH',
        'Aplicacion1',
        'Aplicacion2',
        'Aplicacion3',
        'OE1',
        'OE2',
        'OE3',
        'Tapa',
        'Membrana',
        'Piston',
        'info',
        'actions'
      ];
    }
  }
  
  displayedColumns: string[] = [
    /* 'ID', */
    'GABRIEL',
    'FIRESTONE',
    'GOODYEAR',
    'CONTITECH',
    'Aplicacion1',
    'Aplicacion2',
    'Aplicacion3',
    'OE1',
    'OE2',
    'OE3',
    'Tapa',
    'Membrana',
    'Piston',
    'info'
  ];

  buscar(value: string | null) {
    if (!value) {
      // Si el value de búsqueda es nulo o una cadena vacía, restaurar a los datos originales
      this.dataSource = [...this.datosOriginales];
    } else {
      // Si hay un value de búsqueda, aplicar el filtro
      const resultadoBusqueda = this.datosOriginales.filter((dato) => {
        return dato.GABRIEL.toLowerCase().includes(value.toLowerCase()) || 
        dato.FIRESTONE.toLowerCase().includes(value.toLowerCase()) || 
        dato.GOODYEAR.toLowerCase().includes(value.toLowerCase()) ||
        dato.CONTITECH.toLowerCase().includes(value.toLowerCase()) ||
        dato.OE1.toLowerCase().includes(value.toLowerCase()) ||
        dato.OE2.toLowerCase().includes(value.toLowerCase()) ||
        dato.OE3.toLowerCase().includes(value.toLowerCase());
      });

      // Asignar los resultados filtrados al dataSource
      this.dataSource = resultadoBusqueda;
    }
  }

  borrarFiltro(){
    this.Aplicacion.setValue('');
    this.Buscar.setValue('');
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
      if (data.GABRIEL === element.GABRIEL) {
        data.info = element.valorInput;
      }
    });
    this.dataSource = [...this.dataSource];

    const data ={
      "idGabriel": element.GABRIEL,
      "info": element.valorInput,
    }
    this.dataService.postBolsasDeAire(data).subscribe((data) => {
      console.log(data);
    });
    
    console.log(this.dataSource);
    element.mostrarInput = false; // Oculta el input después de guardar
  }

  cerrarInput(element: any) {
    element.mostrarInput = false; // Oculta el input al perder el foco
  }

  getUser(): string | null{
    return this.loginService.getAuthToken();
  }

  deleteProducto(GABRIEL: string) {
    const params={
      "GABRIEL": GABRIEL
    }
    this.dataService.deleteProductBA(params).subscribe((response) => {
      if(response["intStatus"] == 200){
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response["strAnswer"],
        });
        this.ngOnInit();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response["strAnswer"],
        });
      }
    });
  }
}
