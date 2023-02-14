import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Firberhome2Component } from './firberhome2.component';

describe('Firberhome2Component', () => {
  let component: Firberhome2Component;
  let fixture: ComponentFixture<Firberhome2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Firberhome2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Firberhome2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
