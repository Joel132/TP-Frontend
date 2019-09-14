import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {StorageService} from "../session/storage.service";

/**
 * Guard de Autorización
 */

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuardService implements CanActivate {
  constructor(private router: Router,
    private storageService: StorageService) { }

/**
 * Permite el acceso al Scrum Master y al Adminitrador a ciertas rutas.
 */
canActivate() {
    // logeado entonces devuelve true 
    if (this.storageService.isAuthenticated() ) {
      return true;
    }

    // no está logeado entonces redirige a la pagina del login y devuelve false
      else if(!this.storageService.isAuthenticated()){
      this.router.navigate(['/login']);
      return false;
    }
  }

}