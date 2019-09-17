import { Component, OnInit } from '@angular/core';
import {formatDate} from 'src/app/otros/funciones'
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { ServiciosService } from 'src/app/servicios/servicios/servicios.service';
import { Servicio, DetalleServicio } from 'src/app/modelos/servicio';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { Presentacion } from 'src/app/modelos/presentacion';
import { ProductoService } from 'src/app/servicios/presentacion/producto.service';
import { ExportarService } from 'src/app/servicios/export/exportar.service';

@Component({
  selector: 'app-servicios-detallado-r',
  templateUrl: './servicios-r-detallado.component.html',
  styleUrls: ['./servicios-r-detallado.component.css']
})
export class ServiciosDetalladoRComponent implements OnInit {
  lista_servicio: DetalleServicio[];

  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  orderBy="fechaHoraCadena";
  fechaActual=formatDate(new Date);
  fechaDesde=this.fechaActual;//TODO: CAMBIAR POR FECHA ACTUAL
  fechaHasta=this.fechaActual;//TODO: CAMBIAR POR FECHA ACTUAL
  doctorSelected=-1;
  pacienteSelected=-1;
  subcategoriaSelected=-1;
  lista_subcategoria=[];
  lista_categoria:Categoria[];
  lista_presentacion:Presentacion[];
  presentacionSelected=-1;
  precios: { [id: number] : number; } = {};

  constructor(private resServ: ServiciosService,private router : Router, private modalService: ModalService,private catSer: CategoriaService,
    private preSer:ProductoService,private exportService:ExportarService) { }
  
    exportExcel(data) {
      this.exportService.exportExcel(data, 'servicios-detallados');
    }

    exportPDF(data) {
      this.exportService.exportPDF(data, 'servicios-detallados');
    }

  ngOnInit() {
    this.buscar({});
    this.cargarCategorias();
    this.preSer.listarPresentacion('0','0','nombre',{}).subscribe(
      (response)=>{
        let lista=response.lista;
        for(let pres of lista){
          this.preSer.getPrecioPresentacion(pres.idPresentacionProducto,'').subscribe(
            (precio)=>this.precios[pres.idPresentacionProducto]=precio
          )
        }
      }
    )
  }
  buscar(ejemplo){
    this.loading = true;
    this.lista_servicio=[];
    
    const fechaD=this.fechaDesde.replace(/\-/gi,""); ejemplo.fechaDesdeCadena=fechaD;
    const fechaH=this.fechaHasta.replace(/\-/gi,""); ejemplo.fechaHastaCadena=fechaH;
    ejemplo.idFichaClinica={}
    if(this.doctorSelected>=0){
      ejemplo.idEmpleado={idPersona:this.doctorSelected}
    }
    if(this.pacienteSelected>=0){
      ejemplo.idFichaClinica.idCliente={idPersona:this.pacienteSelected}
    }
    let inicio=(this.pagina_actual-1)*this.limite;
    let ejemplo1={idServicio:ejemplo,idPresentacionProducto:{idPresentacionProducto:this.presentacionSelected==-1?null:this.presentacionSelected}}
    this.resServ.getServiciosDetallado("0","0",ejemplo1).subscribe(
      (response)=>{
        this.lista_servicio=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }
  setFechaDesde(fecha){
    this.fechaDesde=fecha;this.pagina_actual=1;
    if(!fecha)this.fechaDesde=this.fechaActual;
    this.buscar({});
  }

  setFechaHasta(fecha){
    this.fechaHasta=fecha;this.pagina_actual=1;
    if(!fecha)this.fechaHasta=this.fechaActual;
    this.buscar({});
  }

  buscarPorDoctor(id:number){
    this.doctorSelected=id;this.pagina_actual=1;
    this.buscar({});
  }

  buscarPorPaciente(id:number){
    this.pacienteSelected=id;this.pagina_actual=1;
    this.buscar({});
  }

  buscarPorPresentacion(id:number){
    this.presentacionSelected=id;this.pagina_actual=1;
    this.buscar({});
  }

  cargarPresentacion(id:number){
    this.subcategoriaSelected=id;
    this.preSer.listarPresentacion('0','0','nombre',{idProducto:{idTipoProducto:{idTipoProducto:this.subcategoriaSelected}}}).
    subscribe((response)=>this.lista_presentacion=response.lista)
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


  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
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
