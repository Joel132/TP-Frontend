import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ModalService } from 'src/app/_modal';
import { HorarioService } from 'src/app/servicios/horario/horario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Horario } from 'src/app/modelos/horario';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class EditarHorarioComponent implements OnInit {
  editarForm : FormGroup;
  horarioOriginal: Horario;
  dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  aceptado = false;
  doctorSel;
  constructor(private location: Location,private formBuilder : FormBuilder, private modalService:ModalService, private horSer: HorarioService,
    private router : Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.horSer.getHorario(+params.get('horId')).subscribe((response)=>{
        this.horarioOriginal=response
        this.llenarForm();
      });
    });
  }

  private llenarForm(): void{
    this.editarForm = this.formBuilder.group({
      idPersonaHorarioAgenda : [this.horarioOriginal.idPersonaHorarioAgenda],
      dia : [this.horarioOriginal.dia, Validators.required],
      horaAperturaCadena : [this.horarioOriginal.horaApertura, [Validators.required,Validators.min(0),Validators.max(2359)]],
      horaCierreCadena : [this.horarioOriginal.horaCierre, [Validators.required,Validators.min(0),Validators.max(2359)]],
      intervaloMinutos: [this.horarioOriginal.intervaloMinutos, [Validators.required,Validators.min(5),Validators.max(60)]],
      idEmpleado : [this.horarioOriginal.idEmpleado, noSeleccionadoValidator()],
      
    })
    this.doctorSel=this.horarioOriginal.idEmpleado.nombre;

  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  asignarDoctor(doctor){
    this.editarForm.patchValue({
      idEmpleado:doctor
    })
    this.doctorSel=doctor.nombre;
  }

  onEditar(){
    this.aceptado = true;
    if(this.editarForm.invalid){
      return;
    }
    let horario=this.editarForm.value;
    horario.horaAperturaCadena=horario.horaAperturaCadena.slice(0,2)+horario.horaAperturaCadena.slice(3,5);
    horario.horaCierreCadena=horario.horaCierreCadena.slice(0,2)+horario.horaCierreCadena.slice(3,5);
    horario.idEmpleado={idPersona:horario.idEmpleado.idPersona}
    this.horSer.editarHorario(this.editarForm.value,"")
      .subscribe(response =>{ 
      this.router.navigate(['horarios']);
      alertify.notify('Modificado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
      //TODO: colocar mensaje de exito
    },
    error=>{
      alertify.notify('Ha ocurrido un error!', 'error', 5, function(){  console.log('dismissed'); });
    }
  )
    
  }

  onCancelar(){
    this.aceptado = false;
    this.editarForm.patchValue({
      idPersonaHorarioAgenda : this.horarioOriginal.idPersonaHorarioAgenda,
      dia : this.horarioOriginal.dia,
      horaAperturaCadena : this.horarioOriginal.horaApertura,
      horaCierreCadena : this.horarioOriginal.horaCierre,
      intervaloMinutos: this.horarioOriginal.intervaloMinutos,
      idEmpleado : this.horarioOriginal.idEmpleado
    });
    this.doctorSel=this.horarioOriginal.idEmpleado.nombre;
    this.location.back();
  }

  get val(){
    return this.editarForm.controls;
  }

}

export function noSeleccionadoValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const asignado=control.value&&control.value.idPersona;
    console.log(control.value);
    return asignado ? null:{'noSeleccionado': {message: 'No seleccionado'}};
  };
}
