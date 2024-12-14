import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { QuizServiceService } from './quiz-service.service';
import * as quizData from '../../../public/data/data.json';
import { QuizData } from '../types';

describe('QuizServiceService', () => {
  let service: QuizServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuizServiceService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(QuizServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get selected subject title', () => {
    const title = 'HTML';
    service.setSelectedSubjectTitle(title);
    expect(service.getSelectedSubjectTitle()).toBe(title);
  });

  it('should set and get isFirstPage', () => {
    const isFirstPage = false;
    service.setIsFirstPage(isFirstPage);
    service.getIsFirstPage().subscribe((result) => {
      expect(result).toBe(isFirstPage);
    });
  });

  it('should fetch quiz data correctly', () => {
    const mockQuizData: QuizData[] = quizData.quizzes;

    service.getQuizData().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThan(0);

      expect(data[0].title).toBeDefined();
      expect(data[0].icon).toBeDefined();
      expect(data[0].questions).toBeDefined();

      const firstQuestion = data[0].questions[0];
      expect(firstQuestion.question).toBe("What does HTML stand for?");
      expect(firstQuestion.options.length).toBe(4);
      expect(firstQuestion.answer).toBe("Hyper Text Markup Language");
    });

    const req = httpMock.expectOne('/data/data.json');
    expect(req.request.method).toBe('GET');

    req.flush(mockQuizData);
  });

});
