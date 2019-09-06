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

    //TODO: ELIMINAR
  getSubcategorias(id){
    let ejemplo={idCategoria:{idCategoria:id}}
    return this.http.get<{lista:{idTipoProducto:number,descripcion:string}[],totalDatos}>('/stock-pwfe/tipoProducto',{params:{ejemplo:JSON.stringify(ejemplo)}})
  }

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

  crearCategoria(categoria: Categoria): Observable<Categoria>{
    const params=new HttpParams().set('Content-Type','application/json');
    const options={params:params};
    return this.http.post<Categoria>(this.api_categoria, categoria, options);
  }

  editarCategoria(categoria: Categoria): Observable<Categoria>{
    const params=new HttpParams().set('Content-Type','application/json');
    const options={params:params};
    return this.http.put<Categoria>(this.api_categoria, categoria, options);
  }

  eliminarCategoria(idCategoria: number): Observable<number>{
    return this.http.delete<number>(this.api_categoria+"/"+idCategoria);
  }

  getCategoria(idCategoria: number): Observable<Categoria>{
    return this.http.get<Categoria>(this.api_categoria+"/"+idCategoria);
  }

}

class ResponseCategoria{
  lista: Categoria[];
  totalDatos: number;

}