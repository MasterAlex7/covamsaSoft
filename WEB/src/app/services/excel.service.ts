import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  crearExcel(data: any[] | undefined, filename: string, total: number){
    const fecha = new Date();
    const fechaString = fecha.toLocaleDateString("es-MX", {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, "-");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Cotizacion '+ fechaString);

    const headers = Object.keys(data?.[0] ?? {});
    worksheet.addRow(headers);

    data?.forEach((item) => {
      const row:any = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });

    const totalRow = worksheet.addRow(['','','','','','','Total',total]);
    totalRow.font = {bold: true};

    worksheet.columns = [
      { width: 10 },
      { width: 10 },
      { width: 50 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
    ];

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${filename}.xlsx`);
    });
  }

  crearExcelDolar(data: any[] | undefined, filename: string, total: number, totalDolares: number, tipoCambio: number){
    console.log(data, filename, total, totalDolares)
    const fecha = new Date();
    const fechaString = fecha.toLocaleDateString("es-MX", {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, "-");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Cotizacion '+ fechaString);

    const headers = Object.keys(data?.[0] ?? {});
    worksheet.addRow(headers);

    data?.forEach((item) => {
      const row:any = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });

    const totalUSDRow = worksheet.addRow(['','','','','','','Total USD',total]);
    totalUSDRow.font = {bold: true};

    const totalRow = worksheet.addRow(['','','','','','','Total MXN',totalDolares]);
    totalRow.font = {bold: true};

    const tipoCambioRow = worksheet.addRow(['','','','','','','Tipo de Cambio',tipoCambio]);
    tipoCambioRow.font = {bold: true};

    if(filename == 'Cotizacion_championprov' || filename == 'Cotizacion_mercerprov'){
      const costoImportacion = totalDolares + (totalDolares * 0.15);
      const totalImportacionRow = worksheet.addRow(['','','','','','','Total MXN con costo Importacion',costoImportacion]);
      totalImportacionRow.font = {bold: true};
    }

    worksheet.columns = [
      { width: 10 },
      { width: 10 },
      { width: 50 },
      { width: 10 },
      { width: 10 },
      { width: 10 },
      { width: 20 },
      { width: 10 },
    ];

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${filename}.xlsx`);
    });
  }
}
