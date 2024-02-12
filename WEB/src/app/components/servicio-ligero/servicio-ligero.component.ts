import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginService } from '../../services/login.service';
import { MarcaPipe } from '../../pipes/marca.pipe';
import { ModeloPipe } from '../../pipes/modelo.pipe';
import { SubmarcaPipe } from '../../pipes/submarca.pipe';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DatosServicioLigero } from '../../interfaces/datos-servicio-ligero';

@Component({
  selector: 'app-servicio-ligero',
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
    MarcaPipe,
    ModeloPipe,
    SubmarcaPipe,
    RouterModule
  ],
  templateUrl: './servicio-ligero.component.html',
  styleUrl: './servicio-ligero.component.css'
})
export class ServicioLigeroComponent implements OnInit{
  dataSource: DatosServicioLigero[] = [];
  datosOriginales: DatosServicioLigero[] = [];
  marcas: string[] = [];
  modelos: string[] = [];
  submarcas: string[] = [];
  anios: string[] = [];

  Marca = new FormControl('');
  Modelo = new FormControl('');
  Submarca = new FormControl('');
  Buscar = new FormControl('');
  

  constructor(private dataService: DataService, private loginService: LoginService) {}

  displayedColumns: string[] = [
    'MarcaAuto',
    'Submarca',
    'Referencia',
    'Modelo',
    'AnoInicio',
    'AnoFinal',
    'Marca',
    'Posicion',
    'Tipo',
    'LongExp',
    'LongComp',
    'Carrera',
    'MontSup',
    'MontInf',
    'MONROE',
    'GRC',
    'KYB',
    'BOGE',
    'info'
  ];

  ngOnInit(): void {
    this.dataService.getServicioLigero().subscribe((data) => {
      this.dataSource = data['strAnswer'];
      this.datosOriginales = [...this.dataSource];

      const marcas = this.dataSource
      .map((data) => data.MarcaAuto)
      .filter((value, index, self) => self.indexOf(value) === index);
      this.marcas = marcas.sort();

      this.dataService.modelos$.subscribe(modelos => {
        this.modelos = modelos.sort();
      });

      const submarcas = this.dataSource
      .map((data) => data.Submarca)
      .filter((value, index, self) => self.indexOf(value) === index);
      this.submarcas = submarcas.sort();
    });
    
    this.Buscar.valueChanges.subscribe((value) => {
      this.buscar(value);
    });
    
    if(this.getUser() == 'master'){
      this.displayedColumns=[
        'MarcaAuto',
        'Submarca',
        'Referencia',
        'Modelo',
        'AnoInicio',
        'AnoFinal',
        'Marca',
        'Posicion',
        'Tipo',
        'LongExp',
        'LongComp',
        'Carrera',
        'MontSup',
        'MontInf',
        'MONROE',
        'GRC',
        'KYB',
        'BOGE',
        'info',
        'actions'
      ];
    }
  }

  borrarFiltro(): void {
    this.Marca.setValue('');
    this.Modelo.setValue('');
    this.Submarca.setValue('');
    this.Buscar.setValue('');
    this.dataSource = this.datosOriginales;
  }

  buscar(value: string | null): void {
    if (!value) {
      // Si el value de búsqueda es nulo o una cadena vacía, restaurar a los datos originales
      this.dataSource = [...this.datosOriginales];
    } else {
      // Si hay un value de búsqueda, aplicar el filtro
      const resultadoBusqueda = this.datosOriginales.filter((dato) => {
        return dato.Referencia.toLowerCase().includes(value.toLowerCase()) ||
        dato.MONROE.toLowerCase().includes(value.toLowerCase()) ||
        dato.GRC.toLowerCase().includes(value.toLowerCase()) ||
        dato.KYB.toLowerCase().includes(value.toLowerCase()) ||
        dato.BOGE.toLowerCase().includes(value.toLowerCase());
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
      if (data.ID === element.ID) {
        data.info = element.valorInput;
      }
    });
    this.dataSource = [...this.dataSource];

    const data ={
      "ID": element.ID,
      "info": element.valorInput,
    }
    this.dataService.postServicioLigero(data).subscribe((data) => {
      console.log(data);
    });
    
    console.log(this.dataSource);
    element.mostrarInput = false; // Oculta el input después de guardar
  }

  cerrarInput(element: any) {
    element.mostrarInput = false; // Oculta el input al perder el foco
  }

  getUser(): string | null {
    return this.loginService.getAuthToken();
  }

  deleteProducto(MarcaAuto: string,Submarca: string,Referencia: string,Modelo: string){
    const datos = {
      "MarcaAuto": MarcaAuto,
      "Submarca": Submarca,
      "Referencia": Referencia,
      "Modelo": Modelo
    }
    this.dataService.deleteProductSL(datos).subscribe((data) => {
      if(data["intStatus"] == 200){
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Producto eliminado correctamente',
        });
        this.ngOnInit();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data["strAnswer"],
        });
      }
    });
  }
}
