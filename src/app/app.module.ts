import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SubcategoriaComponent } from './subcategoria/subcategoria.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment'
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CategoriaComponent,
    SubcategoriaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'categoria', component: CategoriaComponent },
      { path: 'subcategoria', component: SubcategoriaComponent },
      //{ path: 'products/:productId', component: ProductDetailsComponent },
    ]),
    HttpClientModule
  ],
  providers: [
    { provide: "BASE_API_URL", useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
