import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ListarCategoriaComponent } from './componentes/categoria/listar/categoria.component';
import { SubcategoriaComponent } from './componentes/subcategoria/listar/subcategoria.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { ListarComponent } from './componentes/pacientes/listar/listar.component';
import { EliminarComponent } from './componentes/pacientes/eliminar/eliminar.component';
import { CrearComponent } from './componentes/pacientes/crear/crear.component';
import { ModificarComponent } from './componentes/pacientes/modificar/modificar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './componentes/pagination/pagination/pagination.component'
import { CrearCategoriaComponent } from './componentes/categoria/crear/crear-categoria/crear-categoria.component';
import { ModificarCategoriaComponent } from './componentes/categoria/modificar/modificar-categoria/modificar-categoria.component'
import { LoginComponent } from './componentes/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListarCategoriaComponent,
    SubcategoriaComponent,
    PacientesComponent,
    ListarComponent,
    EliminarComponent,
    CrearComponent,
    ModificarComponent,
    PaginationComponent,
    CrearCategoriaComponent,
    ModificarCategoriaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'categoria/crear', component: CrearCategoriaComponent },
      { path: 'categoria/editar/:catId', component: ModificarCategoriaComponent },
      { path: 'categoria', component: ListarCategoriaComponent },
      { path: 'subcategoria', component: SubcategoriaComponent },
      { path: 'pacientes/crear', component: CrearComponent},
      { path: 'pacientes', component: PacientesComponent},
      { path: 'listar',component: ListarComponent},
      { path: 'login', component: LoginComponent}
      //{ path: 'products/:productId', component: ProductDetailsComponent },
    ]),
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [
    { provide: "BASE_API_URL", useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
