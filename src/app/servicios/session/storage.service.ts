import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public usuario:string=null;
  constructor() { }

  public isAuthenticated(): boolean{
    return this.usuario!=null;
  }

  public login(username: string): void{
    this.usuario=username;
  }

  public logout(): void{
    this.usuario=null;
  }
}
