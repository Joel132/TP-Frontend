import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  getUsuarios(usuario): Observable<{totalDatos:number}>{
    let par=new HttpParams().set('ejemplo',JSON.stringify(usuario))
    let option={params:par};
    return this.http.get<{totalDatos:number}>("/stock-pwfe/persona",option);
  }
}
