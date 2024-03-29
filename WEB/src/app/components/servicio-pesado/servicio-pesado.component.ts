import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DataFilterPipe } from '../../pipes/data-filter.pipe';
import { DataService } from '../../services/data.service';
import { PositionFilterPipe } from '../../pipes/position-filter.pipe';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { ServicioPesado } from '../../interfaces/servicio-pesado';

@Component({
  selector: 'app-servicio-pesado',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataFilterPipe,
    PositionFilterPipe,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './servicio-pesado.component.html',
  styleUrl: './servicio-pesado.component.css',
})
export class ServicioPesadoComponent implements OnInit {
  dataSource: ServicioPesado[] = [];
  armadoras: string[] = [];
  posiciones: string[] = [];
  Armadora = new FormControl('');
  Posicion = new FormControl('');
  Buscar = new FormControl('');
  datosOriginales: ServicioPesado[] = [];

  constructor(private dataService: DataService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.dataService.obtenerDatos().subscribe((data) => {
      this.dataSource = data['strAnswer'];
      this.datosOriginales = [...this.dataSource];

      const filteredArmadoras = this.dataSource
        .map((data) => data.Armadora)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.armadoras = filteredArmadoras;

      const filteredPositions = this.dataSource
        .map((data) => data.Posicion)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.posiciones = filteredPositions;
    });

    this.Buscar.valueChanges.subscribe((value) => {
      this.buscar(value);
    });

    if(this.getUser() == 'master'){
      this.displayedColumns = [
        'GABRIEL',
        'MONROE',
        'GRC',
        'Armadora',
        'Posicion',
        'Tipo',
        'LongitudExp',
        'LongitudComp',
        'Carrera',
        'TipoMontajeSup',
        'DiametroSup',
        'LongitudSup',
        'TipoMontajeInf',
        'DiametroInf',
        'LongitudInf',
        'info',
        'actions'
      ];
    }
  }

  displayedColumns: string[] = [
    /* 'ID', */
    'GABRIEL',
    'MONROE',
    'GRC',
    'Armadora',
    'Posicion',
    'Tipo',
    'LongitudExp',
    'LongitudComp',
    'Carrera',
    'TipoMontajeSup',
    'DiametroSup',
    'LongitudSup',
    'TipoMontajeInf',
    'DiametroInf',
    'LongitudInf',
    'info',
  ];

  borrarFiltro() {
    this.Armadora.setValue('');
    this.Posicion.setValue('');
    this.Buscar.setValue('');
    this.dataSource = [...this.datosOriginales];
  }

  buscar(value: string | null) {
    if (!value) {
      // Si el value de búsqueda es nulo o una cadena vacía, restaurar a los datos originales
      this.dataSource = [...this.datosOriginales];
    } else {
      // Si hay un value de búsqueda, aplicar el filtro
      const resultadoBusqueda = this.datosOriginales.filter((dato) => {
        return dato.GABRIEL.toLowerCase().includes(value.toLowerCase()) || dato.MONROE.toLowerCase().includes(value.toLowerCase()) || dato.GRC.toLowerCase().includes(value.toLowerCase());
      });

      // Asignar los resultados filtrados al dataSource
      this.dataSource = resultadoBusqueda;
    }
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
    this.dataService.guardarDatos(data).subscribe((data) => {
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

  deleteProductoSP(GABRIEL: string) {
    const params={
      "GABRIEL": GABRIEL
    }
    this.dataService.deleteProductSP(params).subscribe((response) => {
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
