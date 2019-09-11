import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSubcategoriaComponent } from './modificar-subcategoria.component';

describe('ModificarSubcategoriaComponent', () => {
  let component: ModificarSubcategoriaComponent;
  let fixture: ComponentFixture<ModificarSubcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarSubcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
