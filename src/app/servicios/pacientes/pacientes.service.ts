import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from "../../modelos/paciente";
import { Observable } from "rxjs/index";


@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private api_pacientes="/stock-pwfe/persona";

  constructor(private http:HttpClient,
    @Inject('BASE_API_URL') private baseUrl:String) { }

    getPacientes(): Observable<ResponsePacientes>{
      return this.http.get<ResponsePacientes>(this.api_pacientes)
    }

    crearPaciente( paciente : Paciente): Observable<Paciente>{
      let head=new HttpHeaders();
      head.append("Content-Type","application/json");
      let option = {headers:head}
      return this.http.post<Paciente>(this.api_pacientes,paciente, option);
    }
}

class ResponsePacientes{
  lista: Paciente[];
  totalDatos: Number;
}