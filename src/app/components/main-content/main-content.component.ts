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
 public cards: QuizData[] = [];
 public isQuestionSection = false;

  constructor(
    private readonly quizService: QuizServiceService
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizData().subscribe({
      next: (data) => {
        this.cards = data.quizzes;
      },
      error: (err) => {
        console.error('Error fetching quiz data:', err);
      },
    });
  }

  onCardClick(title: string): void {
    this.quizService.setSelectedSubjectTitle(title);
    this.quizService.setIsFirstPage(false);
    this.isQuestionSection = true;
  }
}
