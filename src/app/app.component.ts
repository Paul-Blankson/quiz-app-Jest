import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { MainContentComponent } from "./components/main-content/main-content.component";
import { QuizServiceService } from './service/quiz-service.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MainContentComponent],
  providers: [QuizServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-quiz-app';
}
