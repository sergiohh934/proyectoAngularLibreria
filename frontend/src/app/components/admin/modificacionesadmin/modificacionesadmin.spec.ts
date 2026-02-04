import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modificacionesadmin } from './modificacionesadmin';

describe('Modificacionesadmin', () => {
  let component: Modificacionesadmin;
  let fixture: ComponentFixture<Modificacionesadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modificacionesadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modificacionesadmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
