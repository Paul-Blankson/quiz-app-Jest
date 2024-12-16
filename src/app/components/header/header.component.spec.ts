import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockQuizService: jest.Mocked<QuizServiceService>;

  beforeEach(async () => {
    // Mocking QuizServiceService
    mockQuizService = {
      getIsFirstPage: jest.fn(),
      getSelectedSubjectTitle: jest.fn(),
    } as unknown as jest.Mocked<QuizServiceService>;

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [{ provide: QuizServiceService, useValue: mockQuizService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Default mock behavior
    mockQuizService.getIsFirstPage.mockReturnValue(new BehaviorSubject(true));
    mockQuizService.getSelectedSubjectTitle.mockReturnValue('HTML');
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize `isFirstPage` from QuizService', () => {
    const isFirstPageSubject = new BehaviorSubject(false);
    mockQuizService.getIsFirstPage.mockReturnValue(isFirstPageSubject);

    fixture.detectChanges();

    expect(component.isFirstPage).toBe(false);
  });

  it('should initialize the theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    fixture.detectChanges();

    expect(component.isDarkTheme).toBe(true);
  });

  it('should toggle theme correctly', () => {
    jest.spyOn(component, 'applyTheme');
    component.isDarkTheme = false;

    component.toggleTheme();

    expect(component.isDarkTheme).toBe(true);
    expect(component.applyTheme).toHaveBeenCalled();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should apply dark theme class when `applyTheme` is called', () => {
    component.isDarkTheme = true;

    component.applyTheme();

    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);

    component.isDarkTheme = false;
    component.applyTheme();

    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('should get correct header icon and background based on the selected subject', () => {
    mockQuizService.getSelectedSubjectTitle.mockReturnValue('CSS');
    expect(component.getHeaderIcon()).toBe('images/icon-css.svg');
    expect(component.getHeaderIconBackground()).toBe('#E0FDEF');

    mockQuizService.getSelectedSubjectTitle.mockReturnValue('JavaScript');
    expect(component.getHeaderIcon()).toBe('images/icon-js.svg');
    expect(component.getHeaderIconBackground()).toBe('#EBF0FF');
  });

  it('should hide logo container when `isFirstPage` is true', () => {
    component.isFirstPage = true;
    fixture.detectChanges();

    const logoContainer = fixture.debugElement.query(By.css('.header__logo-container'));
    expect(logoContainer.styles['display']).toBe('none');

    component.isFirstPage = false;
    fixture.detectChanges();

    expect(logoContainer.styles['display']).toBe('flex');
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component['subscriptions'], 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should toggle the checkbox correctly for theme switching', () => {
    component.isDarkTheme = true;
    fixture.detectChanges();

    const themeCheckbox = fixture.debugElement.query(By.css('#themeToggle')).nativeElement;
    expect(themeCheckbox.checked).toBe(true);

    component.isDarkTheme = false;
    fixture.detectChanges();

    expect(themeCheckbox.checked).toBe(false);
  });
});
