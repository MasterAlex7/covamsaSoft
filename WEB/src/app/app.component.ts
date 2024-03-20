import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ExcelService } from './services/excel.service';
import { MatDialog } from '@angular/material/dialog';
import { MenuRefaccionesComponent } from './components/menus/menu-refacciones/menu-refacciones.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatListModule,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  title = 'WEB';
  submenusState: { [key: string]: boolean } = {
    admin: false,
    subMenuSP: false,
    subMenuBA: false,
    subMenuSL: false,
    subMenuMue: false,
    subMenuRef: false,
    subMenuCot: false,
    subMenuRelacion: false,
    cotizadores: false,
  };

  constructor(private loginService: LoginService, private router:Router, private excelService: ExcelService, private dialog: MatDialog) {}

  abrirRefa(){
    const dialogRef = this.dialog.open(MenuRefaccionesComponent)
  }

  setType(type: string){
    sessionStorage.setItem('type', type);
    this.drawer?.close();
  }

  getUser(){
    return sessionStorage.getItem('user');
  }

  isLogged(){
    return sessionStorage.getItem('user') != null;
  }

  crearPlantilla(tipo: string){
    this.excelService.crearPlantilla(tipo);
  }

  toggleSubmenu(submenu: string) {
    this.submenusState[submenu] = !this.submenusState[submenu];
  }

  isSubmenuOpen(submenu: string) {
    return this.submenusState[submenu];
  }

  logout() {
    this.loginService.removeAuthToken();
    this.router.navigate(['/login']);
    this.drawer?.close();
  }
}
