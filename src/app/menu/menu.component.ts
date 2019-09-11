import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../servicios/session/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  public logout(){
    this.storageService.logout();
    this.router.navigate(['/login']);
  }

}
