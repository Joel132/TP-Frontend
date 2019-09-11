import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login/login.service';
import { StorageService } from 'src/app/servicios/session/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin : boolean;
  loginUser : FormGroup;
  constructor(private servi: LoginService , private formB: FormBuilder, private storageService: StorageService, private router: Router ) { }

  ngOnInit() {
    this.loginUser = this.formB.group({
      nombre : ['',Validators.required]
    })
  }

  login(nombre: string){
     this.servi.getUsuarios({usuarioLogin:nombre}).subscribe(data =>{
        if ( data.totalDatos == 0 )
        {
          this.invalidLogin = true;
        }
        else
        {
          this.invalidLogin = false;
          this.storageService.login(this.loginUser.value.nombre);
          this.router.navigate(['/']);
        }
     })
  }
}
