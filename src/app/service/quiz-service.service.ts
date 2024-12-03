import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  quizUrl = '/data/data.json'

  constructor(private http: HttpClient) {}

  getQuizData(): Observable<any> {
    return this.http.get(this.quizUrl);
  }

  selectedSubjectTitle = '';

  setSelectedSubjectTitle(title: string): void {
    this.selectedSubjectTitle = title;
  }
  getSelectedSubjectTitle(): string {
    return this.selectedSubjectTitle;
  }
}
