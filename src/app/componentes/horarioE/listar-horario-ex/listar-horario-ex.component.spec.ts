import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHorarioExComponent } from './listar-horario-ex.component';

describe('ListarHorarioExComponent', () => {
  let component: ListarHorarioExComponent;
  let fixture: ComponentFixture<ListarHorarioExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarHorarioExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHorarioExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
