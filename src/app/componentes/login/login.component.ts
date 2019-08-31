import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin : boolean;
  loginUser : FormGroup;
  constructor(private servi: LoginService , private formB: FormBuilder ) { }

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
        }
     })
  }
}
