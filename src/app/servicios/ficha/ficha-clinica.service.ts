import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FichaClinica } from 'src/app/modelos/ficha-clinica';
import { Observable } from 'rxjs';
import { StorageService } from '../session/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FichaClinicaService {
  private api_ficha = "/stock-pwfe/fichaClinica"
  constructor(private httpClient: HttpClient, private session: StorageService) { }


  /**
 * Metodo para registrar una ficha dada. Se requiere autenticacion de usuario
 * @param ficha 
 * @param usuario 
 */
  public cargarFicha(ficha,usuario){
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options = {headers:header}
    return this.httpClient.post<FichaClinica>(this.api_ficha,ficha,options)
  }

  /**
   * Metodo para modificar una ficha dada. Se requiere autenticacion de usuario
   * @param ficha 
   * @param usuario 
   */
  public modificarFicha(ficha,usuario){
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options = {headers:header}
    return this.httpClient.put<FichaClinica>(this.api_ficha,ficha,options)
  }

  /**
   * Metodo para listar las fichas segun un modelo dado
   * @param modeloFicha 
   */
  public listarFichas(inicio,cantidad, orderBy, modeloFicha){
    let params=new HttpParams().set('ejemplo',JSON.stringify(modeloFicha));
    params=params.set('inicio',inicio?inicio:0);
    params=params.set('cantidad',cantidad?cantidad:0);
    params=params.set('orderBy',orderBy);
    const options = {params:params}
    return this.httpClient.get<ResponseFicha>(this.api_ficha,options)
  }

  /**
   * Metodo para eliminar una ficha dad
   * @param fichaId El id de la ficha a eliminar
   */
  public cancelarFicha(fichaId){
    return this.httpClient.delete(this.api_ficha+'/'+fichaId);
  }

  public getFicha(fichaId):Observable<FichaClinica>{
    return this.httpClient.get<FichaClinica>(this.api_ficha+'/'+fichaId);
  }

}

class ResponseFicha{
  lista: FichaClinica[];
  totalDatos: number;
}