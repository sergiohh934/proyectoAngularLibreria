import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headeradmin } from './headeradmin';

describe('Headeradmin', () => {
  let component: Headeradmin;
  let fixture: ComponentFixture<Headeradmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headeradmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headeradmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
