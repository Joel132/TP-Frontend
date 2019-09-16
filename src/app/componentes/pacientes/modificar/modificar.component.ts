import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PacientesService } from '../../../servicios/pacientes/pacientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from "../../../modelos/paciente";


@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {
  pacienteOriginal: Paciente;
  modificarForm: FormGroup;
  aceptado = false;
  constructor(private formBuilder: FormBuilder, private pacService : PacientesService, private router : Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pacService.getPaciente(+params.get('pacId')).subscribe((response)=>{
        this.pacienteOriginal=response;
        this.llenarForm();
      })
    })
  }

  private llenarForm():void{
    this.modificarForm = this.formBuilder.group({
      idPersona : [this.pacienteOriginal.idPersona,Validators.required],
      nombre : [this.pacienteOriginal.nombre, Validators.required],
      apellido : [this.pacienteOriginal.apellido, Validators.required],
      telefono : [this.pacienteOriginal.telefono, Validators.required],
      email : [this.pacienteOriginal.email, Validators.required],
      ruc : [this.pacienteOriginal.ruc, Validators.required],
      cedula : [this.pacienteOriginal.cedula, Validators.required],
      tipoPersona : [this.pacienteOriginal.tipoPersona, Validators.required],
      fechaNacimiento : [this.pacienteOriginal.fechaNacimiento, Validators.required]
      
    })
  }

  onModificar(){
    this.aceptado = true;
    if(this.modificarForm.invalid){
      return;
    }
    let paciente=this.modificarForm.value;
    paciente.fechaNacimiento=paciente.fechaNacimiento+" 00:00:00"
    this.pacService.editarPaciente(paciente)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['listar/pacientes']);
        alertify.notify('Modificado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
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
