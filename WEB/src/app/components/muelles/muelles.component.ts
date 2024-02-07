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
import { PositionFilterPipe } from '../../pipes/position-filter.pipe';
import { ActivatedRoute } from '@angular/router';
import { PipeAnchoPipe } from '../../pipes/pipesMuelles/pipe-ancho.pipe';
import { PipeEspesorPipe } from '../../pipes/pipesMuelles/pipe-espesor.pipe';
import { LFrontalPipePipe } from '../../pipes/pipesMuelles/l-frontal-pipe.pipe';
import { LTraseroPipePipe } from '../../pipes/pipesMuelles/l-trasero-pipe.pipe';

export interface DataMuelles {
  ID: number,
  RASSINI: string,
  MAF: string,
  SANDOVAL: string,
  ORIGINAL: string,
  No: string,
  Ancho: string,
  Espesor: string,
  Lfrontal: string,
  Ltrasero: string,
  Posicion: string,
  info: string
}

@Component({
  selector: 'app-muelles',
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
    PositionFilterPipe,
    PipeAnchoPipe,
    PipeEspesorPipe,
    LFrontalPipePipe,
    LTraseroPipePipe
  ],
  templateUrl: './muelles.component.html',
  styleUrl: './muelles.component.css'
})

export class MuellesComponent implements OnInit{
  dataSource: DataMuelles[] = [];
  datosOriginales: DataMuelles[] = [];
  Ancho = new FormControl('');
  Espesor = new FormControl('');
  Buscar = new FormControl('');
  LadoFrontal = new FormControl('');
  LadoTrasero = new FormControl('');
  posiciones: string[] = [];
  Posicion = new FormControl('');
  marcaMuelle= {};

  constructor(private dataService: DataService, private loginService: LoginService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.marcaMuelle = {
        "marca": params['marca']
      };
      console.log(this.marcaMuelle);
    });

    this.dataService.getMuelles(this.marcaMuelle).subscribe(data => {
      console.log(data);
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

    console.log(this.marcaMuelle);
  }
  
  displayedColumns: string[] = [
    'RASSINI',
    'MAF',
    'SANDOVAL',
    'ORIGINAL',
    'No',
    'Ancho',
    'Espesor',
    'Lfrontal',
    'Ltrasero',
    'Posicion',
    'info'
  ]

  buscar(value: string | null) {
    if(!value){
      this.dataSource = [...this.datosOriginales];
    } else {
      this.dataSource = this.datosOriginales.filter((val) => {
        return val.RASSINI.toLowerCase().includes(value.toLowerCase()) ||
        val.MAF.toLowerCase().includes(value.toLowerCase()) || 
        val.SANDOVAL.toLowerCase().includes(value.toLowerCase()) || 
        val.ORIGINAL.toLowerCase().includes(value.toLowerCase()) ||
        val.info.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  borrarFiltro(){
    this.Buscar.setValue('');
    this.Ancho.setValue('');
    this.Espesor.setValue('');
    this.LadoFrontal.setValue('');
    this.LadoTrasero.setValue('');
    this.Posicion.setValue('');
    this.dataSource = [...this.datosOriginales];
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
    this.dataService.postMuelles(data).subscribe((data) => {
      console.log(data);
    });
    
    console.log(this.dataSource);
    element.mostrarInput = false; // Oculta el input después de guardar
  }

  cerrarInput(element: any) {
    element.mostrarInput = false; // Oculta el input al perder el foco
  }
}
