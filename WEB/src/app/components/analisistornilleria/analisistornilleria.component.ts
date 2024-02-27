import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NuevapartidaComponent } from '../dialogs/nuevapartida/nuevapartida.component';
import { DataService } from '../../services/data.service';
import { DataAnalisis } from '../../interfaces/data-analisis';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';

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
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './analisistornilleria.component.html',
  styleUrl: './analisistornilleria.component.css'
})

export class AnalisistornilleriaComponent {
  displayedColumns: string[] = ['Cantidad','Codigo','Proveedor','Descripcion','Costo','P. Venta'];
  dataRecibida: {} = {};
  Partidas: DataAnalisis[] = [];
  Nombre = new FormControl('');
  mostrarSpinner = false;

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
  }

  nuevaPartida(){
    const dialogRef = this.dialog.open(NuevapartidaComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result != 'cancelado'){
        this.dataService.datosAnalisisActuales.subscribe((data: any) => {
          this.dataRecibida = data;
        });
        this.Partidas.push(this.dataRecibida as DataAnalisis);
        console.log("datos en componente analisis",this.dataRecibida);
        console.log("datos en componente analisis",this.Partidas);
      }
    });
  }

  crearPDF(){
    if(this.Partidas.length > 0 && this.Nombre.value !== ''){
      this.mostrarSpinner = true;
      const cards = document.querySelectorAll('.cardPartida');
      if (cards.length > 0) {
        const doc = new jsPDF('p', 'pt', 'a4');
        const options = {
          background: 'white',
          scale: 3
        };
      
        const bufferX = 15;
        let bufferY = 15;
        let remainingSpace = doc.internal.pageSize.getHeight() - bufferY;
      
        doc.text('Cotizacion', 15, bufferY);
        bufferY += 15;
        doc.text('Fecha: ' + new Date().toLocaleDateString(), 15, bufferY);
        bufferY += 15;
        doc.text('Nombre Cliente: ' + this.Nombre.value, 15, bufferY);
        bufferY += 30;
      
        const captureAndAddPage = (card: Element) => {
          return html2canvas(card as HTMLElement, options).then((canvas) => {
            const imgData = canvas.toDataURL('image/PNG');
            const imgProps = (doc as any).getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          
            if (pdfHeight > remainingSpace) {
              doc.addPage();
              bufferY = 15;
              remainingSpace = doc.internal.pageSize.getHeight() - bufferY;
            }
            doc.addImage(imgData, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
          
            bufferY += pdfHeight + 10;
            remainingSpace -= pdfHeight + 10;
          });
        };
      
        const promises = Array.from(cards).map((card) => captureAndAddPage(card));
      
        Promise.all(promises).then(() => {
          doc.save('partidas.pdf');
          this.mostrarSpinner = false;
        });
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No existen partidas o no se ha ingresado el nombre del cliente',
      });
    }
  }

  crearPDFVendedor(){
    this.mostrarSpinner = true;
    this.displayedColumns = ['Cantidad','Codigo','Proveedor','Descripcion','P. Venta']
    
    setTimeout(() => {
      this.crearPDF();
      this.Partidas = [];
      this.Nombre.setValue('');
      this.displayedColumns = ['Cantidad','Codigo','Proveedor','Descripcion','Costo','P. Venta'];
    },1000);
  }
}
