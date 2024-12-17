import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainContentComponent } from './main-content.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { of, throwError } from 'rxjs';
import { QuizData } from '../../types';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;
  let mockQuizService: jest.Mocked<QuizServiceService>;

  const mockQuizData: { quizzes: QuizData[] } = {
    quizzes: [
      {
        title: 'HTML',
        icon: 'html-icon',
        questions: [
          {
            question: 'What does HTML stand for?',
            options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'],
            answer: 'Hyper Text Markup Language'
          }
        ]
      },
      {
        title: 'CSS',
        icon: 'css-icon',
        questions: [
          {
            question: 'What does CSS stand for?',
            options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
            answer: 'Cascading Style Sheets'
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    mockQuizService = {
      getQuizData: jest.fn(),
      setSelectedSubjectTitle: jest.fn(),
      setIsFirstPage: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [MainContentComponent],
      providers: [
        { provide: QuizServiceService, useValue: mockQuizService }
      ]
    });

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch quiz data successfully', () => {
      // Arrange
      mockQuizService.getQuizData.mockReturnValue(of(mockQuizData));

      // Act
      fixture.detectChanges();

      // Assert
      expect(mockQuizService.getQuizData).toHaveBeenCalled();
      expect(component.cards).toEqual(mockQuizData.quizzes);
      expect(component.cards.length).toBe(2);
    });

    it('should handle error when fetching quiz data', () => {
      // Arrange
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const errorResponse = new Error('Failed to fetch data');
      mockQuizService.getQuizData.mockReturnValue(throwError(() => errorResponse));

      // Act
      fixture.detectChanges();

      // Assert
      expect(mockQuizService.getQuizData).toHaveBeenCalled();
      expect(component.cards.length).toBe(0);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching quiz data:', errorResponse);

      consoleErrorSpy.mockRestore();
    });
  });

  describe('onCardClick', () => {
    it('should update quiz service and component state when a card is clicked', () => {
      // Arrange
      const testTitle = 'HTML';

      // Act
      component.onCardClick(testTitle);

      // Assert
      expect(mockQuizService.setSelectedSubjectTitle).toHaveBeenCalledWith(testTitle);
      expect(mockQuizService.setIsFirstPage).toHaveBeenCalledWith(false);
      expect(component.isQuestionSection).toBe(true);
    });

    it('should handle different subject titles', () => {
      // Arrange
      const testTitles = ['CSS', 'JavaScript', 'React'];

      // Act & Assert
      testTitles.forEach(title => {
        component.onCardClick(title);

        expect(mockQuizService.setSelectedSubjectTitle).toHaveBeenCalledWith(title);
        expect(mockQuizService.setIsFirstPage).toHaveBeenCalledWith(false);
        expect(component.isQuestionSection).toBe(true);
      });
    });
  });
});
