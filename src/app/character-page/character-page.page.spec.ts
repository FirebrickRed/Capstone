import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPagePage } from './character-page.page';

describe('CharacterPagePage', () => {
  let component: CharacterPagePage;
  let fixture: ComponentFixture<CharacterPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
