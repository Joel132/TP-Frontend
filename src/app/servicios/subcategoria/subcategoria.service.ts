import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subcategoria} from '../../modelos/subcategoria';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private api_categoria="/stock-pwfe/tipoProducto"; 
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
  lista: Subcategoria[];
  totalDatos: number;

}