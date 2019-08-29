import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../servicios/categoria/categoria.service';
import { Categoria } from '../../../modelos/categoria';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  lista_categoria: Categoria[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="descripcion";
  constructor(private categoria_service:CategoriaService) { }

  ngOnInit() {
    this.loading = true;
    this.service=this.categoria_service.getCategorias('0',String(this.limite),this.orderBy,'asc',null).subscribe(
      (response)=>{
        this.lista_categoria=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscar(nombre: String){
    let cat = { descripcion:nombre};
    //Se calcula desde donde pedir a partir de la pagina solicitada
    let inicio=(this.pagina_actual-1)*this.limite;
    this.service=this.categoria_service.getCategorias(String(inicio),String(this.limite),this.orderBy,'asc',cat).subscribe(
      (response)=>{
        this.lista_categoria=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  goToPage(n: number, nombre: String ): void {
    this.pagina_actual = n;
    this.buscar(nombre);
  }

  onNext(nombre: String ): void {
    this.pagina_actual++;
    this.buscar(nombre);
  }

  onPrev(nombre: String ): void {
    this.pagina_actual--;
    this.buscar(nombre);
  }

}
