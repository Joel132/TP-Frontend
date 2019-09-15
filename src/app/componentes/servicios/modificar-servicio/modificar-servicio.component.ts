import { Component, OnInit } from '@angular/core';
import { Detalle } from 'src/app/modelos/detalle';
import {formatDate, getHora} from 'src/app/otros/funciones'
import {ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { FichaClinica } from 'src/app/modelos/ficha-clinica';
import { FichaClinicaService } from 'src/app/servicios/ficha/ficha-clinica.service';
import { DetalleServicio } from 'src/app/modelos/servicio';
import { ProductoService } from 'src/app/servicios/presentacion/producto.service';
import { Presentacion } from 'src/app/modelos/presentacion';


@Component({
  selector: 'app-modificar-servicio',
  templateUrl: './modificar-servicio.component.html',
  styleUrls: ['./modificar-servicio.component.css']
})
export class ModificarServicioComponent implements OnInit {

  fichaClinica:FichaClinica;
  servicioId: number;
  //PARA LOS DETALLES
  cabecera_servicio = {idFichaClinica:{idFichaClinica:null},observacion:""}
  lista_detalle : DetalleServicio[]=[];
  servicioCrear;
  subcategoriaSelected=-1;
  lista_subcategoria=[];
  lista_categoria:Categoria[];
  lista_productos: Presentacion[];
  precioSeleccionado:number;
  productoSeleccionado:Presentacion;
  detalle_valido=true;
  lista_eliminado: number[]=[];
  
  constructor(private fichaSer: FichaClinicaService, private router : Router,
    private catSer: CategoriaService, private serSer: ServiciosService, private route: ActivatedRoute,
    private proSer: ProductoService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let fichaId=+params.get('ficId');
      this.servicioId=+params.get('serId');
      console.log(this.servicioId)
      this.fichaSer.getFicha(fichaId).subscribe(
        (response)=>this.fichaClinica=response
      )
      this.serSer.listarDetalles(this.servicioId).subscribe(
        (data)=>{
          this.lista_detalle=data
          for(let detalle of this.lista_detalle){
            this.lista_eliminado.push(detalle.idServicioDetalle);
            this.proSer.getPrecioPresentacion(detalle.idPresentacionProducto.idPresentacionProducto,"").subscribe(
              (precio)=>detalle.precio=precio
            );
          }
        })
    })
    
    this.cargarCategorias();
  }

  guardarServicio(){
    
    /**
     * Se elimina lo que habia
     */
      for(let idDetalle of this.lista_eliminado){
        this.serSer.eliminarDetalle(this.servicioId,idDetalle,"").subscribe(
          (response)=>{
            console.log("Eliminado")
          }
        )
      } 
      
      /**
       * Se agrega todo como nuevo
       */
      for( let detalle of this.lista_detalle){
        this.serSer.agregarDetalle(this.servicioId,{
          cantidad:detalle.cantidad,
          idPresentacionProducto:{idPresentacionProducto:detalle.idPresentacionProducto.idPresentacionProducto}
          
        },"").subscribe(
          (detalle_response)=>{
            console.log("Agregado")
          }
        )
      }
      this.router.navigate(['/servicios']);
      
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
    if(categoriaId==-1)return ;
    //TODO: CARGAR SUBCATEGORIAS DESDE SU SERVICIO
    this.catSer.getSubcategorias(categoriaId).subscribe(
      (response)=>{
        this.lista_subcategoria=response.lista;
      }
    )
  }

  cargarPresentaciones(subCatId:number){
    if(subCatId==-1)return ;
    this.subcategoriaSelected=subCatId;
    this.proSer.listarPresentacion('0','0','nombre',{idProducto:{idTipoProducto:{idTipoProducto:this.subcategoriaSelected}}}).subscribe(
      (data)=>{
        this.lista_productos=data.lista;
      }
    );
    //
  }

  cargarPrecio(index:number){
    if(index==-1)return ;
    this.productoSeleccionado=this.lista_productos[index];
    this.proSer.getPrecioPresentacion(this.productoSeleccionado.idPresentacionProducto,"").subscribe(
      (data)=>this.precioSeleccionado=data
    )
  }

  agregarDetalle(cantidad:number){
    if(!this.productoSeleccionado || cantidad<1){
      this.detalle_valido=false;
      return ;
    }
    this.detalle_valido=true;
    let index=this.lista_detalle.findIndex((detalle)=>detalle.idPresentacionProducto.idPresentacionProducto==this.productoSeleccionado.idPresentacionProducto);
    if(index>-1){//SI YA EXISTE SUMAR LA CANTIDAD
      const a=Number(this.lista_detalle[index].cantidad);
      const b=Number(cantidad);
      this.lista_detalle[index].cantidad=a+b;
    }
    else{
      let detalle=new DetalleServicio();
      detalle.idPresentacionProducto=this.productoSeleccionado
      detalle.cantidad=cantidad;
      detalle.precio=this.precioSeleccionado;
      this.lista_detalle.push(detalle);
    }
  }

  eliminarDetalle(index:number){
    if (index > -1) {
      this.lista_detalle.splice(index, 1);
    }
  }

}
