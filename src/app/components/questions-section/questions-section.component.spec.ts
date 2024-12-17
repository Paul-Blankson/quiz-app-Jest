import { TestBed, ComponentFixture } from '@angular/core/testing';
import { QuestionsSectionComponent } from './questions-section.component';
import { SmallCardComponent } from '../small-card/small-card.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

const mockQuizData = {
  quizzes: [
    {
      title: 'HTML',
      questions: [
        {
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'None of the above'],
          answer: 'Hyper Text Markup Language',
        },
        {
          question: 'HTML is what type of language?',
          options: ['Scripting', 'Programming', 'Markup', 'Network'],
          answer: 'Markup',
        },
      ],
    },
  ],
};

describe('QuestionsSectionComponent', () => {
  let component: QuestionsSectionComponent;
  let fixture: ComponentFixture<QuestionsSectionComponent>;
  let quizService: QuizServiceService;

  beforeEach(async () => {
    const mockQuizService = {
      getQuizData: jest.fn(() => of(mockQuizData)),
      getSelectedSubjectTitle: jest.fn(() => 'HTML'),
    };

    await TestBed.configureTestingModule({
      imports: [QuestionsSectionComponent, SmallCardComponent],
      providers: [{ provide: QuizServiceService, useValue: mockQuizService }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsSectionComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizServiceService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should fetch quiz data on init and set questions based on selected title', () => {
      expect(quizService.getQuizData).toHaveBeenCalled();
      expect(quizService.getSelectedSubjectTitle).toHaveBeenCalled();
      expect(component.questions).toEqual(mockQuizData.quizzes[0].questions);
      expect(component.currentIndex).toBe(0);
    });

    it('should set the current question options correctly', () => {
      expect(component.currentQueOptions).toEqual(mockQuizData.quizzes[0].questions[0].options);
    });
  });

  describe('UI Interactions', () => {
    it('should display the current question text', () => {
      const questionElement: DebugElement = fixture.debugElement.query(By.css('.questions-section__question-text'));
      expect(questionElement.nativeElement.textContent.trim()).toBe('What does HTML stand for?');
    });

    it('should update progress bar width dynamically', () => {
      const progressBar: DebugElement = fixture.debugElement.query(By.css('.questions-section__progress-bar'));
      expect(progressBar.styles['width']).toBe('50%');
    });

    it('should render all answer options as SmallCardComponents', () => {
      const answerCards = fixture.debugElement.queryAll(By.css('app-small-card'));
      expect(answerCards.length).toBe(mockQuizData.quizzes[0].questions[0].options.length);
    });
  });

  describe('Answer Selection', () => {
    it('should select an answer and set selectedAnswer property', () => {
      component.selectAnswer('Hyper Text Markup Language');
      expect(component.selectedAnswer).toBe('Hyper Text Markup Language');
    });

    it('should highlight selected answer in UI', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      fixture.detectChanges();

      const selectedLabel = fixture.debugElement.query(By.css('.selected-label'));
      expect(selectedLabel.nativeElement.textContent.trim()).toBe('A');
    });
  });

  describe('Submit Answer', () => {
    it('should set feedback when an answer is submitted', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      component.submitAnswer();

      expect(component.feedback).toEqual({
        isCorrect: true,
        selectedOption: 'Hyper Text Markup Language',
      });
    });

    it('should display correct feedback icon for correct answer', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      component.submitAnswer();
      fixture.detectChanges();

      const correctIcon = fixture.debugElement.query(By.css('.correct-label'));
      expect(correctIcon).toBeTruthy();
    });

    it('should display incorrect feedback icon for wrong answer', () => {
      component.selectedAnswer = 'Home Tool Markup Language';
      component.submitAnswer();
      fixture.detectChanges();

      const incorrectIcon = fixture.debugElement.query(By.css('.incorrect-label'));
      expect(incorrectIcon).toBeTruthy();
    });

    it('should not submit an answer if none is selected', () => {
      jest.spyOn(console, 'warn').mockImplementation(() => {});
      component.submitAnswer();

      expect(console.warn).toHaveBeenCalledWith('No answer selected');
      expect(component.feedback).toBeNull();
    });
  });

  describe('Next Question', () => {
    it('should navigate to the next question and reset selectedAnswer and feedback', () => {
      component.selectedAnswer = 'Hyper Text Markup Language';
      component.submitAnswer();

      component.nextQuestion();

      expect(component.currentIndex).toBe(1);
      expect(component.selectedAnswer).toBeNull();
      expect(component.feedback).toBeNull();
      expect(component.currentQueOptions).toEqual(mockQuizData.quizzes[0].questions[1].options);
    });

    it('should not navigate beyond the last question', () => {
      component.currentIndex = component.questions.length - 1;
      component.nextQuestion();

      expect(component.currentIndex).toBe(component.questions.length - 1);
    });
  });
});
