import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Horario } from 'src/app/modelos/horario';
import { StorageService } from '../session/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private api_Horario="/stock-pwfe/personaHorarioAgenda"; 
  constructor(private http:HttpClient, private session: StorageService) { }

  getHorarios(inicio='0', cantidad, orderBy, orderDir='asc',busqueda): Observable<ResponseHorario>{
    let params = new HttpParams();
    params=params.set('inicio',inicio);
    params=params.set('cantidad',cantidad);
    params=params.set('orderBy',orderBy);
    params=params.set('orderDir',orderDir);
    if (busqueda){
      params=params.set('ejemplo',JSON.stringify(busqueda));
      params=params.set('like','S');
    }
    const options = { params: params };
    return this.http.get<ResponseHorario>(this.api_Horario, options);
  }

  crearHorario(horario: Horario, usuario: string): Observable<Horario>{
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options={headers:header};
    return this.http.post<Horario>(this.api_Horario, horario, options);
  }

  editarHorario(horario: Horario, usuario: string): Observable<Horario>{
    let header=new HttpHeaders().set('Content-Type','application/json');
    header=header.set('usuario',this.session.getCurrentSession());//CAMBIAR CUANDO SE CONECTE A LOGIN
    const options={headers:header};
    return this.http.put<Horario>(this.api_Horario, horario, options);
  }

  eliminarHorario(idHorario: number): Observable<number>{
    return this.http.delete<number>(this.api_Horario+"/"+idHorario);
  }

  getHorario(idHorario: number): Observable<Horario>{
    return this.http.get<Horario>(this.api_Horario+"/"+idHorario);
  }

}

class ResponseHorario{
  lista: Horario[];
  totalDatos: number;

}

