import { Component } from '@angular/core';
import { SmallCardComponent } from '../small-card/small-card.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { QuizData } from '../../types';

@Component({
  selector: 'app-main-content',
  imports: [SmallCardComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {
  card: QuizData[] = [];

  constructor(
    private quizService: QuizServiceService
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizData().subscribe({
      next: (data) => {
        this.card = data.quizzes;
      },
      error: (err) => {
        console.error('Error fetching quiz data:', err);
      },
    });
  }
}
