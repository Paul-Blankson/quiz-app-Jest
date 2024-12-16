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

  
});
