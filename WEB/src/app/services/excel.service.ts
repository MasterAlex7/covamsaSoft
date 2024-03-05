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

  crearExcelDolar(data: any[] | undefined, filename: string, total: number, totalDolares: number, tipoCambio: number, totalImportacion: number){
    //console.log(data, filename, total, totalDolares)
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
      const totalImportacionRow = worksheet.addRow(['','','','','','','Total MXN con costo Importacion',totalImportacion]);
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

  crearPlantilla(tipo: string){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Plantilla');

    if(tipo == 'SP'){
      const headers = ['GABRIEL', 'MONROE', 'GRC', 'Armadora', 'Posicion', 'Tipo', 'Longitud Exp', 'Longitud Comp', 'Carrera', 'Tipo Montaje Sup', 'Diametro Sup', 'Longitud Sup', 'Tipo Montaje Inf', 'Diametro Inf', 'Longitud Inf', 'info'];
      worksheet.addRow(headers);
    }else if(tipo == 'SL'){
      const headers = ['Marca Auto', 'Submarca', 'Referencia', 'Modelo', 'Anio Inicio', 'Anio Final', 'Marca', 'Posicion', 'Tipo', 'Long Exp', 'Long Comp', 'Carrera', 'Mont Sup', 'Mont Inf', 'MONROE', 'GRC', 'KYB', 'BOGE', 'info'];
      worksheet.addRow(headers);
    }else if(tipo == 'BA'){
      const headers = ['GABRIEL', 'FIRESTONE', 'GOODYEAR', 'CONTITECH', 'Aplicacion 1', 'Aplicacion 2', 'Aplicacion 3', 'OE1', 'OE2', 'OE3', 'Tapa', 'Membrana', 'Piston', 'info'];
      worksheet.addRow(headers);
    }else if(tipo == 'Muelles'){
      const headers = ['RASSINI', 'MAF', 'SANDOVAL', 'ORIGINAL', 'No', 'Ancho', 'Espesor', 'Lado frontal', 'Lado trasero', 'Posicion', 'info', 'marca'];
      worksheet.addRow(headers);
    }else if(tipo == 'Refacciones'){
      const headers = ['idModelo', 'Descripcion', 'Tipo Refaccion', 'Tipo Forma', 'Unidad', 'Modelo', 'Anio', 'Posicion', 'Diametro Int', 'Diametro Ext', 'Largo', 'LargoTot', 'info'];
      worksheet.addRow(headers);
    }else if(tipo == 'Cotizadores'){
      const headers = ['CLAVE',	'DESCRIPCION',	'Pza. Caja',	'DESC',	'COSTO',	'P. LISTA'];
      worksheet.addRow(headers);
    }

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Plantilla_${tipo}.xlsx`);
    });
  }

  crearExcelTornilleriaCostos(data: any[], headers: any[]){
    const fecha = new Date();
    const fechaString = fecha.toLocaleDateString("es-MX", {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//g, "-");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Analisis de Costos '+ fechaString);

    worksheet.addRow(headers);

    data.forEach((item) => {
      const row:any = [];
      headers.forEach((header) => {
        row.push(item[header]);
      });
      worksheet.addRow(row);
    });

    worksheet.columns = [
      { width: 30 },
      { width: 50 },
    ];

    for (let i = 3; i <= headers.length; i++) {
      worksheet.getColumn(i).alignment = { horizontal: 'right' };
      worksheet.getColumn(i).width = 20;
    }

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Analisis de Costos ${fechaString}.xlsx`);
    });
  }
}
