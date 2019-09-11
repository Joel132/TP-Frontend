import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ListarCategoriaComponent } from './componentes/categoria/listar/categoria.component';
import { SubcategoriaComponent } from './componentes/subcategoria/listar/subcategoria.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import { PacientesComponent } from './componentes/pacientes/listar/pacientes.component';
import { EliminarComponent } from './componentes/pacientes/eliminar/eliminar.component';
import { CrearComponent } from './componentes/pacientes/crear/crear.component';
import { ModificarComponent } from './componentes/pacientes/modificar/modificar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './componentes/pagination/pagination/pagination.component'
import { CrearCategoriaComponent } from './componentes/categoria/crear/crear-categoria/crear-categoria.component';
import { ModificarCategoriaComponent } from './componentes/categoria/modificar/modificar-categoria/modificar-categoria.component';
import { ModificarSubcategoriaComponent } from './componentes/subcategoria/modificar/modificar-subcategoria/modificar-subcategoria.component'
import { LoginComponent } from './componentes/login/login.component'
import { ListarHorarioAtencionComponent } from './componentes/horario/listar-horario-atencion/listar-horario-atencion.component';
import { CrearHorarioComponent } from './componentes/horario/crear-horario/crear-horario.component';
import { BuscarPacienteComponent } from './componentes/pacientes/buscar-paciente/buscar-paciente.component';
import { ModalModule } from './_modal';
import { BuscarDoctorComponent } from './componentes/doctor/buscar-doctor/buscar-doctor.component';
import { EditarHorarioComponent } from './componentes/horario/editar-horario/editar-horario.component';
import { CrearHorarioExComponent } from './componentes/horarioE/crear-horario/crear-horario-ex.component';
import { ListarHorarioExComponent } from './componentes/horarioE/listar-horario-ex/listar-horario-ex.component';
import { EditarHorarioExComponent } from './componentes/horarioE/editar-horario/editar-horario-ex.component';
import { ListarReservaComponent } from './componentes/reserva/listado/listar-reserva.component';
import { CrearReservaComponent } from './componentes/reserva/crear/crear-reserva.component';
import { ListarFichaComponent } from './componentes/ficha/listado/listar-ficha.component';
import { AuthorizatedGuardService } from './servicios/guard/authorizated-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListarCategoriaComponent,
    SubcategoriaComponent,
    PacientesComponent,
    EliminarComponent,
    CrearComponent,
    ModificarComponent,
    PaginationComponent,
    CrearCategoriaComponent,
    ModificarCategoriaComponent,
    ModificarSubcategoriaComponent,
    LoginComponent,
    ListarHorarioAtencionComponent,
    CrearHorarioComponent,
    BuscarPacienteComponent,
    BuscarDoctorComponent,
    EditarHorarioComponent,
    CrearHorarioExComponent,
    EditarHorarioComponent,
    ListarHorarioExComponent,
    EditarHorarioExComponent, 
    ListarReservaComponent,
    CrearReservaComponent,
    ListarFichaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/reservas', pathMatch: 'full' },
      { path: 'categoria/crear', component: CrearCategoriaComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'categoria/editar/:catId', component: ModificarCategoriaComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'categoria', component: ListarCategoriaComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'subcategoria/editar/:subcatId', component: ModificarSubcategoriaComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'subcategoria', component: SubcategoriaComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'pacientes/crear', component: CrearComponent, canActivate:[AuthorizatedGuardService]},
      { path: 'pacientes', component: PacientesComponent, canActivate:[AuthorizatedGuardService]},
      { path: 'pacientes/editar/:pacId', component: ModificarComponent, canActivate:[AuthorizatedGuardService]},
      { path: 'listar/pacientes',component: PacientesComponent, canActivate:[AuthorizatedGuardService]},
      { path: 'login', component: LoginComponent},
      { path: 'horario/crear', component: CrearHorarioComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'horario/editar/:horId', component: EditarHorarioComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'horarios', component: ListarHorarioAtencionComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'horarioE/crear', component: CrearHorarioExComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'horarioE/editar/:horId', component: EditarHorarioExComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'horariosE', component: ListarHorarioExComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'reservas', component: ListarReservaComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'reserva/crear', component: CrearReservaComponent, canActivate:[AuthorizatedGuardService] },
      { path: 'fichas', component: ListarFichaComponent, canActivate:[AuthorizatedGuardService] }
      //{ path: 'products/:productId', component: ProductDetailsComponent },
    ]),
    HttpClientModule, 
    ReactiveFormsModule,
    ModalModule
  ],
  providers: [
    { provide: "BASE_API_URL", useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
