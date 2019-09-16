import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { Presentacion } from 'src/app/modelos/presentacion';
import { ProductoService } from 'src/app/servicios/presentacion/producto.service';
import { ModalService } from 'src/app/_modal';
@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  lista_producto: Presentacion[];
  
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="nombre";
  subcategoriaSelected=-1;
  lista_subcategoria=[];
  lista_categoria:Categoria[];
  nombre
  constructor(private proSer: ProductoService, private router : Router,
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
    this.lista_producto=[];
    ejemplo.nombre=this.nombre;    
    if(this.subcategoriaSelected>=0){
      ejemplo.idProducto = {idTipoProducto :{idTipoProducto:this.subcategoriaSelected}}
    }
    let inicio=(this.pagina_actual-1)*this.limite;
    
    this.service=this.proSer.listarPresentacion(String(inicio),String(this.limite),this.orderBy,ejemplo).subscribe(
      (response)=>{
        this.lista_producto=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscarPorNombre(nombre: string){
    this.nombre=nombre;
    this.buscar({});
  }
  
  buscarPorSubCategoria(id:number){
    this.subcategoriaSelected=id;
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
    this.proSer.eliminarPresentacion(id).subscribe(
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
    this.router.navigate(['producto/crear']);
  }

  cargarCategorias(){
    this.catSer.getCategorias("0","0","descripcion","asc",null).subscribe(
      (response)=>{
        this.lista_categoria=response.lista;
      }
    );
  }

  cargarSubcategorias(categoriaId){
    this.subcategoriaSelected=-1;
    this.buscar({});
    //TODO: CARGAR SUBCATEGORIAS DESDE SU SERVICIO
    this.catSer.getSubcategorias(categoriaId).subscribe(
      (response)=>{
        this.lista_subcategoria=response.lista;
      }
    )
  }


}
