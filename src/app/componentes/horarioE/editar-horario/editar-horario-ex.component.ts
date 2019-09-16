import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ModalService } from 'src/app/_modal';
import { HorarioExcepcionService } from 'src/app/servicios/horarioExc/horario-excepcion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HorarioExcepcion } from 'src/app/modelos/horario';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-editar-ex-horario',
  templateUrl: './editar-horario-ex.component.html',
  styleUrls: ['./editar-horario-ex.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class EditarHorarioExComponent implements OnInit {
  editarForm : FormGroup;
  horarioOriginal: HorarioExcepcion;
  aceptado = false;
  doctorSel;
  ocultarHoras=false;
  constructor(private location: Location,private formBuilder : FormBuilder, private modalService:ModalService, private horSer: HorarioExcepcionService,
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
      idHorarioExcepcion : [this.horarioOriginal.idHorarioExcepcion],
      fechaCadena : [this.horarioOriginal.fecha, Validators.required],
      horaAperturaCadena : [this.horarioOriginal.horaApertura, [Validators.required,Validators.min(0),Validators.max(2359)]],
      horaCierreCadena : [this.horarioOriginal.horaCierre, [Validators.required,Validators.min(0),Validators.max(2359)]],
      intervaloMinutos: [this.horarioOriginal.intervaloMinutos, [Validators.required,Validators.min(5),Validators.max(60)]],
      idEmpleado : [this.horarioOriginal.idEmpleado, noSeleccionadoValidator()],
      flagEsHabilitar: this.horarioOriginal.flagEsHabilitar
      
    })
    if(this.horarioOriginal.flagEsHabilitar=='N')this.ocultarHoras=true;
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
    if(this.ocultarHoras){  
      this.editarForm.get('horaAperturaCadena').setValidators([]); // or clearValidators()
      this.editarForm.get('horaAperturaCadena').updateValueAndValidity();
      this.editarForm.get('horaCierreCadena').setValidators([]); // or clearValidators()
      this.editarForm.get('horaCierreCadena').updateValueAndValidity();
      this.editarForm.get('intervaloMinutos').setValidators([]); // or clearValidators()
      this.editarForm.get('intervaloMinutos').updateValueAndValidity();
    }
    if(this.editarForm.invalid){
      return;
    }
    let horario=this.editarForm.value;
    horario.idEmpleado={idPersona:horario.idEmpleado.idPersona}
    if(!this.ocultarHoras){
      horario.horaAperturaCadena=horario.horaAperturaCadena.slice(0,2)+horario.horaAperturaCadena.slice(3,5);
      horario.horaCierreCadena=horario.horaCierreCadena.slice(0,2)+horario.horaCierreCadena.slice(3,5);
    }
    horario.fechaCadena=horario.fechaCadena.replace(/\-/gi,"");
    this.horSer.editarHorario(this.editarForm.value,"")
      .subscribe(response =>{ 
      this.router.navigate(['horariosE']);
      //TODO: colocar mensaje de exito
    })
    alert('Horario Asignado correctamente!')
  }

  onCancelar(){
    this.aceptado = false;
    this.editarForm.patchValue(this.horarioOriginal);
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
