import { Component } from '@angular/core';
import { SmallCardComponent } from '../small-card/small-card.component';
import { QuestionsSectionComponent } from '../questions-section/questions-section.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { QuizData } from '../../types';

@Component({
  selector: 'app-main-content',
  imports: [SmallCardComponent, QuestionsSectionComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent {
  cards: QuizData[] = [];
  question = false;

  constructor(
    private quizService: QuizServiceService
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizData().subscribe({
      next: (data) => {
        this.cards = data.quizzes;
        console.log('Quiz Data:', this.cards);
      },
      error: (err) => {
        console.error('Error fetching quiz data:', err);
      },
    });
  }

  onCardClick(title: string): void {
    console.log('Selected Quiz:', title);
    this.quizService.setSelectedSubjectTitle(title);
    this.question = true;
  }
}
