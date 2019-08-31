import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/modelos/doctor';
import { HorarioService } from 'src/app/servicios/horario/horario.service';
import { Horario } from 'src/app/modelos/horario';

@Component({
  selector: 'app-listar-horario-atencion',
  templateUrl: './listar-horario-atencion.component.html',
  styleUrls: ['./listar-horario-atencion.component.css']
})
export class ListarHorarioAtencionComponent implements OnInit {
  dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  empleado: Doctor[];
  lista_horario: Horario[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="dia";
  constructor(private horServ: HorarioService) { }

  ngOnInit() {
    this.buscar(null);
  }

  buscar(ejemplo){
    this.loading = true;
    this.service=this.horServ.getHorarios('0',String(this.limite),this.orderBy,'asc',ejemplo).subscribe(
      (response)=>{
        this.lista_horario=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscarPorDia(dia:number){
    if(dia<0){//Sin filtro por dia
      this.buscar(null);
    }
    else{//Filtro por dia
      let ejemplo = {dia:dia};
      console.log(ejemplo)
      this.buscar(ejemplo);
    }
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

}
