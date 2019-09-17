import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { ProductoService } from 'src/app/servicios/presentacion/producto.service';
import { Presentacion } from 'src/app/modelos/presentacion';
import { SubCategoriaService } from 'src/app/servicios/subcategoria/subcategoria.service';
import { SubCategoria } from 'src/app/modelos/subcategoria';

@Component({
  selector: 'app-modificar-subcategoria',
  templateUrl: './modificar-subcategoria.component.html',
  styleUrls: ['./modificar-subcategoria.component.css']
})
export class ModificarSubCategoriaComponent implements OnInit {
  editarForm: FormGroup;
  lista_categoria: Categoria[];
  
  aceptado = false;
  subcategoriaOriginal: SubCategoria;
  constructor(private formBuilder : FormBuilder,
    private catSer: CategoriaService, private subSer: SubCategoriaService,
    private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subSer.getSubCategoria(+params.get('subId')).subscribe((response)=>{
        this.subcategoriaOriginal=response
        this.llenarForm();
      });
    });
    
    
  }

  llenarForm(){

    this.editarForm = this.formBuilder.group({
      idTipoProducto : [this.subcategoriaOriginal.idTipoProducto],
      descripcion: [this.subcategoriaOriginal.descripcion,[Validators.required]],
      idCategoria: this.formBuilder.group({
        idCategoria: [this.subcategoriaOriginal.idCategoria.idCategoria,[Validators.required,Validators.min(0)]]
      }),
      flagVisible: this.subcategoriaOriginal.flagVisible,
      posicion: this.subcategoriaOriginal.posicion,
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

  

  

  onEditar(){
    this.aceptado = true;
    if(this.editarForm.invalid){
      return;
    }
    let subcategoria=this.editarForm.value;
    

      this.subSer.editarSubCategoria(subcategoria)
      .subscribe(response =>{ 
      this.router.navigate(['subcategorias']);
      alertify.notify('Modificado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
    },
    error=>{
      alertify.notify('Ha ocurrido un error!', 'error', 5, function(){  console.log('dismissed'); });
    }
  )
    
      //TODO: colocar mensaje de exito
    
    
    
  }

  onCancelar(){
    this.aceptado = false;
    this.llenarForm();
    return;
  }

  get val(){
    return this.editarForm.controls;
  }
  

}
