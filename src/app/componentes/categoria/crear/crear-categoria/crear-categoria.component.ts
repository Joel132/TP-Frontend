import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/servicios/categoria/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  crearForm: FormGroup
  constructor(private formBuilder : FormBuilder, private catService : CategoriaService, private router : Router) { }

  ngOnInit() {
    this.crearForm = this.formBuilder.group({
      idCategoria : [],
      descripcion : ['', Validators.required]
    })
  }

  onCrear(){
    this.catService.crearCategoria(this.crearForm.value)
      .subscribe(response =>{ 
      console.log(response);
      this.router.navigate(['categoria']);
    })
  }

}
