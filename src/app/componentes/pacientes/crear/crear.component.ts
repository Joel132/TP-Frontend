import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../../modelos/paciente';
import { PacientesService } from '../../../servicios/pacientes/pacientes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  crearForm : FormGroup;
  aceptado = false;
  constructor(private pacienteService : PacientesService, private formBuilder : FormBuilder, private router : Router) { }

  ngOnInit() {
    this.crearForm = this.formBuilder.group({
      idPersona : [],
      nombre : ['', Validators.required],
      apellido : ['', Validators.required],
      telefono : ['', Validators.required],
      email : ['', [Validators.required,Validators.email]],
      ruc : ['',Validators.required],
      cedula : ['',Validators.required],
      tipoPersona : 'FISICA',
      fechaNacimiento : ['',Validators.required]
    })
  }
  onCrear(){
    this.aceptado = true;
    if(this.crearForm.invalid){
      return;
    }
    let paciente=this.crearForm.value;
    paciente.fechaNacimiento=paciente.fechaNacimiento+" 00:00:00"
    this.pacienteService.crearPaciente(this.crearForm.value)
      .subscribe(response =>{ 
      console.log(response);
      this.router.navigate(['pacientes']);
    })
  }

  onCancelar(){
    this.aceptado = false;
    this.crearForm.reset();
  }

  get val(){
    return this.crearForm.controls;
  }

}
