import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/_modal';
import { Router } from '@angular/router';
import { ReservaService } from 'src/app/servicios/turnos/reserva.service';
import { Reserva } from 'src/app/modelos/reserva';
import {noSeleccionadoValidator} from 'src/app/otros/funciones';
@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {
  crearForm : FormGroup;
  aceptado = false;
  doctorSel;//Atributo que almacena el nombre del doctor seleccionado
  pacienteSel;//Atributo que almacena el nombre del paciente seleccionado
  fechaSel;
  lista_horarios: Reserva[];//Lista de horarios disponibles de un doctor en particular en una fecha dada
  fechaValida=true;//Si al menos hay 1 elemento en la lista_horarios
  idDoctor;
  constructor(private formBuilder : FormBuilder, private modalService:ModalService, private resSer: ReservaService,
    private router : Router) { }

  ngOnInit() {
    this.crearForm = this.formBuilder.group({
      idReserva : [],
      idEmpleado : [{idPersona:''}, noSeleccionadoValidator()],
      idCliente : [{idPersona:''}, noSeleccionadoValidator()],
      fechaCadena: ['', Validators.required],
      horarioSel: [0,[Validators.required,Validators.min(0)]]
      
    })
  }
  

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  

  cargarHorarios(){
    this.resSer.getAgenda(this.idDoctor, this.fechaSel.replace(/\-/gi,""), 'S').subscribe(
      (response)=>{
        console.log(response)
        this.lista_horarios=response;
        this.fechaValida=this.lista_horarios.length>0;
        
      }
    )
  }
  
  asignarDoctor(doctor){
    this.idDoctor=doctor.idPersona;
    this.crearForm.patchValue({
      idEmpleado:{idPersona:doctor.idPersona}
    })
    this.doctorSel=doctor.nombre;
    if(this.fechaSel)this.cargarHorarios();
  }

  asignarPaciente(paciente){
    this.crearForm.patchValue({
      idCliente:{idPersona:paciente.idPersona}
    })
    this.pacienteSel=paciente.nombre;
  }

  asignarFecha(fecha){
    this.fechaSel=fecha;
    this.crearForm.patchValue({
      fechaCadena:fecha
    })
    if(this.idDoctor)this.cargarHorarios();
  }

  onCrear(){
    this.aceptado = true;
    console.log(this.crearForm);
    if(this.crearForm.invalid){
      return;
    }
    let reserva=this.crearForm.value;
    reserva.horaInicioCadena=this.lista_horarios[reserva.horarioSel].horaInicioCadena;
    reserva.horaFinCadena=this.lista_horarios[reserva.horarioSel].horaFinCadena;
    
    reserva.fechaCadena=reserva.fechaCadena.replace(/\-/gi,"");
    delete reserva.horarioSel//SE ELIMINA ESTE CAMPO PORQUE NO NECESITA
    console.log(reserva);
    this.resSer.agendarTurno(reserva,"")
      .subscribe(response =>{ 
      this.router.navigate(['reservas']);
      alertify.notify('Creado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
      //TODO: colocar mensaje de exito
    })
    
    
  }

  onCancelar(){
    this.aceptado = false;
    this.crearForm.reset();
    this.doctorSel="";
    this.pacienteSel="";
    this.idDoctor=null;
  }

  get val(){
    return this.crearForm.controls;
  }

}


