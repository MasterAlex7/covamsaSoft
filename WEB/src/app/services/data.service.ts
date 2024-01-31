import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const ip="192.168.100.17";
const port="9005";
const path="/cvm/"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://'+ip+':'+port+path+'/servicioPesado';

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
