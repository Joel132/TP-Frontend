import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/modelos/doctor';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';
import { Reserva } from 'src/app/modelos/reserva';
import { ReservaService } from 'src/app/servicios/turnos/reserva.service';
import {formatDate} from 'src/app/otros/funciones'
@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {
  empleados: Doctor[];
  lista_reserva: Reserva[];
  
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="fechaCadena";
  fechaActual=formatDate(new Date);
  fechaDesde=this.fechaActual;//TODO: CAMBIAR POR FECHA ACTUAL
  fechaHasta=this.fechaActual;//TODO: CAMBIAR POR FECHA ACTUAL
  doctorSelected=-1;
  pacienteSelected=-1;
  reservaModificar;
  constructor(private resServ: ReservaService, private router : Router, private modalService: ModalService) { }

  ngOnInit() {
    this.buscar({});
  }
  
  buscar(ejemplo){
    this.loading = true;
    this.lista_reserva=[];
    
    const fechaD=this.fechaDesde.replace(/\-/gi,""); ejemplo.fechaDesdeCadena=fechaD;
    const fechaH=this.fechaHasta.replace(/\-/gi,""); ejemplo.fechaHastaCadena=fechaH;
    
    if(this.doctorSelected>=0){
      ejemplo.idEmpleado={idPersona:this.doctorSelected}
    }
    if(this.pacienteSelected>=0){
      ejemplo.idCliente={idPersona:this.pacienteSelected}
    }
    let inicio=(this.pagina_actual-1)*this.limite;
    
    this.service=this.resServ.listarReservas(String(inicio),String(this.limite),this.orderBy,'asc',ejemplo).subscribe(
      (response)=>{
        this.lista_reserva=response.lista;
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
    this.resServ.cancelarReserva(id).subscribe(
      (response)=>{
        this.buscar({});
        this.openModal('modal-eliminar-correcto');
      },
      (error)=>{
        this.openModal('modal-eliminar-incorrecto');
      }
    )
  }

  agregar(): void{
    this.router.navigate(['reserva/crear']);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  modificar(asis, obs){
    let reserva = {idReserva:this.reservaModificar.idReserva,observacion:obs,flagAsistio:asis?"S":"N"}
    this.resServ.modificarReserva(reserva,"").subscribe(
      (response)=>{
        this.buscar({});
        this.closeModal('modal-modificar');
      });
  }

  setReservaModificar(reserva){
    this.reservaModificar=reserva;
  }

closeModal(id: string) {
    this.modalService.close(id);
}

}
