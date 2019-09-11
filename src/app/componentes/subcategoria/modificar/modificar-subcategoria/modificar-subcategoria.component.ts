import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubcategoriaService } from 'src/app/servicios/subcategoria/subcategoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subcategoria } from 'src/app/modelos/subcategoria';


@Component({
  selector: 'app-modificar-subcategoria',
  templateUrl: './modificar-subcategoria.component.html',
  styleUrls: ['./modificar-subcategoria.component.css']
})
export class ModificarSubcategoriaComponent implements OnInit {
subcategoriaOriginal: Subcategoria;
  modificarForm: FormGroup
  constructor(private formBuilder : FormBuilder, private subcatService : SubcategoriaService, private router : Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subcatService.getSubcategoria(+params.get('subcatId')).subscribe((response)=>{
        this.subcategoriaOriginal=response
        this.llenarForm();
      });
    });
    
  }

  private llenarForm(): void{
    this.modificarForm = this.formBuilder.group({
      idTipoProducto : [this.subcategoriaOriginal.idTipoProducto],
      descripcion : [this.subcategoriaOriginal.descripcion, Validators.required],
      flagVisible : 'S',
      posicion: 1 ,
      idCategoria: {idCategoria: this.subcategoriaOriginal.idCategoria.idCategoria}
    })
  }

  onModificar(){
    this.subcatService.editarSubcategoria(this.modificarForm.value)
      .subscribe(response =>{ 
      console.log(response);
      this.router.navigate(['subcategoria']);
    })
  }

}
