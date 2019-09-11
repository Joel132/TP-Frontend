import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Paciente } from "../../modelos/paciente";
import { Observable } from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private api_pacientes="/stock-pwfe/persona";

  constructor(private http:HttpClient,
    @Inject('BASE_API_URL') private baseUrl:String) { }

    getPacientes(inicio='0', cantidad, orderBy, orderDir='asc',busqueda): Observable<ResponsePacientes>{
      let params = new HttpParams();
      params=params.set('inicio',inicio);
      params=params.set('cantidad',cantidad);
      params=params.set('orderBy',orderBy);
      params=params.set('orderDir',orderDir);
      if (busqueda){
        busqueda.soloUsuariosDelSistema="";
        params=params.set('ejemplo',JSON.stringify(busqueda));
        params=params.set('like','S');
      }
      const options = { params: params };
      return this.http.get<ResponsePacientes>(this.api_pacientes, options);
    }
  
    crearPaciente(paciente: Paciente): Observable<Paciente>{
      let params=new HttpParams().set('Content-Type','application/json');
      const options={params:params};
      return this.http.post<Paciente>(this.api_pacientes, paciente, options);
    }
  
    editarPaciente(paciente: Paciente): Observable<Paciente>{
      let params=new HttpParams().set('Content-Type','application/json');
      const options={params:params};
      return this.http.put<Paciente>(this.api_pacientes, paciente, options);
    }
  
    eliminarPaciente(idPaciente: number): Observable<number>{
      return this.http.delete<number>(this.api_pacientes+"/"+idPaciente);
    }
  
    getPaciente(idPaciente: number): Observable<Paciente>{
      return this.http.get<Paciente>(this.api_pacientes+"/"+idPaciente);
    }
}

class ResponsePacientes{
  lista: Paciente[];
  totalDatos: number;
}