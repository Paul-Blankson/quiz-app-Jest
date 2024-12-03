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

      // Set default selectedTitle and filter questions
      this.selectedTitle = this.quizService.getSelectedSubjectTitle();
      this.filterQuestionsByTitle();
    });
  }

  filterQuestionsByTitle(): void {
    if (this.selectedTitle) {
      const selectedQuiz = this.quizes.find((quiz) => quiz.title === this.selectedTitle);
      this.questions = selectedQuiz ? selectedQuiz.questions : [];
      this.currentIndex = 0; // Reset index for new selection
      // console.log(`${this.selectedTitle}`,this.questions)
      this.getCurrentQuestion()

    }
  }

  getCurrentQuestion(){
    return this.currentQuestion = this.questions[this.currentIndex].options;
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
