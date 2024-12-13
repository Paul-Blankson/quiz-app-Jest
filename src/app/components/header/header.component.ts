import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from '../../service/quiz-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isFirstPage: boolean = true;
  isDarkTheme: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(public quizService: QuizServiceService) {}

  ngOnInit(): void {
    const isFirstPageSub = this.quizService.getIsFirstPage().subscribe((isFirstPage) => {
      this.isFirstPage = isFirstPage;
    });
    this.subscriptions.add(isFirstPageSub);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
      this.applyTheme();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;

    this.applyTheme();

    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  applyTheme(): void {
    // Add or remove the `dark-theme` class from the root element
    const root = document.documentElement;
    if (this.isDarkTheme) {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
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
