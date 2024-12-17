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

    it('should return correct background color for CSS', () => {
      expect(component.getIconBackgroundColor('CSS')).toBe('#E0FDEF');
    });

    it('should return correct background color for JavaScript', () => {
      expect(component.getIconBackgroundColor('JavaScript')).toBe('#EBF0FF');
    });

    it('should return correct background color for Accessibility', () => {
      expect(component.getIconBackgroundColor('Accessibility')).toBe('#F6E7FF');
    });

    it('should return transparent for unknown subjects', () => {
      expect(component.getIconBackgroundColor('Unknown')).toBe('transparent');
    });
  });

  describe('Component Rendering', () => {
    it('should display the card title correctly', () => {
      component.cardTitle = 'HTML';
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(By.css('.small__card-title'));
      expect(titleElement.nativeElement.textContent).toBe('HTML');
    });

    it('should set background color of icon container dynamically', () => {
      component.cardTitle = 'CSS';
      fixture.detectChanges();

      const iconContainer = fixture.debugElement.query(By.css('.small__card-icon-container'));
      expect(iconContainer.styles['background-color']).toBe('rgb(224, 253, 239)');
    });
  });

  describe('Event Emitter', () => {
    it('should emit when clicked', () => {
      const spy = jest.spyOn(component.clicked, 'emit');

      component.clicked.emit();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Content Projection', () => {
    it('should project content inside the icon container', () => {
      fixture = TestBed.createComponent(SmallCardComponent);
      fixture.componentInstance.cardTitle = 'Test';

      // Create a test host component
      @Component({
        template: `
          <app-small-card cardTitle="Test">
            <span class="test-content">Projected Content</span>
          </app-small-card>
        `
      })
      class TestHostComponent {}

      TestBed.overrideComponent(SmallCardComponent, {
        add: {
          imports: []
        }
      });

      TestBed.configureTestingModule({
        imports: [SmallCardComponent],
        declarations: [TestHostComponent]
      }).compileComponents();

      const hostFixture = TestBed.createComponent(TestHostComponent);
      hostFixture.detectChanges();

      const projectedContent = hostFixture.debugElement.query(By.css('.test-content'));
      expect(projectedContent).toBeTruthy();
      expect(projectedContent.nativeElement.textContent).toBe('Projected Content');
    });
  });
});
