import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private loginService: LoginService, private router:Router) {}

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
