import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Asidecarrito } from './asidecarrito';

describe('Asidecarrito', () => {
  let component: Asidecarrito;
  let fixture: ComponentFixture<Asidecarrito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Asidecarrito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Asidecarrito);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
