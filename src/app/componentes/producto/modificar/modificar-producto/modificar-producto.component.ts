import * as alertify from 'alertifyjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Categoria } from 'src/app/modelos/categoria';
import { ProductoService } from 'src/app/servicios/presentacion/producto.service';
import { Presentacion } from 'src/app/modelos/presentacion';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {
  editarForm: FormGroup;
  categoriaIDSelected: number;
  lista_categoria: Categoria[];
  lista_subcategoria;
  aceptado = false;
  productoOriginal: Presentacion;
  precioOriginal;
  constructor(private formBuilder : FormBuilder,
    private catSer: CategoriaService, private proSer: ProductoService,
    private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.proSer.getPresentacion(+params.get('proId')).subscribe((response)=>{
        this.productoOriginal=response
        this.proSer.getPrecioPresentacion(this.productoOriginal.idPresentacionProducto,"").subscribe(data=>{
          this.precioOriginal=data;
          this.llenarForm();
        });
        
      });
    });
    
    
  }

  llenarForm(){

    this.editarForm = this.formBuilder.group({
      idPresentacionProducto : [this.productoOriginal.idPresentacionProducto],
      descripcion: [this.productoOriginal.descripcion],
      nombre: [this.productoOriginal.nombre,[Validators.required]],
      idProducto: this.formBuilder.group({
        idTipoProducto: this.formBuilder.group({
          idTipoProducto: [this.productoOriginal.idProducto.idTipoProducto.idTipoProducto,Validators.required]
        })
      }),
      codigo: [this.productoOriginal.codigo,[Validators.required]],
      flagServicio: this.productoOriginal.flagServicio,
      existenciaProducto: this.formBuilder.group({
        precioVenta: [this.precioOriginal,Validators.required]
      })
    })
    this.cargarCategorias();
    this.categoriaIDSelected=this.productoOriginal.idProducto.idTipoProducto.idCategoria.idCategoria.valueOf();
    this.cargarSubcategorias();
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

  onEditar(){
    this.aceptado = true;
    if(this.editarForm.invalid){
      return;
    }
    let producto=this.editarForm.value;
    this.proSer.getIdProductoBySub(producto.idProducto.idTipoProducto.idTipoProducto,"").subscribe(id=>{
      producto.idProducto={idProducto:id}
      this.proSer.modificarPresentacion(producto,"")
      .subscribe(response =>{ 
      this.router.navigate(['productos']);
      alertify.notify('Modificado Correctamente!', 'success', 5, function(){  console.log('dismissed'); });
    },
    error=>{
      alertify.notify('Ha ocurrido un error!', 'error', 5, function(){  console.log('dismissed'); });
    }
  )
    
      //TODO: colocar mensaje de exito
    })
    
    
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
