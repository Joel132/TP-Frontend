import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ModalService } from 'src/app/_modal';
import { HorarioExcepcionService } from 'src/app/servicios/horarioExc/horario-excepcion.service';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-crear-horario-ex',
  templateUrl: './crear-horario-ex.component.html',
  styleUrls: ['./crear-horario-ex.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class CrearHorarioExComponent implements OnInit {
  crearForm : FormGroup;
  aceptado = false;
  doctorSel;
  ocultarHoras=false;
  constructor(private location: Location,private formBuilder : FormBuilder, private modalService:ModalService, private horSer: HorarioExcepcionService,
    private router : Router) { }

  ngOnInit() {
    this.crearForm = this.formBuilder.group({
      idHorarioExcepcion : [],
      horaAperturaCadena : ['', [Validators.required,Validators.min(0),Validators.max(2359)]],
      horaCierreCadena : ['', [Validators.required,Validators.min(0),Validators.max(2359)]],
      intervaloMinutos: ['', [Validators.required,Validators.min(5),Validators.max(60)]],
      idEmpleado : [{idPersona:''}, noSeleccionadoValidator()],
      fechaCadena: ['', Validators.required],
      flagEsHabilitar: 'S'
    })
  }
  

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  asignarDoctor(doctor){
    this.crearForm.patchValue({
      idEmpleado:{idPersona:doctor.idPersona}
    })
    this.doctorSel=doctor.nombre;
  }

  onCrear(){
    this.aceptado = true;
    if(this.ocultarHoras){  
      this.crearForm.get('horaAperturaCadena').setValidators([]); // or clearValidators()
      this.crearForm.get('horaAperturaCadena').updateValueAndValidity();
      this.crearForm.get('horaCierreCadena').setValidators([]); // or clearValidators()
      this.crearForm.get('horaCierreCadena').updateValueAndValidity();
      this.crearForm.get('intervaloMinutos').setValidators([]); // or clearValidators()
      this.crearForm.get('intervaloMinutos').updateValueAndValidity();
    }
    if(this.crearForm.invalid){
      return;
    }
    let horario=this.crearForm.value;
    if(!this.ocultarHoras){
      horario.horaAperturaCadena=horario.horaAperturaCadena.slice(0,2)+horario.horaAperturaCadena.slice(3,5);
      horario.horaCierreCadena=horario.horaCierreCadena.slice(0,2)+horario.horaCierreCadena.slice(3,5);
    }
    horario.fechaCadena=horario.fechaCadena.replace(/\-/gi,"");
    this.horSer.crearHorario(horario,"")
      .subscribe(response =>{ 
      this.router.navigate(['horarios']);
      alertify.notify('Creado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
      //TODO: colocar mensaje de exito
    },
    error=>{
      alertify.notify('Ha ocurrido un error!', 'error', 5, function(){  console.log('dismissed'); });
    }
  )
    
  }

  onCancelar(){
    this.aceptado = false;
    this.crearForm.reset();
    this.doctorSel="";
    this.location.back();
  }

  get val(){
    return this.crearForm.controls;
  }

}

export function noSeleccionadoValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const asignado=control.value&&control.value.idPersona;
    console.log(control.value);
    return asignado ? null:{'noSeleccionado': {message: 'No seleccionado'}};
  };
}
