import { Question ,QuizData} from './../../types/index';
import { Component, inject } from '@angular/core';
import { SmallCardComponent } from '../small-card/small-card.component';
import { QuizServiceService } from '../../service/quiz-service.service';


@Component({
  selector: 'app-questions-section',
  imports: [SmallCardComponent],
  templateUrl: './questions-section.component.html',
  styleUrl: './questions-section.component.css'
})
export class QuestionsSectionComponent {


  quizService = inject(QuizServiceService);
  questions: Question[] = [];
  currentQuestion: string[] = [];
  currentIndex: number = 0;
  quizes:QuizData[] = []

  selectedTitle: string = ''
  ngOnInit(): void {
    // Fetch quizzes data
    this.quizService.getQuizData().subscribe((data: { quizzes: QuizData[] }) => {
      this.quizes = data.quizzes;
      console.log('Quiz Data:', this.quizes);

      this.selectedTitle = this.quizService.getSelectedSubjectTitle();
      console.log('Selected Title:', this.selectedTitle);

      // Filter questions and set the current question
      this.filterQuestionsByTitle();
    });
  }

  filterQuestionsByTitle(): void {
    const selectedQuiz = this.quizes.find((quiz) => quiz.title === this.selectedTitle);

    if (selectedQuiz) {
      this.questions = selectedQuiz.questions;
      console.log('Filtered Questions:', this.questions);

      // Reset index and fetch the first question
      this.currentIndex = 0;
      this.getCurrentQuestion();
    } else {
      console.warn('No quiz found for title:', this.selectedTitle);
      this.questions = []; // Handle gracefully
      this.currentQuestion = []; // Reset current question
    }
  }

  getCurrentQuestion(): void {
    if (this.questions && this.currentIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentIndex].options;
      console.log('Current Question Options:', this.currentQuestion);
    } else {
      console.warn('Invalid index or no questions available.');
      this.currentQuestion = []; // Handle gracefully
    }
  }

  nextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    }
    this.selectedTitle = this.quizService.getSelectedSubjectTitle();
    this.getCurrentQuestion();
  }


  answerLabel=['A', 'B', 'C', 'D']
}
