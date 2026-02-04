import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footeruser } from './footeruser';

describe('Footeruser', () => {
  let component: Footeruser;
  let fixture: ComponentFixture<Footeruser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footeruser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footeruser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
