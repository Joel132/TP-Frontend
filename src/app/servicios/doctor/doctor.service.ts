import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Doctor} from '../../modelos/doctor';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private api_categoria="/stock-pwfe/persona"; 
  constructor(private http:HttpClient,
    @Inject('BASE_API_URL') private baseUrl:String) { }

  getDoctors(busqueda): Observable<ResponseDoctor>{
    let params = new HttpParams();
    if (busqueda){
      busqueda.soloUsuariosDelSistema=true;
    }
    else{
      busqueda={soloUsuariosDelSistema:true};
    }
    params=params.set('ejemplo',JSON.stringify(busqueda));
    params=params.set('like','S');
    const options = { params: params };
    return this.http.get<ResponseDoctor>(this.api_categoria, options);
  }

  getDoctor(idDoctor: number): Observable<Doctor>{
    return this.http.get<Doctor>(this.api_categoria+"/"+idDoctor);
  }

}

class ResponseDoctor{
  lista: Doctor[];
  totalDatos: number;

}