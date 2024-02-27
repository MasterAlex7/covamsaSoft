import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NuevapartidaComponent } from '../dialogs/nuevapartida/nuevapartida.component';
import { DataService } from '../../services/data.service';
import { DataAnalisis } from '../../interfaces/data-analisis';

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
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './analisistornilleria.component.html',
  styleUrl: './analisistornilleria.component.css'
})

export class AnalisistornilleriaComponent {
  displayedColumns: string[] = ['Cantidad','Codigo','Proveedor','Descripcion','Costo','P. Venta'];
  dataRecibida: {} = {};
  Partidas: DataAnalisis[] = [];

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
  }

  nuevaPartida(){
    const dialogRef = this.dialog.open(NuevapartidaComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dataService.datosAnalisisActuales.subscribe((data: any) => {
        this.dataRecibida = data;
      });
      /* const nuevaPartida: Analisis = {
        datos: this.dataRecibida as AnalisisTor[],
        utilidad: this.dataRecibida.utilidad as number,
        pVentaDef: 0
      }; */
      this.Partidas.push(this.dataRecibida as DataAnalisis);
      console.log("datos en componente analisis",this.dataRecibida);
      console.log("datos en componente analisis",this.Partidas);
    });
  }
}
