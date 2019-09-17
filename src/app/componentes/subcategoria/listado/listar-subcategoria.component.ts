import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { Presentacion } from 'src/app/modelos/presentacion';
import { ProductoService } from 'src/app/servicios/presentacion/producto.service';
import { ModalService } from 'src/app/_modal';
import { SubCategoria } from 'src/app/modelos/subcategoria';
import { SubCategoriaService } from 'src/app/servicios/subcategoria/subcategoria.service';
@Component({
  selector: 'app-listar-subcategoria',
  templateUrl: './listar-subcategoria.component.html',
  styleUrls: ['./listar-subcategoria.component.css']
})
export class ListarSubCategoriaComponent implements OnInit {
  lista_subcategoria: SubCategoria[];
  
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="descripcion";
  categoriaSelected=-1;
  
  lista_categoria:Categoria[];
  nombre
  constructor(private subSer: SubCategoriaService, private router : Router,
    private catSer: CategoriaService, private modalService: ModalService
    ) { }

  ngOnInit() {
    this.buscar({});
    this.cargarCategorias();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  
  buscar(ejemplo){
    this.loading = true;
    this.lista_subcategoria=[];
    ejemplo.descripcion=this.nombre;    
    if(this.categoriaSelected>=0){
      ejemplo.idCategoria = {idCategoria: this.categoriaSelected}
    }
    let inicio=(this.pagina_actual-1)*this.limite;
    
    this.service=this.subSer.getSubCategorias(String(inicio),String(this.limite),this.orderBy,'asc',ejemplo).subscribe(
      (response)=>{
        this.lista_subcategoria=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscarPorNombre(nombre: string){
    this.nombre=nombre;this.pagina_actual=1;
    this.buscar({});
  }
  
  buscarPorCategoria(id:number){
    this.categoriaSelected=id;this.pagina_actual=1;
    this.buscar({});
  }

  goToPage(n: number): void {
    this.pagina_actual = n;
    this.buscar({});
  }

  onNext( ): void {
    this.pagina_actual++;
    this.buscar({});
  }

  onPrev( ): void {
    this.pagina_actual--;
    this.buscar({});
  }

  eliminar(id: number){
    this.subSer.eliminarSubCategoria(id).subscribe(
      (response)=>{
        this.buscar({});
        alertify.notify('Eliminado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });


      },
      (error)=>{
        alertify.notify('No se puede eliminar!', 'error', 5, function(){  console.log('dismissed'); });
      }
    )
  }

  agregar(): void{
    this.router.navigate(['subcategoria/crear']);
  }

  cargarCategorias(){
    this.catSer.getCategorias("0","0","descripcion","asc",null).subscribe(
      (response)=>{
        this.lista_categoria=response.lista;
      }
    );
  }




}
