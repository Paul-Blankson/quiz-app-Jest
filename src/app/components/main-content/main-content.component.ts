import { Component } from '@angular/core';
import { SmallCardComponent } from '../small-card/small-card.component';
import { QuestionsSectionComponent } from '../questions-section/questions-section.component';
import { ResultsSectionComponent } from '../results-section/results-section.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { QuizData } from '../../types';

@Component({
  selector: 'app-main-content',
  imports: [SmallCardComponent, QuestionsSectionComponent, ResultsSectionComponent],
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
