import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { FichaClinica } from 'src/app/modelos/ficha-clinica';
import { FichaClinicaService } from 'src/app/servicios/ficha/ficha-clinica.service';
import {formatDate} from 'src/app/otros/funciones'
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
@Component({
  selector: 'app-listar-ficha',
  templateUrl: './listar-ficha.component.html',
  styleUrls: ['./listar-ficha.component.css']
})
export class ListarFichaComponent implements OnInit {
  lista_ficha: FichaClinica[];
  
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
  fichaModifcar;
  subcategoriaSelected=-1;
  lista_subcategoria=[];
  lista_categoria:Categoria[];
  constructor(private resServ: FichaClinicaService, private router : Router, private modalService: ModalService,
    private catSer: CategoriaService
    ) { }

  ngOnInit() {
    this.buscar({});
    this.cargarCategorias();
  }
  
  buscar(ejemplo){
    this.loading = true;
    this.lista_ficha=[];
    
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
    
    this.service=this.resServ.listarFichas(String(inicio),String(this.limite),this.orderBy,ejemplo).subscribe(
      (response)=>{
        this.lista_ficha=response.lista;
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
    this.resServ.cancelarFicha(id).subscribe(
      (response)=>{
        this.buscar({});
      }
    )
  }

  agregar(): void{
    this.router.navigate(['ficha/crear']);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  modificar(obs){
    let ficha = {idFichaClinica:this.fichaModifcar.idFichaClinica,observacion:obs}
    this.resServ.modificarFicha(ficha,"").subscribe(
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

  setFichaModificar(ficha){
    this.fichaModifcar=ficha;
  }

closeModal(id: string) {
    this.modalService.close(id);
}

}
