import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Asidecategorias } from './asidecategorias';

describe('Asidecategorias', () => {
  let component: Asidecategorias;
  let fixture: ComponentFixture<Asidecategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Asidecategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Asidecategorias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
