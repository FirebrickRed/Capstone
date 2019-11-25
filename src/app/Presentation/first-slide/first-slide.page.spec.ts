import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSlidePage } from './first-slide.page';

describe('FirstSlidePage', () => {
  let component: FirstSlidePage;
  let fixture: ComponentFixture<FirstSlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstSlidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
