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
  constructor(private categoria_service:CategoriaService) { }

  ngOnInit() {
    this.categoria_service.getCategorias().subscribe(
      (response)=>{
        this.lista_categoria=response.lista;
      });
  }

}
