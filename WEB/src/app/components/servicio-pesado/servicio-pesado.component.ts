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

export interface DataExample {
  ID: number;
  GABRIEL: string;
  MONROE: string;
  GRC: string;
  Armadora: string;
  Posicion: string;
  Tipo: string;
  LongitudExp: string;
  LongitudComp: string;
  Carrera: string;
  TipoMontajeSup: string;
  DiametroSup: string;
  LongitudSup: string;
  TipoMontajeInf: string;
  DiametroInf: string;
  LongitudInf: string;
  info: string;
}

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
    MatTooltipModule
  ],
  templateUrl: './servicio-pesado.component.html',
  styleUrl: './servicio-pesado.component.css',
})
export class ServicioPesadoComponent implements OnInit {
  dataSource: DataExample[] = [];
  armadoras: string[] = [];
  posiciones: string[] = [];
  Armadora = new FormControl('');
  Posicion = new FormControl('');
  Buscar = new FormControl('');
  datosOriginales: DataExample[] = [];

  constructor(private dataService: DataService) {}

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
    'info'
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
    element.mostrarInput = !element.mostrarInput;
    element.valorInput = element.info;
  }

  guardarYCerrar(element: any) {
    // Puedes guardar la información aquí, por ejemplo: this.servicio.guardarInformacion(element.valorInput);
    this.dataSource.map((data) => {
      if (data.GABRIEL === element.GABRIEL) {
        data.info = element.valorInput;
      }
    });
    this.dataSource = [...this.dataSource];
    console.log(this.dataSource);
    element.mostrarInput = false; // Oculta el input después de guardar
  }

  cerrarInput(element: any) {
    element.mostrarInput = false; // Oculta el input al perder el foco
  }
}
