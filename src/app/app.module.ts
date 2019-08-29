import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ListarCategoriaComponent } from './componentes/categoria/listar/categoria.component';
import { SubcategoriaComponent } from './componentes/subcategoria/listar/subcategoria.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { PaginationComponent } from './componentes/pagination/pagination/pagination.component'
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListarCategoriaComponent,
    SubcategoriaComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'categoria', component: ListarCategoriaComponent },
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
