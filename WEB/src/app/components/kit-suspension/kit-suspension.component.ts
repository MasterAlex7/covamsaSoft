import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { DataService } from '../../services/data.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PdfService } from '../../services/pdf.service';

export interface KitData {
  Cantidad: number;
  Codigo: string;
  Descripcion: string;
  PrecioUnitario: number;
  Importe: number;
  UnidadSuspension: string;
  Tabla: string;
}

@Component({
  selector: 'app-kit-suspension',
  standalone: true,
  imports: [
    MatChipsModule,
    CommonModule,
    MatTableModule,
    MatButtonModule
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
  visible = true;

  constructor(private dataService: DataService, private pdf: PdfService) { }

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
    console.log(this.selectedKit);
  }

  getKitData(kit: string) {
    this.dataService.getSuspension(kit).subscribe((data: any) => {
      this.dataSource = data['strAnswer'];
      console.log(this.dataSource);

      this.dataSource.forEach((kit) => {
        this.total = this.total + Number(kit['Importe']);
      });
      this.totalFormat = this.currencyFormatter({ currency: 'USD', value: this.total });
    });
  }

  crearPdf() {
    this.pdf.generatePDF();
  }

  currencyFormatter({ currency, value}: { currency: string, value: number}) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }
}
