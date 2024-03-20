import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExcelService } from '../../../services/excel.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule
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
