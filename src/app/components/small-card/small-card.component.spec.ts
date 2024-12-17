import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmallCardComponent } from './small-card.component';
import { By } from '@angular/platform-browser';
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

  describe('Additional Input Properties', () => {
    it('should apply selected class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const cardElement = fixture.debugElement.query(By.css('.small__card'));
      expect(cardElement.classes['small__card--selected']).toBeTruthy();
    });

    it('should show correct icon when showIcon is true and iconType is correct', () => {
      component.showIcon = true;
      component.iconType = 'correct';
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('.answer__icon'));
      expect(iconElement).toBeTruthy();
      expect(iconElement.nativeElement.src).toContain('images/icon-correct.svg');
    });

    it('should show incorrect icon when showIcon is true and iconType is incorrect', () => {
      component.showIcon = true;
      component.iconType = 'incorrect';
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('.answer__icon'));
      expect(iconElement).toBeTruthy();
      expect(iconElement.nativeElement.src).toContain('images/icon-incorrect.svg');
    });

    it('should not show icon when showIcon is false', () => {
      component.showIcon = false;
      component.iconType = 'correct';
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('.answer__icon'));
      expect(iconElement).toBeNull();
    });

    it('should apply selected icon container class when isSelected is true', () => {
      component.isSelected = true;
      fixture.detectChanges();

      const iconContainer = fixture.debugElement.query(By.css('.small__card-icon-container'));
      expect(iconContainer.classes['selected-icon-container']).toBeTruthy();
    });
  });

  describe('onCardClick Method', () => {
    it('should emit clicked event with card title when clicked', () => {
      const emitSpy = jest.spyOn(component.clicked, 'emit');
      component.cardTitle = 'Test Title';

      component.onCardClick();

      expect(emitSpy).toHaveBeenCalledWith('Test Title');
    });

    it('should trigger onCardClick when card is clicked', () => {
      const onCardClickSpy = jest.spyOn(component, 'onCardClick');
      const cardElement = fixture.debugElement.query(By.css('.small__card'));

      cardElement.triggerEventHandler('click', null);

      expect(onCardClickSpy).toHaveBeenCalled();
    });
  });
});
