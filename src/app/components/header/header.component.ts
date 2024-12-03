import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../../service/quiz-service.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isFirstPage: boolean = true;

  constructor(public quizService: QuizServiceService) {}

  ngOnInit(): void {
    this.quizService.getIsFirstPage().subscribe((isFirstPage) => {
      this.isFirstPage = isFirstPage;
    });
  }

  getHeaderIcon(): string {
    switch (this.quizService.getSelectedSubjectTitle()) {
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
    switch (this.quizService.getSelectedSubjectTitle()) {
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
