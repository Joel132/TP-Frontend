import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { ProductoService } from 'src/app/servicios/presentacion/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  crearForm: FormGroup;
  categoriaIDSelected: number;
  lista_categoria: Categoria[];
  lista_subcategoria;
  aceptado = false;
  constructor(private formBuilder : FormBuilder,
    private catSer: CategoriaService, private proSer: ProductoService,
    private router:Router) { }

  ngOnInit() {
    this.inicializarForm();
  }

  inicializarForm(){
    this.crearForm = this.formBuilder.group({
      idPresentacionProducto : [],
      descripcion: ['',[Validators.required]],
      nombre: ['',[Validators.required]],
      idProducto: this.formBuilder.group({
        idTipoProducto: this.formBuilder.group({
          idTipoProducto: ['',Validators.required]
        })
      }),
      codigo: [,[Validators.required]],
      flagServicio: "S",
      existenciaProducto: this.formBuilder.group({
        precioVenta: [,Validators.required]
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

  onCrear(){
    this.aceptado = true;
    if(this.crearForm.invalid){
      return;
    }
    let producto=this.crearForm.value;
    this.proSer.getIdProductoBySub(producto.idProducto.idTipoProducto.idTipoProducto,"").subscribe(id=>{
      producto.idProducto={idProducto:id}
      this.proSer.crearProducto(producto,"")
      .subscribe(response =>{ 
      this.router.navigate(['productos']);
      alertify.notify('Creado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
    })
    
      //TODO: colocar mensaje de exito
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
