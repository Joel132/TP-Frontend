import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/modelos/categoria';


@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrls: ['./modificar-categoria.component.css']
})
export class ModificarCategoriaComponent implements OnInit {
  categoriaOriginal: Categoria;
  modificarForm: FormGroup
  constructor(private formBuilder : FormBuilder, private catService : CategoriaService, private router : Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.catService.getCategoria(+params.get('catId')).subscribe((response)=>{
        this.categoriaOriginal=response
        this.llenarForm();
      });
    });
    
  }

  private llenarForm(): void{
    this.modificarForm = this.formBuilder.group({
      idCategoria : [this.categoriaOriginal.idCategoria],
      descripcion : [this.categoriaOriginal.descripcion, Validators.required],
      flagVisible : 'S',
      posicion: 1
    })
  }

  onModificar(){
    this.catService.editarCategoria(this.modificarForm.value)
      .subscribe(response =>{ 
      console.log(response);
      this.router.navigate(['categoria']);
    })
  }

}
