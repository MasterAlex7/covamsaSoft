import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './admin-menu.component.html',
  styleUrl: './admin-menu.component.css'
})
export class AdminMenuComponent {
  constructor(private excelService: ExcelService) { }


  crearPlantilla(tipo: string){
    this.excelService.crearPlantilla(tipo);
  }
}
