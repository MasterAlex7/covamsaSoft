import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MenuRefaccionesComponent } from '../menus/menu-refacciones/menu-refacciones.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private loginService: LoginService, private router:Router, private dialog: MatDialog) {}

  abrirDialog(){
    const dialogRef = this.dialog.open(MenuRefaccionesComponent)
  }

  logout() {
    this.loginService.removeAuthToken();
    this.router.navigate(['/login']);
  }

  getUser(): string | null {
    return this.loginService.getAuthToken();
  }

  isMaster(): boolean {
    return this.loginService.getAuthToken() == "master";
  }
}
