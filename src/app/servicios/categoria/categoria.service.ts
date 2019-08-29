import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categoria} from '../../modelos/categoria';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private api_categoria="/stock-pwfe/categoria"; 
  constructor(private http:HttpClient,
    @Inject('BASE_API_URL') private baseUrl:String) { }

  getCategorias(inicio='0', cantidad, orderBy, orderDir='asc',busqueda): Observable<ResponseCategoria>{
    let params = new HttpParams();
    params=params.set('inicio',inicio);
    params=params.set('cantidad',cantidad);
    params=params.set('orderBy',orderBy);
    params=params.set('orderDir',orderDir);
    if (busqueda && busqueda.descripcion){
      params=params.set('ejemplo',JSON.stringify(busqueda));
      params=params.set('like','S');
    }
    const options = { params: params };
    return this.http.get<ResponseCategoria>(this.api_categoria, options);
  }

}

class ResponseCategoria{
  lista: Categoria[];
  totalDatos: number;

}