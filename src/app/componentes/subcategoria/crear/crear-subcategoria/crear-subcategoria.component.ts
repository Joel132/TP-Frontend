import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { SubCategoriaService } from 'src/app/servicios/subcategoria/subcategoria.service';

@Component({
  selector: 'app-crear-subcategoria',
  templateUrl: './crear-subcategoria.component.html',
  styleUrls: ['./crear-subcategoria.component.css']
})
export class CrearSubCategoriaComponent implements OnInit {
  crearForm: FormGroup;
  categoriaIDSelected: number;
  lista_categoria: Categoria[];
  aceptado = false;
  constructor(private formBuilder : FormBuilder,
    private catSer: CategoriaService, private subSer: SubCategoriaService,
    private router:Router) { }

  ngOnInit() {
    this.inicializarForm();
  }

  inicializarForm(){
    this.crearForm = this.formBuilder.group({
      idTipoProducto : [],
      descripcion: ['',[Validators.required]],
      idCategoria: this.formBuilder.group({
        idCategoria: ['-1',[Validators.required,Validators.min(0)]]
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


  onCrear(){
    this.aceptado = true;
    if(this.crearForm.invalid){
      return;
    }
    let subcategoria=this.crearForm.value;
    
      
      this.subSer.crearSubCategoria(subcategoria)
      .subscribe(response =>{ 
      this.router.navigate(['subcategorias']);
      alertify.notify('Creado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
    },
    error=>{
      alertify.notify('Ha ocurrido un error!', 'error', 5, function(){  console.log('dismissed'); });
    }
  )
    
      //TODO: colocar mensaje de exito
    
    
    
  }

  onCancelar(){
    this.aceptado = false;
    this.crearForm.reset();
  }

  get val(){
    return this.crearForm.controls;
  }
  

}
