import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../../services/data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import Swal from 'sweetalert2';

const tablas = [
  {
    tipo: 'Tornilleria',
    tabla: 'ct-tornilleria'
  },
  {
    tipo: 'Muelles',
    tabla: 'ct-muelles'
  },
  {
    tipo: 'Herramienta',
    tabla: 'ct-herramienta'
  }
];

@Component({
  selector: 'app-add-barcode',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './add-barcode.component.html',
  styleUrl: './add-barcode.component.css'
})
export class AddBarcodeComponent {
  id = new FormControl('');
  Tipo = new FormControl('');
  Tipos = tablas.map(t => t.tipo);
  descripcion = '';

  constructor(private dataService: DataService) { }

  generar(){
    if(this.Tipo.value != "" && this.id.value != ""){
      const params = {
        tabla: tablas.find(t => t.tipo === this.Tipo.value)?.tabla ?? '',
        clave: this.id.value
      }
  
      this.dataService.getDescripcionBarcode(params).subscribe((data: any) => {
        if(data['intStatus']==200){
          JsBarcode("#barcode", this.id.value ?? '',{
            width: 2,
            height: 30,
          });
          this.descripcion = data['strAnswer'][0]['Descripcion'];
        }else{
          Swal.fire({
            title: 'Error',
            text: 'No se encontró el código',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Favor de llenar todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  print(){
    const printableArea = document.getElementById('barcode2');

    if (printableArea) {
      html2canvas(printableArea).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'px', [189,147]);
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        //pdf.save('barcode.pdf');
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
      });
    }
  }

  escalarDiv() {
    const barcodeImg = document.getElementById('barcode');
    const barcodeDiv = document.getElementById('barcode2');
    
    if (barcodeImg && barcodeDiv) {
        const barcodeWidth = barcodeImg.clientWidth;
        barcodeDiv.style.maxWidth = barcodeWidth + 'px';
    }
}
}
