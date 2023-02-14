import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuComponent } from './simu.component';

describe('SimuComponent', () => {
  let component: SimuComponent;
  let fixture: ComponentFixture<SimuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
