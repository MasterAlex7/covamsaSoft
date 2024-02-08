import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const ip="192.168.100.17";
const port="9005";
const path="/cvm/"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrlGet = 'http://'+ip+':'+port+path+'servicioPesado';
  private apiUrlPost = 'http://'+ip+':'+port+path+'servicioPesadoInfo';
  private apiUrlGetBolsasDeAire = 'http://'+ip+':'+port+path+'bolsasDeAire';
  private apiUrlPostBolsasDeAire = 'http://'+ip+':'+port+path+'bolsasDeAireInfo';
  private apiUrlGetServicioLigero = 'http://'+ip+':'+port+path+'servicioLigero';
  private apiUrlPostServicioLigero = 'http://'+ip+':'+port+path+'servicioLigeroInfo';
  private apiUrlGetMuelles = 'http://'+ip+':'+port+path+'muelles';
  private apiUrlPostMuelles = 'http://'+ip+':'+port+path+'muellesInfo';
  private apiUrlGetMuellesMarca = 'http://'+ip+':'+port+path+'muellesMarcas';
  private appiUrlGetColumns = 'http://'+ip+':'+port+path+'columnasTabla';
  private apiUrlPostNewProductSP = 'http://'+ip+':'+port+path+'addProductSP';
  private apiUrlGetServicioPesadoID = 'http://'+ip+':'+port+path+'servicioPesadoID';
  private apiUrlPutEditProductoSP = 'http://'+ip+':'+port+path+'editProductSP';
  private apiUrlDeleteProductSP = 'http://'+ip+':'+port+path+'deleteProductSP';
  private apiUrlGetBolsasDeAireID = 'http://'+ip+':'+port+path+'bolsasDeAireID';
  private apiUrlPostNewProductBA = 'http://'+ip+':'+port+path+'addProductBA';
  private apiUrlPutEditProductBA = 'http://'+ip+':'+port+path+'editProductBA';
  private apiUrlDeleteProductBA = 'http://'+ip+':'+port+path+'deleteProductBA';

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrlGet);
  }

  guardarDatos(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPost, datos);
  }

  getBolsasDeAire(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetBolsasDeAire);
  }

  postBolsasDeAire(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostBolsasDeAire, datos);
  }

  getServicioLigero(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetServicioLigero);
  }

  postServicioLigero(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostServicioLigero, datos);
  }

  getMuelles(marcaMuelle: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetMuelles, marcaMuelle);
  }

  postMuelles(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostMuelles, datos);
  }

  getMuellesMarca(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetMuellesMarca);
  }

  getColumns(tabla: string): Observable<any> {
    return this.http.get<any>(this.appiUrlGetColumns + '/' + tabla);
  }

  postNewProductSP(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostNewProductSP, datos);
  }

  getServicioPesadoID(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetServicioPesadoID + '/' + id);
  }

  putEditProductoSP(datos: any): Observable<any> {
    return this.http.put<any>(this.apiUrlPutEditProductoSP, datos);
  }

  deleteProductSP(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDeleteProductSP, datos);
  }

  getBolsasDeAireID(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetBolsasDeAireID + '/' + id);
  }

  postNewProductBA(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostNewProductBA, datos);
  }

  putEditProductBA(datos: any): Observable<any> {
    return this.http.put<any>(this.apiUrlPutEditProductBA, datos);
  }

  deleteProductBA(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDeleteProductBA, datos);
  }

  private modelosSubject = new BehaviorSubject<string[]>([]);
  modelos$: Observable<string[]> = this.modelosSubject.asObservable();

  actualizarModelos(modelos: string[]): void {
    this.modelosSubject.next(modelos);
  }
}
