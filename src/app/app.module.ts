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
import { ModificarCategoriaComponent } from './componentes/categoria/modificar/modificar-categoria/modificar-categoria.component'
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
      { path: 'categoria/crear', component: CrearCategoriaComponent },
      { path: 'categoria/editar/:catId', component: ModificarCategoriaComponent },
      { path: 'categoria', component: ListarCategoriaComponent },
      { path: 'subcategoria', component: SubcategoriaComponent },
      { path: 'pacientes/crear', component: CrearComponent},
      { path: 'pacientes', component: PacientesComponent},
      { path: 'pacientes/editar/:pacId', component: ModificarComponent},
      { path: 'listar/pacientes',component: PacientesComponent},
      { path: 'login', component: LoginComponent},
      { path: 'horario/crear', component: CrearHorarioComponent },
      { path: 'horario/editar/:horId', component: EditarHorarioComponent },
      { path: 'horarios', component: ListarHorarioAtencionComponent },
      { path: 'horarioE/crear', component: CrearHorarioExComponent },
      { path: 'horarioE/editar/:horId', component: EditarHorarioExComponent },
      { path: 'horariosE', component: ListarHorarioExComponent },
      { path: 'reservas', component: ListarReservaComponent },
      { path: 'reserva/crear', component: CrearReservaComponent },
      { path: 'fichas', component: ListarFichaComponent },
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
