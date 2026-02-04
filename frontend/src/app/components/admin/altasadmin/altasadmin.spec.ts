import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Altasadmin } from './altasadmin';

describe('Altasadmin', () => {
  let component: Altasadmin;
  let fixture: ComponentFixture<Altasadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Altasadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Altasadmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
