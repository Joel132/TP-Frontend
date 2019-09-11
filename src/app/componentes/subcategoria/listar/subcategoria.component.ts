import { Component, OnInit } from '@angular/core';
import { SubcategoriaService } from '../../../servicios/subcategoria/subcategoria.service';
import { Subcategoria } from '../../../modelos/subcategoria';
@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {
  lista_categoria: Subcategoria[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="descripcion";
  constructor(private subcategoria_service:SubcategoriaService)   { }

  ngOnInit() {
    this.loading = true;
    this.service=this.subcategoria_service.getSubcategorias('0',String(this.limite),this.orderBy,'asc',null).subscribe(
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
    this.service=this.subcategoria_service.getSubcategorias(String(inicio),String(this.limite),this.orderBy,'asc',cat).subscribe(
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
