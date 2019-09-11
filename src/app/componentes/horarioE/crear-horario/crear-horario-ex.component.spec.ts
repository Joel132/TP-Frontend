import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHorarioExComponent } from './crear-horario-ex.component';

describe('CrearHorarioExComponent', () => {
  let component: CrearHorarioExComponent;
  let fixture: ComponentFixture<CrearHorarioExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearHorarioExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearHorarioExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
