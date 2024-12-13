import { Question ,QuizData} from './../../types/index';
import { Component, inject } from '@angular/core';
import { SmallCardComponent } from '../small-card/small-card.component';
import { QuizServiceService } from '../../service/quiz-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions-section',
  imports: [SmallCardComponent],
  templateUrl: './questions-section.component.html',
  styleUrl: './questions-section.component.css'
})
export class QuestionsSectionComponent {

  quizes: QuizData[] = [];
  questions: Question[] = [];
  currentQueOptions: string[] = [];
  currentIndex: number = 0;
  quizService = inject(QuizServiceService);
  answerLabel=['A', 'B', 'C', 'D']
  selectedTitle: string = '';
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.quizService.getQuizData().subscribe((data: { quizzes: QuizData[] }) => {
      this.quizes = data.quizzes;
      this.selectedTitle = this.quizService.getSelectedSubjectTitle();
      // Filter questions and set the current question
      this.filterQuestionsByTitle();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  filterQuestionsByTitle(): void {
    const selectedQuiz = this.quizes.find((quiz) => quiz.title === this.selectedTitle);
    if (selectedQuiz) {
      this.questions = selectedQuiz.questions;
      // Reset index and fetch the first question
      this.currentIndex = 0;
      this.getCurrentQueOptions();
    } else {
      console.warn('No quiz found for title:', this.selectedTitle);
      this.questions = [];
      this.currentQueOptions = [];
    }
  }

  getCurrentQueOptions(): void {
    if (this.questions && this.currentIndex < this.questions.length) {
      this.currentQueOptions = this.questions[this.currentIndex].options;
    } else {
      console.warn('Invalid index or no questions available.');
      this.currentQueOptions = [];
    }
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
    this.selectedTitle = this.quizService.getSelectedSubjectTitle();
    this.getCurrentQueOptions();
  }

}
