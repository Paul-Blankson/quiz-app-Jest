import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QuizData {
  title: string;
  icon: string;
  questions: Question[];
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  quizUrl = '/data/data.json'


  constructor(private http: HttpClient) {}

  getQuizData(): Observable<any> {
    return this.http.get(this.quizUrl);
  }
}
