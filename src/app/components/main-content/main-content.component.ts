import { Component } from '@angular/core';
import { SmallCardComponent } from '../small-card/small-card.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { HttpClient } from '@angular/common/http';

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
@Component({
  selector: 'app-main-content',
  imports: [SmallCardComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {
  card: QuizData[]=[]

  constructor(private quizService: QuizServiceService, private http:HttpClient) { }

  ngOnInit(): void {
    this.quizService.getQuizData().subscribe({
        next: (data) => {
          this.card = data.quizzes;
            console.log('Quiz Data:', this.card);
        },
        error: (err) => {
            console.error('Error fetching quiz data:', err);
        },
    });
}

}

