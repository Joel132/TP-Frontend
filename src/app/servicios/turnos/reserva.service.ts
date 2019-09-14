import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/modelos/reserva';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private api_agenda="/stock-pwfe/persona"; 
  private api_reserva="/stock-pwfe/reserva"; 
  
  constructor(private httpClient: HttpClient) { }

/**
 * Obtener horarios posibles de un doctor en una cierta fecha
 * @param doctorId 
 * @param fecha 
 * @param disponible 
 */
  public getAgenda(doctorId, fecha, disponible): Observable<Reserva[]>{
    let params=new HttpParams().set('fecha',fecha);
    if(disponible){
      params=params.set('disponible',disponible);
    }
    const options = {params:params}
    return this.httpClient.get<Reserva[]>(this.api_agenda+'/'+doctorId+'/agenda',options)
  }

  /**
 * Metodo para registrar una reserva dada. Se requiere autenticacion de usuario
 * @param reserva 
 * @param usuario 
 */
  public agendarTurno(reserva,usuario){
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',usuario?usuario:"pedro");//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options = {headers:header}
    return this.httpClient.post<Reserva>(this.api_reserva,reserva,options)
  }

  /**
   * Metodo para modificar una reserva dada. Se requiere autenticacion de usuario
   * @param reserva 
   * @param usuario 
   */
  public modificarReserva(reserva,usuario){
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',usuario?usuario:"pedro");//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options = {headers:header}
    return this.httpClient.put<Reserva>(this.api_reserva,reserva,options)
  }

  /**
   * Metodo para listar las reservas segun un modelo dado
   * @param modeloReserva 
   */
  public listarReservas(inicio,cantidad, orderBy, orderDir, modeloReserva){
    let params=new HttpParams().set('ejemplo',JSON.stringify(modeloReserva));
    params=params.set('inicio',inicio?inicio:0);
    params=params.set('cantidad',cantidad?cantidad:0);
    params=params.set('orderBy',orderBy);
    params=params.set('orderDir',orderDir);
    const options = {params:params}
    return this.httpClient.get<ResponseReserva>(this.api_reserva,options)
  }

  /**
   * Metodo para cancelar(eliminar) una reserva dad
   * @param reservaId El id de la reserva a eliminar
   */
  public cancelarReserva(reservaId){
    return this.httpClient.delete(this.api_reserva+'/'+reservaId);
  }
  
  public getReserva(reservaId): Observable<Reserva>{
    return this.httpClient.get<Reserva>(this.api_reserva+'/'+reservaId);
  }

}

class ResponseReserva{
  lista: Reserva[];
  totalDatos: number;
}