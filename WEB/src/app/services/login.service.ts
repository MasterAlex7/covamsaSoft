import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const ip="192.168.100.17";
const port="9005";
const path="/cvm/"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly USER = 'user';
  private apiUrlPost = 'http://'+ip+':'+port+path+'login';

  constructor(private http: HttpClient) { }

  guardarDatos(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPost, datos);
  }

  setAuthToken(token: string): void {
    sessionStorage.setItem(this.USER, token);
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem(this.USER);
  }

  removeAuthToken(): void {
    sessionStorage.removeItem(this.USER);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
