import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  quizUrl = '/data/data.json';

  constructor(private http: HttpClient) {}

  private selectedSubjectTitle = '';

  setSelectedSubjectTitle(title: string): void {
    this.selectedSubjectTitle = title;
  }

  getSelectedSubjectTitle(): string {
    return this.selectedSubjectTitle;
  }

  private isFirstPageSubject = new BehaviorSubject<boolean>(true);

  setIsFirstPage(isFirstPage: boolean): void {
    this.isFirstPageSubject.next(isFirstPage);
  }

  getIsFirstPage(): Observable<boolean> {
    return this.isFirstPageSubject.asObservable();
  }

  getQuizData(): Observable<any> {
    return this.http.get(this.quizUrl);
  }
}
