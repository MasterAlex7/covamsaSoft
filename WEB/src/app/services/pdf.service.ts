import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() { }
    
  generatePDFSuspensiones(title: string, data: any[], total: number){
    const iva = this.currencyFormatter({currency: 'USD', value: Number((total * 0.16).toFixed(2))});
    const subtotal = this.currencyFormatter({currency: 'USD', value: Number(total.toFixed(2))});
    const totalFinal = this.currencyFormatter({currency: 'USD', value: Number((total + (total * 0.16)).toFixed(2))});
    const todayDate = new Date().toISOString().slice(0, 10); 
    const transformedData = data.map(item => ({
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

    if(title == 'HUTCHENS'){
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(28);
      doc.text('SUSPENSION CAMION HUTCHENS', 25, 55);
      doc.table(4, 70, transformedData, ['Cantidad', 'Codigo', 'Descripcion', 'PrecioUnitario', 'Importe'], {autoSize: true});

      doc.setFontSize(14);
      doc.setFont('Helvetica', 'bold');
      doc.text('SUBTOTAL: $'+subtotal, 149, 30);
      doc.text('IVA: $'+iva, 168, 40);
      doc.text('TOTAL: $'+totalFinal, 160, 50);
    }else if(title == 'RABON'){
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(28);
      doc.text('SUSPENSION CAMION RABON UN EJE', 13, 55);
      doc.table(1, 70, transformedData, ['Cantidad', 'Codigo', 'Descripcion', 'PrecioUnitario', 'Importe'], {autoSize: true});

      doc.setFontSize(14);
      doc.setFont('Helvetica', 'bold');
      doc.text('SUBTOTAL: $'+subtotal, 149, 250);
      doc.text('IVA: $'+iva, 168, 260);
      doc.text('TOTAL: $'+totalFinal, 160, 270);
    }else if(title == 'TANDEM 2-14'){
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(28);
      doc.text('SUSPENSION TANDEM 2 EJES', 38, 55);
      doc.table(4, 70, transformedData, ['Cantidad', 'Codigo', 'Descripcion', 'PrecioUnitario', 'Importe'], {autoSize: true});

      doc.setFontSize(14);
      doc.setFont('Helvetica', 'bold');
      doc.text('SUBTOTAL: $'+subtotal, 149, 282);
      doc.text('IVA: $'+iva, 168, 287);
      doc.text('TOTAL: $'+totalFinal, 160, 292);
    }else if(title == 'TANDEM 2-58'){
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(28);
      doc.text('SUSPENSION TANDEM 2 EJES', 38, 55);
      doc.table(1, 70, transformedData, ['Cantidad', 'Codigo', 'Descripcion', 'PrecioUnitario', 'Importe'], {autoSize: true});

      doc.setFontSize(14);
      doc.setFont('Helvetica', 'bold');
      doc.text('SUBTOTAL: $'+subtotal, 149, 30);
      doc.text('IVA: $'+iva, 168, 40);
      doc.text('TOTAL: $'+totalFinal, 160, 50);
    }

    doc.save(title+' '+todayDate+'.pdf');
  }

  currencyFormatter({ currency, value}: { currency: string, value: number}) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      currency
    }) 
    return formatter.format(value)
  }
}
