import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mostrarproductos } from './mostrarproductos';

describe('Mostrarproductos', () => {
  let component: Mostrarproductos;
  let fixture: ComponentFixture<Mostrarproductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mostrarproductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mostrarproductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
