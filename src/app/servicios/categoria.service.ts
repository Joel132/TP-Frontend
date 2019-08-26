import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categoria} from '../modelos/categoria';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private api_categoria="/stock-pwfe/categoria"; 
  constructor(private http:HttpClient,
    @Inject('BASE_API_URL') private baseUrl:String) { }

  getCategorias(): Observable<ResponseCategoria>{
    return this.http.get<ResponseCategoria>(this.api_categoria)
  }

}

class ResponseCategoria{
  lista: Categoria[];
  totalDatos: Number;

}