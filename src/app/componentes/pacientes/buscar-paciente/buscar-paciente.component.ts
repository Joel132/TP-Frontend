import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Paciente } from 'src/app/modelos/paciente';
import { PacientesService } from 'src/app/servicios/pacientes/pacientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent implements OnInit {
  @Output() pacienteSeleccionado = new EventEmitter<Paciente>(); 
  lista_paciente: Paciente[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="nombre";
  constructor(private paciente_service:PacientesService, private router : Router) { }

  ngOnInit() {
    this.loading = true;
    this.service=this.paciente_service.getPacientes('0',String(this.limite),this.orderBy,'asc',null).subscribe(
      (response)=>{
        this.lista_paciente=response.lista;
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
        this.lista_paciente=response.lista;
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

  elegir(paciente){
    this.pacienteSeleccionado.emit(paciente);
  }


}
