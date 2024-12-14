import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizServiceService {
  public quizUrl = '/data/data.json';

  private isFirstPageSubject = new BehaviorSubject<boolean>(true);
  private selectedSubjectTitle: string = '';

  constructor(private http: HttpClient) {}

  setSelectedSubjectTitle(title: string): void {
    this.selectedSubjectTitle = title;
  }

  getSelectedSubjectTitle(): string {
    return this.selectedSubjectTitle;
  }

  setIsFirstPage(isFirstPage: boolean): void {
    this.isFirstPageSubject.next(isFirstPage);
  }

  getIsFirstPage(): Observable<boolean> {
    return this.isFirstPageSubject.asObservable();
  }

  getQuizData(): Observable<any> {
    return this.http.get(this.quizUrl).pipe(
      catchError((error) => {
        console.error('Error fetching quiz data:', error);
        throw error;
      })
    );
  }
}
