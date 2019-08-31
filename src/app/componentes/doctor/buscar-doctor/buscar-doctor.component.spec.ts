import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDoctorComponent } from './buscar-doctor.component';

describe('BuscarDoctorComponent', () => {
  let component: BuscarDoctorComponent;
  let fixture: ComponentFixture<BuscarDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
