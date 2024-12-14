import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { QuizServiceService } from './quiz-service.service';

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

  
});
