import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NuevapartidaComponent } from '../dialogs/nuevapartida/nuevapartida.component';

export interface PeriodicElement {
  Cantidad: number;
  Codigo: string;
  Proveedor: string;
  Descripcion: string;
  Costo: number;
  PVenta: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Cantidad: 150000, Codigo: 'TMG-14X114',Proveedor: 'El REY', Descripcion: 'TOR MAQ GALV 1/4 X 1 1/4', Costo: 0.25, PVenta: 0.33},
  {Cantidad: 25000, Codigo: 'TMG-14X114',Proveedor: 'LAMMSA', Descripcion: 'TOR MAQ GALV 1/4 X 1 1/4', Costo: 0.22, PVenta: 0.29},
  {Cantidad: 85000, Codigo: 'TMG-14X114',Proveedor: 'SUJETSA', Descripcion: 'TOR MAQ GALV 1/4 X 1 1/4', Costo: 0.29, PVenta: 0.39},
];

@Component({
  selector: 'app-analisistornilleria',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './analisistornilleria.component.html',
  styleUrl: './analisistornilleria.component.css'
})

export class AnalisistornilleriaComponent {
  displayedColumns: string[] = ['Cantidad','Codigo','Proveedor','Descripcion','Costo','P. Venta'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  nuevaPartida(){
    const dialogRef = this.dialog.open(NuevapartidaComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
