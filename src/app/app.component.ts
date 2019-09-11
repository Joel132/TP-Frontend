import { Component } from '@angular/core';
import { StorageService } from './servicios/session/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tpFrontend';

  constructor(private storageService: StorageService){}
}
