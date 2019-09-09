import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { HorarioExcepcion } from 'src/app/modelos/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioExcepcionService {
  private api_Horario="/stock-pwfe/horarioExcepcion"; 
  constructor(private http:HttpClient) { }

  getHorarios(inicio='0', cantidad, orderBy, orderDir='asc',busqueda): Observable<ResponseHorario>{
    let params = new HttpParams();
    params=params.set('inicio',inicio);
    params=params.set('cantidad',cantidad);
    params=params.set('orderBy',orderBy);
    if (busqueda){
      params=params.set('ejemplo',JSON.stringify(busqueda));
      params=params.set('like','S');
    }
    const options = { params: params };
    return this.http.get<ResponseHorario>(this.api_Horario, options);
  }

  crearHorario(horario: HorarioExcepcion, usuario: string): Observable<HorarioExcepcion>{
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',usuario?usuario:"pedro");//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options={headers:header};
    return this.http.post<HorarioExcepcion>(this.api_Horario, horario, options);
  }

  editarHorario(horario: HorarioExcepcion, usuario: string): Observable<HorarioExcepcion>{
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',usuario?usuario:"pedro");//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options={headers:header};
    return this.http.put<HorarioExcepcion>(this.api_Horario, horario, options);
  }

  eliminarHorario(idHorario: number): Observable<number>{
    return this.http.delete<number>(this.api_Horario+"/"+idHorario);
  }

  getHorario(idHorario: number): Observable<HorarioExcepcion>{
    return this.http.get<HorarioExcepcion>(this.api_Horario+"/"+idHorario);
  }

}

class ResponseHorario{
  lista: HorarioExcepcion[];
  totalDatos: number;

}

