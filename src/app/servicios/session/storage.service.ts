import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  
  private localStorageService;
  private usuario : string = null;

  constructor() {
    this.localStorageService = localStorage;
    this.usuario = this.loadSessionData();
  }

  /**
   * Método setCurrentSession
   * Asigna la sesión actual.
   * 
   * @param session {Session} La sesión actual
   */
  login(session: string): void {
    this.usuario = session;
    this.localStorageService.setItem('currentUser', session);
  }

  /**
   * Método loadSessionData
   * 
   * Retorna la sesión a partir del JSON
   * @return {Session}
   */
  loadSessionData(): string{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return sessionStr;
  }

  /**
   * Método getCurrentSession.
   * 
   * @return {Session}.
   */
  getCurrentSession(): string {
    return this.usuario;
  }

  /**
   * Método removeCurrentSession.
   * 
   * Elimina la sesión (JSON) del localStorageService
   * y el objeto Session.
   */
  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.usuario = null;
  }

 


  /**
   * Método isAuthenticated.
   * 
   * Verifica si la sesión está autorizada.
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return this.getCurrentSession() != null;
  };


  /**
   * Método logout
   * 
   * Elimina la sesión y redirecciona a /login
   */
  logout(): void{
    this.removeCurrentSession();
    
  }
}
