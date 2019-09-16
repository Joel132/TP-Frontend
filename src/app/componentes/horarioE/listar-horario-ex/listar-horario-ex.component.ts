import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/modelos/doctor';
import { HorarioExcepcionService } from 'src/app/servicios/horarioExc/horario-excepcion.service';
import { HorarioExcepcion } from 'src/app/modelos/horario';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import {formatDate} from 'src/app/otros/funciones';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';


@Component({
  selector: 'app-listar-horario-ex',
  templateUrl: './listar-horario-ex.component.html',
  styleUrls: ['./listar-horario-ex.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class ListarHorarioExComponent implements OnInit {
  empleados: Doctor[];
  lista_horario: HorarioExcepcion[];
  flagEsHabilitar="S";
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="fechaCadena";
  diaSelected=formatDate(new Date);
  doctorSelected=-1;
  constructor(private location: Location,private horServ: HorarioExcepcionService, private router : Router, private modalService: ModalService) { }

  ngOnInit() {
    this.buscar();
  }
  
  buscar(){
    this.loading = true;
    this.lista_horario=[];
    let ejemplo={};
    let fecha=this.diaSelected.replace(/\-/gi,"");
    if(this.doctorSelected>=0){
      ejemplo={fechaCadena:fecha, idEmpleado:{idPersona:this.doctorSelected},flagEsHabilitar:this.flagEsHabilitar}
    }
    else{
      ejemplo={fechaCadena:fecha,flagEsHabilitar:this.flagEsHabilitar}
    }
    let inicio=(this.pagina_actual-1)*this.limite;
    
    this.service=this.horServ.getHorarios(String(inicio),String(this.limite),this.orderBy,'asc',ejemplo).subscribe(
      (response)=>{
        this.lista_horario=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscarPorDia(dia){
    this.diaSelected=dia;
    this.buscar();
  }

  buscarPorDoctor(id:number){
    this.doctorSelected=id;
    this.buscar();
  }

  goToPage(n: number): void {
    this.pagina_actual = n;
    this.buscar();
  }

  onNext( ): void {
    this.pagina_actual++;
    this.buscar();
  }

  onPrev( ): void {
    this.pagina_actual--;
    this.buscar();
  }

  eliminar(id: number){
    this.horServ.eliminarHorario(id).subscribe(
      (response)=>{
        this.buscar();
        this.openModal('modal-eliminar-correcto');
      },
      (error)=>{
        this.openModal('modal-eliminar-incorrecto');
      }
    )
  }

  agregar(): void{
    this.router.navigate(['horarioE/crear']);
  }

  openModal(id: string) {
    this.modalService.open(id);
}

onAtras(){
  this.location.back();
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
