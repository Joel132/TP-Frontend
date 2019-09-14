import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FichaClinica } from 'src/app/modelos/ficha-clinica';
import { Servicio } from 'src/app/modelos/servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private api_servicio = "/stock-pwfe/servicio"
  constructor(private httpClient: HttpClient) { }

   /**
 * Metodo para registrar un servicio dado. Se requiere autenticacion de usuario
 * @param servicio 
 * @param usuario 
 */
public crearServicio(servicio,usuario){
  let header=new HttpHeaders().set('Content-Type','application/json');
  header=header.set('usuario',usuario?usuario:"pedro");//CAMBIAR CUANDO SE CONECTE A LOGIN
  const options = {headers:header}
  return this.httpClient.post<Servicio>(this.api_servicio,servicio,options)
}

 /**
   * Metodo para modificar un servicio dado. Se requiere autenticacion de usuario
   * @param servicio
   * @param usuario 
   */
  public modificarServicio(servicio,usuario){
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',usuario?usuario:"pedro");//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options = {headers:header}
    return this.httpClient.put<Servicio>(this.api_servicio,servicio,options)
  }


   /**
   * Metodo para listar los servicios segun un modelo dado
   * @param modeloServicio 
   */
  public listarServicios(inicio,cantidad, orderBy, modeloServicio){
    let params=new HttpParams().set('ejemplo',JSON.stringify(modeloServicio));
    params=params.set('inicio',inicio?inicio:0);
    params=params.set('cantidad',cantidad?cantidad:0);
    params=params.set('orderBy',orderBy);
    const options = {params:params}
    return this.httpClient.get<ResponseServicio>(this.api_servicio,options)
  }

  /**
   * Metodo para eliminar un servcio dado
   * @param servicioId El id del servicio a eliminar
   */
  public cancelarServicio(servicioId){
    return this.httpClient.delete(this.api_servicio+'/'+servicioId);
  }

}
class ResponseServicio{
  lista: Servicio[];
  totalDatos: number;
}