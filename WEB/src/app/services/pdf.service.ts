import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  data = [
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
    {Cantidad: 2, Codigo: 'RR-TRA2741', Descripcion: 'M/C HUTCHENS TANDEM 3 LF 3 X 0.788', ID: 53, Importe: '11928.00',PrecioUnitario:"2982.00"},
  ]
  constructor() { }
    
  generatePDF(){
    const transformedData = this.data.map(item => ({
      Cantidad: item.Cantidad.toString(),
      Codigo: item.Codigo,
      Descripcion: item.Descripcion,
      PrecioUnitario: item.PrecioUnitario,
      Importe: item.Importe
    }));
    const doc = new jsPDF();
    doc.addImage('assets/logoCVMClassic.png', 'PNG', 1, 1, 69, 42);

    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 0, 158);
    doc.setFontSize(22);
    doc.text('COMERCIAL VAZQUEZ MONTALVO', 70, 17);
    doc.text('S.A. DE C.V.', 113, 27);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(28);
    doc.text('SUSPENSION CAMION RABON UN EJE', 13, 55);

    doc.table(7, 70, transformedData, ['Cantidad', 'Codigo', 'Descripcion', 'PrecioUnitario', 'Importe'], {autoSize: true});

    doc.setFontSize(14);
    doc.setFont('Helvetica', 'bold');
    doc.text('SUBTOTAL: $38,750.26', 149, 150);
    doc.text('IVA: $6,200.04', 168, 160);
    doc.text('TOTAL: $44,950.30', 160, 170);

    doc.save('Test.pdf');
  }
}
