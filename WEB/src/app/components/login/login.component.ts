import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = "";
  password: string = "";
  hide = true;

  constructor(private loginService: LoginService, private router:Router) {}

  iniciarSesion() {
    const data={
      usuario: this.usuario.toLowerCase(),
      password: this.password
    }
    this.loginService.guardarDatos(data).subscribe(
      (response) => {
        if(response["intStatus"] == 200){
          this.loginService.setAuthToken(response["strAnswer"]);
          this.router.navigate(['/home']);
        }else if(response["intStatus"] == 202){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response["strAnswer"],
          });
        }
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  isLogged(): boolean {
    return this.loginService.isAuthenticated();
  }

  getUser(): string | null {
    return this.loginService.getAuthToken();
  }

  cerrarSesion() {
    this.loginService.removeAuthToken();
  }
}
