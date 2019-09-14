import { Component, OnInit } from '@angular/core';
import {formatDate} from 'src/app/otros/funciones'
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';
import { Servicio } from 'src/app/modelos/servicio';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  lista_servicio: Servicio[];

  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="fechaHoraCadena";
  fechaActual=formatDate(new Date);
  fechaDesde=this.fechaActual;//TODO: CAMBIAR POR FECHA ACTUAL
  fechaHasta=this.fechaActual;//TODO: CAMBIAR POR FECHA ACTUAL
  doctorSelected=-1;
  pacienteSelected=-1;
  servicioModificar;
  subcategoriaSelected=-1;
  lista_subcategoria=[];
  lista_categoria:Categoria[];
  constructor(private resServ: ServiciosService,private router : Router, private modalService: ModalService,private catSer: CategoriaService) { }

  ngOnInit() {
    this.buscar({});
  }
  buscar(ejemplo){
    this.loading = true;
    this.lista_servicio=[];
    
    const fechaD=this.fechaDesde.replace(/\-/gi,""); ejemplo.fechaDesdeCadena=fechaD;
    const fechaH=this.fechaHasta.replace(/\-/gi,""); ejemplo.fechaHastaCadena=fechaH;
    
    if(this.doctorSelected>=0){
      ejemplo.idEmpleado={idPersona:this.doctorSelected}
    }
    if(this.pacienteSelected>=0){
      ejemplo.idCliente={idPersona:this.pacienteSelected}
    }
    if(this.subcategoriaSelected>=0){
      ejemplo.idTipoProducto={idTipoProducto:this.subcategoriaSelected}
    }
    let inicio=(this.pagina_actual-1)*this.limite;
    
    this.service=this.resServ.listarServicios(String(inicio),String(this.limite),this.orderBy,ejemplo).subscribe(
      (response)=>{
        this.lista_servicio=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }
  setFechaDesde(fecha){
    this.fechaDesde=fecha;
    this.buscar({});
  }

  setFechaHasta(fecha){
    this.fechaHasta=fecha;
    this.buscar({});
  }

  buscarPorDoctor(id:number){
    this.doctorSelected=id;
    this.buscar({});
  }

  buscarPorPaciente(id:number){
    this.pacienteSelected=id;
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
    this.resServ.cancelarServicio(id).subscribe(
      (response)=>{
        this.buscar({});
      }
    )
  }

  agregar(): void{
    this.router.navigate(['servicios/crear-servicio']);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
}

 
  modificar(obs){
    let servicio = {idPresentacionProducto: this.servicioModificar.idPresentacionProducto,observacion:obs}
    this.resServ.modificarServicio(servicio,"").subscribe(
      (response)=>{
        this.buscar({});
        this.closeModal('modal-modificar');
      });
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

  setServicioModificar(servicio){
    this.servicioModificar=servicio;
  }
}
