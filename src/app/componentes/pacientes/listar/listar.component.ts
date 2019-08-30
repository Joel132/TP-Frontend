import { Component, OnInit } from '@angular/core';
import { Paciente } from "../../../modelos/paciente";
import { PacientesService } from '../../../servicios/pacientes/pacientes.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  
  listaPacientes : Paciente[];
  constructor(private pacientes_service:PacientesService) { }

  ngOnInit() {
    this.pacientes_service.getPacientes().subscribe(
      (response) => {
        this.listaPacientes = response.lista;
        console.log(this.listaPacientes);
      });
  }

}
