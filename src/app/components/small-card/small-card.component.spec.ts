import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmallCardComponent } from './small-card.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('SmallCardComponent', () => {
  let component: SmallCardComponent;
  let fixture: ComponentFixture<SmallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getIconBackgroundColor', () => {
    it('should return correct background color for HTML', () => {
      expect(component.getIconBackgroundColor('HTML')).toBe('#FFF1E9');
    });
  });

});
