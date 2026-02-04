import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productosmain } from './productosmain';

describe('Productosmain', () => {
  let component: Productosmain;
  let fixture: ComponentFixture<Productosmain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productosmain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productosmain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
