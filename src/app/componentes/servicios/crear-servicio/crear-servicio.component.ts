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
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  //PARA LA FICHA
  lista_ficha: FichaClinica[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  orderBy="fechaHoraCadena";
  fechaActual=formatDate(new Date);
  fechaDesde=this.fechaActual;//TODO: CAMBIAR POR FECHA ACTUAL
  doctorSelected=-1;
  pacienteSelected=-1;
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
  fichaSeleccionada=true;
  constructor(private fichaSer: FichaClinicaService, private router : Router, private modalService: ModalService,
    private catSer: CategoriaService, private serSer: ServiciosService, private route: ActivatedRoute,
    private proSer: ProductoService) { }

  ngOnInit() {
    
    this.buscarFicha({});
    this.cargarCategorias();
  }

  guardarServicio(){
    if(!this.cabecera_servicio.idFichaClinica.idFichaClinica){
      this.fichaSeleccionada=false;
      return ;//SI NO SELECCIONA NINGUNA FICHA ESTA MAL
    }
    this.fichaSeleccionada=true;
    this.serSer.crearServicio(this.cabecera_servicio,"").subscribe(
      (response)=>{
        const id_servicio=response;
        for( let detalle of this.lista_detalle){
          this.serSer.agregarDetalle(id_servicio,{
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
    )
  }

  //PARA FICHA
  buscarFicha(ejemplo){
    this.loading = true;
    this.lista_ficha=[];
    
    const fechaD=this.fechaDesde.replace(/\-/gi,""); ejemplo.fechaDesdeCadena=ejemplo.fechaHastaCadena=fechaD;
    
    if(this.doctorSelected>=0){
      ejemplo.idEmpleado={idPersona:this.doctorSelected}
    }
    if(this.pacienteSelected>=0){
      ejemplo.idCliente={idPersona:this.pacienteSelected}
    }
  
    let inicio=(this.pagina_actual-1)*this.limite;
    
    this.service=this.fichaSer.listarFichas(String(inicio),String(this.limite),this.orderBy,ejemplo).subscribe(
      (response)=>{
        this.lista_ficha=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  //PARA FICHA
  setFechaDesde(fecha){
    this.fechaDesde=fecha;
    this.buscarFicha({});
  }

  //PARA FICHA
  buscarPorDoctor(id:number){
    this.doctorSelected=id;
    this.buscarFicha({});
  }

  //PARA FICHA
  buscarPorPaciente(id:number){
    this.pacienteSelected=id;
    this.buscarFicha({});
  }

  //PARA FICHA
  goToPage(n: number): void {
    this.pagina_actual = n;
    this.buscarFicha({});
  }

  //PARA FICHA
  onNext( ): void {
    this.pagina_actual++;
    this.buscarFicha({});
  }

  //PARA FICHA
  onPrev( ): void {
    this.pagina_actual--;
    this.buscarFicha({});
  }


  openModal(id: string) {
    this.modalService.open(id);
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
    
    //TODO: CARGAR SUBCATEGORIAS DESDE SU SERVICIO
    this.catSer.getSubcategorias(categoriaId).subscribe(
      (response)=>{
        this.lista_subcategoria=response.lista;
      }
    )
  }

  cargarPresentaciones(subCatId:number){
    this.subcategoriaSelected=subCatId;
    this.proSer.listarPresentacion('0','0','nombre',{idProducto:{idTipoProducto:{idTipoProducto:this.subcategoriaSelected}}}).subscribe(
      (data)=>{
        this.lista_productos=data.lista;
      }
    );
    //
  }

  cargarPrecio(index:number){
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

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
