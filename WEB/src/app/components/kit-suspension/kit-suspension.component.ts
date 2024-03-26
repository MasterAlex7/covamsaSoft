import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { DataService } from '../../services/data.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PdfService } from '../../services/pdf.service';
import { LoginService } from '../../services/login.service';
import { KitData } from '../../interfaces/kit-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kit-suspension',
  standalone: true,
  imports: [
    MatChipsModule,
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './kit-suspension.component.html',
  styleUrl: './kit-suspension.component.css'
})
export class KitSuspensionComponent {
  nomKits: string[] = [];
  selectedKit: string | null = null;
  dataSource: KitData[] = [];
  displayedColumns: string[] = ['Cantidad', 'Codigo', 'Descripcion', 'PrecioUnitario', 'Importe'];
  total: number = 0;
  totalFormat = '0.00';
  visible = false;
  isEditing = false;

  constructor(private dataService: DataService, private pdf: PdfService, private loginService: LoginService) { }

  ngOnInit() {
    this.dataService.getKitNombres().subscribe((data: any) => {
      this.nomKits = data['strAnswer'].map((kit: { [x: string]: any; }) => kit['UnidadSuspension']);
    });
  }

  toggleKit(kit: string) {
    if (this.selectedKit === kit) {
      this.selectedKit = null;
      this.dataSource = [];
      this.total = 0;
      this.totalFormat = '0.00';
      this.visible = false;
    }else {
      this.selectedKit = kit;
      this.total = 0;
      this.getKitData(kit);
      this.visible = true;
    }
  }

  getKitData(kit: string) {
    this.dataService.getSuspension(kit).subscribe((data: any) => {
      this.dataSource = data['strAnswer'];
      this.dataSource.forEach((kit) => {
        this.total = this.total + Number(kit['Importe']);
      });
      this.totalFormat = this.currencyFormatter({ currency: 'USD', value: this.total });
    });
  }

  crearPdf() {
    this.pdf.generatePDFSuspensiones(this.selectedKit || '', this.dataSource, this.total);
  }

  editar(){
    this.isEditing = true;
    this.displayedColumns = ['Cantidad', 'Codigo', 'Descripcion', 'Costo', '% Utilidad', 'PrecioUnitario', 'Importe'];
    const params ={
      datos: this.dataSource,
    }
    this.dataService.getCostosKits(params).subscribe((data: any) => {
      this.dataSource.forEach((kit, index) => {
        kit['Costo'] = data['strAnswer'][index]['Costo'];
      });
    });
  }

  onInputChange(element: any){
    //console.log(element);
    this.dataSource.map((kit) => {
      if(kit['Codigo'] === element['Codigo']){
        kit['PrecioUnitario'] = Number((kit['Costo'] * (1 + element['Utilidad']/100)).toFixed(2));
        kit['Importe'] = Number((kit['PrecioUnitario'] * kit['Cantidad']).toFixed(2));
      }
    });
    //console.log(this.dataSource);
  }

  save(){
    const params = {
      datos: this.dataSource,
    }
    this.dataService.putActualizarKits(params).subscribe((data: any) => {
      if(data['intStatus'] == 200){
        Swal.fire({
          title: 'Exito',
          text: 'Datos actualizados correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }
    });

    this.isEditing = false;
    this.visible = false;
    this.displayedColumns = ['Cantidad', 'Codigo', 'Descripcion', 'PrecioUnitario', 'Importe'];
    this.total = 0;
    this.selectedKit = null;
    this.totalFormat = '0.00';
    this.dataSource = [];
  }

  isMaster(): boolean {
    return this.loginService.getAuthToken() == "master";
  }

  currencyFormatter({ currency, value}: { currency: string, value: number}) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }
}
