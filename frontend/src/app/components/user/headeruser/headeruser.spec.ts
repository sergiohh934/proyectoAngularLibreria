import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headeruser } from './headeruser';

describe('Headeruser', () => {
  let component: Headeruser;
  let fixture: ComponentFixture<Headeruser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headeruser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headeruser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
