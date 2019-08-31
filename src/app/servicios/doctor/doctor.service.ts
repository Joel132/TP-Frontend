import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Doctor} from '../../modelos/doctor';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private api_persona="/stock-pwfe/persona"; 
  constructor(private http:HttpClient,
    @Inject('BASE_API_URL') private baseUrl:String) { }

    getDoctors(inicio='0', cantidad, orderBy, orderDir='asc',busqueda): Observable<ResponseDoctor>{
      let params = new HttpParams();
      params=params.set('inicio',inicio);
      params=params.set('cantidad',cantidad);
      params=params.set('orderBy',orderBy);
      params=params.set('orderDir',orderDir);
      if (busqueda){
        busqueda.soloUsuariosDelSistema=true;
      }
      else{
        busqueda={soloUsuariosDelSistema:true};
      }
      params=params.set('ejemplo',JSON.stringify(busqueda));
        params=params.set('like','S');
        
      const options = { params: params };
      return this.http.get<ResponseDoctor>(this.api_persona, options);
    }


  getDoctor(idDoctor: number): Observable<Doctor>{
    return this.http.get<Doctor>(this.api_persona+"/"+idDoctor);
  }

}

class ResponseDoctor{
  lista: Doctor[];
  totalDatos: number;

}