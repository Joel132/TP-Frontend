import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/modelos/reserva';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {noSeleccionadoValidator} from 'src/app/otros/funciones';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from 'src/app/servicios/turnos/reserva.service';
import { Paciente } from 'src/app/modelos/paciente';
import { Doctor } from 'src/app/modelos/doctor';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { ModalService } from 'src/app/_modal';
import { FichaClinicaService } from 'src/app/servicios/ficha/ficha-clinica.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-crear-ficha',
  templateUrl: './crear-ficha.component.html',
  styleUrls: ['./crear-ficha.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class CrearFichaComponent implements OnInit {
  crearForm: FormGroup;
  categoriaIDSelected: number;
  lista_categoria: Categoria[];
  lista_subcategoria;
  doctorSelected:Doctor;
  pacienteSelected:Paciente;
  aceptado = false;
  constructor(private location: Location,private formBuilder : FormBuilder, private route: ActivatedRoute, private reservaService: ReservaService,
    private catSer: CategoriaService, private modalService:ModalService, private fichaService: FichaClinicaService,
    private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id=+params.get('resId');
      if(id){//Si hay id en la url entonces hay una reserva en la cual la ficha se basa
        this.reservaService.getReserva(id).subscribe((response)=>{
          if(!response.flagAsistio&&response){
            response.flagAsistio='S';
            let reserva = {idReserva:response.idReserva,flagAsistio:response.flagAsistio}
            this.reservaService.modificarReserva(reserva,'').subscribe((data)=>{},(error)=>{
              if(error.status==500)console.log("reserva no se puede modificar");

            });
          }
          let paciente=this.pacienteSelected=response.idCliente;
          let doctor=this.doctorSelected=response.idEmpleado;
          this.inicializarForm(paciente, doctor);
        })
      }
      else{//Si no se crea el form sin nada precargado
        this.inicializarForm();
      }
    })
  }

  inicializarForm(paciente?: Paciente, doctor?: Doctor){
    let idDoctor=doctor?doctor.idPersona:'';
    let idPaciente=paciente?paciente.idPersona:'';
    this.crearForm = this.formBuilder.group({
      idFichaClinica : [],
      idEmpleado : [{idPersona:idDoctor}, noSeleccionadoValidator()],
      idCliente : [{idPersona:idPaciente}, noSeleccionadoValidator()],
      motivoConsulta: ['',[Validators.required]],
      diagnostico: ['',[Validators.required]],
      observacion: '',
      idTipoProducto: this.formBuilder.group({
        idTipoProducto: ['',Validators.required]
      })
    })
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.catSer.getCategorias('0','0','descripcion','asc',null).subscribe(
      (response)=>{
        this.lista_categoria=response.lista;
      }
    )
  }

  selectCategoria(id: number){
    this.categoriaIDSelected=id;
    this.cargarSubcategorias();
  }

  cargarSubcategorias(){
    this.catSer.getSubcategorias(this.categoriaIDSelected).subscribe(
      (response)=>{
        this.lista_subcategoria=response.lista;
      }
    )
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  asignarDoctor(doctor){
    let idDoctor=doctor.idPersona;
    this.crearForm.patchValue({
      idEmpleado:{idPersona:doctor.idPersona}
    })
    this.doctorSelected=doctor;
  }

  asignarPaciente(paciente){
    this.crearForm.patchValue({
      idCliente:{idPersona:paciente.idPersona}
    })
    this.pacienteSelected=paciente;
  }

  onCrear(){
    this.aceptado = true;
    if(this.crearForm.invalid){
      return;
    }
    let ficha=this.crearForm.value;
    this.fichaService.cargarFicha(ficha,"")
      .subscribe(response =>{ 
      this.router.navigate(['fichas']);
      //TODO: colocar mensaje de exito
    })
    
    
  }

  onCancelar(){
    this.aceptado = false;
    this.crearForm.reset();
    this.doctorSelected=null;
    this.pacienteSelected=null;
    this.location.back();
  }

  get val(){
    return this.crearForm.controls;
  }
  

}
