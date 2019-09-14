import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/_modal';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservaService } from 'src/app/servicios/turnos/reserva.service';
import { Reserva } from 'src/app/modelos/reserva';
import {noSeleccionadoValidator} from 'src/app/otros/funciones';
@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent implements OnInit {
  modificarForm : FormGroup;
  aceptado = false;
  doctorSel;//Atributo que almacena el nombre del doctor seleccionado
  pacienteSel;//Atributo que almacena el nombre del paciente seleccionado
  fechaSel;
  lista_horarios: Reserva[];//Lista de horarios disponibles de un doctor en particular en una fecha dada
  fechaValida=true;//Si al menos hay 1 elemento en la lista_horarios
  idDoctor;
  reservaOriginal: Reserva;
  constructor(private formBuilder : FormBuilder, private modalService:ModalService, private resSer: ReservaService,
    private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.resSer.getReserva(+params.get('resId')).subscribe((response)=>{
        this.reservaOriginal=response
        this.llenarForm();
      });
    });
    
  }

  llenarForm(){
    this.modificarForm = this.formBuilder.group({
      idReserva : [this.reservaOriginal.idReserva],
      idEmpleado : [{idPersona:this.reservaOriginal.idEmpleado.idPersona}, noSeleccionadoValidator()],
      idCliente : [{idPersona:this.reservaOriginal.idCliente.idPersona}, noSeleccionadoValidator()],
      fechaCadena: [this.reservaOriginal.fecha, Validators.required],
      horarioSel: [-1,[Validators.required,Validators.min(-1)]],
      observacion: [this.reservaOriginal.observacion],
      flagAsistio: [this.reservaOriginal.flagAsistio]
    })
    this.doctorSel=this.reservaOriginal.idEmpleado.nombre;
    this.pacienteSel=this.reservaOriginal.idCliente.nombre;
    this.fechaSel=this.reservaOriginal.fecha;
    this.idDoctor=this.reservaOriginal.idEmpleado.idPersona;
    this.cargarHorarios();
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
    this.modificarForm.patchValue({
      idEmpleado:{idPersona:doctor.idPersona}
    })
    this.doctorSel=doctor.nombre;
    if(this.fechaSel)this.cargarHorarios();
  }

  asignarPaciente(paciente){
    this.modificarForm.patchValue({
      idCliente:{idPersona:paciente.idPersona}
    })
    this.pacienteSel=paciente.nombre;
  }

  asignarFecha(fecha){
    this.fechaSel=fecha;
    this.modificarForm.patchValue({
      fechaCadena:fecha
    })
    if(this.idDoctor)this.cargarHorarios();
  }

  onModificar(){
    this.aceptado = true;
    console.log(this.modificarForm);
    if(this.modificarForm.invalid){
      return;
    }
    let reserva=this.modificarForm.value;
    if(reserva.horarioSel>-1){
      reserva.horaInicioCadena=this.lista_horarios[reserva.horarioSel].horaInicioCadena;
      reserva.horaFinCadena=this.lista_horarios[reserva.horarioSel].horaFinCadena;
    }
    
    reserva.fechaCadena=reserva.fechaCadena.replace(/\-/gi,"");
    delete reserva.horarioSel//SE ELIMINA ESTE CAMPO PORQUE NO NECESITA
    console.log(reserva);
    this.resSer.modificarReserva(reserva,"")
      .subscribe(response =>{ 
      this.router.navigate(['reservas']);
      //TODO: colocar mensaje de exito
    })
    
    
  }

  onCancelar(){
    this.aceptado = false;
    this.llenarForm();
  }

  get val(){
    return this.modificarForm.controls;
  }

}


