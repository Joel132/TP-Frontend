import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Presentacion } from 'src/app/modelos/presentacion';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StorageService } from '../session/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api_presentacion ="/stock-pwfe/presentacionProducto"
  private api_producto ="/stock-pwfe/producto"
  private api_existencia ="/stock-pwfe/existenciaProducto"
  constructor(private httpClient: HttpClient, private session: StorageService) { }


  /**
 * Metodo para registrar una producto dado. Se requiere autenticacion de usuario
 * @param ficha 
 * @param usuario 
 */
  public crearProducto(producto,usuario){
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options = {headers:header}
    return this.httpClient.post<Presentacion>(this.api_presentacion,producto,options)
  }

  /**
   * Obtener idProducto segun el id de la subcategoria
   * @param idSub 
   * @param usuario 
   */
   public getIdProductoBySub(idSub:number, usuario):Observable<number>{
    const header=new HttpHeaders().set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const ejemplo={idTipoProducto:{idTipoProducto:idSub}};
    const params=new HttpParams().set('ejemplo',JSON.stringify(ejemplo));
    const options = {headers:header,params:params}
    return this.httpClient.get<{lista:{idProducto:number}[]}>(this.api_producto,options).pipe(map(data=>data.lista[0].idProducto));
   }

   /**
   * Obtener precio de una presentacion
   * @param idPresentacion 
   * @param usuario 
   */
  public getPrecioPresentacion(idPresentacion:number, usuario): Observable<number>{
    const header=new HttpHeaders().set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const ejemplo={idPresentacionProductoTransient:idPresentacion};
    const params=new HttpParams().set('ejemplo',JSON.stringify(ejemplo));
    const options = {headers:header,params:params}
    return this.httpClient.get<{lista:{precioVenta:number}[]}>(this.api_existencia,options).pipe(map(data=>data.lista[0].precioVenta));
   }

  /**
   * Metodo para modificar una presentacion dada. Se requiere autenticacion de usuario
   * @param ficha 
   * @param usuario 
   */
  public modificarPresentacion(presentacion,usuario){
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options = {headers:header}
    return this.httpClient.put<Presentacion>(this.api_presentacion,presentacion,options)
  }

  /**
   * Metodo para listar las presentacion segun un modelo dado
   * @param modeloFicha 
   */
  public listarPresentacion(inicio,cantidad, orderBy, modeloPresentacio){
    let params=new HttpParams().set('ejemplo',JSON.stringify(modeloPresentacio));
    params=params.set('inicio',inicio?inicio:0);
    params=params.set('cantidad',cantidad?cantidad:0);
    params=params.set('orderBy',orderBy);
    params=params.set('orderDir',"asc");
    params=params.set('like','S');
    const options = {params:params}
    return this.httpClient.get<ResponsePresentacion>(this.api_presentacion,options)
  }

  /**
   * Metodo para eliminar una presentacion dad
   * @param presentacionId El id de la presentacion a eliminar
   */
  public eliminarPresentacion(presentacionId){
    return this.httpClient.delete(this.api_presentacion+'/'+presentacionId);
  }

  /**
   * Metodo para obtener una presentacion dada
   * @param presentacionId El id de la presentacion a eliminar
   */
  public getPresentacion(presentacionId):Observable<Presentacion>{
    return this.httpClient.get<Presentacion>(this.api_presentacion+'/'+presentacionId);
  }
}

class ResponsePresentacion{
  lista: Presentacion[];
  totalDatos: number;
}