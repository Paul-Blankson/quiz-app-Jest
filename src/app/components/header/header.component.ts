import { Component, inject, Input } from '@angular/core';
import { QuizServiceService } from '../../service/quiz-service.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isFirstPage: boolean = true;

  quizService = inject(QuizServiceService);

  getHeaderIcon(): string {
    switch (this.quizService.selectedSubjectTitle) {
      case 'HTML':
        return 'images/icon-html.svg';
      case 'CSS':
        return 'images/icon-css.svg';
      case 'JavaScript':
        return 'images/icon-js.svg';
      case 'Accessibility':
        return 'images/icon-accessibility.svg';
      default:
        return '';
    }
  }

  getHeaderIconBackground(): string {
    switch (this.quizService.selectedSubjectTitle) {
      case 'HTML':
        return '#FFF1E9';
      case 'CSS':
        return '#E0FDEF';
      case 'JavaScript':
        return '#EBF0FF';
      case 'Accessibility':
        return '#F6E7FF';
      default:
        return 'transparent';
    }
  }
}
