/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddassociateComponent } from './addassociate.component';

describe('AddassociateComponent', () => {
  let component: AddassociateComponent;
  let fixture: ComponentFixture<AddassociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddassociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddassociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
