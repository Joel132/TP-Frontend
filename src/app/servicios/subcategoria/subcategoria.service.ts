import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubCategoria} from '../../modelos/subcategoria';
import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService {

  private api_subcategoria="/stock-pwfe/tipoProducto"; 
  constructor(private http:HttpClient,
    @Inject('BASE_API_URL') private baseUrl:String) { }

   

  getSubCategorias(inicio='0', cantidad, orderBy, orderDir='asc',busqueda): Observable<ResponseSubCategoria>{
    let params = new HttpParams();
    params=params.set('inicio',inicio);
    params=params.set('cantidad',cantidad);
    params=params.set('orderBy',orderBy);
    params=params.set('orderDir',orderDir);
    
    params=params.set('ejemplo',JSON.stringify(busqueda));
    params=params.set('like','S');
    
    const options = { params: params };
    return this.http.get<ResponseSubCategoria>(this.api_subcategoria, options);
  }

  crearSubCategoria(categoria: SubCategoria): Observable<SubCategoria>{
    const params=new HttpParams().set('Content-Type','application/json');
    const options={params:params};
    return this.http.post<SubCategoria>(this.api_subcategoria, categoria, options);
  }

  editarSubCategoria(categoria: SubCategoria): Observable<SubCategoria>{
    const params=new HttpParams().set('Content-Type','application/json');
    const options={params:params};
    return this.http.put<SubCategoria>(this.api_subcategoria, categoria, options);
  }

  eliminarSubCategoria(idCategoria: number): Observable<number>{
    return this.http.delete<number>(this.api_subcategoria+"/"+idCategoria);
  }

  getSubCategoria(idCategoria: number): Observable<SubCategoria>{
    return this.http.get<SubCategoria>(this.api_subcategoria+"/"+idCategoria);
  }

}

class ResponseSubCategoria{
  lista: SubCategoria[];
  totalDatos: number;

}