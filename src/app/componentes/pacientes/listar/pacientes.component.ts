import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../modelos/paciente';
import { PacientesService } from '../../../servicios/pacientes/pacientes.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  
  lista_pacientes: Paciente[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="nombre";
  constructor(private paciente_service:PacientesService, private router : Router, private modalService: ModalService) { }

  ngOnInit() {
    this.loading = true;
    this.service=this.paciente_service.getPacientes('0',String(this.limite),this.orderBy,'asc',null).subscribe(
      (response)=>{
        this.lista_pacientes=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscar(nombre?: String){
    let cat = nombre ? { nombre:nombre}: null;
    //Se calcula desde donde pedir a partir de la pagina solicitada
    let inicio=(this.pagina_actual-1)*this.limite;
    this.service=this.paciente_service.getPacientes(String(inicio),String(this.limite),this.orderBy,'asc',cat).subscribe(
      (response)=>{
        this.lista_pacientes=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  goToPage(n: number, nombre: String ): void {
    this.pagina_actual = n;
    this.buscar(nombre);
  }

  onNext(nombre: String ): void {
    this.pagina_actual++;
    this.buscar(nombre);
  }

  onPrev(nombre: String ): void {
    this.pagina_actual--;
    this.buscar(nombre);
  }

  eliminar(id: number){
    this.paciente_service.eliminarPaciente(id).subscribe(
      (response)=>{
        this.buscar();
        alertify.notify('Eliminado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });


      },
      (error)=>{
        alertify.notify('No se puede eliminar!', 'error', 5, function(){  console.log('dismissed'); });
      }
    )
  }
  agregar(): void{
    this.router.navigate(['pacientes/crear']);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
}
