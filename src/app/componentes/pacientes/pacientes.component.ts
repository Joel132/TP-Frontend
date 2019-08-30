import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../modelos/paciente';
import { PacientesService } from '../../servicios/pacientes/pacientes.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  
 
  constructor() { }

  ngOnInit() {
  
  }
  
}
