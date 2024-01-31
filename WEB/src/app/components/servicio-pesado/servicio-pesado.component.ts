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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.obtenerDatos().subscribe((data) => {
      this.dataSource = data['strAnswer'];

      const filteredArmadoras = this.dataSource
        .map((data) => data.Armadora)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.armadoras = filteredArmadoras;

      const filteredPositions = this.dataSource
        .map((data) => data.Posicion)
        .filter((value, index, self) => self.indexOf(value) === index);
      this.posiciones = filteredPositions;
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
  ];
  borrarFiltro() {
    this.Armadora.setValue('');
    this.Posicion.setValue('');
  }
}
