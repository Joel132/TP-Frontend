import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Doctor } from 'src/app/modelos/doctor';
import { DoctorService } from 'src/app/servicios/doctor/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-doctor',
  templateUrl: './buscar-doctor.component.html',
  styleUrls: ['./buscar-doctor.component.css']
})
export class BuscarDoctorComponent implements OnInit {
  @Output() doctorSeleccionado = new EventEmitter<Doctor>(); 
  lista_doctor: Doctor[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="nombre";
  buscarPor="nombre";
  constructor(private doctor_service:DoctorService, private router : Router) { }

  ngOnInit() {
    this.loading = true;
    this.service=this.doctor_service.getDoctors('0',String(this.limite),this.orderBy,'asc',null).subscribe(
      (response)=>{
        this.lista_doctor=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscar(nombre?: String){
    let cat = nombre ? this.buscarPor == "nombre" ? { nombre:nombre}: { apellido:nombre}:null;
    //Se calcula desde donde pedir a partir de la pagina solicitada
    let inicio=(this.pagina_actual-1)*this.limite;
    this.service=this.doctor_service.getDoctors(String(inicio),String(this.limite),this.orderBy,'asc',cat).subscribe(
      (response)=>{
        this.lista_doctor=response.lista;
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

  elegir(doctor){
    this.doctorSeleccionado.emit(doctor);
  }


}
