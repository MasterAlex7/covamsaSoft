import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const ip="192.168.100.17";
//const ip="192.168.196.209"; //Prod
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

  private apiUrlpostNewProductSL = 'http://'+ip+':'+port+path+'addProductSL';
  private apiUrlGetServicioLigeroID = 'http://'+ip+':'+port+path+'servicioLigeroID';
  private apiUrlPutEditProductSL = 'http://'+ip+':'+port+path+'editProductSL';
  private apiUrlDeleteProductSL = 'http://'+ip+':'+port+path+'deleteProductSL';

  private apiUrlPostNewProductM = 'http://'+ip+':'+port+path+'addProductMue';
  private apiUrlGetMuellesID = 'http://'+ip+':'+port+path+'muellesID';
  private apiUrlPutEditProductM = 'http://'+ip+':'+port+path+'editProductMue';
  private apiUrlDeleteProductM = 'http://'+ip+':'+port+path+'deleteProductMue';

  private apiUrlGetTiposRefa = 'http://'+ip+':'+port+path+'tiposRefa';
  private apiUrlGetRefacciones = 'http://'+ip+':'+port+path+'refacciones';
  private apiUrlPostRefacciones = 'http://'+ip+':'+port+path+'refaccionesInfo';
  private apiUrlPostNewProductRefa = 'http://'+ip+':'+port+path+'addProductRefa';
  private apiUrlGetRefaccionesID = 'http://'+ip+':'+port+path+'refaccionesID';
  private apiUrlPutEditProductRefa = 'http://'+ip+':'+port+path+'editProductRefa';
  private apiUrlDeleteProductRefa = 'http://'+ip+':'+port+path+'deleteProductRefa';

  private apiUrlGetProveedores = 'http://'+ip+':'+port+path+'getProvedores';
  private apiUrlGetProductoProv = 'http://'+ip+':'+port+path+'getProductoProv';

  private apiUrlPostNuevoCatalogo = 'http://'+ip+':'+port+path+'nuevoCatalogoPrecios';

  private apiUrlGetTornilleriaProd = 'http://'+ip+':'+port+path+'getTornilleriaProd';

  private apiUrlGetLineas = 'http://'+ip+':'+port+path+'getLineasTor';
  private apiUrlGetTabPrecios = 'http://'+ip+':'+port+path+'getTabPrecios';

  private apiUrlGetCostosTornilleria = 'http://'+ip+':'+port+path+'getTornilleriaCostos';

  private apiUrlPostVerificarCoincidencias = 'http://'+ip+':'+port+path+'verificarCoincidencias';
  private apiUrlPostAddCoincidencias = 'http://'+ip+':'+port+path+'addCoincidencias';
  private apiUrlPostAddProductTor = 'http://'+ip+':'+port+path+'addProductTor';

  private apiUrlGetProdHerramientasProv = 'http://'+ip+':'+port+path+'getProdHerramientasProv';
  private apiUrlPostRelacionHerramientas = 'http://'+ip+':'+port+path+'postHerramientasRelacion';
  private apiUrlGetHerramientaCoincidencia = 'http://'+ip+':'+port+path+'getHerramientasCoincidencia';
  private apiUrlPutHerramientaCoincidencia = 'http://'+ip+':'+port+path+'putHerramientasCoincidencia';

  private apiUrlGetDescripcionBarcode = 'http://'+ip+':'+port+path+'getDescripcionBarcode';

  private apiUrlGetProductosProv = 'http://'+ip+':'+port+path+'getProductosProv';

  private apiUrlGetKitNombres = 'http://'+ip+':'+port+path+'getKitSuspensionNombres';
  private apiUrlGetSuspension = 'http://'+ip+':'+port+path+'getKitSuspension';
  private apiUrlGetCostosKits = 'http://'+ip+':'+port+path+'getCostoProvKit';
  private apiUrlPutActualizarKits = 'http://'+ip+':'+port+path+'putActualizarKits';

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

  postNewProductSL(datos: any): Observable<any> {
    console.log(datos);
    return this.http.post<any>(this.apiUrlpostNewProductSL, datos);
  }

  getServicioLigeroID(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetServicioLigeroID + '/' + id);
  }

  putEditProductSL(datos: any): Observable<any> {
    return this.http.put<any>(this.apiUrlPutEditProductSL, datos);
  }

  deleteProductSL(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDeleteProductSL, datos);
  }

  postNewProductMue(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostNewProductM, formData);
  }

  getMuellesID(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetMuellesID + '/' + id);
  }

  putEditProductMue(datos: any): Observable<any> {
    return this.http.put<any>(this.apiUrlPutEditProductM, datos);
  }

  deleteProductMue(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDeleteProductM, datos);
  }

  getTiposRefa(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetTiposRefa);
  }

  getRefacciones(tipo: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetRefacciones,tipo);
  }

  postRefacciones(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostRefacciones, datos);
  }

  postNewProductRefa(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostNewProductRefa, formData);
  }

  getRefaccionesID(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetRefaccionesID + '/' + id);
  }

  putEditProductRefa(datos: any): Observable<any> {
    return this.http.put<any>(this.apiUrlPutEditProductRefa, datos);
  }

  deleteProductRefa(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDeleteProductRefa, datos);
  }

  getProveedores(tipoProv: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetProveedores+'/'+tipoProv);
  }

  getProductoProv(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetProductoProv, datos);
  }

  postNuevoCatalogo(formData: any,tabla: string): Observable<any> {
    return this.http.post<any>(this.apiUrlPostNuevoCatalogo+'/'+tabla, formData);
  }

  getTornilleriaProd(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetTornilleriaProd, datos);
  }

  getLineas(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetLineas);
  }

  getTabPrecios(linea: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetTabPrecios+'/'+linea);
  }

  getCostosTornilleria(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetCostosTornilleria, datos);
  }

  postVerificarCoincidencias(formData: any,proveedor: string): Observable<any> {
    return this.http.post<any>(this.apiUrlPostVerificarCoincidencias+'/'+proveedor, formData);
  }

  postAddCoincidencias(formData: any,proveedor: string): Observable<any> {
    return this.http.post<any>(this.apiUrlPostAddCoincidencias+'/'+proveedor, formData);
  }

  postAddProductTor(formData: any, linea: string, proveedor: string): Observable<any> {
    return this.http.post<any>(this.apiUrlPostAddProductTor+'/'+linea+'/'+proveedor, formData);
  }

  getProdHerramientasProv(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetProdHerramientasProv, datos);
  }

  postRelacionHerramientas(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPostRelacionHerramientas, datos);
  }

  getHerramientaCoincidencia(CLAVE: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetHerramientaCoincidencia+'/'+CLAVE);
  }

  putHerramientaCoincidencia(datos: any): Observable<any> {
    return this.http.put<any>(this.apiUrlPutHerramientaCoincidencia, datos);
  }

  getDescripcionBarcode(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetDescripcionBarcode, datos);
  }

  getProductosProv(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetProductosProv, datos);
  }

  getKitNombres(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetKitNombres);
  }

  getSuspension(nomSusp: string): Observable<any> {
    return this.http.get<any>(this.apiUrlGetSuspension+'/'+nomSusp);
  }

  getCostosKits(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlGetCostosKits, datos);
  }

  putActualizarKits(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPutActualizarKits, datos);
  }

  //Datos entre componentes

  private modelosSubject = new BehaviorSubject<string[]>([]);
  modelos$: Observable<string[]> = this.modelosSubject.asObservable();

  actualizarModelos(modelos: string[]): void {
    this.modelosSubject.next(modelos);
  }

  private datosAnalisis = new BehaviorSubject<{}>({});
  datosAnalisisActuales = this.datosAnalisis.asObservable();

  enviarAnalisis(datos: {}): void {
    this.datosAnalisis.next(datos);
  }

  private datosRelaciones = new BehaviorSubject<{}>({});
  datosRelacionesActuales = this.datosRelaciones.asObservable();

  enviarRelaciones(datos: {}): void {
    this.datosRelaciones.next(datos);
  }
}
