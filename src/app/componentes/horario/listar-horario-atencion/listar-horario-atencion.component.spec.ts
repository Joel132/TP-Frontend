import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHorarioAtencionComponent } from './listar-horario-atencion.component';

describe('ListarHorarioAtencionComponent', () => {
  let component: ListarHorarioAtencionComponent;
  let fixture: ComponentFixture<ListarHorarioAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarHorarioAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHorarioAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
