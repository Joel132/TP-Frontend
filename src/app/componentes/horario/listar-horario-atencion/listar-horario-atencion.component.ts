import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/modelos/doctor';
import { HorarioService } from 'src/app/servicios/horario/horario.service';
import { Horario } from 'src/app/modelos/horario';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';

@Component({
  selector: 'app-listar-horario-atencion',
  templateUrl: './listar-horario-atencion.component.html',
  styleUrls: ['./listar-horario-atencion.component.css']
})
export class ListarHorarioAtencionComponent implements OnInit {
  dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  empleados: Doctor[];
  lista_horario: Horario[];
  total=0;
  limite=8;
  pagina_actual=1;
  loading = false;
  private service;
  orderBy="dia";
  diaSelected=-1;
  doctorSelected=-1;
  constructor(private horServ: HorarioService, private router : Router, private modalService: ModalService) { }

  ngOnInit() {
    this.buscar();
  }
  
  buscar(){
    this.loading = true;
    let ejemplo={};
    if(this.diaSelected>=0&&this.doctorSelected>=0){
      ejemplo={dia:this.diaSelected, idEmpleado:{idPersona:this.doctorSelected}}
    }
    else{
      if(this.diaSelected>=0){
        ejemplo={dia:this.diaSelected}
      }
      if(this.doctorSelected>=0){
        ejemplo={idEmpleado:{idPersona:this.doctorSelected}}
      }
    }
    let inicio=(this.pagina_actual-1)*this.limite;
    
    this.service=this.horServ.getHorarios(String(inicio),String(this.limite),this.orderBy,'asc',ejemplo).subscribe(
      (response)=>{
        this.lista_horario=response.lista;
        this.total=response.totalDatos;
        this.loading = false;
      });
  }

  buscarPorDia(dia:number){
    this.diaSelected=dia;
    this.buscar();
  }

  buscarPorDoctor(id:number){
    this.doctorSelected=id;
    this.buscar();
  }

  goToPage(n: number ): void {
    this.pagina_actual = n;
    this.buscar();
  }

  onNext(): void {
    this.pagina_actual++;
    this.buscar();
  }

  onPrev( ): void {
    this.pagina_actual--;
    this.buscar();
  }

  eliminar(id: number){
    this.horServ.eliminarHorario(id).subscribe(
      (response)=>{
        this.buscar();
      }
    )
  }

  agregar(): void{
    this.router.navigate(['horario/crear']);
  }

  verE(): void{
    this.router.navigate(['horariosE']);
  }

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
